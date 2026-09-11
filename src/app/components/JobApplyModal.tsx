import { useState } from "react";
import { motion } from "motion/react";
import apiClient from "../../api/client";

export function JobApplyModal({ job, onClose }: { job: any; onClose: () => void }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    coverLetter: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!formData.fullName || !formData.email || !formData.phone) {
      setError("Please fill out all required fields.");
      return;
    }
    setIsSubmitting(true);
    setError('');
    try {
      await apiClient.post('/applications', {
        jobId: job._id || "unknown", // in case it's missing
        jobTitle: job.title,
        ...formData
      });
      setSuccess(true);
      setTimeout(() => onClose(), 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to submit application.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="rounded-2xl p-8 w-full max-w-lg"
        style={{ background: "#0a1628", border: "1px solid var(--primary-accent)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="mb-1" style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "22px", color: "#e8f4ff" }}>Apply — {job.title}</h3>
        <p className="text-sm mb-6" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>{job.type} · {job.location}</p>
        
        {success ? (
          <div className="text-green-400 text-center py-8">
            <h4 className="text-xl font-bold mb-2">Application Submitted!</h4>
            <p className="text-sm">Thank you for applying. We will be in touch soon.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <input value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} placeholder="Full Name" className="w-full px-4 py-2.5 rounded-lg text-sm outline-none" style={{ background: "#0d1f3c", border: "1px solid var(--primary-accent-glow)", color: "#e8f4ff", fontFamily: "Inter, sans-serif" }} />
            <input value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="Email Address" className="w-full px-4 py-2.5 rounded-lg text-sm outline-none" style={{ background: "#0d1f3c", border: "1px solid var(--primary-accent-glow)", color: "#e8f4ff", fontFamily: "Inter, sans-serif" }} />
            <input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="Phone Number" className="w-full px-4 py-2.5 rounded-lg text-sm outline-none" style={{ background: "#0d1f3c", border: "1px solid var(--primary-accent-glow)", color: "#e8f4ff", fontFamily: "Inter, sans-serif" }} />
            
            <textarea value={formData.coverLetter} onChange={e => setFormData({...formData, coverLetter: e.target.value})} placeholder="Cover Letter (optional)" rows={3} className="w-full px-4 py-2.5 rounded-lg text-sm outline-none resize-none" style={{ background: "#0d1f3c", border: "1px solid var(--primary-accent-glow)", color: "#e8f4ff", fontFamily: "Inter, sans-serif" }} />
            
            <div className="flex gap-3 mt-2">
              <button 
                onClick={handleSubmit} 
                disabled={isSubmitting}
                className="flex-1 py-2.5 rounded-lg text-sm flex items-center justify-center gap-2 disabled:opacity-70 transition-all" 
                style={{ background: "var(--primary-gradient)", color: "#fff", fontFamily: "Inter, sans-serif" }}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </button>
              <button onClick={onClose} disabled={isSubmitting} className="px-5 py-2.5 rounded-lg text-sm disabled:opacity-50" style={{ border: "1px solid var(--primary-accent)", color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>Cancel</button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
