import { useEffect, useRef, useState } from 'react';
import { ChevronRight, Sprout, Users, Award } from 'lucide-react';

const Hero = () => {
    const heroRef = useRef(null);
    const captionsRef = useRef([]);
    const [currentCaption, setCurrentCaption] = useState(0);
    
    const captions = [
        "Raising a New Generation of Agritech-Savvy Leaders in Abia State.",
        "Empowering Youth, Driving Food Security, Building Communities.",
        "Inclusive Agriculture for a Sustainable Future."
    ];

    useEffect(() => {
        // Caption rotation effect
        const interval = setInterval(() => {
            setCurrentCaption((prev) => (prev + 1) % captions.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const handleCTAClick = (action) => {
        console.log(`CTA clicked: ${action}`);
    };

    return (
        <div ref={heroRef} className="relative min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 overflow-hidden">
            {/* Animated Background Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-primary-300 rounded-full opacity-40 animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`
                        }}
                    />
                ))}
            </div>

            {/* Decorative Blobs */}
            <div className="absolute top-20 right-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }} />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <div className="space-y-12">
                        {/* Rotating Headlines */}
                        <div className="relative" style={{ minHeight: '160px' }}>
                            {captions.map((caption, index) => (
                                <h1
                                    key={index}
                                    ref={el => captionsRef.current[index] = el}
                                    className={`absolute top-0 left-0 text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight transition-all duration-700 ${
                                        index === currentCaption 
                                            ? 'opacity-100 transform translate-y-0' 
                                            : 'opacity-0 transform -translate-y-4'
                                    }`}
                                >
                                    {caption}
                                </h1>
                            ))}
                        </div>

                        {/* Description - Now properly separated */}
                        <div className="pt-6">
                            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                                AgYouth Rise Nigeria equips youths, women, and persons with disabilities with agritech skills, civic education, and opportunities to thrive in modern agriculture.
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4 pt-4">
                            <a
                                href="https://forms.gle/zw21uGtW2r6T9g5f8"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-2"
                            >
                                Become a Member
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                            
                            <a
                                href="https://forms.gle/4VyPy18qGyECP6Lh9"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group bg-secondary-500 hover:bg-secondary-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-2"
                            >
                                Become a Volunteer
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                            
                            <a
                                href="https://wa.me/message/YBRYNL3NK5EYJ1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group border-2 border-primary-600 text-primary-700 hover:bg-primary-600 hover:text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 flex items-center gap-2"
                            >
                                Partner With Us
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </div>

                    {/* Right Content - Floating Stats Cards */}
                    <div className="relative h-[500px] lg:h-[600px]">
                        {/* Main Visual Element */}
                        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-primary-400 to-primary-600 rounded-3xl shadow-2xl transform rotate-6 overflow-hidden hover:rotate-3 transition-transform duration-500">
                            <div className="absolute inset-0 bg-black opacity-20" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Sprout className="w-32 h-32 text-white opacity-80 animate-pulse" />
                            </div>
                        </div>

                        {/* Floating Card 1 - Youths Trained */}
                        <div className="absolute bottom-40 left-0 bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-pulse" style={{ animationDuration: '3s' }}>
                            <div className="flex items-center gap-4">
                                <div className="bg-primary-100 p-3 rounded-lg">
                                    <Users className="w-8 h-8 text-primary-600" />
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-gray-900">150+</p>
                                    <p className="text-sm text-gray-600">Youths Trained</p>
                                </div>
                            </div>
                        </div>

                        {/* Floating Card 2 - Farmers Reached */}
                        <div className="absolute bottom-10 right-10 bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-pulse" style={{ animationDuration: '4s' }}>
                            <div className="flex items-center gap-4">
                                <div className="bg-secondary-100 p-3 rounded-lg">
                                    <Award className="w-8 h-8 text-secondary-600" />
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-gray-900">700+</p>
                                    <p className="text-sm text-gray-600">Farmers Reached</p>
                                </div>
                            </div>
                        </div>

                        {/* Floating Card 3 - Hectares Covered */}
                        <div className="absolute top-40 left-10 bg-gradient-to-br from-secondary-400 to-secondary-600 p-6 rounded-2xl shadow-xl text-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-pulse" style={{ animationDuration: '3.5s' }}>
                            <p className="text-2xl font-bold">180 Hectares</p>
                            <p className="text-sm opacity-90">Covered</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-primary-600 rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-primary-600 rounded-full mt-2 animate-pulse" />
                </div>
            </div>
        </div>
    );
};

export default Hero;