"use client"

import { useState } from "react"
import { notFound } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { 
  Calendar, User, Clock, ArrowLeft, Share2, 
  Facebook, Twitter, Linkedin, Link as LinkIcon,
  Tag, ChevronRight
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { newsArticles, getNewsBySlug } from "@/data/news"

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

interface PageProps {
  params: {
    slug: string
  }
}

export default function NewsArticlePage({ params }: PageProps) {
  const [copied, setCopied] = useState(false);
  const article = getNewsBySlug(params.slug);

  if (!article) {
    notFound();
  }

  // Get related articles (same category, excluding current)
  const relatedArticles = newsArticles
    .filter(a => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnSocial = (platform: string) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(article.title);
    
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    };
    
    window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400');
  };

  return (
    <div className="min-h-screen pt-16 lg:pt-20">
      {/* Back Navigation */}
      <section className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <Link href="/news">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to News
            </Button>
          </Link>
        </div>
      </section>

      {/* Hero Image */}
      <section className="relative h-[400px] lg:h-[600px] overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Floating Content */}
        <div className="container absolute inset-x-0 bottom-0 mx-auto px-4 lg:px-8 pb-12 lg:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <Badge className="bg-primary text-primary-foreground">
                {article.category}
              </Badge>
              <div className="flex items-center gap-2 text-white/90 text-sm">
                <Clock className="h-4 w-4" />
                <span>{calculateReadingTime(article.content)} min read</span>
              </div>
            </div>

            <h1 className="text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {article.title}
            </h1>

            <div className="flex items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span className="font-medium">{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>
                  {new Date(article.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-8"
            >
              <div className="prose prose-lg max-w-none">
                {/* Excerpt */}
                <p className="text-xl text-muted-foreground leading-relaxed mb-8 font-medium">
                  {article.excerpt}
                </p>

                <Separator className="my-8" />

                {/* Main Content */}
                <div className="space-y-6 text-foreground leading-relaxed whitespace-pre-line">
                  {article.content}
                </div>
              </div>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t">
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Tag className="h-4 w-4" />
                    <span className="font-medium">Tags:</span>
                  </div>
                  <Badge variant="outline">{article.category}</Badge>
                  <Badge variant="outline">Technology</Badge>
                  <Badge variant="outline">Innovation</Badge>
                </div>
              </div>
            </motion.article>

            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-4 space-y-8"
            >
              {/* Share Card */}
              <Card className="sticky top-24">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Share2 className="h-5 w-5" />
                    Share Article
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => shareOnSocial('facebook')}
                      className="gap-2"
                    >
                      <Facebook className="h-4 w-4" />
                      Facebook
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => shareOnSocial('twitter')}
                      className="gap-2"
                    >
                      <Twitter className="h-4 w-4" />
                      Twitter
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => shareOnSocial('linkedin')}
                      className="gap-2"
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyLink}
                      className="gap-2"
                    >
                      <LinkIcon className="h-4 w-4" />
                      {copied ? 'Copied!' : 'Copy Link'}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Author Info */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <User className="h-5 w-5" />
                    About the Author
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Written by <strong className="text-foreground">{article.author}</strong>
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Expert contributor sharing insights and updates from VTech's team of professionals.
                  </p>
                </CardContent>
              </Card>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-16 lg:py-24 bg-muted/20 border-t">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold tracking-tight mb-2">
                Related Articles
              </h2>
              <p className="text-muted-foreground">
                More from {article.category}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map((relatedArticle, index) => (
                <motion.div
                  key={relatedArticle.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/news/${relatedArticle.slug}`}>
                    <Card className="h-full hover:shadow-lg hover:border-primary/30 transition-all duration-300 group overflow-hidden">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={relatedArticle.image}
                          alt={relatedArticle.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <CardContent className="p-6 space-y-3">
                        <Badge variant="secondary" className="text-xs">
                          {relatedArticle.category}
                        </Badge>
                        <h3 className="text-lg font-semibold tracking-tight group-hover:text-primary transition-colors line-clamp-2">
                          {relatedArticle.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {relatedArticle.excerpt}
                        </p>
                        <div className="flex items-center text-sm text-primary font-medium pt-2 group/btn">
                          Read article
                          <ChevronRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center space-y-6"
          >
            <h2 className="text-3xl lg:text-4xl font-bold">
              Stay Informed
            </h2>
            <p className="text-lg text-primary-foreground/90">
              Subscribe to our newsletter for the latest news and insights
            </p>
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="font-semibold"
            >
              <Link href="/contact">
                Subscribe Now
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
