const Blog = require("../models/Blog");

exports.getAllBlogs = async (req, res) => {
  const blogs = await Blog.find({ isPublished: true })
    .sort({ createdAt: -1 });
  res.json(blogs);
};

exports.getBlogBySlug = async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug });
  res.json(blog);
};

exports.getBlogsByCategory = async (req, res) => {
  const blogs = await Blog.find({
    category: req.params.category
  });
  res.json(blogs);
};
