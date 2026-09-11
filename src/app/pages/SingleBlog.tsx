import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Clock, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import apiClient from "../../api/client";

export function SingleBlog() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await apiClient.get(`/blogs/${id}`);
        setBlog(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load blog");
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
        <h2 className="text-2xl font-bold mb-4" style={{ color: "#e8f4ff" }}>{error || "Blog not found"}</h2>
        <button 
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-[var(--primary-accent)] hover:underline"
        >
          <ArrowLeft size={16} /> Back to Home
        </button>
      </div>
    );
  }

  const date = new Date(blog.createdAt || new Date()).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <motion.article 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto px-6 py-32"
    >
      <button 
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-[var(--primary-accent)] hover:underline mb-8"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div className="mb-8">
        <span className="px-3 py-1.5 rounded-full text-xs font-mono mb-6 inline-block" style={{ background: "var(--primary-accent-glow)", border: "1px solid var(--primary-accent)", color: "var(--primary-accent)" }}>
          {blog.category}
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: "Rajdhani, sans-serif", color: "#e8f4ff" }}>
          {blog.title}
        </h1>
        
        <div className="flex items-center gap-6 mb-8 text-sm" style={{ color: "#7aa8cc" }}>
          <div className="flex items-center gap-3">
            <img src={blog.authorImage} alt={blog.authorName} className="w-10 h-10 rounded-full object-cover border border-[var(--primary-accent)]/20" />
            <div className="flex flex-col">
              <span className="font-semibold text-white">{blog.authorName}</span>
              <span className="text-xs">{date}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 font-mono">
            <Clock size={14} /> {blog.readTime}
          </div>
        </div>
      </div>

      <div className="relative h-64 md:h-96 w-full mb-12 rounded-2xl overflow-hidden border border-[var(--primary-accent)]/20">
        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
      </div>

      <div className="prose prose-invert prose-lg max-w-none" style={{ color: "#a8c7df", fontFamily: "Inter, sans-serif", lineHeight: "1.8" }}>
        <p className="text-xl leading-relaxed whitespace-pre-wrap">{blog.description}</p>
        {/* Placeholder for more content if description was markdown or HTML */}
      </div>
    </motion.article>
  );
}
