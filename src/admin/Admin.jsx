import React, { useState, useEffect } from 'react';
import { Upload, Image, Newspaper, Mic2, X, Check, Loader, Trash2, Edit, Eye, Plus } from 'lucide-react';
import { uploadToCloudinary } from '../config/cloudinary';
import {
  createBlog,
  getAllBlogs,
  deleteBlog,
  createPodcast,
  getAllPodcasts,
  deletePodcast,
  createGalleryItem,
  getAllGalleryItems,
  deleteGalleryItem
} from '../services/firebaseService';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('blog');
  const [isUploading, setIsUploading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [preview, setPreview] = useState(null);

  // Blog State
  const [blogData, setBlogData] = useState({
    title: '',
    content: '',
    image: null,
    imageUrl: ''
  });

  // Podcast State
  const [podcastData, setPodcastData] = useState({
    title: '',
    description: '',
    link: ''
  });

  // Gallery State
  const [galleryData, setGalleryData] = useState({
    title: '',
    description: '',
    category: 'event',
    image: null,
    imageUrl: ''
  });

  const [items, setItems] = useState({
    blogs: [],
    podcasts: [],
    gallery: []
  });

  // Load data from Firebase
  useEffect(() => {
    getAllBlogs((blogs) => {
      setItems(prev => ({ ...prev, blogs }));
    });

    getAllPodcasts((podcasts) => {
      setItems(prev => ({ ...prev, podcasts }));
    });

    getAllGalleryItems((gallery) => {
      setItems(prev => ({ ...prev, gallery }));
    });
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleImagePreview = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      let imageUrl = '';
      
      if (blogData.image) {
        imageUrl = await uploadToCloudinary(blogData.image);
      }

      await createBlog({
        title: blogData.title,
        content: blogData.content,
        imageUrl
      });

      setBlogData({ title: '', content: '', image: null, imageUrl: '' });
      setPreview(null);
      showNotification('Blog post created successfully! 🎉');
    } catch (error) {
      console.error('Error creating blog:', error);
      showNotification('Failed to create blog post', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handlePodcastSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      await createPodcast({
        title: podcastData.title,
        description: podcastData.description,
        link: podcastData.link
      });

      setPodcastData({ title: '', description: '', link: '' });
      showNotification('Podcast added successfully! 🎙️');
    } catch (error) {
      console.error('Error adding podcast:', error);
      showNotification('Failed to add podcast', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleGallerySubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      let imageUrl = '';
      
      if (galleryData.image) {
        imageUrl = await uploadToCloudinary(galleryData.image);
      }

      await createGalleryItem({
        title: galleryData.title,
        description: galleryData.description,
        category: galleryData.category,
        imageUrl
      });

      setGalleryData({ title: '', description: '', category: 'event', image: null, imageUrl: '' });
      setPreview(null);
      showNotification('Image added to gallery! 📸');
    } catch (error) {
      console.error('Error adding to gallery:', error);
      showNotification('Failed to add to gallery', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const deleteItem = async (type, id) => {
    try {
      if (type === 'blogs') {
        await deleteBlog(id);
      } else if (type === 'podcasts') {
        await deletePodcast(id);
      } else if (type === 'gallery') {
        await deleteGalleryItem(id);
      }
      showNotification('Item deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting item:', error);
      showNotification('Failed to delete item', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-secondary-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-primary-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-xl shadow-2xl transform transition-all duration-500 animate-slide-down ${
          notification.type === 'success' 
            ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white' 
            : 'bg-gradient-to-r from-red-500 to-red-600 text-white'
        }`}>
          <div className="flex items-center gap-3">
            {notification.type === 'success' ? <Check size={20} /> : <X size={20} />}
            <p className="font-medium">{notification.message}</p>
          </div>
        </div>
      )}

      <div className="relative mt-20 z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full font-semibold text-sm tracking-wider shadow-lg">
            ADMIN PANEL
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary-700 via-primary-600 to-secondary-600 bg-clip-text text-transparent mb-4">
            AgYouth Rise
          </h1>
          <p className="text-gray-600 text-lg">Content Management Dashboard</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8 flex flex-wrap gap-4 justify-center animate-slide-up">
          <button
            onClick={() => setActiveTab('blog')}
            className={`group relative px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
              activeTab === 'blog'
                ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-xl'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
            }`}
          >
            <div className="flex items-center gap-3">
              <Newspaper size={24} />
              <span>Blog Posts</span>
            </div>
            {activeTab === 'blog' && (
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-secondary-400 rounded-full"></div>
            )}
          </button>

          <button
            onClick={() => setActiveTab('podcast')}
            className={`group relative px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
              activeTab === 'podcast'
                ? 'bg-gradient-to-r from-secondary-400 to-secondary-500 text-white shadow-xl'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
            }`}
          >
            <div className="flex items-center gap-3">
              <Mic2 size={24} />
              <span>Podcasts</span>
            </div>
            {activeTab === 'podcast' && (
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-primary-400 rounded-full"></div>
            )}
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`group relative px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
              activeTab === 'gallery'
                ? 'bg-gradient-to-r from-primary-600 to-secondary-500 text-white shadow-xl'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
            }`}
          >
            <div className="flex items-center gap-3">
              <Image size={24} />
              <span>Gallery</span>
            </div>
            {activeTab === 'gallery' && (
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-secondary-400 rounded-full"></div>
            )}
          </button>
        </div>

        {/* Content Area */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 animate-scale-in">
          {/* BLOG TAB */}
          {activeTab === 'blog' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <Newspaper className="text-primary-600" size={32} />
                Create Blog Post
              </h2>
              
              <form onSubmit={handleBlogSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Blog Title
                    </label>
                    <input
                      type="text"
                      value={blogData.title}
                      onChange={(e) => setBlogData({...blogData, title: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none"
                      placeholder="Enter an engaging title..."
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Content
                    </label>
                    <textarea
                      value={blogData.content}
                      onChange={(e) => setBlogData({...blogData, content: e.target.value})}
                      rows={8}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none resize-none"
                      placeholder="Write your blog content here..."
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Featured Image
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setBlogData({...blogData, image: file});
                            handleImagePreview(file);
                          }
                        }}
                        className="hidden"
                        id="blog-image"
                      />
                      <label
                        htmlFor="blog-image"
                        className="flex items-center justify-center w-full px-6 py-12 border-3 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-all group"
                      >
                        <div className="text-center">
                          <Upload className="mx-auto mb-3 text-gray-400 group-hover:text-primary-500 transition-colors" size={48} />
                          <p className="text-sm text-gray-600 font-medium">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      </label>
                    </div>
                    
                    {preview && (
                      <div className="mt-4 relative rounded-xl overflow-hidden">
                        <img src={preview} alt="Preview" className="w-full h-64 object-cover" />
                        <button
                          type="button"
                          onClick={() => {
                            setPreview(null);
                            setBlogData({...blogData, image: null});
                          }}
                          className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isUploading}
                  className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isUploading ? (
                    <>
                      <Loader className="animate-spin" size={24} />
                      Publishing...
                    </>
                  ) : (
                    <>
                      <Plus size={24} />
                      Publish Blog Post
                    </>
                  )}
                </button>
              </form>

              {/* Blog List */}
              {items.blogs.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Published Blogs</h3>
                  <div className="space-y-4">
                    {items.blogs.map(blog => (
                      <div key={blog.id} className="bg-gray-50 rounded-xl p-6 flex items-center gap-4 hover:shadow-md transition-shadow">
                        {blog.imageUrl && (
                          <img src={blog.imageUrl} alt={blog.title} className="w-24 h-24 object-cover rounded-lg" />
                        )}
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg text-gray-800">{blog.title}</h4>
                          <p className="text-sm text-gray-600 line-clamp-2">{blog.content}</p>
                        </div>
                        <button
                          onClick={() => deleteItem('blogs', blog.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* PODCAST TAB */}
          {activeTab === 'podcast' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <Mic2 className="text-secondary-500" size={32} />
                Add Podcast Episode
              </h2>
              
              <form onSubmit={handlePodcastSubmit} className="space-y-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Episode Title
                    </label>
                    <input
                      type="text"
                      value={podcastData.title}
                      onChange={(e) => setPodcastData({...podcastData, title: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-secondary-400 focus:ring-2 focus:ring-secondary-200 transition-all outline-none"
                      placeholder="E.g., Episode 5: Youth in Agriculture"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={podcastData.description}
                      onChange={(e) => setPodcastData({...podcastData, description: e.target.value})}
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-secondary-400 focus:ring-2 focus:ring-secondary-200 transition-all outline-none resize-none"
                      placeholder="Brief description of the episode..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Podcast Link
                    </label>
                    <input
                      type="url"
                      value={podcastData.link}
                      onChange={(e) => setPodcastData({...podcastData, link: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-secondary-400 focus:ring-2 focus:ring-secondary-200 transition-all outline-none"
                      placeholder="https://spotify.com/..."
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isUploading}
                  className="w-full bg-gradient-to-r from-secondary-400 to-secondary-500 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isUploading ? (
                    <>
                      <Loader className="animate-spin" size={24} />
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus size={24} />
                      Add Podcast
                    </>
                  )}
                </button>
              </form>

              {/* Podcast List */}
              {items.podcasts.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Podcast Episodes</h3>
                  <div className="space-y-4">
                    {items.podcasts.map(podcast => (
                      <div key={podcast.id} className="bg-gradient-to-r from-secondary-50 to-yellow-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg text-gray-800 mb-2">{podcast.title}</h4>
                            <p className="text-sm text-gray-600 mb-3">{podcast.description}</p>
                            <a href={podcast.link} target="_blank" rel="noopener noreferrer" className="text-secondary-600 hover:text-secondary-700 text-sm font-medium inline-flex items-center gap-1">
                              Listen Now <Eye size={16} />
                            </a>
                          </div>
                          <button
                            onClick={() => deleteItem('podcasts', podcast.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* GALLERY TAB */}
          {activeTab === 'gallery' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <Image className="text-primary-600" size={32} />
                Add to Gallery
              </h2>
              
              <form onSubmit={handleGallerySubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Image Title
                    </label>
                    <input
                      type="text"
                      value={galleryData.title}
                      onChange={(e) => setGalleryData({...galleryData, title: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none"
                      placeholder="E.g., Training Workshop 2024"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={galleryData.category}
                      onChange={(e) => setGalleryData({...galleryData, category: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none"
                    >
                      <option value="event">Event</option>
                      <option value="training">Training</option>
                      <option value="community">Community</option>
                      <option value="general">General</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={galleryData.description}
                      onChange={(e) => setGalleryData({...galleryData, description: e.target.value})}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none resize-none"
                      placeholder="Describe the image..."
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Upload Image
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setGalleryData({...galleryData, image: file});
                            handleImagePreview(file);
                          }
                        }}
                        className="hidden"
                        id="gallery-image"
                      />
                      <label
                        htmlFor="gallery-image"
                        className="flex items-center justify-center w-full px-6 py-12 border-3 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-all group"
                      >
                        <div className="text-center">
                          <Image className="mx-auto mb-3 text-gray-400 group-hover:text-primary-500 transition-colors" size={48} />
                          <p className="text-sm text-gray-600 font-medium">
                            Click to upload image
                          </p>
                          <p className="text-xs text-gray-500 mt-1">High quality images recommended</p>
                        </div>
                      </label>
                    </div>
                    
                    {preview && (
                      <div className="mt-4 relative rounded-xl overflow-hidden">
                        <img src={preview} alt="Preview" className="w-full h-96 object-cover" />
                        <button
                          type="button"
                          onClick={() => {
                            setPreview(null);
                            setGalleryData({...galleryData, image: null});
                          }}
                          className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isUploading}
                  className="w-full bg-gradient-to-r from-primary-600 to-secondary-500 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isUploading ? (
                    <>
                      <Loader className="animate-spin" size={24} />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Plus size={24} />
                      Add to Gallery
                    </>
                  )}
                </button>
              </form>

              {/* Gallery Grid */}
              {items.gallery.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Gallery Images</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.gallery.map(item => (
                      <div key={item.id} className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all">
                        <div className="aspect-square overflow-hidden">
                          <img 
                            src={item.imageUrl} 
                            alt={item.title} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-4">
                          <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full mb-2">
                            {item.category}
                          </span>
                          <h4 className="font-semibold text-gray-800 mb-1">{item.title}</h4>
                          <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                        </div>
                        <button
                          onClick={() => deleteItem('gallery', item.id)}
                          className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Stats Footer */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
          <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary-100 text-sm font-medium mb-1">Total Blogs</p>
                <p className="text-4xl font-bold">{items.blogs.length}</p>
              </div>
              <Newspaper size={48} className="opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-secondary-400 to-secondary-500 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm font-medium mb-1">Total Podcasts</p>
                <p className="text-4xl font-bold">{items.podcasts.length}</p>
              </div>
              <Mic2 size={48} className="opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary-600 to-secondary-500 rounded-2xl p-6 text-white shadow -xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary-100 text-sm font-medium mb-1">Gallery Images</p>
                <p className="text-4xl font-bold">{items.gallery.length}</p>
              </div>
              <Image size={48} className="opacity-50" />
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
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
      `}</style>
    </div>
  );
};

export default Admin;