import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import type { PageView } from '../types/heritage';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
}

const NAV_ITEMS: { id: PageView; label: string }[] = [
  { id: 'home', label: 'Trang chủ' },
  { id: 'checker', label: 'Kiểm tra quyền' },
  { id: 'records', label: 'Tư liệu và nơi lưu giữ' },
  { id: 'library', label: 'Thư viện' },
  { id: 'citation', label: 'Ghi nguồn' },
  { id: 'legal', label: 'Pháp luật' },
];

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelect = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-sm border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 xl:gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          type="button"
          onClick={() => handleSelect('home')}
          className="font-serif text-lg sm:text-xl font-semibold tracking-tight text-[#1C1917] whitespace-nowrap shrink-0 hover:text-[#78350F] transition-colors cursor-pointer"
        >
          Cẩm nang hình ảnh di sản
        </button>

        {/* Zone 2: 6 concise single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6" aria-label="Điều hướng chính">
          {NAV_ITEMS.map((item) => {
            const isActive =
              currentPage === item.id ||
              (item.id === 'checker' && currentPage === 'result');
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                className={`text-[13px] xl:text-sm font-medium whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors cursor-pointer ${
                  isActive
                    ? 'text-[#78350F] border-[#78350F]'
                    : 'text-[#57534E] border-transparent hover:text-[#1C1917] hover:border-stone-300'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action + mobile menu trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleSelect('assistant')}
            className={`hidden sm:inline-flex items-center px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentPage === 'assistant'
                ? 'bg-[#5A361A] text-white'
                : 'bg-[#78350F] text-white hover:bg-[#5A361A]'
            }`}
          >
            Hỏi trợ lý AI
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden p-2 text-[#1C1917] hover:bg-stone-200/60 rounded-md transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? 'Đóng menu' : 'Mở menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FBF9F5] border-b border-stone-200 px-4 py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive =
              currentPage === item.id ||
              (item.id === 'checker' && currentPage === 'result');
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                className={`block w-full text-left px-3 py-2.5 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#EBE6DF] text-[#78350F]'
                    : 'text-[#44403C] hover:bg-stone-200/50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => handleSelect('assistant')}
            className="block w-full text-left px-3 py-2.5 text-sm font-medium rounded-md bg-[#78350F] text-white mt-2 cursor-pointer"
          >
            Hỏi trợ lý AI
          </button>
        </div>
      )}
    </header>
  );
}
