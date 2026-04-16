const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },

    category: {
      type: String,
      enum: [
        "Menstrual Health",
        "PCOS & Hormonal Health",
        "Sexual Health & Hygiene",
        "Mental Health",
        "Safety & Legal Rights"
      ],
      required: true
    },

    tags: [String],

    coverImage: String,
    readingTime: Number,

    isPublished: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
