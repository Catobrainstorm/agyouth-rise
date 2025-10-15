import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Lightbulb, Shield, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Values = () => {
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);
    const circleRefs = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
        // Cards animation
        cardsRef.current.forEach((card, index) => {
            gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
            },
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
            ease: 'back.out(1.7)',
            delay: index * 0.1,
            });
        });

        // Floating circles animation
        circleRefs.current.forEach((circle) => {
            gsap.to(circle, {
            y: '+=20',
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            });
        });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const values = [
        {
        icon: Heart,
        title: 'Inclusivity',
        description: 'Empowering women, youths, and persons with disabilities to participate fully in agricultural development.',
        color: 'from-rose-500 to-pink-500',
        bgColor: 'bg-rose-50',
        iconColor: 'text-rose-600',
        },
        {
        icon: Lightbulb,
        title: 'Innovation',
        description: 'Driving agriculture forward with cutting-edge technology and modern farming practices.',
        color: 'from-amber-500 to-orange-500',
        bgColor: 'bg-amber-50',
        iconColor: 'text-amber-600',
        },
        {
        icon: Shield,
        title: 'Accountability',
        description: 'Promoting transparency, good governance, and responsible engagement with stakeholders.',
        color: 'from-blue-500 to-indigo-500',
        bgColor: 'bg-blue-50',
        iconColor: 'text-blue-600',
        },
        {
        icon: Users,
        title: 'Community',
        description: 'Building strong networks and partnerships for sustainable change and collective growth.',
        color: 'from-green-500 to-emerald-500',
        bgColor: 'bg-green-50',
        iconColor: 'text-green-600',
        },
    ];

    return (
        <div ref={sectionRef} className="relative py-20 bg-white overflow-hidden">
        {/* Background decorative circles */}
        <div 
            ref={(el) => (circleRefs.current[0] = el)}
            className="absolute top-20 left-10 w-64 h-64 bg-primary-200 rounded-full blur-3xl opacity-20"
        ></div>
        <div 
            ref={(el) => (circleRefs.current[1] = el)}
            className="absolute bottom-20 right-10 w-80 h-80 bg-secondary-200 rounded-full blur-3xl opacity-20"
        ></div>

        <div className="container mx-auto px-4 relative z-10">
            {/* Section Title */}
            <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Our Core <span className="text-primary-600">Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The principles that guide our mission and shape our approach to sustainable agricultural development
            </p>
            </div>

            {/* Values Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
                <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                {/* Gradient border effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Content */}
                <div className="relative z-10">
                    {/* Icon Container */}
                    <div className={`${value.bgColor} w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-md`}>
                    <value.icon className={`w-10 h-10 ${value.iconColor}`} strokeWidth={2} />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">
                    {value.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-lg leading-relaxed">
                    {value.description}
                    </p>

                    {/* Decorative line */}
                    <div className={`mt-6 h-1 w-0 group-hover:w-20 bg-gradient-to-r ${value.color} transition-all duration-700 ease-out`}></div>
                </div>

                {/* Corner accent */}
                <div className={`absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl ${value.color} opacity-5 rounded-tl-full`}></div>
                </div>
            ))}
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-16">
            <div className="inline-block bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 shadow-lg">
                <p className="text-lg text-gray-700 mb-4">
                Join us in building a sustainable agricultural future for Abia State
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                <button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                    Become a Member
                </button>
                <button className="bg-secondary-500 hover:bg-secondary-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                    Partner With Us
                </button>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default Values;