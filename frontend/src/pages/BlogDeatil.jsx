import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./blogDetail.css";

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetchBlog();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [slug]);

  const fetchBlog = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/blogs/${slug}`
      );
      const data = await res.json();
      setBlog(data);
    } catch (err) {
      console.error("Error fetching blog", err);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (scrollTop / docHeight) * 100;
    setProgress(scrolled);
  };

  if (loading) return <div className="blog-loading">Loading article...</div>;
  if (!blog) return <div className="blog-error">Blog not found</div>;

  return (
    <div className="blog-detail-wrapper">
      {/* Reading Progress */}
      <div className="reading-progress">
        <div style={{ width: `${progress}%` }} />
      </div>

      {/* Back */}
      <Link to="/blogs" className="back-link">
        ← Back to Education
      </Link>

      {/* Header */}
      <header className="blog-header">
        <span className="blog-category">{blog.category}</span>
        <h1>{blog.title}</h1>
        <p className="blog-summary">{blog.summary}</p>

        <div className="blog-info">
          <span>{blog.readingTime || 5} min read</span>
          <span>
            {new Date(blog.createdAt).toLocaleDateString()}
          </span>
        </div>
      </header>

      {/* Cover Image */}
      {blog.coverImage && (
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="blog-cover"
        />
      )}

      {/* Content */}
      <article className="blog-content">
        {blog.content.split("\n").map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </article>

      {/* Tags */}
      {blog.tags?.length > 0 && (
        <div className="blog-tags">
          {blog.tags.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </div>
      )}
    </div>
  );
}
