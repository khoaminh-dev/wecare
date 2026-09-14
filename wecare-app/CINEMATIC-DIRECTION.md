# Nhịp sống, được nâng niu

Tham chiếu: https://www.youtube.com/watch?v=60a0nHFefn4&t=778s
Đã xem phần demo trên trình duyệt và đọc transcript. Hướng tiếp cận: ảnh toàn màn hình, camera chuyển động theo cuộn, hình ảnh đồng nhất và kiểu chữ editorial. Không sao chép ảnh hoặc video cabin.

Thiết kế WeCare: bình minh và đời sống người Việt; màu xanh rừng, kem và olive; chuyển từ câu chuyện con người sang thiết bị 3D, quy trình dữ liệu, kết nối gia đình, tính năng và lộ trình nghiên cứu.

Ảnh được tạo bằng công cụ imagegen tích hợp ngày 2026-09-14. Người và sản phẩm là minh họa AI, không phải ảnh bệnh nhân. Lưu tại assets/images/cinematic-dawn.png và cinematic-care.png. Hero dùng camera zoom/parallax trên ảnh; không phải video AI.

## Prompt cinematic-dawn.png
Generate a cinematic premium healthcare brand website hero PHOTOGRAPH, not a UI mockup. Wide landscape 16:9, very high resolution. At far RIGHT of frame, a Vietnamese older adult woman aged about 65 in tasteful light ivory linen long-sleeve shirt, in profile/back three-quarter view, slowly walking along a sunlit path through tall green meadow grass, one hand gently brushing grasses. Natural elegant humanity, face small in frame, not posed stock healthcare photo, not doctor. Scene at dawn in a green rural hillside, layered forest mountain silhouettes in background, subtle natural atmospheric haze, golden sunlight streaming from upper right, richly deep forest green and muted moss palette, warm cream highlights. LEFT HALF must be quiet dark forest foliage/shadow negative space for large white editorial typography later. Long-lens photography, foreground out of focus leaves at edges, excellent depth, subtle film grain, expensive luxury wellness documentary commercial, photorealistic art direction, calm and emotionally resonant, no glowy digital elements, no UI, no text, no lettering, no logos, no watermark. Final must be a full-bleed photo, no borders. This is for WeCare care technology helping people live independently.

## Prompt cinematic-care.png
A photorealistic luxury health technology editorial photograph for WeCare, 3:2 landscape. Close-up of two Vietnamese adults' hands: younger adult hand gently resting over older adult woman's hand on a sunlit pale stone table in a minimal modern home. On the older woman's wrist a small rounded rectangular brushed silver health monitoring watch with ivory silicone strap, black glass screen showing only a simple tiny soft mint waveform NO words or numerals. Linen ivory shirt sleeve, natural skin with fine wrinkles, tenderness and dignity. Composition hands in center-right, left third softly out of focus. Morning golden side light, deep forest green garden blurred in background, rich cinematic shadow, muted organic colors, elegant refined commercial photography, 85mm lens, subtle natural film grain, ultra high quality, no text, no logos, no watermark, no borders, no stock photo smiles.

## Chuyển động
Hero sticky 220svh / 190svh mobile: zoom, crossfade chữ và ánh sáng nhẹ.
Product sticky 235svh: model Three.js xoay theo cuộn, shader vật liệu, ánh sáng studio và particle.
Phần dưới: reveal, ảnh parallax, signal orbital, timeline fill và điểm đang xem.
Motion off: bố cục tĩnh, bỏ chiều dài sticky; giảm hiệu ứng theo cài đặt hệ điều hành.

Font địa phương: Playfair Display / Be Vietnam Pro, Google Fonts.
Tài liệu chính thức: https://gsap.com/docs/v3/Plugins/ScrollTrigger/ và https://threejs.org/docs/
