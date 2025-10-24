"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  ArrowRight, Code, Cloud, Shield, Zap, BarChart, TrendingUp,
  Search, Check, Sparkles, Target, Users, Lightbulb,
  Rocket, Award, ChevronRight, Filter
} from "lucide-react"
import { services, getFeaturedServices } from "@/data/services"

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

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const iconMap: any = {
    code: Code,
    cloud: Cloud,
    shield: Shield,
    cog: Zap,
    chart: BarChart,
    "trending-up": TrendingUp,
  };

  // Get unique categories
  const categories = useMemo(() => {
    return ["all", ...Array.from(new Set(services.map(s => s.category)))];
  }, []);

  // Filter services
  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const matchesSearch = 
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === "all" || service.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const featuredServices = getFeaturedServices();

  return (
    <div className="min-h-screen pt-16 lg:pt-20">
      {/* Hero Section - Enhanced */}
      <section className="relative min-h-[600px] overflow-hidden border-b">
        {/* Background with Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-primary/85 z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&q=80')] bg-cover bg-center opacity-15" />
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
                <Sparkles className="mr-1 h-3 w-3" />
                Premium IT Solutions
              </Badge>
            </motion.div>

            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Services That Drive <br className="hidden sm:block" />
                Digital Excellence
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Comprehensive IT solutions designed to transform your business and accelerate innovation
              </p>
            </div>

            {/* Value Props */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-8 pt-4"
            >
              {[
                { icon: Target, label: "Tailored Solutions" },
                { icon: Users, label: "Expert Team" },
                { icon: Award, label: "Proven Results" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-14 pl-12 text-base bg-white/95 backdrop-blur-sm border-white/20 text-foreground"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="border-b bg-background sticky top-16 lg:top-20 z-20">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap">
              <Filter className="h-4 w-4" />
              <span className="font-medium">Category:</span>
            </div>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category === "all" ? "All Services" : category}
              </Button>
            ))}
            <div className="ml-auto text-sm text-muted-foreground whitespace-nowrap">
              {filteredServices.length} {filteredServices.length === 1 ? 'service' : 'services'}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      {featuredServices.length > 0 && searchTerm === "" && selectedCategory === "all" && (
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
                Featured Services
              </h2>
              <p className="text-muted-foreground text-lg">
                Our most popular and comprehensive solutions
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {featuredServices.slice(0, 2).map((service, index) => {
                const Icon = iconMap[service.icon] || Code;
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                  >
                    <Card className="card-underline text-primary h-full overflow-hidden">
                      <div className="grid lg:grid-cols-2 gap-0">
                        <div className="relative h-80 lg:h-auto overflow-hidden">
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/60 to-transparent" />
                          <div className="absolute top-4 left-4 z-10">
                            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-none shadow-lg">
                              <Sparkles className="h-3 w-3 mr-1" />
                              Popular
                            </Badge>
                          </div>
                          <div className="absolute bottom-4 left-4 z-10">
                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-background/90 backdrop-blur-sm shadow-lg">
                              <Icon className="h-7 w-7 text-primary" />
                            </div>
                          </div>
                        </div>

                        <CardContent className="p-8 flex flex-col justify-center space-y-4">
                          <Badge variant="secondary" className="w-fit">
                            {service.category}
                          </Badge>

                          <h3 className="text-2xl font-bold tracking-tight">
                            {service.title}
                          </h3>

                          <p className="text-muted-foreground leading-relaxed">
                            {service.shortDescription}
                          </p>

                          {service.benefits && service.benefits.length > 0 && (
                            <ul className="space-y-2">
                              {service.benefits.slice(0, 3).map((benefit, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm">
                                  <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                  <span className="text-muted-foreground">{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          )}

                          <Button size="lg" className="w-full group/btn" asChild>
                            <Link href={`/services/${service.slug}`}>
                              Explore Service
                              <ChevronRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                          </Button>
                        </CardContent>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* All Services Grid */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          {filteredServices.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 space-y-4 max-w-md mx-auto"
            >
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-semibold">No services found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
              >
                Clear Filters
              </Button>
            </motion.div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12 max-w-3xl mx-auto"
              >
                <h2 className="text-3xl font-bold tracking-tight mb-4">
                  {searchTerm || selectedCategory !== "all" ? "Search Results" : "All Our Services"}
                </h2>
                <p className="text-muted-foreground text-lg">
                  Professional solutions tailored to your business needs
                </p>
              </motion.div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredServices.map((service) => {
                  const Icon = iconMap[service.icon] || Code;
                  return (
                    <motion.div key={service.id} variants={itemVariants}>
                      <Link href={`/services/${service.slug}`}>
                        <Card className="card-underline text-primary h-full overflow-hidden">
                          <div className="aspect-video relative overflow-hidden bg-muted">
                            <Image
                              src={service.image}
                              alt={service.title}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                            <div className="absolute bottom-4 left-4 z-10">
                              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-background/90 backdrop-blur-sm shadow-lg">
                                <Icon className="h-6 w-6 text-primary" />
                              </div>
                            </div>
                            {service.featured && (
                              <div className="absolute top-4 right-4 z-10">
                                <Badge className="bg-primary text-primary-foreground">
                                  Featured
                                </Badge>
                              </div>
                            )}
                          </div>

                          <CardContent className="p-6 space-y-4">
                            <div className="flex items-center justify-between">
                              <Badge variant="secondary" className="text-xs">
                                {service.category}
                              </Badge>
                            </div>

                            <h3 className="text-xl font-semibold tracking-tight line-clamp-2">
                              {service.title}
                            </h3>

                            <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                              {service.shortDescription}
                            </p>

                            <div className="pt-4 border-t flex items-center justify-between">
                              <span className="text-sm font-medium text-primary group/btn flex items-center">
                                Learn More
                                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                              </span>
                              {service.technologies && (
                                <span className="text-xs text-muted-foreground">
                                  {service.technologies.length}+ Technologies
                                </span>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            </>
          )}
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-16 lg:py-24 bg-muted/20 border-y">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Our Proven Process
            </h2>
            <p className="text-muted-foreground text-lg">
              A structured approach to delivering exceptional results
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
              {[
                {
                  step: "01",
                  icon: Lightbulb,
                  title: "Discovery",
                  description: "We analyze your needs and define project scope",
                  color: "text-blue-500"
                },
                {
                  step: "02",
                  icon: Target,
                  title: "Strategy",
                  description: "Develop tailored solutions and roadmap",
                  color: "text-green-500"
                },
                {
                  step: "03",
                  icon: Rocket,
                  title: "Implementation",
                  description: "Execute with agile methodology and best practices",
                  color: "text-orange-500"
                },
                {
                  step: "04",
                  icon: Award,
                  title: "Support",
                  description: "Ongoing optimization and continuous improvement",
                  color: "text-purple-500"
                },
              ].map((phase, index) => (
                <motion.div
                  key={phase.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative"
                >
                  {/* Connector Line */}
                  {index < 3 && (
                    <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/30 to-transparent -z-10" />
                  )}

                  <div className="flex flex-col items-center text-center space-y-4">
                    {/* Step Badge */}
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                      {phase.step}
                    </div>

                    {/* Icon */}
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 border-2 border-primary/20 hover:scale-110 transition-transform">
                      <phase.icon className={`h-8 w-8 ${phase.color}`} />
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold tracking-tight">{phase.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {phase.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container relative z-10 mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto text-center space-y-8 text-white"
          >
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-5xl font-bold tracking-tight">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                Let's discuss how our services can help you achieve your goals and drive innovation
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white hover:bg-white/90 text-primary font-semibold px-8 group"
                asChild
              >
                <Link href="/contact">
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm px-8"
                asChild
              >
                <Link href="/about">
                  Learn More About Us
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-8 flex flex-wrap justify-center gap-8 text-white/80 text-sm"
            >
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4" />
                <span>500+ Projects Delivered</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4" />
                <span>98% Client Satisfaction</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4" />
                <span>24/7 Support Available</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

