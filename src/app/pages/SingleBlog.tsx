import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Clock, ArrowLeft, Video, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import apiClient from "../../api/client";

export function getYouTubeVideoId(url: string | null | undefined): string | null {
  if (!url || typeof url !== 'string') return null;
  
  // Match standard, short, embed, shorts, live URLs
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts|live)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regExp);
  if (match && match[1]) {
    return match[1];
  }
  
  return null;
}

export function SingleBlog() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchBlog = async () => {
      try {
        const response = await apiClient.get(`/blogs/${id}`);
        setBlog(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load blog post");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-accent)]"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white">
        <h2 className="text-2xl font-bold mb-4" style={{ color: "#e8f4ff" }}>{error || "Blog post not found"}</h2>
        <button 
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-[var(--primary-accent)] hover:underline"
        >
          <ArrowLeft size={16} /> Back to Home
        </button>
      </div>
    );
  }

  // 1. Direct youtubeUrl field
  // 2. Fallback: Check if description contains any YouTube link
  let youtubeId = getYouTubeVideoId(blog.youtubeUrl);
  if (!youtubeId && blog.description) {
    youtubeId = getYouTubeVideoId(blog.description);
  }

  const date = new Date(blog.createdAt || new Date()).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-6 py-28 md:py-36"
    >
      <button 
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm font-medium text-[#7aa8cc] hover:text-white transition-colors mb-8"
      >
        <ArrowLeft size={16} /> Back
      </button>

      {/* Header Info */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 items-center mb-6">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase" style={{ background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.4)", color: "var(--primary-accent)" }}>
            {blog.category}
          </span>
          {youtubeId && (
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase flex items-center gap-1.5 bg-red-500/20 border border-red-500/40 text-red-400">
              <Video size={13} /> YouTube Video
            </span>
          )}
        </div>

        <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight" style={{ fontFamily: "Rajdhani, sans-serif", color: "#e8f4ff" }}>
          {blog.title}
        </h1>
        
        <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-white/10 text-sm" style={{ color: "#7aa8cc" }}>
          <div className="flex items-center gap-3">
            {blog.authorImage && (
              <img src={blog.authorImage} alt={blog.authorName} className="w-10 h-10 rounded-full object-cover border border-[var(--primary-accent)]/30" />
            )}
            <div className="flex flex-col">
              <span className="font-semibold text-white">{blog.authorName}</span>
              <span className="text-xs">{date}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
            <Clock size={13} style={{ color: "var(--primary-accent)" }} /> {blog.readTime || "5 min read"}
          </div>
        </div>
      </div>

      {/* Media Player or Main Cover Image */}
      {youtubeId ? (
        <div className="mb-12 rounded-2xl overflow-hidden border border-red-500/40 shadow-[0_0_50px_rgba(220,38,38,0.25)] bg-slate-950">
          <div className="relative w-full aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
              title={blog.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full border-0 rounded-2xl"
            />
          </div>
        </div>
      ) : (
        blog.image && (
          <div className="relative h-64 md:h-96 w-full mb-12 rounded-2xl overflow-hidden border border-[var(--primary-accent)]/20 shadow-2xl">
            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
          </div>
        )
      )}

      {/* Description / Content Body */}
      <div className="prose prose-invert prose-lg max-w-none" style={{ color: "#a8c7df", fontFamily: "Inter, sans-serif", lineHeight: "1.8" }}>
        <p className="text-lg md:text-xl leading-relaxed whitespace-pre-wrap">{blog.description}</p>
      </div>
    </motion.article>
  );
}
