import React, { useState, useEffect, useRef } from 'react';
import { Image as ImageIcon, X, Search, Grid, Layers, Sparkles, Eye, Calendar, Tag, ZoomIn, Download, Share2, Filter } from 'lucide-react';
import { getAllGalleryItems } from '../services/firebaseService';

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('masonry'); // masonry or grid
  const [isLoading, setIsLoading] = useState(true);
  const modalRef = useRef(null);

  // Load gallery from Firebase
  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = getAllGalleryItems((items) => {
      setGalleryItems(items);
      setIsLoading(false);
    });
    
    return () => unsubscribe && unsubscribe();
  }, []);

  // Get unique categories from items
  const categories = ['all', ...new Set(galleryItems.map(item => item.category))];

  // Filter gallery items
  const filteredItems = galleryItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Format date
  const formatDate = (timestamp) => {
    if (!timestamp) return 'Recently';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  // Open image modal
  const openImageModal = (item) => {
    setSelectedImage(item);
    document.body.style.overflow = 'hidden';
  };

  // Close modal
  const closeImageModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && e.target === modalRef.current) {
        closeImageModal();
      }
    };

    if (selectedImage) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selectedImage]);

  // Masonry layout generator
  const getMasonryClass = (index) => {
    const patterns = [
      'md:row-span-2', // tall
      'md:col-span-2', // wide
      'md:row-span-2 md:col-span-2', // large
      '', // normal
      '', // normal
      'md:col-span-2', // wide
    ];
    return patterns[index % patterns.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-primary-50/20 to-secondary-50/30">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-1/2 -right-20 w-96 h-96 bg-secondary-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-500 text-white rounded-full font-bold text-sm tracking-wider shadow-2xl animate-pulse">
              <Sparkles className="w-5 h-5" />
              VISUAL STORIES
              <Sparkles className="w-5 h-5" />
            </div>

            {/* Main Title */}
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-none">
              <span className="bg-gradient-to-r from-primary-700 via-primary-600 to-secondary-600 bg-clip-text text-transparent drop-shadow-2xl">
                Impact
              </span>
              <br />
              <span className="text-gray-900">Gallery</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Witness the transformation • See the change • Feel the impact
            </p>

            {/* Search & Controls */}
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Search Bar */}
              <div className="relative animate-slide-up">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <input
                  type="text"
                  placeholder="Search by title, description, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-16 pr-6 py-5 rounded-2xl border-2 border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all outline-none text-lg shadow-xl bg-white/80 backdrop-blur-sm"
                />
              </div>

              {/* View Mode Toggle */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setViewMode('masonry')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    viewMode === 'masonry'
                      ? 'bg-primary-600 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                  }`}
                >
                  <Layers className="w-5 h-5" />
                  Masonry
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    viewMode === 'grid'
                      ? 'bg-primary-600 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                  Grid
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-40 left-10 w-24 h-24 border-4 border-primary-400 rounded-full opacity-20 animate-spin-slow"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 border-4 border-secondary-400 rounded-lg opacity-20 animate-bounce"></div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <Filter className="w-5 h-5 text-gray-500 flex-shrink-0" />
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-xl'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-md'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                <ImageIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-primary-600" />
              </div>
              <p className="text-gray-600 text-lg font-medium mt-6">Loading stunning visuals...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-block mb-6 p-8 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-3xl">
                <ImageIcon className="w-20 h-20 text-primary-600" />
              </div>
              <h3 className="text-4xl font-bold text-gray-800 mb-4">
                {searchQuery ? 'No matches found' : 'Gallery Coming Soon'}
              </h3>
              <p className="text-gray-600 text-lg max-w-md mx-auto">
                {searchQuery 
                  ? 'Try different search terms or browse all categories.'
                  : 'We\'re curating amazing visuals. Check back soon!'}
              </p>
            </div>
          ) : (
            <>
              {/* Stats Bar */}
              <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <Eye className="w-6 h-6 text-primary-600" />
                  <span className="text-gray-700 font-bold text-lg">
                    {filteredItems.length} {filteredItems.length === 1 ? 'Image' : 'Images'}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {selectedCategory !== 'all' && (
                    <span className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full font-semibold">
                      {selectedCategory}
                    </span>
                  )}
                </div>
              </div>

              {/* Masonry Layout */}
              {viewMode === 'masonry' && (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] gap-4">
                  {filteredItems.map((item, index) => (
                    <div
                      key={item.id}
                      onClick={() => openImageModal(item)}
                      className={`group relative overflow-hidden rounded-2xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 animate-fade-in ${getMasonryClass(index)}`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {/* Image */}
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="absolute inset-0 flex flex-col justify-end p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          {/* Category Badge */}
                          <span className="inline-block w-fit px-3 py-1 bg-secondary-400 text-white rounded-full text-xs font-bold mb-2 uppercase tracking-wider">
                            {item.category}
                          </span>
                          
                          {/* Title */}
                          <h3 className="text-white font-bold text-lg mb-1 line-clamp-2">
                            {item.title}
                          </h3>
                          
                          {/* Description */}
                          <p className="text-gray-200 text-sm line-clamp-2 mb-3">
                            {item.description}
                          </p>

                          {/* View Button */}
                          <div className="flex items-center gap-2 text-white font-semibold">
                            <ZoomIn className="w-4 h-4" />
                            <span className="text-sm">View Full Image</span>
                          </div>
                        </div>
                      </div>

                      {/* Hover Effect Border */}
                      <div className="absolute inset-0 border-4 border-primary-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  ))}
                </div>
              )}

              {/* Grid Layout */}
              {viewMode === 'grid' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems.map((item, index) => (
                    <div
                      key={item.id}
                      onClick={() => openImageModal(item)}
                      className="group relative overflow-hidden rounded-2xl cursor-pointer bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {/* Image */}
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-bold mb-3 uppercase">
                          {item.category}
                        </span>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                          {item.description}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(item.createdAt)}
                          </div>
                          <button className="text-primary-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                            View
                            <ZoomIn className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Hover Glow */}
                      <div className="absolute inset-0 border-2 border-primary-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Image Modal/Lightbox */}
      {selectedImage && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm animate-fade-in"
        >
          {/* Close Button */}
          <button
            onClick={closeImageModal}
            className="absolute top-6 right-6 z-10 p-4 bg-white/10 hover:bg-red-500 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:rotate-90 group"
          >
            <X className="w-7 h-7" />
          </button>

          {/* Modal Content */}
          <div className="relative max-w-6xl w-full max-h-[90vh] animate-scale-in">
            {/* Main Image */}
            <div className="relative mb-6 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="w-full max-h-[70vh] object-contain bg-black"
              />
            </div>

            {/* Image Info Card */}
            <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-2xl">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-full text-sm font-bold uppercase tracking-wider">
                      {selectedImage.category}
                    </span>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Calendar className="w-4 h-4" />
                      {formatDate(selectedImage.createdAt)}
                    </div>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                    {selectedImage.title}
                  </h2>
                  
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {selectedImage.description}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="p-3 bg-primary-100 hover:bg-primary-200 text-primary-700 rounded-xl transition-all duration-300 hover:scale-110 group">
                    <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                  </button>
                  <button className="p-3 bg-secondary-100 hover:bg-secondary-200 text-secondary-700 rounded-xl transition-all duration-300 hover:scale-110 group">
                    <Share2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Decorative Bar */}
              <div className="h-1 w-32 bg-gradient-to-r from-primary-600 to-secondary-400 rounded-full"></div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Animations & Styles */}
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

        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Gallery;