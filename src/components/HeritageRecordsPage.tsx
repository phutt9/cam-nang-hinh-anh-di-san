import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Building2,
  CheckCircle2,
  ExternalLink,
  FileSearch,
  Globe,
  HelpCircle,
  Info,
  MapPin,
  Search,
  ShieldAlert,
} from 'lucide-react';
import {
  DIGITIZATION_STATUS_OPTIONS,
  HERITAGE_MATERIAL_CATEGORIES,
  HERITAGE_RECORDS,
  INDEPENDENT_SOURCE_REGISTRY,
} from '../data/heritageRecords';
import type {
  DigitizationStatus,
  HeritageMaterialCategory,
  HeritageRecord,
} from '../types/heritage';

interface HeritageRecordsPageProps {
  onCheckRecordRights: (record: HeritageRecord) => void;
}

export function HeritageRecordsPage({ onCheckRecordRights }: HeritageRecordsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<HeritageMaterialCategory | 'Tất cả'>('Tất cả');
  const [selectedLocality, setSelectedLocality] = useState<string>('Tất cả');
  const [selectedDigitization, setSelectedDigitization] = useState<DigitizationStatus | 'Tất cả'>(
    'Tất cả'
  );
  const [activeRecord, setActiveRecord] = useState<HeritageRecord | null>(null);
  const [showSourcesPanel, setShowSourcesPanel] = useState(false);

  const localities = useMemo(() => {
    const set = new Set<string>();
    HERITAGE_RECORDS.forEach((r) => set.add(r.locality));
    return Array.from(set);
  }, []);

  const uniqueDomainsCount = useMemo(() => {
    const domains = new Set<string>();
    HERITAGE_RECORDS.forEach((record) => {
      record.sources.forEach((src) => domains.add(src.domain));
    });
    return domains.size;
  }, []);

  const filteredRecords = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return HERITAGE_RECORDS.filter((record) => {
      const matchType = selectedType === 'Tất cả' || record.type === selectedType;
      const matchLocality = selectedLocality === 'Tất cả' || record.locality === selectedLocality;
      const matchDigitization =
        selectedDigitization === 'Tất cả' || record.digitizationStatus === selectedDigitization;

      if (!matchType || !matchLocality || !matchDigitization) return false;
      if (!q) return true;

      return (
        record.name.toLowerCase().includes(q) ||
        record.code.toLowerCase().includes(q) ||
        record.custodian.toLowerCase().includes(q) ||
        record.originalRepository.toLowerCase().includes(q) ||
        record.era.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, selectedType, selectedLocality, selectedDigitization]);

  const getDigitizationBadge = (status: DigitizationStatus) => {
    if (status === 'Đã số hóa') {
      return {
        label: 'Đã số hóa',
        className: 'bg-[#F0FDF4] text-[#14532D] border-[#BBF7D0]',
        Icon: CheckCircle2,
      };
    }
    if (status === 'Chưa số hóa') {
      return {
        label: 'Chưa số hóa',
        className: 'bg-stone-100 text-[#44403C] border-stone-300',
        Icon: HelpCircle,
      };
    }
    return {
      label: 'Chưa xác minh số hóa',
      className: 'bg-[#FFFBEB] text-[#92400E] border-[#FDE68A]',
      Icon: HelpCircle,
    };
  };

  if (activeRecord) {
    const digBadge = getDigitizationBadge(activeRecord.digitizationStatus);
    const DigIcon = digBadge.Icon;

    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <button
          type="button"
          onClick={() => setActiveRecord(null)}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#78350F] hover:text-[#5A361A] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại danh mục Tư liệu và nơi lưu giữ
        </button>

        {/* Detail Header */}
        <header className="bg-white border border-stone-200 rounded-lg p-6 sm:p-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2.5 text-xs">
              <span className="font-mono font-semibold text-[#78350F] bg-[#F3EFE7] px-2.5 py-1 rounded border border-[#E5DEC9] tabular-nums">
                {activeRecord.code}
              </span>
              <span className="font-medium text-[#44403C] bg-stone-100 px-2.5 py-1 rounded border border-stone-200">
                {activeRecord.type}
              </span>
              <span className="text-[#57534E]">{activeRecord.locality}</span>
            </div>

            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded border ${digBadge.className}`}
            >
              <DigIcon className="w-3.5 h-3.5" />
              {activeRecord.digitizationStatus}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1C1917] leading-tight">
            {activeRecord.name}
          </h1>

          {activeRecord.unescoStatus && (
            <p className="text-xs font-medium text-[#78350F]">{activeRecord.unescoStatus}</p>
          )}

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onCheckRecordRights(activeRecord)}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-[#78350F] text-white rounded-md hover:bg-[#5A361A] transition-colors cursor-pointer"
            >
              <FileSearch className="w-4 h-4" />
              Kiểm tra quyền sử dụng hình ảnh tư liệu này
            </button>

            <a
              href={activeRecord.sources[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium bg-[#FBF9F5] text-[#78350F] border border-stone-300 rounded-md hover:border-[#78350F] transition-colors"
            >
              Mở nguồn tham khảo chính
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </header>

        {/* All 10 Structured Metadata Fields */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-stone-200 rounded-lg p-6 space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#78716C]">
                01–04. Định danh & Niên đại
              </p>
              <dl className="mt-3 space-y-3 text-sm">
                <div>
                  <dt className="text-xs text-[#78716C]">Mã tư liệu</dt>
                  <dd className="font-mono font-medium text-[#1C1917]">{activeRecord.code}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#78716C]">Tên tư liệu</dt>
                  <dd className="font-medium text-[#1C1917]">{activeRecord.name}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#78716C]">Loại tư liệu</dt>
                  <dd className="text-[#292524]">{activeRecord.type}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#78716C]">Niên đại / Thời kỳ hình thành</dt>
                  <dd className="text-[#292524]">{activeRecord.era}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="bg-white border border-stone-200 rounded-lg p-6 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#78716C]">
              06–07. Nơi lưu giữ & Đơn vị quản lý
            </p>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-xs text-[#78716C] flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-[#78350F]" />
                  Nơi lưu giữ bản gốc
                </dt>
                <dd className="mt-0.5 text-[#1C1917] leading-relaxed">
                  {activeRecord.originalRepository}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[#78716C] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#78350F]" />
                  Địa điểm di sản / Nơi trưng bày
                </dt>
                <dd className="mt-0.5 text-[#292524] leading-relaxed">
                  {activeRecord.heritageSiteOrDisplay}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[#78716C]">Đơn vị quản lý trực tiếp</dt>
                <dd className="mt-0.5 font-medium text-[#1C1917] leading-relaxed">
                  {activeRecord.custodian}
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Description & Historical Value */}
        <section className="bg-white border border-stone-200 rounded-lg p-6 sm:p-8 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#78350F]">
            05. Mô tả nội dung và giá trị lịch sử, văn hóa
          </p>
          <p className="text-sm sm:text-base text-[#292524] leading-relaxed">
            {activeRecord.description}
          </p>
        </section>

        {/* Digitization & Image Rights Notes */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#F3EFE7] border border-stone-200 rounded-lg p-6 space-y-2.5">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#78350F]">
              08. Tình trạng số hóa
            </p>
            <p className="text-sm font-semibold text-[#1C1917]">
              Trạng thái: {activeRecord.digitizationStatus}
            </p>
            <p className="text-sm text-[#44403C] leading-relaxed">{activeRecord.digitizationNote}</p>
          </div>

          <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-lg p-6 space-y-2.5">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#92400E] flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4" />
              10. Ghi chú về quyền sử dụng hình ảnh
            </p>
            <p className="text-sm text-[#44403C] leading-relaxed">{activeRecord.imageRightsNote}</p>
          </div>
        </section>

        {/* Reference Sources */}
        <section className="bg-white border border-stone-200 rounded-lg p-6 sm:p-8 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#78716C]">
            09. Nguồn tham khảo đối chiếu ({activeRecord.sources.length} tài liệu chính thức)
          </p>

          <div className="divide-y divide-stone-200">
            {activeRecord.sources.map((source, idx) => (
              <div
                key={`${source.url}-${idx}`}
                className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <p className="text-xs font-mono text-[#78350F]">{source.domain}</p>
                  <p className="text-sm font-semibold text-[#1C1917]">{source.agencyName}</p>
                  <p className="text-sm text-[#57534E]">{source.documentTitle}</p>
                </div>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#78350F] bg-[#FBF9F5] border border-stone-300 rounded-md hover:border-[#78350F] whitespace-nowrap shrink-0 self-start sm:self-center"
                >
                  Mở nguồn
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header & Search */}
      <div className="border-b border-stone-200 pb-6 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-[#78350F]">
            Danh mục {HERITAGE_RECORDS.length} tư liệu từ {uniqueDomainsCount} nguồn độc lập
          </p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-[#1C1917]">
            Tư liệu và nơi lưu giữ
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#57534E] max-w-3xl">
            Tra cứu thông tin gốc, phân biệt nơi chế tác trong lịch sử với cơ quan lưu giữ hiện
            nay, tình trạng số hóa và đường dẫn kiểm chứng từ các cơ quan quản lý di sản, lưu trữ
            và bảo tàng Việt Nam.
          </p>
        </div>

        <div className="w-full lg:w-80 relative">
          <Search className="w-4 h-4 text-[#78716C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm tên tư liệu, mã TL, nơi lưu giữ..."
            aria-label="Tìm kiếm tư liệu theo tên"
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-stone-300 rounded-md focus:outline-none focus:border-[#78350F]"
          />
        </div>
      </div>

      {/* Transparency Banner + Collapsible Independent Sources Registry */}
      <div className="bg-[#F3EFE7] border border-stone-200 rounded-lg p-5 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-2.5 text-sm text-[#44403C] leading-relaxed">
            <Info className="w-4 h-4 text-[#78350F] shrink-0 mt-0.5" />
            <p>
              <strong className="text-[#1C1917]">Nguyên tắc đối chiếu dữ liệu:</strong> Mỗi bản ghi
              tách bạch giữa <em>nơi lưu giữ bản gốc</em> và <em>địa điểm di sản/trưng bày</em>.
              Thông tin chưa đủ chứng cứ công khai được ghi rõ{' '}
              <span className="font-semibold text-[#92400E]">“Chưa xác minh”</span>; trạng thái{' '}
              <em>“Đã số hóa”</em> không đồng nghĩa ảnh được tự do sử dụng.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowSourcesPanel((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#78350F] bg-white border border-stone-300 rounded-md hover:border-[#78350F] whitespace-nowrap shrink-0 cursor-pointer self-start sm:self-center"
          >
            <Globe className="w-3.5 h-3.5" />
            {showSourcesPanel
              ? 'Ẩn danh sách nguồn độc lập'
              : `Xem ${uniqueDomainsCount} nguồn độc lập`}
          </button>
        </div>

        {showSourcesPanel && (
          <div className="pt-3 border-t border-stone-300/70 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {INDEPENDENT_SOURCE_REGISTRY.map((src) => (
              <div
                key={src.domain}
                className="bg-white border border-stone-200 rounded-md p-3 text-xs space-y-1"
              >
                <p className="font-mono font-semibold text-[#78350F]">{src.domain}</p>
                <p className="font-medium text-[#1C1917]">{src.agencyName}</p>
                <p className="text-[#57534E] leading-relaxed">{src.roleDescription}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Filters: Loại tư liệu + Địa phương + Tình trạng số hóa */}
      <div className="bg-white border border-stone-200 rounded-lg p-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="filter-type"
              className="block text-xs font-semibold uppercase tracking-wider text-[#78716C] mb-1.5"
            >
              Loại tư liệu
            </label>
            <select
              id="filter-type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as HeritageMaterialCategory | 'Tất cả')}
              className="w-full px-3 py-2 text-sm bg-[#FBF9F5] border border-stone-300 rounded-md focus:outline-none focus:border-[#78350F]"
            >
              <option value="Tất cả">Tất cả loại tư liệu ({HERITAGE_RECORDS.length})</option>
              {HERITAGE_MATERIAL_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="filter-locality"
              className="block text-xs font-semibold uppercase tracking-wider text-[#78716C] mb-1.5"
            >
              Địa phương lưu giữ / di sản
            </label>
            <select
              id="filter-locality"
              value={selectedLocality}
              onChange={(e) => setSelectedLocality(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-[#FBF9F5] border border-stone-300 rounded-md focus:outline-none focus:border-[#78350F]"
            >
              <option value="Tất cả">Tất cả địa phương</option>
              {localities.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="filter-digitization"
              className="block text-xs font-semibold uppercase tracking-wider text-[#78716C] mb-1.5"
            >
              Tình trạng số hóa
            </label>
            <select
              id="filter-digitization"
              value={selectedDigitization}
              onChange={(e) =>
                setSelectedDigitization(e.target.value as DigitizationStatus | 'Tất cả')
              }
              className="w-full px-3 py-2 text-sm bg-[#FBF9F5] border border-stone-300 rounded-md focus:outline-none focus:border-[#78350F]"
            >
              <option value="Tất cả">Tất cả trạng thái</option>
              {DIGITIZATION_STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-100 text-xs text-[#57534E]">
          <span>
            Đang hiển thị <strong className="text-[#1C1917]">{filteredRecords.length}</strong> /{' '}
            {HERITAGE_RECORDS.length} bản ghi tư liệu
          </span>
          {(searchQuery ||
            selectedType !== 'Tất cả' ||
            selectedLocality !== 'Tất cả' ||
            selectedDigitization !== 'Tất cả') && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedType('Tất cả');
                setSelectedLocality('Tất cả');
                setSelectedDigitization('Tất cả');
              }}
              className="text-[#78350F] font-medium hover:underline cursor-pointer"
            >
              Đặt lại bộ lọc
            </button>
          )}
        </div>
      </div>

      {/* Records List Grid */}
      {filteredRecords.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-lg p-12 text-center">
          <p className="font-serif text-lg text-[#1C1917]">
            Không tìm thấy tư liệu phù hợp với điều kiện lọc hiện tại.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedType('Tất cả');
              setSelectedLocality('Tất cả');
              setSelectedDigitization('Tất cả');
            }}
            className="mt-4 px-4 py-2 text-sm font-medium text-[#78350F] border border-[#78350F] rounded-md hover:bg-[#F3EFE7] cursor-pointer"
          >
            Hiển thị tất cả {HERITAGE_RECORDS.length} tư liệu
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecords.map((record) => {
            const digBadge = getDigitizationBadge(record.digitizationStatus);
            const primarySource = record.sources[0];

            return (
              <article
                key={record.id}
                className="bg-white border border-stone-200 rounded-lg p-6 flex flex-col justify-between hover:border-[#9A6B2F] transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-semibold text-[#78350F] tabular-nums">
                        {record.code}
                      </span>
                      <span className="text-[#78716C]">·</span>
                      <span className="font-medium text-[#44403C]">{record.type}</span>
                    </div>
                    <span
                      className={`px-2 py-0.5 text-[11px] font-medium rounded border ${digBadge.className}`}
                    >
                      {record.digitizationStatus}
                    </span>
                  </div>

                  <h2 className="font-serif text-xl font-semibold text-[#1C1917] leading-snug">
                    {record.name}
                  </h2>

                  <dl className="space-y-2 text-xs text-[#44403C]">
                    <div>
                      <dt className="text-[#78716C]">Niên đại / Thời kỳ:</dt>
                      <dd className="font-medium text-[#292524]">{record.era}</dd>
                    </div>
                    <div>
                      <dt className="text-[#78716C]">Nơi lưu giữ / Địa điểm:</dt>
                      <dd className="text-[#292524] line-clamp-2">{record.originalRepository}</dd>
                    </div>
                    <div>
                      <dt className="text-[#78716C]">Nguồn chính thức:</dt>
                      <dd className="font-medium text-[#78350F] truncate">
                        {primarySource.agencyName} ({primarySource.domain})
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveRecord(record)}
                    className="inline-flex items-center gap-1 text-sm font-medium text-[#78350F] hover:text-[#5A361A] cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    Xem chi tiết →
                  </button>

                  <a
                    href={primarySource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-[#57534E] hover:text-[#78350F] hover:underline"
                    title={primarySource.documentTitle}
                  >
                    Mở nguồn
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
