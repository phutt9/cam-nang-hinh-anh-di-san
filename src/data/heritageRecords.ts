import type {
  DigitizationStatus,
  HeritageMaterialCategory,
  HeritageRecord,
} from '../types/heritage';

export const HERITAGE_MATERIAL_CATEGORIES: HeritageMaterialCategory[] = [
  'Mộc bản',
  'Châu bản',
  'Bia đá',
  'Văn bản Hán Nôm',
  'Hiện vật',
  'Tài liệu lưu trữ',
];

export const DIGITIZATION_STATUS_OPTIONS: DigitizationStatus[] = [
  'Đã số hóa',
  'Chưa số hóa',
  'Chưa xác minh',
];

export interface IndependentSourceRegistryItem {
  domain: string;
  agencyName: string;
  roleDescription: string;
}

export const INDEPENDENT_SOURCE_REGISTRY: IndependentSourceRegistryItem[] = [
  {
    domain: 'dsvh.gov.vn',
    agencyName: 'Cục Di sản văn hóa (Bộ Văn hóa, Thể thao và Du lịch)',
    roleDescription: 'Cơ quan quản lý nhà nước chuyên ngành về di sản văn hóa, hồ sơ di sản tư liệu UNESCO và bảo tàng.',
  },
  {
    domain: 'archives.org.vn',
    agencyName: 'Cục Văn thư và Lưu trữ nhà nước / Trung tâm Lưu trữ quốc gia I',
    roleDescription: 'Cổng thông tin giới thiệu các phông, sưu tập Hán Nôm, Châu bản, Địa bạ triều Nguyễn.',
  },
  {
    domain: 'luutru.gov.vn',
    agencyName: 'Hệ thống thông tin Cục Văn thư và Lưu trữ nhà nước (dms.luutru.gov.vn)',
    roleDescription: 'Danh mục phông và sưu tập tài liệu lưu trữ tại các Trung tâm Lưu trữ quốc gia.',
  },
  {
    domain: 'mocban.vn',
    agencyName: 'Chuyên trang Mộc bản triều Nguyễn (Trung tâm Lưu trữ quốc gia IV)',
    roleDescription: 'Trang giới thiệu chuyên đề về khối Mộc bản triều Nguyễn bảo quản tại Đà Lạt.',
  },
  {
    domain: 'baotanglichsu.vn',
    agencyName: 'Bảo tàng Lịch sử Quốc gia',
    roleDescription: 'Đơn vị lưu giữ, nghiên cứu và trưng bày sưu tập hiện vật văn hóa Đông Sơn cùng nhiều tư liệu lịch sử.',
  },
  {
    domain: 'hatinh.gov.vn',
    agencyName: 'Cổng Thông tin điện tử tỉnh Hà Tĩnh & Bảo tàng Hà Tĩnh',
    roleDescription: 'Cung cấp tư liệu chính thức về 3 di sản tư liệu UNESCO tại làng Trường Lưu, huyện Can Lộc.',
  },
  {
    domain: 'bvhttdl.gov.vn',
    agencyName: 'Cổng Thông tin điện tử Bộ Văn hóa, Thể thao và Du lịch',
    roleDescription: 'Thông tin chính thức về công nhận, lễ đón nhận và bảo tồn di sản tư liệu quốc gia.',
  },
  {
    domain: 'danang.gov.vn',
    agencyName: 'Cổng Thông tin điện tử Thành phố Đà Nẵng',
    roleDescription: 'Tư liệu chính thức về hệ thống Ma nhai tại Danh thắng Ngũ Hành Sơn.',
  },
  {
    domain: 'nlv.gov.vn',
    agencyName: 'Thư viện Quốc gia Việt Nam',
    roleDescription: 'Bài viết chuyên môn và tư liệu thư tịch liên quan tới văn bia Tiến sĩ Văn Miếu.',
  },
  {
    domain: 'hoangthanhthanglong.vn',
    agencyName: 'Trung tâm Bảo tồn Di sản Thăng Long – Hà Nội',
    roleDescription: 'Tư liệu giới thiệu và đối chiếu về di sản Bia Tiến sĩ Văn Miếu – Quốc Tử Giám.',
  },
  {
    domain: 'vietnamtourism.gov.vn',
    agencyName: 'Cục Du lịch Quốc gia Việt Nam (Bộ VHTTDL)',
    roleDescription: 'Cổng thông tin giới thiệu các di sản tư liệu Huế, Bắc Giang và Hà Nội.',
  },
  {
    domain: 'scov.gov.vn',
    agencyName: 'Ủy ban Nhà nước về người Việt Nam ở nước ngoài (Bộ Ngoại giao)',
    roleDescription: 'Chuyên mục bản sắc văn hóa giới thiệu Mộc bản chùa Vĩnh Nghiêm, Châu bản và Hoàng hoa sứ trình đồ.',
  },
  {
    domain: 'vov.gov.vn',
    agencyName: 'Đài Tiếng nói Việt Nam',
    roleDescription: 'Tin tư liệu chính thức về hồ sơ Cửu đỉnh Hoàng cung Huế được UNESCO MOWCAP ghi danh năm 2024.',
  },
  {
    domain: 'vjst.vn',
    agencyName: 'Tạp chí Khoa học và Công nghệ Việt Nam (Bộ KH&CN)',
    roleDescription: 'Tài liệu thông tin khoa học về công tác số hóa 2D/3D hệ thống 82 bia Tiến sĩ Văn Miếu.',
  },
  {
    domain: 'ussh.vnu.edu.vn',
    agencyName: 'Trường Đại học Khoa học Xã hội và Nhân văn (ĐHQG Hà Nội)',
    roleDescription: 'Tóm tắt luận văn, khảo cứu học thuật về Phông Nha Kinh lược Bắc Kỳ lưu trữ tại TTLTQG I.',
  },
  {
    domain: 'baochinhphu.vn',
    agencyName: 'Báo Điện tử Chính phủ',
    roleDescription: 'Thông tin chính thức về giá trị và sự kiện ghi danh Mộc bản chùa Vĩnh Nghiêm và Châu bản triều Nguyễn.',
  },
];

