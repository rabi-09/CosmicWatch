import { useState, useEffect, useRef, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Html } from "@react-three/drei";
import { motion } from "framer-motion";
import axios from "axios";
import { AlertTriangle, ShieldCheck, Activity, Globe, Ruler, MapPin, Zap } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

// --- 3D Components ---

function Sun() {
    return (
        <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[2, 32, 32]} />
            <meshStandardMaterial emissive="#fbbf24" emissiveIntensity={2} color="#fbbf24" />
            <pointLight distance={100} intensity={2} color="#fbbf24" />
        </mesh>
    );
}

function Earth() {
    const earthRef = useRef();
    // Earth orbit radius ~10 units
    useFrame(({ clock }) => {
        const t = clock.getElapsedTime() * 0.1;
        earthRef.current.position.x = Math.sin(t) * 10;
        earthRef.current.position.z = Math.cos(t) * 10;
        earthRef.current.rotation.y += 0.01;
    });

    return (
        <mesh ref={earthRef}>
            <sphereGeometry args={[0.8, 32, 32]} />
            <meshStandardMaterial color="#3b82f6" roughness={0.7} metalness={0.1} />
        </mesh>
    );
}

function Asteroid3D({ asteroidData }) {
    const asteroidRef = useRef();
    // Simulate orbit based on distance (simplified)
    // We'll put it at a varied distance or use orbital params if available
    // Here we just orbit it at a different speed/radius

    const distance = useMemo(() => {
        // Scale down distance for view
        // Real distance is in millions of km. 1 AU ~ 150M km.
        // 10 units = 1 AU.
        const distKm = asteroidData?.orbital?.distanceFromEarthKm || 5000000; // default 5M km
        // simple log scale or division mapping
        return 10 + (Math.log(distKm) / Math.log(10));
    }, [asteroidData]);

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime() * 0.15; // slightly faster/slower
        // Elliptical orbit simulation
        asteroidRef.current.position.x = Math.sin(t + 2) * distance;
        asteroidRef.current.position.z = Math.cos(t + 2) * (distance * 0.8);
        asteroidRef.current.rotation.x += 0.01;
        asteroidRef.current.rotation.y += 0.02;
    });

    return (
        <mesh ref={asteroidRef}>
            <dodecahedronGeometry args={[0.4, 0]} />
            <meshStandardMaterial color="#a1a1aa" roughness={0.8} />
            <Html distanceFactor={10}>
                <div className="bg-black/80 text-white text-xs px-2 py-1 rounded border border-white/20 whitespace-nowrap">
                    {asteroidData?.name || "Asteroid"}
                </div>
            </Html>
        </mesh>
    );
}

function OrbitPath({ radius }) {
    return (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[radius, 0.05, 16, 100]} />
            <meshBasicMaterial color="#ffffff" opacity={0.5} transparent />
        </mesh>
    )
}

// --- Main Page Component ---

