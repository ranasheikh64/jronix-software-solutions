import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";
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
          src={review.clientImage || review.img}
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
        setReviewsData(response.data);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  if (reviewsData.length === 0) return null;

  const loopedReviews = [...reviewsData, ...reviewsData];
  // total width of one set: 6 cards × (360px + 20px gap)
  const totalWidth = reviewsData.length * (360 + 20);

  return (
    <section id="testimonials" className="py-10 md:py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6 md:mb-8"
        >
          {/* Badge */}
          <div className="inline-flex items-center justify-center gap-3 mb-8">
            <div className="h-[1px] w-12 opacity-60" style={{ background: "linear-gradient(to right, transparent, var(--primary-accent))" }} />
            <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase px-5 py-2 rounded-full"
              style={{ color: "var(--primary-accent)", fontFamily: "Inter, sans-serif", background: "rgba(59,130,246,0.07)", border: "1px solid rgba(59,130,246,0.2)" }}>
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
            className="mx-auto mt-5 mb-5 h-[2px] w-24 rounded-full"
            style={{ background: "linear-gradient(90deg, transparent, var(--primary-accent), #a78bfa, transparent)", transformOrigin: "center" }}
          />

          <p className="text-sm max-w-md mx-auto" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>
            Real words from real clients across the globe.
          </p>
        </motion.div>

      </div>

      {/* Reviews Display */}
      {reviewsData.length <= 3 ? (
        <div className="flex justify-center gap-5 px-6 max-w-7xl mx-auto flex-wrap">
          {reviewsData.map((review, i) => (
             <ReviewCard key={`${review._id || review.id}-${i}`} review={review} />
          ))}
        </div>
      ) : (
        <TrackWithPause loopedReviews={loopedReviews} totalWidth={totalWidth} />
      )}
    </section>
  );
}
