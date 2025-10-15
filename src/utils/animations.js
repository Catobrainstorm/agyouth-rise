import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Fade in animation from bottom
 */
    export const fadeInUp = (element, options = {}) => {
    const defaults = {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        ...options
    };

    return gsap.from(element, defaults);
    };

    /**
     * Fade in animation from left
     */
    export const fadeInLeft = (element, options = {}) => {
    const defaults = {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        ...options
    };

    return gsap.from(element, defaults);
    };

    /**
     * Fade in animation from right
     */
    export const fadeInRight = (element, options = {}) => {
    const defaults = {
        x: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        ...options
    };

    return gsap.from(element, defaults);
    };

    /**
     * Scale in animation
     */
    export const scaleIn = (element, options = {}) => {
    const defaults = {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
        ...options
    };

    return gsap.from(element, defaults);
    };

    /**
     * Stagger animation for multiple elements
     */
    export const staggerFadeIn = (elements, options = {}) => {
    const defaults = {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        ...options
    };

    return gsap.from(elements, defaults);
    };

    /**
     * Rotating text animation
     */
    export const rotatingText = (elements, options = {}) => {
    const defaults = {
        duration: 4,
        interval: 4000,
        ...options
    };

    const tl = gsap.timeline({ repeat: -1 });

    elements.forEach((element, index) => {
        if (index === 0) {
        tl.to(element, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out'
        });
        }

        tl.to(element, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: defaults.duration
        }, index === 0 ? 0 : `+=${defaults.duration}`);

        tl.to(element, {
        opacity: 0,
        y: -30,
        duration: 0.8,
        ease: 'power2.in'
        }, `+=${defaults.duration}`);
    });

    return tl;
    };

    /**
     * Parallax scroll effect
     */
    export const parallaxScroll = (element, options = {}) => {
    const defaults = {
        y: -100,
        ease: 'none',
        scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        },
        ...options
    };

    return gsap.to(element, defaults);
    };

    /**
     * Counter animation for numbers
     */
    export const animateCounter = (element, targetValue, options = {}) => {
    const defaults = {
        duration: 2,
        ease: 'power2.out',
        ...options
    };

    const obj = { value: 0 };

    return gsap.to(obj, {
        value: targetValue,
        duration: defaults.duration,
        ease: defaults.ease,
        onUpdate: () => {
        element.textContent = Math.round(obj.value).toLocaleString();
        },
        scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        once: true,
        }
    });
    };

    /**
     * Reveal animation with ScrollTrigger
     */
    export const scrollReveal = (element, options = {}) => {
    const defaults = {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
        },
        ...options
    };

    return gsap.from(element, defaults);
    };

    /**
     * Image reveal with clip-path
     */
    export const imageReveal = (element, options = {}) => {
    const defaults = {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.5,
        ease: 'power4.out',
        scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none none',
        },
        ...options
    };

    gsap.set(element, { clipPath: 'inset(0% 0% 100% 0%)' });
    return gsap.to(element, defaults);
    };

    /**
     * Navbar scroll animation
     */
    export const navbarScroll = (navbar) => {
    return ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        toggleClass: {
        targets: navbar,
        className: 'scrolled'
        }
    });
    };

    /**
     * Smooth scroll to element
     */
    export const smoothScrollTo = (target, options = {}) => {
    const defaults = {
        duration: 1,
        ease: 'power3.inOut',
        offsetY: -80,
        ...options
    };

    return gsap.to(window, {
        duration: defaults.duration,
        scrollTo: {
        y: target,
        offsetY: defaults.offsetY
        },
        ease: defaults.ease
    });
    };

    /**
     * Magnetic button effect
     */
    export const magneticButton = (button) => {
    const moveMagnetic = (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(button, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: 'power2.out'
        });
    };

    const resetMagnetic = () => {
        gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
        });
    };

    button.addEventListener('mousemove', moveMagnetic);
    button.addEventListener('mouseleave', resetMagnetic);

    return () => {
        button.removeEventListener('mousemove', moveMagnetic);
        button.removeEventListener('mouseleave', resetMagnetic);
    };
    };

    /**
     * Card hover effect
     */
    export const cardHover = (card) => {
    const handleMouseEnter = () => {
        gsap.to(card, {
        y: -10,
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out'
        });
    };

    const handleMouseLeave = () => {
        gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
        });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
    };
    };

    /**
     * Text reveal line by line
     */
    export const textRevealByLine = (element, options = {}) => {
    const defaults = {
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        },
        ...options
    };

    const lines = element.querySelectorAll('.line');
    
    return gsap.from(lines, {
        y: 100,
        opacity: 0,
        duration: defaults.duration,
        stagger: defaults.stagger,
        ease: defaults.ease,
        scrollTrigger: defaults.scrollTrigger
    });
    };

    /**
     * Hero background animation
     */
    export const heroBackground = (elements) => {
    const tl = gsap.timeline({ repeat: -1 });

    elements.forEach((element, index) => {
        tl.to(element, {
        x: gsap.utils.random(-30, 30),
        y: gsap.utils.random(-30, 30),
        rotation: gsap.utils.random(-15, 15),
        duration: gsap.utils.random(3, 5),
        ease: 'sine.inOut'
        }, index * 0.5);
    });

    return tl;
    };

    export default {
    fadeInUp,
    fadeInLeft,
    fadeInRight,
    scaleIn,
    staggerFadeIn,
    rotatingText,
    parallaxScroll,
    animateCounter,
    scrollReveal,
    imageReveal,
    navbarScroll,
    smoothScrollTo,
    magneticButton,
    cardHover,
    textRevealByLine,
    heroBackground
    };