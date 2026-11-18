import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

function resolvePort(): number {
  const portFlagIndex = process.argv.indexOf('--port');
  if (portFlagIndex !== -1 && process.argv[portFlagIndex + 1]) {
    const parsed = Number(process.argv[portFlagIndex + 1]);
    if (Number.isInteger(parsed) && parsed > 0) return parsed;
  }
  return 3000;
}

const PORT = resolvePort();

app.use(express.json({ limit: '1mb' }));

const ASSISTANT_MODELS = ['gemini-4-hydrogen', 'gemini-3.1-flash-lite'] as const;

function hasConfiguredApiKey(): boolean {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  return Boolean(apiKey && apiKey !== 'MY_GEMINI_API_KEY');
}

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    ok: true,
    aiConfigured: hasConfiguredApiKey(),
    model: ASSISTANT_MODELS[0],
    fallbackModels: ASSISTANT_MODELS.slice(1),
  });
});

const SYSTEM_INSTRUCTION = `Bạn là Trợ lý Cẩm nang hình ảnh di sản — chuyên gia giải đáp về quyền sử dụng hình ảnh hiện vật bảo tàng và di sản tư liệu tại Việt Nam.

NGUYÊN TẮC BẮT BUỘC VỀ ĐỘ CHÍNH XÁC PHÁP LÝ:
1. Chỉ viện dẫn các căn cứ pháp luật Việt Nam đã kiểm chứng:
   - Luật Di sản văn hóa năm 2024 (Luật số 45/2024/QH15, thông qua ngày 23/11/2024, có hiệu lực từ 01/07/2025):
     * Điều 60: Quản lý, bảo vệ và phát huy giá trị di sản tư liệu theo hình thức sở hữu (sở hữu toàn dân, sở hữu chung, sở hữu riêng; di sản tư liệu thuộc sở hữu toàn dân do cơ quan, tổ chức có chức năng quản lý, không được kinh doanh, mua bán, trao đổi, tặng cho...).
     * Điều 63: Bản sao di sản tư liệu (được làm từ bản gốc, giống bản gốc về nội dung thông tin và vật mang tin để hạn chế tiếp xúc bản gốc dễ hư hại; Khoản 5 quy định bản sao không có giá trị tương đương bản gốc, không thay thế bản gốc, không được sử dụng vì mục đích lợi nhuận và phải chú thích "bản sao"). PHẢI phân biệt rõ "bản sao di sản tư liệu theo Điều 63" với ảnh chụp hiện vật thông thường, bản sao tài liệu thông thường và tệp ảnh số hóa thông thường. Không được gợi ý rằng chỉ cần xin phép là có thể bỏ qua giới hạn cấm mục đích lợi nhuận của Khoản 5 Điều 63 đối với bản sao di sản tư liệu.
     * Điều 88: Sử dụng, khai thác di sản văn hóa (cho phép cho sáng tác văn học nghệ thuật, tuyên truyền, giáo dục, nghiên cứu khoa học, kinh doanh dịch vụ du lịch, công nghiệp văn hóa với yêu cầu không làm biến dạng, tổn hại giá trị di sản và tôn trọng quyền chủ sở hữu; không mặc nhiên miễn trừ quyền tác giả ảnh hoặc thủ tục xin phép đơn vị quản lý).
     * Điều 64, 65, 67: Hệ thống bảo tàng công lập và ngoài công lập.
   - Luật Sở hữu trí tuệ (Luật số 50/2005/QH11 được sửa đổi, bổ sung bởi Luật số 07/2022/QH15, hiệu lực từ 01/01/2023):
     * Điều 14, 19, 20: Ảnh chụp hiện vật chỉ được bảo hộ quyền tác giả như tác phẩm nhiếp ảnh khi có tính nguyên gốc, sáng tạo; nếu được bảo hộ thì phát sinh quyền nhân thân và quyền tài sản.
     * Điều 25: Ngoại lệ không xâm phạm quyền tác giả (phân biệt rõ tự sao chép học tập cá nhân, nộp bài tập nội bộ, trích dẫn hợp lý phi thương mại với đăng tải công khai rộng rãi; luôn không mâu thuẫn khai thác bình thường, không gây thiệt hại bất hợp lý và bắt buộc ghi tên tác giả, nguồn gốc, xuất xứ).
   - Thông tư số 05/2025/TT-BVHTTDL (ban hành 13/05/2025, hiệu lực từ 01/07/2025, thay thế Thông tư 18/2010/TT-BVHTTDL) về nhiệm vụ chuyên môn của bảo tàng; Luật Lưu trữ năm 2024 (Luật số 33/2024/QH15, hiệu lực từ 01/07/2025 — riêng điều khoản chi tiết phòng đọc/thủ tục từng lưu trữ cần ghi rõ "Cần xác minh thêm").
2. TUYỆT ĐỐI KHÔNG tự tạo điều luật, số điều, số nghị định/thông tư, trích dẫn nguyên văn giả hoặc đường dẫn URL chưa kiểm chứng. Với các quy chế nội bộ, mức phí riêng của từng bảo tàng hoặc văn bản hướng dẫn chưa được xác thực toàn văn, PHẢI ghi rõ "Cần xác minh thêm" tại đơn vị lưu giữ hoặc cổng văn bản chính thức (vanban.chinhphu.vn, congbao.chinhphu.vn, dsvh.gov.vn).
3. KHÔNG BAO GIỜ kết luận một hình ảnh được tự do sử dụng chỉ vì xuất hiện công khai trên Internet, chỉ vì phục vụ học tập mà đăng công khai, hoặc chỉ vì đã ghi tên nguồn.
4. KHÔNG BAO GIỜ đồng nhất quyền sở hữu hiện vật với quyền quản lý của bảo tàng hay quyền tác giả của người chụp ảnh.
5. CẤU TRÚC CÂU TRẢ LỜI BẮT BUỘC (tiếng Việt rõ ràng, súc tích):
   - **1. Căn cứ pháp lý có xác thực**: Nêu rõ điều luật đã kiểm chứng và đánh dấu rõ điểm nào "Cần xác minh thêm".
   - **2. Giải thích tham khảo từ Trợ lý AI**: Tách bạch 4 tầng quyền (quyền sở hữu hiện vật, quyền quản lý của bảo tàng/đơn vị lưu giữ, quyền tác giả đối với bức ảnh/bản số, phạm vi khai thác & mục đích sử dụng).
   - **3. Các bước khuyến nghị & cách ghi nguồn**: Liệt kê các bước thực tế người dùng cần kiểm tra/liên hệ và cấu trúc ghi nguồn đúng quy định.
   - **Lưu ý miễn trừ**: Nhắc ngắn gọn nội dung do AI tổng hợp chỉ mang tính tham khảo, không thay thế tư vấn pháp lý chính thức hoặc văn bản chấp thuận của cơ quan quản lý di sản.`;

