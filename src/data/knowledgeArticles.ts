import type { KnowledgeArticle, KnowledgeCategory } from '../types/heritage';

export const KNOWLEDGE_CATEGORIES: KnowledgeCategory[] = [
  'Quyền sở hữu hiện vật và di sản tư liệu',
  'Quyền quản lý, khai thác hình ảnh tại bảo tàng',
  'Bản gốc, bản sao và bản số',
  'Quyền tác giả và quyền liên quan',
  'Sử dụng hình ảnh cho mục đích học tập, nghiên cứu',
  'Sử dụng hình ảnh trong truyền thông và thương mại',
  'Quy định về ghi nguồn và trích dẫn',
  'Những trường hợp cần xin phép trước khi sử dụng',
];

export const KNOWLEDGE_ARTICLES: KnowledgeArticle[] = [
  {
    id: 'quyen-so-huu-hien-vat-va-di-san-tu-lieu',
    category: 'Quyền sở hữu hiện vật và di sản tư liệu',
    title: 'Phân biệt quyền sở hữu hiện vật, quyền quản lý và quyền đối với hình ảnh',
    subtitle: 'Vì sao việc sở hữu hoặc được tiếp cận hiện vật vật lý không đồng nghĩa với toàn quyền sử dụng hình ảnh của hiện vật đó?',
    imagePath: '/real-heritage/ngoc_lu_drum.jpg',
    imageCaption: 'Hình 1 — Trống đồng Ngọc Lũ (văn hóa Đông Sơn) trưng bày tại Bảo tàng Lịch sử Quốc gia Việt Nam. Ảnh: VuThiAnh (Wikimedia Commons · Public domain).',
    updatedAt: '11/2026',
    readTime: '5 phút đọc',
    summary:
      'Một hiểu lầm phổ biến là cho rằng cổ vật có niên đại hàng trăm năm đã "hết bản quyền" nên mọi bức ảnh chụp cổ vật đó đều có thể dùng tự do. Thực tế tồn tại bốn lớp quyền độc lập cần tách bạch.',
    contentParagraphs: [
      'Khi đánh giá quyền sử dụng hình ảnh một hiện vật bảo tàng hoặc di sản tư liệu, người dùng cần tách bạch rõ bốn tầng quan hệ pháp lý: (1) quyền sở hữu đối với hiện vật vật lý (sở hữu toàn dân do Nhà nước đại diện chủ sở hữu, sở hữu chung hoặc sở hữu riêng); (2) quyền quản lý, bảo vệ và phát huy giá trị của bảo tàng hoặc cơ quan lưu giữ; (3) quyền tác giả đối với bức ảnh chụp hoặc sản phẩm số hóa (chỉ phát sinh nếu đáp ứng điều kiện bảo hộ về tính nguyên gốc, sáng tạo theo Luật Sở hữu trí tuệ); và (4) quyền khai thác di sản văn hóa theo quy định chuyên ngành.',
      'Theo Điều 60 Luật Di sản văn hóa năm 2024 (số 45/2024/QH15), di sản tư liệu thuộc sở hữu toàn dân phải được quản lý, bảo vệ, phát huy giá trị tại cơ quan, tổ chức có chức năng, nhiệm vụ phù hợp; không được kinh doanh, mua bán, trao đổi, tặng cho hoặc chuyển quyền sở hữu trái quy định. Điều này khẳng định vai trò đại diện quản lý chặt chẽ của thiết chế công đối với tư liệu gốc.',
      'Ngay cả khi hiện vật vật lý có niên đại cổ xưa và không còn quyền tác giả đối với chính hiện vật gốc, bức ảnh mới chụp do bảo tàng hay nhiếp ảnh gia thực hiện vẫn có thể được bảo hộ độc lập như một tác phẩm nhiếp ảnh (nếu thể hiện dấu ấn sáng tạo của người chụp) hoặc chịu sự điều chỉnh của nội quy khai thác dữ liệu tại đơn vị lưu giữ.',
    ],
    practicalExample:
      'Bảo tàng Lịch sử Quốc gia quản lý Trống đồng Ngọc Lũ có niên đại văn hóa Đông Sơn. Bản thân họa tiết gốc trên trống đồng không còn chủ thể quyền tác giả cá nhân, nhưng bộ ảnh studio nghệ thuật do nhiếp ảnh gia thực hiện có thể được bảo hộ quyền tác giả ảnh, đồng thời việc khai thác thương mại bộ ảnh của bảo tàng còn phụ thuộc quy chế cung cấp tư liệu của đơn vị.',
    illustrativeScenario:
      'Một xưởng thủ công mỹ nghệ tải ảnh chụp hiện vật cổ từ trang thông tin của bảo tàng để in lên hộp quà tặng thương mại vì nghĩ "đồ cổ thì hết bản quyền". Xưởng có thể đồng thời vướng rủi ro vi phạm quyền tác giả của người chụp ảnh (nếu ảnh có tính sáng tạo được bảo hộ) và vi phạm điều khoản sử dụng tư liệu của bảo tàng.',
    legalBasis:
      'Điều 60 và Điều 88 Luật Di sản văn hóa năm 2024 (45/2024/QH15); Điều 14 Luật Sở hữu trí tuệ (sửa đổi, bổ sung năm 2022) về điều kiện bảo hộ tác phẩm nhiếp ảnh.',
  },
  {
    id: 'quyen-quan-ly-khai-thac-hinh-anh-bao-tang',
    category: 'Quyền quản lý, khai thác hình ảnh tại bảo tàng',
    title: 'Quyền quản lý, cung cấp và khai thác hình ảnh tại các bảo tàng Việt Nam',
    subtitle: 'Trách nhiệm của bảo tàng công lập, ngoài công lập và quy trình tiếp cận tư liệu hình ảnh hợp pháp.',
    imagePath: '/real-heritage/cham_museum.jpg',
    imageCaption: 'Hình 2 — Phòng trưng bày các tác phẩm điêu khắc đá Chăm-pa kèm bảng chú thích hiện vật tại Bảo tàng Điêu khắc Chăm Đà Nẵng. Ảnh: Daderot (Wikimedia Commons · CC0).',
    updatedAt: '11/2026',
    readTime: '6 phút đọc',
    summary:
      'Bảo tàng vừa là nơi bảo quản hiện vật, vừa có thẩm quyền đặt ra quy chế tham quan, chụp ảnh và cung cấp bản sao hình ảnh phục vụ nghiên cứu, truyền thông hoặc hợp tác văn hóa.',
    contentParagraphs: [
      'Theo Luật Di sản văn hóa năm 2024 (Điều 64, 65, 67 về hệ thống bảo tàng công lập/ngoài công lập và Điều 88 về sử dụng, khai thác di sản văn hóa) cùng Thông tư 05/2025/TT-BVHTTDL về nhiệm vụ chuyên môn của bảo tàng, bảo tàng có trách nhiệm lưu giữ, tư liệu hóa, trưng bày, nghiên cứu và phát huy giá trị di sản. Việc sử dụng hình ảnh hiện vật phải tôn trọng giá trị gốc và tuân thủ quy chế của từng đơn vị.',
      'Tuy nhiên, cần phân biệt rạch ròi giữa quyền quản lý di sản của bảo tàng với quyền cấp phép bản quyền ảnh: bảo tàng chỉ có quyền cấp phép bản quyền đối với bức ảnh nếu bảo tàng đồng thời là tác giả hoặc chủ sở hữu quyền tác giả bức ảnh đó (theo giao nhiệm vụ hoặc hợp đồng). Nếu ảnh do nhiếp ảnh gia độc lập chụp, sự đồng ý của bảo tàng về mặt quản lý di sản không mặc nhiên thay thế sự đồng ý của tác giả bức ảnh.',
      'Khi website chính thức của bảo tàng đăng tải hình ảnh hiện vật để công chúng tra cứu, điều đó phục vụ mục đích tiếp cận thông tin và giáo dục văn hóa — không mặc nhiên đồng nghĩa với việc cấp phép tự do tải về để kinh doanh hoặc đăng tải lại nguyên bộ lên nền tảng khác.',
    ],
    practicalExample:
      'Một nhóm sinh viên kiến trúc muốn xin ảnh chụp hoa văn chi tiết của hiện vật điêu khắc Chăm từ kho lưu trữ bảo tàng để phục vụ khóa luận tốt nghiệp. Khi liên hệ phòng nghiệp vụ kèm giấy giới thiệu, bảo tàng sẽ hướng dẫn quy trình cung cấp tư liệu theo quy chế riêng của đơn vị (mỗi bảo tàng có biểu mẫu và điều kiện cụ thể khác nhau).',
    illustrativeScenario:
      'Một khách tham quan chụp ảnh hiện vật trong bảo tàng tại khu vực có biển báo "Cấm chụp ảnh" để bảo vệ cổ vật nhạy cảm ánh sáng rồi đăng lên mạng xã hội. Hành vi này vi phạm nội quy quản lý của bảo tàng dù người chụp không nhằm mục đích thương mại.',
    legalBasis:
      'Điều 64, 65, 67 và Điều 88 Luật Di sản văn hóa năm 2024 (45/2024/QH15); Thông tư 05/2025/TT-BVHTTDL; Quy chế tổ chức và hoạt động của từng bảo tàng (cần xác minh theo từng đơn vị).',
  },
  {
    id: 'ban-goc-ban-sao-va-ban-so',
    category: 'Bản gốc, bản sao và bản số',
    title: 'Phân biệt bản gốc, bản sao và bản số của di sản tư liệu theo Luật 2024',
    subtitle: 'Những giới hạn pháp lý chặt chẽ đối với bản sao di sản tư liệu và lưu ý khi dùng bản số hóa.',
    imagePath: '/real-heritage/nguyen_woodblock.jpg',
    imageCaption: 'Hình 3 — Mộc bản triều Nguyễn được bảo quản trên giá lưu trữ tại Trung tâm Lưu trữ Quốc gia IV (Đà Lạt). Ảnh: Diane Selwyn (Wikimedia Commons · CC BY-SA 3.0).',
    updatedAt: '11/2026',
    readTime: '6 phút đọc',
    summary:
      'Điều 63 Luật Di sản văn hóa năm 2024 quy định chặt chẽ về "bản sao di sản tư liệu", nhưng cần phân biệt rõ bản sao này với tệp ảnh số hóa thông thường.',
    contentParagraphs: [
      'Trong lĩnh vực di sản tư liệu (văn bản cổ, mộc bản, châu bản, sắc phong, tài liệu ghi âm/ghi hình có giá trị đặc biệt), việc phân biệt bản gốc, bản sao di sản tư liệu theo Điều 63 và tệp ảnh số hóa giúp tránh áp dụng nhầm quy định pháp luật.',
      'Theo Điều 63 Luật Di sản văn hóa năm 2024, "bản sao di sản tư liệu" là sản phẩm được làm từ bản gốc, giống bản gốc về nội dung thông tin và vật mang tin; chỉ được chế tác nhằm bảo vệ, phát huy giá trị khi di sản tư liệu dễ bị hư hại, cần hạn chế sử dụng bản gốc. Khoản 5 Điều 63 quy định: bản sao di sản tư liệu không có giá trị tương đương bản gốc, không thay thế được bản gốc; không được sử dụng vì mục đích lợi nhuận; và khi sử dụng phải có chú thích là "bản sao".',
      'Ngược lại, một tệp ảnh số hóa (ảnh scan hoặc ảnh chụp kỹ thuật số đưa lên cổng thông tin tra cứu) KHÔNG mặc nhiên được coi là "bản sao di sản tư liệu" theo đúng định nghĩa vật lý của Điều 63 trừ khi được chế tác và chứng thực theo quy trình bản sao. Tuy nhiên, việc sử dụng tệp số hóa vẫn chịu sự điều chỉnh của điều khoản sử dụng dữ liệu số của cơ quan lưu giữ, Luật Lưu trữ 2024 (nếu là tài liệu lưu trữ) và quyền sở hữu trí tuệ nếu có.',
    ],
    practicalExample:
      'Một trung tâm lưu trữ số hóa mộc bản triều Nguyễn và công bố ảnh tra cứu trên cổng dữ liệu số, đồng thời làm một bản khắc sao đúng vật mang tin để trưng bày thay bản gốc. Bản khắc sao trưng bày chịu sự điều chỉnh trực tiếp của Điều 63 (không dùng vì mục đích lợi nhuận, bắt buộc chú thích "bản sao"), còn tệp ảnh số trên mạng chịu điều chỉnh theo quy chế khai thác dữ liệu số của trung tâm lưu trữ.',
    illustrativeScenario:
      'Một giảng viên lịch sử sử dụng ảnh chụp bản dập mộc bản trong bài giảng đại học và chú thích rõ "Ảnh tư liệu bản dập/bản sao tại...". Cách làm này vừa bảo đảm tính trung thực học thuật, vừa phân biệt rõ bản sao với mộc bản gốc.',
    legalBasis:
      'Điều 60 và Điều 63 Luật Di sản văn hóa năm 2024 (45/2024/QH15); Luật Lưu trữ năm 2024 (33/2024/QH15).',
  },
  {
    id: 'quyen-tac-gia-va-quyen-lien-quan',
    category: 'Quyền tác giả và quyền liên quan',
    title: 'Quyền tác giả đối với bức ảnh chụp hiện vật và di tích',
    subtitle: 'Phân biệt giữa tác phẩm nhiếp ảnh (bức ảnh) và đối tượng được chụp (hiện vật, di tích, văn bia).',
    imagePath: '/real-heritage/van_mieu_stele.jpg',
    imageCaption: 'Hình 4 — Dãy Bia Tiến sĩ trên lưng rùa đá tại Di tích Văn Miếu – Quốc Tử Giám, Hà Nội. Ảnh: Daderot (Wikimedia Commons · CC0).',
    updatedAt: '11/2026',
    readTime: '5 phút đọc',
    summary:
      'Không phải mọi bức ảnh chụp hiện vật đều mặc nhiên được bảo hộ quyền tác giả như nhau — việc bảo hộ phụ thuộc vào tính nguyên gốc và sự sáng tạo của người chụp.',
    contentParagraphs: [
      'Theo Luật Sở hữu trí tuệ Việt Nam (hợp nhất và sửa đổi năm 2022 - Điều 14), tác phẩm nhiếp ảnh là một loại hình được bảo hộ quyền tác giả nếu do tác giả trực tiếp sáng tạo bằng lao động trí tuệ của mình mà không sao chép từ tác phẩm của người khác. Khi một nhiếp ảnh gia lựa chọn bố cục, góc máy, ánh sáng và khoảnh khắc thể hiện dấu ấn sáng tạo riêng khi chụp di tích hay hiện vật, bức ảnh có thể phát sinh quyền tác giả độc lập — tách biệt với quyền sở hữu hiện vật.',
      'Ngược lại, đối với các tệp scan phẳng hai chiều hoặc chụp tái tạo thuần túy mang tính kỹ thuật máy móc (chỉ nhằm ghi nhận trung thực mặt phẳng tài liệu mà không có yếu tố sáng tạo nhiếp ảnh), việc xác định có phát sinh quyền tác giả mới hay không cần xem xét thận trọng theo điều kiện bảo hộ và nguồn công bố cụ thể.',
      'Khi bức ảnh đáp ứng điều kiện bảo hộ, chủ thể quyền nắm cả quyền nhân thân (Điều 19: đứng tên tác giả, bảo vệ sự toàn vẹn tác phẩm) và quyền tài sản (Điều 20: sao chép, phân phối, truyền đạt đến công chúng). Vì vậy, bảo tàng và tác giả ảnh là hai chủ thể cần kiểm tra độc lập nếu không phải cùng một tổ chức.',
    ],
    practicalExample:
      'Một nhiếp ảnh gia dàn dựng ánh sáng, góc máy nghệ thuật chụp dãy Bia Tiến sĩ tại Văn Miếu – Quốc Tử Giám và đăng trên tạp chí kiến trúc. Dù di tích là không gian di sản chung, bộ ảnh cụ thể đó thuộc quyền tác giả của nhiếp ảnh gia hoặc tòa soạn; bên thứ ba muốn lấy lại đăng quảng cáo phải xin phép chủ sở hữu quyền tác giả bức ảnh.',
    illustrativeScenario:
      'Một trang web văn hóa lấy ảnh chụp nghệ thuật về văn bia từ blog của một nhà nghiên cứu, xóa chữ ký trên ảnh rồi đăng lại mà không ghi tên người chụp. Việc xóa thông tin quản lý quyền và tự ý phân phối có thể xâm phạm cả quyền nhân thân và quyền tài sản của tác giả bức ảnh.',
    legalBasis:
      'Điều 14, Điều 19 và Điều 20 Luật Sở hữu trí tuệ Việt Nam (sửa đổi, bổ sung năm 2022 - Luật số 07/2022/QH15).',
  },
  {
    id: 'su-dung-hinh-anh-hoc-tap-nghien-cuu',
    category: 'Sử dụng hình ảnh cho mục đích học tập, nghiên cứu',
    title: 'Ranh giới giữa ngoại lệ học tập, nghiên cứu và việc đăng tải công khai',
    subtitle: 'Áp dụng ngoại lệ Điều 25 Luật Sở hữu trí tuệ như thế nào cho đúng phạm vi pháp luật?',
    imagePath: '/real-heritage/nom_certificate.jpg',
    imageCaption: 'Hình 5 — Tư liệu văn bản song ngữ chữ Nôm – Quốc ngữ năm 1938 với dấu triện hành chính. Ảnh: Wikimedia Commons · Public domain.',
    updatedAt: '11/2026',
    readTime: '5 phút đọc',
    summary:
      'Mục đích học tập không đồng nghĩa được tự do sử dụng mọi hình ảnh trong mọi hoàn cảnh — ngoại lệ Điều 25 chỉ áp dụng khi đáp ứng đủ điều kiện và tách biệt với việc đăng tải công khai.',
    contentParagraphs: [
      'Theo Khoản 1 Điều 25 Luật Sở hữu trí tuệ (sửa đổi, bổ sung năm 2022), các trường hợp ngoại lệ không phải xin phép và không trả tiền bản quyền bao gồm: tự sao chép một bản để nghiên cứu khoa học, học tập của cá nhân không nhằm mục đích thương mại; sao chép hợp lý một phần bằng thiết bị sao chép; sử dụng hợp lý minh họa trong bài giảng (có kiểm soát truy cập nếu qua mạng nội bộ cơ sở giáo dục); và trích dẫn hợp lý không làm sai ý tác giả để bình luận, minh họa.',
      'Tuy nhiên, Khoản 2 Điều 25 đặt ra hai rào cản pháp lý quan trọng: (1) việc sử dụng không được mâu thuẫn với việc khai thác bình thường tác phẩm và không gây thiệt hại bất hợp lý đến lợi ích hợp pháp của tác giả, chủ sở hữu quyền; và (2) BẮT BUỘC thông tin về tên tác giả và nguồn gốc, xuất xứ của tác phẩm.',
      'Điểm dễ nhầm lẫn nhất là ranh giới giữa sử dụng nội bộ (tiểu luận nộp giảng viên, ghi chú cá nhân, slide giảng dạy trong lớp học) với việc đăng tải công khai lên blog, website hoặc mạng xã hội. Ngay cả khi bài viết mang danh nghĩa "chia sẻ kiến thức học tập", việc công bố rộng rãi ra công chúng trên Internet thường vượt khỏi phạm vi tự sao chép học tập cá nhân và cần kiểm tra điều khoản của trang nguồn hoặc xin phép trước.',
    ],
    practicalExample:
      'Sinh viên làm bài tiểu luận nộp nội bộ cho giảng viên trên lớp và sử dụng ảnh chụp văn bản chữ Nôm tải từ cổng tư liệu công khai chính thức, ghi đầy đủ tên tư liệu, đơn vị lưu giữ, đường dẫn và ngày truy cập. Trường hợp này có cơ sở áp dụng ngoại lệ học tập nếu không phát tán thương mại hay đăng lại công khai.',
    illustrativeScenario:
      'Một sinh viên đưa bộ ảnh hiện vật tải từ trang web bảo tàng vào luận văn, sau đó đăng toàn bộ tệp ảnh lên mạng xã hội hoặc in thành sách bán tại nhà sách mà không xin phép lại. Khi chuyển sang phát hành công khai hoặc thương mại, ngoại lệ học tập cá nhân không còn bao phủ.',
    legalBasis:
      'Khoản 1 & Khoản 2 Điều 25 Luật Sở hữu trí tuệ (sửa đổi, bổ sung năm 2022 - Luật số 07/2022/QH15); Điều 88 Luật Di sản văn hóa năm 2024.',
  },
  {
    id: 'su-dung-hinh-anh-truyen-thong-thuong-mai',
    category: 'Sử dụng hình ảnh trong truyền thông và thương mại',
    title: 'Khai thác hình ảnh di sản trong truyền thông, quảng bá và kinh doanh thương mại',
    subtitle: 'Ranh giới giữa giới thiệu văn hóa phi lợi nhuận và sử dụng hình ảnh di sản phục vụ bán hàng.',
    imagePath: '/real-heritage/ngo_mon_hue.jpg',
    imageCaption: 'Hình 6 — Di tích Ngọ Môn thuộc Quần thể Di tích Cố đô Huế. Ảnh: Bùi Thụy Đào Nguyên (Wikimedia Commons · CC BY-SA 3.0).',
    updatedAt: '11/2026',
    readTime: '6 phút đọc',
    summary:
      'Mọi hình thức dùng ảnh hiện vật hoặc di tích để quảng cáo sản phẩm, in ấn hàng hóa lưu niệm, bán poster đều vượt khỏi ngoại lệ học tập và cần văn bản cho phép.',
    contentParagraphs: [
      'Điều 88 Luật Di sản văn hóa năm 2024 mở rộng cơ hội cho tổ chức, cộng đồng và cá nhân sử dụng, khai thác di sản văn hóa trong sáng tạo nghệ thuật, tuyên truyền, quảng bá, du lịch và phát triển công nghiệp văn hóa. Tuy nhiên, Luật đồng thời đặt ra yêu cầu bắt buộc: việc khai thác không được làm sai lệch, tổn hại đến giá trị gốc của di sản và phải tuân thủ các quy định pháp luật liên quan.',
      'Khi đưa hình ảnh hiện vật hoặc di tích vào hoạt động truyền thông doanh nghiệp, quảng cáo sản phẩm (như bao bì trà, mỹ phẩm, thời trang, đồ trang trí) hoặc in ấn bán trực tiếp (poster, áo thun, bưu thiếp), có ba rủi ro pháp lý song song: (1) vi phạm quyền tài sản của tác giả bức ảnh; (2) sử dụng trái phép hình ảnh thuộc quyền quản lý khai thác của bảo tàng/ban quản lý di tích; và (3) vi phạm quy định cấm lợi nhuận đối với bản sao di sản tư liệu tại Điều 63.',
      'Giải pháp an toàn nhất cho đơn vị truyền thông và doanh nghiệp là liên hệ trực tiếp bảo tàng/cơ quan quản lý di sản để ký thỏa thuận cấp quyền sử dụng hình ảnh, hoặc tự đầu tư sáng tạo thiết kế đồ họa/chụp ảnh hợp pháp tại không gian được cấp phép.',
    ],
    practicalExample:
      'Một thương hiệu du lịch muốn sử dụng ảnh di tích kiến trúc Ngọ Môn để xây dựng ấn phẩm quảng bá tour văn hóa. Doanh nghiệp liên hệ Trung tâm Bảo tồn Di tích Cố đô Huế để xin cấp phép ghi hình truyền thông chính thức hoặc thỏa thuận sử dụng ảnh với nhiếp ảnh gia có bản quyền.',
    illustrativeScenario:
      'Một cửa hàng bán đồ lưu niệm tải ảnh chụp di tích hoặc cổ vật từ mạng về in trực tiếp lên sản phẩm bán kiếm lời mà không xin phép tác giả bức ảnh và không tuân thủ giấy phép Creative Commons (ví dụ giữ nguyên điều khoản ghi công và chia sẻ tương tự nếu giấy phép yêu cầu).',
    legalBasis:
      'Điều 63 và Điều 88 Luật Di sản văn hóa năm 2024 (45/2024/QH15); Luật Sở hữu trí tuệ (sửa đổi, bổ sung năm 2022).',
  },
  {
    id: 'quy-dinh-ghi-nguon-va-trich-dan',
    category: 'Quy định về ghi nguồn và trích dẫn',
    title: 'Chuẩn mực ghi nguồn hình ảnh hiện vật và di sản tư liệu',
    subtitle: 'Cách ghi nhận đầy đủ tên hiện vật, tác giả ảnh, cơ quan lưu giữ và nguồn truy cập mà không tự suy đoán.',
    imagePath: '/real-heritage/tran_ceramic.jpg',
    imageCaption: 'Hình 7 — Thạp gốm hoa nâu thời Trần (thế kỷ XIII–XIV) trưng bày cùng bảng thông tin hiện vật tại Bảo tàng Lịch sử Quốc gia Việt Nam. Ảnh: Gryffindor (Wikimedia Commons · CC BY-SA 3.0).',
    updatedAt: '11/2026',
    readTime: '4 phút đọc',
    summary:
      'Ghi nguồn đầy đủ là nghĩa vụ pháp lý tối thiểu và chuẩn mực học thuật, nhưng chỉ riêng việc ghi nguồn KHÔNG thay thế cho việc xin phép khi vượt ngoài ngoại lệ luật định.',
    contentParagraphs: [
      'Dù bạn sử dụng hình ảnh trong phạm vi ngoại lệ học tập – nghiên cứu hay đã được cấp phép, việc ghi nguồn chính xác luôn là yêu cầu bắt buộc. Một dòng ghi nguồn chuẩn mực giúp người đọc phân biệt được hiện vật gốc lưu giữ ở đâu, ai là người chụp/số hóa bức ảnh, và hình ảnh đó có phải là bản sao di sản tư liệu hay không.',
      'Cấu trúc ghi nguồn khuyến nghị của Cẩm nang gồm 5 thành phần cốt lõi: Tên hiện vật hoặc di sản – Tên tác giả/người chụp (chỉ ghi khi có thông tin xác thực) – Tên bảo tàng hoặc đơn vị lưu giữ – Đường dẫn nguồn hoặc tên ấn phẩm gốc – Ngày truy cập.',
      'Lưu ý thực tiễn: rất nhiều người nhầm lẫn rằng "chỉ cần ghi rõ nguồn sưu tầm là được tự do đăng tải lại ảnh". Thực tế, ghi nguồn là điều kiện cần trong ngoại lệ Điều 25 hoặc trong giấy phép, chứ không tự động biến hành vi sử dụng thương mại hoặc đăng lại trái phép thành hợp pháp.',
    ],
    practicalExample:
      'Mẫu ghi nguồn chuẩn khi có đủ thông tin: "Thạp gốm hoa nâu thời Trần – Ảnh: Gryffindor – Bảo tàng Lịch sử Quốc gia Việt Nam (qua Wikimedia Commons, CC BY-SA 3.0) – Truy cập ngày 15/11/2026."',
    illustrativeScenario:
      'Khi nguồn chỉ nêu tên đơn vị lưu giữ hoặc tên sách catalog mà không ghi tên cá nhân nhiếp ảnh gia, người dùng chỉ ghi tên đơn vị lưu giữ/ấn phẩm theo đúng dữ liệu có thật, tuyệt đối không tự bịa thêm tên tác giả.',
    legalBasis:
      'Khoản 2 Điều 25 Luật Sở hữu trí tuệ (yêu cầu thông tin về tên tác giả và nguồn gốc, xuất xứ); Khoản 5 Điều 63 Luật Di sản văn hóa năm 2024 (bắt buộc chú thích "bản sao" khi sử dụng bản sao di sản tư liệu).',
  },
  {
    id: 'cac-truong-hop-can-xin-phep',
    category: 'Những trường hợp cần xin phép trước khi sử dụng',
    title: 'Khi nào bắt buộc phải xin phép trước khi sử dụng hình ảnh di sản?',
    subtitle: 'Danh mục nhận diện nhanh các tình huống rủi ro cao đòi hỏi văn bản chấp thuận từ cơ quan lưu giữ hoặc tác giả.',
    imagePath: '/real-heritage/chu_dau_ceramic.jpg',
    imageCaption: 'Hình 8 — Hiện vật gốm hoa lam Chu Đậu (thế kỷ XV) thuộc sưu tập Bảo tàng Lịch sử Quốc gia Việt Nam. Ảnh: Gryffindor / Sisyphos2 (Wikimedia Commons · CC BY-SA 3.0).',
    updatedAt: '11/2026',
    readTime: '5 phút đọc',
    summary:
      'Việc một hình ảnh xuất hiện công khai trên Google, Facebook hay website không đồng nghĩa với việc được phép tải về sử dụng tự do. Hãy kiểm tra 5 dấu hiệu bắt buộc xin phép.',
    contentParagraphs: [
      'Bạn cần chủ động liên hệ xin phép cơ quan quản lý di sản, bảo tàng hoặc chủ sở hữu quyền tác giả bức ảnh trước khi sử dụng nếu rơi vào một trong các trường hợp sau: (1) Mục đích sử dụng có yếu tố thương mại, quảng cáo, kinh doanh sản phẩm/dịch vụ hoặc bán ấn phẩm; (2) Xuất bản sách, tạp chí phát hành rộng rãi hoặc đưa lên nền tảng số có doanh thu quảng cáo; (3) Chỉnh sửa làm biến đổi hiện trạng hiện vật, ghép ảnh, tạo tác phẩm phái sinh hoặc nạp ảnh vào công cụ AI tạo sinh gây sai lệch giá trị di sản; (4) Sử dụng bản sao di sản tư liệu thuộc diện hạn chế tiếp xúc; hoặc (5) Ảnh chụp có ghi rõ bản quyền của cá nhân/tổ chức khác.',
      'Ngay cả khi bạn tự mang máy ảnh vào bảo tàng để chụp hiện vật, bạn vẫn phải tuân thủ nội quy khu vực cho phép chụp ảnh, không dùng đèn flash hay chân máy gây cản trở, và nếu sử dụng ảnh tự chụp đó vào xuất bản sách hay quảng cáo thương mại, bạn vẫn cần liên hệ xác nhận quy chế với bảo tàng quản lý hiện vật.',
      'Đặc biệt lưu ý với ảnh tìm được trên mạng xã hội hoặc công cụ tìm kiếm nhưng "không rõ tác giả, không rõ nguồn gốc": đây là nhóm ảnh rủi ro pháp lý cao nhất vì người dùng không thể chứng minh phạm vi cấp phép. Trong tình huống này, trạng thái đánh giá chuẩn xác là "Cần xác minh thêm" — ưu tiên truy ngược nguồn gốc chính thức từ website bảo tàng hoặc thay thế bằng ảnh có nguồn minh bạch.',
    ],
    practicalExample:
      'Một nhà xuất bản làm sách ảnh giới thiệu các bộ sưu tập gốm hoa lam Chu Đậu hoặc bảo vật quốc gia để bán thương mại. Nhà xuất bản phải gửi công văn tới từng bảo tàng/đơn vị trực tiếp quản lý hiện vật và thỏa thuận bản quyền với nhiếp ảnh gia thực hiện bộ ảnh.',
    illustrativeScenario:
      'Một người dùng lấy ảnh cổ vật không rõ nguồn trên công cụ tìm kiếm rồi dùng phần mềm chỉnh sửa làm biến dạng màu sắc và đăng lên trang bán hàng. Trường hợp này vướng cả rủi ro không rõ chủ thể bản quyền ảnh gốc lẫn nguy cơ làm sai lệch thông tin di sản.',
    legalBasis:
      'Điều 60, 63, 88 Luật Di sản văn hóa năm 2024 (45/2024/QH15); Thông tư 05/2025/TT-BVHTTDL; Luật Sở hữu trí tuệ (sửa đổi, bổ sung năm 2022).',
  },
];
