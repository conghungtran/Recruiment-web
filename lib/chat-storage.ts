/**
 * Chat Storage Service
 * Quản lý lưu trữ và truy xuất dữ liệu chat từ localStorage
 */

import { Conversation, Customer, Message, ChatStats } from "@/types/chat";

const STORAGE_KEYS = {
  CONVERSATIONS: "vtech_conversations",
  CUSTOMERS: "vtech_customers",
  CURRENT_CUSTOMER: "vtech_current_customer",
};

/**
 * Parse dữ liệu từ localStorage và convert Date strings thành Date objects
 */
function parseStoredData<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  
  try {
    const data = localStorage.getItem(key);
    if (!data) return null;
    
    return JSON.parse(data, (key, value) => {
      // Convert ISO date strings back to Date objects
      if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
        return new Date(value);
      }
      return value;
    });
  } catch (error) {
    console.error(`Error parsing ${key}:`, error);
    return null;
  }
}

/**
 * Lưu dữ liệu vào localStorage
 */
function saveToStorage<T>(key: string, data: T): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key}:`, error);
  }
}

// ============= CUSTOMER MANAGEMENT =============

/**
 * Lấy hoặc tạo customer ID hiện tại (cho widget)
 */
export function getCurrentCustomerId(): string {
  if (typeof window === "undefined") return "";
  
  let customerId = localStorage.getItem(STORAGE_KEYS.CURRENT_CUSTOMER);
  
  if (!customerId) {
    customerId = `customer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(STORAGE_KEYS.CURRENT_CUSTOMER, customerId);
    
    // Tạo customer mới
    const newCustomer: Customer = {
      id: customerId,
      firstSeen: new Date(),
      lastSeen: new Date(),
      conversationCount: 0,
      totalMessages: 0,
      status: "new",
    };
    
    saveCustomer(newCustomer);
  }
  
  return customerId;
}

/**
 * Lấy tất cả customers
 */
export function getAllCustomers(): Customer[] {
  const customers = parseStoredData<Customer[]>(STORAGE_KEYS.CUSTOMERS);
  return customers || [];
}

/**
 * Lấy customer theo ID
 */
export function getCustomerById(customerId: string): Customer | null {
  const customers = getAllCustomers();
  return customers.find((c) => c.id === customerId) || null;
}

/**
 * Lưu hoặc cập nhật customer
 */
export function saveCustomer(customer: Customer): void {
  const customers = getAllCustomers();
  const index = customers.findIndex((c) => c.id === customer.id);
  
  if (index >= 0) {
    customers[index] = { ...customer, lastSeen: new Date() };
  } else {
    customers.push(customer);
  }
  
  saveToStorage(STORAGE_KEYS.CUSTOMERS, customers);
}

/**
 * Cập nhật thông tin customer
 */
export function updateCustomerInfo(
  customerId: string,
  info: Partial<Pick<Customer, "name" | "email" | "phone">>
): void {
  const customer = getCustomerById(customerId);
  if (customer) {
    saveCustomer({ ...customer, ...info });
  }
}

// ============= CONVERSATION MANAGEMENT =============

/**
 * Lấy tất cả conversations
 */
export function getAllConversations(): Conversation[] {
  const conversations = parseStoredData<Conversation[]>(STORAGE_KEYS.CONVERSATIONS);
  return conversations || [];
}

/**
 * Lấy conversations của một customer
 */
export function getConversationsByCustomer(customerId: string): Conversation[] {
  const conversations = getAllConversations();
  return conversations
    .filter((c) => c.customerId === customerId)
    .sort((a, b) => b.lastMessageAt.getTime() - a.lastMessageAt.getTime());
}

/**
 * Lấy conversation active hiện tại của customer
 */
export function getActiveConversation(customerId: string): Conversation | null {
  const conversations = getConversationsByCustomer(customerId);
  return conversations.find((c) => c.status === "active") || null;
}

/**
 * Tạo conversation mới
 */
