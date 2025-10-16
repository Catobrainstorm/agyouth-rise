import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Users, Handshake, UserPlus, CheckCircle, Sparkles, Globe, Heart, ArrowRight } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        interest: 'general'
    });
    
    const [submitted, setSubmitted] = useState(false);
    const [isHovering, setIsHovering] = useState(null);
    const [activeCard, setActiveCard] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        setSubmitted(true);
        
        setTimeout(() => {
            setSubmitted(false);
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
                interest: 'general'
            });
        }, 3000);
    };

    const ctaOptions = [
        {
            icon: UserPlus,
            title: 'Become a Member',
            description: 'Join the AgYouth Rise Network for updates, resources, and opportunities.',
            gradient: 'from-primary-400 via-primary-500 to-primary-600',
            value: 'member',
            benefits: ['Access to training', 'Networking events', 'Resource library']
        },
        {
            icon: Users,
            title: 'Become a Volunteer',
            description: 'Support training, outreach, and project delivery in your community.',
            gradient: 'from-secondary-300 via-secondary-400 to-secondary-500',
            value: 'volunteer',
            benefits: ['Make an impact', 'Gain experience', 'Build connections']
        },
        {
            icon: Handshake,
            title: 'Partner With Us',
            description: 'Engage as a donor, government agency, or NGO partner.',
            gradient: 'from-earth-400 via-earth-500 to-earth-600',
            value: 'partner',
            benefits: ['Strategic alliance', 'Shared impact', 'Brand visibility']
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 relative overflow-hidden">
            {/* Animated Background Blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-secondary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            <style>{`
                @keyframes blob {
                    0%, 100% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
            `}</style>
            
            {/* Hero Section */}
            <section className="relative py-32 px-4 overflow-hidden">
                <div className="max-w-6xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg mb-8 animate-fade-in border border-primary-200">
                        <Sparkles className="w-5 h-5 text-secondary-400 animate-pulse" />
                        <span className="text-sm font-semibold text-primary-700">Let's Build the Future Together</span>
                        <Sparkles className="w-5 h-5 text-secondary-400 animate-pulse" />
                    </div>
                    
                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 animate-slide-up">
                        <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-400 bg-clip-text text-transparent">
                            Get Involved
                        </span>
                        <br />
                        <span className="text-gray-900">with AgYouth Rise</span>
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up">
                        Whether you want to <span className="text-primary-600 font-semibold">join our network</span>, 
                        <span className="text-secondary-500 font-semibold"> volunteer your time</span>, or 
                        <span className="text-earth-600 font-semibold"> partner with us</span>, 
                        we're excited to connect and build a sustainable agricultural future together.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 animate-scale-in">
                        <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md hover:shadow-xl transition-all">
                            <Globe className="w-5 h-5 text-primary-500" />
                            <span className="text-gray-700 font-medium">Global Impact</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md hover:shadow-xl transition-all">
                            <Heart className="w-5 h-5 text-secondary-400" />
                            <span className="text-gray-700 font-medium">Community Driven</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md hover:shadow-xl transition-all">
                            <CheckCircle className="w-5 h-5 text-primary-600" />
                            <span className="text-gray-700 font-medium">Proven Results</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Cards */}
            <section className="py-20 px-4 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8 mb-24">
                        {ctaOptions.map((option, index) => {
                            const Icon = option.icon;
                            const isActive = activeCard === option.value;
                            
                            return (
                                <div
                                    key={option.value}
                                    className={`relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer group overflow-hidden transform hover:-translate-y-2 ${
                                        isActive ? 'ring-4 ring-primary-400 scale-105' : ''
                                    }`}
                                    onClick={() => {
                                        setActiveCard(option.value);
                                        setFormData({...formData, interest: option.value, subject: option.title});
                                    }}
                                    onMouseEnter={() => setIsHovering(option.value)}
                                    onMouseLeave={() => setIsHovering(null)}
                                >
                                    {/* Gradient Background Overlay */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${option.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                                    
                                    {/* Shimmer Effect */}
                                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out">
                                        <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"></div>
                                    </div>

                                    <div className="relative z-10">
                                        {/* Icon with animated background */}
                                        <div className={`relative w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br ${option.gradient} flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                                            <Icon className="w-10 h-10 text-white animate-float" />
                                            {isHovering === option.value && (
                                                <div className="absolute inset-0 rounded-2xl bg-white opacity-20 animate-ping"></div>
                                            )}
                                        </div>

                                        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
                                            {option.title}
                                        </h3>
                                        
                                        <p className="text-gray-600 mb-6 leading-relaxed">
                                            {option.description}
                                        </p>

                                        {/* Benefits List */}
                                        <div className="space-y-2 mb-6">
                                            {option.benefits.map((benefit, i) => (
                                                <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                                                    <CheckCircle className="w-4 h-4 text-primary-500" />
                                                    <span>{benefit}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Call to Action */}
                                        <div className="flex items-center gap-2 text-primary-600 font-semibold group-hover:gap-4 transition-all">
                                            <span>Select this option</span>
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                        </div>

                                        {/* Active Indicator */}
                                        {isActive && (
                                            <div className="absolute top-4 right-4">
                                                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${option.gradient} flex items-center justify-center animate-scale-in`}>
                                                    <CheckCircle className="w-5 h-5 text-white" />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Contact Form & Info */}
                    <div className="grid lg:grid-cols-5 gap-12">
                        {/* Contact Information */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="animate-slide-up">
                                <h2 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent mb-6">
                                    Contact Information
                                </h2>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    Reach out through any of these channels. We're here to answer your questions 
                                    and discuss how we can work together to transform agriculture.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="group flex items-start space-x-4 p-6 rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                    <div className="w-14 h-14 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                                        <Mail className="w-7 h-7 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-gray-900 mb-2 text-lg">Email</h4>
                                        <a href="mailto:info@agyouthrise.ng" className="text-primary-600 hover:text-primary-700 transition-colors font-medium text-lg flex items-center gap-2 group">
                                            agyouthriseng@gmail.com
                                            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                        </a>
                                    </div>
                                </div>

                                <div className="group flex items-start space-x-4 p-6 rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                    <div className="w-14 h-14 bg-gradient-to-br from-secondary-300 to-secondary-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                                        <Phone className="w-7 h-7 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-gray-900 mb-2 text-lg">Phone</h4>
                                        <a href="tel:+2348012345678" className="text-primary-600 hover:text-primary-700 transition-colors font-medium text-lg flex items-center gap-2 group">
                                            +234 906 006 8001
                                            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                        </a>
                                    </div>
                                </div>

                                <div className="group flex items-start space-x-4 p-6 rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                    <div className="w-14 h-14 bg-gradient-to-br from-earth-400 to-earth-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                                        <MapPin className="w-7 h-7 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-gray-900 mb-2 text-lg">Location</h4>
                                        <p className="text-gray-700 font-medium text-lg">
                                            Umuahia, Abia State<br />
                                            Nigeria
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-3">
                            <div className="relative bg-white rounded-3xl shadow-2xl p-8 md:p-12 overflow-hidden">
                                {/* Decorative Background */}
                                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full opacity-20 blur-3xl -mr-48 -mt-48"></div>
                                
                                <div className="relative z-10">
                                    <div className="mb-8">
                                        <h2 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent mb-3">
                                            Send an Email
                                        </h2>
                                        <p className="text-gray-600 text-lg">Fill out the form below and we'll get back to you as soon as possible.</p>
                                    </div>

                                    {submitted && (
                                        <div className="mb-8 p-6 bg-gradient-to-r from-primary-50 to-primary-100 border-l-4 border-primary-600 rounded-xl shadow-lg animate-scale-in">
                                            <div className="flex items-center gap-3">
                                                <CheckCircle className="w-6 h-6 text-primary-600" />
                                                <p className="text-primary-800 font-semibold text-lg">Thank you for reaching out! We'll be in touch soon.</p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                                    Full Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all hover:border-primary-300"
                                                    placeholder="John Doe"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                                    Email Address *
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all hover:border-primary-300"
                                                    placeholder="john@example.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                                    Phone Number
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all hover:border-primary-300"
                                                    placeholder="+234 800 000 0000"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                                    I'm interested in *
                                                </label>
                                                <select
                                                    name="interest"
                                                    value={formData.interest}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all hover:border-primary-300"
                                                >
                                                    <option value="general">General Inquiry</option>
                                                    <option value="member">Becoming a Member</option>
                                                    <option value="volunteer">Becoming a Volunteer</option>
                                                    <option value="partner">Partnership Opportunity</option>
                                                    <option value="media">Media & Press</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                                Subject *
                                            </label>
                                            <input
                                                type="text"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all hover:border-primary-300"
                                                placeholder="How can we help you?"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                                Message *
                                            </label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                rows="6"
                                                className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all resize-none hover:border-primary-300"
                                                placeholder="Tell us more about your inquiry..."
                                            ></textarea>
                                        </div>

                                        <button
                                            onClick={handleSubmit}
                                            className="w-full bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-bold py-5 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl flex items-center justify-center space-x-3 group"
                                        >
                                            <span className="text-lg">Send Email</span>
                                            <Send className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;