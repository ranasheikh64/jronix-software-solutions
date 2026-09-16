import { useState, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import apiClient from "../../api/client";
import { useRef } from "react";

const services = ["App Development", "Web Development", "AI Development", "UI/UX Design", "WordPress", "Other"];
const budgets = ["< $500", "$500 – $2,000", "$2,000 – $5,000", "$5,000 – $10,000", "$10,000+"];

const inputBase: React.CSSProperties = {
  background: "rgba(8,18,36,0.8)",
  border: "1px solid rgba(255,255,255,0.08)",
  color: "#e8f4ff",
  fontFamily: "Inter, sans-serif",
  borderRadius: "12px",
  padding: "13px 16px",
  fontSize: "14px",
  outline: "none",
  width: "100%",
  transition: "border-color 0.2s, box-shadow 0.2s",
  backdropFilter: "blur(8px)",
};

function FocusInput({ style, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      {...props}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputBase,
        ...style,
        borderColor: focused ? "rgba(59,130,246,0.5)" : "rgba(255,255,255,0.08)",
        boxShadow: focused ? "0 0 0 3px rgba(59,130,246,0.1)" : "none",
      }}
    />
  );
}

function FocusTextarea({ style, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      {...props}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputBase,
        ...style,
        borderColor: focused ? "rgba(59,130,246,0.5)" : "rgba(255,255,255,0.08)",
        boxShadow: focused ? "0 0 0 3px rgba(59,130,246,0.1)" : "none",
        resize: "none",
      }}
    />
  );
}

