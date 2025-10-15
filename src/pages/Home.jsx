import React from 'react';
import Hero from '../components/home/Hero';
import ImpactStats from '../components/home/ImpactStats';
import Projects from '../components/home/Projects';
import LatestNews from '../components/home/LatestNews';

const Home = () => {
    return (
        <div>
        <Hero />
        <ImpactStats />
        <Projects />
        <LatestNews />
        </div>
    );
};

export default Home;