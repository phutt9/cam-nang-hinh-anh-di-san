import type { SampleScenario } from '../types/heritage';

export const SAMPLE_SCENARIOS: SampleScenario[] = [
  {
    id: 'case-1-student-assignment',
    number: '01',
    title: 'Sinh viên tải ảnh hiện vật thông thường từ website bảo tàng để nộp bài tập nội bộ',
    description:
      'Một sinh viên ngành Lịch sử tải ảnh chụp trống đồng (ảnh chụp hiện vật thông thường, trên website bảo tàng ghi đầy đủ tên người chụp và tên bảo tàng) để minh họa trong bài tiểu luận nộp nội bộ cho giảng viên, không chỉnh sửa biến dạng và không đăng công khai.',
    issuesToCheck: [
      'Phân biệt rõ nộp bài tập nội bộ (không đăng tải công khai) với công bố công khai trên mạng hoặc in sách bán.',
      'Nguồn ảnh hợp pháp từ website chính thức của bảo tàng và có đầy đủ thông tin tác giả ảnh lẫn đơn vị lưu giữ.',
      'Không chỉnh sửa làm sai lệch hiện vật và kiểm tra điều khoản website bảo tàng không cấm sao chép học tập.',
      'Nếu thiếu tên tác giả ảnh hoặc luận văn sẽ đưa lên kho số công khai, phải chuyển sang Cần xác minh thêm / xin phép.',
    ],
    assessmentSummary: 'Thấp — Phù hợp ngoại lệ nộp bài nội bộ phi thương mại (vẫn phải ghi nguồn đầy đủ)',
    riskTier: 'low',
    legalStatusCategory: 'Được phép sử dụng theo ngoại lệ pháp luật',
    reasoning:
      'Không phải mọi trường hợp học tập đều tự do vô điều kiện. Ở tình huống này, ảnh là ảnh chụp hiện vật thông thường (không thuộc Điều 63), có nguồn hợp pháp, đầy đủ thông tin tác giả và bảo tàng, không chỉnh sửa và chỉ nộp nội bộ phi thương mại — đáp ứng Khoản 1 & 2 Điều 25 Luật SHTT. Nếu sau này đăng công khai lên website hoặc kho mở thì phải xin phép lại.',
    recommendedAction:
      'Giữ nguyên ảnh không làm sai lệch đối tượng, ghi rõ tên hiện vật, tên tác giả ảnh, bảo tàng lưu giữ, URL nguồn và ngày truy cập.',
    referenceNote: 'Khoản 1 & 2 Điều 25 Luật Sở hữu trí tuệ (07/2022/QH15); Điều khoản website bảo tàng.',
    prefillInput: {
      materialType: 'museum_artifact',
      imageSource: 'museum_website',
      usagePurpose: 'assignment_research',
      modification: 'none',
      attributionInfo: 'complete',
      permissionStatus: 'not_permitted',
      artifactName: 'Trống đồng Đông Sơn',
      custodianName: 'Bảo tàng Lịch sử Quốc gia',
    },
  },
  {
    id: 'case-2-stele-facebook',
    number: '02',
    title: 'Người làm nội dung lấy ảnh bản gốc di sản tư liệu từ tìm kiếm mạng để đăng Facebook',
    description:
      'Một trang cộng đồng yêu văn hóa tìm kiếm ảnh bia đá cổ (bản gốc di sản tư liệu) trên mạng, tải về khi chưa có thông tin tác giả ảnh và đăng công khai lên fanpage Facebook để thu hút tương tác.',
    issuesToCheck: [
      'Ảnh xuất hiện trên kết quả tìm kiếm không đồng nghĩa với ảnh miễn phí bản quyền.',
      'Công bố công khai trên mạng xã hội vượt ra ngoài ngoại lệ học tập cá nhân và nộp bài nội bộ.',
      'Thiếu thông tin tác giả bức ảnh và đơn vị quản lý di tích nên không thể ghi nguồn đúng Khoản 2 Điều 25 Luật SHTT.',
    ],
    assessmentSummary: 'Cần xác minh thêm — Thiếu thông tin tác giả & chưa đủ căn cứ đăng Facebook',
    riskTier: 'verify',
    legalStatusCategory: 'Cần xác minh thêm',
    reasoning:
      'Công cụ tìm kiếm chỉ lập chỉ mục ảnh từ website khác, không cấp phép sử dụng. Không đủ dữ liệu để biết bức ảnh chụp văn bia có được bảo hộ bản quyền hay ai là chủ sở hữu, đồng thời không đáp ứng được nghĩa vụ ghi tên tác giả và nguồn gốc theo Luật SHTT.',
    recommendedAction:
      'Truy ngược đường dẫn gốc để xác định tác giả bức ảnh và đơn vị quản lý di tích. Xin phép bằng văn bản trước khi đăng tải lại, hoặc chỉ dẫn liên kết chia sẻ tới trang chính thức.',
    referenceNote: 'Điều 14, 20, 25 Luật Sở hữu trí tuệ; Điều 60 & Điều 88 Luật DSVH 2024.',
    prefillInput: {
      materialType: 'stele_ancient_doc',
      imageSource: 'other',
      usagePurpose: 'website_social',
      modification: 'none',
      attributionInfo: 'no_info',
      permissionStatus: 'not_permitted',
      artifactName: 'Bia đá cổ tại di tích',
    },
  },
  {
    id: 'case-3-shop-advertisement',
    number: '03',
    title: 'Một cửa hàng sử dụng ảnh chụp hiện vật thông thường để quảng cáo sản phẩm',
    description:
      'Cửa hàng bán đồ thủ công mỹ nghệ lấy ảnh chụp bình gốm cổ từ trang tin của bảo tàng (chỉ ghi tên bảo tàng, chưa rõ nhiếp ảnh gia) để cắt ghép chạy quảng cáo bán bộ sưu tập sản phẩm kinh doanh.',
    issuesToCheck: [
      'Mục đích kinh doanh, quảng cáo thương mại nằm ngoài mọi ngoại lệ Điều 25 Luật SHTT.',
      'Ảnh chụp hiện vật thông thường không bị áp Điều 63, nhưng chịu sự điều chỉnh của quyền quản lý bảo tàng (Điều 88) và quyền tác giả bức ảnh (Điều 20 Luật SHTT).',
      'Nguy cơ gây hiểu nhầm sản phẩm thương mại được bảo tàng bảo trợ.',
    ],
    assessmentSummary: 'Cao — Cần xin phép trước khi sử dụng & ký thỏa thuận khai thác thương mại',
    riskTier: 'high',
    legalStatusCategory: 'Cần xin phép trước khi sử dụng',
    reasoning:
      'Mục đích quảng cáo bán hàng không được miễn trừ bản quyền, và việc chỉ ghi tên bảo tàng là không đủ. Cửa hàng phải xin phép bằng văn bản cả bảo tàng lưu giữ lẫn chủ sở hữu quyền tác giả bức ảnh (nếu tách biệt).',
    recommendedAction:
      'Ngừng dùng ảnh khi chưa có hợp đồng/văn bản cấp phép. Liên hệ bảo tàng lưu giữ và chủ sở hữu quyền ảnh để thỏa thuận khai thác thương mại, hoặc tự chụp ảnh sản phẩm do cửa hàng tự sản xuất.',
    referenceNote: 'Điều 88 Luật Di sản văn hóa 2024; Điều 20 Luật Sở hữu trí tuệ.',
    prefillInput: {
      materialType: 'museum_artifact',
      imageSource: 'museum_website',
      usagePurpose: 'commercial_business',
      modification: 'crop_resize',
      attributionInfo: 'custodian_only',
      permissionStatus: 'not_permitted',
      artifactName: 'Bình gốm cổ men ngọc',
    },
  },
  {
    id: 'case-4-book-publication',
    number: '04',
    title: 'Người nghiên cứu muốn đưa bản sao tài liệu thông thường vào sách xuất bản',
    description:
      'Tác giả biên soạn một cuốn sách chuyên khảo lịch sử phát hành qua nhà xuất bản, cần đưa vào 15 hình bản sao tài liệu thông thường chụp lại từ các công trình nghiên cứu và tập san lưu trữ trước đây.',
    issuesToCheck: [
      'Bản sao tài liệu thông thường không áp dụng máy móc quy định Điều 63 (như nhãn "Bản sao Điều 63"), nhưng vẫn phải kiểm tra quyền tác giả đối với sách nguồn và tài liệu gốc.',
      'Xuất bản sách phát hành công khai khác với bài tập nộp nội bộ — thường có yếu tố thương mại.',
      'Nhà xuất bản yêu cầu văn bản cấp phép rõ từ đơn vị lưu giữ gốc và chủ sở hữu bản quyền ấn phẩm nguồn.',
    ],
    assessmentSummary: 'Cao — Cần xin phép đơn vị lưu giữ & chủ sở hữu ấn phẩm nguồn trước khi xuất bản',
    riskTier: 'high',
    legalStatusCategory: 'Cần xin phép trước khi sử dụng',
    reasoning:
      'Dù là công trình nghiên cứu khoa học, việc xuất bản sách phát hành công khai vượt khỏi phạm vi tự sao chép cá nhân và nộp bài nội bộ. Tác giả phải xin phép nhà xuất bản/tác giả ấn phẩm nguồn và kiểm tra quy chế khai thác tài liệu của viện lưu trữ.',
    recommendedAction:
      'Gửi văn bản chính thức tới đơn vị chủ quản ấn phẩm/nhà xuất bản nguồn và cơ quan lưu giữ bản gốc tài liệu để xin cấp phép in ấn.',
    referenceNote: 'Điều 88 Luật Di sản văn hóa 2024; Điều 20 & 25 Luật Sở hữu trí tuệ.',
    prefillInput: {
      materialType: 'ordinary_doc_copy',
      imageSource: 'book_research',
      usagePurpose: 'book_publication',
      modification: 'none',
      attributionInfo: 'complete',
      permissionStatus: 'not_permitted',
      artifactName: 'Tư liệu văn bản Hán-Nôm sưu tầm',
    },
  },
  {
    id: 'case-5-color-edit-digitized',
    number: '05',
    title: 'Người dùng muốn chỉnh sửa màu sắc và xử lý AI tệp ảnh số hóa thông thường',
    description:
      'Một người làm nội dung tải tệp ảnh số hóa thông thường từ website cơ quan di sản, sau đó kéo màu, tăng tương phản và dùng AI làm nét lại rồi đăng kèm bài truyền thông.',
    issuesToCheck: [
      'Tệp ảnh số hóa thông thường KHÔNG mặc nhiên là bản sao di sản tư liệu theo Điều 63, nên không áp dụng máy móc quy định Điều 63.',
      'Tuy nhiên, dùng AI tái tạo chi tiết có thể làm sai lệch chữ viết/hiện trạng di sản (Khoản 2 Điều 88 Luật DSVH 2024).',
      'Xâm phạm quyền nhân thân bảo vệ sự toàn vẹn tác phẩm (Điều 19 Luật SHTT) nếu tệp ảnh số hóa được bảo hộ quyền tác giả.',
    ],
    assessmentSummary: 'Cao — Cần xin phép chỉnh sửa & hạn chế dùng AI làm sai lệch tư liệu gốc',
    riskTier: 'high',
    legalStatusCategory: 'Cần xin phép trước khi sử dụng',
    reasoning:
      'Dù tệp ảnh số hóa thông thường không bị điều chỉnh bởi Điều 63, việc can thiệp màu sắc và dùng AI làm nét có thể làm biến dạng thông tin lịch sử của di sản (trái Khoản 2 Điều 88 Luật DSVH 2024) và ảnh hưởng quyền nhân thân của đơn vị tạo lập tệp ảnh.',
    recommendedAction:
      'Không tự ý xử lý AI hay chỉnh màu làm thay đổi hiện trạng tư liệu khi chưa được cơ quan công bố ảnh đồng ý bằng văn bản. Giữ nguyên ảnh gốc hoặc ghi chú tách bạch phần minh họa phục dựng nếu được cho phép.',
    referenceNote: 'Khoản 2 Điều 88 Luật Di sản văn hóa 2024; Điều 19 Luật Sở hữu trí tuệ.',
    prefillInput: {
      materialType: 'digitized_material',
      imageSource: 'heritage_agency_website',
      usagePurpose: 'media_promotion',
      modification: 'ai_processing',
      attributionInfo: 'custodian_only',
      permissionStatus: 'unsure',
      artifactName: 'Tệp ảnh số hóa sắc phong',
    },
  },
  {
    id: 'case-6-poster-selling',
    number: '06',
    title: 'Người dùng muốn in ảnh chụp hiện vật thông thường thành poster để bán',
    description:
      'Một cá nhân tải ảnh chụp hiện vật thông thường có độ phân giải cao từ website bảo tàng, ghép thêm khung chữ họa tiết rồi in thành poster treo tường bán trực tuyến.',
    issuesToCheck: [
      'Ảnh chụp hiện vật thông thường không phải bản sao Điều 63 nên không áp đặt nhãn Điều 63, nhưng bán poster là khai thác thương mại trực tiếp (bắt buộc xin phép).',
      'Ghép thêm chữ/họa tiết là tạo tác phẩm phái sinh, liên quan đến quyền tài sản và quyền nhân thân của chủ sở hữu ảnh.',
      'Cần thỏa thuận khai thác thương mại hình ảnh hiện vật với bảo tàng theo Điều 88 Luật DSVH 2024.',
    ],
    assessmentSummary: 'Cao — Cần xin phép bản quyền ảnh & thỏa thuận thương mại với bảo tàng',
    riskTier: 'high',
    legalStatusCategory: 'Cần xin phép trước khi sử dụng',
    reasoning:
      'In poster bán thương mại và ghép họa tiết vượt khỏi mọi ngoại lệ của Điều 25 Luật SHTT. Vì đây là ảnh chụp hiện vật thông thường, vấn đề pháp lý trọng tâm là thỏa thuận cấp phép thương mại và quyền tạo tác phẩm phái sinh với chủ sở hữu quyền ảnh và bảo tàng lưu giữ.',
    recommendedAction:
      'Không in ấn bán ra thị trường khi chưa có văn bản thỏa thuận cấp quyền từ chủ sở hữu quyền ảnh và bảo tàng lưu giữ.',
    referenceNote: 'Điều 88 Luật Di sản văn hóa 2024; Điều 19 & Điều 20 Luật Sở hữu trí tuệ.',
    prefillInput: {
      materialType: 'museum_artifact',
      imageSource: 'museum_website',
      usagePurpose: 'commercial_business',
      modification: 'collage_derivative',
      attributionInfo: 'custodian_only',
      permissionStatus: 'not_permitted',
      artifactName: 'Hiện vật trưng bày tại bảo tàng',
    },
  },
  {
    id: 'case-7-self-captured-museum',
    number: '07',
    title: 'Một cá nhân tự chụp ảnh hiện vật thông thường trong bảo tàng để chia sẻ blog',
    description:
      'Khách tham quan dùng máy ảnh cá nhân chụp một tượng cổ (ảnh chụp hiện vật thông thường) trong khu vực bảo tàng cho phép chụp ảnh, sau đó đăng công khai lên blog cá nhân chia sẻ trải nghiệm tham quan.',
    issuesToCheck: [
      'Khách tham quan tự chụp có thể nắm quyền tác giả bức ảnh nếu ảnh thể hiện tính nguyên gốc, sáng tạo (góc máy, ánh sáng).',
      'Phải xác minh nội quy chụp ảnh và chia sẻ công khai tại thời điểm tham quan (khu vực cho phép, không dùng flash/chân máy).',
      'Phân biệt chia sẻ trải nghiệm phi thương mại với việc dùng ảnh tự chụp cho quảng cáo hoặc bán hàng.',
    ],
    assessmentSummary: 'Trung bình — Cần xác minh nội quy bảo tàng & giữ phạm vi phi thương mại',
    riskTier: 'medium',
    legalStatusCategory: 'Cần xác minh thêm',
    reasoning:
      'Việc tự chụp ảnh giúp bạn không lấy ảnh của nhiếp ảnh gia khác, nhưng không đồng nghĩa mọi khu vực trong bảo tàng đều cho phép chụp và công bố công khai tự do. Cần kiểm tra nội quy phòng trưng bày và giữ mục đích chia sẻ trải nghiệm phi thương mại.',
    recommendedAction:
      'Đối chiếu biển báo/nội quy chụp ảnh tại bảo tàng, ghi chú rõ tên hiện vật và tên bảo tàng nơi trưng bày. Nếu về sau dùng ảnh tự chụp cho ấn phẩm bán hoặc quảng cáo, hãy liên hệ xác nhận quy chế với bảo tàng.',
    referenceNote: 'Điều 14 Luật SHTT; Thông tư 05/2025/TT-BVHTTDL & Nội quy từng bảo tàng.',
    prefillInput: {
      materialType: 'museum_artifact',
      imageSource: 'self_captured',
      usagePurpose: 'website_social',
      modification: 'crop_resize',
      attributionInfo: 'complete',
      permissionStatus: 'unsure',
      artifactName: 'Tượng cổ trưng bày tại bảo tàng',
    },
  },
  {
    id: 'case-8-unknown-author',
    number: '08',
    title: 'Người dùng tìm thấy ảnh di tích trên mạng xã hội nhưng không biết tác giả',
    description:
      'Một biên tập viên tìm thấy bức ảnh đẹp về di tích kiến trúc cổ trên mạng xã hội, ảnh không ghi tên người chụp, không ghi năm chụp và không rõ đơn vị quản lý.',
    issuesToCheck: [
      'Thiếu hoàn toàn thông tin tác giả và nguồn gốc xuất xứ.',
      'Không có cơ sở chứng minh bức ảnh thuộc phạm vi tự do sử dụng hay hết thời hạn bảo hộ.',
      'Không thể thực hiện nghĩa vụ ghi tên tác giả và nguồn gốc theo Khoản 2 Điều 25 Luật SHTT.',
    ],
    assessmentSummary: 'Cần xác minh thêm — Không đủ dữ liệu về chủ thể quyền để sử dụng an toàn',
    riskTier: 'verify',
    legalStatusCategory: 'Cần xác minh thêm',
    reasoning:
      'Không rõ tên tác giả không biến bức ảnh thành tài sản công cộng tự do. Khi không xác định được người chụp và nguồn gốc hợp pháp, bạn không thể xin phép đúng chủ thể quyền và cũng không đáp ứng được điều kiện ghi nguồn bắt buộc.',
    recommendedAction:
      'Truy ngược nguồn gốc ảnh ban đầu. Nếu vẫn không xác minh được tác giả và tình trạng bản quyền, không dùng bức ảnh đó cho truyền thông mà thay bằng ảnh có nguồn chính thức hoặc ảnh tự chụp hợp lệ.',
    referenceNote: 'Khoản 2 Điều 25 Luật Sở hữu trí tuệ; Điều 88 Luật Di sản văn hóa 2024.',
    prefillInput: {
      materialType: 'heritage_site',
      imageSource: 'social_media',
      usagePurpose: 'media_promotion',
      modification: 'none',
      attributionInfo: 'unknown_origin',
      permissionStatus: 'unsure',
      artifactName: 'Di tích kiến trúc cổ',
    },
  },
  {
    id: 'case-9-website-repost',
    number: '09',
    title: 'Một website tin tức tải lại ảnh hiện vật từ trang bảo tàng để đăng truyền thông',
    description:
      'Một trang tin điện tử tải bộ ảnh chụp hiện vật thông thường từ website bảo tàng về lưu trên máy chủ riêng để đăng kèm bài truyền thông tổng hợp.',
    issuesToCheck: [
      'Ảnh công khai trên website bảo tàng KHÔNG đồng nghĩa được phép tải về đăng lại nguyên bộ.',
      'Phân biệt đưa tin thời sự phi thương mại trong giới hạn trích dẫn hợp lý với việc tái phân phối ảnh trên trang có quảng cáo.',
      'Chỉ ghi tên bảo tàng vẫn KHÔNG thay thế được sự đồng ý khi vượt quá giới hạn trích dẫn báo chí.',
    ],
    assessmentSummary: 'Trung bình — Cần kiểm tra điều khoản nguồn & xin phép trước khi đăng lại bộ ảnh',
    riskTier: 'medium',
    legalStatusCategory: 'Cần xin phép trước khi sử dụng',
    reasoning:
      'Website của bảo tàng công bố ảnh để công chúng tra cứu; tải nguyên bộ ảnh về đăng lại vượt quá phạm vi trích dẫn thời sự thông thường có thể mâu thuẫn với việc khai thác bình thường và điều khoản của trang nguồn.',
    recommendedAction:
      'Kiểm tra mục "Bản quyền / Điều khoản sử dụng" trên website bảo tàng và liên hệ bộ phận truyền thông của bảo tàng để xin văn bản cho phép trích đăng (đồng thời xác nhận cả quyền tác giả ảnh nếu có nhiếp ảnh gia riêng).',
    referenceNote: 'Điều 25 Luật Sở hữu trí tuệ; Điều khoản cổng thông tin của từng bảo tàng.',
    prefillInput: {
      materialType: 'museum_artifact',
      imageSource: 'museum_website',
      usagePurpose: 'media_promotion',
      modification: 'none',
      attributionInfo: 'custodian_only',
      permissionStatus: 'not_permitted',
      artifactName: 'Bộ sưu tập hiện vật bảo tàng',
    },
  },
  {
    id: 'case-10-copy-ancient-doc',
    number: '10',
    title: 'Đơn vị du lịch muốn dùng bản sao di sản tư liệu chế tác theo Điều 63 để in cẩm nang bán',
    description:
      'Một nhóm truyền thông du lịch muốn dùng bản sao di sản tư liệu được chế tác theo Điều 63 Luật DSVH 2024 (tài liệu cổ được sao y vật mang tin để thay thế bản gốc trưng bày) nhằm in trong cẩm nang bán thu lợi nhuận.',
    issuesToCheck: [
      'Đối tượng là bản sao di sản tư liệu được chế tác đúng phạm vi Điều 63 Luật Di sản văn hóa 2024.',
      'Khoản 5 Điều 63 quy định rõ bản sao di sản tư liệu KHÔNG được sử dụng vì mục đích lợi nhuận.',
      'Không được gợi ý rằng chỉ cần xin phép đơn vị quản lý là có thể bỏ qua giới hạn cấm mục đích lợi nhuận của Khoản 5 Điều 63.',
    ],
    assessmentSummary: 'Cao — Cấm dùng bản sao Điều 63 vì lợi nhuận; phải xin tiếp cận tư liệu gốc/nguồn ảnh hợp lệ',
    riskTier: 'high',
    legalStatusCategory: 'Cần xin phép trước khi sử dụng',
    reasoning:
      'Trường hợp này là bản sao di sản tư liệu đích thực thuộc phạm vi Điều 63 Luật DSVH 2024 (khác hẳn tệp ảnh số hóa hoặc ảnh chụp thông thường). Khoản 5 Điều 63 quy định bản sao không thay thế bản gốc, KHÔNG được sử dụng vì mục đích lợi nhuận và phải chú thích "bản sao" — thỏa thuận xin phép thông thường không thể bỏ qua giới hạn cấm này của luật.',
    recommendedAction:
      'Không đưa bản sao Điều 63 vào ấn phẩm bán thu lợi nhuận. Liên hệ trực tiếp cơ quan quản lý di sản tư liệu để làm thủ tục tiếp cận tư liệu gốc hoặc sử dụng bộ ảnh khai thác thương mại hợp lệ theo Điều 88 (và chỉ dùng bản sao Điều 63 cho hoạt động phi lợi nhuận với chú thích rõ "Bản sao").',
    referenceNote: 'Điều 60, Khoản 5 Điều 63 & Điều 88 Luật Di sản văn hóa năm 2024 (45/2024/QH15).',
    prefillInput: {
      materialType: 'doc_heritage_copy_63',
      imageSource: 'heritage_agency_website',
      usagePurpose: 'commercial_business',
      modification: 'none',
      attributionInfo: 'complete',
      permissionStatus: 'not_permitted',
      artifactName: 'Bản sao tài liệu cổ chế tác theo Điều 63',
    },
  },
];
