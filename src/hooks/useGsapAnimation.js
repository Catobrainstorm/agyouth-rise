import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook for GSAP animations
 * Handles cleanup automatically
 */
export const useGsapAnimation = (animationCallback, dependencies = []) => {
    const elementRef = useRef(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const ctx = gsap.context(() => {
        animationCallback(element);
        }, element);

        return () => ctx.revert();
    }, dependencies);

    return elementRef;
};

/**
 * Hook for fade in up animation
 */
export const useFadeInUp = (options = {}) => {
    return useGsapAnimation((element) => {
        gsap.from(element, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        ...options
        });
    });
};

/**
 * Hook for scroll-triggered animations
 */
export const useScrollReveal = (options = {}) => {
    return useGsapAnimation((element) => {
        gsap.from(element, {
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
        });
    });
    };

    /**
     * Hook for stagger animations
     */
    export const useStaggerAnimation = (selector, options = {}) => {
    return useGsapAnimation((element) => {
        const children = element.querySelectorAll(selector);
        
        gsap.from(children, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: element,
            start: 'top 80%',
        },
        ...options
        });
    });
};

/**
 * Hook for counter animations
 */
export const useCounterAnimation = (targetValue, options = {}) => {
    const counterRef = useRef(null);

    useEffect(() => {
        const element = counterRef.current;
        if (!element) return;

        const obj = { value: 0 };

        const animation = gsap.to(obj, {
        value: targetValue,
        duration: 2,
        ease: 'power2.out',
        onUpdate: () => {
            element.textContent = Math.round(obj.value).toLocaleString();
        },
        scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            once: true,
        },
        ...options
        });

        return () => animation.kill();
    }, [targetValue]);

    return counterRef;
};

/**
 * Hook for rotating text
 */
export const useRotatingText = (duration = 4000) => {
    return useGsapAnimation((element) => {
        const items = element.querySelectorAll('.rotating-item');
        if (items.length === 0) return;

        // Hide all except first
        gsap.set(items, { opacity: 0, y: 20 });
        gsap.set(items[0], { opacity: 1, y: 0 });

        const tl = gsap.timeline({ repeat: -1 });

        items.forEach((item, index) => {
        const nextIndex = (index + 1) % items.length;
        
        tl.to(item, {
            opacity: 0,
            y: -20,
            duration: 0.8,
            ease: 'power2.in',
            delay: duration / 1000
        });

        tl.to(items[nextIndex], {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.4');
        });
    });
    };

    /**
     * Hook for parallax effect
     */
    export const useParallax = (speed = 0.5) => {
    return useGsapAnimation((element) => {
        gsap.to(element, {
        y: () => -element.offsetHeight * speed,
        ease: 'none',
        scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
        }
        });
    });
    };

    /**
     * Hook for image reveal
     */
    export const useImageReveal = (options = {}) => {
    return useGsapAnimation((element) => {
        gsap.set(element, { clipPath: 'inset(0% 0% 100% 0%)' });
        
        gsap.to(element, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.5,
        ease: 'power4.out',
        scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none none',
        },
        ...options
        });
    });
    };

    /**
     * Hook for navbar scroll effect
     */
    export const useNavbarScroll = () => {
    const navRef = useRef(null);

    useEffect(() => {
        const nav = navRef.current;
        if (!nav) return;

        const trigger = ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        onUpdate: (self) => {
            if (self.direction === -1) {
            gsap.to(nav, { y: 0, duration: 0.3 });
            } else if (self.progress > 0.1) {
            gsap.to(nav, { y: -100, duration: 0.3 });
            }
        }
        });

        const scrollTrigger = ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        toggleClass: {
            targets: nav,
            className: 'bg-white/95 backdrop-blur-md shadow-lg'
        }
        });

        return () => {
        trigger.kill();
        scrollTrigger.kill();
        };
    }, []);

    return navRef;
};

/**
 * Hook for magnetic button effect
 */
export const useMagneticButton = (strength = 0.3) => {
    const buttonRef = useRef(null);

    useEffect(() => {
        const button = buttonRef.current;
        if (!button) return;

        const moveMagnetic = (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(button, {
            x: x * strength,
            y: y * strength,
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
    }, [strength]);

    return buttonRef;
};

/**
 * Hook for card hover effect
 */
export const useCardHover = () => {
    const cardRef = useRef(null);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const handleMouseEnter = () => {
        gsap.to(card, {
            y: -10,
            scale: 1.02,
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            duration: 0.3,
            ease: 'power2.out'
        });
        };

        const handleMouseLeave = () => {
        gsap.to(card, {
            y: 0,
            scale: 1,
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
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
    }, []);

    return cardRef;
};

/**
 * Hook for text split animation
 */
export const useTextSplitAnimation = (options = {}) => {
    return useGsapAnimation((element) => {
        const text = element.textContent;
        const words = text.split(' ');
        
        element.innerHTML = words
        .map(word => `<span class="word">${word}</span>`)
        .join(' ');

        const wordElements = element.querySelectorAll('.word');

        gsap.from(wordElements, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: element,
            start: 'top 85%',
        },
        ...options
        });
    });
};

export default useGsapAnimation;