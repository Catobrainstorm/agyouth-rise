import { useEffect, useRef } from 'react';
import { ArrowRight, Users, Radio, Building2, GraduationCap, Calendar, MapPin, Target } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
    const projectsRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
        // Hero animation
        gsap.from('.project-hero-content', {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out'
        });

        // Animate project cards on scroll
        cardsRef.current.forEach((card, index) => {
            gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 60,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out'
            });
        });
        }, projectsRef);

        return () => ctx.revert();
    }, []);

    const projects = [
        {
        id: 1,
        title: 'AgYouth Training Program',
        status: 'Coming Soon',
        description: 'Comprehensive training in greenhouse management, nursery care, soilless farming, and modern agritech solutions for youth empowerment.',
        icon: GraduationCap,
        color: 'from-green-500 to-emerald-600',
        highlights: [
            'Greenhouse Management Certification',
            'Soilless Farming Techniques',
            'Nursery Care & Plant Propagation',
            'Farm Business Management',
            'Agritech Tools & Digital Solutions'
        ],
        impact: {
            trained: '150+',
            duration: '6 weeks',
            certification: 'Yes'
        }
        },
        {
        id: 2,
        title: 'AgYouth Rise Podcast',
        status: 'Active',
        description: 'Weekly podcast educating citizens on agricultural interventions, governance, policy advocacy, and youth inclusion in agriculture.',
        icon: Radio,
        color: 'from-orange-500 to-amber-600',
        highlights: [
            'Agricultural Policy Analysis',
            'Governance & Accountability',
            'Youth Success Stories',
            'Expert Interviews',
            'Community Voice Platform'
        ],
        impact: {
            episodes: '20+',
            listeners: '5,000+',
            frequency: 'Weekly'
        }
        },
        {
        id: 3,
        title: 'Community Clubs Initiative',
        status: 'Active',
        description: 'Grassroots clubs established for civic participation, sustainable youth employment, and community-driven agricultural development.',
        icon: Users,
        color: 'from-blue-500 to-indigo-600',
        highlights: [
            'Youth Leadership Development',
            'Civic Engagement Training',
            'Community Garden Projects',
            'Peer-to-Peer Learning',
            'Local Food Security Initiatives'
        ],
        impact: {
            clubs: '12',
            members: '300+',
            communities: '8'
        }
        },
        {
        id: 4,
        title: 'Stakeholders Summit',
        status: 'Upcoming',
        description: 'Annual gathering of government agencies, NGOs, youth leaders, and agricultural stakeholders to drive policy and partnership.',
        icon: Building2,
        color: 'from-purple-500 to-violet-600',
        highlights: [
            'Policy Roundtable Discussions',
            'Partnership Opportunities',
            'Youth Pitch Competitions',
            'Agricultural Innovation Showcase',
            'Networking Sessions'
        ],
        impact: {
            attendees: '500+',
            partners: '25+',
            duration: '2 days'
        }
        }
    ];

    const getStatusBadge = (status) => {
        const styles = {
        'Coming Soon': 'bg-yellow-100 text-yellow-800 border-yellow-300',
        'Active': 'bg-green-100 text-green-800 border-green-300',
        'Upcoming': 'bg-blue-100 text-blue-800 border-blue-300'
        };

        return (
        <span className={`px-4 py-1 rounded-full text-sm font-semibold border-2 ${styles[status]}`}>
            {status}
        </span>
        );
    };

    return (
        <div ref={projectsRef} className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-24 overflow-hidden">
            <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-400 rounded-full blur-3xl"></div>
            </div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="project-hero-content text-center">
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Our <span className="text-secondary-300">Projects</span>
                </h1>
                <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto mb-8">
                Empowering youth through training, advocacy, and community-driven agricultural innovation
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg border border-white/20">
                    <div className="text-3xl font-bold">4</div>
                    <div className="text-sm text-green-100">Active Programs</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg border border-white/20">
                    <div className="text-3xl font-bold">150+</div>
                    <div className="text-sm text-green-100">Youth Trained</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg border border-white/20">
                    <div className="text-3xl font-bold">12</div>
                    <div className="text-sm text-green-100">Community Clubs</div>
                </div>
                </div>
            </div>
            </div>
        </section>

        {/* Projects Grid */}
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
                {projects.map((project, index) => (
                <div
                    key={project.id}
                    ref={el => cardsRef.current[index] = el}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                >
                    <div className="md:flex">
                    {/* Project Icon & Gradient */}
                    <div className={`md:w-1/3 bg-gradient-to-br ${project.color} p-12 flex items-center justify-center`}>
                        <div className="text-center">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-8 inline-block mb-4">
                            <project.icon className="w-20 h-20 text-white" />
                        </div>
                        <div className="text-white">
                            {getStatusBadge(project.status)}
                        </div>
                        </div>
                    </div>

                    {/* Project Content */}
                    <div className="md:w-2/3 p-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        {project.title}
                        </h2>
                        <p className="text-gray-600 text-lg mb-6">
                        {project.description}
                        </p>

                        {/* Highlights */}
                        <div className="mb-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <Target className="w-5 h-5 text-primary-600" />
                            Key Highlights
                        </h3>
                        <ul className="grid md:grid-cols-2 gap-3">
                            {project.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-gray-700">
                                <ArrowRight className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                                <span>{highlight}</span>
                            </li>
                            ))}
                        </ul>
                        </div>

                        {/* Impact Stats */}
                        <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-200">
                        {Object.entries(project.impact).map(([key, value]) => (
                            <div key={key} className="bg-gray-50 px-4 py-2 rounded-lg">
                            <div className="text-2xl font-bold text-primary-600">{value}</div>
                            <div className="text-sm text-gray-600 capitalize">{key}</div>
                            </div>
                        ))}
                        </div>

                        {/* CTA Button */}
                        <div className="mt-6">
                        {project.status === 'Coming Soon' ? (
                            <button className="bg-gray-200 text-gray-500 px-6 py-3 rounded-lg font-semibold cursor-not-allowed">
                            Coming Soon
                            </button>
                        ) : (
                            <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center gap-2">
                            Learn More
                            <ArrowRight className="w-5 h-5" />
                            </button>
                        )}
                        </div>
                    </div>
                    </div>
                </div>
                ))}
            </div>
            </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-primary-600 to-primary-700 py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Get Involved?
            </h2>
            <p className="text-xl text-green-100 mb-8">
                Join us in transforming agriculture and empowering youth across Abia State
            </p>
            <div className="flex flex-wrap justify-center gap-4">
                <button className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-colors duration-300">
                Become a Member
                </button>
                <button className="bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-300">
                Partner With Us
                </button>
            </div>
            </div>
        </section>
        </div>
    );
};

export default Projects;