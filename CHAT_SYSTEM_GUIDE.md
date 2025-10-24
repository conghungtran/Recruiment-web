# 🚀 Hệ Thống Chat AI - VTech
## Hướng Dẫn Hoàn Chỉnh

---

## 📋 Tổng Quan

Hệ thống Chat AI hoàn chỉnh bao gồm:
1. **Chat Widget** - Giao diện chat nổi cho khách hàng trên website
2. **Admin Dashboard** - Quản lý conversations, customers và thống kê
3. **localStorage Storage** - Lưu trữ dữ liệu tạm thời (sẵn sàng chuyển sang backend)

---

## 🎯 Tính Năng Đã Hoàn Thành

### 1. Chat Widget (Frontend)
✅ Nút chat nổi góc phải dưới  
✅ Animation mượt mà với Framer Motion  
✅ Khung chat responsive đẹp  
✅ Tự động tạo customer ID  
✅ Lưu conversations vào localStorage  
✅ Typing indicator khi AI đang trả lời  
✅ Timestamp cho mỗi tin nhắn  
✅ Avatar cho User & AI  
✅ Tự động ẩn trên trang admin  
✅ Auto-scroll tin nhắn mới  
✅ Hỗ trợ Enter để gửi  

### 2. Admin Dashboard
✅ **Chat Conversations Page** (`/admin/chat`)
  - Xem tất cả conversations
  - Filter theo status (active/pending/resolved)
  - Search conversations
  - Mark as read
  - Chi tiết conversation với messages
  - Thay đổi status conversation

✅ **Customers Page** (`/admin/customers`)
  - Danh sách khách hàng
  - Edit thông tin khách hàng (name, email, phone)
  - Stats cards (Total, New, Returning, VIP)
  - Search và filter
  - Export data to JSON
  - Customer status tracking

✅ **Sidebar Navigation**
  - Menu Chat và Customers đã được thêm
  - Icons đẹp với Lucide React

### 3. Data Management (localStorage)
✅ Complete CRUD operations  
✅ Customer management  
✅ Conversation tracking  
✅ Message handling  
✅ Statistics calculation  
✅ Export/Import functionality  

---

## 📁 Cấu Trúc Files Đã Tạo

```
D:\WorkSpace\Vtech\
├── types/
│   └── chat.ts                          # TypeScript interfaces
│
├── lib/
│   └── chat-storage.ts                  # localStorage service
│
├── components/
│   ├── chat-widget.tsx                  # Chat widget (đã cập nhật)
│   ├── conditional-layout.tsx           # Layout wrapper
│   └── admin/
│       └── admin-sidebar.tsx            # Sidebar (đã cập nhật)
│
├── app/
│   └── admin/(dashboard)/
│       ├── chat/
│       │   └── page.tsx                 # Chat conversations page
│       └── customers/
│           └── page.tsx                 # Customers page
│
└── CHAT_SYSTEM_GUIDE.md                 # File này
```

---

## 🚀 Cách Sử Dụng

### Bước 1: Chạy Development Server
```bash
cd D:\WorkSpace\Vtech
npm run dev
```

### Bước 2: Test Chat Widget
1. Mở browser: `http://localhost:3000`
2. Nhìn góc phải dưới → nút chat màu xanh
3. Click vào nút → chat mở ra
4. Gõ tin nhắn → AI trả lời tự động
5. Dữ liệu được lưu vào localStorage

### Bước 3: Kiểm Tra Admin Dashboard
1. Login admin: `http://localhost:3000/admin/login`
2. Vào `/admin/chat` → xem conversations
3. Vào `/admin/customers` → xem customers
4. Test các tính năng:
   - Filter conversations
   - Search customers
   - Edit customer info
   - Export data
   - Change conversation status

---

## 💾 Cấu Trúc Dữ Liệu

### Customer
```typescript
interface Customer {
  id: string;                    // Unique ID
  name?: string;                 // Tên (optional)
  email?: string;                // Email (optional)
  phone?: string;                // SĐT (optional)
  firstSeen: Date;               // Lần đầu ghé thăm
  lastSeen: Date;                // Lần cuối hoạt động
  conversationCount: number;     // Số cuộc hội thoại
  totalMessages: number;         // Tổng số tin nhắn
  status: "new" | "returning" | "vip";  // Trạng thái
}
```

### Conversation
```typescript
interface Conversation {
  id: string;
  customerId: string;
  messages: Message[];
  status: "active" | "resolved" | "pending";
  startedAt: Date;
  lastMessageAt: Date;
  unreadCount: number;
}
```

