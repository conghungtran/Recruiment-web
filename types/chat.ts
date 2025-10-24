/**
 * Chat System Types
 * Định nghĩa các kiểu dữ liệu cho hệ thống chat
 */

export interface Message {
  id: string;
  conversationId: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
  read?: boolean;
}

export interface Conversation {
  id: string;
  customerId: string;
  messages: Message[];
  status: "active" | "resolved" | "pending";
  startedAt: Date;
  lastMessageAt: Date;
  unreadCount: number;
}

export interface Customer {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  firstSeen: Date;
  lastSeen: Date;
  conversationCount: number;
  totalMessages: number;
  status: "new" | "returning" | "vip";
}

export interface ChatStats {
  totalConversations: number;
  activeConversations: number;
  totalCustomers: number;
  totalMessages: number;
  averageResponseTime: number;
  satisfactionRate: number;
  todayConversations: number;
  weeklyGrowth: number;
}

