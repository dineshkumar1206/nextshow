const express = require("express");
const {
  getActiveBlogs,
  getAllBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../../controllers/HomeControllers/blogController");
const {
  AdminAuthProtect,
} = require("../../middlewares/AdminAuthMiddleware/AdminMiddleware");
const { uploadMix } = require("../../config/cloudinaryConfig");

const router = express.Router();

// 1. Active நிலையில் உள்ள ப்ளாக்குகளை மட்டும் பெறுதல் (Home Page-ல் காட்ட)
router.get("/blogs-active", getActiveBlogs);

// 3. அனைத்து ப்ளாக்குகளையும் பெறுதல்
router.get("/blogs-all", AdminAuthProtect, getAllBlogs);

// 4. புதிய ப்ளாக் உருவாக்குதல்
router.post(
  "/blog-create",
  AdminAuthProtect,
  uploadMix.single("bannerImage"), // ஒரே ஒரு இமேஜ் மட்டும் என்பதால் single
  createBlog
);

// 2. ஒரு குறிப்பிட்ட ப்ளாக்கை மட்டும் பெறுதல் (Details Page-ல் காட்ட)
router.get("/blog-detail/:id", getBlogById);

// 5. ப்ளாக்கை புதுப்பித்தல்
router.put(
  "/blog-update/:id",
  AdminAuthProtect,
  uploadMix.single("bannerImage"),
  updateBlog
);

// 6. ப்ளாக்கை நீக்குதல்
router.delete("/blog-delete/:id", AdminAuthProtect, deleteBlog);

module.exports = router;
