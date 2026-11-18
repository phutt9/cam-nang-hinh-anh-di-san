import type { CheckWizardInput, EvaluationResult, LegalStatusCategory } from '../types/heritage';

export const MATERIAL_LABELS: Record<string, string> = {
  doc_heritage_copy_63: 'Bản sao di sản tư liệu được chế tác theo Điều 63 Luật Di sản văn hóa 2024',
  museum_artifact: 'Ảnh chụp hiện vật thông thường',
  heritage_site: 'Ảnh chụp di tích, không gian văn hóa',
  ordinary_doc_copy: 'Bản sao tài liệu thông thường (không thuộc phạm vi Điều 63)',
  digitized_material: 'Tệp ảnh số hóa thông thường',
  stele_ancient_doc: 'Bản gốc di sản tư liệu (văn bia, sắc phong, tài liệu cổ)',
  other: 'Loại tư liệu khác',
  copy_or_photo: 'Bản sao hoặc bản chụp (dữ liệu cũ cần phân loại lại)',
};

export const SOURCE_LABELS: Record<string, string> = {
  museum_website: 'Website chính thức của bảo tàng',
  heritage_agency_website: 'Website của cơ quan quản lý di sản',
  national_archive: 'Trung tâm lưu trữ quốc gia / Kho tư liệu số hóa',
  book_research: 'Sách, báo, catalog triển lãm hoặc tài liệu nghiên cứu',
  academic_repository: 'Thư viện số / Nền tảng học thuật trường đại học',
  social_media: 'Mạng xã hội',
  self_captured: 'Tự chụp hoặc tự tạo',
  other: 'Nguồn khác / Công cụ tìm kiếm',
};

export const PURPOSE_LABELS: Record<string, string> = {
  personal_study: 'Học tập cá nhân (tự lưu tham khảo, không chia sẻ ra ngoài)',
  assignment_research: 'Nộp bài tập, tiểu luận hoặc nghiên cứu nội bộ',
  reasonable_citation: 'Trích dẫn hợp lý để bình luận, minh họa giảng dạy phi thương mại',
  website_social: 'Công bố công khai trên website hoặc mạng xã hội',
  media_promotion: 'Truyền thông, quảng bá',
  book_publication: 'Xuất bản sách hoặc tài liệu phát hành',
  commercial_business: 'Kinh doanh hoặc mục đích thương mại',
};

export const MODIFICATION_LABELS: Record<string, string> = {
  none: 'Không chỉnh sửa',
  crop_resize: 'Cắt ảnh hoặc thay đổi kích thước',
  color_restore: 'Chỉnh màu hoặc phục chế',
  collage_derivative: 'Ghép ảnh hoặc tạo sản phẩm phái sinh',
  ai_processing: 'Xử lý / tạo sinh bằng AI',
};

export const ATTRIBUTION_LABELS: Record<string, string> = {
  complete: 'Có đầy đủ thông tin tác giả và đơn vị lưu giữ',
  custodian_only: 'Chỉ có tên cơ quan lưu giữ (chưa rõ tên tác giả bức ảnh)',
  no_info: 'Không có thông tin',
  unknown_origin: 'Không rõ nguồn gốc',
};

export const PERMISSION_LABELS: Record<string, string> = {
  permitted: 'Đã được cơ quan hoặc chủ thể liên quan cho phép',
  not_permitted: 'Chưa xin phép',
  unsure: 'Không biết có cần xin phép hay không',
};

export const PERMISSION_SCOPE_LABELS: Record<string, string> = {
  verified_full:
    'Đã xác minh bằng văn bản/email đủ chủ thể cấp quyền, mục đích, kênh công bố, quyền chỉnh sửa và thời hạn',
  missing_details:
    'Chưa xác nhận đủ chủ thể quyền, phạm vi sử dụng, mục đích, quyền chỉnh sửa hoặc thời hạn',
};

