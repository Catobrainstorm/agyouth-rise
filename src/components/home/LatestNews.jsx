import { useEffect, useRef, useState } from 'react';
import { Calendar, ArrowRight, TrendingUp } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getAllBlogs } from '../../services/firebaseService';

gsap.registerPlugin(ScrollTrigger);

const LatestNews = () => {
    const sectionRef = useRef(null);
    const newsRef = useRef([]);
    const [newsItems, setNewsItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch blogs from Firebase
    useEffect(() => {
        const unsubscribe = getAllBlogs((blogs) => {
            // Take only the first 3 blogs and format them
            const formattedBlogs = blogs.slice(0, 3).map((blog, index) => ({
                id: blog.id,
                category: 'News',
                title: blog.title,
                excerpt: blog.content.substring(0, 150) + '...',
                date: blog.createdAt?.toDate?.() || new Date(),
                image: blog.imageUrl || 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&q=80',
                trending: index === 0, // Mark first item as trending
            }));
            setNewsItems(formattedBlogs);
            setLoading(false);
        });

        return () => unsubscribe?.();
    }, []);

    // Animation effect
    useEffect(() => {
        if (newsItems.length === 0) return;

        const newsCards = newsRef.current;

        gsap.fromTo(
            newsCards,
            {
                opacity: 0,
                x: -50,
            },
            {
                opacity: 1,
                x: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse',
                },
            }
        );
    }, [newsItems]);

    const getCategoryColor = (category) => {
        const colors = {
            Training: 'bg-primary-100 text-primary-700',
            Impact: 'bg-secondary-100 text-secondary-700',
            Podcast: 'bg-blue-100 text-blue-700',
            Policy: 'bg-purple-100 text-purple-700',
            News: 'bg-primary-100 text-primary-700',
        };
        return colors[category] || 'bg-gray-100 text-gray-700';
    };

    if (loading) {
        return (
            <section ref={sectionRef} className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-gray-600">Loading news...</p>
                </div>
            </section>
        );
    }

    return (
        <section ref={sectionRef} className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
                    <div>
                        <span className="inline-block px-4 py-2 bg-secondary-100 text-secondary-700 rounded-full text-sm font-semibold mb-4">
                            Latest Updates
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            News & <span className="text-primary-600">Announcements</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl">
                            Stay updated with our latest achievements, stories, and community impact
                        </p>
                    </div>
                    <a
                        href="/news"
                        className="mt-6 md:mt-0 inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors"
                    >
                        View All News
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </a>
                </div>

                {/* News Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {newsItems.map((item, index) => (
                        <article
                            key={item.id}
                            ref={(el) => (newsRef.current[index] = el)}
                            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500 transform hover:-translate-y-2"
                        >
                            {/* Image */}
                            <div className="relative h-52 overflow-hidden">
                                {item.image && (
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                
                                {/* Category Badge */}
                                <span className={`absolute top-4 left-4 px-3 py-1 ${getCategoryColor(item.category)} rounded-full text-xs font-semibold`}>
                                    {item.category}
                                </span>

                                {/* Trending Badge */}
                                {item.trending && (
                                    <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-full text-xs font-semibold">
                                        <TrendingUp className="w-3 h-3" />
                                        Trending
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                {/* Date */}
                                <div className="flex items-center text-gray-500 text-sm mb-3">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    {typeof item.date === 'string' 
                                        ? new Date(item.date).toLocaleDateString('en-US', {
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })
                                        : item.date.toLocaleDateString('en-US', {
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })
                                    }
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
                                    {item.title}
                                </h3>

                                {/* Excerpt */}
                                <p className="text-gray-600 mb-4 line-clamp-3">
                                    {item.excerpt}
                                </p>

                                {/* Read More */}
                                <a
                                    href={`/news`}
                                    className="inline-flex items-center text-primary-600 font-semibold group-hover:text-primary-700 transition-colors"
                                >
                                    Read Full Story
                                    <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
                                </a>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Podcast Feature Banner */}
                <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
                    </div>
                    
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
                        <div className="mb-6 md:mb-0 md:mr-8">
                            <h3 className="text-3xl font-bold text-white mb-3">
                                🎙️ AgYouth Rise Podcast
                            </h3>
                            <p className="text-blue-100 text-lg max-w-2xl">
                                Tune in weekly for insights on agricultural interventions, governance, and civic participation. Available on all major platforms.
                            </p>
                        </div>
                        <a
                            href="/media/podcast"
                            className="flex-shrink-0 px-8 py-4 bg-white text-blue-700 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                        >
                            Listen Now
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LatestNews;