import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SectionTitle = ({ 
    subtitle, 
    title, 
    description,
    align = 'center',
    theme = 'light',
    className = ''
    }) => {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const descRef = useRef(null);
    const underlineRef = useRef(null);

    useEffect(() => {
        const elements = [subtitleRef.current, titleRef.current, descRef.current, underlineRef.current].filter(Boolean);
        
        gsap.fromTo(
        elements,
        {
            opacity: 0,
            y: 30,
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            },
        }
        );
    }, []);

    const alignmentClasses = {
        left: 'text-left items-start',
        center: 'text-center items-center',
        right: 'text-right items-end',
    };

    const themeClasses = {
        light: {
        subtitle: 'text-[#35CC67]',
        title: 'text-[#0D3A1B]',
        description: 'text-[#196330]',
        underline: 'bg-[#FFD60D]',
        },
        dark: {
        subtitle: 'text-[#FFD60D]',
        title: 'text-white',
        description: 'text-gray-200',
        underline: 'bg-[#35CC67]',
        },
        green: {
        subtitle: 'text-[#FCE445]',
        title: 'text-white',
        description: 'text-[#FCE445]/80',
        underline: 'bg-[#FFD60D]',
        },
    };

    const colors = themeClasses[theme];

    return (
        <div className={`flex flex-col ${alignmentClasses[align]} ${className}`}>
        {subtitle && (
            <span 
            ref={subtitleRef}
            className={`text-sm md:text-base font-semibold uppercase tracking-wider mb-3 ${colors.subtitle}`}
            >
            {subtitle}
            </span>
        )}
        
        <h2 
            ref={titleRef}
            className={`text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 ${colors.title}`}
        >
            {title}
        </h2>
        
        <div 
            ref={underlineRef}
            className={`h-1 w-20 rounded-full mb-6 ${colors.underline}`}
        />
        
        {description && (
            <p 
            ref={descRef}
            className={`text-base md:text-lg max-w-3xl ${colors.description}`}
            >
            {description}
            </p>
        )}
        </div>
    );
    };

    // Example showcase
    const SectionTitleShowcase = () => {
    return (
        <div className="min-h-screen">
        {/* Light Theme Example */}
        <section className="bg-white py-20 px-6">
            <div className="max-w-7xl mx-auto">
            <SectionTitle
                subtitle="Our Mission"
                title="Empowering Youth Through Agriculture"
                description="We're committed to transforming the agricultural landscape in Abia State by equipping young people with the skills, knowledge, and opportunities they need to thrive in modern agriculture."
                align="center"
                theme="light"
            />
            </div>
        </section>

        {/* Dark Theme Example */}
        <section className="bg-[#0D3A1B] py-20 px-6">
            <div className="max-w-7xl mx-auto">
            <SectionTitle
                subtitle="What We Do"
                title="Driving Change Through Innovation"
                description="From agritech training to civic engagement, we're building a new generation of agricultural leaders who will shape the future of food security in Nigeria."
                align="center"
                theme="dark"
            />
            </div>
        </section>

        {/* Green Theme Example */}
        <section className="bg-gradient-to-br from-[#218342] to-[#35CC67] py-20 px-6">
            <div className="max-w-7xl mx-auto">
            <SectionTitle
                subtitle="Our Impact"
                title="Creating Lasting Change"
                description="Through our programs, we've trained over 150 youths, supported 700+ farmers, and covered 180 hectares with innovative agricultural practices."
                align="center"
                theme="green"
            />
            </div>
        </section>

        {/* Left Aligned Example */}
        <section className="bg-[#FCE445] py-20 px-6">
            <div className="max-w-7xl mx-auto">
            <SectionTitle
                subtitle="Join Us"
                title="Be Part of the Movement"
                description="Whether you're a youth seeking training, a volunteer wanting to give back, or an organization looking to partner, there's a place for you in the AgYouth Rise community."
                align="left"
                theme="light"
                className="mb-12"
            />
            
            <div className="flex gap-4 mt-8">
                <button className="bg-[#35CC67] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#218342] transition-colors">
                Get Started
                </button>
                <button className="border-2 border-[#35CC67] text-[#218342] px-6 py-3 rounded-lg font-semibold hover:bg-[#35CC67] hover:text-white transition-colors">
                Learn More
                </button>
            </div>
            </div>
        </section>

        {/* Right Aligned Example */}
        <section className="bg-white py-20 px-6">
            <div className="max-w-7xl mx-auto">
            <SectionTitle
                subtitle="Success Stories"
                title="Real Impact, Real People"
                description="See how AgYouth Rise Nigeria is transforming lives and communities across Abia State."
                align="right"
                theme="light"
            />
            </div>
        </section>

        {/* Usage Guide */}
        <section className="bg-[#196330] py-20 px-6">
            <div className="max-w-7xl mx-auto text-white">
            <h3 className="text-3xl font-display font-bold mb-8">SectionTitle Component Usage</h3>
            
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <pre className="text-sm overflow-x-auto">
    {`<SectionTitle
    subtitle="Optional eyebrow text"
    title="Main Heading Here"
    description="Optional description paragraph"
    align="center" // left, center, right
    theme="light"  // light, dark, green
    className="mb-12" // optional additional classes
    />`}
                </pre>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <h4 className="font-bold text-[#FFD60D] mb-2">Alignment Options</h4>
                <ul className="space-y-1 text-sm">
                    <li>• left</li>
                    <li>• center</li>
                    <li>• right</li>
                </ul>
                </div>
                
                <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <h4 className="font-bold text-[#FFD60D] mb-2">Theme Options</h4>
                <ul className="space-y-1 text-sm">
                    <li>• light (white bg)</li>
                    <li>• dark (dark bg)</li>
                    <li>• green (green bg)</li>
                </ul>
                </div>
                
                <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <h4 className="font-bold text-[#FFD60D] mb-2">Features</h4>
                <ul className="space-y-1 text-sm">
                    <li>• GSAP animations</li>
                    <li>• ScrollTrigger</li>
                    <li>• Responsive</li>
                </ul>
                </div>
            </div>
            </div>
        </section>
        </div>
    );
};

export default SectionTitle;
export { SectionTitleShowcase };