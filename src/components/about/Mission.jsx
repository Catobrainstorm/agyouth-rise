import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Eye, Lightbulb } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Mission = () => {
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
        cardsRef.current.forEach((card, index) => {
            gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse',
            },
            x: index % 2 === 0 ? -100 : 100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            });

            // Hover animation
            card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.02,
                duration: 0.3,
                ease: 'power2.out',
            });
            });

            card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out',
            });
            });
        });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const content = [
        {
        icon: Target,
        title: 'Our Mission',
        description:
            'To prepare young people for investment readiness, self-sufficiency, and leadership in agriculture by equipping them with the knowledge, tools, and networks to transform their communities.',
        color: 'from-primary-500 to-primary-600',
        iconBg: 'bg-primary-100',
        iconColor: 'text-primary-600',
        },
        {
        icon: Eye,
        title: 'Our Vision',
        description:
            'A future where every young person in Abia State has access to agritech skills, civic awareness, and equal opportunities to thrive—contributing to food security, good governance, and sustainable community growth.',
        color: 'from-secondary-500 to-secondary-600',
        iconBg: 'bg-secondary-100',
        iconColor: 'text-secondary-600',
        },
        {
        icon: Lightbulb,
        title: 'Who We Are',
        description:
            'AgYouth Rise Nigeria (AgYRNG), an initiative of Orange Farm Technologies Ltd., is committed to empowering youths, women, and underserved communities in Abia State through agritech, civic engagement, and inclusive agricultural development.',
        color: 'from-emerald-500 to-green-600',
        iconBg: 'bg-emerald-100',
        iconColor: 'text-emerald-600',
        },
    ];

    return (
        <div ref={sectionRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Our Purpose & <span className="text-primary-600">Direction</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Driven by a commitment to transform lives through agricultural innovation and youth empowerment
            </p>
            </div>

            <div className="space-y-8 max-w-6xl mx-auto">
            {content.map((item, index) => (
                <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className="group relative bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 md:p-12 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
                >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
                    {/* Icon */}
                    <div className={`${item.iconBg} rounded-2xl p-6 shadow-md group-hover:shadow-xl transition-shadow duration-300`}>
                    <item.icon className={`w-12 h-12 ${item.iconColor}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                        {item.title}
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        {item.description}
                    </p>
                    </div>
                </div>

                {/* Decorative corner accent */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} opacity-10 rounded-bl-full transform translate-x-16 -translate-y-16 group-hover:translate-x-12 group-hover:-translate-y-12 transition-transform duration-500`}></div>
                </div>
            ))}
            </div>
        </div>
        </div>
    );
};

export default Mission;