const Asteroid = () => {
    const { id } = useParams();
    const [asteroid, setAsteroid] = useState(null);
    const [riskData, setRiskData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [analyzing, setAnalyzing] = useState(false);
    const [ctrlPressed, setCtrlPressed] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Control") setCtrlPressed(true);
        };
        const handleKeyUp = (e) => {
            if (e.key === "Control") setCtrlPressed(false);
        };
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = async () => {
        try {
            const asteroidRes = await axios.get(`http://localhost:5000/api/asteroids/${id}`);
            setAsteroid(asteroidRes.data);

            // Try to fetch existing risk analysis
            try {
                const riskRes = await axios.get(`http://localhost:5000/api/asteroids/${id}/risk`);
                if (riskRes.data) setRiskData(riskRes.data);
            } catch (err) {
                // Ignore 404
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleRunAnalysis = async () => {
        setAnalyzing(true);
        try {
            const response = await axios.post(`http://localhost:5000/api/asteroids/${id}/analyze`);
            setRiskData(response.data);
        } catch (error) {
            console.error("Error running analysis:", error);
        } finally {
            setAnalyzing(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#030014] text-white flex items-center justify-center">
                <div className="animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full" />
            </div>
        );
    }

    if (!asteroid) {
        return (
            <div className="min-h-screen bg-[#030014] text-white flex items-center justify-center">
                <h1 className="text-2xl">Asteroid Not Found</h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#030014] text-white flex flex-col font-sans">
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/40 via-[#030014] to-[#030014] -z-10" />
            <Navbar />

            <main className="container mx-auto px-6 pt-24 pb-12 flex-grow">

                {/* HERO SECTION */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-4 tracking-tighter uppercase">
                        {asteroid.name}
                    </h1>
                    <p className="text-xl text-blue-200/60 font-mono">
                        NASA ID: {asteroid.nasaId}
                    </p>
                </div>

                {/* DATA GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

                    {/* Physical Properties */}
                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                        <h3 className="text-xl font-bold flex items-center gap-2 mb-4 text-purple-300">
                            <Ruler className="w-5 h-5" />
                            Physical Data
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-white/5">
                                <span className="text-gray-400">Diameter (Min)</span>
                                <span className="font-mono text-lg">{asteroid.physical?.diameterKmMin?.toFixed(3)} km</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-white/5">
                                <span className="text-gray-400">Diameter (Max)</span>
                                <span className="font-mono text-lg">{asteroid.physical?.diameterKmMax?.toFixed(3)} km</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-white/5">
                                <span className="text-gray-400">Abs Magnitude (H)</span>
                                <span className="font-mono text-lg">{asteroid.physical?.absoluteMagnitudeH || asteroid.physical?.absoluteMagnitude || "N/A"}</span>
                            </div>
                        </div>
                    </div>

                    {/* Orbital Data */}
                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                        <h3 className="text-xl font-bold flex items-center gap-2 mb-4 text-blue-300">
                            <Globe className="w-5 h-5" />
                            Orbital Data
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-white/5">
                                <span className="text-gray-400">Velocity (Rel)</span>
                                <span className="font-mono text-lg">{asteroid.orbital?.velocityKps?.toFixed(2)} km/s</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-white/5">
                                <span className="text-gray-400">Distance (Earth)</span>
                                <span className="font-mono text-lg">{parseFloat(asteroid.orbital?.distanceFromEarthKm)?.toLocaleString()} km</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-white/5">
                                <span className="text-gray-400">Orbiting Body</span>
                                <span className="font-mono text-lg">{asteroid.orbital?.orbitingBody || "Earth"}</span>
                            </div>
                        </div>
                    </div>

                    {/* Hazard Status */}
                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                        <h3 className="text-xl font-bold flex items-center gap-2 mb-4 text-red-300">
                            <AlertTriangle className="w-5 h-5" />
                            Hazard Status
                        </h3>
                        <div className="flex flex-col items-center justify-center h-[180px]">
                            {riskData ? (
                                <>
                                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${riskData.riskLevel === 'EXTREME' || riskData.riskLevel === 'HIGH' ? 'bg-red-500/20 text-red-500 animate-pulse' :
                                        riskData.riskLevel === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-500' :
                                            'bg-emerald-500/20 text-emerald-500'
                                        }`}>
                                        <AlertTriangle className="w-10 h-10" />
                                    </div>
                                    <span className={`text-2xl font-bold uppercase ${riskData.riskLevel === 'EXTREME' || riskData.riskLevel === 'HIGH' ? 'text-red-500' :
                                        riskData.riskLevel === 'MEDIUM' ? 'text-yellow-400' :
                                            'text-emerald-500'
                                        }`}>
                                        {riskData.riskLevel}
                                    </span>
                                    <span className="text-sm text-blue-300/60 mt-2">AI Assessed Risk Level</span>
                                </>
                            ) : asteroid.hazard?.isPotentiallyHazardous ? (
                                <>
                                    <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mb-4 animate-pulse">
                                        <AlertTriangle className="w-10 h-10 text-red-500" />
                                    </div>
                                    <span className="text-2xl font-bold text-red-500">HAZARDOUS</span>
                                    <span className="text-sm text-red-300/60 mt-2">Potentially dangerous orbit</span>
                                </>
                            ) : (
                                <>
                                    <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                                        <ShieldCheck className="w-10 h-10 text-emerald-500" />
                                    </div>
                                    <span className="text-2xl font-bold text-emerald-500">SAFE</span>
                                    <span className="text-sm text-emerald-300/60 mt-2">No immediate threat detected</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* CLOSE APPROACH DATA */}
                {asteroid.closeApproachData && asteroid.closeApproachData.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            <MapPin className="text-pink-400" />
                            Close Approach Data
                        </h2>
                        <div className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-white/5 text-purple-200/60 text-sm uppercase tracking-wider">
                                            <th className="p-4 font-medium">Date</th>
                                            <th className="p-4 font-medium">Miss Distance (km)</th>
                                            <th className="p-4 font-medium">Relative Velocity (km/s)</th>
                                            <th className="p-4 font-medium">Orbiting Body</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {asteroid.closeApproachData.map((data, index) => (
                                            <tr key={index} className="hover:bg-white/5 transition-colors">
                                                <td className="p-4 font-mono">{data.closeApproachDate}</td>
                                                <td className="p-4 font-mono">{parseFloat(data.missDistance?.kilometers).toLocaleString()}</td>
                                                <td className="p-4 font-mono">{parseFloat(data.relativeVelocity?.kilometersPerSecond).toFixed(2)}</td>
                                                <td className="p-4 font-mono">{data.orbitingBody}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                )}

                {/* TRAJECTORY 3D VIEW */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <Activity className="text-purple-400" />
                        Orbital Trajectory
                    </h2>
                    <div className="h-[500px] w-full bg-black/40 rounded-3xl overflow-hidden border border-white/10 relative">
                        <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur px-4 py-2 rounded-lg text-xs font-mono text-blue-200">
                            <div>Blue: Earth</div>
                            <div>Yellow: Sun</div>
                            <div>Grey: {asteroid.name}</div>
                            <div className="mt-1 text-gray-400">Scale: Not to scale</div>
                            <div className="mt-2 text-white/50 border-t border-white/10 pt-1">
                                Hold <kbd className="bg-white/10 px-1 rounded">Ctrl</kbd> + Scroll to Zoom
                            </div>
                        </div>
                        <Canvas camera={{ position: [0, 20, 25], fov: 45 }}>
                            <OrbitControls
                                enableZoom={ctrlPressed}
                                autoRotate={false}
                                enablePan={true}
                            />
                            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
                            <ambientLight intensity={0.5} />
                            <pointLight position={[10, 10, 10]} />

                            <Sun />
                            <OrbitPath radius={10} />
                            <Earth />

                            <Asteroid3D asteroidData={asteroid} />
                        </Canvas>
                    </div>
                </section>



                {/* RISK ANALYSIS SECTION */}
                <section className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-3xl font-bold flex items-center gap-3">
                            <Zap className="text-yellow-400" />
                            AI Risk Analysis
                        </h2>
                        {!riskData && !analyzing && (
                            <button
                                onClick={handleRunAnalysis}
                                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-6 py-2 rounded-full font-bold shadow-lg shadow-purple-500/25 transition-all active:scale-95"
                            >
                                RUN SIMULATION
                            </button>
                        )}
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 min-h-[300px]">
                        {analyzing ? (
                            <div className="text-center py-12">
                                <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4" />
                                <p className="text-purple-300 font-mono animate-pulse">Running Monte Carlo Simulations & ML Analysis...</p>
                            </div>
                        ) : riskData ? (
                            <div className="w-full">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                                    {/* Risk Level Main Display */}
                                    <div className="flex flex-col items-center justify-center p-6 bg-white/5 rounded-2xl border border-white/5">
                                        <div className={`relative w-48 h-48 flex items-center justify-center rounded-full border-8 mb-4 ${riskData.riskLevel === 'HIGH' || riskData.riskLevel === 'EXTREME' ? 'border-red-500 text-red-500 shadow-[0_0_50px_rgba(239,68,68,0.3)]' :
                                            riskData.riskLevel === 'MEDIUM' ? 'border-yellow-500 text-yellow-500 shadow-[0_0_50px_rgba(234,179,8,0.3)]' :
                                                'border-green-500 text-green-500 shadow-[0_0_50px_rgba(34,197,94,0.3)]'
                                            }`}>
                                            <div className="text-center z-10">
                                                <h3 className="text-4xl font-black tracking-tighter">{riskData.riskLevel}</h3>
                                                <span className="text-xs uppercase tracking-widest opacity-70">Risk Level</span>
                                            </div>
                                            {/* Pulse Effect */}
                                            <div className={`absolute inset-0 rounded-full animate-ping opacity-20 ${riskData.riskLevel === 'HIGH' ? 'bg-red-500' : 'bg-transparent'}`} />
                                        </div>

                                    </div>

                                    {/* Probabilities */}
                                    <div className="flex flex-col justify-center space-y-6 p-6 bg-white/5 rounded-2xl border border-white/5">
                                        <h4 className="text-xl font-bold flex items-center gap-2">
                                            <Activity className="w-5 h-5 text-blue-400" />
                                            ML Confidence Scores
                                        </h4>
                                        <div className="space-y-4">
                                            {[
                                                { label: 'Low Risk', key: 'LOW', color: 'green' },
                                                { label: 'Medium Risk', key: 'MEDIUM', color: 'yellow' },
                                                { label: 'High Risk', key: 'HIGH', color: 'red' }
                                            ].map((item) => {
                                                const prob = riskData.probabilities?.[item.key] ?? riskData.probabilities?.[item.key.toLowerCase()] ?? 0;
                                                const percentage = (prob * 100).toFixed(1);

                                                return (
                                                    <div key={item.key}>
                                                        <div className="flex justify-between mb-1">
                                                            <span className="text-sm font-medium text-gray-400">{item.label} Probability</span>
                                                            <span className={`text-sm font-mono text-${item.color}-400`}>{percentage}%</span>
                                                        </div>
                                                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${percentage}%` }}
                                                                className={`h-full bg-${item.color}-${item.color === 'red' ? '600' : '500'}`}
                                                                transition={{ duration: 0.8, delay: 0.1 }}
                                                            />
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/* Explanation Cards */}
                                {riskData.explanation && (
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                        <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                                            <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">Diameter Assessment</div>
                                            <div className="text-white font-medium flex items-center gap-2">
                                                <Ruler className="w-4 h-4 text-purple-400" />
                                                {riskData.explanation.diameter || "N/A"}
                                            </div>
                                        </div>
                                        <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                                            <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">Proximity Assessment</div>
                                            <div className="text-white font-medium flex items-center gap-2">
                                                <MapPin className="w-4 h-4 text-blue-400" />
                                                {riskData.explanation.miss_distance || "N/A"}
                                            </div>
                                        </div>
                                        <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                                            <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">Hazard Flag</div>
                                            <div className="text-white font-medium flex items-center gap-2">
                                                <AlertTriangle className={`w-4 h-4 ${riskData.explanation.pha ? 'text-red-500' : 'text-green-500'}`} />
                                                {riskData.explanation.pha ? "Potential Hazard" : "No Flag"}
                                            </div>
                                        </div>
                                    </div>
                                )}


                            </div>
                        ) : (
                            <div className="text-center text-gray-500 py-12">
                                <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                <p>No risk analysis data available. Run the simulation to analyze.</p>
                            </div>
                        )}
                    </div>
                </section>

            </main>

            <Footer />
        </div >
    );
};

export default Asteroid;
