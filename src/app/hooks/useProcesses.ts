import { useState, useEffect } from "react";
import apiClient from "../../api/client";

export function useProcesses() {
  const [processes, setProcesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProcesses = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/processes');
        setProcesses(response.data);
      } catch (err: any) {
        console.error("Failed to fetch processes:", err);
        setError(err.message || "Failed to fetch processes");
      } finally {
        setLoading(false);
      }
    };
    fetchProcesses();
  }, []);

  return { processes, loading, error };
}
