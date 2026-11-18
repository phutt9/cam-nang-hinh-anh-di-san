import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  History,
  RotateCcw,
  Trash2,
} from 'lucide-react';
import { SAMPLE_SCENARIOS } from '../data/sampleScenarios';
import {
  ATTRIBUTION_LABELS,
  MATERIAL_LABELS,
  MODIFICATION_LABELS,
  PERMISSION_LABELS,
  PERMISSION_SCOPE_LABELS,
  PURPOSE_LABELS,
  SOURCE_LABELS,
} from '../utils/evaluator';
import type {
  AttributionInfo,
  CheckHistoryItem,
  CheckWizardInput,
  ImageSource,
  MaterialType,
  ModificationLevel,
  PermissionScopeStatus,
  PermissionStatus,
  UsagePurpose,
} from '../types/heritage';

interface CheckerPageProps {
  initialInput?: CheckWizardInput | null;
  history: CheckHistoryItem[];
  onSubmitCheck: (input: CheckWizardInput) => void;
  onOpenHistoryItem: (item: CheckHistoryItem) => void;
  onDeleteHistoryItem: (id: string) => void;
  onClearHistory: () => void;
}

const EMPTY_INPUT: CheckWizardInput = {
  materialType: '',
  imageSource: '',
  usagePurpose: '',
  modification: '',
  attributionInfo: '',
  permissionStatus: '',
  permissionScopeStatus: '',
  artifactName: '',
  custodianName: '',
};

interface StepConfig<T extends string> {
  key: keyof CheckWizardInput;
  stepNumber: string;
  question: string;
  helper: string;
  options: { value: T; label: string; note?: string }[];
}

const STEP_1: StepConfig<MaterialType> = {
  key: 'materialType',
  stepNumber: '01',
  question: 'Bạn muốn sử dụng loại tư liệu hoặc hình ảnh nào?',
  helper:
    'Phân biệt rõ bản sao di sản tư liệu chế tác theo Điều 63 Luật DSVH 2024 với ảnh chụp hiện vật thông thường, bản sao tài liệu thông thường, tệp ảnh số hóa và bản gốc di sản tư liệu.',
  options: [
    { value: 'doc_heritage_copy_63', label: MATERIAL_LABELS.doc_heritage_copy_63 },
    { value: 'museum_artifact', label: MATERIAL_LABELS.museum_artifact },
    { value: 'heritage_site', label: MATERIAL_LABELS.heritage_site },
    { value: 'ordinary_doc_copy', label: MATERIAL_LABELS.ordinary_doc_copy },
    { value: 'digitized_material', label: MATERIAL_LABELS.digitized_material },
    { value: 'stele_ancient_doc', label: MATERIAL_LABELS.stele_ancient_doc },
    { value: 'other', label: MATERIAL_LABELS.other },
  ],
};

const STEP_2: StepConfig<ImageSource> = {
  key: 'imageSource',
  stepNumber: '02',
  question: 'Hình ảnh được lấy từ đâu?',
  helper: 'Nguồn cung cấp ảnh quyết định ai đang nắm quyền quản lý dữ liệu và quyền tác giả đối với bức ảnh.',
  options: [
    { value: 'museum_website', label: SOURCE_LABELS.museum_website },
    { value: 'heritage_agency_website', label: SOURCE_LABELS.heritage_agency_website },
    { value: 'national_archive', label: SOURCE_LABELS.national_archive },
    { value: 'book_research', label: SOURCE_LABELS.book_research },
    { value: 'academic_repository', label: SOURCE_LABELS.academic_repository },
    { value: 'social_media', label: SOURCE_LABELS.social_media },
    { value: 'self_captured', label: SOURCE_LABELS.self_captured },
    { value: 'other', label: SOURCE_LABELS.other },
  ],
};