export const HERITAGE_RECORDS: HeritageRecord[] = [
  {
    id: 'tl001-moc-ban-trieu-nguyen',
    code: 'TL001',
    name: 'Mộc bản triều Nguyễn',
    type: 'Mộc bản',
    era: 'Thế kỷ XIX – đầu thế kỷ XX (1802–1945)',
    locality: 'Lâm Đồng',
    description:
      'Khối tài liệu gồm 34.618 tấm ván gỗ khắc ngược chữ Hán và chữ Nôm dùng để in các bộ chính sử, điển chế, kinh sách, luật lệ và văn thơ do Quốc sử quán triều Nguyễn biên soạn, ngự lãm và khắc in. Đây là Di sản tư liệu thế giới đầu tiên của Việt Nam được UNESCO ghi danh (2009).',
    originalRepository:
      'Trung tâm Lưu trữ quốc gia IV (số 02 Yết Kiêu, phường 5, TP. Đà Lạt, tỉnh Lâm Đồng) — cần phân biệt rõ nơi bảo quản bản gốc tại Đà Lạt với nơi chế tác lịch sử là kinh đô Huế.',
    heritageSiteOrDisplay:
      'Khu trưng bày Mộc bản triều Nguyễn tại Biệt điện Trần Lệ Xuân, Trung tâm Lưu trữ quốc gia IV (Đà Lạt).',
    custodian: 'Trung tâm Lưu trữ quốc gia IV (thuộc Cục Văn thư và Lưu trữ nhà nước)',
    digitizationStatus: 'Đã số hóa',
    digitizationNote:
      'Đã thực hiện dập bản trên giấy dó, phân loại, lập mục lục và quét số hóa toàn bộ khối tài liệu để phục vụ tra cứu, hạn chế tiếp xúc trực tiếp bản gốc bằng gỗ cổ.',
    sources: [
      {
        agencyName: 'Chuyên trang Mộc bản triều Nguyễn – Trung tâm Lưu trữ quốc gia IV',
        documentTitle: 'Di sản tư liệu thế giới – Mộc bản triều Nguyễn',
        url: 'https://mocban.vn/moc-ban-trieu-nguyen/di-san-tu-lieu-the-gioi/',
        domain: 'mocban.vn',
      },
      {
        agencyName: 'Cục Di sản văn hóa (Tạp chí Di sản văn hóa số 46)',
        documentTitle: 'Chương trình Ký ức thế giới và các di sản tư liệu được UNESCO công nhận ở Việt Nam',
        url: 'https://dsvh.gov.vn/Upload/files/Tap%20chi%20DSVH/So%2046/4615_Chuong%20trinh%20ky%20uc%20the%20gioi%20va%20cac%20di%20san%20tu%20lieu%20duoc%20UNESCO%20cong%20nhan%20o%20Viet%20Nam.pdf',
        domain: 'dsvh.gov.vn',
      },
    ],
    imageRightsNote:
      'Chưa xác minh quyền sử dụng mở cho đăng tải lại hoặc thương mại; mọi nhu cầu dùng ảnh chụp ván mộc bản, ảnh bản dập hoặc bản sao chế tác theo Điều 63 cần liên hệ Trung tâm Lưu trữ quốc gia IV và tuân thủ Điều 60, Điều 63, Điều 88 Luật DSVH 2024.',
    unescoStatus: 'Di sản tư liệu thế giới UNESCO (2009)',
    recommendedMaterialType: 'stele_ancient_doc',
  },
  {
    id: 'tl002-chau-ban-trieu-nguyen',
    code: 'TL002',
    name: 'Châu bản triều Nguyễn',
    type: 'Châu bản',
    era: '1802–1945 (từ triều Gia Long đến Bảo Đại)',
    locality: 'Hà Nội',
    description:
      'Khối tài liệu hành chính gốc duy nhất còn lưu giữ của một vương triều phong kiến Việt Nam, gồm chiếu, chỉ, dụ, tấu, sớ có bút tích ngự phê bằng mực son đỏ của các hoàng đế nhà Nguyễn trên giấy dó. Phản ánh toàn diện hoạt động quản lý nhà nước, ngoại giao và chủ quyền lãnh thổ Việt Nam.',
    originalRepository:
      'Trung tâm Lưu trữ quốc gia I (số 5 Vũ Phạm Hàm, quận Cầu Giấy, Hà Nội) — tách biệt với kinh đô Huế nơi văn bản được ban hành trong lịch sử.',
    heritageSiteOrDisplay:
      'Phòng đọc và Không gian trưng bày Di sản tư liệu tại Trung tâm Lưu trữ quốc gia I (Hà Nội); từng phối hợp trưng bày chuyên đề tại Huế.',
    custodian: 'Trung tâm Lưu trữ quốc gia I (thuộc Cục Văn thư và Lưu trữ nhà nước)',
    digitizationStatus: 'Đã số hóa',
    digitizationNote:
      'Đã được Trung tâm Lưu trữ quốc gia I số hóa quét ảnh độ phân giải cao và xây dựng cơ sở dữ liệu phục vụ tra cứu tại phòng đọc nhằm bảo vệ bản gốc mỏng manh.',
    sources: [
      {
        agencyName: 'Cục Di sản văn hóa',
        documentTitle: 'Hồ sơ Di sản tư liệu: Châu bản triều Nguyễn',
        url: 'https://dsvh.gov.vn/chau-ban-trieu-nguyen-999',
        domain: 'dsvh.gov.vn',
      },
      {
        agencyName: 'Cục Văn thư và Lưu trữ nhà nước',
        documentTitle: 'Trung tâm Lưu trữ quốc gia I – Các khối tài liệu lưu trữ Hán Nôm',
        url: 'https://archives.org.vn/gioi-thieu-chung/cac-khoi-tai-lieu-luu-tru.htm',
        domain: 'archives.org.vn',
      },
      {
        agencyName: 'Báo Điện tử Chính phủ',
        documentTitle: 'Châu bản triều Nguyễn là Di sản tư liệu Chương trình Ký ức thế giới',
        url: 'https://baochinhphu.vn/chau-ban-trieu-nguyen-la-di-san-tu-lieu-chuong-trinh-ky-uc-the-gioi-102163862.htm',
        domain: 'baochinhphu.vn',
      },
    ],
    imageRightsNote:
      'Chưa xác minh quyền sử dụng tự do trên Internet; việc sao chụp, trích xuất tệp ảnh số hóa hoặc công bố hình ảnh Châu bản phải thực hiện theo quy chế khai thác tài liệu của Trung tâm Lưu trữ quốc gia I.',
    unescoStatus: 'Di sản tư liệu thế giới UNESCO (2017; khu vực Châu Á – TBD năm 2014)',
    recommendedMaterialType: 'stele_ancient_doc',
  },
  {
    id: 'tl003-bia-tien-si-van-mieu',
    code: 'TL003',
    name: 'Bia Tiến sĩ Văn Miếu – Quốc Tử Giám',
    type: 'Bia đá',
    era: '1484–1780 (ghi danh các khoa thi 1442–1779, thời Lê – Mạc)',
    locality: 'Hà Nội',
    description:
      'Hệ thống 82 tấm bia đá dựng trên lưng rùa đá ghi danh 1.304 vị đỗ đại khoa các khoa thi Đình triều Lê sơ, Mạc và Lê Trung Hưng. Là nguồn sử liệu gốc đặc biệt về giáo dục, khoa cử, nhân tài và nghệ thuật điêu khắc văn bia Việt Nam; đồng thời là Bảo vật quốc gia và Di sản tư liệu thế giới.',
    originalRepository:
      'Khu Di tích quốc gia đặc biệt Văn Miếu – Quốc Tử Giám (58 Quốc Tử Giám, quận Đống Đa, Hà Nội) — 82 tấm bia đá nguyên bản đặt tại Vườn Bia.',
    heritageSiteOrDisplay:
      'Di tích quốc gia đặc biệt Văn Miếu – Quốc Tử Giám, Hà Nội (cả 82 tấm bia đều bảo quản và trưng bày tại chỗ).',
    custodian: 'Trung tâm Hoạt động Văn hóa Khoa học Văn Miếu – Quốc Tử Giám',
    digitizationStatus: 'Đã số hóa',
    digitizationNote:
      'Đã hoàn thành số hóa 3D toàn bộ 82 bia Tiến sĩ cùng dữ liệu ảnh 2D, văn bia phục vụ lưu trữ khoa học và trải nghiệm đa phương tiện tại di tích.',
    sources: [
      {
        agencyName: 'Cục Di sản văn hóa',
        documentTitle: 'Bia Đề danh tiến sĩ tại Văn Miếu – Quốc Tử Giám (Hà Nội)',
        url: 'https://dsvh.gov.vn/bia-de-danh-tien-si-tai-van-mieu-quoc-tu-giam-(ha-noi)',
        domain: 'dsvh.gov.vn',
      },
      {
        agencyName: 'Thư viện Quốc gia Việt Nam',
        documentTitle: 'Văn bia tiến sĩ – biểu tượng và niềm tự hào của Hà Nội',
        url: 'https://nlv.gov.vn/nghiep-vu-thu-vien/van-bia-tien-si-bieu-tuong-va-niem-tu-hao-cua-ha-noi.html',
        domain: 'nlv.gov.vn',
      },
      {
        agencyName: 'Tạp chí Khoa học và Công nghệ Việt Nam (Bộ KH&CN)',
        documentTitle: 'Số hóa di sản: Dữ liệu phải giữ được dấu tích lịch sử (số hóa 2D/3D 82 bia Tiến sĩ)',
        url: 'https://vjst.vn/so-hoa-di-san-du-lieu-phai-giu-duoc-dau-tich-lich-su-104161.html',
        domain: 'vjst.vn',
      },
      {
        agencyName: 'Trung tâm Bảo tồn Di sản Thăng Long – Hà Nội',
        documentTitle: 'Bia tiến sĩ Văn Miếu',
        url: 'https://hoangthanhthanglong.vn/bia-tien-si-van-mieu/',
        domain: 'hoangthanhthanglong.vn',
      },
    ],
    imageRightsNote:
      'Chưa xác minh quyền sử dụng mở cho khai thác thương mại; khách tham quan tự chụp ảnh tại vườn bia cần tuân thủ nội quy của Trung tâm HĐVHKH Văn Miếu – Quốc Tử Giám, còn ảnh 2D/3D số hóa trên cổng thông tin chịu quyền quản lý dữ liệu số của đơn vị tạo lập.',
    unescoStatus: 'Di sản tư liệu thế giới UNESCO (2011; MOW khu vực 2010)',
    recommendedMaterialType: 'stele_ancient_doc',
  },
  {
    id: 'tl004-moc-ban-chua-vinh-nghiem',
    code: 'TL004',
    name: 'Mộc bản chùa Vĩnh Nghiêm',
    type: 'Mộc bản',
    era: 'Thế kỷ XVII – đầu thế kỷ XX',
    locality: 'Bắc Giang',
    description:
      'Kho mộc bản gồm 3.050 ván khắc gỗ thị chữ Hán và chữ Nôm (với 34 đầu sách lớn) về kinh, luật, luận Phật giáo, trước tác của các Tổ sư Thiền phái Trúc Lâm cùng sách y học, văn học, phong thủy. Phản ánh lịch sử tư tưởng Phật giáo Việt Nam và nghệ thuật khắc ván cổ.',
    originalRepository:
      'Nhà lưu giữ và trưng bày Mộc bản trong khuôn viên Chùa Vĩnh Nghiêm (chùa Đức La, xã Trí Yên, huyện Yên Dũng, tỉnh Bắc Giang).',
    heritageSiteOrDisplay:
      'Di tích Chùa Vĩnh Nghiêm, huyện Yên Dũng, tỉnh Bắc Giang.',
    custodian:
      'Nhà chùa Vĩnh Nghiêm phối hợp với Ban Quản lý di tích và Sở Văn hóa, Thể thao và Du lịch tỉnh Bắc Giang',
    digitizationStatus: 'Chưa xác minh',
    digitizationNote:
      'Đã được kiểm kê, bảo quản khoa học tại Nhà lưu giữ chuyên dụng và nghiên cứu biên dịch; chưa xác minh được kho ảnh số hóa công bố trực tuyến công khai toàn bộ.',
    sources: [
      {
        agencyName: 'Bảo tàng Lịch sử Quốc gia',
        documentTitle: 'Mộc bản chùa Vĩnh Nghiêm được công nhận “Di sản tư liệu”',
        url: 'https://baotanglichsu.vn/vi/Articles/3092/11445/moc-ban-chua-vinh-nghiem-djuoc-cong-nhan-di-san-tu-lieu.html',
        domain: 'baotanglichsu.vn',
      },
      {
        agencyName: 'Báo Điện tử Chính phủ',
        documentTitle: 'Mộc bản chùa Vĩnh Nghiêm: Những giá trị trường tồn',
        url: 'https://baochinhphu.vn/moc-ban-chua-vinh-nghiem-nhung-gia-tri-truong-ton-102132066.htm',
        domain: 'baochinhphu.vn',
      },
      {
        agencyName: 'Ủy ban Nhà nước về người Việt Nam ở nước ngoài (Bộ Ngoại giao)',
        documentTitle: 'Mộc bản Chùa Vĩnh Nghiêm',
        url: 'https://scov.gov.vn/ban-sac-van-hoa/moc-ban-chua-vinh-nghiem.html',
        domain: 'scov.gov.vn',
      },
    ],
    imageRightsNote:
      'Chưa xác minh quyền sử dụng; mọi hoạt động chụp ảnh ván khắc gốc, xin bản dập hoặc sử dụng ảnh vào xuất bản/thương mại cần liên hệ trực tiếp Nhà chùa Vĩnh Nghiêm và cơ quan quản lý di sản tỉnh Bắc Giang.',
    unescoStatus: 'Di sản tư liệu khu vực Châu Á – TBD UNESCO (2012)',
    recommendedMaterialType: 'stele_ancient_doc',
  },
  {
    id: 'tl005-van-tho-cung-dinh-hue',
    code: 'TL005',
    name: 'Văn thơ trên kiến trúc cung đình Huế',
    type: 'Văn bản Hán Nôm',
    era: 'Thế kỷ XIX – đầu thế kỷ XX (1802–1945)',
    locality: 'Thừa Thiên Huế',
    description:
      'Hệ thống hàng nghìn ô thơ văn chữ Hán của các hoàng đế và văn thần triều Nguyễn được chạm khắc, sơn thếp trên gỗ, cẩn xà cừ, tráng men pháp lam hoặc đắp ngõa sành sứ theo phong cách trang trí “nhất thi nhất họa” trên các cung điện, đền miếu và lăng tẩm Huế.',
    originalRepository:
      'Gắn liền cố định (in situ) trên các hạng mục kiến trúc cung đình thuộc Quần thể Di tích Cố đô Huế (TP. Huế, tỉnh Thừa Thiên Huế).',
    heritageSiteOrDisplay:
      'Đại Nội Huế, các cung điện, điện thờ và lăng tẩm triều Nguyễn trong Quần thể Di tích Cố đô Huế.',
    custodian: 'Trung tâm Bảo tồn Di tích Cố đô Huế',
    digitizationStatus: 'Chưa xác minh',
    digitizationNote:
      'Đã được kiểm kê, chụp ảnh tư liệu phục vụ lập hồ sơ khoa học và xuất bản chuyên khảo; chưa xác minh được toàn bộ dữ liệu số hóa công khai trực tuyến.',
    sources: [
      {
        agencyName: 'Cục Di sản văn hóa',
        documentTitle: 'Hệ thống thơ văn chữ Hán trên kiến trúc cung đình Huế – Di sản tư liệu đặc sắc',
        url: 'https://dsvh.gov.vn/Upload/files/5105_He%20thong%20tho%20van%20chu%20Han.pdf',
        domain: 'dsvh.gov.vn',
      },
      {
        agencyName: 'Cục Du lịch Quốc gia Việt Nam',
        documentTitle: 'Thơ văn trên kiến trúc cung đình Huế – Di sản tư liệu khu vực Châu Á – Thái Bình Dương',
        url: 'https://vietnamtourism.gov.vn/post/17579',
        domain: 'vietnamtourism.gov.vn',
      },
    ],
    imageRightsNote:
      'Chưa xác minh quyền sử dụng; khách tham quan tự chụp ảnh tại di tích phải chấp hành quy định của Trung tâm Bảo tồn Di tích Cố đô Huế, còn sử dụng ảnh tư liệu cổng thông tin hoặc dùng thương mại phải xin phép đơn vị quản lý và tác giả ảnh.',
    unescoStatus: 'Di sản tư liệu khu vực Châu Á – TBD UNESCO (2016)',
    recommendedMaterialType: 'heritage_site',
  },
  {
    id: 'tl006-moc-ban-truong-phuc-giang',
    code: 'TL006',
    name: 'Mộc bản trường Phúc Giang',
    type: 'Mộc bản',
    era: 'Thế kỷ XVIII – đầu thế kỷ XX',
    locality: 'Hà Tĩnh',
    description:
      'Khối mộc bản gồm 379 tấm ván khắc chữ Hán ngược dùng để in sách giáo khoa kinh điển phục vụ giảng dạy và học tập tại Thư viện Phúc Giang (Trường học Phúc Giang) do Thám hoa Nguyễn Huy Oánh sáng lập. Đây là khối mộc bản cổ nhất về giáo dục của một dòng họ còn bảo tồn ở Việt Nam.',
    originalRepository:
      'Nhà thờ dòng họ Nguyễn Huy tại Làng Trường Lưu (xã Kim Song Trường, huyện Can Lộc, tỉnh Hà Tĩnh) — lưu ý đây là sở hữu cộng đồng/dòng họ chứ không nằm tại bảo tàng trung ương.',
    heritageSiteOrDisplay:
      'Không gian văn hóa dòng họ Nguyễn Huy, Làng Trường Lưu, huyện Can Lộc, tỉnh Hà Tĩnh.',
    custodian:
      'Đại diện dòng họ Nguyễn Huy tại Làng Trường Lưu (với sự hướng dẫn chuyên môn của Sở VHTTDL Hà Tĩnh)',
    digitizationStatus: 'Chưa xác minh',
    digitizationNote:
      'Đã được nghiên cứu, kiểm kê và lập hồ sơ di sản tư liệu; chưa xác minh được tình trạng công bố kho ảnh số hóa trực tuyến công khai.',
    sources: [
      {
        agencyName: 'Cục Di sản văn hóa',
        documentTitle: 'Mộc bản trường học Phúc Giang',
        url: 'https://dsvh.gov.vn/moc-ban-truong-hoc-phuc-giang-1286',
        domain: 'dsvh.gov.vn',
      },
      {
        agencyName: 'Cổng Thông tin điện tử tỉnh Hà Tĩnh',
        documentTitle: 'Trường Lưu – Để mạch nguồn di sản tiếp nối giữa dòng chảy thời gian',
        url: 'https://hatinh.gov.vn/vi/emagazine/truong-luu---de-mach-nguon-di-san-tiep-noi-giua-dong-chay-thoi-gian',
        domain: 'hatinh.gov.vn',
      },
    ],
    imageRightsNote:
      'Chưa xác minh quyền sử dụng; theo Điều 60 Luật DSVH 2024, di sản tư liệu thuộc sở hữu chung/riêng của dòng họ do chủ sở hữu quản lý và bảo vệ nên cần có sự đồng ý của đại diện dòng họ Nguyễn Huy cùng tác giả ảnh.',
    unescoStatus: 'Di sản tư liệu khu vực Châu Á – TBD UNESCO (2016)',
    recommendedMaterialType: 'stele_ancient_doc',
  },
  {
    id: 'tl007-hoang-hoa-su-trinh-do',
    code: 'TL007',
    name: 'Hoàng hoa sứ trình đồ',
    type: 'Văn bản Hán Nôm',
    era: 'Thế kỷ XVIII (gắn với chuyến đi sứ năm 1766–1767; bản cổ thời Lê – Nguyễn)',
    locality: 'Hà Tĩnh',
    description:
      'Tập bản đồ và thư tịch chép tay chữ Hán kèm hình vẽ minh họa do Thám hoa Nguyễn Huy Oánh biên soạn, ghi chép chi tiết hành trình đi sứ sang nhà Thanh (Yên Kinh), lộ trình đường thủy bộ, các trạm dịch và hoạt động ngoại giao Đại Việt thế kỷ XVIII.',
    originalRepository:
      'Lưu giữ tại dòng họ Nguyễn Huy ở Làng Trường Lưu (xã Kim Song Trường, huyện Can Lộc, tỉnh Hà Tĩnh).',
    heritageSiteOrDisplay:
      'Làng văn hóa Trường Lưu, huyện Can Lộc, tỉnh Hà Tĩnh (từng được giới thiệu trong các triển lãm chuyên đề tại Hà Tĩnh).',
    custodian:
      'Đại diện dòng họ Nguyễn Huy tại Làng Trường Lưu (phối hợp chuyên môn với Sở VHTTDL Hà Tĩnh)',
    digitizationStatus: 'Chưa xác minh',
    digitizationNote:
      'Đã có ấn phẩm nghiên cứu và trưng bày giới thiệu; chưa xác minh được bộ ảnh số hóa mở công khai trên cổng lưu trữ trực tuyến.',
    sources: [
      {
        agencyName: 'Cổng Thông tin điện tử tỉnh Hà Tĩnh',
        documentTitle: 'Làng quê lưu giữ những ký ức của nhân loại (Trường Lưu)',
        url: 'https://hatinh.gov.vn/vi/page/du-lich/bai-viet/lang-que-luu-giu-nhung-ky-uc-cua-nhan-loai',
        domain: 'hatinh.gov.vn',
      },
      {
        agencyName: 'Ủy ban Nhà nước về người Việt Nam ở nước ngoài (Bộ Ngoại giao)',
        documentTitle: 'Hoàng Hoa sứ trình đồ',
        url: 'https://scov.gov.vn/ban-sac-van-hoa/hoang-hoa-su-trinh-do.html',
        domain: 'scov.gov.vn',
      },
    ],
    imageRightsNote:
      'Chưa xác minh quyền sử dụng; cần liên hệ đại diện dòng họ Nguyễn Huy (đơn vị sở hữu bản gốc) và kiểm tra quyền tác giả của đơn vị chụp/xuất bản ảnh minh họa khi đăng tải hoặc xuất bản.',
    unescoStatus: 'Di sản tư liệu khu vực Châu Á – TBD UNESCO (2018)',
    recommendedMaterialType: 'stele_ancient_doc',
  },
  {
    id: 'tl008-van-ban-han-nom-truong-luu',
    code: 'TL008',
    name: 'Văn bản Hán Nôm làng Trường Lưu',
    type: 'Văn bản Hán Nôm',
    era: '1689–1943',
    locality: 'Hà Tĩnh',
    description:
      'Bộ sưu tập gồm 26 sắc phong gốc, 19 văn bằng và 3 bức trướng bằng lụa viết chữ Hán – Nôm phản ánh truyền thống khoa bảng, lịch sử hành chính, văn hóa và đời sống cộng đồng làng Trường Lưu qua gần ba thế kỷ, gắn với nhiều dòng họ trong làng.',
    originalRepository:
      'Bảo quản tại nhà thờ các dòng họ (Nguyễn Huy, Trần Văn, Hoàng) ở Làng Trường Lưu (xã Kim Song Trường, huyện Can Lộc, tỉnh Hà Tĩnh).',
    heritageSiteOrDisplay:
      'Làng Trường Lưu, huyện Can Lộc, tỉnh Hà Tĩnh (một số tư liệu phối hợp giới thiệu qua Bảo tàng Hà Tĩnh).',
    custodian:
      'Đại diện các dòng họ lưu giữ tại Làng Trường Lưu cùng sự hỗ trợ nghiệp vụ của Bảo tàng và Sở VHTTDL tỉnh Hà Tĩnh',
    digitizationStatus: 'Chưa xác minh',
    digitizationNote:
      'Đã được kiểm kê, bảo quản và biên mục phục vụ hồ sơ UNESCO; chưa xác minh được tình trạng công bố dữ liệu số mở cho công chúng.',
    sources: [
      {
        agencyName: 'Bảo tàng Hà Tĩnh',
        documentTitle: 'Văn bản Hán Nôm làng Trường Lưu và hành trình trở thành Di sản tư liệu ký ức thế giới',
        url: 'https://baotang.hatinh.gov.vn/van-ban-han-nom-lang-truong-luu-va-hanh-trinh-tro-thanh-di-san-tu-lieu-ky-uc-the-gioi-1687337079.html',
        domain: 'hatinh.gov.vn',
      },
      {
        agencyName: 'Bộ Văn hóa, Thể thao và Du lịch',
        documentTitle: 'Nhận diện giá trị di sản – nguồn lực nuôi dưỡng, làm giàu bản sắc văn hóa Hà Tĩnh',
        url: 'https://bvhttdl.gov.vn/nhan-dien-gia-tri-di-san-nguon-luc-nuoi-duong-lam-giau-ban-sac-van-hoa-ha-tinh-20230505083745763.htm',
        domain: 'bvhttdl.gov.vn',
      },
    ],
    imageRightsNote:
      'Chưa xác minh quyền sử dụng; cần xin phép đại diện dòng họ đang giữ sắc phong, văn bằng gốc và kiểm tra quyền tác giả bức ảnh chụp nếu lấy từ cổng thông tin tỉnh hoặc bảo tàng địa phương.',
    unescoStatus: 'Di sản tư liệu khu vực Châu Á – TBD UNESCO (2022)',
    recommendedMaterialType: 'stele_ancient_doc',
  },
  {
    id: 'tl009-ma-nhai-ngu-hanh-son',
    code: 'TL009',
    name: 'Ma nhai tại Danh thắng Ngũ Hành Sơn',
    type: 'Bia đá',
    era: 'Từ nửa đầu thế kỷ XVII đến thập niên 60 của thế kỷ XX',
    locality: 'Đà Nẵng',
    description:
      'Hệ thống 78 văn bản Hán Nôm (ngự bút của vua, bia ký, thơ văn đề từ, tán, câu đối) được khắc trực tiếp trên vách đá và trong các hang động tự nhiên (như động Hoa Nghiêm, Huyền Không, Tàng Chơn, Vân Thông, Linh Nham), phản ánh Phật giáo Đàng Trong và giao lưu hàng hải Đông Á.',
    originalRepository:
      'Khắc cố định trực tiếp (in situ) trên vách núi và hang động tại Danh thắng Ngũ Hành Sơn (phường Hòa Hải, quận Ngũ Hành Sơn, TP. Đà Nẵng).',
    heritageSiteOrDisplay:
      'Di tích quốc gia đặc biệt Danh thắng Ngũ Hành Sơn, TP. Đà Nẵng.',
    custodian: 'Ban Quản lý Di tích Danh thắng Ngũ Hành Sơn (TP. Đà Nẵng)',
    digitizationStatus: 'Chưa xác minh',
    digitizationNote:
      'Đã lập hồ sơ khoa học, rập thác bản và dịch chú phục vụ công tác bảo tồn; chưa xác minh được kho ảnh/3D số hóa công khai toàn bộ 78 văn bia ma nhai.',
    sources: [
      {
        agencyName: 'Cục Di sản văn hóa',
        documentTitle: 'Bia ma nhai tại danh thắng Ngũ Hành Sơn, Đà Nẵng',
        url: 'https://dsvh.gov.vn/bia-ma-nhai-tai-danh-thang-ngu-hanh-son-da-nang-22113',
        domain: 'dsvh.gov.vn',
      },
      {
        agencyName: 'Cổng Thông tin điện tử Thành phố Đà Nẵng',
        documentTitle: 'Ma nhai Ngũ Hành Sơn: Nơi lưu giữ nguồn sử liệu quý giá',
        url: 'https://danang.gov.vn/w/ma-nhai-ngu-hanh-son-noi-luu-giu-nguon-su-lieu-quy-gia-i',
        domain: 'danang.gov.vn',
      },
      {
        agencyName: 'Bộ Văn hóa, Thể thao và Du lịch',
        documentTitle: 'Đà Nẵng đón nhận Bằng công nhận ma nhai là Di sản tư liệu',
        url: 'https://bvhttdl.gov.vn/da-nang-don-nhan-bang-cong-nhan-ma-nhai-la-di-san-tu-lieu-20230301144526683.htm',
        domain: 'bvhttdl.gov.vn',
      },
    ],
    imageRightsNote:
      'Chưa xác minh quyền sử dụng; tự chụp ảnh tham quan cần tuân thủ nội quy khu danh thắng Ngũ Hành Sơn (không tác động, rập quét trái phép lên bề mặt đá), còn ảnh đăng lại từ báo chí/cổng thông tin hoặc bản dập phải xin phép đơn vị quản lý và tác giả ảnh.',
    unescoStatus: 'Di sản tư liệu khu vực Châu Á – TBD UNESCO (2022)',
    recommendedMaterialType: 'stele_ancient_doc',
  },
  {
    id: 'tl010-cuu-dinh-hoang-cung-hue',
    code: 'TL010',
    name: 'Những bản đúc nổi trên chín đỉnh đồng ở Hoàng cung Huế',
    type: 'Hiện vật',
    era: '1835–1837 (niên hiệu Minh Mạng)',
    locality: 'Thừa Thiên Huế',
    description:
      'Hệ thống 162 họa tiết đúc nổi cùng chữ Hán trên chín đỉnh đồng (Cửu Đỉnh: Cao, Nhân, Chương, Anh, Nghị, Thuần, Tuyên, Dụ, Huyền) đặt tại sân Thế Miếu. Ví như bộ bách khoa toàn thư bằng đồng về núi sông, sản vật, thiên văn và chủ quyền nước Việt thế kỷ XIX; đồng thời là Bảo vật quốc gia.',
    originalRepository:
      'Đặt cố định trước sân Thế Tổ Miếu (Thế Miếu) trong Hoàng thành Huế (Đại Nội Huế, TP. Huế, tỉnh Thừa Thiên Huế).',
    heritageSiteOrDisplay:
      'Sân Thế Tổ Miếu, Hoàng thành Huế (Quần thể Di tích Cố đô Huế).',
    custodian: 'Trung tâm Bảo tồn Di tích Cố đô Huế',
    digitizationStatus: 'Chưa xác minh',
    digitizationNote:
      'Đã lập hồ sơ chi tiết từng mảng đúc nổi phục vụ xét công nhận Bảo vật quốc gia và UNESCO MOWCAP 2024; chưa xác minh được bộ ảnh số hóa mở công khai.',
    sources: [
      {
        agencyName: 'Cục Du lịch Quốc gia Việt Nam',
        documentTitle: 'Những bản đúc nổi trên chín đỉnh đồng ở Hoàng cung Huế được UNESCO ghi danh',
        url: 'https://vietnamtourism.gov.vn/post/56218',
        domain: 'vietnamtourism.gov.vn',
      },
      {
        agencyName: 'Đài Tiếng nói Việt Nam',
        documentTitle: 'Chiêm ngưỡng Cửu Đỉnh Hoàng cung Huế – Di sản tư liệu thế giới',
        url: 'https://vov.gov.vn/chiem-nguong-cuu-dinh-hoang-cung-hue-di-san-tu-lieu-the-gioi-dtnew-803636',
        domain: 'vov.gov.vn',
      },
    ],
    imageRightsNote:
      'Chưa xác minh quyền sử dụng; Cửu Đỉnh là hiện vật gốc/Bảo vật quốc gia đặt tại không gian di tích, mọi sử dụng ảnh từ cổng thông tin hoặc dùng hình ảnh vào mục đích xuất bản/thương mại cần liên hệ Trung tâm Bảo tồn Di tích Cố đô Huế và tác giả bức ảnh.',
    unescoStatus: 'Di sản tư liệu khu vực Châu Á – TBD UNESCO (2024)',
    recommendedMaterialType: 'museum_artifact',
  },
  {
    id: 'tl011-dia-ba-trieu-nguyen',
    code: 'TL011',
    name: 'Địa bạ triều Nguyễn',
    type: 'Tài liệu lưu trữ',
    era: '1802–1945 (tập trung nhiều vào giai đoạn 1805–1837)',
    locality: 'Hà Nội',
    description:
      'Khối tài liệu Hán – Nôm chiếm số lượng lớn nhất tại Trung tâm Lưu trữ quốc gia I với 17.058 đơn vị bảo quản (293.639 tờ), ghi chép cụ thể ruộng đất, đinh điền, ranh giới, loại đất và chủ sở hữu của các xã thôn trên cả nước dưới triều Nguyễn.',
    originalRepository:
      'Trung tâm Lưu trữ quốc gia I (số 5 Vũ Phạm Hàm, quận Cầu Giấy, Hà Nội).',
    heritageSiteOrDisplay:
      'Phòng đọc tài liệu lưu trữ tại Trung tâm Lưu trữ quốc gia I, Hà Nội (phục vụ tra cứu nghiên cứu theo quy định).',
    custodian: 'Trung tâm Lưu trữ quốc gia I (thuộc Cục Văn thư và Lưu trữ nhà nước)',
    digitizationStatus: 'Chưa xác minh',
    digitizationNote:
      'Phục vụ khai thác thường xuyên tại Phòng đọc TTLTQG I và đang từng bước triển khai chuyển đổi số; chưa xác minh được tỷ lệ hoàn thành số hóa công khai trực tuyến toàn khối 17.058 đơn vị.',
    sources: [
      {
        agencyName: 'Cục Văn thư và Lưu trữ nhà nước (TTLTQG I)',
        documentTitle: 'Giới thiệu Địa bạ triều Nguyễn bảo quản tại Trung tâm Lưu trữ quốc gia I',
        url: 'https://www.archives.org.vn/gioi-thieu-tai-lieu-nghiep-vu/gioi-thieu-dia-ba-trieu-nguyen-bao-quan-tai-trung-tam-luu-tru-quoc-gia-i.htm',
        domain: 'archives.org.vn',
      },
      {
        agencyName: 'Cục Văn thư và Lưu trữ nhà nước',
        documentTitle: 'Các khối tài liệu lưu trữ Hán Nôm tại Trung tâm Lưu trữ quốc gia I',
        url: 'https://archives.org.vn/gioi-thieu-chung/cac-khoi-tai-lieu-luu-tru.htm',
        domain: 'archives.org.vn',
      },
    ],
    imageRightsNote:
      'Chưa xác minh quyền sử dụng; việc sao chụp, nhận bản chụp điện tử hoặc công bố ảnh trang địa bạ gốc trong sách, báo, website phải thực hiện thủ tục đề nghị tại Trung tâm Lưu trữ quốc gia I theo Luật Lưu trữ và Luật DSVH.',
    recommendedMaterialType: 'stele_ancient_doc',
  },
  {
    id: 'tl012-so-bo-han-nom',
    code: 'TL012',
    name: 'Sổ bộ Hán Nôm',
    type: 'Tài liệu lưu trữ',
    era: '1819–1918',
    locality: 'TP. Hồ Chí Minh',
    description:
      'Sưu tập Sổ bộ Hán – Nôm (khoảng 54 mét giá tài liệu) viết chủ yếu bằng chữ Hán và chữ Nôm trên giấy dó (cùng một số văn bản chữ Khmer), ghi chép đinh, điền, thuyền ngưu, thuế khóa, hộ tịch và thu chi các thôn xã vùng Nam Bộ.',
    originalRepository:
      'Trung tâm Lưu trữ quốc gia II (số 2 Ter Lê Duẩn, quận 1, TP. Hồ Chí Minh).',
    heritageSiteOrDisplay:
      'Phòng đọc và Kho bảo quản Trung tâm Lưu trữ quốc gia II (TP. Hồ Chí Minh).',
    custodian: 'Trung tâm Lưu trữ quốc gia II (thuộc Cục Văn thư và Lưu trữ nhà nước)',
    digitizationStatus: 'Đã số hóa',
    digitizationNote:
      'Theo cổng thông tin Cục Văn thư và Lưu trữ nhà nước, sưu tập Sổ bộ Hán – Nôm tại TTLTQG II đã được khử trùng, chỉnh lý, số hóa cơ sở dữ liệu và xây dựng công cụ tra cứu phục vụ độc giả nghiên cứu.',
    sources: [
      {
        agencyName: 'Hệ thống thông tin Cục Văn thư và Lưu trữ nhà nước',
        documentTitle: 'Danh mục phông và sưu tập tài liệu lưu trữ (Sưu tập Sổ bộ Hán – Nôm 1819–1918)',
        url: 'https://dms.luutru.gov.vn/files/ecm/source_files/2017/07/03/phongvasuutapluutru-104416-030717-19.pdf',
        domain: 'luutru.gov.vn',
      },
      {
        agencyName: 'Cục Văn thư và Lưu trữ nhà nước',
        documentTitle: 'Hành trình thiên di của khối tài liệu lưu trữ Hán Nôm và các Châu bản triều Nguyễn',
        url: 'https://www.archives.org.vn/gioi-thieu-tai-lieu-nghiep-vu/hanh-trinh-thien-di-cua-khoi-tai-lieu-luu-tru-han-nom-va-cac-chau-ban-trieu-nguyen-ve-cuoc-khang-chien-chong-phap-tai-nam-ky.htm',
        domain: 'archives.org.vn',
      },
    ],
    imageRightsNote:
      'Chưa xác minh quyền sử dụng mở trực tuyến; tệp ảnh số hóa phục vụ tra cứu tại trung tâm lưu trữ không mặc nhiên cho phép đăng lại công khai trên Internet khi chưa được Trung tâm Lưu trữ quốc gia II chấp thuận.',
    recommendedMaterialType: 'stele_ancient_doc',
  },
  {
    id: 'tl013-phong-nha-kinh-luoc-bac-ky',
    code: 'TL013',
    name: 'Phông Nha Kinh lược Bắc Kỳ',
    type: 'Tài liệu lưu trữ',
    era: 'Cuối thế kỷ XIX (1886–1897)',
    locality: 'Hà Nội',
    description:
      'Phông tài liệu lưu trữ Hán Nôm của Nha Kinh lược Bắc Kỳ — cơ quan đại diện triều đình nhà Nguyễn tại Bắc Kỳ cuối thế kỷ XIX, phản ánh tổ chức hành chính, chính trị, trị an, báo chí (như Đại Nam đồng văn nhật báo) và quan hệ triều đình – bảo hộ.',
    originalRepository:
      'Trung tâm Lưu trữ quốc gia I (số 5 Vũ Phạm Hàm, quận Cầu Giấy, Hà Nội).',
    heritageSiteOrDisplay:
      'Phòng đọc Trung tâm Lưu trữ quốc gia I, Hà Nội.',
    custodian: 'Trung tâm Lưu trữ quốc gia I (thuộc Cục Văn thư và Lưu trữ nhà nước)',
    digitizationStatus: 'Chưa xác minh',
    digitizationNote:
      'Được chỉnh lý và phục vụ khai thác nghiên cứu học thuật tại TTLTQG I; chưa xác minh được tình trạng số hóa công khai trực tuyến toàn phông.',
    sources: [
      {
        agencyName: 'Cục Văn thư và Lưu trữ nhà nước',
        documentTitle: 'Các khối tài liệu lưu trữ – Phông Nha Kinh lược Bắc Kỳ tại TTLTQG I',
        url: 'https://archives.org.vn/gioi-thieu-chung/cac-khoi-tai-lieu-luu-tru.htm',
        domain: 'archives.org.vn',
      },
      {
        agencyName: 'Trường ĐH Khoa học Xã hội và Nhân văn (ĐHQG Hà Nội)',
        documentTitle: 'Khảo cứu tài liệu Hán Nôm Nha Kinh lược Bắc Kì về Hà Nội',
        url: 'https://ussh.vnu.edu.vn/vi/dao-tao/luan-van/ttlv-khao-cuu-tai-lieu-han-nom-nha-kinh-luoc-bac-ki-ve-ha-noi-8637.html',
        domain: 'ussh.vnu.edu.vn',
      },
    ],
    imageRightsNote:
      'Chưa xác minh quyền sử dụng; khai thác bản chụp hoặc hình ảnh hồ sơ trong phông phải thực hiện theo quy định tiếp cận tài liệu lưu trữ của Trung tâm Lưu trữ quốc gia I.',
    recommendedMaterialType: 'stele_ancient_doc',
  },
  {
    id: 'tl014-phong-nha-huyen-tho-xuong',
    code: 'TL014',
    name: 'Phông Nha huyện Thọ Xương',
    type: 'Tài liệu lưu trữ',
    era: 'Triều Nguyễn (thế kỷ XIX — niên đại chi tiết từng hồ sơ tra cứu tại kho lưu trữ)',
    locality: 'Hà Nội',
    description:
      'Khối tài liệu hành chính Hán Nôm cấp huyện thuộc khu vực thành nội Hà Nội xưa (huyện Thọ Xương, phủ Hoài Đức), cung cấp tư liệu gốc về quản lý hộ tịch, đất đai, trị an và sinh hoạt đô thị Thăng Long – Hà Nội thế kỷ XIX.',
    originalRepository:
      'Trung tâm Lưu trữ quốc gia I (số 5 Vũ Phạm Hàm, quận Cầu Giấy, Hà Nội).',
    heritageSiteOrDisplay:
      'Phòng đọc Trung tâm Lưu trữ quốc gia I, Hà Nội.',
    custodian: 'Trung tâm Lưu trữ quốc gia I (thuộc Cục Văn thư và Lưu trữ nhà nước)',
    digitizationStatus: 'Chưa xác minh',
    digitizationNote:
      'Được xác nhận bảo quản trong khối tài liệu Hán Nôm tại TTLTQG I; chưa xác minh được mức độ số hóa hay tình trạng công bố dữ liệu trực tuyến.',
    sources: [
      {
        agencyName: 'Cục Văn thư và Lưu trữ nhà nước',
        documentTitle: 'Các khối tài liệu lưu trữ – Tài liệu Nha huyện Thọ Xương (TTLTQG I)',
        url: 'https://archives.org.vn/gioi-thieu-chung/cac-khoi-tai-lieu-luu-tru.htm',
        domain: 'archives.org.vn',
      },
      {
        agencyName: 'Cục Văn thư và Lưu trữ nhà nước',
        documentTitle: 'Trung tâm Lưu trữ quốc gia I – 55 năm xây dựng và trưởng thành',
        url: 'https://www.archives.org.vn/tin-tong-hop/trung-tam-luu-tru-quoc-gia-i-%E2%80%93-55-nam-xay-dung-va-truong-thanh.htm',
        domain: 'archives.org.vn',
      },
    ],
    imageRightsNote:
      'Chưa xác minh quyền sử dụng; mọi nhu cầu sao chụp hoặc công bố hình ảnh tài liệu Nha huyện Thọ Xương cần liên hệ trực tiếp Phòng Đọc / Nghiệp vụ Trung tâm Lưu trữ quốc gia I.',
    recommendedMaterialType: 'stele_ancient_doc',
  },
  {
    id: 'tl015-suu-tap-hien-vat-dong-son',
    code: 'TL015',
    name: 'Sưu tập hiện vật văn hóa Đông Sơn',
    type: 'Hiện vật',
    era: 'Khoảng 2.500 – 2.000 năm cách ngày nay',
    locality: 'Hà Nội',
    description:
      'Hệ thống sưu tập hiện vật khảo cổ tiêu biểu cho đỉnh cao văn minh Việt cổ (công cụ sản xuất, vũ khí, đồ trang sức, nhạc khí và trống đồng Đông Sơn), thể hiện kỹ thuật luyện kim – đúc đồng tinh xảo và đời sống xã hội thời kỳ dựng nước Văn Lang – Âu Lạc.',
    originalRepository:
      'Nhiều bộ sưu tập gốc tiêu biểu được lưu giữ, bảo quản tại Bảo tàng Lịch sử Quốc gia (số 1 Tràng Tiền & 216 Trần Quang Khải, quận Hoàn Kiếm, Hà Nội); ngoài ra một số hiện vật văn hóa Đông Sơn khác được bảo quản tại Bảo tàng tỉnh Thanh Hóa và một số bảo tàng địa phương.',
    heritageSiteOrDisplay:
      'Hệ thống trưng bày thường xuyên và các chuyên đề (như “Âm vang Đông Sơn”) tại Bảo tàng Lịch sử Quốc gia, Hà Nội.',
    custodian: 'Bảo tàng Lịch sử Quốc gia (đối với bộ sưu tập lưu giữ tại đơn vị này)',
    digitizationStatus: 'Chưa xác minh',
    digitizationNote:
      'Bảo tàng Lịch sử Quốc gia đã công bố nhiều bài viết, ảnh minh họa và ấn phẩm chuyên khảo trên baotanglichsu.vn; chưa xác minh được toàn bộ sưu tập hiện vật đã số hóa công khai đầy đủ hay chưa.',
    sources: [
      {
        agencyName: 'Bảo tàng Lịch sử Quốc gia',
        documentTitle: 'Văn hóa Đông Sơn, khoảng 2.500 – 2.000 năm cách ngày nay',
        url: 'https://baotanglichsu.vn/vi/Articles/4017/van-hoa-djong-son-khoang-2-500-2-000-nam-cach-ngay-nay',
        domain: 'baotanglichsu.vn',
      },
      {
        agencyName: 'Bảo tàng Lịch sử Quốc gia',
        documentTitle: 'Sách “Văn hóa Đông Sơn – sưu tập hiện vật bảo tàng Lịch sử quốc gia”',
        url: 'https://baotanglichsu.vn/VI/Articles/3129/17329/sach-van-hoa-djong-son-suu-tap-hien-vat-bao-tang-lich-su-quoc-gia.html',
        domain: 'baotanglichsu.vn',
      },
    ],
    imageRightsNote:
      'Chưa xác minh quyền sử dụng; ảnh chụp hiện vật Đông Sơn trên website hoặc sách của bảo tàng là ảnh chụp hiện vật thông thường (không phải bản sao di sản tư liệu Điều 63), chịu điều chỉnh của quyền tác giả bức ảnh và quy chế khai thác hình ảnh tại bảo tàng lưu giữ.',
    recommendedMaterialType: 'museum_artifact',
  },
];
