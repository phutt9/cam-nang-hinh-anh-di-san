import { useState, useEffect } from 'react';
import { Check, Copy, RotateCcw } from 'lucide-react';

interface CitationPageProps {
  initialPrefill?: {
    artifactName?: string;
    custodianName?: string;
    purpose?: string;
  } | null;
}

const PURPOSE_SUGGESTIONS = [
  'Học tập cá nhân / Bài tập sinh viên',
  'Nghiên cứu khoa học / Luận văn',
  'Bài viết giới thiệu văn hóa phi thương mại',
  'Truyền thông / Xuất bản (đã có văn bản cho phép)',
];

function formatVietnameseDate(isoDate: string): string {
  if (!isoDate) return '';
  const parts = isoDate.split('-');
  if (parts.length !== 3) return isoDate;
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

type CitationMaterialForm = 'original_or_photo' | 'doc_copy_63' | 'digitized_or_ordinary_copy';

export function CitationPage({ initialPrefill }: CitationPageProps) {
  const todayIso = new Date().toISOString().slice(0, 10);

  const [artifactName, setArtifactName] = useState(initialPrefill?.artifactName || '');
  const [authorName, setAuthorName] = useState('');
  const [custodianName, setCustodianName] = useState(initialPrefill?.custodianName || '');
  const [sourceUrl, setSourceUrl] = useState('');
  const [accessDate, setAccessDate] = useState(todayIso);
  const [purpose, setPurpose] = useState(initialPrefill?.purpose || PURPOSE_SUGGESTIONS[0]);
  const [materialForm, setMaterialForm] = useState<CitationMaterialForm>('original_or_photo');

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copyError, setCopyError] = useState('');

  useEffect(() => {
    if (initialPrefill) {
      if (initialPrefill.artifactName) setArtifactName(initialPrefill.artifactName);
      if (initialPrefill.custodianName) setCustodianName(initialPrefill.custodianName);
      if (initialPrefill.purpose) setPurpose(initialPrefill.purpose);
    }
  }, [initialPrefill]);

  const cleanArtifact = artifactName.trim();
  const cleanAuthor = authorName.trim();
  const cleanCustodian = custodianName.trim();
  const cleanUrl = sourceUrl.trim();
  const formattedDate = formatVietnameseDate(accessDate);

  // Không bao giờ tự bịa tên tác giả hoặc đơn vị lưu giữ khi người dùng bỏ trống
  const buildStandardCitation = () => {
    const parts: string[] = [];
    if (cleanArtifact) {
      if (materialForm === 'doc_copy_63') {
        parts.push(`${cleanArtifact} (Bản sao)`);
      } else if (materialForm === 'digitized_or_ordinary_copy') {
        parts.push(`${cleanArtifact} (Tư liệu số hóa / Bản tham khảo)`);
      } else {
        parts.push(cleanArtifact);
      }
    }
    if (cleanAuthor) {
      parts.push(`Ảnh: ${cleanAuthor}`);
    }
    if (cleanCustodian) {
      parts.push(cleanCustodian);
    }
    if (cleanUrl) {
      parts.push(cleanUrl);
    }
    if (formattedDate) {
      parts.push(`Truy cập ngày ${formattedDate}`);
    }
    return parts.join(' – ');
  };

  const buildCaptionCitation = () => {
    if (!cleanArtifact && !cleanCustodian && !cleanAuthor) return '';
    const segments: string[] = [];
    if (cleanArtifact) {
      segments.push(cleanArtifact);
    }
    if (materialForm === 'doc_copy_63') {
      segments.push('Bản sao (chế tác theo Điều 63 Luật Di sản văn hóa 2024)');
    } else if (materialForm === 'digitized_or_ordinary_copy') {
      segments.push('Tư liệu số hóa / Bản sao tài liệu thông thường');
    }
    const creditParts: string[] = [];
    if (cleanAuthor) creditParts.push(`Ảnh: ${cleanAuthor}`);
    if (cleanCustodian) creditParts.push(`Nguồn lưu giữ: ${cleanCustodian}`);
    if (creditParts.length > 0) {
      segments.push(creditParts.join(' · '));
    }
    if (purpose.trim()) {
      segments.push(`Mục đích sử dụng: ${purpose.trim()}`);
    }
    return segments.join('. ') + '.';
  };

  const standardCitation = buildStandardCitation();
  const captionCitation = buildCaptionCitation();

  const handleCopy = async (id: string, text: string) => {
    if (!text) return;
    setCopyError('');
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId(null), 2400);
    } catch {
      setCopyError('Trình duyệt không hỗ trợ sao chép tự động. Vui lòng bôi đen văn bản để sao chép thủ công.');
    }
  };

  const handleLoadSample = (type: 'complete' | 'no-author') => {
    if (type === 'complete') {
      setArtifactName('Trống đồng Ngọc Lũ');
      setAuthorName('Nguyễn Văn A');
      setCustodianName('Bảo tàng Lịch sử Quốc gia');
      setSourceUrl('https://baotanglichsu.vn');
      setAccessDate(todayIso);
      setPurpose('Nộp bài tập, tiểu luận hoặc nghiên cứu nội bộ');
      setMaterialForm('original_or_photo');
    } else {
      setArtifactName('Bia Tiến sĩ khoa Nhâm Tuất (1442)');
      setAuthorName('');
      setCustodianName('Trung tâm Hoạt động Văn hóa Khoa học Văn Miếu - Quốc Tử Giám');
      setSourceUrl('https://vanmieu.gov.vn');
      setAccessDate(todayIso);
      setPurpose('Học tập cá nhân / Minh họa giảng dạy phi thương mại');
      setMaterialForm('doc_copy_63');
    }
  };

  const handleReset = () => {
    setArtifactName('');
    setAuthorName('');
    setCustodianName('');
    setSourceUrl('');
    setAccessDate(todayIso);
    setPurpose(PURPOSE_SUGGESTIONS[0]);
    setMaterialForm('original_or_photo');
    setCopiedId(null);
    setCopyError('');
  };

  const hasEnoughInput = Boolean(cleanArtifact || cleanCustodian || cleanUrl);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-stone-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-[#78350F]">
            Công cụ chuẩn hóa trích dẫn
          </p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-[#1C1917]">
            Hướng dẫn & tạo mẫu ghi nguồn hình ảnh
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#57534E] max-w-2xl">
            Nhập thông tin thực tế bạn có. Hệ thống tạo mẫu ghi nguồn chuẩn mực để sao chép và không
            bao giờ tự suy đoán tên tác giả hay đơn vị lưu giữ khi bạn bỏ trống.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => handleLoadSample('complete')}
            className="px-3 py-2 text-xs font-medium bg-white border border-stone-300 rounded-md hover:border-[#78350F] text-[#44403C] cursor-pointer"
          >
            Mẫu đủ tác giả
          </button>
          <button
            type="button"
            onClick={() => handleLoadSample('no-author')}
            className="px-3 py-2 text-xs font-medium bg-white border border-stone-300 rounded-md hover:border-[#78350F] text-[#44403C] cursor-pointer"
          >
            Mẫu bản sao Điều 63 (khuyết tác giả)
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium bg-[#F3EFE7] border border-stone-300 rounded-md hover:border-[#78350F] text-[#1C1917] cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Xóa trắng
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="lg:col-span-6 bg-white border border-stone-200 rounded-lg p-6 sm:p-8 space-y-5"
        >
          <div>
            <label htmlFor="cit-artifact" className="block text-sm font-medium text-[#1C1917] mb-1.5">
              Tên hiện vật hoặc di sản
            </label>
            <input
              id="cit-artifact"
              type="text"
              value={artifactName}
              onChange={(e) => setArtifactName(e.target.value)}
              placeholder="Ví dụ: Chuông đồng thời Tây Sơn"
              className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md focus:outline-none focus:border-[#78350F]"
            />
          </div>

          <div>
            <label htmlFor="cit-author" className="block text-sm font-medium text-[#1C1917] mb-1.5">
              Tên tác giả hoặc người chụp (nếu có)
            </label>
            <input
              id="cit-author"
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Bỏ trống nếu nguồn không ghi tên người chụp"
              className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md focus:outline-none focus:border-[#78350F]"
            />
            <p className="mt-1 text-xs text-[#78716C]">
              Chỉ nhập khi có thông tin xác thực. Hệ thống sẽ lược bỏ mục này nếu bạn để trống.
            </p>
          </div>

          <div>
            <label htmlFor="cit-custodian" className="block text-sm font-medium text-[#1C1917] mb-1.5">
              Tên bảo tàng hoặc đơn vị lưu giữ
            </label>
            <input
              id="cit-custodian"
              type="text"
              value={custodianName}
              onChange={(e) => setCustodianName(e.target.value)}
              placeholder="Ví dụ: Bảo tàng Mỹ thuật Việt Nam"
              className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md focus:outline-none focus:border-[#78350F]"
            />
          </div>

          <div>
            <label htmlFor="cit-url" className="block text-sm font-medium text-[#1C1917] mb-1.5">
              Đường dẫn nguồn hình ảnh (URL hoặc tên ấn phẩm)
            </label>
            <input
              id="cit-url"
              type="text"
              value={sourceUrl}
              onChange={(e) => setSourceUrl(e.target.value)}
              placeholder="Ví dụ: https://... hoặc Tạp chí Khảo cổ học số 4"
              className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md focus:outline-none focus:border-[#78350F]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="cit-date" className="block text-sm font-medium text-[#1C1917] mb-1.5">
                Ngày truy cập
              </label>
              <input
                id="cit-date"
                type="date"
                value={accessDate}
                onChange={(e) => setAccessDate(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md focus:outline-none focus:border-[#78350F]"
              />
            </div>

            <div>
              <label htmlFor="cit-purpose" className="block text-sm font-medium text-[#1C1917] mb-1.5">
                Mục đích sử dụng
              </label>
              <input
                id="cit-purpose"
                type="text"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                list="purpose-options"
                className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md focus:outline-none focus:border-[#78350F]"
              />
              <datalist id="purpose-options">
                {PURPOSE_SUGGESTIONS.map((item) => (
                  <option key={item} value={item} />
                ))}
              </datalist>
            </div>
          </div>

          <div className="pt-2 space-y-2">
            <label htmlFor="cit-material-form" className="block text-sm font-medium text-[#1C1917]">
              Bản chất tư liệu được ghi nguồn
            </label>
            <select
              id="cit-material-form"
              value={materialForm}
              onChange={(e) => setMaterialForm(e.target.value as CitationMaterialForm)}
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-md focus:outline-none focus:border-[#78350F]"
            >
              <option value="original_or_photo">
                Ảnh chụp hiện vật thông thường / Bản gốc di sản tư liệu
              </option>
              <option value="doc_copy_63">
                Bản sao di sản tư liệu chế tác theo Điều 63 Luật DSVH 2024 (bắt buộc ghi "Bản sao")
              </option>
              <option value="digitized_or_ordinary_copy">
                Tệp ảnh số hóa thông thường / Bản sao tài liệu thông thường (không thuộc Điều 63)
              </option>
            </select>
            <p className="text-xs text-[#78716C] leading-relaxed">
              Chỉ chọn nhãn "Bản sao" theo Điều 63 khi đối tượng thực sự là bản sao di sản tư liệu
              thuộc phạm vi Điều 63 Luật Di sản văn hóa 2024.
            </p>
          </div>
        </form>

        {/* Live Output Panel */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white border border-stone-200 rounded-lg p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="font-serif text-xl font-semibold text-[#1C1917]">
                Mẫu ghi nguồn tạo tự động
              </h2>
              <p className="mt-1 text-xs text-[#57534E]">
                Định dạng chuẩn: Tên hiện vật – Tên tác giả/người chụp (nếu có) – Tên bảo tàng/đơn
                vị lưu giữ – Đường dẫn nguồn – Ngày truy cập.
              </p>
            </div>

            {!hasEnoughInput ? (
              <div className="bg-[#FBF9F5] border border-stone-200 rounded-md p-6 text-sm text-[#57534E]">
                Hãy nhập ít nhất tên hiện vật, đơn vị lưu giữ hoặc đường dẫn nguồn ở cột bên trái để
                hệ thống tạo mẫu ghi nguồn chính xác cho bạn.
              </div>
            ) : (
              <div className="space-y-5">
                {/* Format 1 */}
                <div className="bg-[#FBF9F5] border border-stone-200 rounded-md p-4">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#78350F]">
                      1. Định dạng chuẩn đầy đủ (Khuyến nghị)
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy('standard', standardCitation)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#78350F] hover:bg-[#5A361A] text-white rounded transition-colors cursor-pointer"
                    >
                      {copiedId === 'standard' ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          Đã sao chép
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Sao chép
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-sm text-[#1C1917] leading-relaxed select-all">
                    {standardCitation}
                  </p>
                </div>

                {/* Format 2 */}
                <div className="bg-[#FBF9F5] border border-stone-200 rounded-md p-4">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#78350F]">
                      2. Chú thích dưới hình ảnh (Bài tập / Bài viết)
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy('caption', captionCitation)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-stone-300 hover:border-[#78350F] text-[#1C1917] rounded transition-colors cursor-pointer"
                    >
                      {copiedId === 'caption' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#14532D]" />
                          Đã sao chép
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Sao chép
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-sm text-[#1C1917] leading-relaxed select-all">
                    {captionCitation}
                  </p>
                </div>
              </div>
            )}

            {copyError && (
              <p className="text-xs text-[#9A3412]" role="alert">
                {copyError}
              </p>
            )}

            {!cleanAuthor && hasEnoughInput && (
              <div className="bg-[#FEF9EE] border border-[#E7CFA0] rounded-md p-4 text-xs text-[#78350F] leading-relaxed">
                <strong>Ghi chú minh bạch:</strong> Bạn chưa nhập tên tác giả/người chụp, do đó hệ
                thống không tự điền thông tin tác giả. Nếu đăng tải công khai hoặc xuất bản, hãy
                kiểm tra lại trang nguồn gốc để bổ sung đúng tên tác giả nếu có.
              </div>
            )}
          </div>

          <div className="bg-[#F3EFE7] border border-stone-200 rounded-lg p-6 text-xs text-[#44403C] space-y-2 leading-relaxed">
            <p className="font-semibold text-[#1C1917] uppercase tracking-wider">
              Nguyên tắc khi ghi nguồn
            </p>
            <p>• Ghi nguồn đầy đủ không thay thế cho việc xin phép nếu mục đích sử dụng của bạn là thương mại hoặc xuất bản rộng rãi.</p>
            <p>• Chỉ áp dụng nghĩa vụ bắt buộc chú thích "Bản sao" theo Khoản 5 Điều 63 Luật DSVH 2024 khi sử dụng bản sao di sản tư liệu chế tác đúng phạm vi điều luật này; không áp dụng máy móc cho ảnh chụp hiện vật hoặc tệp ảnh số hóa thông thường.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
