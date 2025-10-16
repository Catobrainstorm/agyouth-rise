import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import logo from '../../assets/images/logo.png';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        organization: [
        { name: 'About Us', href: '/about' },
        { name: 'Mission & Vision', href: '/about#mission' },
        { name: 'Our Team', href: '/about#team' },
        { name: 'Impact Stories', href: '/news' },
        ],
        projects: [
        { name: 'Training Programs', href: '/projects/training' },
        { name: 'AgYouth Podcast', href: '/media/podcast' },
        { name: 'Community Clubs', href: '/projects/community-clubs' },
        { name: 'Stakeholders Summit', href: '/projects/summit' },
        ],
        getInvolved: [
        { name: 'Become a Member', href: '/get-involved/member' },
        { name: 'Become a Volunteer', href: '/get-involved/volunteer' },
        { name: 'Partner With Us', href: '/get-involved/partner' },
        { name: 'Donate', href: '/get-involved/donate' },
        ],
        resources: [
        { name: 'News & Updates', href: '/news' },
        { name: 'Media Gallery', href: '/media/gallery' },
        { name: 'Publications', href: '/resources/publications' },
        { name: 'Contact Us', href: '/contact' },
        ],
    };

    const socialLinks = [
        { icon: Facebook, href: 'https://www.facebook.com/share/1Cm4ED3Ax5/?mibextid=wwXIfr', label: 'Facebook', color: 'hover:text-blue-600' },
        { icon: Instagram, href: 'https://www.instagram.com/agyouthriseng?igsh=cmNhdWdwanNmaGQ0&utm_source=qr', label: 'Instagram', color: 'hover:text-pink-600' },
        // { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-700' },
        // { icon: Youtube, href: '#', label: 'YouTube', color: 'hover:text-red-600' },
        // { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-blue-400' },
    ];

    return (
        <footer className="bg-gray-900 text-gray-300">
        {/* Main Footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 sm:gap-10 lg:gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-2 sm:col-span-2">
                <div className="flex items-center mb-4 sm:mb-6">
                <img 
                    src={logo} 
                    alt="AgYouth Rise Nigeria Logo" 
                    className="h-12 sm:h-14 w-auto flex-shrink-0"
                />
                <div className="ml-3">
                    <h3 className="text-white font-bold text-base sm:text-lg">AgYouth Rise</h3>
                    <p className="text-xs sm:text-sm text-gray-400">Nigeria</p>
                </div>
                </div>
                <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6 leading-relaxed">
                Empowering youth, women, and persons with disabilities through agritech, civic engagement, and sustainable agricultural development in Abia State.
                </p>
                
                {/* Contact Info */}
                <div className="space-y-2 sm:space-y-3">
                <a href="mailto:info@agyouthrise.ng" className="flex items-start hover:text-primary-400 transition-colors">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm break-all">agyouthriseng@gmail.com</span>
                </a>
                <a href="tel:+2348012345678" className="flex items-start hover:text-primary-400 transition-colors">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">+234 906 006 8001</span>
                </a>
                <div className="flex items-start">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">Umuahia, Abia State, Nigeria</span>
                </div>
                </div>
            </div>

            {/* Links Columns */}
            <div>
                <h4 className="text-white font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">Organization</h4>
                <ul className="space-y-2 sm:space-y-3">
                {footerLinks.organization.map((link) => (
                    <li key={link.name}>
                    <a href={link.href} className="hover:text-primary-400 transition-colors text-xs sm:text-sm block">
                        {link.name}
                    </a>
                    </li>
                ))}
                </ul>
            </div>

            <div>
                <h4 className="text-white font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">Projects</h4>
                <ul className="space-y-2 sm:space-y-3">
                {footerLinks.projects.map((link) => (
                    <li key={link.name}>
                    <a href={link.href} className="hover:text-primary-400 transition-colors text-xs sm:text-sm block">
                        {link.name}
                    </a>
                    </li>
                ))}
                </ul>
            </div>

            <div>
                <h4 className="text-white font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">Get Involved</h4>
                <ul className="space-y-2 sm:space-y-3">
                {footerLinks.getInvolved.map((link) => (
                    <li key={link.name}>
                    <a href={link.href} className="hover:text-primary-400 transition-colors text-xs sm:text-sm block">
                        {link.name}
                    </a>
                    </li>
                ))}
                </ul>
            </div>

            <div>
                <h4 className="text-white font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">Resources</h4>
                <ul className="space-y-2 sm:space-y-3">
                {footerLinks.resources.map((link) => (
                    <li key={link.name}>
                    <a href={link.href} className="hover:text-primary-400 transition-colors text-xs sm:text-sm block">
                        {link.name}
                    </a>
                    </li>
                ))}
                </ul>
            </div>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-8 sm:mt-12 pt-8 sm:pt-12 border-t border-gray-800">
            <div className="max-w-xl">
                <h4 className="text-white font-semibold text-base sm:text-lg mb-2 sm:mb-3">Stay Updated</h4>
                <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4">Subscribe to our newsletter for updates on training programs, events, and opportunities.</p>
                <form className="flex flex-col sm:flex-row gap-3">
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white placeholder-gray-500 text-sm sm:text-base"
                />
                <button
                    type="submit"
                    className="px-5 sm:px-6 py-2.5 sm:py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors duration-300 text-sm sm:text-base whitespace-nowrap"
                >
                    Subscribe
                </button>
                </form>
            </div>
            </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-3 sm:space-y-4 md:space-y-0 gap-3 sm:gap-4">
                {/* Copyright */}
                <p className="text-xs sm:text-sm text-gray-400 text-center md:text-left">
                © {currentYear} AgYouth Rise Nigeria. An initiative of{' '}
                <a href="#" className="text-primary-400 hover:text-primary-300 transition-colors">
                    Orange Farm Technologies Ltd.
                </a>
                {' '}All rights reserved.
                </p>

                {/* Social Links */}
                <div className="flex items-center space-x-3 sm:space-x-4">
                {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                    <a
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        className={`p-1.5 sm:p-2 rounded-lg bg-gray-800 ${social.color} transition-all duration-300 hover:bg-gray-700 transform hover:scale-110`}
                    >
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </a>
                    );
                })}
                </div>
            </div>
            </div>
        </div>
        </footer>
    );
};

export default Footer;