export type PageView =
  | 'home'
  | 'checker'
  | 'result'
  | 'records'
  | 'library'
  | 'citation'
  | 'legal'
  | 'assistant';

export type MaterialType =
  | 'doc_heritage_copy_63'
  | 'museum_artifact'
  | 'heritage_site'
  | 'ordinary_doc_copy'
  | 'digitized_material'
  | 'stele_ancient_doc'
  | 'other'
  | 'copy_or_photo';

export type ImageSource =
  | 'museum_website'
  | 'heritage_agency_website'
  | 'national_archive'
  | 'book_research'
  | 'academic_repository'
  | 'social_media'
  | 'self_captured'
  | 'other';

export type UsagePurpose =
  | 'personal_study'
  | 'assignment_research'
  | 'reasonable_citation'
  | 'website_social'
  | 'media_promotion'
  | 'book_publication'
  | 'commercial_business';

export type ModificationLevel =
  | 'none'
  | 'crop_resize'
  | 'color_restore'
  | 'collage_derivative'
  | 'ai_processing';

export type AttributionInfo =
  | 'complete'
  | 'custodian_only'
  | 'no_info'
  | 'unknown_origin';

export type PermissionStatus =
  | 'permitted'
  | 'not_permitted'
  | 'unsure';

export type PermissionScopeStatus =
  | 'verified_full'
  | 'missing_details';

export interface CheckWizardInput {
  materialType: MaterialType | '';
  imageSource: ImageSource | '';
  usagePurpose: UsagePurpose | '';
  modification: ModificationLevel | '';
  attributionInfo: AttributionInfo | '';
  permissionStatus: PermissionStatus | '';
  permissionScopeStatus?: PermissionScopeStatus | '';
  artifactName?: string;
  custodianName?: string;
}

export type LegalStatusCategory =
  | 'Được phép sử dụng theo ngoại lệ pháp luật'
  | 'Đã được chủ thể quyền cấp phép'
  | 'Cần xin phép trước khi sử dụng'
  | 'Cần xác minh thêm';

export type RiskLevel =
  | 'Thấp — Phù hợp ngoại lệ hoặc cấp phép đã xác minh phạm vi (vẫn phải ghi nguồn)'
  | 'Trung bình — Cần kiểm tra điều khoản nguồn, phạm vi cấp phép hoặc nội quy'
  | 'Cao — Cần xin phép trước khi sử dụng'
  | 'Cần xác minh thêm — Chưa đủ thông tin hoặc quyền tác giả chưa rõ';

export interface FourLayerAnalysis {
  artifactOwnership: string;
  custodianManagement: string;
  photoCopyright: string;
  exploitationScope: string;
}

export interface EvaluationResult {
  riskLevel: RiskLevel;
  riskTier: 'low' | 'medium' | 'high' | 'verify';
  legalStatusCategory: LegalStatusCategory;
  summaryHeadline: string;
  permissionVerdict: string;
  legalIssues: string[];
  contactsToReach: string[];
  citationGuidance: string;
  nextActions: string[];
  fourLayers: FourLayerAnalysis;
  legalBasis: string[];
  cannotConcludeWarning: string;
}

export interface CheckHistoryItem {
  id: string;
  createdAt: string;
  title: string;
  input: CheckWizardInput;
  result: EvaluationResult;
}

export interface SampleScenario {
  id: string;
  number: string;
  title: string;
  description: string;
  issuesToCheck: string[];
  assessmentSummary: string;
  riskTier: 'low' | 'medium' | 'high' | 'verify';
  legalStatusCategory: LegalStatusCategory;
  reasoning: string;
  recommendedAction: string;
  referenceNote: string;
  prefillInput: CheckWizardInput;
}

export type KnowledgeCategory =
  | 'Quyền sở hữu hiện vật và di sản tư liệu'
  | 'Quyền quản lý, khai thác hình ảnh tại bảo tàng'
  | 'Bản gốc, bản sao và bản số'
  | 'Quyền tác giả và quyền liên quan'
  | 'Sử dụng hình ảnh cho mục đích học tập, nghiên cứu'
  | 'Sử dụng hình ảnh trong truyền thông và thương mại'
  | 'Quy định về ghi nguồn và trích dẫn'
  | 'Những trường hợp cần xin phép trước khi sử dụng';

export interface KnowledgeArticle {
  id: string;
  category: KnowledgeCategory;
  title: string;
  subtitle: string;
  imagePath: string;
  imageCaption: string;
  updatedAt: string;
  readTime: string;
  summary: string;
  contentParagraphs: string[];
  practicalExample: string;
  illustrativeScenario: string;
  legalBasis: string;
}

export interface LegalDocumentItem {
  id: string;
  title: string;
  issuer: string;
  documentCode: string;
  issuedDate: string;
  effectiveDate: string;
  verificationStatus:
    | 'Đã đối chiếu cổng văn bản chính thức'
    | 'Đã hết hiệu lực (đã được thay thế)'
    | 'Cần xác minh thêm';
  relatedArticles: string[];
  summary: string;
  keyTakeaways: string[];
  officialUrl: string;
  officialPortalLabel: string;
  urlNote?: string;
}

export type HeritageMaterialCategory =
  | 'Mộc bản'
  | 'Châu bản'
  | 'Bia đá'
  | 'Văn bản Hán Nôm'
  | 'Hiện vật'
  | 'Tài liệu lưu trữ';

export type DigitizationStatus = 'Đã số hóa' | 'Chưa số hóa' | 'Chưa xác minh';

export interface HeritageReferenceSource {
  agencyName: string;
  documentTitle: string;
  url: string;
  domain: string;
  verificationNote?: string;
}

export interface HeritageRecord {
  id: string;
  code: string;
  name: string;
  type: HeritageMaterialCategory;
  era: string;
  locality: string;
  description: string;
  originalRepository: string;
  heritageSiteOrDisplay: string;
  custodian: string;
  digitizationStatus: DigitizationStatus;
  digitizationNote: string;
  sources: HeritageReferenceSource[];
  imageRightsNote: string;
  unescoStatus?: string;
  recommendedMaterialType: MaterialType;
}

