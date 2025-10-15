import React, { useState, useEffect, useRef } from 'react';
import { Calendar, User, ArrowRight, X, Search, Tag, TrendingUp, Clock, Share2, BookmarkPlus, Eye } from 'lucide-react';
import { getAllBlogs } from '../services/firebaseService';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const modalRef = useRef(null);

  // Load blogs from Firebase
  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = getAllBlogs((fetchedBlogs) => {
      setBlogs(fetchedBlogs);
      setIsLoading(false);
    });
    
    return () => unsubscribe && unsubscribe();
  }, []);

  // Filter blogs based on search
  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Format date
  const formatDate = (timestamp) => {
    if (!timestamp) return 'Recently';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  // Calculate read time
  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  // Open modal
  const openBlogModal = (blog) => {
    setSelectedBlog(blog);
    document.body.style.overflow = 'hidden';
  };

  // Close modal
  const closeBlogModal = () => {
    setSelectedBlog(null);
    document.body.style.overflow = 'unset';
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && e.target === modalRef.current) {
        closeBlogModal();
      }
    };

    if (selectedBlog) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selectedBlog]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-primary-50/30 to-secondary-50/20">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-secondary-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <div className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full font-semibold text-sm tracking-wider shadow-lg">
              INSIGHTS & STORIES
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary-700 via-primary-600 to-secondary-600 bg-clip-text text-transparent">
                AgYouth
              </span>
              <span className="text-gray-800"> Blog</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              Discover inspiring stories, expert insights, and the latest updates on youth empowerment in agriculture
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative animate-slide-up">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder="Search articles, topics, insights..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-6 py-5 rounded-2xl border-2 border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all outline-none text-lg shadow-xl"
              />
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 border-4 border-primary-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 border-4 border-secondary-300 rounded-full opacity-20 animate-pulse animation-delay-2000"></div>
      </section>

      {/* Blog Grid Section */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600 text-lg font-medium">Loading amazing stories...</p>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-block mb-6 p-6 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full">
                <BookmarkPlus className="w-16 h-16 text-primary-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                {searchQuery ? 'No articles found' : 'No blog posts yet'}
              </h3>
              <p className="text-gray-600 text-lg max-w-md mx-auto">
                {searchQuery 
                  ? 'Try adjusting your search terms to find what you\'re looking for.'
                  : 'Stay tuned! Amazing stories are coming soon.'}
              </p>
            </div>
          ) : (
            <>
              {/* Stats Bar */}
              <div className="mb-12 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary-600" />
                  <span className="text-gray-700 font-semibold">
                    {filteredBlogs.length} {filteredBlogs.length === 1 ? 'Article' : 'Articles'} Found
                  </span>
                </div>
              </div>

              {/* Featured Post (First Blog) */}
              {filteredBlogs.length > 0 && (
                <div className="mb-16 animate-scale-in">
                  <div className="relative group bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
                    <div className="grid md:grid-cols-2 gap-0">
                      {/* Image Side */}
                      <div className="relative h-80 md:h-auto overflow-hidden">
                        {filteredBlogs[0].imageUrl ? (
                          <img
                            src={filteredBlogs[0].imageUrl}
                            alt={filteredBlogs[0].title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center">
                            <BookmarkPlus className="w-24 h-24 text-white opacity-50" />
                          </div>
                        )}
                        <div className="absolute top-6 left-6">
                          <span className="px-4 py-2 bg-secondary-400 text-white font-bold rounded-full text-sm shadow-lg">
                            ⭐ FEATURED
                          </span>
                        </div>
                      </div>

                      {/* Content Side */}
                      <div className="p-8 md:p-12 flex flex-col justify-center">
                        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {formatDate(filteredBlogs[0].createdAt)}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {calculateReadTime(filteredBlogs[0].content)}
                          </div>
                        </div>

                        <h2 className="text-4xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors line-clamp-3">
                          {filteredBlogs[0].title}
                        </h2>

                        <p className="text-gray-600 text-lg mb-6 line-clamp-4">
                          {filteredBlogs[0].content}
                        </p>

                        <button
                          onClick={() => openBlogModal(filteredBlogs[0])}
                          className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 group"
                        >
                          Read Full Story
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Blog Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBlogs.slice(1).map((blog, index) => (
                  <div
                    key={blog.id}
                    className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      {blog.imageUrl ? (
                        <img
                          src={blog.imageUrl}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center">
                          <BookmarkPlus className="w-16 h-16 text-white opacity-50" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(blog.createdAt)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {calculateReadTime(blog.content)}
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {blog.title}
                      </h3>

                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {blog.content}
                      </p>

                      <button
                        onClick={() => openBlogModal(blog)}
                        className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:gap-3 transition-all group"
                      >
                        Read More
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Blog Modal */}
      {selectedBlog && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
        >
          <div className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-scale-in">
            {/* Close Button */}
            <button
              onClick={closeBlogModal}
              className="absolute top-6 right-6 z-10 p-3 bg-white/90 hover:bg-red-500 text-gray-800 hover:text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 group"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[90vh] scrollbar-thin scrollbar-thumb-primary-500 scrollbar-track-gray-100">
              {/* Featured Image */}
              {selectedBlog.imageUrl && (
                <div className="relative h-96 overflow-hidden">
                  <img
                    src={selectedBlog.imageUrl}
                    alt={selectedBlog.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
              )}

              {/* Article Content */}
              <div className="p-8 md:p-12">
                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary-600" />
                    {formatDate(selectedBlog.createdAt)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary-600" />
                    {calculateReadTime(selectedBlog.content)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-primary-600" />
                    Featured Story
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  {selectedBlog.title}
                </h1>

                {/* Divider */}
                <div className="h-1 w-24 bg-gradient-to-r from-primary-600 to-secondary-400 rounded-full mb-8"></div>

                {/* Content */}
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                    {selectedBlog.content}
                  </p>
                </div>

                {/* Share Section */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <Share2 className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-700 font-semibold">Share this article</span>
                    </div>
                    <div className="flex gap-3">
                      <button className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors">
                        Share
                      </button>
                      <button className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors">
                        Bookmark
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Animations */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        
        .animate-blob {
          animation: blob 20s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
        }

        .scrollbar-thumb-primary-500::-webkit-scrollbar-thumb {
          background-color: #218342;
          border-radius: 4px;
        }

        .scrollbar-track-gray-100::-webkit-scrollbar-track {
          background-color: #f3f4f6;
        }
      `}</style>
    </div>
  );
};

export default Blog;