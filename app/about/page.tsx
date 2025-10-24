"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowRight, Code, Cloud, Shield, Users, CheckCircle, Zap, Award, 
  Target, Globe, Lightbulb, Heart, Rocket, Eye, TrendingUp,
  Calendar, MapPin, Mail, Sparkles, Star, Trophy, Building2,
  Play, Quote, Handshake, Brain, Clock, DollarSign
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { companyStats, getFeaturedTeamMembers } from "@/data/company"
import { getFeaturedServices } from "@/data/services"
import { Counter } from "@/components/ui/counter"

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

export default function AboutPage() {
  const services = getFeaturedServices().slice(0, 4)
  const teamMembers = getFeaturedTeamMembers().slice(0, 6)

  const milestones = [
    { year: "2014", title: "Company Founded", description: "VTech started with a vision to transform businesses through technology" },
    { year: "2017", title: "100+ Clients", description: "Reached milestone of serving over 100 satisfied clients" },
    { year: "2020", title: "Global Expansion", description: "Expanded operations to serve clients across multiple continents" },
    { year: "2023", title: "Industry Leader", description: "Recognized as a leading technology solutions provider" },
  ];

  const coreValues = [
    {
      icon: Heart,
      title: "Client-Centric",
      description: "Your success is our success. We prioritize understanding and exceeding client expectations.",
      color: "text-red-500"
    },
    {
      icon: Rocket,
      title: "Innovation",
      description: "We embrace cutting-edge technologies and creative thinking to solve complex challenges.",
      color: "text-blue-500"
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for the highest quality in everything we do, exceeding expectations.",
      color: "text-yellow-500"
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "We work together with clients and partners as one unified team.",
      color: "text-green-500"
    },
  ];

  const achievements = [
    { icon: Trophy, label: "Best IT Solutions 2023", issuer: "Tech Excellence Awards" },
    { icon: Star, label: "ISO 27001 Certified", issuer: "Information Security" },
    { icon: Award, label: "Top Employer 2024", issuer: "Industry Recognition" },
    { icon: CheckCircle, label: "98% Client Satisfaction", issuer: "Customer Reviews" },
  ]

  const whyChooseUs = [
    {
      icon: Brain,
      title: "Deep Technical Expertise",
      description: "10+ years of experience with cutting-edge technologies and proven methodologies"
    },
    {
      icon: Clock,
      title: "Fast Time-to-Market",
      description: "Agile development process ensures rapid delivery without compromising quality"
    },
    {
      icon: Shield,
      title: "Enterprise-Grade Security",
      description: "ISO 27001 certified with comprehensive security practices and compliance"
    },
    {
      icon: Users,
      title: "Dedicated Support",
      description: "24/7 support team ready to assist you at every stage of your journey"
    },
    {
      icon: DollarSign,
      title: "Cost-Effective Solutions",
      description: "Competitive pricing with transparent billing and no hidden costs"
    },
    {
      icon: Handshake,
      title: "Long-term Partnership",
      description: "We're committed to your success beyond project completion"
    }
  ]

  const testimonials = [
    {
      name: "Jennifer Smith",
      role: "CEO, TechCorp Inc.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
      quote: "VTech transformed our legacy systems into a modern, scalable platform. Their expertise and dedication exceeded our expectations.",
      rating: 5
    },
    {
      name: "Robert Johnson",
      role: "CTO, FinanceHub",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
      quote: "Working with VTech was a game-changer. They delivered our project on time and within budget, with exceptional quality.",
      rating: 5
    },
    {
      name: "Maria Garcia",
      role: "Product Manager, InnovateLabs",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
      quote: "The team's technical skills and communication made our collaboration seamless. Highly recommend VTech for any tech project.",
      rating: 5
    }
  ]

  const trustedClients = [
    { name: "Microsoft", logo: "https://cdn.worldvectorlogo.com/logos/microsoft-5.svg" },
    { name: "Amazon", logo: "https://cdn.worldvectorlogo.com/logos/amazon-icon-1.svg" },
    { name: "Google", logo: "https://cdn.worldvectorlogo.com/logos/google-icon.svg" },
    { name: "Apple", logo: "https://cdn.worldvectorlogo.com/logos/apple-11.svg" },
    { name: "IBM", logo: "https://cdn.worldvectorlogo.com/logos/ibm-1.svg" },
    { name: "Oracle", logo: "https://cdn.worldvectorlogo.com/logos/oracle-6.svg" }
  ]

  return (
    <div className="min-h-screen pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[700px] overflow-hidden border-b">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80')] bg-cover bg-center opacity-5" />
        </div>

        <div className="container relative z-10 mx-auto px-4 lg:px-8 py-24 lg:py-32">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-8 mb-16"
            >
              <Badge className="bg-primary/10 text-primary border-primary/20">
                <Building2 className="mr-1 h-3 w-3" />
                Est. 2014
              </Badge>

              <div className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  Transforming Ideas <br className="hidden sm:block" />
                  Into Digital Reality
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  For over a decade, we've been empowering businesses worldwide with innovative technology solutions that drive growth, efficiency, and success.
                </p>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              <div className="text-center space-y-2">
                <div className="text-4xl md:text-5xl font-bold">
                  <Counter end={companyStats.years} duration={2000} suffix="+" />
                </div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-4xl md:text-5xl font-bold">
                  <Counter end={companyStats.projects} duration={2500} suffix="+" />
                </div>
                <div className="text-sm text-muted-foreground">Completed Projects</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-4xl md:text-5xl font-bold">
                  <Counter end={companyStats.teamMembers} duration={2200} suffix="+" />
                </div>
                <div className="text-sm text-muted-foreground">Team Members</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-4xl md:text-5xl font-bold">
                  <Counter end={98} duration={2000} suffix="%" />
                </div>
                <div className="text-sm text-muted-foreground">Client Satisfaction</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 lg:py-32 bg-muted/20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group"
            >
              <Card className="card-underline text-primary h-full">
                <CardContent className="p-8 lg:p-12 space-y-6">
                  <div>
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10">
                      <Target className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
                      Our Mission
                    </h2>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      To empower businesses worldwide with innovative technology solutions that drive digital transformation, enhance operational efficiency, and create sustainable competitive advantages.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group"
            >
              <Card className="card-underline text-primary h-full">
                <CardContent className="p-8 lg:p-12 space-y-6">
                  <div>
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10">
                      <Eye className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
                      Our Vision
                    </h2>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      To be the global leader in technology innovation, recognized for delivering exceptional value and transforming how businesses operate in the digital age.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-muted-foreground">
              A decade of innovation, growth, and delivering exceptional value to our clients
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-primary/20" />

              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    {/* Content */}
                    <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
                <Card className="card-underline text-primary">
                        <CardContent className="p-6 space-y-2">
                          <Badge className="bg-primary/10 text-primary border-primary/20">
                              {milestone.year}
                            </Badge>
                            <h3 className="text-xl font-semibold tracking-tight">
                              {milestone.title}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {milestone.description}
                            </p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Center Dot */}
                    <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 lg:py-32 bg-muted/20 border-y">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              What Sets Us Apart
            </h2>
            <p className="text-lg text-muted-foreground">
              We combine technical excellence with genuine care for your success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="card-underline text-primary h-full">
                  <CardContent className="p-6 space-y-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Introduction */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <Badge className="w-fit bg-primary/10 text-primary border-primary/20">Watch Our Story</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
                See VTech in Action
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Get an inside look at how we work, our office culture, and hear directly from our team about what makes VTech a special place to work and partner with.
                </p>
                <p>
                  In this 2-minute video, discover our approach to innovation, collaboration, and delivering exceptional results for our clients.
                </p>
              </div>
              <div className="flex gap-4">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Modern Work Environment</h4>
                  <p className="text-sm text-muted-foreground">Collaborative spaces designed for innovation</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Diverse & Talented Team</h4>
                  <p className="text-sm text-muted-foreground">Experts from various backgrounds and specialties</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
                <Image
                  src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80"
                  alt="VTech Office Video"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:bg-white transition-all duration-300 shadow-2xl">
                    <Play className="h-10 w-10 text-primary ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-sm font-medium mb-1">Company Introduction</p>
                  <p className="text-xs text-white/80">2:15 minutes</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story - Who We Are */}
      <section className="py-20 lg:py-32 bg-muted/20 border-y">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <Badge className="w-fit">Our Story</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
                Built on Innovation, Driven by Passion
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2014 by a team of technology enthusiasts, VTech began with a simple yet powerful vision: to make cutting-edge technology accessible to businesses of all sizes. What started as a small consultancy has grown into a full-service technology partner, serving clients across 12 countries.
                </p>
                <p>
                  Today, we're proud to be at the forefront of digital transformation, helping organizations navigate complex technological landscapes with confidence. Our success is built on the foundation of technical excellence, unwavering commitment to our clients, and a culture that celebrates innovation.
                </p>
                <p>
                  Every project we undertake is an opportunity to push boundaries, challenge conventions, and deliver solutions that make a real difference in how businesses operate and grow.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button asChild>
                  <Link href="/services">
                    Explore Our Services
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/news">Latest News</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                  alt="VTech Team"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <p className="text-lg font-semibold">"Technology is best when it brings people together."</p>
                  <p className="text-sm text-white/80 mt-2">- VTech Team</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-muted-foreground">
              The principles that guide everything we do
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {coreValues.map((value) => (
              <motion.div key={value.title} variants={itemVariants}>
                <Card className="card-underline text-primary h-full text-center">
                  <CardContent className="p-6 space-y-4">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto">
                      <value.icon className={`h-8 w-8 ${value.color}`} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold tracking-tight">{value.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-20 lg:py-32 bg-muted/20 border-y">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Meet the People Behind VTech
            </h2>
            <p className="text-lg text-muted-foreground">
              A diverse team of passionate innovators, designers, and engineers dedicated to your success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Sarah Chen",
                role: "Chief Executive Officer",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
                quote: "Innovation happens when we dare to dream big and work together."
              },
              {
                name: "Michael Rodriguez",
                role: "Chief Technology Officer",
                image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&q=80",
                quote: "Technology should empower, not complicate. That's our promise."
              },
              {
                name: "Emily Watson",
                role: "Head of Design",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
                quote: "Great design is invisible - it just works beautifully."
              },
              {
                name: "David Park",
                role: "Lead Developer",
                image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
                quote: "Clean code is not just about function, it's about craft."
              },
              {
                name: "Jessica Martinez",
                role: "Client Success Manager",
                image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80",
                quote: "Your success is our success. We're in this together."
              },
              {
                name: "Alex Thompson",
                role: "Security Specialist",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
                quote: "Security isn't a feature, it's a fundamental right."
              }
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="card-underline text-primary overflow-hidden rounded-xl">
                  <CardContent className="p-0">
                    <div className="relative h-80 overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80" />
                      
                      {/* Info overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-3">
                        <div>
                          <h3 className="text-xl font-bold">{member.name}</h3>
                          <p className="text-sm text-white/80">{member.role}</p>
                        </div>
                        <p className="text-sm italic text-white/90 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          "{member.quote}"
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Culture */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              A Place Where Ideas Thrive
            </h2>
            <p className="text-lg text-muted-foreground">
              We believe that the best work happens in an environment that fosters creativity, collaboration, and growth
            </p>
          </motion.div>

          {/* Culture Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-12">
            {[
              {
                title: "Collaborative Workspace",
                image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
                description: "Open spaces designed for teamwork and innovation"
              },
              {
                title: "Team Building",
                image: "https://images.unsplash.com/photo-1528605105345-5344ea20e269?w=600&q=80",
                description: "Regular activities that strengthen our bonds"
              },
              {
                title: "Learning & Development",
                image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80",
                description: "Continuous growth through workshops and training"
              },
              {
                title: "Work-Life Balance",
                image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80",
                description: "Flexible schedules that respect your personal time"
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="card-underline text-primary overflow-hidden rounded-xl">
                  <CardContent className="p-0">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-sm text-white/90">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Culture Values Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="card-underline text-primary">
              <CardContent className="p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div className="space-y-2">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mx-auto">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg">People First</h3>
                    <p className="text-sm text-muted-foreground">We value and invest in our team's growth and well-being</p>
                  </div>
                  <div className="space-y-2">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mx-auto">
                      <Lightbulb className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg">Innovation Daily</h3>
                    <p className="text-sm text-muted-foreground">Every day is an opportunity to innovate and improve</p>
                  </div>
                  <div className="space-y-2">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mx-auto">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg">Passion Driven</h3>
                    <p className="text-sm text-muted-foreground">We love what we do and it shows in our work</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-20 lg:py-32 bg-muted/20 border-y">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-muted-foreground">
              Don't just take our word for it - hear from the businesses we've helped transform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="card-underline text-primary h-full">
                  <CardContent className="p-6 space-y-4">
                    
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed italic">
                      "{testimonial.quote}"
                    </p>

                    <div className="flex items-center gap-4 pt-4 border-t">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/20">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Partners */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Industry-Leading Companies Trust Us
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We're proud to partner with some of the world's most innovative organizations
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center max-w-5xl mx-auto"
          >
            {trustedClients.map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center justify-center p-6 hover:scale-110 transition-transform duration-300"
              >
                <div className="relative h-12 w-24 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Achievements & Certifications */}
      <section className="py-20 lg:py-32 bg-muted/20 border-y">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Achievements & Recognition
            </h2>
            <p className="text-lg text-muted-foreground">
              Industry recognition and certifications that validate our expertise
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="card-underline text-primary text-center">
                  <CardContent className="p-6 space-y-4">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mx-auto">
                      <achievement.icon className="h-7 w-7 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-sm">{achievement.label}</h3>
                      <p className="text-xs text-muted-foreground">{achievement.issuer}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90">
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
                Let's Build Something Amazing Together
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                Partner with VTech to transform your business with innovative technology solutions
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
                  Get in Touch
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm px-8"
                asChild
              >
                <Link href="/services">
                  Explore Our Services
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
