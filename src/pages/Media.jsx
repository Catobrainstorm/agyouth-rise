import { useState, useEffect, useRef } from 'react';
import { Play, X, Calendar, Clock, Image as ImageIcon, Video } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Media = () => {
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [activeTab, setActiveTab] = useState('gallery');
    const heroRef = useRef(null);
    const tabsRef = useRef(null);
    const galleryRef = useRef(null);
    const podcastRef = useRef(null);

    // Sample Gallery Data
    const galleryItems = [
        {
        id: 1,
        type: 'image',
        url: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800',
        title: 'Youth Training Session',
        description: 'Greenhouse management training with 50+ participants',
        category: 'Training'
        },
        {
        id: 2,
        type: 'image',
        url: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800',
        title: 'Community Club Launch',
        description: 'Establishing grassroots agricultural networks',
        category: 'Community'
        },
        {
        id: 3,
        type: 'image',
        url: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800',
        title: 'Soilless Farming Demo',
        description: 'Innovative hydroponic systems in action',
        category: 'Innovation'
        },
        {
        id: 4,
        type: 'image',
        url: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800',
        title: 'Stakeholders Summit 2024',
        description: 'Policy makers and youth leaders convening',
        category: 'Events'
        },
        {
        id: 5,
        type: 'image',
        url: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800',
        title: 'PWD Empowerment Program',
        description: 'Inclusive agriculture training session',
        category: 'Training'
        },
        {
        id: 6,
        type: 'image',
        url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
        title: 'Field Visit - Abia Farms',
        description: 'Monitoring 180 hectares of supported farmland',
        category: 'Outreach'
        }
    ];

    // Sample Podcast Data
    const podcastEpisodes = [
        {
        id: 1,
        title: 'Agricultural Interventions: What Citizens Need to Know',
        description: 'Exploring government agricultural policies and how they impact local farmers in Abia State.',
        date: '2025-09-28',
        duration: '45 min',
        audioUrl: '#'
        },
        {
        id: 2,
        title: 'Youth in Agritech: Breaking Barriers',
        description: 'Stories of young entrepreneurs transforming agriculture through technology.',
        date: '2025-09-21',
        duration: '38 min',
        audioUrl: '#'
        },
        {
        id: 3,
        title: 'Inclusive Agriculture: Empowering PWDs',
        description: 'How persons with disabilities are leading change in modern farming.',
        date: '2025-09-14',
        duration: '42 min',
        audioUrl: '#'
        },
        {
        id: 4,
        title: 'Food Security and Community Action',
        description: 'Grassroots approaches to achieving sustainable food systems.',
        date: '2025-09-07',
        duration: '50 min',
        audioUrl: '#'
        }
    ];

    useEffect(() => {
        // Hero animation
        gsap.from(heroRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
        });

        // Tabs animation
        gsap.from(tabsRef.current?.children || [], {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.3,
        ease: 'power2.out'
        });

        // Gallery items animation
        if (activeTab === 'gallery' && galleryRef.current) {
        gsap.from(galleryRef.current.children, {
            opacity: 0,
            y: 50,
            scale: 0.9,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
            trigger: galleryRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
            }
        });
        }

        // Podcast items animation
        if (activeTab === 'podcast' && podcastRef.current) {
        gsap.from(podcastRef.current.children, {
            opacity: 0,
            x: -50,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
            trigger: podcastRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
            }
        });
        }
    }, [activeTab]);

    const categories = ['All', ...new Set(galleryItems.map(item => item.category))];
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredGallery = activeCategory === 'All' 
        ? galleryItems 
        : galleryItems.filter(item => item.category === activeCategory);

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-primary-50">
        {/* Hero Section */}
        <section ref={heroRef} className="relative py-20 px-4 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-800 opacity-5"></div>
            <div className="max-w-6xl mx-auto text-center relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Media <span className="text-primary-600">Gallery</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explore our journey through photos, videos, and podcast episodes showcasing 
                youth empowerment, innovation, and community impact across Abia State.
            </p>
            </div>
        </section>

        {/* Tabs Navigation */}
        <section className="py-8 px-4">
            <div className="max-w-6xl mx-auto">
            <div ref={tabsRef} className="flex justify-center gap-4 flex-wrap">
                <button
                onClick={() => setActiveTab('gallery')}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                    activeTab === 'gallery'
                    ? 'bg-primary-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-primary-50 border border-gray-200'
                }`}
                >
                <ImageIcon className="inline-block w-5 h-5 mr-2" />
                Photo Gallery
                </button>
                <button
                onClick={() => setActiveTab('podcast')}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                    activeTab === 'podcast'
                    ? 'bg-primary-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-primary-50 border border-gray-200'
                }`}
                >
                <Play className="inline-block w-5 h-5 mr-2" />
                Podcast
                </button>
            </div>
            </div>
        </section>

        {/* Gallery Section */}
        {activeTab === 'gallery' && (
            <section className="py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Category Filter */}
                <div className="flex justify-center gap-3 mb-12 flex-wrap">
                {categories.map(category => (
                    <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        activeCategory === category
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-primary-100 border border-gray-200'
                    }`}
                    >
                    {category}
                    </button>
                ))}
                </div>

                {/* Gallery Grid */}
                <div ref={galleryRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGallery.map(item => (
                    <div
                    key={item.id}
                    onClick={() => setSelectedMedia(item)}
                    className="group relative overflow-hidden rounded-xl cursor-pointer bg-white shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                    >
                    <div className="aspect-[4/3] overflow-hidden">
                        <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <span className="inline-block px-3 py-1 bg-primary-600 rounded-full text-xs font-semibold mb-2">
                            {item.category}
                        </span>
                        <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-200">{item.description}</p>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            </div>
            </section>
        )}

        {/* Podcast Section */}
        {activeTab === 'podcast' && (
            <section className="py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="mb-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    AgYouth Rise Podcast
                </h2>
                <p className="text-lg text-gray-600">
                    Weekly episodes on agricultural interventions, governance, and youth empowerment
                </p>
                </div>

                <div ref={podcastRef} className="space-y-6">
                {podcastEpisodes.map((episode, index) => (
                    <div
                    key={episode.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-primary-200"
                    >
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                            {index + 1}
                        </div>
                        </div>
                        <div className="flex-grow">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {episode.title}
                        </h3>
                        <p className="text-gray-600 mb-4">{episode.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                            <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(episode.date).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric', 
                                year: 'numeric' 
                            })}
                            </span>
                            <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {episode.duration}
                            </span>
                        </div>
                        <button className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                            <Play className="w-4 h-4" />
                            Listen Now
                        </button>
                        </div>
                    </div>
                    </div>
                ))}
                </div>

                {/* Subscribe CTA */}
                <div className="mt-12 bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-center text-white">
                <h3 className="text-2xl font-bold mb-3">Never Miss an Episode</h3>
                <p className="text-primary-100 mb-6">
                    Subscribe to get notified about new podcast episodes and exclusive content
                </p>
                <button className="bg-white text-primary-600 hover:bg-primary-50 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                    Subscribe Now
                </button>
                </div>
            </div>
            </section>
        )}

        {/* Lightbox Modal */}
        {selectedMedia && (
            <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMedia(null)}
            >
            <button
                onClick={() => setSelectedMedia(null)}
                className="absolute top-4 right-4 text-white hover:text-primary-400 transition-colors"
            >
                <X className="w-8 h-8" />
            </button>
            <div className="max-w-5xl w-full" onClick={e => e.stopPropagation()}>
                <img
                src={selectedMedia.url}
                alt={selectedMedia.title}
                className="w-full h-auto rounded-lg"
                />
                <div className="mt-6 text-white text-center">
                <h3 className="text-2xl font-bold mb-2">{selectedMedia.title}</h3>
                <p className="text-gray-300">{selectedMedia.description}</p>
                </div>
            </div>
            </div>
        )}
        </div>
    );
};

export default Media;