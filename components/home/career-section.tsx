"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Briefcase, Send } from "lucide-react";
import Link from "next/link";
import { getFeaturedJobs } from "@/data/careers";
import { Button } from "@/components/ui/button";
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
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function CareerSection() {
  const featuredJobs = getFeaturedJobs();
  const [selectedJob, setSelectedJob] = useState<{ id: string; title: string } | null>(null);

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Join Our Team
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Build your career with VTech. Explore exciting opportunities and work on innovative projects with talented professionals.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuredJobs.map((job) => (
            <motion.div
              key={job.id}
              variants={itemVariants}
              className="group"
            >
              <div className="bg-card border border-border rounded-xl p-6 h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-primary/50">
                {/* Department Badge */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Briefcase className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs font-medium text-primary uppercase tracking-wide">
                    {job.department}
                  </span>
                </div>

                {/* Job Title */}
                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {job.title}
                </h3>

                {/* Location */}
                <div className="flex items-center gap-2 mb-4 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{job.location}</span>
                </div>

                {/* Short Description */}
                <p className="text-muted-foreground text-sm mb-6 flex-grow line-clamp-3">
                  {job.shortDescription}
                </p>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  <Button
                    onClick={() => setSelectedJob({ id: job.id, title: job.title })}
                    size="sm"
                    className="flex-1"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Quick Apply
                  </Button>
                  <Link
                    href={`/career/${job.slug}`}
                    className="inline-flex items-center gap-2 text-primary font-semibold text-sm group/btn hover:gap-3 transition-all duration-300"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Jobs CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/career"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span>View All Positions</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>

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
    </section>
  );
}

