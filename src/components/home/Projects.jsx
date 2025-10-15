import { useEffect, useRef } from 'react';
import { ArrowRight, Users, Mic, Building2, Handshake } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const cards = cardsRef.current;

        gsap.fromTo(
        cards,
        {
            opacity: 0,
            y: 60,
            scale: 0.95,
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
            },
        }
        );
    }, []);

    const projects = [
        {
        icon: Users,
        title: 'Training Programs',
        description: 'Comprehensive agritech training in greenhouse management, nursery care, and soilless farming for youth empowerment.',
        status: 'Active',
        statusColor: 'bg-green-500',
        gradient: 'from-primary-500 to-primary-700',
        link: '/projects/training',
        },
        {
        icon: Mic,
        title: 'AgYouth Rise Podcast',
        description: 'Weekly episodes educating citizens on agricultural interventions, governance, and civic participation.',
        status: 'Live',
        statusColor: 'bg-blue-500',
        gradient: 'from-blue-500 to-blue-700',
        link: '/media/podcast',
        },
        {
        icon: Building2,
        title: 'Community Clubs',
        description: 'Grassroots clubs fostering civic participation, sustainable employment, and community-led development.',
        status: 'Growing',
        statusColor: 'bg-secondary-500',
        gradient: 'from-secondary-500 to-secondary-700',
        link: '/projects/community-clubs',
        },
        {
        icon: Handshake,
        title: 'Stakeholders Summit',
        description: 'Bringing together government, NGOs, and community leaders to drive agricultural policy and youth inclusion.',
        status: 'Upcoming',
        statusColor: 'bg-purple-500',
        gradient: 'from-purple-500 to-purple-700',
        link: '/projects/summit',
        },
    ];

    return (
        <section ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
                Our Initiatives
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Transforming Communities Through{' '}
                <span className="text-primary-600">Action</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Four pillars driving youth empowerment, agricultural innovation, and sustainable development across Abia State
            </p>
            </div>

            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => {
                const Icon = project.icon;
                return (
                <div
                    key={index}
                    ref={(el) => (cardsRef.current[index] = el)}
                    className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
                >
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                    
                    {/* Content */}
                    <div className="relative p-8">
                    {/* Icon and Status */}
                    <div className="flex items-start justify-between mb-6">
                        <div className={`p-4 bg-gradient-to-br ${project.gradient} rounded-xl shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                        <Icon className="w-8 h-8 text-white" />
                        </div>
                        <span className={`px-3 py-1 ${project.statusColor} text-white text-xs font-semibold rounded-full`}>
                        {project.status}
                        </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                        {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        {project.description}
                    </p>

                    {/* CTA Link */}
                    <a
                        href={project.link}
                        className="inline-flex items-center text-primary-600 font-semibold group-hover:text-primary-700 transition-colors"
                    >
                        Learn More
                        <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
                    </a>
                    </div>

                    {/* Decorative Element */}
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-100 to-transparent opacity-0 group-hover:opacity-100 rounded-tl-full transition-opacity duration-500" />
                </div>
                );
            })}
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-16">
            <a
                href="/projects"
                className="inline-flex items-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
                Explore All Projects
                <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            </div>
        </div>
        </section>
    );
};

export default Projects;