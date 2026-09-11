import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import apiClient from "../../api/client";

const services = ["App Development", "Web Development", "AI Development", "UI/UX Design", "WordPress", "Other"];
const budgets = ["< $500", "$500 – $2,000", "$2,000 – $5,000", "$5,000 – $10,000", "$10,000+"];

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contactInfo, setContactInfo] = useState<any>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", budget: "", message: "" });

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await apiClient.get('/contact/info');
        setContactInfo(res.data);
      } catch (err) {
        console.error("Failed to fetch contact info", err);
      }
    };
    fetchInfo();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiClient.post('/contact/messages', {
        name: form.name,
        email: form.email,
        phone: form.phone,
        service: form.service || "Other",
        budget: form.budget || "Not specified",
        projectDetails: form.message
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    background: "#0d1f3c",
    border: "1px solid var(--primary-accent-glow)",
    color: "#e8f4ff",
    fontFamily: "Inter, sans-serif",
    borderRadius: "8px",
    padding: "10px 14px",
    fontSize: "14px",
    outline: "none",
    width: "100%",
  };

  return (
    <section id="contact" className="py-24 relative" style={{ background: "linear-gradient(180deg, #050c1a 0%, #071523 100%)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs mb-4" style={{ background: "var(--primary-accent-glow)", border: "1px solid var(--primary-accent)", color: "var(--primary-accent)", fontFamily: "JetBrains Mono, monospace" }}>
            Get In Touch
          </div>
          <h2 style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#e8f4ff" }}>
            Let's Build <span style={{ background: "var(--primary-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Together</span>
          </h2>
          <p className="mt-3 text-sm" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>
            Ready to start your next project? Tell us about it.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl p-7" style={{ background: "rgba(13,31,60,0.6)", border: "1px solid var(--primary-accent)" }}>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: "rgba(0,212,255,0.15)", border: "1px solid rgba(0,212,255,0.3)" }}>
                    <Send size={24} style={{ color: "var(--primary-accent)" }} />
                  </div>
                  <h3 style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "22px", color: "#e8f4ff" }}>Message Sent!</h3>
                  <p className="mt-2 text-sm" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>We'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input required placeholder="Your Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} />
                    <input required type="email" placeholder="Email Address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle} />
                  </div>
                  <input placeholder="Phone (optional)" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} style={inputStyle} />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} style={{ ...inputStyle, cursor: "pointer" }}>
                      <option value="" disabled>Service Needed</option>
                      {services.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <select value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} style={{ ...inputStyle, cursor: "pointer" }}>
                      <option value="" disabled>Estimated Budget</option>
                      {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <textarea required rows={4} placeholder="Tell us about your project..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} style={{ ...inputStyle, resize: "none" }} />
                  <button type="submit" disabled={loading} className="flex items-center justify-center gap-2 py-3 rounded-lg text-sm transition-all duration-200 hover:opacity-90 disabled:opacity-50" style={{ background: "var(--primary-gradient)", color: "#fff", fontFamily: "Inter, sans-serif" }}>
                    <Send size={14} /> {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {[
              { icon: Mail, label: "Email", value: contactInfo?.email || "hello@jronix.com", color: "var(--primary-accent)" },
              { icon: Phone, label: "WhatsApp / Phone", value: contactInfo?.whatsapp || "+880 1700-000000", color: "#34d399" },
              { icon: MapPin, label: "Location", value: contactInfo?.location || "Dhaka, Bangladesh", color: "#f472b6" },
              { icon: Clock, label: "Business Hours", value: contactInfo?.businessHours || "Sat – Thu, 9am – 8pm BST", color: "#fb923c" },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="flex gap-4 items-start p-5 rounded-xl" style={{ background: "rgba(13,31,60,0.6)", border: "1px solid var(--primary-accent-glow)" }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <div>
                  <p className="text-xs mb-0.5" style={{ color: "#7aa8cc", fontFamily: "JetBrains Mono, monospace" }}>{label}</p>
                  <p className="text-sm" style={{ color: "#e8f4ff", fontFamily: "Inter, sans-serif" }}>{value}</p>
                </div>
              </div>
            ))}

            <a
              href={`https://wa.me/${(contactInfo?.whatsapp || "+8801700000000").replace(/\D/g, '')}`}
              className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm mt-2 transition-all duration-200 hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #075e54, #128c7e)", color: "#fff", fontFamily: "Inter, sans-serif" }}
            >
              <MessageCircle size={16} /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* WhatsApp floating button */}
      <a
        href={`https://wa.me/${(contactInfo?.whatsapp || "+8801700000000").replace(/\D/g, '')}`}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center z-40 shadow-2xl transition-all duration-200 hover:scale-110"
        style={{ background: "linear-gradient(135deg, #075e54, #25d366)", boxShadow: "0 0 20px rgba(37,211,102,0.4)" }}
      >
        <MessageCircle size={24} style={{ color: "#fff" }} />
      </a>
    </section>
  );
}
