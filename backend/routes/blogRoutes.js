const express = require("express");
const router = express.Router();
const {
  getAllBlogs,
  getBlogBySlug,
  getBlogsByCategory
} = require("../controllers/blogController");

router.get("/", getAllBlogs);
router.get("/category/:category", getBlogsByCategory);
router.get("/:slug", getBlogBySlug);

module.exports = router;
