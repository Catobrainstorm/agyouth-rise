import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sprout, Users, Target, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AboutHero = () => {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
        // Title animation
        gsap.from(titleRef.current, {
            y: 100,
            opacity: 0,
            duration: 1.2,
            ease: 'power4.out',
        });

        // Subtitle animation
        gsap.from(subtitleRef.current, {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.3,
            ease: 'power3.out',
        });

        // Cards stagger animation
        gsap.from(cardsRef.current, {
            y: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            delay: 0.6,
            ease: 'power3.out',
        });

        // Floating animation for cards
        cardsRef.current.forEach((card, index) => {
            gsap.to(card, {
            y: -10,
            duration: 2 + index * 0.3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.2,
            });
        });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    const highlights = [
        {
        icon: Users,
        number: '150+',
        label: 'Youths Trained',
        color: 'bg-primary-500',
        },
        {
        icon: Sprout,
        number: '700+',
        label: 'Farmers Supported',
        color: 'bg-secondary-500',
        },
        {
        icon: Target,
        number: '180',
        label: 'Hectares Covered',
        color: 'bg-emerald-500',
        },
        {
        icon: Award,
        number: '100%',
        label: 'Community Impact',
        color: 'bg-green-600',
        },
    ];

    return (
        <div ref={heroRef} className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20 md:py-32 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-400 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
            {/* Title Section */}
            <div className="text-center max-w-4xl mx-auto mb-16">
            <h1 
                ref={titleRef}
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6"
            >
                Empowering <span className="text-primary-600">Youth</span> Through{' '}
                <span className="text-secondary-500">Agritech</span>
            </h1>
            <p 
                ref={subtitleRef}
                className="text-xl md:text-2xl text-gray-600 leading-relaxed"
            >
                Building a sustainable future where every young person in Abia State has access to 
                agricultural technology, civic awareness, and opportunities to thrive.
            </p>
            </div>

            {/* Highlight Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {highlights.map((item, index) => (
                <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 transform-gpu"
                >
                <div className={`${item.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto`}>
                    <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-center">
                    {item.number}
                </h3>
                <p className="text-gray-600 text-sm md:text-base text-center font-medium">
                    {item.label}
                </p>
                </div>
            ))}
            </div>
        </div>
        </div>
    );
};

export default AboutHero;