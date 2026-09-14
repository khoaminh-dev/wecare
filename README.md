# WeCare

Website cinematic của WeCare, xây dựng bằng Expo / React Native Web, GSAP và Three.js.

Mã nguồn ứng dụng nằm trong `wecare-app/`. Xem hướng dẫn chạy và cấu trúc dự án tại `wecare-app/README.md`.

## Deploy Vercel

Có thể import trực tiếp repository này trên Vercel. `vercel.json` ở root sẽ cài dependency trong `wecare-app`, chạy `expo export --platform web` và phục vụ `wecare-app/dist`.

Nếu cấu hình thủ công trong Vercel, dùng các giá trị tương đương:

- Root Directory: để trống, dùng root repository
- Build Command: `npm ci --prefix wecare-app && npm run export:web --prefix wecare-app`
- Output Directory: `wecare-app/dist`
