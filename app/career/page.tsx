"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, MapPin, Briefcase, Search, Send, Filter,
  Target, Users, Zap, Heart, Star, Quote, Clock,
  DollarSign, GraduationCap, Home, Plane, Laptop,
  FileCheck, Video, CheckCircle, Sparkles, Mail
} from "lucide-react";
import Link from "next/link";
import { jobs } from "@/data/careers";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import ApplicationForm from "@/components/career/application-form";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const ITEMS_PER_PAGE = 6;

export default function CareerPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState<{ id: string; title: string } | null>(null);

  // Get unique departments and locations
  const departments = useMemo(() => {
    return ["all", ...Array.from(new Set(jobs.map((j) => j.department)))];
  }, []);

  const locations = useMemo(() => {
    return ["all", ...Array.from(new Set(jobs.map((j) => j.location)))];
  }, []);

  // Filter jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDepartment =
        selectedDepartment === "all" || job.department === selectedDepartment;

      const matchesLocation =
        selectedLocation === "all" || job.location === selectedLocation;

      return matchesSearch && matchesDepartment && matchesLocation;
    });
  }, [searchTerm, selectedDepartment, selectedLocation]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedDepartment, selectedLocation]);

  // Pagination
  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedDepartment("all");
    setSelectedLocation("all");
    setCurrentPage(1);
  };

  const hasActiveFilters = searchTerm !== "" || selectedDepartment !== "all" || selectedLocation !== "all";

  return (
    <div className="min-h-screen pt-16 lg:pt-20">
      {/* Hero Section - Enhanced with Visual Impact */}
      <section className="relative min-h-[600px] overflow-hidden border-b">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-primary/80 z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80')] bg-cover bg-center opacity-20" />
        </div>

        <div className="container relative z-10 mx-auto px-4 lg:px-8 py-24 lg:py-32">
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
                We're Hiring!
              </Badge>
            </motion.div>

            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Build the Future <br className="hidden sm:block" />
                <span className="text-white/90">with VTech</span>
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Join 150+ talented professionals creating innovative technology solutions
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
                { value: jobs.length, label: "Open Positions" },
                { value: "150+", label: "Team Members" },
                { value: "12", label: "Countries" },
                { value: "4.8★", label: "Glassdoor Rating" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Search Bar - White on primary background */}
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
                  placeholder="Search jobs by title, department, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-14 pl-12 text-base bg-white/95 backdrop-blur-sm border-white/20 text-foreground"
                />
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* Filters Section - Separate white section */}
      <section className="border-b bg-background">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="h-4 w-4" />
              <span>Filter by:</span>
            </div>
            
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.filter(d => d !== "all").map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.filter(l => l !== "all").map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-sm"
              >
                Clear Filters
              </Button>
            )}
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              {searchTerm && (
                <Badge variant="secondary" className="gap-1">
                  Search: {searchTerm}
                </Badge>
              )}
              {selectedDepartment !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  Department: {selectedDepartment}
                </Badge>
              )}
              {selectedLocation !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  Location: {selectedLocation}
                </Badge>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Company Culture Section - NEW */}
      <section className="py-16 lg:py-24 bg-muted/20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 space-y-4"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Life at VTech</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Where innovation meets collaboration
            </p>
          </motion.div>

          {/* Core Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { 
                icon: Target, 
                title: "Innovation First", 
                desc: "Work with cutting-edge technologies on projects that matter",
                color: "text-blue-500"
              },
              { 
                icon: Users, 
                title: "Team Spirit", 
                desc: "Collaborate with talented professionals who inspire you",
                color: "text-green-500"
              },
              { 
                icon: Zap, 
                title: "Fast Growth", 
                desc: "Accelerate your career with mentorship and opportunities",
                color: "text-yellow-500"
              },
              { 
                icon: Heart, 
                title: "Work-Life Balance", 
                desc: "Flexible arrangements that respect your personal time",
                color: "text-red-500"
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="card-underline text-primary h-full text-center">
                  <CardContent className="p-6 space-y-4">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto">
                      <value.icon className={`h-8 w-8 ${value.color}`} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold tracking-tight">{value.title}</h3>
                      <p className="text-sm text-muted-foreground">{value.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b bg-muted/20">
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { label: "Open Positions", value: jobs.length.toString() },
              { label: "Departments", value: [...new Set(jobs.map((j) => j.department))].length.toString() },
              { label: "Locations", value: [...new Set(jobs.map((j) => j.location))].length.toString() },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="border-muted">
                  <CardContent className="p-6 text-center space-y-2">
                    <div className="text-4xl font-bold tracking-tight">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Employee Testimonials Section - NEW */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 space-y-4"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Hear From Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real stories from VTech employees about their journey and growth
            </p>
          </motion.div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Senior Software Engineer",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
                quote: "Joining VTech was the best career decision I've made. The team culture is amazing and I've grown more in 2 years here than my previous 5 years elsewhere.",
                rating: 5,
                tenure: "2 years at VTech"
              },
              {
                name: "Michael Rodriguez",
                role: "Product Manager",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
                quote: "The level of autonomy and trust here is incredible. I'm empowered to make decisions and drive real impact on products used by millions.",
                rating: 5,
                tenure: "3 years at VTech"
              },
              {
                name: "Priya Patel",
                role: "UX Designer",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
                quote: "VTech invests in its people. From workshops to conferences, I've had incredible opportunities to learn and grow my craft alongside talented designers.",
                rating: 5,
                tenure: "1.5 years at VTech"
              },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                      <Card className="card-underline text-primary h-full">
                  <CardContent className="p-8 space-y-6">
                    {/* Quote Icon */}
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <Quote className="h-6 w-6 text-primary" />
                    </div>

                    {/* Testimonial Quote */}
                    <p className="text-sm leading-relaxed text-foreground italic">
                      "{testimonial.quote}"
                    </p>

                    {/* Rating */}
                    <div className="flex gap-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    {/* Author Info */}
                    <div className="flex items-center gap-4 pt-4 border-t">
                      <Avatar className="h-14 w-14 border-2 border-primary/20">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {testimonial.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{testimonial.name}</div>
                        <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                        <div className="text-xs text-primary mt-1">{testimonial.tenure}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recruitment Process Timeline Section - NEW */}
      <section className="py-16 lg:py-24 border-t bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 space-y-4"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Hiring Process</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A transparent and efficient process designed to find the perfect fit
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
              {[
                {
                  step: "01",
                  icon: FileCheck,
                  title: "Apply",
                  description: "Submit your application and resume through our careers portal",
                  time: "5 min",
                  color: "text-blue-500"
                },
                {
                  step: "02",
                  icon: Mail,
                  title: "Review",
                  description: "Our team carefully reviews your application and background",
                  time: "3-5 days",
                  color: "text-green-500"
                },
                {
                  step: "03",
                  icon: Video,
                  title: "Interviews",
                  description: "Meet with the team through 2-3 rounds of interviews",
                  time: "1-2 weeks",
                  color: "text-orange-500"
                },
                {
                  step: "04",
                  icon: CheckCircle,
                  title: "Offer",
                  description: "Receive your offer and join the VTech family!",
                  time: "2-3 days",
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
                  {/* Connector Line (hidden on last item and mobile) */}
                  {index < 3 && (
                    <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/30 to-transparent -z-10" />
                  )}

                  <div className="flex flex-col items-center text-center space-y-4">
                    {/* Step Number Badge */}
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                      {phase.step}
                    </div>

                    {/* Icon Circle */}
                    <div className={`inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 border-2 border-primary/20 hover:scale-110 transition-transform`}>
                      <phase.icon className={`h-8 w-8 ${phase.color}`} />
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold tracking-tight">{phase.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {phase.description}
                      </p>
                      <div className="inline-flex items-center gap-1.5 text-xs text-primary font-medium">
                        <Clock className="h-3 w-3" />
                        {phase.time}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Total Time Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-12 text-center"
            >
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Average time to hire: <strong className="text-primary">2-3 weeks</strong></span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Job Listings Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          {filteredJobs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-lg text-muted-foreground">
                No positions found matching your search. Try different keywords.
              </p>
            </motion.div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-12 space-y-2"
              >
                <h2 className="text-3xl font-bold tracking-tight">
                  {filteredJobs.length} {filteredJobs.length === 1 ? "Position" : "Positions"} Available
                </h2>
                <p className="text-muted-foreground">
                  {filteredJobs.length > 0 ? (
                    totalPages > 1 ? (
                      <>Showing {startIndex + 1}-{Math.min(endIndex, filteredJobs.length)} of {filteredJobs.length} positions</>
                    ) : (
                      "Find your perfect role at VTech"
                    )
                  ) : (
                    "Try adjusting your filters"
                  )}
                </p>
              </motion.div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              >
                {paginatedJobs.map((job) => {
                  // Department icon mapping
                  const departmentIcons: Record<string, any> = {
                    "Engineering": Laptop,
                    "Infrastructure": Zap,
                    "Design": Heart,
                    "Project Management": Target,
                    "Data & Analytics": DollarSign,
                  };
                  
                  const departmentColors: Record<string, string> = {
                    "Engineering": "bg-blue-500/10 text-blue-600",
                    "Infrastructure": "bg-orange-500/10 text-orange-600",
                    "Design": "bg-pink-500/10 text-pink-600",
                    "Project Management": "bg-purple-500/10 text-purple-600",
                    "Data & Analytics": "bg-green-500/10 text-green-600",
                  };
                  
                  const DeptIcon = departmentIcons[job.department] || Briefcase;
                  const colorClass = departmentColors[job.department] || "bg-primary/10 text-primary";
                  
                  return (
                    <motion.div key={job.id} variants={itemVariants}>
                      <Card className="h-full hover:shadow-lg hover:border-primary/30 transition-all group border-muted relative overflow-hidden">
                        {/* Hot Badge for Featured Jobs */}
                        {job.featured && (
                          <div className="absolute top-4 right-4 z-10">
                            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-none shadow-lg">
                              <Sparkles className="h-3 w-3 mr-1" />
                              Hot
                            </Badge>
                          </div>
                        )}

                        <CardContent className="p-6 flex flex-col h-full space-y-4">
                          {/* Department Badge with Icon */}
                          <div className="flex items-center gap-3">
                            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${colorClass}`}>
                              <DeptIcon className="h-6 w-6" />
                            </div>
                            <div className="flex-1">
                              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                {job.department}
                              </span>
                            </div>
                          </div>

                          {/* Job Title */}
                          <h3 className="text-xl font-semibold tracking-tight line-clamp-2">
                            {job.title}
                          </h3>

                          {/* Location */}
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>{job.location}</span>
                          </div>

                          {/* Short Description */}
                          <p className="text-sm text-muted-foreground flex-grow line-clamp-2 leading-relaxed">
                            {job.shortDescription}
                          </p>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-3 pt-2">
                            <Button
                              onClick={() => setSelectedJob({ id: job.id, title: job.title })}
                              size="default"
                              className="flex-1 group-hover:shadow-md transition-shadow"
                            >
                              <Send className="h-4 w-4 mr-2" />
                              Apply Now
                            </Button>
                            <Link
                              href={`/career/${job.slug}`}
                              className="inline-flex items-center gap-2 text-sm font-medium text-primary whitespace-nowrap group/btn hover:gap-3 transition-all"
                            >
                              <span>Details</span>
                              <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="mt-12 flex justify-center"
                >
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                        // Show first page, last page, current page, and pages around current
                        if (
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1)
                        ) {
                          return (
                            <PaginationItem key={page}>
                              <PaginationLink
                                onClick={() => setCurrentPage(page)}
                                isActive={currentPage === page}
                                className="cursor-pointer"
                              >
                                {page}
                              </PaginationLink>
                            </PaginationItem>
                          )
                        } else if (page === currentPage - 2 || page === currentPage + 2) {
                          return (
                            <PaginationItem key={page}>
                              <PaginationEllipsis />
                            </PaginationItem>
                          )
                        }
                        return null;
                      })}

                      <PaginationItem>
                        <PaginationNext
                          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Benefits & Perks Section - Enhanced */}
      <section className="border-y bg-muted/20">
        <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 space-y-4"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Benefits & Perks</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We invest in our team's success, well-being, and happiness
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: DollarSign,
                title: "Competitive Salary",
                description: "Market-leading compensation packages with performance bonuses and equity options",
                highlight: "Top 10% in industry",
                color: "text-green-500"
              },
              {
                icon: GraduationCap,
                title: "Learning Budget",
                description: "$2,000 annual budget for courses, conferences, books, and certifications",
                highlight: "Upskill freely",
                color: "text-blue-500"
              },
              {
                icon: Home,
                title: "Remote Flexibility",
                description: "Hybrid work model with flexible hours and home office setup allowance",
                highlight: "Work your way",
                color: "text-purple-500"
              },
              {
                icon: Heart,
                title: "Health & Wellness",
                description: "Comprehensive health insurance, gym membership, and mental health support",
                highlight: "Family covered",
                color: "text-red-500"
              },
              {
                icon: Plane,
                title: "Time Off",
                description: "25 days paid vacation, unlimited sick leave, and parental leave programs",
                highlight: "Recharge fully",
                color: "text-orange-500"
              },
              {
                icon: Laptop,
                title: "Latest Tech",
                description: "Choose your MacBook Pro or high-end laptop plus accessories budget",
                highlight: "Your choice",
                color: "text-gray-600"
              },
              {
                icon: Users,
                title: "Team Events",
                description: "Monthly team activities, annual retreats, and celebration budgets",
                highlight: "Build bonds",
                color: "text-yellow-500"
              },
              {
                icon: Target,
                title: "Career Growth",
                description: "Clear career paths, mentorship programs, and promotion opportunities",
                highlight: "Level up fast",
                color: "text-indigo-500"
              },
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Card className="card-underline text-primary h-full relative overflow-hidden">
                  {/* Highlight Badge */}
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="text-[10px] font-medium bg-primary/10 text-primary border-primary/20">
                      {benefit.highlight}
                    </Badge>
                  </div>

                  <CardContent className="p-6 space-y-4">
                    {/* Icon */}
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                      <benefit.icon className={`h-7 w-7 ${benefit.color}`} />
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <h3 className="text-base font-semibold tracking-tight">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-muted-foreground">
              And many more perks including stock options, referral bonuses, and team lunches 🎉
            </p>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section - NEW */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90">
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
            className="max-w-4xl mx-auto text-center space-y-8"
          >
            {/* Social Proof - Team Photos */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center -space-x-4 mb-6"
            >
              {[
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop",
              ].map((avatar, i) => (
                <Avatar key={i} className="h-14 w-14 border-4 border-primary hover:scale-110 transition-transform">
                  <AvatarImage src={avatar} alt={`Team member ${i + 1}`} />
                  <AvatarFallback className="bg-white/20 text-white">T{i + 1}</AvatarFallback>
                </Avatar>
              ))}
              <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-primary bg-white/20 text-white font-semibold text-sm hover:scale-110 transition-transform">
                +145
              </div>
            </motion.div>

            <div className="space-y-6 text-white">
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Ready to Make an Impact?
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                Join 150+ innovators building the future of technology. Your next chapter starts here.
              </p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
            >
              <Button
                size="lg"
                variant="secondary"
                className="bg-white hover:bg-white/90 text-primary font-semibold px-8 group"
                asChild
              >
                <a href="#job-listings">
                  View Open Positions
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm px-8"
                asChild
              >
                <a href="mailto:careers@vtech.com">
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Recruiting Team
                </a>
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="pt-8 flex flex-wrap justify-center gap-8 text-white/80 text-sm"
            >
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-white text-white" />
                <span>4.8/5 on Glassdoor</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>ISO 9001 Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>150+ Team Members</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span>Fast-Growing Company</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Application Dialog */}
      <Dialog open={!!selectedJob} onOpenChange={(open) => !open && setSelectedJob(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedJob && (
            <ApplicationForm
              jobTitle={selectedJob.title}
              jobId={selectedJob.id}
              onClose={() => setSelectedJob(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

