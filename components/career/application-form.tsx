"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface ApplicationFormProps {
  jobTitle: string;
  jobId: string;
  onClose?: () => void;
}

export default function ApplicationForm({ jobTitle, jobId, onClose }: ApplicationFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    linkedIn: "",
    portfolioUrl: "",
    coverLetter: "",
    yearsOfExperience: "",
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [cvId, setCvId] = useState<string | null>(null);
  const [trackingToken, setTrackingToken] = useState<string | null>(null);
  const [step, setStep] = useState<number>(1);
  const draftKey = `application_draft_${jobId}`;

  // Load draft
  useEffect(() => {
    try {
      const raw = localStorage.getItem(draftKey);
      if (raw) {
        const d = JSON.parse(raw);
        if (d && d.formData) {
          setFormData((prev) => ({ ...prev, ...d.formData }));
        }
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draftKey]);

  // Autosave
  useEffect(() => {
    try {
      localStorage.setItem(draftKey, JSON.stringify({ formData }));
    } catch {}
  }, [formData, draftKey]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, resume: "File size must be less than 5MB" }));
        return;
      }
      // Validate file type
      const allowedTypes = [".pdf", ".doc", ".docx"];
      const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
      if (!allowedTypes.includes(fileExtension)) {
        setErrors((prev) => ({ ...prev, resume: "Only PDF, DOC, or DOCX files are allowed" }));
        return;
      }
      setResumeFile(file);
      setErrors((prev) => ({ ...prev, resume: "" }));
    }
  };

  const removeFile = () => {
    setResumeFile(null);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!resumeFile) {
      newErrors.resume = "Resume/CV is required";
    }

    if (!formData.coverLetter.trim()) {
      newErrors.coverLetter = "Cover letter is required";
    } else if (formData.coverLetter.trim().length < 50) {
      newErrors.coverLetter = "Cover letter must be at least 50 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Prepare FormData for submission
      const formDataToSend = new FormData();
      formDataToSend.append("fullName", formData.fullName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("jobId", jobId);
      if (resumeFile) {
        formDataToSend.append("cvFile", resumeFile);
      }

      // Submit to API
      const response = await fetch("/api/applications/submit", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();

      if (result.success) {
        try { localStorage.removeItem(draftKey); } catch {}
        setSubmitStatus("success");
        // Store CV ID for redirect
        if (result.data?.id) {
          setCvId(result.data.id.toString());
          if (result.data?.candidate_token) setTrackingToken(result.data.candidate_token);
          // Redirect to processing page after 2 seconds
          setTimeout(() => {
            router.push(`/cv-processing/${result.data.id}`);
          }, 2000);
        }
      } else {
        setSubmitStatus("error");
        setErrors({ submit: result.message || "Failed to submit application" });
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      setSubmitStatus("error");
      setErrors({ submit: "An error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-2xl font-bold mb-2 text-foreground">Application Submitted!</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Thank you for applying for the {jobTitle} position. We're now processing your CV...
        </p>
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" />
          <p className="text-sm">Redirecting to processing page...</p>
        </div>
        {trackingToken && (
          <p className="text-xs text-muted-foreground mt-4">Mã theo dõi hồ sơ: <code>{trackingToken}</code> (giữ lại để tra cứu trạng thái)</p>
        )}
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground">Apply for {jobTitle}</h3>
        <p className="text-sm text-muted-foreground">Fill out the form below to submit your application. Fields marked with * are required.</p>
        <div className="flex items-center gap-2 text-sm">
          {[1,2,3].map((s)=> (
            <div key={s} className={`flex-1 h-1 rounded ${step>=s? 'bg-primary':'bg-muted'}`}></div>
          ))}
        </div>
      </div>

      {/* Step 1: Personal Information */}
      <AnimatePresence>
        {step === 1 && (
          <motion.div initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-8}} className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">Personal Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">
              Full Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="John Doe"
              className={errors.fullName ? "border-destructive" : ""}
            />
            {errors.fullName && (
              <p className="text-xs text-destructive">{errors.fullName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              Email Address <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="john.doe@example.com"
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">
              Phone Number <span className="text-destructive">*</span>
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+84 123 456 789"
              className={errors.phone ? "border-destructive" : ""}
            />
            {errors.phone && (
              <p className="text-xs text-destructive">{errors.phone}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="yearsOfExperience">Experience</Label>
            <Input
              id="yearsOfExperience"
              name="yearsOfExperience"
              value={formData.yearsOfExperience}
              onChange={handleInputChange}
              placeholder="e.g., 5 years, 6 months, 2 years 3 months"
            />
            <p className="text-xs text-muted-foreground">
              Enter your relevant work experience (e.g., "2 years", "6 months", "1 year 3 months")
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="linkedIn">LinkedIn Profile</Label>
            <Input
              id="linkedIn"
              name="linkedIn"
              value={formData.linkedIn}
              onChange={handleInputChange}
              placeholder="https://linkedin.com/in/johndoe"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="portfolioUrl">Portfolio / Website</Label>
            <Input
              id="portfolioUrl"
              name="portfolioUrl"
              value={formData.portfolioUrl}
              onChange={handleInputChange}
              placeholder="https://johndoe.com"
            />
          </div>
        </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step 2: Links & Experience */}
      <AnimatePresence>
        {step === 2 && (
          <motion.div initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-8}} className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">Links & Experience</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="yearsOfExperience">Experience</Label>
                <Input id="yearsOfExperience" name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleInputChange} placeholder="e.g., 5 years, 6 months, 2 years 3 months" />
                <p className="text-xs text-muted-foreground">Enter your relevant work experience (e.g., "2 years", "6 months", "1 year 3 months")</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedIn">LinkedIn Profile</Label>
                <Input id="linkedIn" name="linkedIn" value={formData.linkedIn} onChange={handleInputChange} placeholder="https://linkedin.com/in/johndoe" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="portfolioUrl">Portfolio / Website</Label>
                <Input id="portfolioUrl" name="portfolioUrl" value={formData.portfolioUrl} onChange={handleInputChange} placeholder="https://johndoe.com" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step 3: Resume & Cover Letter */}
      <AnimatePresence>
        {step === 3 && (
          <motion.div initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-8}} className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">Resume & Cover Letter</h4>
            {/* Resume Upload */}
            <div className="space-y-2">
        <Label htmlFor="resume">
          Resume / CV <span className="text-destructive">*</span>
        </Label>
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            errors.resume ? "border-destructive" : "border-border hover:border-primary"
          }`}
        >
          {!resumeFile ? (
            <label htmlFor="resume" className="cursor-pointer block">
              <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-foreground mb-1">
                <span className="text-primary font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">PDF, DOC, DOCX (max 5MB)</p>
              <input
                id="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">{resumeFile.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={removeFile}
                className="text-destructive hover:text-destructive"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
        {errors.resume && (
          <p className="text-xs text-destructive">{errors.resume}</p>
        )}
            </div>

            {/* Cover Letter */}
            <div className="space-y-2">
        <Label htmlFor="coverLetter">
          Cover Letter <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="coverLetter"
          name="coverLetter"
          value={formData.coverLetter}
          onChange={handleInputChange}
          placeholder="Tell us why you're a great fit for this position..."
          rows={6}
          className={errors.coverLetter ? "border-destructive" : ""}
        />
        <div className="flex justify-between items-center">
          {errors.coverLetter ? (
            <p className="text-xs text-destructive">{errors.coverLetter}</p>
          ) : (
            <p className="text-xs text-muted-foreground">Minimum 50 characters</p>
          )}
          <p className="text-xs text-muted-foreground">{formData.coverLetter.length} characters</p>
        </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit Error */}
      {submitStatus === "error" && (
        <div className="flex items-center gap-2 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <AlertCircle className="w-5 h-5 text-destructive" />
          <p className="text-sm text-destructive">
            Something went wrong. Please try again or contact us at careers@vtech.com
          </p>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-3 pt-4">
        {step > 1 && (
          <Button type="button" variant="outline" onClick={() => setStep((s) => Math.max(1, s - 1))}>Back</Button>
        )}
        {step < 3 && (
          <Button type="button" onClick={() => setStep((s) => Math.min(3, s + 1))} className="ml-auto">Next</Button>
        )}
        {step === 3 && (
          <Button type="submit" className="ml-auto" disabled={isSubmitting}>
            {isSubmitting ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" />Submitting...</>) : ("Submit Application")}
          </Button>
        )}
        {onClose && (
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        )}
      </div>
    </form>
  );
}

