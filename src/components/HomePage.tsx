import { ArrowRight, BookOpen, Scale, ShieldCheck, Quote } from 'lucide-react';
import { ArchivalImage } from './ArchivalImage';
import { KNOWLEDGE_ARTICLES } from '../data/knowledgeArticles';
import { SAMPLE_SCENARIOS } from '../data/sampleScenarios';
import { LEGAL_DOCUMENTS } from '../data/legalDocuments';
import type { CheckWizardInput, PageView } from '../types/heritage';

interface HomePageProps {
  onNavigate: (page: PageView) => void;
  onStartScenarioInChecker: (prefill: CheckWizardInput) => void;
  onOpenArticle: (articleId: string) => void;
}

export function HomePage({
  onNavigate,
  onStartScenarioInChecker,
  onOpenArticle,
}: HomePageProps) {
  const featuredScenarios = SAMPLE_SCENARIOS.slice(0, 6);
  const featuredArticles = KNOWLEDGE_ARTICLES.slice(0, 3);
  const featuredLaws = LEGAL_DOCUMENTS.slice(0, 3);

  const riskTextMap = {
    low: 'Mức kiểm tra: Thấp (cần ghi nguồn)',
    medium: 'Mức kiểm tra: Trung bình',
    high: 'Mức kiểm tra: Cao (cần xin phép)',
    verify: 'Mức kiểm tra: Cần xác minh thêm',
  };

  return (
    <div className="space-y-20 pb-8">
      {/* 1. Exhibition Marquee Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 lg:pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-[#78350F]">
                Cẩm nang thực hành bảo tàng số & di sản tư liệu
              </p>
              <h1 className="mt-4 font-serif text-4xl sm:text-5xl font-semibold tracking-tight text-[#1C1917] leading-[1.15]">
                Cẩm nang sử dụng hình ảnh hiện vật và di sản tư liệu
              </h1>
              <p className="mt-4 font-serif italic text-lg sm:text-xl text-[#6B4423]">
                Hiểu đúng quyền – Sử dụng đúng cách – Tôn trọng giá trị di sản.
              </p>
              <p className="mt-5 text-base text-[#44403C] leading-relaxed max-w-xl">
                Hướng dẫn thực tế dành cho sinh viên, nhà nghiên cứu, người làm nội dung, đơn vị
                truyền thông và khách tham quan bảo tàng tại Việt Nam trong việc xác minh quyền sử
                dụng, xin phép và ghi nguồn đúng quy định.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-stone-200 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('checker')}
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#78350F] hover:bg-[#5A361A] text-white text-sm font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap"
              >
                Kiểm tra tình huống ngay
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('citation')}
                className="inline-flex items-center gap-2 px-5 py-3 bg-white border border-stone-300 hover:border-[#78350F] text-[#1C1917] text-sm font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap"
              >
                Tạo mẫu ghi nguồn
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <figure className="h-full flex flex-col">
              <div className="flex-1 min-h-[280px] lg:min-h-[400px] overflow-hidden rounded-lg border border-stone-200 bg-[#EBE6DF]">
                <ArchivalImage
                  src="/real-heritage/museum_interior.jpg"
                  alt="Không gian trưng bày trống đồng Đông Sơn và hiện vật lịch sử tại Bảo tàng Lịch sử Quốc gia Việt Nam"
                  className="w-full h-full object-cover"
                  fallbackTitle="Bảo tàng Lịch sử Quốc gia Việt Nam"
                />
              </div>
              <figcaption className="mt-2.5 text-xs font-serif italic text-[#78716C]">
                Không gian trưng bày trống đồng Đông Sơn và hiện vật tại Bảo tàng Lịch sử Quốc gia Việt Nam. Ảnh: Daderot (Wikimedia Commons · CC0).
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Full-width 4-column Strip below hero: 4 tầng quyền cốt lõi */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-stone-200 bg-white rounded-lg divide-y sm:divide-y-0 sm:divide-x divide-stone-200">
          <div className="p-6">
            <p className="font-mono text-xs text-[#78350F] tabular-nums">01 / Tầng quyền</p>
            <h2 className="mt-2 font-serif text-lg font-semibold text-[#1C1917]">
              Quyền sở hữu hiện vật
            </h2>
            <p className="mt-2 text-sm text-[#57534E] leading-relaxed">
              Hiện vật gốc thường thuộc sở hữu toàn dân hoặc chủ thể hợp pháp, độc lập với quyền trên ảnh chụp.
            </p>
          </div>
          <div className="p-6">
            <p className="font-mono text-xs text-[#78350F] tabular-nums">02 / Tầng quyền</p>
            <h2 className="mt-2 font-serif text-lg font-semibold text-[#1C1917]">
              Quyền quản lý hình ảnh
            </h2>
            <p className="mt-2 text-sm text-[#57534E] leading-relaxed">
              Bảo tàng và đơn vị lưu giữ ban hành nội quy chụp ảnh, cung cấp tư liệu kho và thỏa thuận khai thác.
            </p>
          </div>
          <div className="p-6">
            <p className="font-mono text-xs text-[#78350F] tabular-nums">03 / Tầng quyền</p>
            <h2 className="mt-2 font-serif text-lg font-semibold text-[#1C1917]">
              Quyền tác giả bức ảnh
            </h2>
            <p className="mt-2 text-sm text-[#57534E] leading-relaxed">
              Ảnh chụp hiện vật được bảo hộ khi đáp ứng tính nguyên gốc, sáng tạo; độc lập với quyền sở hữu hiện vật.
            </p>
          </div>
          <div className="p-6">
            <p className="font-mono text-xs text-[#78350F] tabular-nums">04 / Tầng quyền</p>
            <h2 className="mt-2 font-serif text-lg font-semibold text-[#1C1917]">
              Bản gốc, bản sao & bản số
            </h2>
            <p className="mt-2 text-sm text-[#57534E] leading-relaxed">
              Phân biệt bản sao di sản tư liệu theo Điều 63 (cấm lợi nhuận) với tệp ảnh số hóa thông thường.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Mục đích & Đối tượng sử dụng */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-t border-stone-200 pt-12">
          <div className="lg:col-span-4">
            <p className="text-xs font-medium uppercase tracking-widest text-[#78350F]">
              Đối tượng & Giá trị thực tiễn
            </p>
            <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-semibold text-[#1C1917]">
              Dành cho ai và giải quyết vấn đề gì?
            </h2>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white border border-stone-200 rounded-lg p-6">
              <h3 className="font-serif text-lg font-semibold text-[#1C1917]">
                Sinh viên & Nhà nghiên cứu
              </h3>
              <p className="mt-2 text-sm text-[#57534E] leading-relaxed">
                Phân biệt phạm vi ngoại lệ học tập, trích dẫn hợp lý trong tiểu luận, luận văn với việc
                xuất bản sách hoặc công bố rộng rãi ra công chúng.
              </p>
            </div>
            <div className="bg-white border border-stone-200 rounded-lg p-6">
              <h3 className="font-serif text-lg font-semibold text-[#1C1917]">
                Người làm nội dung & Truyền thông
              </h3>
              <p className="mt-2 text-sm text-[#57534E] leading-relaxed">
                Tránh rủi ro lấy nhầm ảnh không rõ nguồn trên Internet, hiểu giới hạn khi chỉnh sửa màu,
                dùng AI hoặc đăng lại ảnh từ website bảo tàng.
              </p>
            </div>
            <div className="bg-white border border-stone-200 rounded-lg p-6">
              <h3 className="font-serif text-lg font-semibold text-[#1C1917]">
                Doanh nghiệp & Đơn vị thiết kế
              </h3>
              <p className="mt-2 text-sm text-[#57534E] leading-relaxed">
                Nắm rõ yêu cầu xin phép bằng văn bản khi khai thác hình ảnh hiện vật cho quảng cáo,
                bao bì, sản phẩm lưu niệm và công nghiệp văn hóa.
              </p>
            </div>
            <div className="bg-white border border-stone-200 rounded-lg p-6">
              <h3 className="font-serif text-lg font-semibold text-[#1C1917]">
                Khách tham quan bảo tàng
              </h3>
              <p className="mt-2 text-sm text-[#57534E] leading-relaxed">
                Hiểu đúng quyền và nghĩa vụ khi tự chụp ảnh tại phòng trưng bày, tôn trọng nội quy
                bảo quản hiện vật và ghi nhận đúng nơi lưu giữ.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Các tình huống thường gặp */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-t border-stone-200 pt-12 mb-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-[#78350F]">
              Thực hành tình huống
            </p>
            <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-semibold text-[#1C1917]">
              Các tình huống thường gặp khi dùng ảnh di sản
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('checker')}
            className="text-sm font-medium text-[#78350F] hover:text-[#5A361A] inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            Xem toàn bộ 10 tình huống mẫu
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredScenarios.map((scenario) => (
            <div
              key={scenario.id}
              className="bg-white border border-stone-200 rounded-lg p-6 flex flex-col justify-between hover:border-[#9A6B2F] transition-colors"
            >
              <div>
                <div className="flex items-center gap-2 text-xs text-[#78716C]">
                  <span className="font-mono text-[#78350F] tabular-nums">Tình huống {scenario.number}</span>
                  <span aria-hidden="true">·</span>
                  <span>{riskTextMap[scenario.riskTier]}</span>
                </div>
                <h3 className="mt-3 font-serif text-lg font-semibold text-[#1C1917] leading-snug">
                  {scenario.title}
                </h3>
                <p className="mt-2.5 text-sm text-[#57534E] leading-relaxed">
                  {scenario.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs text-[#78716C] truncate pr-2">
                  {scenario.referenceNote.split(';')[0]}
                </span>
                <button
                  type="button"
                  onClick={() => onStartScenarioInChecker(scenario.prefillInput)}
                  className="text-xs font-semibold text-[#78350F] hover:text-[#5A361A] whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Thử kiểm tra →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Bài viết kiến thức nổi bật */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-t border-stone-200 pt-12 mb-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-[#78350F]">
              Thư viện kiến thức
            </p>
            <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-semibold text-[#1C1917]">
              Chuyên đề trọng tâm về quyền và tư liệu
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('library')}
            className="text-sm font-medium text-[#78350F] hover:text-[#5A361A] inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            Mở thư viện 8 chuyên mục
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredArticles.map((article) => (
            <article
              key={article.id}
              className="bg-white border border-stone-200 rounded-lg overflow-hidden flex flex-col justify-between hover:border-[#9A6B2F] transition-colors"
            >
              <div>
                <div className="aspect-[4/3] overflow-hidden bg-[#EBE6DF]">
                  <ArchivalImage
                    src={article.imagePath}
                    alt={article.imageCaption}
                    className="w-full h-full object-cover"
                    fallbackTitle={article.title}
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-[#78716C]">
                    <span>{article.readTime}</span>
                    <span aria-hidden="true">·</span>
                    <span>Cập nhật {article.updatedAt}</span>
                  </div>
                  <h3 className="mt-2.5 font-serif text-xl font-semibold text-[#1C1917] leading-snug">
                    {article.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-[#57534E] leading-relaxed">
                    {article.summary}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <button
                  type="button"
                  onClick={() => onOpenArticle(article.id)}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#78350F] hover:text-[#5A361A] cursor-pointer"
                >
                  Đọc bài phân tích
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 5. Khu vực văn bản pháp luật & lối tắt công cụ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F3EFE7] border border-stone-200 rounded-lg p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5">
              <p className="text-xs font-medium uppercase tracking-widest text-[#78350F]">
                Căn cứ pháp lý trọng tâm
              </p>
              <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-semibold text-[#1C1917]">
                Luật Di sản văn hóa năm 2024 & Quy định liên quan
              </h2>
              <p className="mt-3 text-sm text-[#57534E] leading-relaxed">
                Tổng hợp có kiểm chứng các điều khoản cốt lõi về quản lý di sản tư liệu (Điều 60),
                bản sao di sản tư liệu (Điều 63), sử dụng khai thác di sản (Điều 88) và ngoại lệ quyền tác giả (Điều 25 Luật SHTT).
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('legal')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#78350F] hover:bg-[#5A361A] text-white text-sm font-medium rounded-md transition-colors cursor-pointer"
                >
                  <Scale className="w-4 h-4" />
                  Tra cứu {LEGAL_DOCUMENTS.length} nguồn tư liệu pháp lý
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('assistant')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-stone-300 hover:border-[#78350F] text-[#1C1917] text-sm font-medium rounded-md transition-colors cursor-pointer"
                >
                  Hỏi đáp với Trợ lý AI
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 divide-y divide-stone-300/80 bg-white border border-stone-200 rounded-lg">
              {featuredLaws.map((law) => (
                <div key={law.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#78716C]">
                      <span className="font-mono text-[#78350F]">{law.documentCode}</span>
                      <span aria-hidden="true">·</span>
                      <span>{law.relatedArticles.join(', ')}</span>
                    </div>
                    <h3 className="mt-1 font-serif text-base font-semibold text-[#1C1917]">
                      {law.title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate('legal')}
                    className="text-xs font-semibold text-[#78350F] hover:text-[#5A361A] whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Xem tóm tắt →
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-stone-300/70 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => onNavigate('checker')}
              className="flex items-center gap-3 p-4 bg-white border border-stone-200 rounded-md hover:border-[#78350F] transition-colors text-left cursor-pointer"
            >
              <ShieldCheck className="w-5 h-5 text-[#78350F] shrink-0" />
              <div>
                <p className="text-sm font-semibold text-[#1C1917]">Kiểm tra 6 bước</p>
                <p className="text-xs text-[#57534E]">Đánh giá rủi ro & hướng xin phép</p>
              </div>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('citation')}
              className="flex items-center gap-3 p-4 bg-white border border-stone-200 rounded-md hover:border-[#78350F] transition-colors text-left cursor-pointer"
            >
              <Quote className="w-5 h-5 text-[#78350F] shrink-0" />
              <div>
                <p className="text-sm font-semibold text-[#1C1917]">Chuẩn hóa ghi nguồn</p>
                <p className="text-xs text-[#57534E]">Tạo chú thích sao chép nhanh</p>
              </div>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('library')}
              className="flex items-center gap-3 p-4 bg-white border border-stone-200 rounded-md hover:border-[#78350F] transition-colors text-left cursor-pointer"
            >
              <BookOpen className="w-5 h-5 text-[#78350F] shrink-0" />
              <div>
                <p className="text-sm font-semibold text-[#1C1917]">8 chuyên mục kiến thức</p>
                <p className="text-xs text-[#57534E]">Ví dụ & tình huống minh họa</p>
              </div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
