import type { PageView } from '../types/heritage';

interface FooterProps {
  onNavigate: (page: PageView) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-stone-200 bg-[#F3EFE7] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-stone-300/70">
          <div className="md:col-span-5">
            <h2 className="font-serif text-xl font-semibold text-[#1C1917]">
              Cẩm nang hình ảnh di sản
            </h2>
            <p className="mt-2 text-sm text-[#57534E] leading-relaxed max-w-md">
              Hiểu đúng quyền – Sử dụng đúng cách – Tôn trọng giá trị di sản. Tài liệu thực hành
              dành cho sinh viên, nhà nghiên cứu, người làm nội dung và khách tham quan bảo tàng tại Việt Nam.
            </p>
          </div>

          <div className="md:col-span-3 space-y-2.5">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#78716C]">
              Công cụ thực hành
            </p>
            <ul className="space-y-2 text-sm text-[#44403C]">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('checker')}
                  className="hover:text-[#78350F] transition-colors cursor-pointer"
                >
                  Kiểm tra tình huống sử dụng
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('citation')}
                  className="hover:text-[#78350F] transition-colors cursor-pointer"
                >
                  Tạo mẫu ghi nguồn hình ảnh
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('assistant')}
                  className="hover:text-[#78350F] transition-colors cursor-pointer"
                >
                  Trợ lý AI giải đáp
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-2.5">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#78716C]">
              Tri thức & Căn cứ
            </p>
            <ul className="space-y-2 text-sm text-[#44403C]">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('records')}
                  className="hover:text-[#78350F] transition-colors cursor-pointer"
                >
                  Tư liệu và nơi lưu giữ
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('library')}
                  className="hover:text-[#78350F] transition-colors cursor-pointer"
                >
                  Thư viện kiến thức di sản & bản quyền
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('legal')}
                  className="hover:text-[#78350F] transition-colors cursor-pointer"
                >
                  Luật Di sản văn hóa 2024 & Luật SHTT
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#78716C]">
          <p>
            Lưu ý: Nội dung tra cứu và phân tích mang tính hướng dẫn học thuật – thực hành, không thay thế tư vấn pháp lý chính thức hay văn bản chấp thuận của cơ quan quản lý di sản.
          </p>
          <p className="whitespace-nowrap shrink-0">Cập nhật theo Luật Di sản văn hóa 2024</p>
        </div>
      </div>
    </footer>
  );
}
