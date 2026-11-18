import { useState, useMemo, useEffect } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { ArchivalImage } from './ArchivalImage';
import { KNOWLEDGE_ARTICLES, KNOWLEDGE_CATEGORIES } from '../data/knowledgeArticles';
import type { KnowledgeArticle, KnowledgeCategory } from '../types/heritage';

interface LibraryPageProps {
  initialArticleId?: string | null;
  onClearInitialArticle?: () => void;
}

export function LibraryPage({
  initialArticleId,
  onClearInitialArticle,
}: LibraryPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<KnowledgeCategory | 'Tất cả'>('Tất cả');
  const [activeArticle, setActiveArticle] = useState<KnowledgeArticle | null>(null);

  useEffect(() => {
    if (initialArticleId) {
      const found = KNOWLEDGE_ARTICLES.find((a) => a.id === initialArticleId);
      if (found) {
        setActiveArticle(found);
      }
    }
  }, [initialArticleId]);

  const filteredArticles = useMemo(() => {
    return KNOWLEDGE_ARTICLES.filter((article) => {
      const matchesCategory =
        selectedCategory === 'Tất cả' || article.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesCategory;
      const matchesText =
        article.title.toLowerCase().includes(q) ||
        article.summary.toLowerCase().includes(q) ||
        article.category.toLowerCase().includes(q) ||
        article.legalBasis.toLowerCase().includes(q);
      return matchesCategory && matchesText;
    });
  }, [searchQuery, selectedCategory]);

  const handleCloseArticle = () => {
    setActiveArticle(null);
    if (onClearInitialArticle) onClearInitialArticle();
  };

  if (activeArticle) {
    return (
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <button
          type="button"
          onClick={handleCloseArticle}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#78350F] hover:text-[#5A361A] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại Thư viện kiến thức
        </button>

        <header className="mt-6 pb-6 border-b border-stone-200">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#78716C]">
            <span className="font-medium text-[#78350F]">{activeArticle.category}</span>
            <span aria-hidden="true">·</span>
            <span>{activeArticle.readTime}</span>
            <span aria-hidden="true">·</span>
            <span>Cập nhật {activeArticle.updatedAt}</span>
          </div>
          <h1 className="mt-3 font-serif text-3xl sm:text-4xl font-semibold text-[#1C1917] leading-tight">
            {activeArticle.title}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[#57534E] leading-relaxed">
            {activeArticle.subtitle}
          </p>
        </header>

        <figure className="mt-8">
          <div className="aspect-[16/9] overflow-hidden rounded-lg border border-stone-200 bg-[#EBE6DF]">
            <ArchivalImage
              src={activeArticle.imagePath}
              alt={activeArticle.imageCaption}
              className="w-full h-full object-cover"
              fallbackTitle={activeArticle.title}
            />
          </div>
          <figcaption className="mt-2.5 text-xs font-serif italic text-[#78716C]">
            {activeArticle.imageCaption}
          </figcaption>
        </figure>

        {/* Long-form Editorial Body */}
        <div className="mt-8 max-w-prose space-y-5 text-base text-[#292524] leading-[1.8]">
          {activeArticle.contentParagraphs.map((para, idx) => (
            <p
              key={idx}
              className={
                idx === 0
                  ? 'first-letter:text-5xl first-letter:font-serif first-letter:font-semibold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#78350F]'
                  : ''
              }
            >
              {para}
            </p>
          ))}
        </div>

        {/* Practical Example & Illustrative Scenario */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-stone-200 rounded-lg p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#78350F]">
              Ví dụ thực tế
            </p>
            <p className="mt-3 text-sm text-[#44403C] leading-relaxed">
              {activeArticle.practicalExample}
            </p>
          </div>

          <div className="bg-[#F3EFE7] border border-stone-200 rounded-lg p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#78350F]">
              Tình huống minh họa
            </p>
            <p className="mt-3 text-sm text-[#44403C] leading-relaxed">
              {activeArticle.illustrativeScenario}
            </p>
          </div>
        </div>

        {/* Legal Basis */}
        <div className="mt-6 bg-white border border-stone-200 rounded-lg p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#78716C]">
            Căn cứ pháp lý & Nguồn tham khảo
          </p>
          <p className="mt-2 text-sm text-[#1C1917] font-medium leading-relaxed">
            {activeArticle.legalBasis}
          </p>
        </div>
      </article>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header & Search */}
      <div className="border-b border-stone-200 pb-6 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-[#78350F]">
            8 chuyên mục nền tảng
          </p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-[#1C1917]">
            Thư viện kiến thức quyền sử dụng hình ảnh di sản
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#57534E] max-w-2xl">
            Tìm hiểu các khái niệm cốt lõi kèm ví dụ thực tế, tình huống minh họa và căn cứ pháp lý
            Việt Nam hiện hành.
          </p>
        </div>

        <div className="w-full lg:w-80 relative">
          <Search className="w-4 h-4 text-[#78716C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm bài viết, từ khóa..."
            aria-label="Tìm kiếm bài viết trong thư viện"
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-stone-300 rounded-md focus:outline-none focus:border-[#78350F]"
          />
        </div>
      </div>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Lọc theo chuyên mục">
        <button
          type="button"
          onClick={() => setSelectedCategory('Tất cả')}
          className={`px-3.5 py-2 text-xs font-medium rounded-md border transition-colors cursor-pointer ${
            selectedCategory === 'Tất cả'
              ? 'bg-[#78350F] text-white border-[#78350F]'
              : 'bg-white text-[#44403C] border-stone-200 hover:border-stone-400'
          }`}
        >
          Tất cả ({KNOWLEDGE_ARTICLES.length})
        </button>
        {KNOWLEDGE_CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setSelectedCategory(category)}
            className={`px-3.5 py-2 text-xs font-medium rounded-md border transition-colors cursor-pointer ${
              selectedCategory === category
                ? 'bg-[#78350F] text-white border-[#78350F]'
                : 'bg-white text-[#44403C] border-stone-200 hover:border-stone-400'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Article Grid */}
      {filteredArticles.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-lg p-12 text-center">
          <p className="font-serif text-lg text-[#1C1917]">
            Không tìm thấy bài viết phù hợp với từ khóa "{searchQuery}".
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('Tất cả');
            }}
            className="mt-4 px-4 py-2 text-sm font-medium text-[#78350F] border border-[#78350F] rounded-md hover:bg-[#F3EFE7] cursor-pointer"
          >
            Hiển thị tất cả bài viết
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="bg-white border border-stone-200 rounded-lg overflow-hidden flex flex-col justify-between hover:border-[#9A6B2F] transition-colors"
            >
              <div>
                <div className="aspect-[4/3] bg-[#EBE6DF] overflow-hidden">
                  <ArchivalImage
                    src={article.imagePath}
                    alt={article.imageCaption}
                    className="w-full h-full object-cover"
                    fallbackTitle={article.title}
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-[#78716C]">
                    <span className="truncate max-w-[200px] text-[#78350F] font-medium">
                      {article.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="shrink-0">{article.updatedAt}</span>
                  </div>
                  <h2 className="mt-2.5 font-serif text-xl font-semibold text-[#1C1917] leading-snug">
                    {article.title}
                  </h2>
                  <p className="mt-2 text-sm text-[#57534E] leading-relaxed">
                    {article.summary}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-3 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs text-[#78716C]">{article.readTime}</span>
                <button
                  type="button"
                  onClick={() => setActiveArticle(article)}
                  className="text-sm font-medium text-[#78350F] hover:text-[#5A361A] cursor-pointer"
                >
                  Đọc chi tiết →
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
