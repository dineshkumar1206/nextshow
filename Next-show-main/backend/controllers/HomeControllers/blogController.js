const BlogsSchema = require("../../models/HomePage/BlogsSection");

// 1. அனைத்து ப்ளாக்குகளையும் பெறுதல் (ADMIN READ)
exports.getAllBlogs = async (req, res) => {
  try {
    const blogList = await BlogsSchema.findAll({
      order: [["createdAt", "ASC"]], // சமீபத்திய செய்திகள் முதலில் வர
    });

    // ப்ளாக்குகளே இல்லை என்றால் 200 OK உடன் வெறும் Array அனுப்பலாம்
    // அல்லது Frontend-ல் "No Blogs Found" எனக் காட்ட வசதியாக அனுப்பலாம்.

    return res.status(200).json({
      success: true,
      count: blogList.length,
      data: blogList,
    });
  } catch (error) {
    console.error("Error fetching all blogs:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching blogs. Please try again later.",
    });
  }
};

// 2. ஒரு குறிப்பிட்ட ப்ளாக்கை மட்டும் பெறுதல் (DETAILS VIEW)
exports.getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    // ID இல்லையென்றால் அல்லது தவறாக இருந்தால்
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Blog ID is required" });
    }

    const blog = await BlogsSchema.findByPk(id);
    // ப்ளாக் டேட்டாபேஸில் இல்லை என்றால் (தவறான URL மூலம் வந்தால்)
    if (!blog) {
      return res.status(404).json({
        success: false,
        message:
          "The movie news you are looking for does not exist or has been removed.",
      });
    }

    return res.status(200).json({ success: true, data: blog });
  } catch (error) {
    console.error("Error fetching blog detail:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while loading the details.",
    });
  }
};

// 3. Active ப்ளாக்குகளை மட்டும் பெறுதல் (PUBLIC UI)
exports.getActiveBlogs = async (req, res) => {
  try {
    const activeBlogs = await BlogsSchema.findAll({
      where: {
        isActive: true,
      },
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      data: activeBlogs,
    });
  } catch (error) {
    console.error("Error fetching active blogs:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to load latest movie news.",
    });
  }
};

// 4. புதிய ப்ளாக் உருவாக்குதல் (CREATE)
exports.createBlog = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Banner image is required" });
    }

    const {
      title,
      shortDescription,
      longDescription,
      starCast,
      directedBy,
      producedBy,
      cinematography,
      newsDate,
      isActive,
      order,
    } = req.body;

    // மிக முக்கியமான தகவல்கள் விடுபட்டிருந்தால்
    if (!title || !shortDescription || !directedBy) {
      return res.status(400).json({
        success: false,
        message: "Please provide Title, Short Description, and Director name.",
      });
    }

    const bannerImage = req.file.path;
    const imagePublicId = req.file.filename;

    const newBlog = await BlogsSchema.create({
      title,
      bannerImage,
      imagePublicId,
      shortDescription,
      longDescription,
      starCast,
      directedBy,
      producedBy,
      cinematography,
      newsDate,
      order: order || 1,
      isActive: isActive === "true" || isActive === true,
    });

    return res.status(201).json({
      success: true,
      message: "New movie news added successfully",
      data: newBlog,
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    return res.status(500).json({
      success: false,
      message: "Creation failed. Ensure all fields are valid.",
      error: error.message,
    });
  }
};

// 5. ப்ளாக்கை புதுப்பித்தல் (UPDATE)
exports.updateBlog = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const blog = await BlogsSchema.findByPk(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // புதிய இமேஜ் இருந்தால் அப்டேட் செய்யவும்
    if (req.file) {
      blog.bannerImage = req.file.path;
      blog.imagePublicId = req.file.filename;
    }

    // மற்ற ஃபீல்டுகளை அப்டேட் செய்ய
    Object.keys(updateData).forEach((key) => {
      if (key === "isActive") {
        blog.isActive = updateData[key] === "true" || updateData[key] === true;
      } else {
        blog[key] = updateData[key] || blog[key];
      }
    });

    await blog.save();
    return res.status(200).json({
      message: "Blog updated successfully",
      data: blog,
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    return res.status(500).json({ message: "Update failed" });
  }
};

// 6. நீக்குதல் (DELETE)
exports.deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await BlogsSchema.findByPk(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    await blog.destroy(); // Hooks மூலம் Cloudinary இமேஜ் நீக்கப்படும்
    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return res.status(500).json({ message: "Deletion failed" });
  }
};