export function createConversation(customerId: string): Conversation {
  const newConversation: Conversation = {
    id: `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    customerId,
    messages: [],
    status: "active",
    startedAt: new Date(),
    lastMessageAt: new Date(),
    unreadCount: 0,
  };
  
  const conversations = getAllConversations();
  conversations.push(newConversation);
  saveToStorage(STORAGE_KEYS.CONVERSATIONS, conversations);
  
  // Update customer stats
  const customer = getCustomerById(customerId);
  if (customer) {
    customer.conversationCount += 1;
    if (customer.conversationCount > 5) {
      customer.status = "returning";
    }
    if (customer.conversationCount > 20) {
      customer.status = "vip";
    }
    saveCustomer(customer);
  }
  
  return newConversation;
}

/**
 * Cập nhật conversation
 */
export function updateConversation(conversation: Conversation): void {
  const conversations = getAllConversations();
  const index = conversations.findIndex((c) => c.id === conversation.id);
  
  if (index >= 0) {
    conversations[index] = conversation;
    saveToStorage(STORAGE_KEYS.CONVERSATIONS, conversations);
  }
}

/**
 * Thay đổi status của conversation
 */
export function updateConversationStatus(
  conversationId: string,
  status: Conversation["status"]
): void {
  const conversations = getAllConversations();
  const conversation = conversations.find((c) => c.id === conversationId);
  
  if (conversation) {
    conversation.status = status;
    saveToStorage(STORAGE_KEYS.CONVERSATIONS, conversations);
  }
}

// ============= MESSAGE MANAGEMENT =============

/**
 * Thêm message mới vào conversation
 */
export function addMessage(
  conversationId: string,
  text: string,
  sender: "user" | "ai"
): Message {
  const newMessage: Message = {
    id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    conversationId,
    text,
    sender,
    timestamp: new Date(),
    read: sender === "user", // User messages are auto-read
  };
  
  const conversations = getAllConversations();
  const conversation = conversations.find((c) => c.id === conversationId);
  
  if (conversation) {
    conversation.messages.push(newMessage);
    conversation.lastMessageAt = new Date();
    
    // Increment unread count if message from user
    if (sender === "user") {
      conversation.unreadCount += 1;
    }
    
    saveToStorage(STORAGE_KEYS.CONVERSATIONS, conversations);
    
    // Update customer stats
    const customer = getCustomerById(conversation.customerId);
    if (customer) {
      customer.totalMessages += 1;
      customer.lastSeen = new Date();
      saveCustomer(customer);
    }
  }
  
  return newMessage;
}

/**
 * Đánh dấu tất cả messages trong conversation là đã đọc
 */
export function markConversationAsRead(conversationId: string): void {
  const conversations = getAllConversations();
  const conversation = conversations.find((c) => c.id === conversationId);
  
  if (conversation) {
    conversation.messages.forEach((msg) => {
      if (msg.sender === "user") {
        msg.read = true;
      }
    });
    conversation.unreadCount = 0;
    saveToStorage(STORAGE_KEYS.CONVERSATIONS, conversations);
  }
}

// ============= STATISTICS =============

/**
 * Tính toán thống kê chat
 */
export function getChatStats(): ChatStats {
  const conversations = getAllConversations();
  const customers = getAllCustomers();
  
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  const todayConversations = conversations.filter(
    (c) => c.startedAt >= todayStart
  ).length;
  
  const lastWeekConversations = conversations.filter(
    (c) => c.startedAt >= weekAgo && c.startedAt < todayStart
  ).length;
  
  const totalMessages = conversations.reduce(
    (sum, c) => sum + c.messages.length,
    0
  );
  
  const activeConversations = conversations.filter(
    (c) => c.status === "active"
  ).length;
  
  const weeklyGrowth =
    lastWeekConversations > 0
      ? ((todayConversations - lastWeekConversations) / lastWeekConversations) * 100
      : todayConversations > 0
      ? 100
      : 0;
  
  return {
    totalConversations: conversations.length,
    activeConversations,
    totalCustomers: customers.length,
    totalMessages,
    averageResponseTime: 0.8, // Mock data (minutes)
    satisfactionRate: 94.5, // Mock data (percentage)
    todayConversations,
    weeklyGrowth: Math.round(weeklyGrowth * 10) / 10,
  };
}

// ============= UTILITY FUNCTIONS =============

/**
 * Xóa tất cả dữ liệu chat (dành cho testing)
 */
export function clearAllChatData(): void {
  if (typeof window === "undefined") return;
  
  localStorage.removeItem(STORAGE_KEYS.CONVERSATIONS);
  localStorage.removeItem(STORAGE_KEYS.CUSTOMERS);
  localStorage.removeItem(STORAGE_KEYS.CURRENT_CUSTOMER);
}

/**
 * Export dữ liệu chat (dành cho backup)
 */
export function exportChatData() {
  return {
    conversations: getAllConversations(),
    customers: getAllCustomers(),
    exportedAt: new Date(),
  };
}

/**
 * Import dữ liệu chat (dành cho restore)
 */
export function importChatData(data: {
  conversations: Conversation[];
  customers: Customer[];
}) {
  saveToStorage(STORAGE_KEYS.CONVERSATIONS, data.conversations);
  saveToStorage(STORAGE_KEYS.CUSTOMERS, data.customers);
}

