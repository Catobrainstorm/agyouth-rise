import React, { useState, useEffect, useRef } from 'react';
import { Mic2, Play, Pause, Search, Calendar, Clock, TrendingUp, Headphones, ExternalLink, Share2, BookmarkPlus, Volume2, Radio, Sparkles, Filter } from 'lucide-react';
import { getAllPodcasts } from '../services/firebaseService';

const Podcast = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPodcast, setSelectedPodcast] = useState(null);

  // Load podcasts from Firebase
  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = getAllPodcasts((fetchedPodcasts) => {
      setPodcasts(fetchedPodcasts);
      setIsLoading(false);
    });
    
    return () => unsubscribe && unsubscribe();
  }, []);

  // Filter podcasts based on search
  const filteredPodcasts = podcasts.filter(podcast =>
    podcast.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    podcast.description.toLowerCase().includes(searchQuery.toLowerCase())
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

  // Calculate episode number
  const getEpisodeNumber = (index) => {
    return podcasts.length - index;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-secondary-50/20 to-primary-50/30">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-20 left-20 w-96 h-96 bg-secondary-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-20 w-96 h-96 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-secondary-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-gradient-to-r from-secondary-400 to-secondary-500 text-white rounded-full font-bold text-sm tracking-wider shadow-2xl animate-pulse">
              <Radio className="w-5 h-5 animate-pulse" />
              ON AIR
              <Volume2 className="w-5 h-5 animate-pulse" />
            </div>

            {/* Main Title */}
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-none">
              <span className="bg-gradient-to-r from-secondary-600 via-secondary-500 to-primary-600 bg-clip-text text-transparent drop-shadow-2xl">
                AgYouth Rise
              </span>
              <br />
              <span className="text-gray-900">Podcast</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Voices of Change • Stories of Impact • Conversations that Matter
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative animate-slide-up">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder="Search episodes by title or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-6 py-5 rounded-2xl border-2 border-gray-200 focus:border-secondary-400 focus:ring-4 focus:ring-secondary-100 transition-all outline-none text-lg shadow-xl bg-white/80 backdrop-blur-sm"
              />
            </div>
          </div>
        </div>

        {/* Floating Sound Waves */}
        <div className="absolute top-1/4 left-10 w-2 h-32 bg-gradient-to-b from-secondary-400 to-transparent rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-1/3 left-20 w-2 h-24 bg-gradient-to-b from-secondary-400 to-transparent rounded-full opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-16 w-2 h-40 bg-gradient-to-b from-secondary-400 to-transparent rounded-full opacity-30 animate-pulse animation-delay-4000"></div>
        
        <div className="absolute top-1/4 right-10 w-2 h-32 bg-gradient-to-b from-primary-400 to-transparent rounded-full opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/3 right-20 w-2 h-24 bg-gradient-to-b from-primary-400 to-transparent rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-1/2 right-16 w-2 h-40 bg-gradient-to-b from-primary-400 to-transparent rounded-full opacity-30 animate-pulse animation-delay-4000"></div>
      </section>

      {/* Podcast Episodes Section */}
      <section className="relative py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-secondary-500 border-t-transparent rounded-full animate-spin"></div>
                <Mic2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-secondary-600" />
              </div>
              <p className="text-gray-600 text-lg font-medium mt-6">Loading episodes...</p>
            </div>
          ) : filteredPodcasts.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-block mb-6 p-8 bg-gradient-to-br from-secondary-100 to-primary-100 rounded-full">
                <Headphones className="w-20 h-20 text-secondary-600" />
              </div>
              <h3 className="text-4xl font-bold text-gray-800 mb-4">
                {searchQuery ? 'No episodes found' : 'Podcast Coming Soon'}
              </h3>
              <p className="text-gray-600 text-lg max-w-md mx-auto">
                {searchQuery 
                  ? 'Try different search terms to find episodes.'
                  : 'Exciting conversations are on the way. Stay tuned!'}
              </p>
            </div>
          ) : (
            <>
              {/* Stats Bar */}
              <div className="mb-12 flex items-center justify-between flex-wrap gap-4 bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-secondary-600" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{filteredPodcasts.length}</p>
                    <p className="text-sm text-gray-600">Episodes Available</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Headphones className="w-6 h-6 text-primary-600" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900">5K+</p>
                    <p className="text-sm text-gray-600">Total Listeners</p>
                  </div>
                </div>
              </div>

              {/* Featured Episode (First Podcast) */}
              {filteredPodcasts.length > 0 && (
                <div className="mb-12 animate-scale-in">
                  <div className="relative bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-3xl shadow-2xl overflow-hidden p-8 md:p-12 text-white">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-32 translate-x-32"></div>
                      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full translate-y-32 -translate-x-32"></div>
                    </div>

                    <div className="relative z-10">
                      {/* Badge */}
                      <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold">
                        <Sparkles className="w-4 h-4" />
                        LATEST EPISODE
                      </div>

                      {/* Episode Number */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                          <span className="text-2xl font-bold">EP {getEpisodeNumber(0)}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(filteredPodcasts[0].createdAt)}
                          </div>
                        </div>
                      </div>

                      {/* Title */}
                      <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                        {filteredPodcasts[0].title}
                      </h2>

                      {/* Description */}
                      <p className="text-lg text-white/90 mb-8 leading-relaxed">
                        {filteredPodcasts[0].description}
                      </p>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-4">
                        <a
                          href={filteredPodcasts[0].link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-3 px-8 py-4 bg-white text-secondary-600 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
                        >
                          <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                          Listen Now
                        </a>
                        <button className="inline-flex items-center gap-3 px-6 py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/30 transition-all duration-300">
                          <Share2 className="w-5 h-5" />
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Episode List */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">All Episodes</h3>
                {filteredPodcasts.map((podcast, index) => (
                  <div
                    key={podcast.id}
                    className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-transparent hover:border-secondary-400 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="p-6 md:p-8">
                      <div className="flex items-start gap-6">
                        {/* Episode Number Badge */}
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <div className="text-center">
                              <div className="text-xs text-white/80 font-semibold">EP</div>
                              <div className="text-2xl font-bold text-white">{getEpisodeNumber(index)}</div>
                            </div>
                          </div>
                        </div>

                        {/* Episode Content */}
                        <div className="flex-1 min-w-0">
                          {/* Title */}
                          <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-secondary-600 transition-colors">
                            {podcast.title}
                          </h4>

                          {/* Description */}
                          <p className="text-gray-600 mb-4 leading-relaxed">
                            {podcast.description}
                          </p>

                          {/* Meta Info */}
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {formatDate(podcast.createdAt)}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-wrap gap-3">
                            <a
                              href={podcast.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-secondary-400 to-secondary-500 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 group"
                            >
                              <Play className="w-4 h-4 group-hover:scale-110 transition-transform" />
                              Listen Now
                              <ExternalLink className="w-4 h-4" />
                            </a>
                            <button className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all duration-300">
                              <BookmarkPlus className="w-4 h-4" />
                              Save
                            </button>
                            <button className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all duration-300">
                              <Share2 className="w-4 h-4" />
                              Share
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Progress bar effect on hover */}
                    <div className="h-1 bg-gradient-to-r from-secondary-400 to-primary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Subscribe CTA Section */}
      <section className="relative py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-20 translate-x-20"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full translate-y-20 -translate-x-20"></div>
            </div>

            <div className="relative z-10 text-center">
              <div className="inline-block mb-6 p-4 bg-white/20 backdrop-blur-sm rounded-full">
                <Headphones className="w-12 h-12" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Never Miss an Episode
              </h3>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Subscribe to stay updated with our latest conversations on agriculture, youth empowerment, and community development
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  <Mic2 className="w-5 h-5" />
                  Subscribe Now
                </button>
                <button className="inline-flex items-center gap-2 px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl font-bold hover:bg-white/30 transition-all duration-300">
                  <ExternalLink className="w-5 h-5" />
                  Visit Platform
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

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

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Podcast;