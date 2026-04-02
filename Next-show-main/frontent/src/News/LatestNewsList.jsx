import React from "react";
import { useNavigate } from "react-router-dom";

const LatestNewsList = ({ blogs }) => {
  const navigate = useNavigate();

  // If there are no blogs or fewer than 5 (since 5 are in the Hero section)
  // We show the rest of the blogs here
  const remainingBlogs = blogs && blogs.length > 5 ? blogs.slice(5) : blogs;

  if (!blogs || blogs.length === 0) return null;

  return (
    <section className="py-12 font-sans bg-black">
      <div className="max-w-[1400px] mx-auto px-4">
        {remainingBlogs.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-12 gap-8 mb-20 border-b border-white/5 pb-16 last:border-0"
          >
            {/* --- Column 1: Main Story (5/12) --- */}
            <div 
              className="col-span-12 lg:col-span-5 group cursor-pointer"
              onClick={() => navigate(`/news/${item.id}`)}
            >
              <div className="relative overflow-hidden mb-6 rounded-2xl shadow-lg border border-white/5">
                <img
                  src={item.bannerImage}
                  className="w-full h-[350px] object-cover transition-transform duration-700 group-hover:scale-105"
                  alt={item.title}
                />
                <div className="absolute top-4 left-4">
                   <span className="bg-red-600 text-white px-3 py-1 font-bold text-[10px] uppercase tracking-widest rounded-sm">
                     {item.category || "Trending"}
                   </span>
                </div>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4 leading-tight group-hover:text-red-500 transition-colors">
                {item.title}
              </h2>
              <div className="flex items-center gap-4 text-[11px] text-gray-500 font-bold uppercase mb-4 tracking-wider">
                <span className="text-red-500">BY ADMIN</span>
                <span>•</span>
                <span>{item.newsDate || "Recent"}</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 font-light">
                {item.shortDescription}
              </p>
            </div>

            {/* --- Column 2: Technical Details / Cast (3/12) --- */}
            <div className="col-span-12 md:col-span-6 lg:col-span-3 space-y-6 lg:border-x border-white/5 px-6">
              <div className="pb-2 mb-4 border-b border-red-600/30">
                <span className="text-[14px] font-bold text-gray-300 uppercase tracking-widest">
                  Movie Credits
                </span>
              </div>
              
              <div className="space-y-4">
                 <div className="group">
                    <p className="text-[10px] text-gray-500 uppercase font-black">Star Cast</p>
                    <p className="text-sm text-gray-300 mt-1">{item.starCast || "N/A"}</p>
                 </div>
                 <div className="group">
                    <p className="text-[10px] text-gray-500 uppercase font-black">Director</p>
                    <p className="text-sm text-gray-300 mt-1">{item.directedBy}</p>
                 </div>
                 <div className="group">
                    <p className="text-[10px] text-gray-500 uppercase font-black">Cinematography</p>
                    <p className="text-sm text-gray-300 mt-1">{item.cinematography || "N/A"}</p>
                 </div>
              </div>
            </div>

            {/* --- Column 3: Sidebar Style Promo (4/12) --- */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <div 
                onClick={() => navigate(`/news/${item.id}`)}
                className="group cursor-pointer bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-red-600/30 transition-all"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-red-500 text-[10px] font-black uppercase tracking-widest">
                    Quick View
                  </span>
                  <div className="h-[1px] flex-1 bg-white/10"></div>
                </div>
                
                <p className="text-gray-400 text-sm italic leading-relaxed mb-6">
                  "{item.shortDescription.substring(0, 100)}..."
                </p>
                
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-xs font-bold">N</div>
                      <span className="text-[10px] font-bold text-gray-300 uppercase">Next Show Exclusive</span>
                   </div>
                   <span className="text-red-500 text-[10px] font-bold underline underline-offset-4">READ FULL ARTICLE</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestNewsList;