import { useState, useMemo } from 'react';
import { ExternalLink, Search } from 'lucide-react';
import { LEGAL_DOCUMENTS } from '../data/legalDocuments';

type LegalFilter = 'all' | 'heritage-2024' | 'circular-archive' | 'ip-law' | 'museum-policy';

export function LegalPage() {
  const [filter, setFilter] = useState<LegalFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDocs = useMemo(() => {
    return LEGAL_DOCUMENTS.filter((doc) => {
      const matchesGroup =
        filter === 'all' ||
        (filter === 'heritage-2024' && doc.id.startsWith('luat-dsvh-2024')) ||
        (filter === 'circular-archive' &&
          (doc.id.startsWith('thong-tu') || doc.id === 'luat-luu-tru-2024')) ||
        (filter === 'ip-law' && doc.id.startsWith('luat-shtt')) ||
        (filter === 'museum-policy' && doc.id.startsWith('quy-che'));

      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesGroup;

      const matchesText =
        doc.title.toLowerCase().includes(q) ||
        doc.summary.toLowerCase().includes(q) ||
        doc.documentCode.toLowerCase().includes(q) ||
        doc.relatedArticles.some((art) => art.toLowerCase().includes(q)) ||
        doc.keyTakeaways.some((t) => t.toLowerCase().includes(q));

      return matchesGroup && matchesText;
    });
  }, [filter, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-stone-200 pb-6 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-[#78350F]">
            Nguồn pháp lý & tài liệu chính thức
          </p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-[#1C1917]">
            Văn bản pháp luật và nguồn tham khảo
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#57534E] max-w-3xl">
            Tổng hợp các quy định đã kiểm chứng từ Luật Di sản văn hóa năm 2024 (tập trung Điều 60,
            Điều 63, Điều 88), Luật Sở hữu trí tuệ và lưu ý tra cứu quy chế riêng của từng bảo tàng.
          </p>
        </div>

        <div className="w-full lg:w-80 relative">
          <Search className="w-4 h-4 text-[#78716C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo điều khoản, số hiệu..."
            aria-label="Tìm văn bản pháp luật"
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-stone-300 rounded-md focus:outline-none focus:border-[#78350F]"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Lọc nhóm văn bản">
        {[
          { id: 'all', label: `Tất cả nguồn tư liệu (${LEGAL_DOCUMENTS.length})` },
          { id: 'heritage-2024', label: 'Luật Di sản văn hóa 2024 (Điều 60, 63, 88)' },
          { id: 'circular-archive', label: 'Thông tư bảo tàng & Luật Lưu trữ 2024' },
          { id: 'ip-law', label: 'Luật Sở hữu trí tuệ' },
          { id: 'museum-policy', label: 'Quy chế bảo tàng (Cần xác minh)' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilter(tab.id as LegalFilter)}
            className={`px-3.5 py-2 text-xs font-medium rounded-md border transition-colors cursor-pointer ${
              filter === tab.id
                ? 'bg-[#78350F] text-white border-[#78350F]'
                : 'bg-white text-[#44403C] border-stone-200 hover:border-stone-400'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Accuracy Commitment Notice */}
      <div className="bg-[#F3EFE7] border border-stone-200 rounded-lg p-5 text-sm text-[#44403C] leading-relaxed">
        <strong className="text-[#1C1917]">Cam kết minh bạch nguồn trích dẫn:</strong> Mọi điều khoản,
        số hiệu và mốc hiệu lực đã xác thực đều đối chiếu trực tiếp với bản ghi văn bản trên cổng
        chính thức (vanban.chinhphu.vn, congbao.chinhphu.vn, dsvh.gov.vn). Các nội dung chi tiết
        chưa trích xuất đủ toàn văn hoặc quy chế/bảng phí riêng của từng bảo tàng địa phương được
        đánh dấu rõ trạng thái{' '}
        <span className="font-semibold text-[#9A3412]">“Cần xác minh thêm”</span>; văn bản đã bị
        thay thế được ghi rõ{' '}
        <span className="font-semibold text-[#57534E]">“Đã hết hiệu lực (đã được thay thế)”</span>{' '}
        và hệ thống tuyệt đối không tự tạo số hiệu hay đường dẫn giả.
      </div>

      {/* Legal Cards */}
      {filteredDocs.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-lg p-12 text-center">
          <p className="font-serif text-lg text-[#1C1917]">
            Không có văn bản nào khớp với từ khóa "{searchQuery}".
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredDocs.map((doc) => {
            const statusClass =
              doc.verificationStatus === 'Đã đối chiếu cổng văn bản chính thức'
                ? 'text-[#14532D]'
                : doc.verificationStatus === 'Đã hết hiệu lực (đã được thay thế)'
                ? 'text-[#78716C]'
                : 'text-[#9A3412]';

            return (
              <article
                key={doc.id}
                className="bg-white border border-stone-200 rounded-lg p-6 sm:p-8"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-200">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#78716C]">
                    <span className="font-mono font-medium text-[#78350F]">
                      {doc.documentCode}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>Ban hành: {doc.issuedDate}</span>
                    <span aria-hidden="true">·</span>
                    <span>Hiệu lực: {doc.effectiveDate}</span>
                  </div>

                  <span className={`text-xs font-semibold ${statusClass}`}>
                    {doc.verificationStatus}
                  </span>
                </div>

                <h2 className="mt-4 font-serif text-xl sm:text-2xl font-semibold text-[#1C1917]">
                  {doc.title}
                </h2>
                <p className="mt-1 text-xs text-[#78716C]">
                  Cơ quan ban hành: <span className="text-[#44403C]">{doc.issuer}</span> · Điều khoản
                  liên quan:{' '}
                  <span className="font-medium text-[#1C1917]">
                    {doc.relatedArticles.join(', ')}
                  </span>
                </p>

                <p className="mt-4 text-sm sm:text-base text-[#44403C] leading-relaxed">
                  {doc.summary}
                </p>

                <div className="mt-5 bg-[#FBF9F5] border border-stone-200 rounded-md p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#78350F]">
                    Nội dung tóm tắt trọng tâm
                  </p>
                  <ul className="mt-2.5 space-y-2 text-sm text-[#292524] leading-relaxed list-disc pl-5">
                    {doc.keyTakeaways.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 flex flex-col gap-2 pt-2">
                  <div>
                    <a
                      href={doc.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-[#78350F] hover:text-[#5A361A] hover:underline"
                    >
                      {doc.officialPortalLabel}
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    </a>
                  </div>
                  {doc.urlNote && (
                    <p className="text-xs text-[#78716C] leading-relaxed">{doc.urlNote}</p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
