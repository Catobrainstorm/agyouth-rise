import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { Menu, X, ChevronDown } from 'lucide-react';
import logo from '../../assets/images/logo.png';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const navRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const location = useLocation();

    const navItems = [
        { label: 'Home', href: '/' },
        { 
            label: 'About Us', 
            href: '/about'
        },
        {
            label: 'Projects',
            href: '/projects',
            dropdown: [
                { label: 'Training', href: '/projects/training', tag: 'Coming Soon' },
                // { label: 'AgYouth Rise Podcast', href: '/projects/podcast' },
                { label: 'Community Clubs', href: '/projects/community-clubs' },
                { label: 'Stakeholders Summit', href: '/projects/summit' }
            ]
        },
        { label: 'News', href: '/news' },
        {
            label: 'Media',
            href: '/media',
            dropdown: [
                { label: 'Podcast', href: '/media/podcast' },
                { label: 'Gallery', href: '/media/gallery' }
            ]
        },
        { label: 'Contact', href: '/contact' }
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            gsap.to(mobileMenuRef.current, {
                x: 0,
                duration: 0.3,
                ease: 'power3.out'
            });
            gsap.from('.mobile-menu-item', {
                opacity: 0,
                x: -20,
                duration: 0.3,
                stagger: 0.05,
                ease: 'power2.out'
            });
        }
    }, [isMobileMenuOpen]);

    const toggleMobileMenu = () => {
        if (isMobileMenuOpen) {
            gsap.to(mobileMenuRef.current, {
                x: '-100%',
                duration: 0.3,
                ease: 'power3.in'
            });
            setTimeout(() => setIsMobileMenuOpen(false), 300);
        } else {
            setIsMobileMenuOpen(true);
        }
    };

    const handleDropdownToggle = (index) => {
        setActiveDropdown(activeDropdown === index ? null : index);
    };

    const isActive = (href) => {
        return location.pathname === href;
    };

    return (
        <>
            <nav
                ref={navRef}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    isScrolled
                        ? 'bg-white shadow-lg py-4'
                        : 'bg-transparent py-6'
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-3 group">
                            <img 
                                src={logo} 
                                alt="AgYouth Rise Nigeria Logo" 
                                className="h-12 w-auto transform group-hover:scale-105 transition-transform duration-300"
                            />
                            <div>
                                <h1 className={`font-bold text-xl ${isScrolled ? 'text-gray-900' : 'text-gray-900'}`}>
                                    AgYouth Rise
                                </h1>
                                <p className={`text-xs ${isScrolled ? 'text-gray-600' : 'text-gray-700'}`}>
                                    Nigeria
                                </p>
                            </div>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden lg:flex items-center gap-8">
                            {navItems.map((item, index) => (
                                <div key={index} className="relative group">
                                    {item.dropdown ? (
                                        <>
                                            <button
                                                className={`flex items-center gap-1 font-medium transition-colors ${
                                                    isScrolled
                                                        ? 'text-gray-700 hover:text-green-600'
                                                        : 'text-gray-800 hover:text-green-600'
                                                } ${isActive(item.href) ? 'text-green-600' : ''}`}
                                                onMouseEnter={() => handleDropdownToggle(index)}
                                            >
                                                {item.label}
                                                <ChevronDown className="w-4 h-4" />
                                            </button>
                                            
                                            {/* Dropdown */}
                                            <div
                                                className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2"
                                                onMouseLeave={() => handleDropdownToggle(null)}
                                            >
                                                <div className="py-2">
                                                    {item.dropdown.map((dropItem, dropIndex) => (
                                                        <Link
                                                            key={dropIndex}
                                                            to={dropItem.href}
                                                            className={`block px-4 py-3 hover:bg-green-50 hover:text-green-600 transition-colors flex items-center justify-between ${
                                                                isActive(dropItem.href) ? 'text-green-600 bg-green-50' : 'text-gray-700'
                                                            }`}
                                                        >
                                                            {dropItem.label}
                                                            {dropItem.tag && (
                                                                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                                                                    {dropItem.tag}
                                                                </span>
                                                            )}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <Link
                                            to={item.href}
                                            className={`font-medium transition-colors ${
                                                isScrolled
                                                    ? 'text-gray-700 hover:text-green-600'
                                                    : 'text-gray-800 hover:text-green-600'
                                            } ${isActive(item.href) ? 'text-green-600' : ''}`}
                                        >
                                            {item.label}
                                        </Link>
                                    )}
                                </div>
                            ))}
                            
                            <Link 
                                to="/contact"
                                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-all duration-300 transform hover:scale-105"
                            >
                                Get Involved
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={toggleMobileMenu}
                            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6 text-gray-900" />
                            ) : (
                                <Menu className="w-6 h-6 text-gray-900" />
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <div
                        className="absolute inset-0 bg-black bg-opacity-50"
                        onClick={toggleMobileMenu}
                    />
                    <div
                        ref={mobileMenuRef}
                        className="absolute top-0 left-0 bottom-0 w-80 bg-white shadow-2xl transform -translate-x-full"
                    >
                        <div className="p-6 space-y-4 mt-20">
                            {navItems.map((item, index) => (
                                <div key={index} className="mobile-menu-item">
                                    {item.dropdown ? (
                                        <div>
                                            <button
                                                onClick={() => handleDropdownToggle(index)}
                                                className={`flex items-center justify-between w-full py-3 px-4 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors font-medium ${
                                                    isActive(item.href) ? 'text-green-600 bg-green-50' : 'text-gray-700'
                                                }`}
                                            >
                                                {item.label}
                                                <ChevronDown
                                                    className={`w-4 h-4 transition-transform ${
                                                        activeDropdown === index ? 'rotate-180' : ''
                                                    }`}
                                                />
                                            </button>
                                            {activeDropdown === index && (
                                                <div className="ml-4 mt-2 space-y-2">
                                                    {item.dropdown.map((dropItem, dropIndex) => (
                                                        <Link
                                                            key={dropIndex}
                                                            to={dropItem.href}
                                                            className={`block py-2 px-4 hover:text-green-600 transition-colors ${
                                                                isActive(dropItem.href) ? 'text-green-600' : 'text-gray-600'
                                                            }`}
                                                            onClick={toggleMobileMenu}
                                                        >
                                                            {dropItem.label}
                                                            {dropItem.tag && (
                                                                <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                                                                    {dropItem.tag}
                                                                </span>
                                                            )}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <Link
                                            to={item.href}
                                            className={`block py-3 px-4 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors font-medium ${
                                                isActive(item.href) ? 'text-green-600 bg-green-50' : 'text-gray-700'
                                            }`}
                                            onClick={toggleMobileMenu}
                                        >
                                            {item.label}
                                        </Link>
                                    )}
                                </div>
                            ))}
                            
                            <Link 
                                to="/contact"
                                className="block w-full bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 mobile-menu-item text-center"
                                onClick={toggleMobileMenu}
                            >
                                Get Involved
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;