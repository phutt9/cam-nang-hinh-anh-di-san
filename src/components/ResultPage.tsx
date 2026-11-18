import {
  AlertTriangle,
  ArrowLeft,
  Bot,
  CheckCircle2,
  HelpCircle,
  Quote,
  ShieldAlert,
} from 'lucide-react';
import {
  ATTRIBUTION_LABELS,
  MATERIAL_LABELS,
  MODIFICATION_LABELS,
  PERMISSION_LABELS,
  PERMISSION_SCOPE_LABELS,
  PURPOSE_LABELS,
  SOURCE_LABELS,
} from '../utils/evaluator';
import type { CheckWizardInput, EvaluationResult } from '../types/heritage';

interface ResultPageProps {
  input: CheckWizardInput;
  result: EvaluationResult;
  onBackToChecker: () => void;
  onGoToCitation: (prefill: {
    artifactName?: string;
    custodianName?: string;
    purpose?: string;
  }) => void;
  onAskAiWithContext: (contextSummary: string) => void;
}

export function ResultPage({
  input,
  result,
  onBackToChecker,
  onGoToCitation,
  onAskAiWithContext,
}: ResultPageProps) {
  const tierStyles = {
    low: {
      container: 'bg-[#F0F7F2] border-[#B7D7C2] text-[#14532D]',
      icon: CheckCircle2,
      tag: 'MỨC ĐỘ KIỂM TRA: THẤP',
    },
    medium: {
      container: 'bg-[#FEF9EE] border-[#E7CFA0] text-[#78350F]',
      icon: AlertTriangle,
      tag: 'MỨC ĐỘ KIỂM TRA: TRUNG BÌNH',
    },
    high: {
      container: 'bg-[#FEF2F2] border-[#E8B8B8] text-[#991B1B]',
      icon: ShieldAlert,
      tag: 'MỨC ĐỘ KIỂM TRA: CAO',
    },
    verify: {
      container: 'bg-[#F3EFE7] border-[#D6CEBE] text-[#44403C]',
      icon: HelpCircle,
      tag: 'CẦN XÁC MINH THÊM',
    },
  };

  const activeTier = tierStyles[result.riskTier] || tierStyles.verify;
  const TierIcon = activeTier.icon;

  const buildContextSummary = () => {
    return [
      `Loại tư liệu: ${MATERIAL_LABELS[input.materialType] || 'Chưa rõ'}`,
      `Nguồn ảnh: ${SOURCE_LABELS[input.imageSource] || 'Chưa rõ'}`,
      `Mục đích sử dụng: ${PURPOSE_LABELS[input.usagePurpose] || 'Chưa rõ'}`,
      `Chỉnh sửa: ${MODIFICATION_LABELS[input.modification] || 'Chưa rõ'}`,
      `Thông tin tác giả/nguồn gốc: ${ATTRIBUTION_LABELS[input.attributionInfo] || 'Chưa rõ'}`,
      `Tình trạng xin phép: ${PERMISSION_LABELS[input.permissionStatus] || 'Chưa rõ'}`,
      input.permissionStatus === 'permitted'
        ? `Phạm vi cấp phép: ${
            input.permissionScopeStatus
              ? PERMISSION_SCOPE_LABELS[input.permissionScopeStatus]
              : 'Chưa xác nhận chi tiết chủ thể, phạm vi, chỉnh sửa và thời hạn'
          }`
        : '',
      input.artifactName ? `Tên hiện vật: ${input.artifactName}` : '',
      input.custodianName ? `Đơn vị lưu giữ: ${input.custodianName}` : '',
      `Phân loại trạng thái: ${result.legalStatusCategory || 'Cần xác minh thêm'}`,
      `Kết quả sơ bộ: ${result.riskLevel}`,
    ]
      .filter(Boolean)
      .join('\n');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <button
            type="button"
            onClick={onBackToChecker}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#78350F] hover:text-[#5A361A] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Chỉnh sửa câu trả lời kiểm tra
          </button>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-[#1C1917]">
            Kết quả đánh giá tình huống sử dụng hình ảnh
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() =>
              onGoToCitation({
                artifactName: input.artifactName,
                custodianName: input.custodianName,
                purpose: PURPOSE_LABELS[input.usagePurpose] || '',
              })
            }
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-stone-300 hover:border-[#78350F] text-[#1C1917] text-sm font-medium rounded-md transition-colors cursor-pointer"
          >
            <Quote className="w-4 h-4 text-[#78350F]" />
            Tạo mẫu ghi nguồn
          </button>
          <button
            type="button"
            onClick={() => onAskAiWithContext(buildContextSummary())}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#78350F] hover:bg-[#5A361A] text-white text-sm font-medium rounded-md transition-colors cursor-pointer"
          >
            <Bot className="w-4 h-4" />
            Phân tích sâu với Trợ lý AI
          </button>
        </div>
      </div>

      {/* Verdict Banner */}
      <section className={`border rounded-lg p-6 sm:p-8 ${activeTier.container}`}>
        <div className="flex items-start gap-4">
          <TierIcon className="w-6 h-6 shrink-0 mt-0.5" />
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-mono text-xs font-semibold tracking-wider">{activeTier.tag}</p>
              {result.legalStatusCategory && (
                <>
                  <span className="text-xs opacity-40" aria-hidden="true">
                    ·
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wide">
                    {result.legalStatusCategory}
                  </span>
                </>
              )}
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1C1917]">
              {result.summaryHeadline}
            </h2>
            <p className="text-sm sm:text-base text-[#1C1917]/90 leading-relaxed max-w-3xl">
              {result.permissionVerdict}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-8">
          {/* 4-Layer Rights Distinction */}
          <section className="bg-white border border-stone-200 rounded-lg p-6 sm:p-8">
            <h3 className="font-serif text-xl font-semibold text-[#1C1917]">
              Phân tách 4 tầng quyền đối với tình huống của bạn
            </h3>
            <p className="mt-1 text-sm text-[#57534E]">
              Không đồng nhất quyền sở hữu hiện vật với quyền đối với hình ảnh hoặc quyền khai thác.
            </p>

            <dl className="mt-6 divide-y divide-stone-200">
              <div className="py-4 first:pt-0">
                <dt className="text-xs font-semibold uppercase tracking-wider text-[#78350F]">
                  1. Quyền sở hữu hiện vật / di sản gốc
                </dt>
                <dd className="mt-1 text-sm text-[#44403C] leading-relaxed">
                  {result.fourLayers.artifactOwnership}
                </dd>
              </div>
              <div className="py-4">
                <dt className="text-xs font-semibold uppercase tracking-wider text-[#78350F]">
                  2. Quyền quản lý của bảo tàng / cơ quan lưu giữ
                </dt>
                <dd className="mt-1 text-sm text-[#44403C] leading-relaxed">
                  {result.fourLayers.custodianManagement}
                </dd>
              </div>
              <div className="py-4">
                <dt className="text-xs font-semibold uppercase tracking-wider text-[#78350F]">
                  3. Quyền tác giả đối với bức ảnh / bản số hóa
                </dt>
                <dd className="mt-1 text-sm text-[#44403C] leading-relaxed">
                  {result.fourLayers.photoCopyright}
                </dd>
              </div>
              <div className="py-4 last:pb-0">
                <dt className="text-xs font-semibold uppercase tracking-wider text-[#78350F]">
                  4. Phạm vi khai thác & mục đích sử dụng
                </dt>
                <dd className="mt-1 text-sm text-[#44403C] leading-relaxed">
                  {result.fourLayers.exploitationScope}
                </dd>
              </div>
            </dl>
          </section>

          {/* Legal Issues & Contacts */}
          <section className="bg-white border border-stone-200 rounded-lg p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="font-serif text-xl font-semibold text-[#1C1917]">
                Những vấn đề pháp lý cần lưu ý
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-[#44403C] leading-relaxed list-disc pl-5">
                {result.legalIssues.map((issue, idx) => (
                  <li key={idx}>{issue}</li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t border-stone-200">
              <h3 className="font-serif text-xl font-semibold text-[#1C1917]">
                Cơ quan hoặc chủ thể nên liên hệ để xác nhận
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-[#44403C] list-disc pl-5">
                {result.contactsToReach.map((contact, idx) => (
                  <li key={idx}>{contact}</li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t border-stone-200">
              <h3 className="font-serif text-xl font-semibold text-[#1C1917]">
                Hướng dẫn ghi nguồn hình ảnh
              </h3>
              <p className="mt-2 text-sm text-[#44403C] leading-relaxed bg-[#FBF9F5] border border-stone-200 rounded-md p-4">
                {result.citationGuidance}
              </p>
            </div>
          </section>

          {/* Next Actions */}
          <section className="bg-white border border-stone-200 rounded-lg p-6 sm:p-8">
            <h3 className="font-serif text-xl font-semibold text-[#1C1917]">
              Những hành động bạn nên thực hiện tiếp theo
            </h3>
            <ol className="mt-4 space-y-3 text-sm text-[#44403C] leading-relaxed">
              {result.nextActions.map((action, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="font-mono text-xs font-semibold text-[#78350F] bg-[#F3EFE7] border border-stone-200 px-2 py-0.5 rounded shrink-0 tabular-nums">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span>{action}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>

        {/* Summary & Legal Basis Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-[#F3EFE7] border border-stone-200 rounded-lg p-6">
            <h3 className="font-serif text-lg font-semibold text-[#1C1917]">
              Thông tin bạn đã cung cấp
            </h3>
            <dl className="mt-4 space-y-3 text-xs">
              <div>
                <dt className="text-[#78716C]">Loại tư liệu</dt>
                <dd className="font-medium text-[#1C1917] mt-0.5">
                  {MATERIAL_LABELS[input.materialType] || 'Chưa xác định'}
                </dd>
              </div>
              <div>
                <dt className="text-[#78716C]">Nguồn hình ảnh</dt>
                <dd className="font-medium text-[#1C1917] mt-0.5">
                  {SOURCE_LABELS[input.imageSource] || 'Chưa xác định'}
                </dd>
              </div>
              <div>
                <dt className="text-[#78716C]">Mục đích sử dụng</dt>
                <dd className="font-medium text-[#1C1917] mt-0.5">
                  {PURPOSE_LABELS[input.usagePurpose] || 'Chưa xác định'}
                </dd>
              </div>
              <div>
                <dt className="text-[#78716C]">Chỉnh sửa hình ảnh</dt>
                <dd className="font-medium text-[#1C1917] mt-0.5">
                  {MODIFICATION_LABELS[input.modification] || 'Chưa xác định'}
                </dd>
              </div>
              <div>
                <dt className="text-[#78716C]">Thông tin tác giả / nguồn gốc</dt>
                <dd className="font-medium text-[#1C1917] mt-0.5">
                  {ATTRIBUTION_LABELS[input.attributionInfo] || 'Chưa xác định'}
                </dd>
              </div>
              <div>
                <dt className="text-[#78716C]">Tình trạng xin phép</dt>
                <dd className="font-medium text-[#1C1917] mt-0.5">
                  {PERMISSION_LABELS[input.permissionStatus] || 'Chưa xác định'}
                </dd>
              </div>
              {input.permissionStatus === 'permitted' && (
                <div>
                  <dt className="text-[#78716C]">Phạm vi & điều kiện cấp phép</dt>
                  <dd className="font-medium text-[#1C1917] mt-0.5">
                    {input.permissionScopeStatus
                      ? PERMISSION_SCOPE_LABELS[input.permissionScopeStatus]
                      : 'Chưa xác minh đầy đủ'}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          <div className="bg-white border border-stone-200 rounded-lg p-6">
            <h3 className="font-serif text-lg font-semibold text-[#1C1917]">
              Căn cứ tham chiếu
            </h3>
            <ul className="mt-3 space-y-2 text-xs text-[#44403C] leading-relaxed list-disc pl-4">
              {result.legalBasis.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <p className="mt-4 pt-4 border-t border-stone-200 text-xs text-[#78716C] leading-relaxed">
              {result.cannotConcludeWarning}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