interface ChatMessageInput {
  role: 'user' | 'model';
  text: string;
}

interface AssistantRequestBody {
  message?: string;
  history?: ChatMessageInput[];
  contextSummary?: string;
}

function inspectErrorDetails(err: unknown): {
  name: string;
  status?: number;
  code?: string;
  causeCode?: string;
  message: string;
} {
  if (!err || typeof err !== 'object') {
    return { name: 'UnknownError', message: String(err ?? 'Lỗi không xác định') };
  }
  const e = err as {
    name?: unknown;
    status?: unknown;
    code?: unknown;
    message?: unknown;
    cause?: { code?: unknown; message?: unknown };
  };
  return {
    name: typeof e.name === 'string' ? e.name : 'Error',
    status: typeof e.status === 'number' ? e.status : undefined,
    code: typeof e.code === 'string' ? e.code : undefined,
    causeCode: typeof e.cause?.code === 'string' ? e.cause.code : undefined,
    message: typeof e.message === 'string' ? e.message : 'Lỗi không xác định',
  };
}

function shouldTryFallbackModel(details: ReturnType<typeof inspectErrorDetails>): boolean {
  const msgUpper = details.message.toUpperCase();
  return (
    details.status === 404 ||
    details.status === 500 ||
    details.status === 502 ||
    details.status === 503 ||
    details.status === 504 ||
    msgUpper.includes('NOT_FOUND') ||
    msgUpper.includes('UNAVAILABLE') ||
    msgUpper.includes('INTERNAL')
  );
}

