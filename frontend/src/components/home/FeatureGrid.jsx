import React from 'react';
import { FiActivity, FiTarget, FiBarChart2, FiGlobe, FiAlertCircle, FiDatabase } from 'react-icons/fi';

const FeatureGrid = () => {
    const features = [
        {
            icon: <FiActivity />,
            title: "Real-time Monitoring",
            desc: "Live tracking of near-Earth objects with sub-second latency",
            color: "text-cyan-400"
        },
        {
            icon: <FiTarget />,
            title: "Precision Detection",
            desc: "Identify objects as small as 10 meters from LEO",
            color: "text-purple-400"
        },
        {
            icon: <FiBarChart2 />,
            title: "Orbital Analytics",
            desc: "Advanced trajectory prediction and risk scoring",
            color: "text-green-400"
        },
        {
            icon: <FiGlobe />,
            title: "Global Coverage",
            desc: "Monitor all orbital paths with satellite network",
            color: "text-blue-400"
        },
        {
            icon: <FiAlertCircle />,
            title: "Hazard Alerts",
            desc: "Instant notifications for potential impact events",
            color: "text-red-400"
        },
        {
            icon: <FiDatabase />,
            title: "Historical Data",
            desc: "Access decades of astronomical observations",
            color: "text-yellow-400"
        }
    ];

    return (
        <section className="py-20 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-space-accent/10 rounded-full mb-6">
                        <div className="w-2 h-2 bg-space-accent rounded-full animate-pulse"></div>
                        <span className="text-space-accent text-sm font-semibold">SYSTEM CAPABILITIES</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="text-white">Advanced Cosmic </span>
                        <span className="text-space-accent">Monitoring</span>
                    </h2>
                    <p className="text-space-gray-light text-lg max-w-2xl mx-auto">
                        Comprehensive surveillance system for near-Earth objects with multi-spectrum detection and AI analysis.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, idx) => (
                        <div 
                            key={idx} 
                            className="bg-space-card/30 backdrop-blur-sm border border-space-border rounded-xl p-6 hover:border-space-accent/50 transition-all duration-300 group hover:transform hover:-translate-y-1"
                        >
                            <div className={`text-3xl mb-4 ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-space-gray-light">{feature.desc}</p>
                            <div className="mt-6 pt-4 border-t border-space-border/50">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-space-gray">Status</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-green-400 text-sm font-medium">ACTIVE</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeatureGrid;