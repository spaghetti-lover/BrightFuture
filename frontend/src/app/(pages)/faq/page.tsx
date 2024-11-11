"use client";
import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const FAQ = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState("");

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      setSubmitStatus("sending");
      // Simulate API call
      setTimeout(() => {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
      }, 1500);
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Liên hệ</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Bạn có thắc mắc về các giải pháp năng lượng mặt trời? Chúng tôi ở đây
          để giúp bạn. Hãy liên hệ với chúng tôi ngay hôm nay và tham gia cuộc
          cách mạng năng lượng tái tạo.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="space-y-8">
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Trụ sở</h2>
              {/* Placeholder for Map - Replace src with actual map embed URL */}
              <div className="w-full h-64 bg-gray-100 rounded-lg mb-6">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2836.537315738252!2d105.78072707379751!3d21.03811208746021!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab351d66d907%3A0x91ac3ecc2db0c654!2zxJDhuqFpIGjhu41jIFF14buRYyBnaWEgSMOgIE7hu5lpLzE0NCDEkC4gWHXDom4gVGjhu6d5LCBE4buLY2ggVuG7jW5nIEjhuq11LCBD4bqndSBHaeG6pXksIEjDoCBO4buZaSwgVmlldG5hbQ!5e1!3m2!1sen!2s!4v1731250722975!5m2!1sen!2s"
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Thông tin liên hệ
              </h2>

              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-purple-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Địa chỉ</h3>
                  <p className="text-gray-600">
                    E3, 144, Xuân Thủy, Cầu Giấy, Hà Nội
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-purple-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Điện thoại</h3>
                  <p className="text-gray-600">0334014436</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-purple-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">phungducanh2511@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Clock className="w-6 h-6 text-purple-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Giờ làm việc</h3>
                  <p className="text-gray-600">Thứ 2 - 6: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-600">Thứ 7: 10:00 AM - 4:00 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Gửi tin nhắn cho chúng tôi
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên bạn
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tin nhắn của bạn
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="How can we help you?"
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitStatus === "sending"}
                className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:bg-purple-400 flex items-center justify-center space-x-2"
              >
                {submitStatus === "sending" ? (
                  <>
                    <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
                    <span>Đang gửi...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Gửi tin</span>
                  </>
                )}
              </button>

              {submitStatus === "success" && (
                <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg">
                  Cảm ơn bạn đã liên hệ với chúng tôi. Chúng tôi sẽ phản hồi
                  nhanh nhất có thể.
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FAQ;
