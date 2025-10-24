"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ServiceCard } from "@/components/ui/service-card"
import { NewsCard } from "@/components/ui/news-card"
import { TestimonialCard } from "@/components/ui/testimonial-card"
import { ArrowRight, Code, Cloud, Shield, Users, CheckCircle, Zap, Award, Star } from "lucide-react"
import { motion } from "framer-motion"
import CareerSection from "@/components/home/career-section"
import { getFeaturedServices } from "@/data/services"
import { getPublishedTestimonials } from "@/data/testimonials"
import { getPublishedNews } from "@/data/news"
import { companyStats, partners } from "@/data/company"
import { Counter } from "@/components/ui/counter"

export default function HomePage() {
  const services = getFeaturedServices().slice(0, 4)
  const testimonials = getPublishedTestimonials().slice(0, 3)
  const newsArticles = getPublishedNews().slice(0, 3)
  const featuredPartners = partners

  const advantages = [
    {
      icon: Zap,
      title: "Rapid Delivery",
      description: "Agile methodologies ensure fast, iterative development and quick time-to-market.",
    },
    {
      icon: Award,
      title: "Expert Team",
      description: "Certified professionals with deep expertise across multiple technology domains.",
    },
    {
      icon: CheckCircle,
      title: "Proven Track Record",
      description: "500+ successful projects delivered for clients across various industries.",
    },
  ]

  return (
    <div className="min-h-screen pt-16 lg:pt-20">
      {/* Hero Section with Video Background */}
      <section className="min-h-[600px] flex items-center border-b bg-gray-900 relative overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
          <source src="/videos/hero-bg.webm" type="video/webm" />
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="container mx-auto px-4 lg:px-8 py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-3xl mx-auto text-center space-y-8"
          >
            {/* Badge */}
            <Badge className="bg-primary/10 text-primary border-0 w-fit mx-auto">
              <Star className="w-3 h-3 mr-1" />
              Trusted by 500+ Companies
            </Badge>
            
            {/* Headline */}
            <h1 className="text-5xl lg:text-6xl font-bold text-white tracking-tight">
              Transform Your Business with Technology
            </h1>
            
            {/* Subheading */}
            <p className="text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed">
              We deliver enterprise-grade IT solutions that drive growth and innovation
            </p>
            
            {/* CTA */}
            <div className="flex gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center mb-16 space-y-3"
          >
            <h2 className="text-4xl font-bold text-gray-900">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive solutions for your business needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
            {services.map((service, index) => {
              const IconMap: any = { code: Code, cloud: Cloud, shield: Shield, chart: Users }
              const ServiceIcon = IconMap[service.icon] || Code
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                >
                  <ServiceCard
                    title={service.title}
                    description={service.shortDescription}
                    category={service.category}
                    icon={ServiceIcon}
                    href={`/services/${service.slug}`}
                  />
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Our Clients Section */}
      <section className="py-16 lg:py-24 bg-white border-b overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 mb-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-3"
          >
            <h2 className="text-4xl font-bold text-gray-900">Trusted by Vietnam's Leading Companies</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From banks to tech giants, enterprises trust VTech for digital transformation
            </p>
          </motion.div>
        </div>

        {/* Infinite Scroll Animation */}
        <div className="relative">
          {/* Gradient fade on left */}
          <div className="absolute left-0 top-0 bottom-0 w-12 lg:w-24 bg-gradient-to-r from-white via-white to-transparent z-20"></div>
          {/* Gradient fade on right */}
          <div className="absolute right-0 top-0 bottom-0 w-12 lg:w-24 bg-gradient-to-l from-white via-white to-transparent z-20"></div>

          <motion.div
            className="flex gap-8 lg:gap-12 py-8"
            initial={{ x: 0 }}
            animate={{ x: -500 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {/* Double the logos for seamless loop */}
            {[...featuredPartners, ...featuredPartners].map((partner, index) => (
          <motion.a
            key={`${partner.id}-${index}`}
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex-shrink-0 flex items-center justify-center transition-opacity duration-300"
              >
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    title={partner.name}
                    className="h-12 lg:h-16 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                  />
                  <p className="text-xs text-gray-600 text-center font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    {partner.category}
                  </p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose VTech Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center mb-16 space-y-3"
          >
            <h2 className="text-4xl font-bold text-gray-900">Why Choose VTech?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We deliver exceptional value through innovation, expertise, and commitment
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                className="flex flex-col items-center gap-4 text-center"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-muted">
                  <advantage.icon className="h-6 w-6" strokeWidth={2} aria-hidden />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">{advantage.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{advantage.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* News Highlights Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center mb-16 space-y-3"
          >
            <h2 className="text-4xl font-bold text-gray-900">Latest Updates</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay informed about our latest developments and industry insights
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 auto-rows-fr">
            {newsArticles.map((article, index) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              >
                <NewsCard
                  title={article.title}
                  excerpt={article.excerpt}
                  category={article.category}
                  date={new Date(article.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                  image={article.image}
                  slug={article.slug}
                  featured={article.featured}
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Button asChild variant="outline">
              <Link href="/news">
                View All News <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>



      {/* Client Testimonials Section */}
      <section className="py-16 lg:py-24 border-y bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 space-y-3"
          >
            <h2 className="text-4xl font-bold text-gray-900">What Our Clients Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Trusted by leading organizations worldwide
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <TestimonialCard
                  name={testimonial.name}
                  position={testimonial.position}
                  testimonial={testimonial.testimonial}
                  rating={testimonial.rating}
                />
              </motion.div>
            ))}
          </div>


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <div className="flex items-center justify-center gap-8">
              <div className="text-center space-y-1">
                <div className="text-3xl font-bold text-primary">
                  <Counter end={companyStats.clients} duration={2000} suffix="+" />
                </div>
                <div className="text-sm text-gray-600">Happy Clients</div>
              </div>
              <div className="h-12 w-px bg-border"></div>
              <div className="text-center space-y-1">
                <div className="text-3xl font-bold text-primary">
                  <Counter end={companyStats.projects} duration={2500} suffix="+" />
                </div>
                <div className="text-sm text-gray-600">Completed Projects</div>
              </div>
              <div className="h-12 w-px bg-border"></div>
              <div className="text-center space-y-1">
                <div className="text-3xl font-bold text-primary">
                  <Counter end={companyStats.years} duration={2000} suffix="+" />
                </div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Career Section */}
      <CareerSection />

      {/* CTA Section */}
      <section className="border-y bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center space-y-6"
          >
            <h2 className="text-3xl font-bold text-gray-900">Let's Build the Future Together</h2>
            <p className="text-lg text-gray-600">
              Ready to transform your business with innovative IT solutions? Get in touch with our team today.
            </p>
            <Button asChild size="lg">
              <Link href="/contact">
                Contact Us <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
