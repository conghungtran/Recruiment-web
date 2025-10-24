"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getCurrentCustomerId,
  getActiveConversation,
  createConversation,
  addMessage,
} from "@/lib/chat-storage";
import type { Message } from "@/types/chat";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Khởi tạo conversation khi mở widget
  useEffect(() => {
    if (isOpen && !conversationId) {
      const customerId = getCurrentCustomerId();
      let conversation = getActiveConversation(customerId);

      if (!conversation) {
        conversation = createConversation(customerId);

        // Thêm welcome message
        addMessage(
          conversation.id,
          "Xin chào! Tôi là trợ lý AI của VTech. Tôi có thể giúp gì cho bạn?",
          "ai"
        );
      }

      setConversationId(conversation.id);
      setMessages(conversation.messages);
    }
  }, [isOpen, conversationId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim() || !conversationId) return;

    const messageText = inputValue;
    setInputValue("");

    // Thêm tin nhắn của người dùng vào localStorage
    const userMessage = addMessage(conversationId, messageText, "user");
    setMessages((prev) => [...prev, userMessage]);

    // Hiển thị typing indicator
    setIsTyping(true);

    // Giả lập phản hồi từ AI (sau 1-2 giây)
    setTimeout(() => {
      const aiResponses = [
        "Cảm ơn bạn đã liên hệ! Tôi đã ghi nhận câu hỏi của bạn.",
        "Để tôi giúp bạn với vấn đề này. Bạn có thể cung cấp thêm thông tin không?",
        "Tôi hiểu vấn đề của bạn. Đội ngũ VTech sẽ phản hồi sớm nhất có thể.",
        "Đây là câu hỏi hay! Hãy để tôi tìm thông tin phù hợp cho bạn.",
      ];

      const randomResponse =
        aiResponses[Math.floor(Math.random() * aiResponses.length)];
      const aiMessage = addMessage(conversationId, randomResponse, "ai");

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center text-white transition-all duration-300 focus:outline-none backdrop-blur-sm border border-red-500/30 overflow-hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.92 }}
      >
        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-red-400"
          animate={!isOpen ? { scale: [1, 1.3], opacity: [1, 0] } : {}}
          transition={!isOpen ? { duration: 1.5, repeat: Infinity } : {}}
        />

        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative z-10"
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative z-10"
            >
              <MessageCircle className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)]"
          >
            <div className="flex h-[600px] max-h-[calc(100vh-8rem)] flex-col rounded-3xl bg-white border border-gray-100 overflow-hidden relative backdrop-blur-sm shadow-2xl">
              {/* Gradient border effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-red-600/5 to-transparent pointer-events-none" />

              {/* Header */}
              <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-5 text-white relative z-10">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/25 backdrop-blur-sm border border-white/20">
                    <Bot className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">VTech AI</h3>
                    <p className="text-xs text-red-100 font-medium">
                      🤖 Trợ lý ảo thông minh
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto bg-white px-4 py-6 space-y-4 relative z-10">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "flex gap-3",
                      message.sender === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    {message.sender === "ai" && (
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                        <Bot className="h-5 w-5" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "max-w-[75%] rounded-2xl px-4 py-3 text-sm transition-all duration-300",
                        message.sender === "user"
                          ? "bg-red-600 text-white rounded-br-sm font-medium"
                          : "bg-gray-100 text-gray-800 rounded-bl-sm border border-gray-200/50"
                      )}
                    >
                      <p className="whitespace-pre-wrap break-words">
                        {message.text}
                      </p>
                      <p
                        className={cn(
                          "mt-1 text-xs",
                          message.sender === "user"
                            ? "text-blue-100"
                            : "text-gray-400"
                        )}
                      >
                        {message.timestamp.toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    {message.sender === "user" && (
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gray-700 to-gray-800 text-white">
                        <User className="h-5 w-5" />
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3 justify-start"
                  >
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                      <Bot className="h-5 w-5" />
                    </div>
                    <div className="max-w-[75%] rounded-2xl px-4 py-3 text-sm bg-gray-100 border border-gray-200/50 rounded-bl-sm">
                      <div className="flex gap-1.5 items-center">
                        <motion.div
                          className="w-2.5 h-2.5 bg-red-500 rounded-full"
                          animate={{ scale: [0.8, 1.2, 0.8] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                          }}
                        />
                        <motion.div
                          className="w-2.5 h-2.5 bg-red-500 rounded-full"
                          animate={{ scale: [0.8, 1.2, 0.8] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: 0.2,
                          }}
                        />
                        <motion.div
                          className="w-2.5 h-2.5 bg-red-500 rounded-full"
                          animate={{ scale: [0.8, 1.2, 0.8] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: 0.4,
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-100 bg-white px-4 py-4 relative z-10">
                <div className="flex gap-2">
                  <motion.input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Nhập câu hỏi của bạn..."
                    className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm placeholder:text-gray-400 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
                    whileFocus={{ backgroundColor: "rgb(255, 255, 255)" }}
                  />
                  <motion.button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    whileTap={{ scale: 0.88 }}
                    className={cn(
                      "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full transition-all relative overflow-hidden",
                      inputValue.trim()
                        ? "bg-red-600 text-white"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    )}
                  >
                    {inputValue.trim() && (
                      <motion.div
                        className="absolute inset-0 bg-red-700"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 0.3 }}
                      />
                    )}
                    <Send className="h-5 w-5 relative z-10" />
                  </motion.button>
                </div>
                <motion.p
                  className="mt-2 text-center text-xs text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  ✨ Powered by VTech AI
                </motion.p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

