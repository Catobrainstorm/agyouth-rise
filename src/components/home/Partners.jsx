import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import partnerOne from '../../assets/Images/partner-one.webp';
import partnerTwo from '../../assets/Images/partner-two.webp';
import partnerThree from '../../assets/Images/partner-three.webp';

const Partners = () => {
  const cardsRef = useRef([]);

  const partnerLogos = [
    {
      id: 1,
      image: partnerOne,
    },
    {
      id: 2,
      image: partnerTwo,
    },
    {
      id: 3,
      image: partnerThree,
    },
  ];

  // Simple entrance animation
  useEffect(() => {
    const tl = gsap.timeline();

    // Title animation
    tl.from('.partners-title', {
      opacity: 0,
      y: -50,
      duration: 0.8,
      ease: 'power3.out',
    });

    tl.from(
      '.partners-subtitle',
      {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power3.out',
      },
      '-=0.4'
    );

    // Cards smooth fade-in with stagger
    cardsRef.current.forEach((card, index) => {
      gsap.from(card, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        delay: index * 0.15,
        ease: 'power2.out',
      });
    });
  }, []);

  return (
    <section className="relative w-full py-32 overflow-hidden bg-gradient-to-b from-white via-primary-50/20 to-white">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary-200/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-secondary-200/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="partners-title text-5xl md:text-6xl font-bold text-earth-900 mb-4">
            Our <span className="text-primary-500">Partners</span>
          </h2>
          <p className="partners-subtitle text-lg text-earth-600 max-w-3xl mx-auto">
            Collaborating with industry leaders in agriculture and youth development
          </p>
        </div>

        {/* Clean Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {partnerLogos.map((partner, index) => (
            <div
              key={partner.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group"
            >
              <div className="relative h-72 md:h-80 rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border border-primary-100/50 flex items-center justify-center p-8">
                {/* Gradient border effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400/5 via-transparent to-secondary-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Logo */}
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="relative w-full h-full object-contain object-center drop-shadow-md group-hover:drop-shadow-lg transition-all duration-300"
                />

                {/* Bottom accent bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>

              {/* Name label */}
              <p className="mt-4 text-center text-sm font-semibold text-earth-700 uppercase tracking-wide">
                {partner.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;