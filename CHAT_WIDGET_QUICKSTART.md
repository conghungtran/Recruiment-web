# 🚀 Hướng Dẫn Nhanh - Chat Widget AI

## ✅ Hoàn Thành
Chat widget AI đã được tích hợp thành công vào website VTech!

## 📍 Vị Trí Files
```
components/
├── chat-widget.tsx              # Component chat widget
├── conditional-layout.tsx       # Layout wrapper (đã tích hợp)
└── chat-widget-readme.md        # Tài liệu chi tiết

app/
└── chat-demo/
    └── page.tsx                 # Trang demo
```

## 🎯 Kiểm Tra Ngay

### Bước 1: Chạy dev server
```bash
npm run dev
```

### Bước 2: Mở trình duyệt
Truy cập: `http://localhost:3000/chat-demo`

### Bước 3: Test chat widget
- Nhìn góc phải dưới màn hình → thấy nút chat màu xanh
- Click vào nút → khung chat hiện ra với animation mượt
- Gõ tin nhắn và nhấn Enter
- AI sẽ phản hồi sau 1 giây (demo)

## 🌟 Tính Năng Đã Có

✅ Nút chat nổi (floating button) góc phải dưới  
✅ Animation mượt mà (Framer Motion)  
✅ Khung chat đẹp, responsive  
✅ Tin nhắn người dùng + AI  
✅ Tự động scroll xuống tin nhắn mới  
✅ Hỗ trợ Enter để gửi  
✅ Timestamp cho mỗi tin nhắn  
✅ Avatar cho User & AI  
✅ Tự động ẩn trên trang admin  

## 📱 Hiển Thị Ở Đâu?

Widget sẽ tự động hiển thị trên **TẤT CẢ** các trang website, **NGOẠI TRỪ**:
- `/admin/*` - Trang admin
- `/(admin)/*` - Route group admin

## 🎨 Tùy Chỉnh Nhanh

### Đổi màu sang xanh lá
Mở `components/chat-widget.tsx`, tìm dòng 75:
```tsx
// Từ:
"bg-gradient-to-br from-blue-600 to-blue-700"
// Thành:
"bg-gradient-to-br from-green-600 to-green-700"
```

### Chuyển sang góc trái
Dòng 75:
```tsx
// Từ:
"fixed bottom-6 right-6"
// Thành:
"fixed bottom-6 left-6"
```

### Tăng kích thước
Dòng 117 & 119:
```tsx
// Từ:
"w-[380px]" và "h-[600px]"
// Thành:
"w-[450px]" và "h-[700px]"
```

## 🔌 Tích Hợp Backend (Sau này)

### Với REST API
```tsx
const response = await fetch("/api/chat", {
  method: "POST",
  body: JSON.stringify({ message: inputValue }),
});
const data = await response.json();
```

### Với OpenAI API
```tsx
const response = await fetch("https://api.openai.com/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
  },
  body: JSON.stringify({
    model: "gpt-4",
    messages: [{ role: "user", content: inputValue }],
  }),
});
```

Chi tiết xem: `components/chat-widget-readme.md`

## 🧪 Test Checklist

- [ ] Widget hiển thị ở góc phải dưới
- [ ] Click vào nút → chat mở ra
- [ ] Animation mượt mà
- [ ] Gõ tin nhắn → AI trả lời
- [ ] Enter để gửi tin nhắn
- [ ] Scroll tự động xuống tin nhắn mới
- [ ] Responsive trên mobile
- [ ] Không hiển thị trên `/admin`

## 📚 Tài Liệu Chi Tiết

Xem thêm tại: `components/chat-widget-readme.md`

## ❓ Troubleshooting

### Widget không hiển thị?
1. Kiểm tra không phải trang admin
2. Mở DevTools Console xem có lỗi
3. Kiểm tra `conditional-layout.tsx` đã import đúng

### Lỗi TypeScript?
```bash
npm run build
```
Nếu có lỗi → báo ngay để fix

### Animation giật?
1. Kiểm tra CPU/GPU không quá tải
2. Thử disable Chrome extensions
3. Test trên trình duyệt khác

## 🎉 Kết Quả

Bạn đã có một chat widget AI chuyên nghiệp, sẵn sàng tích hợp backend!

**Next Steps:**
1. Test trên nhiều trang khác nhau
2. Thử trên mobile/tablet
3. Tùy chỉnh màu sắc theo brand
4. Chuẩn bị backend API

---
**Powered by VTech Development Team** 💙

