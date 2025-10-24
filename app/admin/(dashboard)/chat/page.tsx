"use client";

/**
 * Chat Conversations Management Page
 * Trang quản lý hội thoại với khách hàng
 * 
 * Features:
 * - View all conversations with filters
 * - Admin reply functionality
 * - Bulk actions (mark read, change status)
 * - Real-time search
 * - Export conversations
 */

import { useEffect, useState, useRef } from "react";
import { 
  MessageSquare, 
  User, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Search,
  RefreshCw,
  Send,
  CheckSquare,
  Square,
  Download,
  Eye,
  EyeOff,
  Bot
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert";
import {
  getAllConversations,
  getCustomerById,
  markConversationAsRead,
  updateConversationStatus,
  addMessage,
  exportChatData,
} from "@/lib/chat-storage";
import type { Conversation } from "@/types/chat";
import { cn } from "@/lib/utils";

export default function ChatConversationsPage() {
  // State management
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [filteredConversations, setFilteredConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [selectedConvIds, setSelectedConvIds] = useState<Set<string>>(new Set());
  const [replyText, setReplyText] = useState("");
  const [isSendingReply, setIsSendingReply] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load conversations on mount and set up auto-refresh
  useEffect(() => {
    loadConversations();
    const interval = setInterval(loadConversations, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  // Filter conversations based on search and filters
  useEffect(() => {
    let filtered = conversations;

    if (statusFilter !== "all") {
      filtered = filtered.filter((c) => c.status === statusFilter);
    }

    if (showUnreadOnly) {
      filtered = filtered.filter((c) => c.unreadCount > 0);
    }

    if (searchQuery) {
      filtered = filtered.filter((c) => {
        const customer = getCustomerById(c.customerId);
        const customerName = customer?.name?.toLowerCase() || "";
        const customerEmail = customer?.email?.toLowerCase() || "";
        const query = searchQuery.toLowerCase();
        
        const hasMessageMatch = c.messages.some(msg => 
          msg.text.toLowerCase().includes(query)
        );
        
        return (
          customerName.includes(query) ||
          customerEmail.includes(query) ||
          c.id.includes(query) ||
          hasMessageMatch
        );
      });
    }

    setFilteredConversations(filtered);
  }, [conversations, searchQuery, statusFilter, showUnreadOnly]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedConversation?.messages]);

  const loadConversations = () => {
    const convs = getAllConversations();
    convs.sort((a, b) => b.lastMessageAt.getTime() - a.lastMessageAt.getTime());
    setConversations(convs);
  };

  const handleSelectConversation = (conv: Conversation) => {
    setSelectedConversation(conv);
    setReplyText("");
    
    if (conv.unreadCount > 0) {
      markConversationAsRead(conv.id);
      loadConversations();
    }
  };

  const handleStatusChange = (convId: string, status: Conversation["status"]) => {
    updateConversationStatus(convId, status);
    loadConversations();
    
    if (selectedConversation?.id === convId) {
      setSelectedConversation({
        ...selectedConversation,
        status,
      });
    }
  };

  const handleSendReply = () => {
    if (!replyText.trim() || !selectedConversation || isSendingReply) return;

    setIsSendingReply(true);
    const adminMessage = addMessage(selectedConversation.id, replyText, "ai");
    
    setSelectedConversation({
      ...selectedConversation,
      messages: [...selectedConversation.messages, adminMessage],
    });

    setReplyText("");
    setIsSendingReply(false);
    loadConversations();
  };

  const handleBulkMarkAsRead = () => {
    selectedConvIds.forEach(convId => markConversationAsRead(convId));
    setSelectedConvIds(new Set());
    loadConversations();
  };

  const handleBulkStatusChange = (status: Conversation["status"]) => {
    selectedConvIds.forEach(convId => updateConversationStatus(convId, status));
    setSelectedConvIds(new Set());
    loadConversations();
  };

  const handleToggleSelection = (convId: string) => {
    const newSelection = new Set(selectedConvIds);
    if (newSelection.has(convId)) {
      newSelection.delete(convId);
    } else {
      newSelection.add(convId);
    }
    setSelectedConvIds(newSelection);
  };

  const handleSelectAll = () => {
    if (selectedConvIds.size === filteredConversations.length) {
      setSelectedConvIds(new Set());
    } else {
      setSelectedConvIds(new Set(filteredConversations.map(c => c.id)));
    }
  };

  const handleExportConversations = () => {
    const data = exportChatData();
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vtech-conversations-${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: Conversation["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "resolved":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: Conversation["status"]) => {
    switch (status) {
      case "active":
        return <MessageSquare className="h-3 w-3" />;
      case "pending":
        return <AlertCircle className="h-3 w-3" />;
      case "resolved":
        return <CheckCircle className="h-3 w-3" />;
      default:
        return <MessageSquare className="h-3 w-3" />;
    }
  };

  const unreadCount = conversations.reduce((sum, c) => sum + c.unreadCount, 0);
  const allSelected = selectedConvIds.size === filteredConversations.length && filteredConversations.length > 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Chat Conversations</h1>
          <p className="text-muted-foreground mt-2">
            Quản lý và trả lời các cuộc hội thoại với khách hàng
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={loadConversations}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportConversations}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng Hội Thoại</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversations.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Tất cả conversations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đang Hoạt Động</CardTitle>
            <AlertCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {conversations.filter((c) => c.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Active status
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chưa Đọc</CardTitle>
            <MessageSquare className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadCount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Tin nhắn mới
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đã Giải Quyết</CardTitle>
            <CheckCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {conversations.filter((c) => c.status === "resolved").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Resolved status
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Bulk Actions Bar */}
      {selectedConvIds.size > 0 && (
        <Alert>
          <CheckSquare className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span className="font-medium">{selectedConvIds.size} conversations selected</span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={handleBulkMarkAsRead}>
                <Eye className="h-3 w-3 mr-1" />
                Mark Read
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleBulkStatusChange("resolved")}>
                <CheckCircle className="h-3 w-3 mr-1" />
                Resolve
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleBulkStatusChange("pending")}>
                <AlertCircle className="h-3 w-3 mr-1" />
                Pending
              </Button>
              <Button size="sm" variant="outline" onClick={() => setSelectedConvIds(new Set())}>
                Clear
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Conversations List */}
        <Card className="lg:col-span-5">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <CardTitle>Danh Sách Hội Thoại</CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant={showUnreadOnly ? "default" : "outline"}
                  onClick={() => setShowUnreadOnly(!showUnreadOnly)}
                >
                  {showUnreadOnly ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleSelectAll}
                >
                  {allSelected ? <Square className="h-4 w-4" /> : <CheckSquare className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            
            {/* Filters */}
            <div className="space-y-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm theo tên, email, tin nhắn..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Lọc theo trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả ({conversations.length})</SelectItem>
                  <SelectItem value="active">
                    Đang hoạt động ({conversations.filter(c => c.status === "active").length})
                  </SelectItem>
                  <SelectItem value="pending">
                    Đang chờ ({conversations.filter(c => c.status === "pending").length})
                  </SelectItem>
                  <SelectItem value="resolved">
                    Đã giải quyết ({conversations.filter(c => c.status === "resolved").length})
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            <div className="divide-y max-h-[600px] overflow-y-auto">
              {filteredConversations.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground">
                  {searchQuery || statusFilter !== "all" || showUnreadOnly
                    ? "Không tìm thấy conversations phù hợp"
                    : "Chưa có hội thoại nào"}
                </div>
              ) : (
                filteredConversations.map((conv) => {
                  const customer = getCustomerById(conv.customerId);
                  const isSelected = selectedConversation?.id === conv.id;
                  const isChecked = selectedConvIds.has(conv.id);
                  
                  return (
                    <div
                      key={conv.id}
                      className={cn(
                        "p-4 hover:bg-accent transition-colors",
                        isSelected && "bg-accent"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={() => handleToggleSelection(conv.id)}
                          className="mt-1"
                        />
                        
                        <button
                          onClick={() => handleSelectConversation(conv)}
                          className="flex-1 text-left"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
                                {customer?.name?.[0]?.toUpperCase() || <User className="h-5 w-5" />}
                              </div>
                              <div>
                                <p className="font-medium">
                                  {customer?.name || "Guest"}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {customer?.email || conv.customerId.slice(0, 20)}
                                </p>
                              </div>
                            </div>
                            
                            {conv.unreadCount > 0 && (
                              <Badge variant="destructive" className="rounded-full">
                                {conv.unreadCount}
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {new Date(conv.lastMessageAt).toLocaleString("vi-VN", {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                            
                            <Badge className={cn("text-xs", getStatusColor(conv.status))}>
                              {getStatusIcon(conv.status)}
                              <span className="ml-1">{conv.status}</span>
                            </Badge>
                          </div>
                          
                          <p className="text-sm line-clamp-2 text-muted-foreground">
                            {conv.messages[conv.messages.length - 1]?.text || "Chưa có tin nhắn"}
                          </p>
                          
                          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                            <MessageSquare className="h-3 w-3" />
                            <span>{conv.messages.length} messages</span>
                          </div>
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>

        {/* Conversation Detail & Reply */}
        <Card className="lg:col-span-7">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                {selectedConversation ? "Chi Tiết Hội Thoại" : "Chọn Hội Thoại"}
              </CardTitle>
              
              {selectedConversation && (
                <Select
                  value={selectedConversation.status}
                  onValueChange={(value) =>
                    handleStatusChange(selectedConversation.id, value as Conversation["status"])
                  }
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          </CardHeader>
          
          <CardContent>
            {selectedConversation ? (
              <div className="space-y-4">
                {/* Customer Info */}
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold mb-2">Thông Tin Khách Hàng</h3>
                  <div className="grid gap-2 text-sm">
                    {(() => {
                      const customer = getCustomerById(selectedConversation.customerId);
                      return (
                        <>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Tên:</span>
                            <span className="font-medium">{customer?.name || "Chưa cập nhật"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Email:</span>
                            <span className="font-medium">{customer?.email || "Chưa cập nhật"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Số cuộc hội thoại:</span>
                            <span className="font-medium">{customer?.conversationCount || 0}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Trạng thái:</span>
                            <Badge variant="outline">{customer?.status || "new"}</Badge>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>

                {/* Messages */}
                <div className="space-y-4 max-h-[300px] overflow-y-auto border rounded-lg p-4 bg-gray-50">
                  {selectedConversation.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex gap-3",
                        msg.sender === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      {msg.sender === "ai" && (
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <Bot className="h-4 w-4 text-blue-600" />
                        </div>
                      )}
                      
                      <div
                        className={cn(
                          "max-w-[70%] rounded-lg px-4 py-2",
                          msg.sender === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-white border border-gray-200"
                        )}
                      >
                        <p className="text-sm whitespace-pre-wrap break-words">{msg.text}</p>
                        <p
                          className={cn(
                            "text-xs mt-1",
                            msg.sender === "user" ? "text-blue-100" : "text-muted-foreground"
                          )}
                        >
                          {new Date(msg.timestamp).toLocaleString("vi-VN")}
                        </p>
                      </div>
                      
                      {msg.sender === "user" && (
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center flex-shrink-0">
                          <User className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Admin Reply Box */}
                <div className="space-y-2 border-t pt-4">
                  <h3 className="font-semibold text-sm">Trả Lời Khách Hàng</h3>
                  <Textarea
                    placeholder="Nhập câu trả lời của bạn..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.ctrlKey) {
                        handleSendReply();
                      }
                    }}
                    className="min-h-[100px]"
                  />
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-muted-foreground">
                      Tip: Nhấn Ctrl+Enter để gửi nhanh
                    </p>
                    <Button 
                      onClick={handleSendReply} 
                      disabled={!replyText.trim() || isSendingReply}
                      size="sm"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      {isSendingReply ? "Đang gửi..." : "Gửi Tin Nhắn"}
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-[500px] flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">Chọn một hội thoại để xem chi tiết</p>
                  <p className="text-sm">Chọn từ danh sách bên trái để bắt đầu quản lý</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

