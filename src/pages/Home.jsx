import React from 'react';
import Hero from '../components/home/Hero';
import Partners from '../components/home/Partners';
import ImpactStats from '../components/home/ImpactStats';
import Projects from '../components/home/Projects';
import LatestNews from '../components/home/LatestNews';

const Home = () => {
    return (
        <div>
            <Hero />
            <Partners />
            <ImpactStats />
            <Projects />
            <LatestNews />
        </div>
    );
};

export default Home;