export function evaluateImageUsage(input: CheckWizardInput): EvaluationResult {
  const {
    materialType,
    imageSource,
    usagePurpose,
    modification,
    attributionInfo,
    permissionStatus,
    permissionScopeStatus,
  } = input;

  const isCommercial = usagePurpose === 'commercial_business';
  const isBookPublication = usagePurpose === 'book_publication';
  const isMediaPromotion = usagePurpose === 'media_promotion';
  const isPublicWeb = usagePurpose === 'website_social';
  const isPersonalStudy = usagePurpose === 'personal_study';
  const isInternalAssignment = usagePurpose === 'assignment_research';
  const isReasonableCitation = usagePurpose === 'reasonable_citation';

  const isUnknownAttribution =
    attributionInfo === 'no_info' || attributionInfo === 'unknown_origin';
  const isCustodianOnly = attributionInfo === 'custodian_only';
  const isCompleteAttribution = attributionInfo === 'complete';

  const isUnverifiedSource = imageSource === 'social_media' || imageSource === 'other';
  const isOfficialSource =
    imageSource === 'museum_website' ||
    imageSource === 'heritage_agency_website' ||
    imageSource === 'national_archive' ||
    imageSource === 'academic_repository';
  const isSelfCaptured = imageSource === 'self_captured';

  const isHeavyEdit =
    modification === 'color_restore' ||
    modification === 'collage_derivative' ||
    modification === 'ai_processing';

  const isDocCopy63 = materialType === 'doc_heritage_copy_63';
  const isOrdinaryDocCopy = materialType === 'ordinary_doc_copy';
  const isDigitizedFile = materialType === 'digitized_material';
  const isAncientDocOriginal = materialType === 'stele_ancient_doc';
  const isArtifactOrSite = materialType === 'museum_artifact' || materialType === 'heritage_site';
  const isOtherOrLegacy = materialType === 'other' || materialType === 'copy_or_photo';

  const alreadyPermitted = permissionStatus === 'permitted';
  const hasVerifiedPermissionScope =
    alreadyPermitted && permissionScopeStatus === 'verified_full';
  const permissionUnsure = permissionStatus === 'unsure';

  const legalIssues: string[] = [];
  const contactsToReach: string[] = [];
  const nextActions: string[] = [];
  const legalBasis: string[] = [];

  const hasMissingInputs =
    !materialType ||
    !imageSource ||
    !usagePurpose ||
    !modification ||
    !attributionInfo ||
    !permissionStatus;

  const cannotConcludeWarning =
    'Lưu ý pháp lý cốt lõi: Ảnh xuất hiện công khai trên Internet không đồng nghĩa được tự do sử dụng; quyền sở hữu vật chất đối với hiện vật khác với quyền quản lý của bảo tàng và khác với quyền tác giả đối với bức ảnh. Chỉ áp dụng nghĩa vụ chú thích "Bản sao" và cấm mục đích lợi nhuận tại Điều 63 Luật DSVH 2024 khi đối tượng thực sự là bản sao di sản tư liệu theo Điều 63.';

  if (hasMissingInputs) {
    return {
      riskLevel: 'Cần xác minh thêm — Chưa đủ thông tin hoặc quyền tác giả chưa rõ',
      riskTier: 'verify',
      legalStatusCategory: 'Cần xác minh thêm',
      summaryHeadline: 'Chưa đủ dữ liệu đầu vào để kết luận về quyền sử dụng hình ảnh.',
      permissionVerdict:
        'Cần xác minh thêm. Hệ thống không tự động khẳng định được phép sử dụng khi còn thiếu thông số trong 6 bước kiểm tra.',
      legalIssues: [
        'Thiếu một hoặc nhiều thông số bắt buộc (loại tư liệu, nguồn ảnh, mục đích, chỉnh sửa, thông tin tác giả hoặc tình trạng xin phép).',
      ],
      contactsToReach: [
        'Đơn vị lưu giữ hiện vật/tư liệu và tác giả bức ảnh gốc (sau khi xác định đầy đủ nguồn gốc).',
      ],
      citationGuidance:
        'Chỉ ghi thông tin đã kiểm chứng thực tế; không tự điền tên tác giả hoặc bảo tàng khi chưa có căn cứ.',
      nextActions: ['Hoàn thành đầy đủ cả 6 câu hỏi trong công cụ kiểm tra để nhận kết luận chi tiết.'],
      fourLayers: {
        artifactOwnership: 'Cần xác minh loại tư liệu và chủ sở hữu đối tượng gốc.',
        custodianManagement: 'Cần xác minh bảo tàng hoặc cơ quan lưu giữ đang quản lý.',
        photoCopyright: 'Cần xác minh người chụp hoặc đơn vị tạo lập tệp ảnh/bản số hóa.',
        exploitationScope: 'Cần xác định rõ học tập cá nhân, nộp bài nội bộ, trích dẫn hợp lý, đăng tải công khai hay thương mại.',
      },
      legalBasis: [
        'Điều 60, Điều 63 và Điều 88 Luật Di sản văn hóa năm 2024 (Luật số 45/2024/QH15).',
        'Điều 14, Điều 19, Điều 20 và Điều 25 Luật Sở hữu trí tuệ (sửa đổi, bổ sung năm 2022).',
      ],
      cannotConcludeWarning,
    };
  }

  // 1. Phân tách 4 tầng quyền theo đúng 5 nhóm đối tượng riêng biệt
  let artifactOwnershipDesc = '';
  if (isDocCopy63) {
    artifactOwnershipDesc =
      'Đối tượng là bản sao di sản tư liệu được chế tác theo Điều 63 Luật DSVH 2024 (làm từ bản gốc, giống bản gốc về nội dung thông tin và vật mang tin để hạn chế tiếp xúc bản gốc dễ hư hại). Khoản 5 Điều 63 quy định bản sao không có giá trị tương đương bản gốc, không thay thế bản gốc, KHÔNG được sử dụng vì mục đích lợi nhuận và phải chú thích là "bản sao".';
  } else if (isAncientDocOriginal) {
    artifactOwnershipDesc =
      'Đối tượng là bản gốc di sản tư liệu (văn bia, sắc phong, tài liệu cổ). Theo Điều 60 Luật DSVH 2024, di sản tư liệu thuộc sở hữu toàn dân do cơ quan có chức năng quản lý (cấm mua bán, trao đổi, chuyển quyền sở hữu); nếu thuộc sở hữu chung/riêng thì chủ sở hữu quản lý theo quy định pháp luật.';
  } else if (isDigitizedFile) {
    artifactOwnershipDesc =
      'Đối tượng là tệp ảnh số hóa thông thường phục vụ tra cứu/lưu trữ số, KHÔNG mặc nhiên là "bản sao di sản tư liệu" theo Điều 63 Luật DSVH 2024. Vì vậy không tự động áp dụng quy định chú thích "Bản sao" hay lệnh cấm lợi nhuận của Điều 63, nhưng tệp số vẫn chịu điều chỉnh của điều khoản dữ liệu số và quyền tác giả (nếu đáp ứng tính sáng tạo).';
  } else if (isOrdinaryDocCopy) {
    artifactOwnershipDesc =
      'Đối tượng là bản sao tài liệu thông thường (không phải bản sao di sản tư liệu chế tác theo Điều 63 Luật DSVH 2024). Không áp dụng máy móc quy định của Điều 63, nhưng vẫn phải kiểm tra bản quyền đối với tài liệu gốc (nếu còn thời hạn bảo hộ), ấn phẩm tái bản và quy chế của nơi cung cấp tài liệu.';
  } else if (isArtifactOrSite) {
    artifactOwnershipDesc =
      'Đối tượng là ảnh chụp hiện vật hoặc di tích thông thường (không phải bản sao di sản tư liệu Điều 63). Quyền sở hữu hiện vật/di tích gốc tách biệt hoàn toàn với quyền tác giả đối với bức ảnh chụp hiện vật đó.';
  } else {
    artifactOwnershipDesc =
      'Loại tư liệu khác hoặc dữ liệu chưa phân loại rõ giữa bản sao Điều 63 với ảnh chụp/bản số hóa thông thường — cần xác minh lại bản chất tư liệu trước khi áp dụng quy định cụ thể.';
  }

  const custodianManagementDesc = isOfficialSource
    ? 'Bảo tàng, trung tâm lưu trữ hoặc cơ quan quản lý di sản giữ quyền quản lý chuyên môn (Thông tư 05/2025/TT-BVHTTDL) và ban hành điều khoản sử dụng cổng thông tin. Quyền quản lý của bảo tàng KHÔNG mặc nhiên thay thế quyền tác giả của nhiếp ảnh gia độc lập nếu bảo tàng không nắm bản quyền bức ảnh.'
    : isSelfCaptured
    ? 'Dù bạn tự chụp ảnh hiện vật, bảo tàng hoặc ban quản lý di tích vẫn giữ quyền quản lý không gian trưng bày, nội quy chụp ảnh (khu vực cấm chụp, cấm flash/chân máy) và quy chế khai thác thương mại gắn với hiện vật của đơn vị.'
    : 'Đơn vị đang lưu giữ hiện vật hoặc tài liệu gốc vẫn có quyền quản lý chuyên môn và yêu cầu không làm sai lệch bối cảnh lịch sử – văn hóa khi sử dụng hình ảnh di sản (Điều 88 Luật DSVH 2024).';

  const photoCopyrightDesc = isSelfCaptured
    ? 'Bạn là người trực tiếp bấm máy nên có thể nắm quyền tác giả bức ảnh NẾU bức ảnh thể hiện dấu ấn sáng tạo, tính nguyên gốc theo Điều 14 Luật Sở hữu trí tuệ (bố cục, ánh sáng, góc máy), không phải sao chụp máy móc thuần túy; đồng thời vẫn phải tuân thủ nội quy nơi chụp.'
    : 'Ảnh chụp hiện vật, bản sao tài liệu hay tệp số hóa chỉ phát sinh quyền tác giả độc lập (tác phẩm nhiếp ảnh theo Điều 14 Luật SHTT) khi có tính nguyên gốc và sự sáng tạo của người chụp/đơn vị tạo lập. Không mặc định mọi ảnh chụp sao chép phẳng đều được bảo hộ như nhau, nhưng khi chưa có chứng cứ ngược lại cần tôn trọng và kiểm tra thông tin bản quyền của nguồn.';

  let exploitationScopeDesc = '';
  if (isCommercial) {
    exploitationScopeDesc =
      'Mục đích kinh doanh/thương mại nằm ngoài mọi ngoại lệ của Điều 25 Luật SHTT. Riêng đối với bản sao di sản tư liệu thuộc Điều 63, Khoản 5 Điều 63 cấm sử dụng vì mục đích lợi nhuận và không có ngoại lệ xin phép để bỏ qua giới hạn luật định này.';
  } else if (isBookPublication) {
    exploitationScopeDesc =
      'Xuất bản sách/tài liệu phát hành ra công chúng cần phân biệt ấn phẩm có bán thu lợi nhuận với nghiên cứu phát hành phi lợi nhuận; thường nằm ngoài ngoại lệ tự sao chép cá nhân và đòi hỏi hồ sơ cấp phép rõ ràng.';
  } else if (isMediaPromotion) {
    exploitationScopeDesc =
      'Truyền thông, quảng bá cần phân biệt giữa đưa tin thời sự phi thương mại (ngoại lệ hẹp tại Điều 25) với hoạt động quảng bá thương hiệu hoặc nội dung có tài trợ.';
  } else if (isPublicWeb) {
    exploitationScopeDesc =
      'Công bố công khai trên website hoặc mạng xã hội vượt ra ngoài phạm vi học tập cá nhân và nộp bài nội bộ; không tự động được hưởng ngoại lệ Điều 25 chỉ vì mục đích phi thương mại hay đã ghi nguồn.';
  } else if (isReasonableCitation) {
    exploitationScopeDesc =
      'Trích dẫn hợp lý để bình luận hoặc minh họa giảng dạy phi thương mại (Khoản 1 & 2 Điều 25 Luật SHTT) đòi hỏi tác phẩm đã công bố hợp pháp, dung lượng hợp lý, không làm sai ý tác giả, không mâu thuẫn khai thác bình thường và BẮT BUỘC đủ tên tác giả + nguồn gốc.';
  } else if (isInternalAssignment) {
    exploitationScopeDesc =
      'Nộp bài tập, tiểu luận, nghiên cứu nội bộ có thể xem xét ngoại lệ tại Điều 25 Luật SHTT nếu giữ phạm vi nội bộ (không đăng công khai lên mạng/kho số mở), không thương mại và ghi nguồn đầy đủ; tuy nhiên vẫn cần kiểm tra điều khoản nguồn và thông tin tác giả ảnh.';
  } else {
    exploitationScopeDesc =
      'Học tập cá nhân (tự lưu đọc tham khảo, không phát tán ra ngoài) có phạm vi hẹp nhất theo Điểm a Khoản 1 Điều 25 Luật SHTT (tự sao chép một bản phi thương mại), nhưng vẫn đòi hỏi nguồn hợp pháp, không chỉnh sửa biến dạng và tôn trọng điều khoản nguồn.';
  }

  const fourLayers = {
    artifactOwnership: artifactOwnershipDesc,
    custodianManagement: custodianManagementDesc,
    photoCopyright: photoCopyrightDesc,
    exploitationScope: exploitationScopeDesc,
  };

  // 2. Xác định các vấn đề pháp lý & căn cứ tương ứng
  if (isUnknownAttribution || isUnverifiedSource) {
    legalIssues.push(
      'Thiếu thông tin tác giả hoặc nguồn gốc rõ ràng: Không đủ cơ sở xác minh chủ thể nắm quyền tác giả bức ảnh và không thể thực hiện đầy đủ nghĩa vụ ghi tên tác giả, nguồn gốc theo Khoản 2 Điều 25 Luật SHTT.'
    );
  }

  if (isDocCopy63) {
    legalIssues.push(
      'Đối tượng là bản sao di sản tư liệu theo Điều 63 Luật DSVH 2024: Khoản 5 Điều 63 quy định bản sao không có giá trị tương đương bản gốc, không thay thế bản gốc, KHÔNG được sử dụng vì mục đích lợi nhuận và khi sử dụng BẮT BUỘC chú thích là "Bản sao".'
    );
    legalBasis.push(
      'Điều 63 Luật Di sản văn hóa năm 2024 (45/2024/QH15) — điều kiện chế tác, nghĩa vụ chú thích "bản sao" và cấm sử dụng vì mục đích lợi nhuận.'
    );
  } else if (isDigitizedFile) {
    legalIssues.push(
      'Tệp ảnh số hóa thông thường không tự động chịu giới hạn của Điều 63 (chỉ áp dụng cho bản sao di sản tư liệu đúng tiêu chuẩn Điều 63), nhưng chịu sự điều chỉnh của điều khoản sử dụng dữ liệu số do đơn vị lưu giữ công bố và quyền tác giả (nếu có).'
    );
  } else if (isOrdinaryDocCopy) {
    legalIssues.push(
      'Bản sao tài liệu thông thường không áp dụng máy móc quy định Điều 63, nhưng cần kiểm tra thời hạn bảo hộ quyền tác giả của tài liệu gốc, quyền của đơn vị xuất bản/chụp lại và nội quy sử dụng của cơ quan cung cấp tài liệu.'
    );
  } else if (isOtherOrLegacy) {
    legalIssues.push(
      'Chưa phân định rõ đối tượng thuộc nhóm bản sao di sản tư liệu (Điều 63), bản sao tài liệu thông thường, tệp ảnh số hóa hay ảnh chụp hiện vật — cần xác minh phân loại trước khi áp dụng quy định.'
    );
  }

  if (isAncientDocOriginal) {
    legalIssues.push(
      'Văn bia, tài liệu cổ gốc thuộc di sản tư liệu được quản lý, bảo vệ theo Điều 60 Luật DSVH 2024; mọi hình thức sử dụng không được làm sai lệch chữ viết, thông tin hay ngữ cảnh lịch sử của bản gốc.'
    );
    legalBasis.push(
      'Điều 60 Luật Di sản văn hóa năm 2024 (45/2024/QH15) về quản lý, bảo vệ và phát huy giá trị di sản tư liệu.'
    );
  }

  if (alreadyPermitted && !hasVerifiedPermissionScope) {
    legalIssues.push(
      'Bạn chọn "Đã được cho phép" nhưng chưa xác nhận đầy đủ thông tin về (1) chủ thể cấp phép có thẩm quyền (cả bảo tàng lẫn tác giả ảnh nếu khác nhau), (2) mục đích sử dụng, (3) phạm vi kênh đăng tải, (4) quyền chỉnh sửa/AI và (5) thời hạn cho phép.'
    );
  }

  if (isCommercial) {
    if (isDocCopy63) {
      legalIssues.push(
        'Khoản 5 Điều 63 Luật DSVH 2024 nghiêm cấm sử dụng bản sao di sản tư liệu vì mục đích lợi nhuận. Không thể dựa vào sự đồng ý hoặc xin phép thông thường để hợp thức hóa hành vi kinh doanh bản sao Điều 63.'
      );
    } else {
      legalIssues.push(
        'Kinh doanh/thương mại không thuộc ngoại lệ Điều 25 Luật SHTT; cần thỏa thuận cấp quyền bằng văn bản với chủ sở hữu quyền tác giả bức ảnh (nếu được bảo hộ) và đơn vị quản lý hiện vật theo Điều 88 Luật DSVH 2024.'
      );
    }
  } else if (isBookPublication) {
    if (isDocCopy63) {
      legalIssues.push(
        'Xuất bản sách phát hành bán thường có yếu tố lợi nhuận — nếu sách bán thương mại thì bị Khoản 5 Điều 63 nghiêm cấm sử dụng bản sao di sản tư liệu vì mục đích lợi nhuận; nếu là ấn phẩm khoa học phi lợi nhuận vẫn phải xác minh chấp thuận của cơ quan lưu giữ và chú thích "Bản sao".'
      );
    } else {
      legalIssues.push(
        'Xuất bản sách/tài liệu phát hành công khai thường gắn yếu tố thương mại và đòi hỏi hồ sơ cấp phép hình ảnh minh bạch cho nhà xuất bản, tách biệt với bài tập nộp nội bộ.'
      );
    }
  } else if (isMediaPromotion) {
    legalIssues.push(
      'Truyền thông, quảng bá cần phân biệt tin bài thời sự phi thương mại (ngoại lệ hẹp tại Điều 25) với nội dung quảng cáo/tài trợ, đồng thời kiểm tra điều khoản trang nguồn.'
    );
  } else if (isPublicWeb && !isSelfCaptured) {
    legalIssues.push(
      'Công bố công khai lên website/mạng xã hội nằm ngoài ngoại lệ học tập cá nhân và nộp bài nội bộ; việc chỉ ghi nguồn vẫn KHÔNG thay thế nghĩa vụ xin phép khi nguồn không cấp phép chia sẻ lại.'
    );
  } else if (isReasonableCitation) {
    legalIssues.push(
      'Trích dẫn hợp lý theo Khoản 1 & 2 Điều 25 Luật SHTT chỉ hợp lệ khi tác phẩm đã công bố hợp pháp, trích dẫn vừa đủ để bình luận/minh họa giảng dạy, không mâu thuẫn với việc khai thác bình thường và có đầy đủ tên tác giả + nguồn gốc.'
    );
  } else if (isInternalAssignment) {
    legalIssues.push(
      'Nộp bài tập/luận văn nội bộ khác với việc đăng công khai lên website hoặc kho số trực tuyến của trường; ngoài ra cần kiểm tra thông tin tác giả ảnh (nếu mới có tên cơ quan lưu giữ) và điều khoản của trang nguồn.'
    );
  }

  if (isHeavyEdit) {
    legalIssues.push(
      'Chỉnh màu, phục chế, ghép ảnh hoặc xử lý bằng AI có thể xâm phạm quyền nhân thân bảo vệ sự toàn vẹn tác phẩm của tác giả ảnh (Điều 19 Luật SHTT) và nguyên tắc không làm biến dạng giá trị di sản (Khoản 2 Điều 88 Luật DSVH 2024).'
    );
    legalBasis.push(
      'Điều 19 Luật Sở hữu trí tuệ về quyền nhân thân bảo vệ sự toàn vẹn của tác phẩm.'
    );
  }

  if (isSelfCaptured) {
    legalIssues.push(
      'Với ảnh tự chụp tại bảo tàng hoặc di tích, cần xác minh nội quy phòng trưng bày tại thời điểm chụp (khu vực cho phép, không flash/chân máy) và quy định của đơn vị về việc sử dụng ảnh tự chụp ra bên ngoài.'
    );
  }

  legalBasis.push(
    'Điều 88 Luật Di sản văn hóa năm 2024 (45/2024/QH15) về sử dụng, khai thác và nguyên tắc không làm biến dạng di sản.'
  );
  legalBasis.push(
    'Thông tư số 05/2025/TT-BVHTTDL về nhiệm vụ chuyên môn của bảo tàng và quản lý tư liệu di sản.'
  );
  legalBasis.push(
    'Điều 14, Điều 20 và Điều 25 Luật Sở hữu trí tuệ (sửa đổi, bổ sung năm 2022 - Luật số 07/2022/QH15).'
  );

  // 3. Chủ thể cần liên hệ
  if (isSelfCaptured) {
    contactsToReach.push(
      'Phòng nghiệp vụ / Truyền thông của bảo tàng hoặc Ban quản lý di tích nơi bạn chụp ảnh (để xác nhận nội quy trưng bày và phạm vi chia sẻ hoặc khai thác).'
    );
  } else {
    if (imageSource === 'museum_website' || materialType === 'museum_artifact') {
      contactsToReach.push(
        'Bảo tàng đang lưu giữ hiện vật và bộ phận quản lý cổng thông tin đã công bố bức ảnh.'
      );
    }
    if (
      imageSource === 'heritage_agency_website' ||
      imageSource === 'national_archive' ||
      materialType === 'heritage_site' ||
      isAncientDocOriginal ||
      isDocCopy63
    ) {
      contactsToReach.push(
        'Cơ quan quản lý di sản văn hóa, Ban quản lý di tích hoặc Trung tâm lưu trữ đang quản lý bản gốc/bản sao di sản tư liệu.'
      );
    }
    if (imageSource === 'book_research' || imageSource === 'academic_repository') {
      contactsToReach.push(
        'Nhà xuất bản, đơn vị chủ quản thư viện số/tạp chí và tác giả công trình đã công bố hình ảnh.'
      );
    }
    if (isUnverifiedSource) {
      contactsToReach.push(
        'Tác giả gốc của bức ảnh (sau khi truy nguồn) và đơn vị trực tiếp quản lý hiện vật được chụp.'
      );
    }
    if (isCustodianOnly || isUnknownAttribution) {
      contactsToReach.push(
        'Nhiếp ảnh gia hoặc đơn vị nắm quyền tác giả đối với bức ảnh/tệp số hóa (nếu khác với cơ quan lưu giữ hiện vật).'
      );
    }
  }

  // 4. Kết luận phân loại trạng thái pháp lý & mức rủi ro
  let riskTier: EvaluationResult['riskTier'] = 'verify';
  let riskLevel: EvaluationResult['riskLevel'] =
    'Cần xác minh thêm — Chưa đủ thông tin hoặc quyền tác giả chưa rõ';
  let legalStatusCategory: LegalStatusCategory = 'Cần xác minh thêm';
  let summaryHeadline = '';
  let permissionVerdict = '';

  // Nhánh 1: Giới hạn luật định đối với bản sao di sản tư liệu theo Điều 63 khi dùng cho mục đích lợi nhuận
  if (isDocCopy63 && isCommercial) {
    riskTier = 'high';
    riskLevel = 'Cao — Cần xin phép trước khi sử dụng';
    legalStatusCategory = 'Cần xin phép trước khi sử dụng';
    summaryHeadline =
      'Không được sử dụng bản sao di sản tư liệu theo Điều 63 cho mục đích lợi nhuận; phải chuyển sang tư liệu gốc hoặc nguồn ảnh thương mại hợp lệ.';
    permissionVerdict =
      'Cần xin phép trước khi sử dụng tư liệu phù hợp khác — và KHÔNG được dùng bản sao theo Điều 63 để kinh doanh thu lợi nhuận. Khoản 5 Điều 63 Luật Di sản văn hóa 2024 quy định bản sao di sản tư liệu không được sử dụng vì mục đích lợi nhuận; thỏa thuận xin phép thông thường không thể bỏ qua giới hạn này của luật. Nếu cần ảnh cho mục đích thương mại, bạn phải liên hệ cơ quan quản lý di sản để thực hiện thủ tục tiếp cận/khai thác tư liệu gốc hoặc bộ ảnh thương mại hợp lệ theo Điều 88 và thỏa thuận quyền tác giả ảnh.';
  } else if (isOtherOrLegacy) {
    // Nhánh 2: Chưa phân loại rõ bản chất tư liệu
    riskTier = 'verify';
    riskLevel = 'Cần xác minh thêm — Chưa đủ thông tin hoặc quyền tác giả chưa rõ';
    legalStatusCategory = 'Cần xác minh thêm';
    summaryHeadline =
      'Chưa xác định rõ tư liệu thuộc nhóm bản sao Điều 63, bản sao thông thường, tệp số hóa hay ảnh chụp hiện vật.';
    permissionVerdict =
      'Cần xác minh thêm. Cần xác định chính xác bản chất tư liệu trước khi kết luận có bị ràng buộc bởi Điều 63 Luật DSVH 2024 hay chỉ chịu sự điều chỉnh của Luật Sở hữu trí tuệ và quy chế nơi lưu giữ.';
  } else if (isUnknownAttribution && !isSelfCaptured) {
    // Nhánh 3: Thiếu thông tin tác giả và nguồn gốc
    riskTier = 'verify';
    riskLevel = 'Cần xác minh thêm — Chưa đủ thông tin hoặc quyền tác giả chưa rõ';
    legalStatusCategory = 'Cần xác minh thêm';
    summaryHeadline =
      'Chưa đủ thông tin tác giả và nguồn gốc hợp pháp để xác định quyền sử dụng.';
    permissionVerdict =
      'Cần xác minh thêm. Không thể kết luận được phép sử dụng khi không rõ người chụp/chủ thể nắm quyền tác giả và không thể thực hiện nghĩa vụ ghi nguồn bắt buộc theo Khoản 2 Điều 25 Luật Sở hữu trí tuệ.';
  } else if (alreadyPermitted) {
    // Nhánh 4: Người dùng chọn Đã được cho phép — PHẢI kiểm tra chủ thể cấp phép, phạm vi, mục đích, chỉnh sửa, thời hạn
    if (!hasVerifiedPermissionScope) {
      riskTier = 'verify';
      riskLevel = 'Cần xác minh thêm — Chưa đủ thông tin hoặc quyền tác giả chưa rõ';
      legalStatusCategory = 'Cần xác minh thêm';
      summaryHeadline =
        'Bạn chọn đã được cho phép nhưng chưa xác nhận đầy đủ chủ thể cấp quyền, phạm vi sử dụng và thời hạn.';
      permissionVerdict =
        'Cần xác minh thêm. Hệ thống không tự động kết luận "Đã được chủ thể quyền cấp phép" khi chưa rõ bên cho phép có đồng thời nắm quyền quản lý di sản và quyền tác giả ảnh hay không, cũng như phạm vi mục đích, kênh phát hành, quyền chỉnh sửa và thời hạn hiệu lực.';
    } else if (isUnverifiedSource) {
      riskTier = 'verify';
      riskLevel = 'Cần xác minh thêm — Chưa đủ thông tin hoặc quyền tác giả chưa rõ';
      legalStatusCategory = 'Cần xác minh thêm';
      summaryHeadline =
        'Nguồn ảnh từ mạng xã hội/tìm kiếm nên cần xác minh lại tư cách chủ thể đã cấp phép.';
      permissionVerdict =
        'Cần xác minh thêm: người đăng lại trên mạng xã hội thường không phải chủ sở hữu bản quyền gốc để có thẩm quyền cấp phép sử dụng.';
    } else if (isCustodianOnly && !isSelfCaptured) {
      riskTier = 'verify';
      riskLevel = 'Cần xác minh thêm — Chưa đủ thông tin hoặc quyền tác giả chưa rõ';
      legalStatusCategory = 'Cần xác minh thêm';
      summaryHeadline =
        'Mới biết tên cơ quan lưu giữ — cần kiểm tra sự cho phép đã bao gồm quyền tác giả của người chụp ảnh hay chưa.';
      permissionVerdict =
        'Cần xác minh thêm. Nếu nhiếp ảnh gia giữ quyền tác giả độc lập với bảo tàng, văn bản cho phép chỉ từ đơn vị lưu giữ có thể chưa đủ để bảo đảm an toàn bản quyền.';
    } else if (isDocCopy63 && isBookPublication) {
      riskTier = 'verify';
      riskLevel = 'Cần xác minh thêm — Chưa đủ thông tin hoặc quyền tác giả chưa rõ';
      legalStatusCategory = 'Cần xác minh thêm';
      summaryHeadline =
        'Đã có văn bản cho phép nhưng cần đối chiếu bản chất sách xuất bản có phát sinh lợi nhuận theo Khoản 5 Điều 63 hay không.';
      permissionVerdict =
        'Cần xác minh thêm: nếu sách/ấn phẩm xuất bản nhằm mục đích bán thu lợi nhuận, Khoản 5 Điều 63 Luật DSVH 2024 không cho phép sử dụng bản sao di sản tư liệu vì mục đích lợi nhuận (không thể dùng giấy phép thông thường để bỏ qua quy định này). Nếu là ấn phẩm nghiên cứu phi lợi nhuận đúng phạm vi được cấp phép, phải ghi rõ chú thích "Bản sao".';
    } else if (isHeavyEdit || isCommercial || isBookPublication || isMediaPromotion || isDocCopy63) {
      riskTier = 'medium';
      riskLevel = 'Trung bình — Cần kiểm tra điều khoản nguồn, phạm vi cấp phép hoặc nội quy';
      legalStatusCategory = 'Đã được chủ thể quyền cấp phép';
      summaryHeadline =
        'Đã được chủ thể quyền cấp phép — tuân thủ nghiêm ngặt phạm vi, quyền chỉnh sửa và thời hạn ghi trong văn bản.';
      permissionVerdict =
        'Đã được chủ thể quyền cấp phép (mức kiểm tra Trung bình do tính chất công khai/chỉnh sửa/xuất bản/thương mại hoặc ràng buộc Điều 63). Chỉ sử dụng đúng mục đích, kênh phát hành, mức độ chỉnh sửa và thời hạn đã thỏa thuận.' +
        (isDocCopy63
          ? ' Với bản sao di sản tư liệu theo Điều 63, vẫn bắt buộc giữ chú thích "Bản sao" và không khai thác vì mục đích lợi nhuận.'
          : '');
    } else {
      riskTier = 'low';
      riskLevel =
        'Thấp — Phù hợp ngoại lệ hoặc cấp phép đã xác minh phạm vi (vẫn phải ghi nguồn)';
      legalStatusCategory = 'Đã được chủ thể quyền cấp phép';
      summaryHeadline =
        'Đã được chủ thể quyền cấp phép đầy đủ bằng văn bản cho mục đích phi thương mại/nội bộ không làm biến dạng hình ảnh.';
      permissionVerdict =
        'Đã được chủ thể quyền cấp phép. Vẫn cần tuân thủ đúng thời hạn, kênh sử dụng đã thỏa thuận và ghi nguồn đầy đủ theo hướng dẫn của bên cấp quyền.';
    }
  } else if (isCommercial) {
    // Nhánh 5: Thương mại chưa xin phép (với ảnh thông thường / tệp số / bản gốc)
    riskTier = 'high';
    riskLevel = 'Cao — Cần xin phép trước khi sử dụng';
    legalStatusCategory = 'Cần xin phép trước khi sử dụng';
    summaryHeadline =
      'Sử dụng cho mục đích kinh doanh/thương mại bắt buộc phải xin phép bằng văn bản trước khi khai thác.';
    permissionVerdict =
      'Cần xin phép trước khi sử dụng. Ngoại lệ Luật Sở hữu trí tuệ không áp dụng cho kinh doanh, quảng cáo hay bán hàng; kể cả khi có ghi nguồn cũng không thay thế được văn bản cấp phép từ chủ sở hữu quyền ảnh và đơn vị quản lý di sản.';
  } else if (isBookPublication) {
    // Nhánh 6: Xuất bản sách/ấn phẩm chưa xin phép
    riskTier = 'high';
    riskLevel = 'Cao — Cần xin phép trước khi sử dụng';
    legalStatusCategory = 'Cần xin phép trước khi sử dụng';
    summaryHeadline =
      'Đưa hình ảnh vào sách/tài liệu xuất bản cần liên hệ xin phép đơn vị lưu giữ và chủ thể quyền ảnh.';
    permissionVerdict =
      'Cần xin phép trước khi sử dụng' +
      (isDocCopy63
        ? ' và lưu ý đặc biệt Khoản 5 Điều 63: nếu sách xuất bản có mục đích lợi nhuận thì KHÔNG được sử dụng bản sao di sản tư liệu theo Điều 63, mà phải xin phép tiếp cận tư liệu gốc hoặc nguồn ảnh khác.'
        : ' (trừ phần trích dẫn bình luận ngắn hạn chế thực sự đáp ứng đầy đủ Khoản 1–2 Điều 25 Luật SHTT). Nhà xuất bản thường yêu cầu văn bản chấp thuận rõ ràng trước khi in.');
  } else if (isHeavyEdit) {
    // Nhánh 7: Chỉnh màu sâu / phục chế / ghép phái sinh / AI chưa xin phép
    riskTier = 'high';
    riskLevel = 'Cao — Cần xin phép trước khi sử dụng';
    legalStatusCategory = 'Cần xin phép trước khi sử dụng';
    summaryHeadline =
      'Chỉnh màu, phục chế, ghép ảnh phái sinh hoặc xử lý AI cần xin phép trước để tránh xâm phạm toàn vẹn tác phẩm và giá trị di sản.';
    permissionVerdict =
      'Cần xin phép trước khi sử dụng. Can thiệp làm biến đổi màu sắc, chi tiết hoặc tạo sinh bằng AI có thể xâm phạm quyền nhân thân (Điều 19 Luật SHTT) và nguyên tắc không làm biến dạng di sản (Khoản 2 Điều 88 Luật DSVH 2024).';
  } else if (isMediaPromotion) {
    // Nhánh 8: Truyền thông, quảng bá
    if (isSelfCaptured) {
      riskTier = 'medium';
      riskLevel = 'Trung bình — Cần kiểm tra điều khoản nguồn, phạm vi cấp phép hoặc nội quy';
      legalStatusCategory = 'Cần xác minh thêm';
      summaryHeadline =
        'Truyền thông bằng ảnh tự chụp cần xác minh quy chế sử dụng hình ảnh của bảo tàng/ban quản lý di tích.';
      permissionVerdict =
        'Cần xác minh thêm về nội quy nơi chụp đối với mục đích truyền thông/quảng bá (đặc biệt nếu chiến dịch có tài trợ hoặc gắn thương hiệu).';
    } else if (isOfficialSource) {
      riskTier = 'medium';
      riskLevel = 'Trung bình — Cần kiểm tra điều khoản nguồn, phạm vi cấp phép hoặc nội quy';
      legalStatusCategory = 'Cần xin phép trước khi sử dụng';
      summaryHeadline =
        'Truyền thông bằng ảnh từ website chính thức cần đối chiếu điều khoản trích dẫn báo chí hoặc xin phép trước khi đăng lại.';
      permissionVerdict =
        'Cần xin phép trước khi sử dụng (hoặc kiểm tra điều khoản mở của website nguồn). Chỉ trường hợp đưa tin thời sự phi thương mại đúng giới hạn Khoản 1–2 Điều 25 Luật SHTT mới có thể xem xét ngoại lệ với điều kiện ghi đủ tên tác giả và nguồn gốc.';
    } else {
      riskTier = 'verify';
      riskLevel = 'Cần xác minh thêm — Chưa đủ thông tin hoặc quyền tác giả chưa rõ';
      legalStatusCategory = 'Cần xác minh thêm';
      summaryHeadline =
        'Truyền thông bằng ảnh từ sách, mạng xã hội hoặc nguồn thứ cấp cần xác minh lại chủ sở hữu quyền ảnh.';
      permissionVerdict =
        'Cần xác minh thêm và liên hệ xin phép chủ thể nắm quyền bức ảnh gốc trước khi truyền thông.';
    }
  } else if (isPublicWeb) {
    // Nhánh 9: Công bố công khai lên website / mạng xã hội (tách biệt hẳn với học tập/nội bộ)
    if (isSelfCaptured) {
      riskTier = 'medium';
      riskLevel = 'Trung bình — Cần kiểm tra điều khoản nguồn, phạm vi cấp phép hoặc nội quy';
      legalStatusCategory = 'Cần xác minh thêm';
      summaryHeadline =
        'Ảnh tự chụp đăng website/mạng xã hội phi thương mại cần đối chiếu nội quy chụp ảnh và bảo đảm không dùng cho quảng bá thương mại.';
      permissionVerdict =
        'Cần xác minh thêm nội quy chụp ảnh và chia sẻ công khai của bảo tàng/di tích tại thời điểm chụp; đồng thời ghi rõ tên hiện vật và đơn vị lưu giữ.';
    } else if (isOfficialSource) {
      riskTier = 'medium';
      riskLevel = 'Trung bình — Cần kiểm tra điều khoản nguồn, phạm vi cấp phép hoặc nội quy';
      legalStatusCategory = 'Cần xin phép trước khi sử dụng';
      summaryHeadline =
        'Công bố công khai lại ảnh lấy từ website bảo tàng/cơ quan di sản không thuộc ngoại lệ học tập cá nhân — cần kiểm tra điều khoản hoặc xin phép.';
      permissionVerdict =
        'Cần xin phép trước khi sử dụng (trừ khi điều khoản website nguồn cấp phép tái phân phối mở). Ghi tên nguồn bảo tàng thôi vẫn chưa đủ để đăng tải lại nguyên tệp ảnh lên website/fanpage khác.';
    } else {
      riskTier = 'high';
      riskLevel = 'Cao — Cần xin phép trước khi sử dụng';
      legalStatusCategory = 'Cần xin phép trước khi sử dụng';
      summaryHeadline =
        'Đăng công khai ảnh lấy từ sách hoặc nguồn thứ cấp lên website/mạng xã hội cần xin phép chủ sở hữu bản quyền ảnh.';
      permissionVerdict =
        'Cần xin phép trước khi sử dụng. Đăng tải công khai trên Internet vượt khỏi giới hạn sao chép học tập cá nhân và bài tập nội bộ tại Điều 25 Luật SHTT.';
    }
  } else if (isReasonableCitation) {
    // Nhánh 10: Trích dẫn hợp lý phi thương mại
    if (isUnverifiedSource || !isCompleteAttribution || permissionUnsure || modification !== 'none') {
      riskTier = 'verify';
      riskLevel = 'Cần xác minh thêm — Chưa đủ thông tin hoặc quyền tác giả chưa rõ';
      legalStatusCategory = 'Cần xác minh thêm';
      summaryHeadline =
        'Chưa đủ điều kiện kết luận trích dẫn hợp lý theo Điều 25 do thiếu thông tin tác giả đầy đủ, nguồn chưa rõ hoặc có chỉnh sửa.';
      permissionVerdict =
        'Cần xác minh thêm. Khoản 1 & 2 Điều 25 Luật SHTT yêu cầu trích dẫn hợp lý phải từ nguồn công bố hợp pháp, không chỉnh sửa làm sai ý tác giả, có đầy đủ tên tác giả + nguồn gốc và không mâu thuẫn với việc khai thác bình thường.';
    } else {
      riskTier = 'medium';
      riskLevel = 'Trung bình — Cần kiểm tra điều khoản nguồn, phạm vi cấp phép hoặc nội quy';
      legalStatusCategory = 'Được phép sử dụng theo ngoại lệ pháp luật';
      summaryHeadline =
        'Có cơ sở áp dụng ngoại lệ trích dẫn hợp lý phi thương mại nếu giữ dung lượng hạn chế, không làm sai ý và ghi đủ tác giả – nguồn gốc.';
      permissionVerdict =
        'Được phép sử dụng theo ngoại lệ pháp luật (Khoản 1 & 2 Điều 25 Luật SHTT) với điều kiện chỉ dùng ở mức minh họa/bình luận hợp lý không thay thế ấn phẩm gốc, không thương mại, tôn trọng điều khoản nguồn và ghi đầy đủ tên tác giả + đơn vị lưu giữ.' +
        (isDocCopy63 ? ' Bắt buộc ghi chú thích "Bản sao" theo Điều 63 Luật DSVH 2024.' : '');
    }
  } else if (isInternalAssignment) {
    // Nhánh 11: Nộp bài tập, tiểu luận, nghiên cứu nội bộ (KHÔNG tự động kết luận chỉ vì học tập hoặc nguồn chính thức)
    if (isUnverifiedSource || permissionUnsure || isCustodianOnly || modification !== 'none') {
      riskTier = 'verify';
      riskLevel = 'Cần xác minh thêm — Chưa đủ thông tin hoặc quyền tác giả chưa rõ';
      legalStatusCategory = 'Cần xác minh thêm';
      summaryHeadline =
        'Nộp bài tập/nghiên cứu nội bộ nhưng còn thiếu thông tin tác giả ảnh, điều khoản nguồn hoặc có chỉnh sửa ảnh.';
      permissionVerdict =
        'Cần xác minh thêm. Không tự động kết luận được phép sử dụng chỉ vì phục vụ bài tập hoặc lấy từ website chính thức. Khi mới có tên cơ quan lưu giữ (chưa rõ tác giả ảnh), chưa chắc về điều khoản nguồn, hoặc nếu nhà trường sẽ đăng luận văn lên kho số công khai, bạn cần kiểm tra rõ nguồn tác giả và điều khoản sử dụng trước khi nộp.';
    } else {
      riskTier = 'low';
      riskLevel =
        'Thấp — Phù hợp ngoại lệ hoặc cấp phép đã xác minh phạm vi (vẫn phải ghi nguồn)';
      legalStatusCategory = 'Được phép sử dụng theo ngoại lệ pháp luật';
      summaryHeadline =
        'Có cơ sở áp dụng ngoại lệ cho bài tập/nghiên cứu nội bộ phi thương mại khi đủ thông tin tác giả, nguồn hợp pháp và không đăng công khai.';
      permissionVerdict =
        'Được phép sử dụng theo ngoại lệ pháp luật (Khoản 1 & 2 Điều 25 Luật SHTT) trong phạm vi nộp bài nội bộ phi thương mại, nguyên vẹn ảnh và ghi đầy đủ tên tác giả, đơn vị lưu giữ, URL nguồn. Lưu ý: nếu bài nghiên cứu/luận văn sau đó được công bố công khai trên thư viện số mở hoặc in sách bán thì phải xin phép lại.' +
        (isDocCopy63 ? ' Với bản sao theo Điều 63, phải giữ rõ chú thích "Bản sao".' : '');
    }
  } else if (isPersonalStudy) {
    // Nhánh 12: Học tập cá nhân thuần túy (tự lưu tham khảo, không phát tán ra ngoài)
    if (isUnverifiedSource || permissionUnsure || !isCompleteAttribution) {
      riskTier = 'verify';
      riskLevel = 'Cần xác minh thêm — Chưa đủ thông tin hoặc quyền tác giả chưa rõ';
      legalStatusCategory = 'Cần xác minh thêm';
      summaryHeadline =
        'Mục đích học tập cá nhân nhưng chưa xác minh đủ thông tin tác giả hoặc tính hợp pháp của nguồn ảnh.';
      permissionVerdict =
        'Cần xác minh thêm. Ngoại lệ tự sao chép một bản để học tập cá nhân tại Điểm a Khoản 1 Điều 25 Luật SHTT không miễn trừ trách nhiệm kiểm tra tính hợp pháp của nguồn công bố và tôn trọng quyền tác giả; không mặc nhiên kết luận được phép sử dụng khi thiếu tên tác giả hoặc nguồn chưa rõ ràng.';
    } else {
      riskTier = 'low';
      riskLevel =
        'Thấp — Phù hợp ngoại lệ hoặc cấp phép đã xác minh phạm vi (vẫn phải ghi nguồn)';
      legalStatusCategory = 'Được phép sử dụng theo ngoại lệ pháp luật';
      summaryHeadline =
        'Phù hợp ngoại lệ tự sao chép một bản phục vụ học tập cá nhân (không phát tán công khai, không thương mại).';
      permissionVerdict =
        'Được phép sử dụng theo ngoại lệ pháp luật (Điểm a Khoản 1 & Khoản 2 Điều 25 Luật SHTT) để tự học tập/nghiên cứu cá nhân, không chia sẻ lại lên mạng hay nộp công khai, giữ nguyên ảnh không làm sai lệch hiện vật và lưu đầy đủ nguồn trích dẫn.' +
        (isDocCopy63 ? ' Với bản sao di sản tư liệu Điều 63, giữ rõ chú thích "Bản sao".' : '');
    }
  }

  // 5. Hướng dẫn ghi nguồn & hành động tiếp theo
  const citationGuidance = isDocCopy63
    ? 'BẮT BUỘC chú thích rõ "Bản sao" theo Khoản 5 Điều 63 Luật DSVH 2024: Tên di sản (Bản sao) – Tên tác giả/người chụp (nếu có) – Cơ quan lưu giữ – Đường dẫn nguồn – Ngày truy cập.'
    : isDigitizedFile
    ? 'Ghi đầy đủ thông tin thực tế: Tên hiện vật/di sản (Tư liệu số hóa) – Tên tác giả/đơn vị số hóa (nếu có) – Cơ quan lưu giữ – Đường dẫn nguồn – Ngày truy cập. Không áp đặt nhãn "Bản sao Điều 63" nếu đây chỉ là tệp ảnh số hóa thông thường.'
    : isOrdinaryDocCopy
    ? 'Ghi rõ thông tin nguồn tài liệu thực tế: Tên tài liệu – Tác giả/Đơn vị biên soạn (nếu có) – Nơi lưu giữ/Ấn phẩm nguồn – Ngày truy cập. Tuyệt đối không tự điền tên tác giả nếu khuyết.'
    : 'Ghi đầy đủ thông tin thực tế có được: Tên hiện vật/di sản – Tên tác giả/người chụp (nếu có) – Bảo tàng/Đơn vị lưu giữ – Đường dẫn nguồn – Ngày truy cập. Ghi nguồn đầy đủ không thay thế giấy phép nếu vượt ngoài phạm vi ngoại lệ.';

  if (isUnknownAttribution || isUnverifiedSource || isCustodianOnly) {
    nextActions.push(
      'Kiểm tra lại trang nguồn gốc để xác định tên người chụp/tác giả ảnh và đọc kỹ mục "Bản quyền / Điều khoản sử dụng" của đơn vị lưu giữ.'
    );
  }
  if (alreadyPermitted && !hasVerifiedPermissionScope) {
    nextActions.push(
      'Yêu cầu xác nhận bằng văn bản/email nêu rõ đủ 5 yếu tố: chủ thể cấp quyền (gồm cả bảo tàng và tác giả ảnh nếu khác nhau), mục đích sử dụng, kênh đăng tải, quyền chỉnh sửa và thời hạn.'
    );
  }
  if (isDocCopy63 && (isCommercial || isBookPublication)) {
    nextActions.push(
      'Không sử dụng bản sao Điều 63 cho mục đích thu lợi nhuận; hãy liên hệ cơ quan quản lý di sản để xin tiếp cận tư liệu gốc hoặc đặt chụp/cấp bộ ảnh khai thác hợp lệ theo Điều 88.'
    );
  } else if (
    !hasVerifiedPermissionScope &&
    (riskTier === 'high' || riskTier === 'verify' || isMediaPromotion || (isPublicWeb && !isSelfCaptured))
  ) {
    nextActions.push(
      'Liên hệ bằng văn bản/email với đơn vị lưu giữ và chủ sở hữu quyền tác giả bức ảnh (nếu có) để xin cấp phép rõ mục đích, kênh phát hành và thời hạn sử dụng.'
    );
  }
  if (isHeavyEdit) {
    nextActions.push(
      'Giữ nguyên tỷ lệ, chữ viết và màu sắc trung thực của hiện vật/di sản; không dùng AI tái tạo chi tiết chưa kiểm chứng gây sai lệch giá trị gốc.'
    );
  }
  nextActions.push(
    'Dùng công cụ Tạo ghi nguồn để chuẩn hóa chú thích và lưu lại ảnh chụp màn hình điều khoản nguồn hoặc văn bản chấp thuận để đối chiếu khi cần.'
  );

  return {
    riskLevel,
    riskTier,
    legalStatusCategory,
    summaryHeadline,
    permissionVerdict,
    legalIssues,
    contactsToReach: Array.from(new Set(contactsToReach)),
    citationGuidance,
    nextActions,
    fourLayers,
    legalBasis: Array.from(new Set(legalBasis)),
    cannotConcludeWarning,
  };
}
