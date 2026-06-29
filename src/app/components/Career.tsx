import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Wifi, TrendingUp, Sparkles, Heart, ChevronDown, MapPin, Clock, ArrowRight } from "lucide-react";
import apiClient from "../../api/client";

const perks = [
  { icon: Wifi, label: "Remote Friendly", desc: "Work from anywhere in the world." },
  { icon: TrendingUp, label: "Growth Opportunities", desc: "Mentorship, courses, and career paths." },
  { icon: Sparkles, label: "Exciting Projects", desc: "Real-world products that ship globally." },
  { icon: Heart, label: "Collaborative Culture", desc: "A team that lifts each other up." },
];

// Jobs will be fetched from API

function JobApplyModal({ job, onClose }: { job: any; onClose: () => void }) {
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
        style={{ background: "#0a1628", border: "1px solid rgba(0,170,255,0.2)" }}
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
            <input value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} placeholder="Full Name" className="w-full px-4 py-2.5 rounded-lg text-sm outline-none" style={{ background: "#0d1f3c", border: "1px solid rgba(0,170,255,0.15)", color: "#e8f4ff", fontFamily: "Inter, sans-serif" }} />
            <input value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="Email Address" className="w-full px-4 py-2.5 rounded-lg text-sm outline-none" style={{ background: "#0d1f3c", border: "1px solid rgba(0,170,255,0.15)", color: "#e8f4ff", fontFamily: "Inter, sans-serif" }} />
            <input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="Phone Number" className="w-full px-4 py-2.5 rounded-lg text-sm outline-none" style={{ background: "#0d1f3c", border: "1px solid rgba(0,170,255,0.15)", color: "#e8f4ff", fontFamily: "Inter, sans-serif" }} />
            
            <textarea value={formData.coverLetter} onChange={e => setFormData({...formData, coverLetter: e.target.value})} placeholder="Cover Letter (optional)" rows={3} className="w-full px-4 py-2.5 rounded-lg text-sm outline-none resize-none" style={{ background: "#0d1f3c", border: "1px solid rgba(0,170,255,0.15)", color: "#e8f4ff", fontFamily: "Inter, sans-serif" }} />
            
            <div className="flex gap-3 mt-2">
              <button 
                onClick={handleSubmit} 
                disabled={isSubmitting}
                className="flex-1 py-2.5 rounded-lg text-sm flex items-center justify-center gap-2 disabled:opacity-70 transition-all" 
                style={{ background: "linear-gradient(135deg, #0077cc, #00d4ff)", color: "#fff", fontFamily: "Inter, sans-serif" }}
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
              <button onClick={onClose} disabled={isSubmitting} className="px-5 py-2.5 rounded-lg text-sm disabled:opacity-50" style={{ border: "1px solid rgba(0,170,255,0.2)", color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>Cancel</button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export function Career() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [applyJob, setApplyJob] = useState<any | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await apiClient.get('/jobs');
        setJobs(response.data);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <section id="career" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs mb-4" style={{ background: "rgba(0,170,255,0.08)", border: "1px solid rgba(0,170,255,0.2)", color: "#00aaff", fontFamily: "JetBrains Mono, monospace" }}>
            Join Our Team
          </div>
          <h2 style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#e8f4ff" }}>
            Build the <span style={{ background: "linear-gradient(90deg, #00aaff, #00d4ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Future</span> With Us
          </h2>
          <p className="mt-3 text-sm max-w-xl mx-auto" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>
            We're always looking for talented people who love building things that matter.
          </p>
        </motion.div>

        {/* Perks */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {perks.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl p-5 text-center"
                style={{ background: "linear-gradient(135deg, rgba(13,31,60,0.6), rgba(10,22,40,0.8))", border: "1px solid rgba(0,170,255,0.1)" }}
              >
                <div className="w-11 h-11 rounded-lg flex items-center justify-center mx-auto mb-3" style={{ background: "rgba(0,170,255,0.1)", border: "1px solid rgba(0,170,255,0.2)" }}>
                  <Icon size={20} style={{ color: "#00aaff" }} />
                </div>
                <p style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "15px", color: "#e8f4ff" }}>{p.label}</p>
                <p className="text-xs mt-1" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>{p.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Job listings */}
        <h3 className="mb-6" style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "22px", color: "#e8f4ff" }}>Open Positions</h3>
        <div className="flex flex-col gap-3">
          {jobs.map((job, i) => (
            <motion.div
              key={job._id || job.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 rounded-xl transition-all duration-200 hover:border-[rgba(0,170,255,0.3)]"
              style={{ background: "rgba(13,31,60,0.6)", border: "1px solid rgba(0,170,255,0.1)" }}
            >
              <div>
                <p style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "17px", color: "#e8f4ff" }}>{job.title}</p>
                <div className="flex flex-wrap gap-3 mt-1">
                  <span className="flex items-center gap-1 text-xs" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}><Clock size={11} /> {job.type}</span>
                  <span className="flex items-center gap-1 text-xs" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}><MapPin size={11} /> {job.location}</span>
                </div>
              </div>
              <button
                onClick={() => setApplyJob(job)}
                className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm whitespace-nowrap transition-all duration-200 hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #0077cc, #00d4ff)", color: "#fff", fontFamily: "Inter, sans-serif" }}
              >
                Apply Now <ArrowRight size={13} />
              </button>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {applyJob && <JobApplyModal job={applyJob} onClose={() => setApplyJob(null)} />}
        </AnimatePresence>
      </div>
    </section>
  );
}
