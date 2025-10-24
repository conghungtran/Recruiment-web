"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Mail, Phone, MapPin, Send, Clock, MessageSquare,
  CheckCircle2, Facebook, Twitter, Linkedin, Instagram,
  Copy, Check, MapPinned, Headphones, Zap
} from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    inquiryType: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log("Contact form submitted:", formData);

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: "", email: "", phone: "", company: "", inquiryType: "", message: "" });
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen pt-16 lg:pt-20">
      {/* Hero Section - Enhanced */}
      <section className="relative min-h-[500px] overflow-hidden border-b">
        {/* Background with Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-primary/85 z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&q=80')] bg-cover bg-center opacity-15" />
        </div>

        <div className="container relative z-10 mx-auto px-4 lg:px-8 py-20 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center space-y-8 text-white"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                <MessageSquare className="mr-1 h-3 w-3" />
                We're Here to Help
              </Badge>
            </motion.div>

            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Let's Start a Conversation
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Have a project in mind? Our team is ready to help you transform your ideas into reality
              </p>
            </div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-8 pt-4"
            >
              {[
                { icon: Clock, value: "< 24h", label: "Response Time" },
                { icon: Headphones, value: "24/7", label: "Support Available" },
                { icon: CheckCircle2, value: "500+", label: "Happy Clients" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm mb-2">
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards Section */}
      <section className="py-16 lg:py-20 bg-muted/20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Get in Touch
            </h2>
            <p className="text-muted-foreground text-lg">
              Choose your preferred way to reach us. We're here to answer your questions and discuss your project
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {/* Email Card */}
            <motion.div variants={itemVariants}>
              <Card className="card-underline text-primary h-full">
                <CardContent className="p-6 space-y-4">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                    <Mail className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Email Us</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Send us an email anytime
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between group/item">
                        <a href="mailto:info@vtech.com" className="text-sm font-medium text-primary hover:underline">
                          info@vtech.com
                        </a>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleCopy('info@vtech.com', 'email')}
                        >
                          {copiedEmail ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>Response within 24 hours</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Phone Card */}
            <motion.div variants={itemVariants}>
              <Card className="card-underline text-primary h-full">
                <CardContent className="p-6 space-y-4">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-green-500/10">
                    <Phone className="h-7 w-7 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Call Us</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Speak with our team directly
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between group/item">
                        <a href="tel:+15551234567" className="text-sm font-medium text-primary hover:underline">
                          +1 (555) 123-4567
                        </a>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleCopy('+1 (555) 123-4567', 'phone')}
                        >
                          {copiedPhone ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>Mon-Fri, 9AM-6PM PST</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Office Card */}
            <motion.div variants={itemVariants}>
              <Card className="card-underline text-primary h-full">
                <CardContent className="p-6 space-y-4">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-orange-500/10">
                    <MapPinned className="h-7 w-7 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Visit Us</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Come see us in person
                    </p>
                    <div className="space-y-2">
                      <p className="text-sm leading-relaxed">
                        123 Tech Street, Suite 400<br />
                        San Francisco, CA 94105<br />
                        United States
                      </p>
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <a href="#map" className="flex items-center justify-center gap-2">
                          <MapPin className="h-4 w-4" />
                          View on Map
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Send Us a Message
              </h2>
              <p className="text-muted-foreground text-lg">
                Fill out the form below and we'll get back to you as soon as possible
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="border-muted shadow-lg">
                <CardContent className="p-8 lg:p-10">
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12 space-y-4"
                    >
                      <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 mb-4">
                        <CheckCircle2 className="h-10 w-10 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">
                        Message Sent Successfully!
                      </h3>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        Thank you for reaching out. We'll get back to you within 24 hours.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Name & Email Row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="John Doe"
                            className="h-11"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="john@company.com"
                            className="h-11"
                          />
                        </div>
                      </div>

                      {/* Phone & Company Row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number (Optional)</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+1 (555) 000-0000"
                            className="h-11"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="company">Company Name (Optional)</Label>
                          <Input
                            id="company"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            placeholder="Your Company"
                            className="h-11"
                          />
                        </div>
                      </div>

                      {/* Inquiry Type */}
                      <div className="space-y-2">
                        <Label htmlFor="inquiryType">Type of Inquiry *</Label>
                        <Select
                          value={formData.inquiryType}
                          onValueChange={(value) => setFormData({ ...formData, inquiryType: value })}
                          required
                        >
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Please select..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="project">New Project</SelectItem>
                            <SelectItem value="support">Technical Support</SelectItem>
                            <SelectItem value="partnership">Partnership</SelectItem>
                            <SelectItem value="careers">Career Opportunities</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Message */}
                      <div className="space-y-2">
                        <Label htmlFor="message">Your Message *</Label>
                        <Textarea
                          id="message"
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Tell us about your project, requirements, or questions..."
                          rows={6}
                          className="resize-none"
                        />
                        <p className="text-xs text-muted-foreground">
                          {formData.message.length} / 1000 characters
                        </p>
                      </div>

                      <Separator />

                      {/* Submit Button */}
                      <Button 
                        type="submit" 
                        size="lg"
                        className="w-full group"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Zap className="mr-2 h-5 w-5 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            Send Message
                          </>
                        )}
                      </Button>

                      <p className="text-center text-sm text-muted-foreground">
                        By submitting this form, you agree to our privacy policy
                      </p>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-20 bg-muted/20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground text-lg">
                Quick answers to common questions about working with us
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              {[
                {
                  q: "What's your typical response time?",
                  a: "We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call us directly."
                },
                {
                  q: "Do you offer free consultations?",
                  a: "Yes! We offer a complimentary 30-minute consultation to discuss your project requirements and how we can help."
                },
                {
                  q: "What information should I include in my inquiry?",
                  a: "Please provide details about your project goals, timeline, budget range, and any specific technical requirements. The more information you share, the better we can assist you."
                },
                {
                  q: "Can I visit your office?",
                  a: "Absolutely! We welcome office visits. Please schedule an appointment in advance so we can ensure someone is available to meet with you."
                },
              ].map((faq, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="card-underline text-primary">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                      <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section id="map" className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto space-y-8"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">Visit Our Office</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Drop by our office for a coffee and a chat about your next big project
              </p>
            </div>

            <div className="rounded-xl overflow-hidden shadow-2xl border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0977736788845!2d-122.39868668468208!3d37.79018797975771!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085807c4e3b7f3b%3A0x6e8a4e5e5e5e5e5e!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="VTech Office Location"
              />
            </div>

            {/* Office Details Card */}
            <Card className="border-muted">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <MapPinned className="h-5 w-5 text-primary" />
                      Office Address
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      123 Tech Street, Suite 400<br />
                      San Francisco, CA 94105<br />
                      United States
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Business Hours
                    </h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Monday - Friday:</span>
                        <span className="font-medium">9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday:</span>
                        <span className="font-medium">10:00 AM - 4:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday:</span>
                        <span className="font-medium text-red-500">Closed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Social Media & CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold mb-4">Follow Us on Social Media</h2>
              <p className="text-primary-foreground/90 text-lg">
                Stay connected and get the latest updates, insights, and tech news
              </p>
            </div>

            <div className="flex justify-center gap-4 flex-wrap">
              {[
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Instagram, href: "#", label: "Instagram" },
              ].map((social, index) => (
                <Button
                  key={index}
                  variant="secondary"
                  size="lg"
                  className="gap-2"
                  asChild
                >
                  <a href={social.href} target="_blank" rel="noopener noreferrer">
                    <social.icon className="h-5 w-5" />
                    {social.label}
                  </a>
                </Button>
              ))}
            </div>

            <Separator className="bg-white/20" />

            <div className="space-y-4">
              <p className="text-primary-foreground/90">
                Have an urgent matter? Our team is available 24/7 for critical issues.
              </p>
              <Button variant="secondary" size="lg" className="gap-2" asChild>
                <a href="tel:+15551234567">
                  <Phone className="h-5 w-5" />
                  Call Emergency Line
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
