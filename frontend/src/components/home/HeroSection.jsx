import React from 'react';

const HeroSection = () => {
    return (
        <section className="relative py-20 px-6 overflow-hidden">
            <div className="max-w-6xl mx-auto my-10 relative z-10">
                <div className="text-center relative z-10">
                    

                    {/* Main headline */}
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                        <span className="text-white">COSMIC </span>
                        <span className="text-space-accent">SURVEILLANCE</span>
                    </h1>
                    <p className="text-2xl md:text-3xl text-space-gray-light mb-8 max-w-3xl mx-auto">
                        Real-time monitoring of near-Earth objects and cosmic threats
                    </p>

                    {/* Subtitle */}
                    <p className="text-lg text-space-gray-light mb-12 max-w-2xl mx-auto">
                        Advanced detection system tracking asteroids, comets, and orbital debris with military-grade precision. 
                        Stay informed about potential cosmic hazards.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                        <button className="px-8 py-4 bg-space-accent text-space-black font-bold rounded-lg text-lg hover:bg-space-accent/90 transition-all transform hover:scale-105 active:scale-95">
                            ACCESS LIVE DASHBOARD
                        </button>
                        <button className="px-8 py-4 bg-space-card/50 backdrop-blur-sm border border-space-accent/30 text-white font-bold rounded-lg text-lg hover:bg-space-card/70 transition-all">
                            VIEW DOCUMENTATION
                        </button>
                    </div>

                    {/* Stats bar */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                        {[
                            { value: "12,847", label: "Objects Tracked", sub: "In database" },
                            { value: "99.8%", label: "Accuracy", sub: "Detection rate" },
                            { value: "24/7", label: "Monitoring", sub: "Global coverage" },
                            { value: "<1s", label: "Latency", sub: "Real-time data" }
                        ].map((stat, idx) => (
                            <div key={idx} className="bg-space-card/30 backdrop-blur-sm p-4 rounded-xl border border-space-border">
                                <div className="text-2xl md:text-3xl font-bold text-space-accent mb-1">{stat.value}</div>
                                <div className="text-sm text-white font-semibold">{stat.label}</div>
                                <div className="text-xs text-space-gray-light">{stat.sub}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;