import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./blogDetail.css";

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  // TEMP DATA (replace with API later)
  useEffect(() => {
    setBlog({
      title: "Understanding Menstrual Cycle",
      category: "Menstrual Health",
      summary: "Simple explanation of periods and cycles.",
      youtubeUrl: "https://www.youtube.com/watch?v=Qkjp8v8bHhM",
      content: `
The menstrual cycle is a natural process in women.

It usually lasts between 28–35 days.

Common symptoms include:
• Cramps
• Mood changes
• Fatigue

When to see a doctor:
• Very heavy bleeding
• Missing periods
• Severe pain
      `
    });
  }, []);

  if (!blog) return <p>Loading...</p>;

  // Convert YouTube link to embed
  const videoId = blog.youtubeUrl.split("v=")[1];

  return (
    <div className="blog-detail">

      <Link to="/blogs" className="back-btn">← Back to Blogs</Link>

      <span className="category">{blog.category}</span>
      <h1>{blog.title}</h1>
      <p className="summary">{blog.summary}</p>

      {/* 🎥 YOUTUBE VIDEO */}
      <div className="video-wrapper">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="Educational video"
          frameBorder="0"
          allowFullScreen
        />
      </div>

      {/* 📖 WRITTEN CONTENT */}
      <div className="content">
        {blog.content.split("\n").map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>

    </div>
  );
}