### Message
```typescript
interface Message {
  id: string;
  conversationId: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
  read?: boolean;
}
```

---

## 🔧 API Functions (lib/chat-storage.ts)

### Customer Management
```typescript
getCurrentCustomerId()              // Lấy/tạo customer ID
getAllCustomers()                   // Lấy tất cả customers
getCustomerById(id)                 // Lấy customer theo ID
saveCustomer(customer)              // Lưu/cập nhật customer
updateCustomerInfo(id, info)        // Cập nhật thông tin
```

### Conversation Management
```typescript
getAllConversations()               // Lấy tất cả conversations
getConversationsByCustomer(id)      // Lấy conversations của customer
getActiveConversation(id)           // Lấy conversation đang active
createConversation(customerId)      // Tạo conversation mới
updateConversation(conversation)    // Cập nhật conversation
updateConversationStatus(id, status) // Đổi status
```

### Message Management
```typescript
addMessage(convId, text, sender)    // Thêm tin nhắn mới
markConversationAsRead(convId)      // Đánh dấu đã đọc
```

### Statistics & Utilities
```typescript
getChatStats()                      // Lấy thống kê tổng quan
exportChatData()                    // Export data to JSON
importChatData(data)                // Import data from JSON
clearAllChatData()                  // Xóa tất cả (testing)
```

---

## 🎨 Customization

### Đổi Màu Chat Widget
File: `components/chat-widget.tsx`

```typescript
// Dòng 97: Nút chat
"bg-gradient-to-br from-blue-600 to-blue-700"

// Dòng 142: Header
"bg-gradient-to-r from-blue-600 to-blue-700"

// Dòng 176: Tin nhắn user
"bg-blue-600 text-white"
```

### Đổi Vị Trí Nút Chat
```typescript
// Dòng 96: Từ góc phải sang trái
"fixed bottom-6 right-6"  →  "fixed bottom-6 left-6"
```

### Thay Đổi AI Responses
File: `components/chat-widget.tsx` (dòng 68-73)
```typescript
const aiResponses = [
  "Phản hồi 1",
  "Phản hồi 2",
  "Phản hồi 3",
  // Thêm responses...
];
```

---

## 🔌 Tích Hợp Backend (Roadmap)

### 1. Tạo API Routes

#### POST `/api/chat/send`
```typescript
// app/api/chat/send/route.ts
export async function POST(req: Request) {
  const { conversationId, message, customerId } = await req.json();
  
  // Lưu vào database
  await db.messages.create({
    data: { conversationId, text: message, sender: "user" }
  });
  
  // Gọi AI API (OpenAI/Claude/etc)
  const aiResponse = await callAI(message);
  
  await db.messages.create({
    data: { conversationId, text: aiResponse, sender: "ai" }
  });
  
  return Response.json({ reply: aiResponse });
}
```

#### GET `/api/chat/conversations`
```typescript
// Lấy tất cả conversations
export async function GET() {
  const conversations = await db.conversations.findMany({
    include: { messages: true, customer: true }
  });
  return Response.json(conversations);
}
```

#### GET `/api/customers`
```typescript
// Lấy tất cả customers
export async function GET() {
  const customers = await db.customers.findMany();
  return Response.json(customers);
}
```

### 2. Update Chat Widget
```typescript
// components/chat-widget.tsx
const handleSendMessage = async () => {
  // ... user message

  try {
    const response = await fetch("/api/chat/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        conversationId,
        message: messageText,
        customerId: getCurrentCustomerId(),
      }),
    });

    const data = await response.json();
    // ... handle AI response
  } catch (error) {
    console.error(error);
  }
};
```

### 3. Database Schema (Prisma Example)

```prisma
model Customer {
  id                String         @id @default(cuid())
  name              String?
  email             String?
  phone             String?
  firstSeen         DateTime       @default(now())
  lastSeen          DateTime       @updatedAt
  conversationCount Int            @default(0)
  totalMessages     Int            @default(0)
  status            String         @default("new")
  conversations     Conversation[]
}

model Conversation {
  id            String    @id @default(cuid())
  customerId    String
  customer      Customer  @relation(fields: [customerId], references: [id])
  messages      Message[]
  status        String    @default("active")
  startedAt     DateTime  @default(now())
  lastMessageAt DateTime  @updatedAt
  unreadCount   Int       @default(0)
}

model Message {
  id             String       @id @default(cuid())
  conversationId String
  conversation   Conversation @relation(fields: [conversationId], references: [id])
  text           String
  sender         String       // "user" | "ai"
  timestamp      DateTime     @default(now())
  read           Boolean      @default(false)
}
```

