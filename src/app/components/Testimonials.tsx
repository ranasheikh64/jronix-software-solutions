import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Star, Quote, ShieldCheck, CheckCircle2 } from "lucide-react";
import apiClient from "../../api/client";

function ReviewCard({ review }: { review: any }) {
  return (
    <div
      className="relative flex flex-col p-6 rounded-2xl flex-shrink-0"
      style={{
        width: "360px",
        background: "rgba(10,25,50,0.5)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid var(--primary-accent-glow)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      {/* Quote icon */}
      <Quote size={20} style={{ color: "var(--primary-accent)", opacity: 0.45, marginBottom: 12 }} />

      {/* Stars */}
      <div className="flex gap-1 mb-3">
        {Array.from({ length: review.rating || 5 }).map((_, j) => (
          <Star key={j} size={13} fill="#fbbf24" style={{ color: "#fbbf24" }} />
        ))}
      </div>

      {/* Text */}
      <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: "#c8dff0", fontFamily: "Inter, sans-serif" }}>
        "{review.reviewText || review.text}"
      </p>

      {/* Divider */}
      <div className="h-px mb-4" style={{ background: "linear-gradient(90deg, var(--primary-accent), transparent)" }} />

      {/* Author */}
      <div className="flex items-center gap-3">
        <img
          src={review.clientImage || review.img || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.clientName || review.name || "Client")}&background=0d1f3c&color=38bdf8`}
          alt={review.clientName || review.name}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          style={{ border: "1.5px solid var(--primary-accent)" }}
        />
        <div>
          <p style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "15px", color: "#e8f4ff" }}>
            {review.clientName || review.name} <span>{review.flag}</span>
          </p>
          <p className="text-xs" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>{review.clientRole || review.role}</p>
        </div>
      </div>
    </div>
  );
}

// Executive Spotlight Testimonial when there is 1 review
function ExecutiveSpotlightReview({ review }: { review: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto relative rounded-3xl p-8 sm:p-10 overflow-hidden border border-white/10"
      style={{
        background: "linear-gradient(135deg, rgba(10,24,48,0.7) 0%, rgba(6,14,28,0.85) 100%)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 20px 60px -15px rgba(59,130,246,0.25), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      {/* Top ambient glow */}
      <div
        className="absolute -top-20 -right-20 w-60 h-60 rounded-full pointer-events-none blur-3xl opacity-20"
        style={{ background: "#3b82f6" }}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {Array.from({ length: review.rating || 5 }).map((_, j) => (
              <Star key={j} size={17} fill="#fbbf24" style={{ color: "#fbbf24" }} />
            ))}
          </div>
          <span className="text-xs font-bold text-amber-400 font-mono ml-1.5">5.0 / 5.0</span>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/25 text-emerald-400">
          <ShieldCheck size={13} />
          <span>Verified Client Endorsement</span>
        </span>
      </div>

      <div className="relative mb-8">
        <Quote size={40} className="absolute -top-3 -left-2 text-blue-500/15 pointer-events-none" />
        <p
          className="text-lg sm:text-xl font-medium leading-relaxed relative z-10 text-[#d8ebfa]"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          "{review.reviewText || review.text}"
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pt-6 border-t border-white/10">
        <div className="flex items-center gap-4">
          <img
            src={review.clientImage || review.img || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.clientName || review.name || "Client")}&background=0d1f3c&color=38bdf8`}
            alt={review.clientName || review.name}
            className="w-13 h-13 rounded-full object-cover ring-2 ring-blue-500/40"
          />
          <div>
            <h4
              style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "19px", color: "#ffffff" }}
              className="flex items-center gap-2"
            >
              <span>{review.clientName || review.name}</span>
              {review.flag && <span>{review.flag}</span>}
            </h4>
            <p className="text-xs sm:text-sm text-blue-300 font-mono font-medium">
              {review.clientRole || review.role || "Executive Leadership"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-400 font-mono">
          <span className="flex items-center gap-1 text-emerald-400">
            <CheckCircle2 size={13} /> High Reliability
          </span>
          <span className="flex items-center gap-1 text-sky-400">
            <CheckCircle2 size={13} /> Fast Delivery
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function TrackWithPause({ loopedReviews, totalWidth }: { loopedReviews: any[]; totalWidth: number }) {
  const [paused, setPaused] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(90deg, rgba(1,5,21,0.9), transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(270deg, rgba(1,5,21,0.9), transparent)" }} />

      <motion.div
        className="flex gap-5"
        style={{ width: `${totalWidth * 2}px` }}
        animate={{ x: paused ? undefined : [0, -totalWidth] }}
        transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
      >
        {loopedReviews.map((review, i) => (
          <ReviewCard key={`${review._id || review.id}-${i}`} review={review} />
        ))}
      </motion.div>
    </div>
  );
}

export function Testimonials() {
  const [reviewsData, setReviewsData] = useState<any[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await apiClient.get('/reviews');
        setReviewsData(response.data || []);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  if (reviewsData.length === 0) return null;

  const loopedReviews = [...reviewsData, ...reviewsData];
  const totalWidth = reviewsData.length * (360 + 20);

  return (
    <section id="testimonials" className="py-12 md:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          {/* Badge */}
          <div className="inline-flex items-center justify-center gap-3 mb-6">
            <div className="h-[1px] w-12 opacity-60" style={{ background: "linear-gradient(to right, transparent, var(--primary-accent))" }} />
            <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase px-5 py-2 rounded-full"
              style={{ color: "var(--primary-accent)", fontFamily: "Inter, sans-serif", background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.25)" }}>
              <motion.span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--primary-accent)" }} animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.4 }} />
              Client Reviews
            </span>
            <div className="h-[1px] w-12 opacity-60" style={{ background: "linear-gradient(to left, transparent, var(--primary-accent))" }} />
          </div>

          <h2 style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "clamp(2.4rem, 5vw, 4rem)", lineHeight: 1.08, letterSpacing: "-0.025em" }}>
            <span style={{ color: "#e8f4ff" }}>What Our </span>
            <span style={{ background: "linear-gradient(135deg, var(--primary-accent) 0%, #a78bfa 60%, #f472b6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", filter: "drop-shadow(0 0 25px rgba(59,130,246,0.4))" }}>
              Clients Say
            </span>
          </h2>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-4 mb-5 h-[2px] w-24 rounded-full"
            style={{ background: "linear-gradient(90deg, transparent, var(--primary-accent), #a78bfa, transparent)", transformOrigin: "center" }}
          />

          <p className="text-sm max-w-md mx-auto text-[#7aa8cc]" style={{ fontFamily: "Inter, sans-serif" }}>
            Direct feedback from founders and tech leaders who partner with Jronix to ship mission-critical software.
          </p>
        </motion.div>

        {/* Reviews Display */}
        {reviewsData.length === 1 ? (
          <ExecutiveSpotlightReview review={reviewsData[0]} />
        ) : reviewsData.length <= 3 ? (
          <div className="flex justify-center gap-6 max-w-7xl mx-auto flex-wrap">
            {reviewsData.map((review, i) => (
              <ReviewCard key={`${review._id || review.id}-${i}`} review={review} />
            ))}
          </div>
        ) : (
          <TrackWithPause loopedReviews={loopedReviews} totalWidth={totalWidth} />
        )}

      </div>
    </section>
  );
}
