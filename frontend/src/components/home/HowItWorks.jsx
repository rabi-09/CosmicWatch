import React from 'react';
import { FiSearch, FiAlertTriangle, FiBarChart, FiShield } from 'react-icons/fi';

const HowItWorks = () => {
    const steps = [
        {
            step: "01",
            icon: <FiSearch />,
            title: "Detection & Scanning",
            desc: "Continuous orbital surveillance using ground-based telescopes and satellite networks",
            color: "border-blue-500"
        },
        {
            step: "02",
            icon: <FiAlertTriangle />,
            title: "Threat Assessment",
            desc: "AI-powered analysis of trajectory, size, and velocity for risk evaluation",
            color: "border-yellow-500"
        },
        {
            step: "03",
            icon: <FiBarChart />,
            title: "Orbital Analysis",
            desc: "Precise calculation of orbital paths and potential impact probabilities",
            color: "border-purple-500"
        },
        {
            step: "04",
            icon: <FiShield />,
            title: "Alert & Response",
            desc: "Real-time notifications and coordinated response protocols activation",
            color: "border-green-500"
        }
    ];

    return (
        <section className="py-20 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-space-accent/10 rounded-full mb-6">
                        <div className="w-2 h-2 bg-space-accent rounded-full animate-pulse"></div>
                        <span className="text-space-accent text-sm font-semibold">MONITORING PROTOCOL</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="text-white">How Cosmic </span>
                        <span className="text-space-accent">Surveillance</span>
                        <span className="text-white"> Works</span>
                    </h2>
                    <p className="text-space-gray-light text-lg max-w-2xl mx-auto">
                        Four-phase systematic approach to cosmic threat detection and planetary defense.
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting line */}
                    <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-space-border/30 -translate-y-1/2 z-0"></div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                        {steps.map((step, idx) => (
                            <div key={idx} className="text-center">
                                <div className={`relative mb-6 mx-auto w-20 h-20 rounded-full bg-space-card border-4 ${step.color} flex items-center justify-center`}>
                                    <div className="text-2xl text-white">
                                        {step.icon}
                                    </div>
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-space-accent text-space-black font-bold rounded-full flex items-center justify-center text-sm">
                                        {step.step}
                                    </div>
                                </div>
                                
                                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                                <p className="text-space-gray-light">{step.desc}</p>
                                
                                <div className="mt-6">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-space-card/50 rounded-full">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-green-400 text-sm font-medium">OPERATIONAL</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <div className="bg-space-card/20 backdrop-blur-sm border border-space-accent/20 rounded-xl p-6 max-w-3xl mx-auto">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="w-3 h-3 bg-space-accent rounded-full animate-pulse"></div>
                            <span className="text-space-accent font-semibold">SYSTEM STATUS</span>
                        </div>
                        <p className="text-lg text-space-gray-light">
                            All monitoring phases are currently active and operating at optimal capacity. 
                            Last system check: <span className="text-white font-semibold">2 minutes ago</span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;