---

## 🧪 Testing Checklist

### Chat Widget
- [ ] Widget hiển thị góc phải dưới
- [ ] Click mở/đóng hoạt động
- [ ] Animation mượt mà
- [ ] Gửi tin nhắn thành công
- [ ] AI trả lời sau 1-2s
- [ ] Typing indicator hiển thị
- [ ] Tin nhắn lưu vào localStorage
- [ ] Reload page → dữ liệu vẫn còn
- [ ] Responsive trên mobile
- [ ] Không hiển thị trên `/admin`

### Admin Chat Page
- [ ] Hiển thị danh sách conversations
- [ ] Filter theo status hoạt động
- [ ] Search conversations
- [ ] Click vào conversation → xem chi tiết
- [ ] Đổi status conversation
- [ ] Mark as read hoạt động
- [ ] Stats cards hiển thị đúng

### Admin Customers Page
- [ ] Hiển thị danh sách customers
- [ ] Stats cards chính xác
- [ ] Search customers hoạt động
- [ ] Edit customer info
- [ ] Lưu thay đổi thành công
- [ ] Export data to JSON

---

## 📊 localStorage Keys

```
vtech_conversations     # Array of Conversation objects
vtech_customers         # Array of Customer objects
vtech_current_customer  # Current customer ID (string)
```

### View Data in Browser
```javascript
// Open DevTools Console
localStorage.getItem('vtech_conversations')
localStorage.getItem('vtech_customers')
localStorage.getItem('vtech_current_customer')
```

### Clear Data (Testing)
```javascript
// Console
localStorage.removeItem('vtech_conversations')
localStorage.removeItem('vtech_customers')
localStorage.removeItem('vtech_current_customer')

// Or use the function
clearAllChatData()
```

---

## 🎯 Next Steps

### Immediate
1. ✅ Test tất cả tính năng
2. ✅ Fix bugs (nếu có)
3. ✅ Cập nhật styles nếu cần

### Short Term (1-2 tuần)
- [ ] Tích hợp OpenAI API
- [ ] Thêm typing indicator thật
- [ ] Real-time updates với WebSocket
- [ ] Dark mode support
- [ ] Email notifications cho admin

### Long Term (1-2 tháng)
- [ ] Migrate sang database (PostgreSQL/MongoDB)
- [ ] Admin reply functionality
- [ ] File/image upload support
- [ ] Chat analytics dashboard
- [ ] Multi-language support
- [ ] Voice chat support
- [ ] Mobile app

---

## ⚠️ Important Notes

### LocalStorage Limitations
- **Dung lượng:** ~5-10MB (đủ cho demo)
- **Bảo mật:** Không bảo mật, chỉ dùng testing
- **Sharing:** Không share giữa devices
- **Persistence:** Clear khi xóa browser data

### Production Ready?
❌ **Chưa!** Đây là phiên bản demo với localStorage  
✅ **Cần:** Database + Backend API + Authentication  
✅ **Sẵn sàng:** Code structure dễ migrate sang backend

---

## 🐛 Troubleshooting

### Widget không hiển thị?
1. Check bạn không ở page `/admin`
2. Open DevTools Console xem errors
3. Kiểm tra `conditional-layout.tsx` import đúng

### Dữ liệu bị mất?
1. LocalStorage bị clear (normal behavior)
2. Use Export feature để backup
3. Import lại data nếu cần

### Lỗi TypeScript?
```bash
npm run build
# Xem errors và fix
```

### Performance issues?
1. Quá nhiều conversations (>100)
2. Clear old data: `clearAllChatData()`
3. Consider pagination

---

## 📞 Support & Questions

Nếu có vấn đề:
1. Check console errors
2. Review code comments
3. Test với data mẫu ít
4. Contact VTech Dev Team

---

## 🎉 Kết Luận

Bạn đã có:
✅ Chat widget hoàn chỉnh  
✅ Admin dashboard chuyên nghiệp  
✅ localStorage management system  
✅ Clean, documented, typed code  
✅ Sẵn sàng tích hợp backend  

**Tất cả chạy ngay, không cần backend!**

---

**Built with ❤️ by VTech Development Team**  
**Stack:** Next.js 15 + TypeScript + TailwindCSS + Framer Motion + shadcn/ui

