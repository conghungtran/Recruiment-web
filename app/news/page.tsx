"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Calendar, User, ArrowRight, Search, Clock, 
  TrendingUp, Filter, Sparkles, Eye 
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { newsArticles } from "@/data/news"
import Image from "next/image"

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

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Get unique categories
  const categories = useMemo(() => {
    return ["all", ...Array.from(new Set(newsArticles.map(a => a.category)))];
  }, []);

  // Filter articles
  const filteredArticles = useMemo(() => {
    return newsArticles.filter(article => {
      const matchesSearch = 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === "all" || article.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const featuredArticle = filteredArticles[0];
  const regularArticles = filteredArticles.slice(1)

  return (
    <div className="min-h-screen pt-16 lg:pt-20">
      {/* Hero Section - Enhanced with Visual Impact */}
      <section className="relative min-h-[500px] overflow-hidden border-b">
        {/* Background with Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-primary/85 z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&q=80')] bg-cover bg-center opacity-15" />
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
                <TrendingUp className="mr-1 h-3 w-3" />
                Latest Updates
              </Badge>
            </motion.div>

            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                News & Insights
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Stay updated with the latest developments, industry insights, and company milestones
              </p>
            </div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search articles by title, category, or keyword..."
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
              <span className="font-medium">Filter:</span>
            </div>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category === "all" ? "All News" : category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article - Hero Style */}
      {featuredArticle && (
        <section className="py-12 lg:py-16 bg-muted/20">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Link href={`/news/${featuredArticle.slug}`}>
                <Card className="card-underline text-primary overflow-hidden">
                  <div className="grid lg:grid-cols-2 gap-0">
                    {/* Image Section */}
                    <div className="relative h-80 lg:h-auto overflow-hidden">
                      <Image
                        src={featuredArticle.image}
                        alt={featuredArticle.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4 z-10">
                        <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-none shadow-lg">
                          <Sparkles className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                    </div>

                    {/* Content Section */}
                    <CardContent className="p-8 lg:p-12 flex flex-col justify-center space-y-6">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {featuredArticle.category}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{calculateReadingTime(featuredArticle.content)} min read</span>
                        </div>
                      </div>

                      <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
                        {featuredArticle.title}
                      </h2>

                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {featuredArticle.excerpt}
                      </p>

                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(featuredArticle.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>{featuredArticle.author}</span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <Button size="lg" className="group/btn">
                          Read Full Article
                          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Recent Articles Grid */}
      {regularArticles.length > 0 && (
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12 space-y-2"
            >
              <h2 className="text-3xl font-bold tracking-tight">
                Recent Articles
              </h2>
              <p className="text-muted-foreground">
                {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'} found
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {regularArticles.map((article) => (
                <motion.div key={article.id} variants={itemVariants}>
                  <Link href={`/news/${article.slug}`}>
                    <Card className="card-underline text-primary h-full overflow-hidden">
                      {/* Image */}
                      <div className="relative h-56 overflow-hidden">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>

                      <CardContent className="p-6 space-y-4">
                        {/* Meta Info */}
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="text-xs">
                            {article.category}
                          </Badge>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{calculateReadingTime(article.content)} min</span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-semibold tracking-tight line-clamp-2">
                          {article.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                          {article.excerpt}
                        </p>

                        {/* Footer */}
                        <div className="pt-4 border-t flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 text-primary hover:text-primary/80 group/btn"
                          >
                            Read more
                            <ArrowRight className="ml-1 h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* No Results State */}
      {filteredArticles.length === 0 && (
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-4 max-w-md mx-auto"
            >
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-semibold">No articles found</h3>
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
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
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
            className="max-w-3xl mx-auto text-center space-y-6 text-white"
          >
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm mb-4">
              <Eye className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
              Never Miss an Update
            </h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Subscribe to our newsletter and stay informed about the latest news, insights, and innovations from VTech
            </p>
            <div className="pt-4">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white hover:bg-white/90 text-primary font-semibold px-8 group"
                asChild
              >
                <Link href="/contact">
                  Subscribe Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
