import React, { useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import HeroSection from '../../components/home/HeroSection';
import LiveStats from '../../components/home/LiveStats';
import HowItWorks from '../../components/home/HowItWorks';
import RiskScale from '../../components/home/RiskScale';
import FeatureGrid from '../../components/home/FeatureGrid';
import BonusTeaser from '../../components/home/BonusTeaser';
import Footer from '../../components/layout/Footer';
import { homeConfig } from './home.config';
import BackgroundStars from '../../components/BackgroundStars';

const Home = () => {
    useEffect(() => {
        document.title = homeConfig.meta.title;
    }, []);

    return (
        <div className="bg-space-black min-h-screen text-white overflow-x-hidden selection:bg-space-accent selection:text-space-black relative">
            <BackgroundStars />
            <div className="relative z-10">
                <Navbar />

                <main>
                    <HeroSection />
                    <LiveStats />
                    <HowItWorks />
                    <RiskScale />
                    <FeatureGrid />
                    <BonusTeaser />
                </main>

                <Footer />
            </div>
        </div>
    );
};

export default Home;