app.post('/api/assistant', async (req: Request, res: Response) => {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    res.status(503).json({
      errorCode: 'MISSING_API_KEY',
      error:
        'Chưa cấu hình GEMINI_API_KEY trên máy chủ. Vui lòng thiết lập khóa API trong phần Settings > Secrets để kích hoạt Trợ lý AI.',
    });
    return;
  }

  const body = (req.body || {}) as AssistantRequestBody;
  const userMessage = typeof body.message === 'string' ? body.message.trim() : '';

  if (!userMessage) {
    res.status(400).json({
      errorCode: 'EMPTY_MESSAGE',
      error: 'Vui lòng nhập câu hỏi hoặc tình huống cần giải đáp.',
    });
    return;
  }

  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  const historyItems = Array.isArray(body.history)
    ? body.history
        .filter(
          (item): item is ChatMessageInput =>
            Boolean(item) &&
            (item.role === 'user' || item.role === 'model') &&
            typeof item.text === 'string' &&
            item.text.trim().length > 0
        )
        .slice(-8)
    : [];
  const contents = historyItems.map((item) => ({
    role: item.role === 'model' ? 'model' : 'user',
    parts: [{ text: item.text }],
  }));

  const fullUserPrompt = body.contextSummary
    ? `[Ngữ cảnh tình huống người dùng vừa kiểm tra]\n${body.contextSummary}\n\n[Câu hỏi của người dùng]\n${userMessage}`
    : userMessage;

  contents.push({
    role: 'user',
    parts: [{ text: fullUserPrompt }],
  });

  let lastError: unknown = null;
  let lastModel: string = ASSISTANT_MODELS[0];

  for (let i = 0; i < ASSISTANT_MODELS.length; i += 1) {
    const modelName = ASSISTANT_MODELS[i];
    lastModel = modelName;
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });

      const replyText = response.text;
      if (!replyText) {
        res.status(502).json({
          errorCode: 'EMPTY_AI_RESPONSE',
          error: 'Trợ lý AI không trả về nội dung phản hồi. Vui lòng thử lại.',
        });
        return;
      }

      res.json({ reply: replyText, modelUsed: modelName });
      return;
    } catch (err: unknown) {
      lastError = err;
      const details = inspectErrorDetails(err);
      console.error('Gemini API error:', {
        model: modelName,
        name: details.name,
        status: details.status ?? null,
        code: details.code ?? null,
        causeCode: details.causeCode ?? null,
        message: details.message.slice(0, 300),
      });

      if (i < ASSISTANT_MODELS.length - 1 && shouldTryFallbackModel(details)) {
        continue;
      }
      break;
    }
  }

  const details = inspectErrorDetails(lastError);
  const msgUpper = details.message.toUpperCase();

  if (
    details.status === 401 ||
    details.status === 403 ||
    msgUpper.includes('PERMISSION_DENIED') ||
    msgUpper.includes('API_KEY_INVALID') ||
    msgUpper.includes('API KEY NOT VALID')
  ) {
    res.status(details.status === 401 ? 401 : 403).json({
      errorCode: 'AUTH_ERROR',
      model: lastModel,
      upstreamStatus: details.status ?? null,
      error:
        'Khóa GEMINI_API_KEY không hợp lệ hoặc chưa đủ quyền truy cập. Vui lòng kiểm tra lại trong Settings > Secrets.',
    });
    return;
  }

  if (details.status === 400 || msgUpper.includes('INVALID_ARGUMENT')) {
    res.status(400).json({
      errorCode: 'INVALID_REQUEST',
      model: lastModel,
      upstreamStatus: details.status ?? null,
      error:
        'Yêu cầu gửi tới dịch vụ AI chưa hợp lệ hoặc tham số mô hình không tương thích. Vui lòng thử rút gọn nội dung hoặc thử lại.',
    });
    return;
  }

  if (details.status === 429 || msgUpper.includes('429') || msgUpper.includes('RESOURCE_EXHAUSTED')) {
    res.status(429).json({
      errorCode: 'RATE_LIMIT',
      model: lastModel,
      upstreamStatus: details.status ?? 429,
      error:
        'Hệ thống AI đang tạm thời vượt giới hạn lượt gọi. Vui lòng đợi ít phút rồi thử lại.',
    });
    return;
  }

  if (details.status === 404 || msgUpper.includes('404') || msgUpper.includes('NOT_FOUND')) {
    res.status(404).json({
      errorCode: 'MODEL_UNAVAILABLE',
      model: lastModel,
      upstreamStatus: details.status ?? 404,
      error: 'Mô hình AI được cấu hình hiện không khả dụng. Vui lòng thử lại sau.',
    });
    return;
  }

  if (
    details.status === 500 ||
    details.status === 502 ||
    details.status === 503 ||
    details.status === 504 ||
    msgUpper.includes('UNAVAILABLE') ||
    msgUpper.includes('INTERNAL')
  ) {
    res.status(502).json({
      errorCode: 'UPSTREAM_ERROR',
      model: lastModel,
      upstreamStatus: details.status ?? null,
      error:
        'Dịch vụ Gemini API đang tạm gián đoạn hoặc quá tải ở phía máy chủ cung cấp. Vui lòng thử lại sau ít phút.',
    });
    return;
  }

  if (
    details.message.includes('fetch failed') ||
    details.causeCode === 'ECONNREFUSED' ||
    details.causeCode === 'ECONNRESET' ||
    details.causeCode === 'ETIMEDOUT' ||
    details.causeCode === 'ENOTFOUND' ||
    details.causeCode === 'UND_ERR_CONNECT_TIMEOUT' ||
    details.message.includes('ECONNREFUSED') ||
    details.message.includes('ETIMEDOUT') ||
    details.message.includes('ENOTFOUND')
  ) {
    res.status(502).json({
      errorCode: 'NETWORK_ERROR',
      model: lastModel,
      upstreamStatus: details.status ?? null,
      error:
        'Không thể kết nối mạng tới dịch vụ Gemini API vào lúc này. Vui lòng kiểm tra kết nối và thử lại.',
    });
    return;
  }

  res.status(500).json({
    errorCode: 'INTERNAL_ERROR',
    model: lastModel,
    upstreamStatus: details.status ?? null,
    error: 'Không thể kết nối tới dịch vụ Trợ lý AI vào lúc này. Vui lòng thử lại sau.',
  });
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR === 'true' ? false : undefined,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Cẩm nang hình ảnh di sản server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
