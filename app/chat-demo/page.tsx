import { MessageCircle, Sparkles, Zap, Shield } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat Widget Demo - VTech AI Assistant",
  description: "Trải nghiệm chat widget AI hiện đại với giao diện đẹp mắt và dễ sử dụng",
};

export default function ChatDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            Chat Widget Demo
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            VTech AI Assistant
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Trải nghiệm chat widget AI hiện đại với giao diện đẹp mắt và dễ sử dụng.
            Nhấn vào nút chat góc phải dưới để bắt đầu!
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 mb-4">
              <MessageCircle className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Giao diện đẹp
            </h3>
            <p className="text-gray-600">
              Thiết kế hiện đại với Framer Motion animation mượt mà
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600 mb-4">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Phản hồi nhanh
            </h3>
            <p className="text-gray-600">
              Trả lời tức thì, không cần đợi đợi backend
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600 mb-4">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Dễ tích hợp
            </h3>
            <p className="text-gray-600">
              Chỉ cần import component là có thể sử dụng ngay
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <MessageCircle className="h-6 w-6 text-blue-600" />
            Hướng dẫn sử dụng
          </h2>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Nhấn vào nút chat
                </h3>
                <p className="text-gray-600">
                  Tìm nút chat màu xanh ở góc phải dưới màn hình và nhấn vào
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Nhập tin nhắn
                </h3>
                <p className="text-gray-600">
                  Gõ bất kỳ câu hỏi nào vào ô chat và nhấn Enter hoặc nút gửi
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Nhận phản hồi
                </h3>
                <p className="text-gray-600">
                  AI sẽ trả lời ngay lập tức (hiện tại là phản hồi demo)
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>💡 Lưu ý:</strong> Đây là giao diện demo frontend. Backend AI thực sẽ được tích hợp sau.
              Xem file <code className="bg-blue-100 px-2 py-1 rounded">components/chat-widget-readme.md</code> để biết cách tích hợp.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col items-center gap-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-6 rounded-2xl shadow-xl">
            <MessageCircle className="h-12 w-12" />
            <p className="text-xl font-semibold">
              Chat widget đang chờ bạn ở góc phải dưới! 👇
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

