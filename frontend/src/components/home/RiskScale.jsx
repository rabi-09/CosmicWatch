import React from 'react';

const RiskScale = () => {
    const riskLevels = [
        { level: "LOW", color: "bg-green-500", desc: "Minimal threat", width: "25%" },
        { level: "MODERATE", color: "bg-yellow-500", desc: "Monitor closely", width: "25%" },
        { level: "HIGH", color: "bg-orange-500", desc: "Elevated risk", width: "25%" },
        { level: "SEVERE", color: "bg-red-500", desc: "Immediate action", width: "25%" }
    ];

    const currentObjects = [
        { name: "2024 AB3", distance: "1.2 LD", size: "45m", risk: "HIGH", color: "border-orange-500" },
        { name: "2024 CL2", distance: "3.8 LD", size: "120m", risk: "MODERATE", color: "border-yellow-500" },
        { name: "2024 BD1", distance: "0.8 LD", size: "18m", risk: "SEVERE", color: "border-red-500" },
        { name: "2024 AE2", distance: "5.2 LD", size: "65m", risk: "LOW", color: "border-green-500" }
    ];

    return (
        <section className="py-20 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-space-accent/10 rounded-full mb-6">
                        <div className="w-2 h-2 bg-space-accent rounded-full animate-pulse"></div>
                        <span className="text-space-accent text-sm font-semibold">RISK ASSESSMENT</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="text-white">Cosmic Threat </span>
                        <span className="text-space-accent">Scale</span>
                    </h2>
                    <p className="text-space-gray-light text-lg max-w-2xl mx-auto">
                        Real-time classification of near-Earth objects based on trajectory, size, and impact probability.
                    </p>
                </div>

                <div className="bg-space-card/30 backdrop-blur-sm border border-space-border rounded-2xl p-8 mb-12">
                    <div className="mb-6">
                        <div className="flex justify-between mb-2">
                            <span className="text-sm text-space-gray-light">RISK LEVEL METER</span>
                            <span className="text-sm text-white font-semibold">CURRENT: MEDIUM</span>
                        </div>
                        
                        {/* Risk scale bar */}
                        <div className="h-4 bg-space-card rounded-full overflow-hidden">
                            <div className="flex h-full">
                                {riskLevels.map((risk, idx) => (
                                    <div 
                                        key={idx}
                                        className={`h-full ${risk.color} transition-all duration-300 hover:opacity-90`}
                                        style={{ width: risk.width }}
                                        title={`${risk.level}: ${risk.desc}`}
                                    >
                                        <div className="h-full w-full relative">
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className="text-xs font-bold text-black opacity-0 hover:opacity-100 transition-opacity">
                                                    {risk.level}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="flex justify-between mt-3">
                            {riskLevels.map((risk, idx) => (
                                <div key={idx} className="text-center">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-3 h-3 ${risk.color.replace('bg-', 'bg-')} rounded-full`}></div>
                                        <span className="text-sm font-medium text-white">{risk.level}</span>
                                    </div>
                                    <div className="text-xs text-space-gray-light mt-1">{risk.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mt-10">
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-white">Risk Factors</h3>
                            <ul className="space-y-3">
                                {[
                                    "Orbital intersection with Earth",
                                    "Object size (≥50m)",
                                    "Velocity (>20 km/s)",
                                    "Detection uncertainty",
                                    "Time to potential impact"
                                ].map((factor, idx) => (
                                    <li key={idx} className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-space-accent rounded-full"></div>
                                        <span className="text-space-gray-light">{factor}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-white">Current Monitoring</h3>
                            <div className="space-y-4">
                                {currentObjects.map((obj, idx) => (
                                    <div key={idx} className={`border-l-4 ${obj.color} bg-space-card/50 p-4 rounded-r-lg`}>
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <div className="font-bold text-white">{obj.name}</div>
                                                <div className="text-sm text-space-gray-light">{obj.size} diameter</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold text-white">{obj.distance}</div>
                                                <div className={`text-sm font-semibold ${
                                                    obj.risk === 'SEVERE' ? 'text-red-400' :
                                                    obj.risk === 'HIGH' ? 'text-orange-400' :
                                                    obj.risk === 'MODERATE' ? 'text-yellow-400' : 'text-green-400'
                                                }`}>
                                                    {obj.risk}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-space-card/50 border border-space-accent/30 rounded-full">
                        <div className="w-2 h-2 bg-space-accent rounded-full animate-pulse"></div>
                        <span className="text-space-gray-light">
                            Last risk assessment update: <span className="text-white font-semibold">15 minutes ago</span>
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RiskScale;