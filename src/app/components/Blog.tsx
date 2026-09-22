import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, useInView } from "motion/react";
import { Clock, ArrowRight, ArrowUpRight, BookOpen, Sparkles, Play, Video } from "lucide-react";
import apiClient from "../../api/client";
import { useRef } from "react";

const categoryColors: Record<string, string> = {
  Flutter: "#54c5f8",
  React: "#61dafb",
  Design: "#f472b6",
  AI: "#a78bfa",
  Backend: "#34d399",
  Default: "#60a5fa",
};

function getYouTubeVideoId(url: string | null | undefined): string | null {
  if (!url || typeof url !== 'string') return null;
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts|live)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regExp);
  return (match && match[1]) ? match[1] : null;
}

function getColor(category: string) {
  return categoryColors[category] || categoryColors.Default;
}

function BlogCard({ post, index }: { post: any; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const color = getColor(post.category);

  let youtubeId = getYouTubeVideoId(post.youtubeUrl);
  if (!youtubeId && post.description) {
    youtubeId = getYouTubeVideoId(post.description);
  }
  const isVideo = Boolean(youtubeId);
  const displayImage = post.image || (youtubeId ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` : "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800");

  const date = new Date(post.createdAt || new Date()).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer flex flex-col"
      style={{
        background: "rgba(8,18,36,0.7)",
        border: `1px solid ${hovered ? color + "40" : "rgba(255,255,255,0.06)"}`,
        boxShadow: hovered ? `0 24px 60px ${color}18, 0 0 0 1px ${color}20` : "0 4px 24px rgba(0,0,0,0.4)",
        backdropFilter: "blur(12px)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      onClick={() => navigate(`/blog/${post._id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />

      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: 210, flexShrink: 0 }}>
        <motion.img
          src={displayImage}
          alt={post.title}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 30%, rgba(8,18,36,0.95) 100%)" }} />

        {/* YouTube Video Play Button Overlay */}
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div 
              animate={{ scale: hovered ? 1.15 : 1 }}
              transition={{ duration: 0.3 }}
              className="w-12 h-12 rounded-full flex items-center justify-center bg-red-600/90 text-white shadow-[0_0_25px_rgba(220,38,38,0.7)] backdrop-blur-sm border border-red-400/40"
            >
              <Play size={20} className="fill-white translate-x-0.5" />
            </motion.div>
          </div>
        )}

        {/* Category & Video badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-1.5 z-10">
          {post.category && (
            <span className="text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-md"
              style={{ background: `${color}25`, border: `1px solid ${color}50`, color, fontFamily: "Inter, sans-serif" }}>
              {post.category}
            </span>
          )}
          {isVideo && (
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md bg-red-500/20 border border-red-500/40 text-red-400 flex items-center gap-1">
              <Video size={11} /> VIDEO
            </span>
          )}
        </div>

        {/* Date badge */}
        <span className="absolute top-4 right-4 text-[10px] font-medium px-2.5 py-1 rounded-full backdrop-blur-md z-10"
          style={{ background: "rgba(8,18,36,0.7)", border: "1px solid rgba(255,255,255,0.1)", color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>
          {date}
        </span>

        {/* Arrow on hover */}
        <motion.div
          className="absolute bottom-4 right-4 w-8 h-8 rounded-full flex items-center justify-center z-10"
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.7 }}
          transition={{ duration: 0.2 }}
          style={{ background: `${color}30`, backdropFilter: "blur(8px)" }}
        >
          <ArrowUpRight size={14} style={{ color }} />
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3
          className="font-bold mb-2 leading-snug line-clamp-2 transition-colors duration-300"
          style={{
            fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "18px",
            color: hovered ? "#ffffff" : "#e8f4ff"
          }}
        >
          {post.title}
        </h3>
        <p className="text-sm leading-relaxed flex-1 line-clamp-2 mb-4" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>
          {post.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-2.5">
            {post.authorImage && (
              <img src={post.authorImage} alt={post.authorName} className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                style={{ border: `1.5px solid ${color}50` }} />
            )}
            <span className="text-xs font-medium" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>
              {post.authorName}
            </span>
          </div>
          <span className="flex items-center gap-1.5 text-[11px] font-medium"
            style={{ color: hovered ? color : "#4a6080", fontFamily: "JetBrains Mono, monospace", transition: "color 0.3s" }}>
            <Clock size={10} /> {post.readTime || "5 min read"}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

function BlogSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden animate-pulse" style={{ background: "rgba(8,18,36,0.5)", border: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="h-[210px]" style={{ background: "rgba(255,255,255,0.04)" }} />
      <div className="p-5 space-y-3">
        <div className="h-5 rounded-lg w-4/5" style={{ background: "rgba(255,255,255,0.06)" }} />
        <div className="h-3 rounded-lg" style={{ background: "rgba(255,255,255,0.04)" }} />
        <div className="h-3 rounded-lg w-2/3" style={{ background: "rgba(255,255,255,0.04)" }} />
      </div>
    </div>
  );
}

