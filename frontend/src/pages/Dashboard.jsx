import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Eye, AlertTriangle, Activity } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import axios from "axios";

const Dashboard = () => {
    const [asteroids, setAsteroids] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchAsteroids();
    }, []);

    const fetchAsteroids = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/asteroids?limit=100");
            if (response.data && response.data.asteroids) {
                setAsteroids(response.data.asteroids);
            }
        } catch (error) {
            console.error("Error fetching asteroids:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredAsteroids = asteroids.filter((asteroid) =>
        asteroid.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-space-black text-white font-sans selection:bg-space-accent selection:text-space-black">
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-space-black to-space-black -z-10" />

            <Navbar />

            <main className="container mx-auto px-6 pt-24 pb-12">
                {/* HERO SECTION */}
                <section className="text-center mb-16 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-space-accent/20 blur-[100px] -z-10 rounded-full" />

                    {/* <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-space-highlight to-space-accent/50 mb-6 tracking-tight drop-shadow-2xl"
                    >
                        ASTEROID MONITOR
                    </motion.h1> */}

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-space-highlight/60 max-w-2xl mx-auto mb-10 font-light"
                    >
                        Real-time tracking and risk analysis of Near-Earth Objects.
                        Monitor potential threats and analyze trajectory data.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative max-w-2xl mx-auto group"
                    >
                        <div className="absolute inset-0 bg-space-accent/20 rounded-full blur opacity-25 group-hover:opacity-40 transition-opacity" />
                        <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-full p-2 flex items-center">
                            <Search className="w-6 h-6 text-space-accent ml-4" />
                            <input
                                type="text"
                                placeholder="Search asteroid by name (e.g., Apophis)..."
                                className="w-full bg-transparent border-none text-white placeholder-space-highlight/40 focus:ring-0 px-4 py-2 outline-none text-lg"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button
                                className="bg-space-accent hover:bg-white text-space-black px-8 py-3 rounded-full font-display font-bold transition-all transform hover:scale-105 shadow-lg shadow-space-accent/25"
                            >
                                Search
                            </button>
                        </div>
                    </motion.div>
                </section>

                {/* DATA TABLE SECTION */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
                >
                    <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <Activity className="text-space-accent" />
                            Active Near-Earth Objects
                        </h2>
                        <span className="text-sm text-space-accent/60 px-3 py-1 rounded-full bg-space-accent/10 border border-space-accent/20">
                            {filteredAsteroids.length} Objects Found
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white/5 text-space-highlight/60 text-sm uppercase tracking-wider">
                                    <th className="p-6 font-medium">Name</th>
                                    <th className="p-6 font-medium">Est. Diameter (Max)</th>
                                    <th className="p-6 font-medium">Abs. Magnitude (H)</th>
                                    <th className="p-6 font-medium">Miss Distance (Earth)</th>
                                    <th className="p-6 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="p-12 text-center text-space-highlight/40">
                                            <div className="animate-spin w-8 h-8 border-2 border-current border-t-transparent rounded-full mx-auto mb-4" />
                                            Scanning Deep Space Network...
                                        </td>
                                    </tr>
                                ) : filteredAsteroids.length > 0 ? (
                                    filteredAsteroids.map((asteroid) => (
                                        <tr
                                            key={asteroid._id}
                                            className="hover:bg-white/5 transition-colors group"
                                        >
                                            <td className="p-6 font-mono text-lg text-space-accent group-hover:text-white transition-colors">
                                                {asteroid.name}
                                            </td>
                                            <td className="p-6 text-gray-300">
                                                {asteroid.physical?.diameterKmMax ? `${asteroid.physical.diameterKmMax.toFixed(3)} km` : "N/A"}
                                            </td>
                                            <td className="p-6 text-gray-300">
                                                {asteroid.physical?.absoluteMagnitudeH || "N/A"}
                                            </td>
                                            <td className="p-6 text-gray-300">
                                                {asteroid.orbital?.distanceFromEarthKm ? `${parseFloat(asteroid.orbital.distanceFromEarthKm).toLocaleString()} km` : "N/A"}
                                            </td>
                                            <td className="p-6 text-right">
                                                <Link
                                                    to={`/asteroid/${asteroid._id}`}
                                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-space-accent/10 hover:bg-space-accent/20 border border-space-accent/30 text-space-accent transition-all hover:scale-105 active:scale-95"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                    View Details
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="p-12 text-center text-space-highlight/40">
                                            No asteroids found containing "{searchTerm}".
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </main>
            <Footer />
        </div>
    );
};

export default Dashboard;
