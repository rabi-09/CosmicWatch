import React from 'react';

const BonusTeaser = () => {
    return (
        <section className="py-20 px-6 relative overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <div className="bg-space-card/20 backdrop-blur-lg border border-space-accent/30 rounded-2xl p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-space-accent/10 rounded-full -translate-y-32 translate-x-32 blur-3xl"></div>
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-3 h-3 bg-space-accent rounded-full animate-pulse"></div>
                            <span className="text-space-accent font-semibold tracking-wider">COSMIC BONUS UNLOCKED</span>
                        </div>
                        
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            <span className="text-white">Advanced </span>
                            <span className="text-space-accent">Orbital</span>
                            <span className="text-white"> Tracking</span>
                        </h2>
                        
                        <p className="text-space-gray-light text-lg mb-8 max-w-2xl">
                            Access real-time trajectory data, predictive impact analysis, and enhanced detection capabilities. 
                            Monitor celestial objects with military-grade precision.
                        </p>
                        
                        <div className="grid md:grid-cols-3 gap-6 mb-10">
                            {[
                                { title: "Predictive Analytics", desc: "AI-powered impact prediction" },
                                { title: "HD Live Feed", desc: "Real-time telescope streaming" },
                                { title: "Risk Assessment", desc: "Advanced hazard evaluation" }
                            ].map((feature, idx) => (
                                <div key={idx} className="bg-space-card/40 p-5 rounded-xl border border-space-border">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-2 h-2 bg-space-accent rounded-full"></div>
                                        <h3 className="font-bold text-lg">{feature.title}</h3>
                                    </div>
                                    <p className="text-space-gray-light text-sm">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                        
                        <button className="px-8 py-3 bg-space-accent text-space-black font-bold rounded-lg hover:bg-space-accent/90 transition-all transform hover:scale-105 active:scale-95">
                            ACCESS PREMIUM DASHBOARD
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BonusTeaser;