import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Mail, Phone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Team = () => {
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);
    const titleRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
        // Title animation
        gsap.from(titleRef.current, {
            scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
        });

        // Cards stagger animation
        gsap.from(cardsRef.current, {
            scrollTrigger: {
            trigger: cardsRef.current[0],
            start: 'top 80%',
            },
            y: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
        });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const teamMembers = [
        {
        name: 'Dr. Emmanuel Okafor',
        role: 'Executive Director',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
        bio: 'Leading agricultural innovation and youth empowerment initiatives across Abia State.',
        social: {
            linkedin: '#',
            email: 'emmanuel@agyouthrise.ng',
            phone: '+234 xxx xxx xxxx',
        },
        },
        {
        name: 'Chidinma Nwosu',
        role: 'Program Coordinator',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
        bio: 'Coordinating training programs and community outreach for sustainable development.',
        social: {
            linkedin: '#',
            email: 'chidinma@agyouthrise.ng',
            phone: '+234 xxx xxx xxxx',
        },
        },
        {
        name: 'Ifeanyi Obi',
        role: 'Agritech Specialist',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
        bio: 'Implementing cutting-edge agricultural technologies for modern farming solutions.',
        social: {
            linkedin: '#',
            email: 'ifeanyi@agyouthrise.ng',
            phone: '+234 xxx xxx xxxx',
        },
        },
        {
        name: 'Blessing Eze',
        role: 'Community Engagement Lead',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
        bio: 'Building grassroots partnerships and fostering civic participation in agriculture.',
        social: {
            linkedin: '#',
            email: 'blessing@agyouthrise.ng',
            phone: '+234 xxx xxx xxxx',
        },
        },
        {
        name: 'Chukwuma Agu',
        role: 'Training & Development Manager',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
        bio: 'Designing and delivering comprehensive agritech training programs for youth.',
        social: {
            linkedin: '#',
            email: 'chukwuma@agyouthrise.ng',
            phone: '+234 xxx xxx xxxx',
        },
        },
        {
        name: 'Ngozi Okoro',
        role: 'Advocacy & Policy Officer',
        image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop',
        bio: 'Advocating for inclusive agricultural policies and government accountability.',
        social: {
            linkedin: '#',
            email: 'ngozi@agyouthrise.ng',
            phone: '+234 xxx xxx xxxx',
        },
        },
    ];

    return (
        <div ref={sectionRef} className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
            {/* Section Title */}
            <div ref={titleRef} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Meet Our <span className="text-primary-600">Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Passionate professionals dedicated to transforming lives through agricultural innovation and youth empowerment
            </p>
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {teamMembers.map((member, index) => (
                <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                >
                {/* Image Container */}
                <div className="relative h-80 overflow-hidden bg-gradient-to-br from-primary-100 to-secondary-100">
                    <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Social Icons (visible on hover) */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <a
                        href={member.social.linkedin}
                        className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-primary-600 hover:text-white transition-colors duration-300"
                    >
                        <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                        href={`mailto:${member.social.email}`}
                        className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-primary-600 hover:text-white transition-colors duration-300"
                    >
                        <Mail className="w-5 h-5" />
                    </a>
                    <a
                        href={`tel:${member.social.phone}`}
                        className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-primary-600 hover:text-white transition-colors duration-300"
                    >
                        <Phone className="w-5 h-5" />
                    </a>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors duration-300">
                    {member.name}
                    </h3>
                    <p className="text-primary-600 font-semibold mb-3">
                    {member.role}
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                    {member.bio}
                    </p>
                </div>

                {/* Bottom Accent */}
                <div className="h-1 bg-gradient-to-r from-primary-500 to-secondary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
            ))}
            </div>
        </div>
        </div>
    );
};

export default Team;