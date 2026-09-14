# WeCare cinematic — bản web

Dự án Expo / React Native với giao diện web riêng: Metro dùng src/WeCareSite.web.tsx trên trình duyệt. src/WeCareSite.tsx giữ giao diện native cũ; cảnh cinematic không chạy trong Expo Go.

Chạy: npm install, npm run typecheck, npm run export:web, npm run preview:dist.
Server mặc định 4174. Để dùng preview hiện tại trong PowerShell: $env:PORT='4173'; npm run preview:dist.
Triển khai nội dung dist/ lên static hosting.

Cấu trúc mới:
- src/WeCareSite.web.tsx: các section, GSAP, menu, tab công nghệ, dialog.
- src/cinematic/cinematic.css: responsive, font, sticky scenes và reduced motion.
- src/cinematic/WatchScene.ts: Three.js tải gần section, model thiết bị minh họa, đèn studio, xoay theo cuộn.
- assets/images/cinematic-dawn.png và cinematic-care.png: ảnh gốc tạo bằng imagegen; hai bản .webp được tối ưu để dùng trên web.
- CINEMATIC-DIRECTION.md: ý tưởng, nguồn ảnh và prompt.

Hero là ảnh có chuyển động camera, không phải video AI. Model và thông số sức khỏe là minh họa, không phải CAD hoặc dữ liệu y tế thực. Lộ trình là kế hoạch dự kiến. CTA mở thông tin sản phẩm; chưa có backend gửi form hay đặt lịch.

Hỗ trợ cuộn tự nhiên, tắt chuyển động, prefers-reduced-motion, modal bàn phím/Escape và tab bằng phím mũi tên. WebGL ngừng render khi ngoài màn hình hoặc tab bị ẩn, dùng ảnh thay thế nếu không hỗ trợ.

Ảnh QA cũ thuộc phiên bản trước, không đại diện cho bản cinematic. Phiên bản này được kiểm tra trực tiếp trên trình duyệt.
