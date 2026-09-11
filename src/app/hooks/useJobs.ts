import { useState, useEffect } from "react";
import apiClient from "../../api/client";

export function useJobs() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/jobs');
        setJobs(response.data);
      } catch (err: any) {
        console.error("Failed to fetch jobs:", err);
        setError(err.message || "Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return { jobs, loading, error };
}
