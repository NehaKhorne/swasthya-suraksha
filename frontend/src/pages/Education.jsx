import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./education.css";

const categories = [
  "All",
  "Menstrual Health",
  "PCOS & Hormonal Health",
  "Sexual Health & Hygiene",
  "Mental Health",
  "Safety & Legal Rights"
];

// 🎥 PCOS Videos
const pcosVideos = [
  {
    title: "Understanding PCOS – Causes & Symptoms",
    url: "https://www.youtube.com/embed/spe_mto4gFk"
  },
  {
    title: "PCOS Diet & Lifestyle Tips",
    url: "https://www.youtube.com/embed/PeL_XtBrOxw"
  },
  {
    title: "How PCOS Affects Hormones",
    url: "https://www.youtube.com/embed/3RDMV6q5XWk"
  },
  {
    title: "PCOS Exercise Routine",
    url: "https://www.youtube.com/embed/Lf8Z9u6J9fI"
  }
];

export default function Education() {
  const [blogs, setBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs`);
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.error("Failed to fetch blogs", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter((b) => b.category === selectedCategory);

  return (
    <div className="education-page">

      {/* Header */}
      <div className="education-header">
        <h1>Women’s Health Learning Hub</h1>
        <p>
          Trusted videos & blogs on PCOS, menstrual health, hygiene,
          safety & emotional wellbeing.
        </p>
      </div>

      {/* 🎥 PCOS Video Section */}
      <div className="video-section">
        <h2>🎗 PCOS Awareness & Management Videos</h2>

        <div className="video-grid">
          {pcosVideos.map((video, index) => (
            <div className="video-card" key={index}>
              <iframe
                src={video.url}
                title={video.title}
                frameBorder="0"
                allowFullScreen
              ></iframe>
              <h4>{video.title}</h4>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="category-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            className={cat === selectedCategory ? "active" : ""}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blogs */}
      {loading ? (
        <div className="loading">Loading articles...</div>
      ) : filteredBlogs.length === 0 ? (
        <div className="empty">
          No blogs available for this category.
        </div>
      ) : (
        <div className="blog-grid">
          {filteredBlogs.map((blog) => (
            <Link
              to={`/blogs/${blog.slug}`}
              className="blog-card"
              key={blog._id}
            >
              {blog.coverImage && (
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="blog-image"
                />
              )}

              <div className="blog-content">
                <span className="blog-category">{blog.category}</span>

                <h3>{blog.title}</h3>
                <p>{blog.summary}</p>

                <div className="blog-meta">
                  <span>{blog.readingTime || 5} min read</span>
                  <span>
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
