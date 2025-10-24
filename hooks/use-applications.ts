import { useState, useEffect } from "react";

export interface CVApplication {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  file: {
    originalName: string;
    storedName: string;
    path: string;
    size: number;
    mimetype: string;
  };
  status: number | null;
  uploadedAt: string;
  interview_status?: string | null;
  interview_time?: string | null;
}

export function useApplications() {
  const [applications, setApplications] = useState<CVApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/applications");
      const data = await response.json();

      if (data.success && data.items) {
        setApplications(data.items);
      } else {
        setError(data.message || "Failed to fetch applications");
        setApplications([]);
      }
    } catch (err) {
      console.error("Error fetching applications:", err);
      setError("Failed to fetch applications");
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return { applications, loading, error, refetch: fetchApplications };
}
