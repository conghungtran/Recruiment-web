"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function EditJobPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    job_title: "",
    company: "",
    location: "",
    salary: "",
    job_type: "Full-time",
    description: "",
    requirements: "",
    benefits: "",
    contact_email: "",
    deadline: "",
    experience: "",
    working_hours: "",
    link_apply: "",
  });

  useEffect(() => {
    async function fetchJob() {
      try {
        const response = await fetch(`/api/jobs/${params.id}`);
        const result = await response.json();

        if (result.success && result.data) {
          setFormData({
            job_title: result.data.job_title || "",
            company: result.data.company || "",
            location: result.data.location || "",
            salary: result.data.salary || "",
            job_type: result.data.job_type || "Full-time",
            description: result.data.description || "",
            requirements: result.data.requirements || "",
            benefits: result.data.benefits || "",
            contact_email: result.data.contact_email || "",
            deadline: result.data.deadline || "",
            experience: result.data.experience || "",
            working_hours: result.data.working_hours || "",
            link_apply: result.data.link_apply || "",
          });
        } else {
          toast({
            title: "Error!",
            description: "Failed to load job data.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error fetching job:", error);
        toast({
          title: "Error!",
          description: "An error occurred while loading the job.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }

    if (params.id) {
      fetchJob();
    }
  }, [params.id, toast]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/jobs/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Success!",
          description: "Job updated successfully.",
        });
        router.push("/admin/jobs");
      } else {
        toast({
          title: "Error!",
          description: result.message || "Failed to update job.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating job:", error);
      toast({
        title: "Error!",
        description: "An error occurred while updating the job.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/jobs">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Edit Job</h1>
          <p className="text-muted-foreground mt-2">
            Update job posting information
          </p>
        </div>
      </div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Job Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="job_title">
                    Job Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="job_title"
                    name="job_title"
                    value={formData.job_title}
                    onChange={handleChange}
                    placeholder="e.g. Senior Full Stack Developer"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">
                    Company <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g. VTech Digital"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">
                    Location <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Ho Chi Minh City, Vietnam"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salary">
                    Salary <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="salary"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    placeholder="e.g. $2000 - $3000"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="job_type">Job Type</Label>
                  <Select
                    value={formData.job_type}
                    onValueChange={(value) =>
                      handleSelectChange("job_type", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Experience Level</Label>
                  <Input
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="e.g. 3+ years"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="working_hours">Working Hours</Label>
                  <Input
                    id="working_hours"
                    name="working_hours"
                    value={formData.working_hours}
                    onChange={handleChange}
                    placeholder="e.g. 8:00 AM - 5:00 PM"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline">Application Deadline</Label>
                  <Input
                    id="deadline"
                    name="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact_email">
                    Contact Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="contact_email"
                    name="contact_email"
                    type="email"
                    value={formData.contact_email}
                    onChange={handleChange}
                    placeholder="e.g. hr@vtech.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="link_apply">
                    Application Link <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="link_apply"
                    name="link_apply"
                    type="url"
                    value={formData.link_apply}
                    onChange={handleChange}
                    placeholder="e.g. https://vtech.com/apply"
                    required
                  />
                </div>
              </div>

              {/* Detailed Information */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Job Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the role, responsibilities, and what you're looking for..."
                    rows={6}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">Requirements</Label>
                  <Textarea
                    id="requirements"
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    placeholder="List the requirements (separate by new lines)..."
                    rows={6}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="benefits">Benefits</Label>
                  <Textarea
                    id="benefits"
                    name="benefits"
                    value={formData.benefits}
                    onChange={handleChange}
                    placeholder="List the benefits and perks..."
                    rows={6}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 pt-4">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Update Job
                    </>
                  )}
                </Button>
                <Link href="/admin/jobs">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </form>
      </motion.div>
    </div>
  );
}