const STEP_3: StepConfig<UsagePurpose> = {
  key: 'usagePurpose',
  stepNumber: '03',
  question: 'Bạn muốn sử dụng hình ảnh vào mục đích gì?',
  helper:
    'Phân biệt rõ tự học tập cá nhân, nộp bài nội bộ, trích dẫn hợp lý phi thương mại với công bố công khai trên mạng, truyền thông, xuất bản và thương mại.',
  options: [
    { value: 'personal_study', label: PURPOSE_LABELS.personal_study },
    { value: 'assignment_research', label: PURPOSE_LABELS.assignment_research },
    { value: 'reasonable_citation', label: PURPOSE_LABELS.reasonable_citation },
    { value: 'website_social', label: PURPOSE_LABELS.website_social },
    { value: 'media_promotion', label: PURPOSE_LABELS.media_promotion },
    { value: 'book_publication', label: PURPOSE_LABELS.book_publication },
    { value: 'commercial_business', label: PURPOSE_LABELS.commercial_business },
  ],
};

const STEP_4: StepConfig<ModificationLevel> = {
  key: 'modification',
  stepNumber: '04',
  question: 'Bạn có dự định chỉnh sửa hình ảnh không?',
  helper: 'Mức độ can thiệp ảnh hưởng đến quyền nhân thân của tác giả ảnh và nguyên tắc không làm sai lệch giá trị di sản.',
  options: [
    { value: 'none', label: MODIFICATION_LABELS.none },
    { value: 'crop_resize', label: MODIFICATION_LABELS.crop_resize },
    { value: 'color_restore', label: MODIFICATION_LABELS.color_restore },
    { value: 'collage_derivative', label: MODIFICATION_LABELS.collage_derivative },
    { value: 'ai_processing', label: 'Sử dụng hình ảnh bằng AI (tạo sinh, phục chế hoặc biến đổi)' },
  ],
};

const STEP_5: StepConfig<AttributionInfo> = {
  key: 'attributionInfo',
  stepNumber: '05',
  question: 'Hình ảnh có thông tin về tác giả hoặc nguồn gốc không?',
  helper: 'Thiếu thông tin tác giả hoặc nguồn gốc khiến bạn không thể thực hiện nghĩa vụ ghi nguồn bắt buộc.',
  options: [
    { value: 'complete', label: ATTRIBUTION_LABELS.complete },
    { value: 'custodian_only', label: ATTRIBUTION_LABELS.custodian_only },
    { value: 'no_info', label: ATTRIBUTION_LABELS.no_info },
    { value: 'unknown_origin', label: ATTRIBUTION_LABELS.unknown_origin },
  ],
};

const STEP_6: StepConfig<PermissionStatus> = {
  key: 'permissionStatus',
  stepNumber: '06',
  question: 'Bạn đã được cơ quan hoặc chủ thể có liên quan cho phép sử dụng chưa?',
  helper: 'Nếu đã được cho phép, cần xác nhận thêm chủ thể cấp phép, phạm vi, quyền chỉnh sửa và thời hạn.',
  options: [
    { value: 'permitted', label: PERMISSION_LABELS.permitted },
    { value: 'not_permitted', label: PERMISSION_LABELS.not_permitted },
    { value: 'unsure', label: PERMISSION_LABELS.unsure },
  ],
};

const PERMISSION_SCOPE_OPTIONS: { value: PermissionScopeStatus; label: string }[] = [
  { value: 'verified_full', label: PERMISSION_SCOPE_LABELS.verified_full },
  { value: 'missing_details', label: PERMISSION_SCOPE_LABELS.missing_details },
];

const ALL_STEPS = [STEP_1, STEP_2, STEP_3, STEP_4, STEP_5, STEP_6] as const;

