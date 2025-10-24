import { useState, useEffect } from "react";

export interface JobFromAPI {
  id: number;
  job_title: string;
  company: string;
  location: string;
  salary: string;
  job_type: string;
  description: string;
  requirements: string;
  benefits: string;
  contact_email: string;
  deadline: string;
  experience: string;
  working_hours: string;
  submission_time: string;
  source: string;
  link_apply: string;
}

export interface Job {
  id: string;
  slug: string;
  title: string;
  location: string;
  department: string;
  shortDescription: string;
  description: string;
  requirements: string[];
  benefits: string[];
  featured: boolean;
}

// Transform backend job to frontend job format
function transformJob(apiJob: JobFromAPI): Job {
  // Create slug from job title
  const slug = apiJob.job_title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  // Parse requirements and benefits (assume they're newline-separated or comma-separated)
  const requirements = apiJob.requirements
    ? apiJob.requirements.split(/\n|,/).map((r) => r.trim()).filter(Boolean)
    : [];
  const benefits = apiJob.benefits
    ? apiJob.benefits.split(/\n|,/).map((b) => b.trim()).filter(Boolean)
    : [];

  return {
    id: apiJob.id.toString(),
    slug,
    title: apiJob.job_title,
    location: apiJob.location,
    department: apiJob.job_type || "General", // Use job_type as department
    shortDescription: apiJob.description
      ? apiJob.description.substring(0, 150) + "..."
      : "",
    description: apiJob.description || "",
    requirements,
    benefits,
    featured: false, // You can add logic to determine featured status
  };
}

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true);
        const response = await fetch("/api/jobs");
        const data = await response.json();

        if (data.success && data.items) {
          const transformedJobs = data.items.map(transformJob);
          setJobs(transformedJobs);
        } else {
          setError(data.message || "Failed to fetch jobs");
          setJobs([]);
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to fetch jobs");
        setJobs([]);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  return { jobs, loading, error, refetch: () => setLoading(true) };
}
