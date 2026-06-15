import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Clock, ArrowRight } from "lucide-react";
import apiClient from "../../api/client";

export function Blog() {
  const [postsData, setPostsData] = useState<any[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await apiClient.get('/blogs');
        setPostsData(response.data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <section id="blog" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs mb-4" style={{ background: "rgba(0,170,255,0.08)", border: "1px solid rgba(0,170,255,0.2)", color: "#00aaff", fontFamily: "JetBrains Mono, monospace" }}>
              Insights
            </div>
            <h2 style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#e8f4ff" }}>
              From the <span style={{ background: "linear-gradient(90deg, #00aaff, #00d4ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Blog</span>
            </h2>
          </div>
          <button className="flex items-center gap-2 text-sm" style={{ color: "#00aaff", fontFamily: "Inter, sans-serif" }}>
            Visit Blog <ArrowRight size={14} />
          </button>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {postsData.map((post, i) => {
            const colors = ["#54c5f8", "#f472b6", "#a78bfa", "#34d399", "#fb923c"];
            const categoryColor = colors[i % colors.length];

            const date = new Date(post.createdAt || new Date()).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            });

            return (
              <motion.article
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-xl overflow-hidden cursor-pointer"
                style={{ background: "#0a1628", border: "1px solid rgba(0,170,255,0.1)" }}
              >
                <div className="relative h-44 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs" style={{ background: `${categoryColor}20`, border: `1px solid ${categoryColor}40`, color: categoryColor, fontFamily: "JetBrains Mono, monospace" }}>
                    {post.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="mb-2 leading-snug group-hover:text-white transition-colors" style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "16px", color: "#e8f4ff" }}>
                    {post.title}
                  </h3>
                  <p className="text-xs leading-relaxed mb-4 line-clamp-2" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>{post.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={post.authorImage} alt={post.authorName} className="w-6 h-6 rounded-full object-cover" />
                      <span className="text-xs" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>{post.authorName}</span>
                    </div>
                    <span className="flex items-center gap-1 text-xs" style={{ color: "#5a8aaa", fontFamily: "JetBrains Mono, monospace" }}>
                      <Clock size={10} /> {post.readTime}
                    </span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