export function CheckerPage({
  initialInput,
  history,
  onSubmitCheck,
  onOpenHistoryItem,
  onDeleteHistoryItem,
  onClearHistory,
}: CheckerPageProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState<CheckWizardInput>(initialInput || EMPTY_INPUT);
  const [validationError, setValidationError] = useState('');
  const [activeSampleId, setActiveSampleId] = useState<string | null>(null);
  const [expandedSampleId, setExpandedSampleId] = useState<string | null>(null);

  useEffect(() => {
    if (initialInput) {
      setFormData(initialInput);
      setActiveSampleId(null);
      setStepIndex(0);
      setValidationError('');
    }
  }, [initialInput]);

  const currentStep = ALL_STEPS[stepIndex];
  const currentValue = formData[currentStep.key] as string;

  const handleSelectOption = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [currentStep.key]: value,
      ...(currentStep.key === 'permissionStatus' && value !== 'permitted'
        ? { permissionScopeStatus: '' }
        : {}),
    }));
    setValidationError('');
  };

  const handleValidateAndSubmit = () => {
    const firstMissingIdx = ALL_STEPS.findIndex((s) => !formData[s.key]);
    if (firstMissingIdx !== -1) {
      const missingStep = ALL_STEPS[firstMissingIdx];
      setStepIndex(firstMissingIdx);
      setValidationError(
        `Vui lòng hoàn thành Bước ${missingStep.stepNumber} ("${missingStep.question}") trước khi đánh giá.`
      );
      return;
    }
    if (formData.permissionStatus === 'permitted' && !formData.permissionScopeStatus) {
      setStepIndex(ALL_STEPS.length - 1);
      setValidationError(
        'Vui lòng xác nhận mức độ đầy đủ của chủ thể cấp phép, phạm vi và thời hạn ở Bước 06.'
      );
      return;
    }
    onSubmitCheck(formData);
  };

  const handleNext = () => {
    if (!currentValue) {
      setValidationError('Vui lòng chọn một phương án trước khi tiếp tục.');
      return;
    }
    if (stepIndex < ALL_STEPS.length - 1) {
      setStepIndex((prev) => prev + 1);
    } else {
      handleValidateAndSubmit();
    }
  };

  const handlePrev = () => {
    setValidationError('');
    if (stepIndex > 0) {
      setStepIndex((prev) => prev - 1);
    }
  };

  const handleLoadSample = (sampleId: string) => {
    const found = SAMPLE_SCENARIOS.find((s) => s.id === sampleId);
    if (!found) return;
    setFormData(found.prefillInput);
    setActiveSampleId(sampleId);
    setExpandedSampleId(sampleId);
    setStepIndex(0);
    setValidationError('');
  };

  const handleReset = () => {
    setFormData(EMPTY_INPUT);
    setActiveSampleId(null);
    setStepIndex(0);
    setValidationError('');
  };

  const completedStepsCount = ALL_STEPS.filter((s) => Boolean(formData[s.key])).length;
  const isWizardComplete =
    completedStepsCount === ALL_STEPS.length &&
    (formData.permissionStatus !== 'permitted' || Boolean(formData.permissionScopeStatus));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="border-b border-stone-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-[#78350F]">
            Công cụ đánh giá từng bước
          </p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-[#1C1917]">
            Kiểm tra tình huống sử dụng hình ảnh
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#57534E] max-w-2xl">
            Trả lời 6 câu hỏi dưới đây để đánh giá mức độ rủi ro pháp lý, yêu cầu xin phép, cơ quan
            cần liên hệ và cách ghi nguồn phù hợp.
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#57534E] bg-white border border-stone-300 rounded-md hover:border-[#78350F] hover:text-[#1C1917] transition-colors self-start md:self-auto cursor-pointer whitespace-nowrap"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Làm lại từ đầu
        </button>
      </div>

      {/* Main Split: Wizard Left (7/12) & Sample Scenarios + History Right (5/12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Wizard Panel */}
        <div className="lg:col-span-7 bg-white border border-stone-200 rounded-lg p-6 sm:p-8">
          {/* Step Progress Rail */}
          <div className="flex items-center justify-between gap-2 pb-5 border-b border-stone-200">
            <div className="flex items-center gap-1.5">
              {ALL_STEPS.map((step, idx) => {
                const isDone = Boolean(formData[step.key]);
                const isCurrent = idx === stepIndex;
                return (
                  <button
                    key={step.key}
                    type="button"
                    onClick={() => {
                      setValidationError('');
                      setStepIndex(idx);
                    }}
                    className={`px-2.5 py-1 text-xs font-mono rounded transition-colors cursor-pointer tabular-nums ${
                      isCurrent
                        ? 'bg-[#78350F] text-white font-semibold'
                        : isDone
                        ? 'bg-[#EBE6DF] text-[#1C1917] hover:bg-stone-300'
                        : 'bg-stone-100 text-[#78716C] hover:bg-stone-200'
                    }`}
                    title={`Bước ${step.stepNumber}: ${step.question}`}
                  >
                    {step.stepNumber}
                  </button>
                );
              })}
            </div>
            <span className="text-xs font-mono text-[#78716C] tabular-nums">
              Đã chọn {completedStepsCount}/6
            </span>
          </div>

          {activeSampleId && (
            <div className="mt-4 px-4 py-2.5 bg-[#F3EFE7] border border-stone-200 rounded-md flex items-center justify-between gap-3 text-xs text-[#44403C]">
              <span>
                Đang nạp dữ liệu mẫu:{' '}
                <strong className="text-[#1C1917]">
                  {SAMPLE_SCENARIOS.find((s) => s.id === activeSampleId)?.title}
                </strong>
              </span>
              <button
                type="button"
                onClick={handleValidateAndSubmit}
                className="font-semibold text-[#78350F] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
              >
                Xem kết quả ngay →
              </button>
            </div>
          )}

          {!activeSampleId && formData.artifactName && (
            <div className="mt-4 px-4 py-2.5 bg-[#F3EFE7] border border-stone-200 rounded-md text-xs text-[#44403C] leading-relaxed">
              Đang kiểm tra tư liệu:{' '}
              <strong className="text-[#1C1917]">{formData.artifactName}</strong>
              {formData.custodianName && (
                <>
                  {' '}
                  · Đơn vị lưu giữ: <span className="text-[#1C1917]">{formData.custodianName}</span>
                </>
              )}
              . Hoàn thành đủ 6 câu hỏi để xem phân tích pháp lý chi tiết.
            </div>
          )}

          {/* Question */}
          <div className="mt-6">
            <p className="font-mono text-xs text-[#78350F] tabular-nums">
              CÂU HỎI {currentStep.stepNumber} / 06
            </p>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-[#1C1917]">
              {currentStep.question}
            </h2>
            <p className="mt-2 text-sm text-[#57534E] leading-relaxed">{currentStep.helper}</p>
          </div>

          {/* Options */}
          <div className="mt-6 space-y-3" role="radiogroup" aria-label={currentStep.question}>
            {currentStep.options.map((opt) => {
              const selected = currentValue === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => handleSelectOption(opt.value)}
                  className={`w-full text-left px-4 py-3.5 rounded-md border transition-colors flex items-center justify-between gap-3 cursor-pointer ${
                    selected
                      ? 'bg-[#F7F3EC] border-[#78350F] text-[#1C1917]'
                      : 'bg-white border-stone-200 text-[#44403C] hover:border-stone-400'
                  }`}
                >
                  <span className="text-sm font-medium">{opt.label}</span>
                  <span
                    className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      selected ? 'border-[#78350F] bg-[#78350F]' : 'border-stone-300'
                    }`}
                  >
                    {selected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Conditional permission scope verification when user selects permitted */}
          {stepIndex === ALL_STEPS.length - 1 && formData.permissionStatus === 'permitted' && (
            <div className="mt-6 pt-5 border-t border-stone-200 space-y-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#78350F]">
                  Xác minh phạm vi & chủ thể cấp phép
                </p>
                <p className="mt-1 text-xs text-[#57534E]">
                  Chọn "Đã được cho phép" vẫn cần kiểm chứng chủ thể có thẩm quyền (bảo tàng / tác giả ảnh), mục đích, kênh công bố, quyền chỉnh sửa và thời hạn.
                </p>
              </div>
              <div
                className="space-y-2.5"
                role="radiogroup"
                aria-label="Xác minh phạm vi và chủ thể cấp phép"
              >
                {PERMISSION_SCOPE_OPTIONS.map((scopeOpt) => {
                  const isScopeSelected = formData.permissionScopeStatus === scopeOpt.value;
                  return (
                    <button
                      key={scopeOpt.value}
                      type="button"
                      role="radio"
                      aria-checked={isScopeSelected}
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          permissionScopeStatus: scopeOpt.value,
                        }));
                        setValidationError('');
                      }}
                      className={`w-full text-left px-4 py-3 rounded-md border transition-colors flex items-center justify-between gap-3 cursor-pointer ${
                        isScopeSelected
                          ? 'bg-[#F7F3EC] border-[#78350F] text-[#1C1917]'
                          : 'bg-white border-stone-200 text-[#44403C] hover:border-stone-400'
                      }`}
                    >
                      <span className="text-xs sm:text-sm font-medium">{scopeOpt.label}</span>
                      <span
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          isScopeSelected ? 'border-[#78350F] bg-[#78350F]' : 'border-stone-300'
                        }`}
                      >
                        {isScopeSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Optional context fields on final step */}
          {stepIndex === ALL_STEPS.length - 1 && (
            <div className="mt-6 pt-5 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="checker-artifact"
                  className="block text-xs font-medium text-[#44403C] mb-1.5"
                >
                  Tên hiện vật / di sản (tùy chọn)
                </label>
                <input
                  id="checker-artifact"
                  type="text"
                  value={formData.artifactName || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, artifactName: e.target.value }))
                  }
                  placeholder="Ví dụ: Bia tiến sĩ Văn Miếu"
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded-md focus:outline-none focus:border-[#78350F]"
                />
              </div>
              <div>
                <label
                  htmlFor="checker-custodian"
                  className="block text-xs font-medium text-[#44403C] mb-1.5"
                >
                  Đơn vị lưu giữ (tùy chọn)
                </label>
                <input
                  id="checker-custodian"
                  type="text"
                  value={formData.custodianName || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, custodianName: e.target.value }))
                  }
                  placeholder="Ví dụ: Bảo tàng Lịch sử..."
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded-md focus:outline-none focus:border-[#78350F]"
                />
              </div>
            </div>
          )}

          {validationError && (
            <p className="mt-4 text-sm text-[#9A3412] font-medium" role="alert">
              {validationError}
            </p>
          )}

          {/* Navigation Controls */}
          <div className="mt-8 pt-5 border-t border-stone-200 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={handlePrev}
              disabled={stepIndex === 0}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-[#44403C] bg-white border border-stone-300 rounded-md hover:border-stone-400 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Quay lại
            </button>

            <div className="flex items-center gap-3">
              {isWizardComplete && stepIndex < ALL_STEPS.length - 1 && (
                <button
                  type="button"
                  onClick={handleValidateAndSubmit}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-[#78350F] bg-[#F3EFE7] border border-[#D6CEBE] rounded-md hover:bg-[#EBE6DF] cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Xem kết quả
                </button>
              )}

              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-medium text-white bg-[#78350F] hover:bg-[#5A361A] rounded-md transition-colors cursor-pointer"
              >
                {stepIndex === ALL_STEPS.length - 1 ? 'Đánh giá tình huống' : 'Tiếp theo'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar: 10 Sample Scenarios + LocalStorage History */}
        <aside className="lg:col-span-5 space-y-6">
          {/* 10 Sample Scenarios */}
          <div className="bg-white border border-stone-200 rounded-lg p-6">
            <h3 className="font-serif text-lg font-semibold text-[#1C1917]">
              Thử nhanh với 10 tình huống thực tế
            </h3>
            <p className="mt-1 text-xs text-[#57534E]">
              Chọn “Nạp mẫu” để điền sẵn 6 bước hoặc mở xem phân tích chi tiết của từng tình huống.
            </p>

            <div className="mt-4 max-h-[460px] overflow-y-auto divide-y divide-stone-100 pr-1">
              {SAMPLE_SCENARIOS.map((sample) => {
                const isSelected = activeSampleId === sample.id;
                const isExpanded = expandedSampleId === sample.id;
                return (
                  <div key={sample.id} className="py-3.5 first:pt-0 last:pb-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-mono text-[#78350F] tabular-nums">
                          Mẫu {sample.number} · {sample.assessmentSummary.split('—')[0].trim()}
                        </p>
                        <p className="text-sm font-medium text-[#1C1917] leading-snug mt-0.5">
                          {sample.title}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedSampleId((prev) => (prev === sample.id ? null : sample.id))
                          }
                          className="p-1.5 text-[#57534E] hover:text-[#78350F] border border-stone-200 rounded cursor-pointer"
                          aria-expanded={isExpanded}
                          aria-label={`Xem phân tích mẫu ${sample.number}`}
                          title="Xem phân tích mẫu"
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleLoadSample(sample.id)}
                          className={`px-2.5 py-1.5 text-xs font-medium rounded border transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-[#78350F] text-white border-[#78350F]'
                              : 'bg-[#FBF9F5] text-[#78350F] border-stone-300 hover:border-[#78350F]'
                          }`}
                        >
                          Nạp mẫu
                        </button>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="mt-3 bg-[#FBF9F5] border border-stone-200 rounded-md p-3.5 text-xs text-[#44403C] space-y-2.5 leading-relaxed">
                        <p>{sample.description}</p>
                        <div>
                          <p className="font-semibold text-[#1C1917]">Vấn đề cần kiểm tra:</p>
                          <ul className="list-disc pl-4 mt-1 space-y-0.5">
                            {sample.issuesToCheck.map((issue, idx) => (
                              <li key={idx}>{issue}</li>
                            ))}
                          </ul>
                        </div>
                        <p>
                          <strong className="text-[#78350F]">Kết luận:</strong>{' '}
                          {sample.assessmentSummary}
                        </p>
                        <p>
                          <strong className="text-[#1C1917]">Giải thích:</strong> {sample.reasoning}
                        </p>
                        <p>
                          <strong className="text-[#1C1917]">Hướng xử lý:</strong>{' '}
                          {sample.recommendedAction}
                        </p>
                        <p className="text-[#78716C] pt-1 border-t border-stone-200">
                          Căn cứ: {sample.referenceNote}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Saved History */}
          <div className="bg-[#F3EFE7] border border-stone-200 rounded-lg p-6">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-[#78350F]" />
                <h3 className="font-serif text-lg font-semibold text-[#1C1917]">
                  Lịch sử kiểm tra ({history.length})
                </h3>
              </div>
              {history.length > 0 && (
                <button
                  type="button"
                  onClick={onClearHistory}
                  className="text-xs text-[#78716C] hover:text-[#9A3412] cursor-pointer"
                >
                  Xóa tất cả
                </button>
              )}
            </div>

            {history.length === 0 ? (
              <p className="mt-3 text-xs text-[#57534E] leading-relaxed">
                Chưa có lượt kiểm tra nào được lưu trên trình duyệt. Kết quả mỗi lần đánh giá sẽ tự
                động lưu tại đây để bạn đối chiếu lại.
              </p>
            ) : (
              <div className="mt-4 space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-stone-200 rounded-md p-3 flex items-start justify-between gap-2"
                  >
                    <button
                      type="button"
                      onClick={() => onOpenHistoryItem(item)}
                      className="text-left flex-1 cursor-pointer group"
                    >
                      <p className="text-sm font-medium text-[#1C1917] group-hover:text-[#78350F] leading-snug">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs text-[#78716C]">
                        {item.result.riskLevel.split('—')[0].trim()} ·{' '}
                        {new Date(item.createdAt).toLocaleDateString('vi-VN')}
                      </p>
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteHistoryItem(item.id)}
                      className="p-1 text-[#78716C] hover:text-[#9A3412] cursor-pointer"
                      aria-label="Xóa mục lịch sử"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
