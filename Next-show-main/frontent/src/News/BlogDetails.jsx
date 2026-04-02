import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogDetail, fetchActiveBlogs } from "../redux/HomeContentSlice/blogSlice";
import LoadingComponents from "../Components/LoadingComponents";

const BlogDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedBlog, activeBlogs, isLoading } = useSelector((state) => state.blogSection);

  useEffect(() => {
    dispatch(fetchBlogDetail(id));
    dispatch(fetchActiveBlogs());
    window.scrollTo(0, 0);
  }, [dispatch, id]);

  if (isLoading) return <LoadingComponents />;
  
  // If no blog is found, show a clearer error
  if (!selectedBlog) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h2 className="text-2xl mb-4">News Article Not Found</h2>
        <Link to="/news" className="text-red-500 underline">Back to News</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f4f4] text-gray-900 font-sans">
      {/* 🎬 HEADER BANNER AREA (Dark) */}
      <div className="bg-black pt-24 pb-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <span className="bg-red-600 text-white text-[10px] font-bold px-3 py-1 uppercase rounded-sm mb-4 inline-block tracking-widest">
            {selectedBlog.category || "LATEST UPDATE"}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-6">
            {selectedBlog.title}
          </h1>
          <div className="flex justify-center items-center gap-6 text-gray-400 text-sm italic">
            <span>📅 {selectedBlog.newsDate || "April 30, 2026"}</span>
            <span>✍️ By Admin</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-12 gap-8">
        
        {/* 📝 LEFT: ARTICLE CONTENT */}
        <div className="col-span-12 lg:col-span-8 bg-white p-6 md:p-10 rounded-lg shadow-sm border border-gray-200">
          <img 
            src={selectedBlog.bannerImage} 
            className="w-full h-auto rounded-lg mb-8 shadow-md" 
            alt={selectedBlog.title} 
          />

          <h3 className="text-2xl font-bold mb-6 text-black border-l-4 border-red-600 pl-4">
            Is {selectedBlog.title.split(' ')[0]} Movie the Big Comeback? Let's Break It Down!
          </h3>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="font-bold text-gray-900 mb-6 text-xl">
              {selectedBlog.shortDescription}
            </p>
            
            <div className="whitespace-pre-line space-y-4">
              {selectedBlog.longDescription || "Full article content is being updated..."}
            </div>
          </div>

          {/* Credits Section */}
          <div className="mt-12 pt-8 border-t border-gray-100 grid grid-cols-2 gap-6 text-sm">
             <div>
               <p className="text-gray-500 uppercase font-bold text-[10px]">Director</p>
               <p className="font-bold text-black">{selectedBlog.directedBy}</p>
             </div>
             <div>
               <p className="text-gray-500 uppercase font-bold text-[10px]">Star Cast</p>
               <p className="font-bold text-black">{selectedBlog.starCast}</p>
             </div>
          </div>
        </div>

        {/* ⚡ RIGHT: SIDEBAR (Like Image 3) */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          {/* Search Box */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="relative">
              <input type="text" placeholder="Search News..." className="w-full p-3 bg-gray-50 border border-gray-200 rounded text-sm outline-none focus:border-red-600" />
            </div>
          </div>

          {/* Upcoming / Recent News */}
          <div className="bg-[#1e2751] text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-md font-bold mb-6 border-b border-white/20 pb-2 uppercase tracking-wider">
              Upcoming Updates
            </h3>
            <div className="space-y-6">
              {activeBlogs.filter(b => b.id !== parseInt(id)).slice(0, 4).map((blog) => (
                <Link to={`/news/${blog.id}`} key={blog.id} className="flex gap-4 group">
                  <img src={blog.bannerImage} className="w-20 h-14 object-cover rounded flex-shrink-0" alt="" />
                  <div>
                    <h4 className="text-xs font-bold leading-snug group-hover:text-red-400 transition-colors">
                      {blog.title}
                    </h4>
                    <p className="text-[9px] text-gray-400 mt-1 uppercase">{blog.newsDate}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BlogDetails;