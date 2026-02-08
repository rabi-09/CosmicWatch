import React from 'react';

const SolarSystem = () => {
    const planets = [
        { name: "Mercury", color: "bg-gray-400", size: 12, distance: 58 },
        { name: "Venus", color: "bg-yellow-300", size: 16, distance: 108 },
        { name: "Earth", color: "bg-blue-500", size: 18, distance: 150, special: true },
        { name: "Mars", color: "bg-red-500", size: 14, distance: 228 },
        { name: "Jupiter", color: "bg-orange-400", size: 30, distance: 778 },
        { name: "Saturn", color: "bg-yellow-200", size: 26, distance: 1427 },
        { name: "Uranus", color: "bg-cyan-300", size: 20, distance: 2871 },
        { name: "Neptune", color: "bg-blue-400", size: 20, distance: 4497 }
    ];

    // NEO markers
    const neos = [
        { distance: 180, angle: 45, risk: "high" },
        { distance: 220, angle: 120, risk: "medium" },
        { distance: 90, angle: 300, risk: "severe" },
        { distance: 250, angle: 200, risk: "low" }
    ];

    return (
        <section className="py-20 px-6 overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-space-accent/10 rounded-full mb-6">
                        <div className="w-2 h-2 bg-space-accent rounded-full animate-pulse"></div>
                        <span className="text-space-accent text-sm font-semibold">SOLAR SYSTEM OVERVIEW</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="text-white">Orbital </span>
                        <span className="text-space-accent">Monitoring</span>
                        <span className="text-white"> Map</span>
                    </h2>
                    <p className="text-space-gray-light text-lg max-w-2xl mx-auto">
                        Real-time visualization of planetary positions and near-Earth object tracking.
                    </p>
                </div>

                <div className="relative h-[500px] md:h-[600px] flex items-center justify-center">
                    {/* Sun */}
                    <div className="absolute w-20 h-20 bg-yellow-500 rounded-full shadow-lg shadow-yellow-500/50 animate-pulse">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"></div>
                    </div>

                    {/* Orbits */}
                    {[100, 160, 220, 280, 340, 400, 460, 520].map((radius, idx) => (
                        <div 
                            key={idx}
                            className="absolute border border-space-border/30 rounded-full"
                            style={{
                                width: `${radius * 2}px`,
                                height: `${radius * 2}px`,
                            }}
                        ></div>
                    ))}

                    {/* Planets */}
                    {planets.map((planet, idx) => {
                        const angle = (idx * 45) % 360;
                        const distance = planet.distance / 10; // Scale down for display
                        
                        return (
                            <div 
                                key={planet.name}
                                className="absolute"
                                style={{
                                    transform: `rotate(${angle}deg) translateX(${distance}px) rotate(-${angle}deg)`,
                                }}
                            >
                                <div className={`${planet.color} rounded-full relative ${planet.special ? 'ring-2 ring-space-accent' : ''}`}
                                     style={{ width: `${planet.size}px`, height: `${planet.size}px` }}>
                                    {planet.special && (
                                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                                            <div className="text-xs text-space-accent font-bold bg-space-black/80 px-2 py-1 rounded">
                                                EARTH
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2">
                                    <div className="text-xs text-space-gray-light whitespace-nowrap">{planet.name}</div>
                                </div>
                            </div>
                        );
                    })}

                    {/* NEO Markers */}
                    {neos.map((neo, idx) => (
                        <div 
                            key={idx}
                            className="absolute"
                            style={{
                                transform: `rotate(${neo.angle}deg) translateX(${neo.distance}px) rotate(-${neo.angle}deg)`,
                            }}
                        >
                            <div className={`w-4 h-4 rounded-full ${
                                neo.risk === 'severe' ? 'bg-red-500 animate-pulse' :
                                neo.risk === 'high' ? 'bg-orange-500' :
                                neo.risk === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                            }`}>
                                <div className="absolute -inset-1 animate-ping rounded-full bg-current opacity-20"></div>
                            </div>
                        </div>
                    ))}

                    {/* Earth orbit highlight */}
                    <div className="absolute border-2 border-space-accent/50 rounded-full"
                         style={{ width: '440px', height: '440px' }}>
                    </div>
                </div>

                {/* Legend */}
                <div className="mt-12">
                    <div className="bg-space-card/30 backdrop-blur-sm border border-space-border rounded-xl p-6 max-w-3xl mx-auto">
                        <h3 className="text-xl font-bold mb-4 text-white text-center">LEGEND</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                                <span className="text-space-gray-light">Planets</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 bg-space-accent rounded-full"></div>
                                <span className="text-space-gray-light">Earth (Monitored)</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                                <span className="text-space-gray-light">High Risk NEO</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-20 h-20 bg-yellow-500 rounded-full"></div>
                                <span className="text-space-gray-light">Sun</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SolarSystem;