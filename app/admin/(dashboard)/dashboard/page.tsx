"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Newspaper, 
  Briefcase, 
  FileText, 
  MessageSquare,
  TrendingUp,
  Users,
  Eye,
  Clock,
  Loader2
} from "lucide-react";
import { useJobs } from "@/hooks/use-jobs";
import { useApplications } from "@/hooks/use-applications";
import { newsArticles } from "@/data/news";
import { testimonials } from "@/data/testimonials";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function AdminDashboard() {
  const { jobs, loading: jobsLoading } = useJobs();
  const { applications, loading: appsLoading } = useApplications();

  const stats = [
    {
      title: "Total News",
      value: newsArticles.length,
      icon: Newspaper,
      description: `${newsArticles.filter(n => n.published).length} published`,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Job Openings",
      value: jobsLoading ? "..." : jobs.length,
      icon: Briefcase,
      description: jobsLoading ? "Loading..." : `${jobs.filter(j => j.featured).length} featured`,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Applications",
      value: appsLoading ? "..." : applications.length,
      icon: FileText,
      description: appsLoading ? "Loading..." : `${applications.filter(a => a.status === null).length} pending review`,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Testimonials",
      value: testimonials.length,
      icon: MessageSquare,
      description: `${testimonials.filter(t => t.published).length} published`,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const recentApplications = applications.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back! Here's an overview of your website management.
        </p>
      </div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat) => (
          <motion.div key={stat.title} variants={itemVariants}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <h3 className="text-3xl font-bold mt-2">{stat.value}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stat.description}
                    </p>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-lg`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Recent Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              {appsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
              ) : recentApplications.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  No applications yet
                </div>
              ) : (
                <div className="space-y-4">
                  {recentApplications.map((application) => (
                    <div
                      key={application.id}
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-sm">{application.fullName}</p>
                        <p className="text-xs text-muted-foreground">
                          {application.email}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            application.status === null
                              ? "bg-yellow-100 text-yellow-800"
                              : application.status === 1
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {application.status === null ? "Pending" : application.status === 1 ? "Approved" : "Rejected"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent News */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Newspaper className="w-5 h-5" />
                Recent News
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {newsArticles.slice(0, 5).map((article) => (
                  <div
                    key={article.id}
                    className="flex items-start justify-between p-3 rounded-lg border hover:bg-accent transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-sm line-clamp-1">
                        {article.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(article.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      {article.published ? (
                        <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                          Published
                        </span>
                      ) : (
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                          Draft
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <a
                href="/admin/news"
                className="flex flex-col items-center p-4 rounded-lg border hover:bg-accent transition-colors cursor-pointer"
              >
                <Newspaper className="w-8 h-8 text-primary mb-2" />
                <span className="text-sm font-medium">Manage News</span>
              </a>
              <a
                href="/admin/jobs"
                className="flex flex-col items-center p-4 rounded-lg border hover:bg-accent transition-colors cursor-pointer"
              >
                <Briefcase className="w-8 h-8 text-primary mb-2" />
                <span className="text-sm font-medium">Manage Jobs</span>
              </a>
              <a
                href="/admin/applications"
                className="flex flex-col items-center p-4 rounded-lg border hover:bg-accent transition-colors cursor-pointer"
              >
                <FileText className="w-8 h-8 text-primary mb-2" />
                <span className="text-sm font-medium">View Applications</span>
              </a>
              <a
                href="/admin/testimonials"
                className="flex flex-col items-center p-4 rounded-lg border hover:bg-accent transition-colors cursor-pointer"
              >
                <MessageSquare className="w-8 h-8 text-primary mb-2" />
                <span className="text-sm font-medium">Manage Testimonials</span>
              </a>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

