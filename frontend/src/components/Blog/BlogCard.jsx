import { Link } from "react-router-dom";

export default function BlogCard({ blog }) {
  return (
    <Link to={`/blogs/${blog.slug}`} className="blog-card">
      <div className="blog-card-body">
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
  );
}
