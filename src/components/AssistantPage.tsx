import { useState, useRef, useEffect } from 'react';
import { AlertCircle, Bot, Loader2, Send, Trash2, X } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}

interface AssistantPageProps {
  attachedContext?: string | null;
  onClearAttachedContext?: () => void;
}

const STARTER_QUESTIONS = [
  'Phân biệt quyền sở hữu hiện vật bảo tàng và quyền tác giả đối với bức ảnh chụp hiện vật đó?',
  'Sinh viên lấy ảnh văn bia trên website bảo tàng để làm bài tập thì có cần xin phép không và ghi nguồn thế nào?',
  'Theo Điều 63 Luật Di sản văn hóa 2024, ảnh bản sao di sản tư liệu có được in lên sản phẩm để bán không?',
  'Tôi tìm thấy ảnh cổ vật trên Google nhưng không có tên tác giả, có được đăng lên fanpage không?',
];

export function AssistantPage({
  attachedContext,
  onClearAttachedContext,
}: AssistantPageProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const sendMessage = async (questionText: string) => {
    const trimmed = questionText.trim();
    if (!trimmed || isLoading) return;

    setErrorMessage('');
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: trimmed,
    };

    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: messages.map((m) => ({ role: m.role, text: m.text })),
          contextSummary: attachedContext || undefined,
        }),
      });

      const rawText = await response.text();
      let data: { reply?: string; error?: string; errorCode?: string } = {};
      if (rawText) {
        try {
          data = JSON.parse(rawText) as { reply?: string; error?: string; errorCode?: string };
        } catch {
          data = {};
        }
      }

      if (!response.ok || !data.reply) {
        throw new Error(
          data.error ||
            `Máy chủ phản hồi lỗi (HTTP ${response.status}). Vui lòng kiểm tra cấu hình hoặc thử lại sau.`
        );
      }

      const modelMsg: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        text: data.reply,
      };
      setMessages((prev) => [...prev, modelMsg]);
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Đã xảy ra lỗi khi kết nối tới Trợ lý AI.';
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputText);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      {/* Header */}
      <div className="border-b border-stone-200 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-[#78350F]">
            Hỗ trợ giải đáp tình huống
          </p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-[#1C1917]">
            Trợ lý AI Cẩm nang di sản
          </h1>
          <p className="mt-2 text-sm text-[#57534E] max-w-2xl">
            Đặt câu hỏi về quyền sử dụng hình ảnh hiện vật, bản sao di sản tư liệu, cách xin phép
            hoặc ghi nguồn. Câu trả lời tách bạch căn cứ pháp lý Việt Nam và phần giải thích gợi ý.
          </p>
        </div>

        {messages.length > 0 && (
          <button
            type="button"
            onClick={() => {
              setMessages([]);
              setErrorMessage('');
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#57534E] bg-white border border-stone-300 rounded-md hover:border-[#78350F] hover:text-[#1C1917] cursor-pointer self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Cuộc trò chuyện mới
          </button>
        )}
      </div>

      {/* Attached Context Banner (if user came from ResultPage) */}
      {attachedContext && (
        <div className="bg-[#F3EFE7] border border-stone-300 rounded-lg p-4 flex items-start justify-between gap-4">
          <div className="text-xs text-[#44403C] space-y-1">
            <p className="font-semibold text-[#78350F] uppercase tracking-wider">
              Đang đính kèm ngữ cảnh từ công cụ kiểm tra
            </p>
            <p className="whitespace-pre-line leading-relaxed">{attachedContext}</p>
          </div>
          {onClearAttachedContext && (
            <button
              type="button"
              onClick={onClearAttachedContext}
              className="p-1 text-[#78716C] hover:text-[#1C1917] cursor-pointer"
              aria-label="Gỡ ngữ cảnh đính kèm"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* Main Conversation Container */}
      <div className="bg-white border border-stone-200 rounded-lg flex flex-col min-h-[480px]">
        <div className="flex-1 p-5 sm:p-6 space-y-6 overflow-y-auto max-h-[560px]">
          {messages.length === 0 ? (
            <div className="py-6 space-y-6">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-md bg-[#F3EFE7] border border-stone-200 flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5 text-[#78350F]" />
                </div>
                <div className="text-sm text-[#44403C] leading-relaxed space-y-2 max-w-2xl">
                  <p className="font-medium text-[#1C1917]">
                    Xin chào. Tôi có thể hỗ trợ bạn phân tích tình huống sử dụng hình ảnh hiện vật
                    bảo tàng và di sản tư liệu.
                  </p>
                  <p>
                    Hãy mô tả rõ: loại tư liệu, nguồn lấy ảnh, mục đích sử dụng và bạn có chỉnh sửa
                    hay không. Nếu thiếu thông tin để kết luận, tôi sẽ nêu rõ điểm cần xác minh thêm.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#78716C] mb-3">
                  Câu hỏi gợi ý
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {STARTER_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => sendMessage(q)}
                      disabled={isLoading}
                      className="text-left p-3.5 text-sm text-[#292524] bg-[#FBF9F5] border border-stone-200 rounded-md hover:border-[#78350F] transition-colors cursor-pointer"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[88%] sm:max-w-[80%] rounded-lg px-4 py-3.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#78350F] text-white'
                      : 'bg-[#FBF9F5] border border-stone-200 text-[#1C1917]'
                  }`}
                >
                  {msg.role === 'model' && (
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#78350F] mb-2">
                      Phản hồi từ Trợ lý AI
                    </p>
                  )}
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                </div>
              </div>
            ))
          )}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-[#FBF9F5] border border-stone-200 rounded-lg px-4 py-3 flex items-center gap-2.5 text-sm text-[#57534E]">
                <Loader2 className="w-4 h-4 animate-spin text-[#78350F]" />
                <span>Đang đối chiếu quy định và phân tích tình huống...</span>
              </div>
            </div>
          )}

          {errorMessage && (
            <div
              className="bg-[#FEF2F2] border border-[#E8B8B8] rounded-md p-4 flex items-start gap-2.5 text-sm text-[#991B1B]"
              role="alert"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">{errorMessage}</p>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input Form */}
        <form
          onSubmit={handleSubmit}
          className="border-t border-stone-200 p-4 bg-[#FBF9F5] rounded-b-lg flex flex-col sm:flex-row gap-3"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Nhập câu hỏi hoặc mô tả tình huống sử dụng hình ảnh của bạn..."
            aria-label="Nhập câu hỏi cho Trợ lý AI"
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 text-sm bg-white border border-stone-300 rounded-md focus:outline-none focus:border-[#78350F] disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={isLoading || !inputText.trim()}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#78350F] hover:bg-[#5A361A] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-md transition-colors cursor-pointer shrink-0"
          >
            <Send className="w-4 h-4" />
            Gửi câu hỏi
          </button>
        </form>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-[#78716C] leading-relaxed">
        <strong>Lưu ý trách nhiệm:</strong> Trợ lý AI tổng hợp kiến thức dựa trên Luật Di sản văn
        hóa năm 2024 và Luật Sở hữu trí tuệ nhằm hỗ trợ tra cứu nhanh. Nội dung do AI tạo ra không
        thay thế tư vấn pháp lý chính thức hoặc văn bản chấp thuận của bảo tàng, cơ quan quản lý di sản.
      </p>
    </div>
  );
}
