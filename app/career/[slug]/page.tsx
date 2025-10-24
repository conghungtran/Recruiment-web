"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Briefcase, CheckCircle, Mail, ExternalLink, Building2 } from "lucide-react";
import { getJobBySlug, getAllJobSlugs } from "@/data/careers";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ApplicationForm from "@/components/career/application-form";

export default function JobDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const job = getJobBySlug(slug);
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);

  if (!job) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Job Not Found</h1>
          <p className="text-muted-foreground mb-8">The position you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/career">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Careers
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleApply = () => {
    setIsApplicationOpen(true);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            href="/career"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Positions</span>
          </Link>
        </motion.div>

        {/* Job Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-card to-primary/5">
            <CardContent className="p-8 md:p-12">
              <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Briefcase className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-primary uppercase tracking-wide">
                      {job.department}
                    </span>
                  </div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
                    {job.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-5 h-5" />
                      <span>{job.department} Department</span>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={handleApply}
                  size="lg"
                  className="shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Mail className="mr-2 w-5 h-5" />
                  Apply Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Job Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-foreground">About This Role</h2>
              <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {job.description}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Requirements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-foreground">Requirements</h2>
              <ul className="space-y-3">
                {job.requirements.map((requirement, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-1">
                      <CheckCircle className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{requirement}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-foreground">Benefits & Perks</h2>
              <ul className="space-y-3">
                {job.benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-1">
                      <CheckCircle className="w-5 h-5 text-accent" />
                    </div>
                    <span className="text-muted-foreground">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Apply CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Ready to Join Our Team?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                If you're passionate about technology and ready to make an impact, we'd love to hear from you.
                Click the button below to apply for this position.
              </p>
              <Button
                onClick={handleApply}
                size="lg"
                className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Mail className="mr-2 w-5 h-5" />
                Apply for {job.title}
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Questions? Email us at{" "}
                <a href="mailto:careers@vtech.com" className="text-primary hover:underline">
                  careers@vtech.com
                </a>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Application Dialog */}
      <Dialog open={isApplicationOpen} onOpenChange={setIsApplicationOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <ApplicationForm
            jobTitle={job.title}
            jobId={job.id}
            onClose={() => setIsApplicationOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

