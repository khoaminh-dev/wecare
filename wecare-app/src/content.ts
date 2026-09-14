import { images } from './assets';

export const navigation = [
  { label: 'Giới thiệu', target: 'story' },
  { label: 'Công nghệ', target: 'technology' },
  { label: 'Sản phẩm', target: 'ecosystem' },
  { label: 'Tính năng', target: 'features' },
  { label: 'Lộ trình', target: 'roadmap' },
  { label: 'Liên hệ', target: 'contact' },
] as const;

export const benefits = [
  { icon: 'shield', text: 'Chủ động chăm sóc sức khỏe' },
  { icon: 'brain', text: 'Phân tích AI chính xác' },
  { icon: 'chart', text: 'Theo dõi liên tục dài hạn' },
  { icon: 'leaf', text: 'Thoải mái sử dụng mỗi ngày' },
] as const;

export const products = [
  {
    title: 'Thiết bị đeo ParkGuard AI',
    text: 'Theo dõi chuyển động 24/7 với cảm biến IMU độ chính xác cao, thiết kế thoải mái, thời lượng pin dài.',
    image: images.wearable,
    alt: 'Thiết bị đeo WeCare màu trắng bạc',
  },
  {
    title: 'Ứng dụng WeCare',
    text: 'Hiển thị dữ liệu trực quan, bài kiểm tra vận động và cảnh báo thông minh.',
    image: images.phone,
    alt: 'Điện thoại hiển thị ứng dụng WeCare',
  },
  {
    title: 'Phân tích AI',
    text: 'Ứng dụng trí tuệ nhân tạo để phân tích mẫu vận động và đánh giá nguy cơ Parkinson.',
    image: images.brain,
    alt: 'Minh họa não bộ và mạng tín hiệu AI',
  },
  {
    title: 'Báo cáo & theo dõi dài hạn',
    text: 'Lưu trữ, theo dõi xu hướng và chia sẻ báo cáo dễ dàng với bác sĩ và người thân.',
    image: images.dashboard,
    alt: 'Báo cáo xu hướng vận động WeCare',
  },
] as const;

export const technologySteps = [
  { icon: 'watch', title: 'Thu thập dữ liệu IMU', text: 'Ghi lại chuyển động 3 trục liên tục 24/7' },
  { icon: 'activity', title: 'Tiền xử lý tín hiệu', text: 'Lọc nhiễu, làm sạch dữ liệu' },
  { icon: 'file', title: 'Trích xuất đặc trưng', text: 'Phân tích các đặc điểm vận động quan trọng' },
  { icon: 'brain', title: 'AI phân tích', text: 'Đánh giá nguy cơ bằng mô hình học máy' },
  { icon: 'chart', title: 'Hồ sơ vận động số', text: 'Hiển thị kết quả và theo dõi dài hạn' },
] as const;

export const features = [
  { icon: 'hand', title: 'Theo dõi run tay', text: 'Phân tích cường độ, tần suất và mẫu run tay trong sinh hoạt hằng ngày.' },
  { icon: 'running', title: 'Bài kiểm tra vận động', text: 'Hướng dẫn các bài kiểm tra chuẩn hóa, kết quả tức thì.' },
  { icon: 'chart', title: 'Lịch sử theo dõi', text: 'Lưu trữ dữ liệu dài hạn, hiển thị xu hướng theo thời gian.' },
  { icon: 'bell', title: 'Nhắc thuốc & tái khám', text: 'Nhắc nhở thông minh giúp bạn tuân thủ liệu trình điều trị.' },
  { icon: 'share', title: 'Chia sẻ báo cáo', text: 'Dễ dàng chia sẻ báo cáo với bác sĩ và người thân.' },
  { icon: 'infinity', title: 'Theo dõi dài hạn', text: 'Đồng hành bền bỉ trong hành trình chăm sóc sức khỏe trọn đời.' },
] as const;

export const milestones = [
  { icon: 'flask', date: 'Q1 – Q2/2025', title: 'Nghiên cứu nền tảng', items: ['Phát triển phần cứng mẫu', 'Xây dựng thuật toán AI', 'Thử nghiệm trong phòng lab'] },
  { icon: 'users', date: 'Q3 – Q4/2025', title: 'Kiểm thử thực tế', items: ['Thử nghiệm lâm sàng ban đầu', 'Thu thập và phân tích dữ liệu', 'Hoàn thiện sản phẩm'] },
  { icon: 'settings', date: 'Q1 – Q2/2026', title: 'Tối ưu AI', items: ['Cải thiện độ chính xác', 'Mở rộng tính năng', 'Tối ưu trải nghiệm người dùng'] },
  { icon: 'chart', date: 'Q3/2026+', title: 'Mở rộng nghiên cứu', items: ['Triển khai quy mô lớn hơn', 'Hợp tác với các bệnh viện', 'Hướng tới chứng nhận y tế'] },
] as const;