function FocusSelect({ style, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  const [focused, setFocused] = useState(false);
  return (
    <select
      {...props}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputBase,
        ...style,
        cursor: "pointer",
        borderColor: focused ? "rgba(59,130,246,0.5)" : "rgba(255,255,255,0.08)",
        boxShadow: focused ? "0 0 0 3px rgba(59,130,246,0.1)" : "none",
      }}
    />
  );
}

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contactInfo, setContactInfo] = useState<any>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", budget: "", message: "" });
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });

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
        projectDetails: form.message,
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const infoItems = [
    { icon: Mail, label: "Email", value: contactInfo?.email || "hello@jronix.com", color: "#3b82f6", hint: "Reply within 24h" },
    { icon: Phone, label: "WhatsApp / Phone", value: contactInfo?.whatsapp || "+880 1700-000000", color: "#34d399", hint: "Available 9am–8pm" },
    { icon: MapPin, label: "Location", value: contactInfo?.location || "Dhaka, Bangladesh", color: "#f472b6", hint: "Serving clients globally" },
    { icon: Clock, label: "Business Hours", value: contactInfo?.businessHours || "Sat – Thu, 9am – 8pm BST", color: "#fb923c", hint: "Mon–Sat" },
  ];

  return (
    <section id="contact" className="py-10 md:py-16 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #050b14 0%, #070f1a 100%)" }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none opacity-[0.07] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, #3b82f6, transparent 70%)" }} />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none opacity-[0.05] rounded-full blur-[100px]"
        style={{ background: "radial-gradient(circle, #a78bfa, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div ref={headingRef} className="text-center mb-8 md:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={headingInView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center justify-center gap-3 mb-8"
          >
            <div className="h-[1px] w-12 opacity-60" style={{ background: "linear-gradient(to right, transparent, var(--primary-accent))" }} />
            <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase px-5 py-2 rounded-full"
              style={{ color: "var(--primary-accent)", fontFamily: "Inter, sans-serif", background: "rgba(59,130,246,0.07)", border: "1px solid rgba(59,130,246,0.2)" }}>
              <motion.span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--primary-accent)" }} animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} />
              Get In Touch
            </span>
            <div className="h-[1px] w-12 opacity-60" style={{ background: "linear-gradient(to left, transparent, var(--primary-accent))" }} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }} animate={headingInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
            style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "clamp(2.4rem, 6vw, 5rem)", lineHeight: 1.05, letterSpacing: "-0.025em" }}
          >
            <span style={{ color: "#e8f4ff" }}>Let's Build </span>
            <span style={{
              background: "linear-gradient(135deg, var(--primary-accent) 0%, #a78bfa 60%, #f472b6 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              filter: "drop-shadow(0 0 30px rgba(59,130,246,0.4))"
            }}>Together</span>
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }} animate={headingInView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="mx-auto mt-5 mb-5 h-[2px] w-24 rounded-full"
            style={{ background: "linear-gradient(90deg, transparent, var(--primary-accent), #a78bfa, transparent)", transformOrigin: "center" }}
          />

          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={headingInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.22 }}
            className="text-base max-w-md mx-auto" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}
          >
            Ready to start your next project? Tell us about it and we'll get back to you within 24 hours.
          </motion.p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">

          {/* Form — left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div
              className="relative rounded-3xl p-8 overflow-hidden"
              style={{
                background: "rgba(8,18,36,0.7)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 30px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              {/* Corner glow */}
              <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
                style={{ background: "radial-gradient(circle at top right, rgba(59,130,246,0.08) 0%, transparent 70%)" }} />

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                    style={{ background: "rgba(52,211,153,0.12)", border: "2px solid rgba(52,211,153,0.3)", boxShadow: "0 0 40px rgba(52,211,153,0.2)" }}
                  >
                    <CheckCircle2 size={36} style={{ color: "#34d399" }} />
                  </motion.div>
                  <h3 style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "26px", color: "#e8f4ff" }}>
                    Message Sent! 🎉
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed max-w-xs" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>
                    We'll review your message and get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", service: "", budget: "", message: "" }); }}
                    className="mt-8 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                    style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)", color: "var(--primary-accent)", fontFamily: "Inter, sans-serif" }}
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-10">
                  <div className="mb-2">
                    <h3 style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "20px", color: "#e8f4ff" }}>
                      Send us a message
                    </h3>
                    <p className="text-xs mt-1" style={{ color: "#4a6080", fontFamily: "Inter, sans-serif" }}>
                      Fill in the details below and we'll be in touch shortly.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <FocusInput required placeholder="Your Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                    <FocusInput required type="email" placeholder="Email Address" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                  </div>

                  <FocusInput placeholder="Phone (optional)" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <FocusSelect value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}>
                      <option value="" disabled>Service Needed</option>
                      {services.map(s => <option key={s} value={s}>{s}</option>)}
                    </FocusSelect>
                    <FocusSelect value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })}>
                      <option value="" disabled>Estimated Budget</option>
                      {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                    </FocusSelect>
                  </div>

                  <FocusTextarea
                    required
                    rows={5}
                    placeholder="Tell us about your project — goals, timeline, tech preferences..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                  />

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-2.5 py-4 rounded-xl text-sm font-bold transition-all disabled:opacity-50"
                    style={{
                      background: "linear-gradient(135deg, #3b82f6, #6366f1)",
                      color: "#fff",
                      fontFamily: "Inter, sans-serif",
                      boxShadow: "0 8px 30px rgba(59,130,246,0.35)",
                    }}
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        Send Message
                        <ArrowRight size={14} />
                      </>
                    )}
                  </motion.button>

                  <p className="text-center text-[11px]" style={{ color: "#2a3a50", fontFamily: "Inter, sans-serif" }}>
                    🔒 Your information is secure and will never be shared.
                  </p>
                </form>
              )}
            </div>
          </motion.div>

          {/* Info — right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            {/* Quick response badge */}
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl mb-2"
              style={{ background: "rgba(52,211,153,0.07)", border: "1px solid rgba(52,211,153,0.15)" }}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#34d399" }} />
              <p className="text-xs font-semibold" style={{ color: "#34d399", fontFamily: "Inter, sans-serif" }}>
                Avg. response time: <strong>under 4 hours</strong>
              </p>
            </div>

            {/* Info cards */}
            {infoItems.map(({ icon: Icon, label, value, color, hint }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="group flex gap-4 items-center p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "rgba(8,18,36,0.65)",
                  border: `1px solid rgba(255,255,255,0.06)`,
                  backdropFilter: "blur(12px)",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = color + "40";
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 10px 40px ${color}12`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{ background: `${color}12`, border: `1px solid ${color}25` }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-wider mb-0.5" style={{ color: "#4a6080", fontFamily: "JetBrains Mono, monospace" }}>{label}</p>
                  <p className="text-sm font-semibold truncate" style={{ color: "#e8f4ff", fontFamily: "Inter, sans-serif" }}>{value}</p>
                  {hint && <p className="text-[11px] mt-0.5" style={{ color: color + "80", fontFamily: "Inter, sans-serif" }}>{hint}</p>}
                </div>
              </motion.div>
            ))}

            {/* WhatsApp CTA */}
            <motion.a
              href={`https://wa.me/${(contactInfo?.whatsapp || "+8801700000000").replace(/\D/g, "")}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-3 py-4 rounded-2xl text-sm font-bold transition-all mt-2"
              style={{
                background: "linear-gradient(135deg, #075e54, #128c7e)",
                color: "#fff",
                fontFamily: "Inter, sans-serif",
                boxShadow: "0 8px 30px rgba(37,211,102,0.2)",
              }}
            >
              <MessageCircle size={18} />
              Chat on WhatsApp
              <ArrowRight size={14} />
            </motion.a>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mt-2">
              {[
                { icon: "🔒", label: "Secure" },
                { icon: "⚡", label: "Fast Reply" },
                { icon: "🌍", label: "Global" },
              ].map(item => (
                <div key={item.label} className="flex flex-col items-center gap-1.5 py-3 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-[10px] font-semibold" style={{ color: "#4a6080", fontFamily: "Inter, sans-serif" }}>{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* WhatsApp floating button */}
      <a
        href={`https://wa.me/${(contactInfo?.whatsapp || "+8801700000000").replace(/\D/g, "")}`}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center z-40 transition-all duration-300 hover:scale-110"
        style={{ background: "linear-gradient(135deg, #075e54, #25d366)", boxShadow: "0 0 25px rgba(37,211,102,0.4), 0 4px 16px rgba(0,0,0,0.4)" }}
      >
        <MessageCircle size={24} style={{ color: "#fff" }} />
      </a>
    </section>
  );
}