export function Blog() {
  const [postsData, setPostsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await apiClient.get('/blogs');
        setPostsData(response.data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (!loading && postsData.length === 0) return null;

  return (
    <section id="blog" className="py-10 md:py-16 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] pointer-events-none opacity-[0.06] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, #3b82f6, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div ref={headingRef} className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 md:mb-10 gap-6">
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={headingInView ? { opacity: 1, y: 0 } : {}}
              className="inline-flex items-center gap-3 mb-7"
            >
              <div className="h-[1px] w-10 opacity-60" style={{ background: "linear-gradient(to right, transparent, var(--primary-accent))" }} />
              <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full"
                style={{ color: "var(--primary-accent)", fontFamily: "Inter, sans-serif", background: "rgba(59,130,246,0.07)", border: "1px solid rgba(59,130,246,0.2)" }}>
                <motion.span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--primary-accent)" }} animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} />
                Insights
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }} animate={headingInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
              style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "clamp(2.2rem, 5vw, 4rem)", lineHeight: 1.05, letterSpacing: "-0.025em" }}
            >
              <span style={{ color: "#e8f4ff" }}>From the </span>
              <span style={{
                background: "linear-gradient(135deg, var(--primary-accent) 0%, #a78bfa 60%, #f472b6 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                filter: "drop-shadow(0 0 25px rgba(59,130,246,0.4))"
              }}>Blog</span>
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }} animate={headingInView ? { scaleX: 1, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.18 }}
              className="mt-4 h-[2px] w-20 rounded-full"
              style={{ background: "linear-gradient(90deg, var(--primary-accent), #a78bfa, transparent)", transformOrigin: "left" }}
            />
          </div>

          {/* Visit Blog CTA */}
          <motion.button
            initial={{ opacity: 0, x: 20 }} animate={headingInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 }}
            onClick={() => navigate("/blog")}
            className="group flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 hover:scale-105 self-start sm:self-end shrink-0"
            style={{
              background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.25)",
              color: "var(--primary-accent)", fontFamily: "Inter, sans-serif",
            }}
          >
            <BookOpen size={15} />
            Visit Blog
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </motion.button>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => <BlogSkeleton key={i} />)}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {postsData.slice(0, 6).map((post, i) => (
              <BlogCard key={post._id} post={post} index={i} />
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        {!loading && postsData.length > 3 && (
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="flex justify-center mt-12"
          >
            <button
              onClick={() => navigate("/blog")}
              className="group flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, rgba(59,130,246,0.12), rgba(167,139,250,0.08))",
                border: "1px solid rgba(59,130,246,0.25)", color: "#e8f4ff", fontFamily: "Inter, sans-serif",
              }}
            >
              <Sparkles size={14} style={{ color: "var(--primary-accent)" }} />
              View All Articles
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
