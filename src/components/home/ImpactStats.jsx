import { useEffect, useRef, useState } from 'react';
import { Users, Sprout, MapPin, Radio, TrendingUp, Heart } from 'lucide-react';

const ImpactStats = () => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [counters, setCounters] = useState({
        youths: 0,
        farmers: 0,
        hectares: 0,
        clubs: 0
    });

    const stats = [
        {
            icon: Users,
            value: 150,
            suffix: '+',
            label: 'Youths Trained',
            description: 'In greenhouse management & soilless farming',
            color: 'primary',
            key: 'youths',
            gradient: 'from-primary-400 to-primary-600'
        },
        {
            icon: Sprout,
            value: 700,
            suffix: '+',
            label: 'Farmers Supported',
            description: 'With agritech solutions',
            color: 'secondary',
            key: 'farmers',
            gradient: 'from-secondary-400 to-secondary-600'
        },
        {
            icon: MapPin,
            value: 180,
            suffix: '',
            label: 'Hectares Covered',
            description: 'Across Abia State',
            color: 'primary',
            key: 'hectares',
            gradient: 'from-primary-500 to-primary-700'
        },
        {
            icon: Radio,
            value: 50,
            suffix: '+',
            label: 'Podcast Episodes',
            description: 'Educating on agricultural governance',
            color: 'secondary',
            key: 'clubs',
            gradient: 'from-secondary-500 to-secondary-700'
        }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isVisible) {
                    setIsVisible(true);
                    animateCounters();
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, [isVisible]);

    const animateCounters = () => {
        stats.forEach((stat) => {
            const duration = 2000;
            const steps = 60;
            const increment = stat.value / steps;
            let current = 0;
            let step = 0;

            const timer = setInterval(() => {
                step++;
                current = Math.min(Math.floor(increment * step), stat.value);
                
                setCounters(prev => ({
                    ...prev,
                    [stat.key]: current
                }));

                if (step >= steps) {
                    clearInterval(timer);
                }
            }, duration / steps);
        });
    };

    const getColorClasses = (color) => {
        return color === 'primary' 
            ? 'bg-primary-50 border-primary-200'
            : 'bg-secondary-50 border-secondary-200';
    };

    const getIconBg = (color) => {
        return color === 'primary'
            ? 'bg-gradient-to-br from-primary-400 to-primary-600'
            : 'bg-gradient-to-br from-secondary-400 to-secondary-600';
    };

    return (
        <section ref={sectionRef} className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-50 via-white to-primary-50">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
                
                {/* Floating particles */}
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-3 h-3 bg-primary-300 rounded-full opacity-30 animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${3 + Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header with Icon */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl mb-6 shadow-lg animate-pulse">
                        <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    
                    <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        Our Impact <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">Speaks</span>
                    </h2>
                    
                    <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Transforming lives and communities through sustainable agriculture and youth empowerment
                    </p>
                    
                    {/* Decorative underline */}
                    <div className="flex justify-center mt-6">
                        <div className="h-1 w-24 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full" />
                    </div>
                </div>

                {/* Stats Grid with Enhanced Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={index}
                                className={`group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-2 ${getColorClasses(stat.color)} overflow-hidden ${
                                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                                }`}
                                style={{ 
                                    transitionDelay: `${index * 150}ms`,
                                    animation: isVisible ? `fadeInUp 0.8s ease-out ${index * 150}ms forwards` : 'none'
                                }}
                            >
                                {/* Animated background gradient on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                                
                                {/* Decorative corner accent */}
                                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.gradient} opacity-10 rounded-bl-full`} />

                                {/* Icon with animated background */}
                                <div className="relative mb-6">
                                    <div className={`w-20 h-20 ${getIconBg(stat.color)} rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                                        <Icon className="w-10 h-10 text-white" />
                                    </div>
                                    
                                    {/* Pulsing ring effect */}
                                    <div className={`absolute inset-0 w-20 h-20 ${stat.color === 'primary' ? 'bg-primary-400' : 'bg-secondary-400'} rounded-2xl opacity-20 group-hover:scale-125 group-hover:opacity-0 transition-all duration-700`} />
                                </div>

                                {/* Counter with animation */}
                                <div className="mb-4">
                                    <div className="flex items-baseline">
                                        <span className="text-6xl font-bold text-gray-900 tabular-nums">
                                            {counters[stat.key]}
                                        </span>
                                        <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600 ml-1">
                                            {stat.suffix}
                                        </span>
                                    </div>
                                </div>

                                {/* Label */}
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors duration-300">
                                    {stat.label}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-600 text-base leading-relaxed">
                                    {stat.description}
                                </p>

                                {/* Animated progress bar */}
                                <div className="mt-6 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full transition-all duration-1000 ease-out`}
                                        style={{ 
                                            width: isVisible ? '100%' : '0%',
                                            transitionDelay: `${index * 150 + 500}ms`
                                        }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Enhanced Bottom CTA Section */}
                <div className="relative mt-20 bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-600 rounded-3xl p-12 shadow-2xl overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
                    </div>
                    
                    <div className="relative z-10 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-2xl mb-6 backdrop-blur-sm">
                            <Heart className="w-8 h-8 text-white animate-pulse" />
                        </div>
                        
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Want to be part of this growing movement?
                        </h3>
                        
                        <p className="text-xl text-white text-opacity-90 mb-8 max-w-2xl mx-auto">
                            Join hundreds of young innovators transforming agriculture in Abia State and beyond
                        </p>
                        
                        <div className="flex flex-wrap justify-center gap-4">
                            <button className="group bg-white hover:bg-gray-50 text-primary-700 font-bold px-10 py-5 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-3">
                                Join AgYouth Rise Today
                                <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            
                            <button className="group border-2 border-white text-white hover:bg-white hover:text-primary-700 font-bold px-10 py-5 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3">
                                Learn More
                                <Sprout className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(48px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </section>
    );
};

export default ImpactStats;