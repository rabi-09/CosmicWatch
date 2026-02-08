import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Lock, Rocket, AlertCircle, Loader2 } from "lucide-react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import SocialAuthButton from "../components/SocialAuthButton";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo/logo.png";

const Signup = () => {
    const navigate = useNavigate();
    const { signup } = useAuth();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Validation Logic
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            setError("ALL FIELDS REQUIRED FOR REGISTRATION");
            setLoading(false);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("PasswordS DO NOT MATCH");
            setLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setError("Password TOO WEAK (MIN 6 CHARS)");
            setLoading(false);
            return;
        }

        if (!formData.agreeTerms) {
            setError("MUST AGREE TO MISSION PROTOCOLS");
            setLoading(false);
            return;
        }

        try {
            const result = await signup({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                confirmPassword: formData.confirmPassword
            });

            if (result.success) {
                navigate("/dashboard");
            } else {
                setError(result.message.toUpperCase());
            }
        } catch (err) {
            setError("SYSTEM ERROR: REGISTRATION FAILED");
        } finally {
            setLoading(false);
        }
    };

    const handleSocialLogin = (provider) => {
        // Redirect to backend auth endpoint
        window.location.href = `http://localhost:5000/api/auth/${provider}`;
    };

    return (
        <>

            <div className="fixed top-0 left-0 w-full z-50 py-6 px-6">
                <div className="max-w-7xl mx-auto">
                    <Link to="/" className="flex items-center gap-2 group cursor-pointer w-fit">
                        <img
                            src={logo}
                            alt="CosmicWatch Logo"
                            className="h-[100px] w-[100px] object-contain"
                        />
                    </Link>
                </div>
            </div>

            <div className="min-h-screen w-full flex items-center justify-center p-4 pt-20">
                <div className="glass-card p-10 rounded-sm w-full max-w-md relative z-10 border-cyan-500/30 shadow-[0_0_30px_rgba(0,243,255,0.1)]">
                    {/* Technical corners */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-500"></div>
                    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-500"></div>
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-500"></div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-500"></div>

                    <div className="text-center mb-8 mt-8">
                        <motion.h1
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-2xl font-bold text-cyan-400 tracking-widest font-mono"
                        >
                            MISSION REGISTRATION
                        </motion.h1>
                        <motion.p
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 0.7 }}
                            transition={{ delay: 0.3 }}
                            className="text-cyan-200/60 text-xs mt-2 tracking-[0.3em] uppercase"
                        >
                            Initialize Operator Profile
                        </motion.p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 p-3 bg-red-500/10 border border-red-500/50 text-red-400 text-xs font-mono flex items-center justify-center gap-2"
                        >
                            <AlertCircle className="w-4 h-4" />
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="relative group"
                        >
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-500/50 w-5 h-5 group-focus-within:text-cyan-400 transition-colors" />
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                className="tech-input w-full py-3 pl-10 pr-4 rounded-none focus:outline-none text-sm tracking-wide"
                                disabled={loading}
                            />
                            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-500 group-focus-within:w-full transition-all duration-300"></div>
                        </motion.div>

                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="relative group"
                        >
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-500/50 w-5 h-5 group-focus-within:text-cyan-400 transition-colors" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="tech-input w-full py-3 pl-10 pr-4 rounded-none focus:outline-none text-sm tracking-wide"
                                disabled={loading}
                            />
                            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-500 group-focus-within:w-full transition-all duration-300"></div>
                        </motion.div>

                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="relative group"
                        >
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-500/50 w-5 h-5 group-focus-within:text-cyan-400 transition-colors" />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Create a password"
                                className="tech-input w-full py-3 pl-10 pr-4 rounded-none focus:outline-none text-sm tracking-wide"
                                disabled={loading}
                            />
                            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-500 group-focus-within:w-full transition-all duration-300"></div>
                        </motion.div>

                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="relative group"
                        >
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-500/50 w-5 h-5 group-focus-within:text-cyan-400 transition-colors" />
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                                className="tech-input w-full py-3 pl-10 pr-4 rounded-none focus:outline-none text-sm tracking-wide"
                                disabled={loading}
                            />
                            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-500 group-focus-within:w-full transition-all duration-300"></div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9 }}
                            className="flex items-center gap-2"
                        >
                            <input
                                type="checkbox"
                                id="terms"
                                name="agreeTerms"
                                checked={formData.agreeTerms}
                                onChange={handleChange}
                                className="w-4 h-4 rounded border-cyan-800 bg-black/50 text-cyan-400 focus:ring-cyan-500/50 accent-cyan-500"
                            />
                            <label htmlFor="terms" className="text-xs text-cyan-200/60 font-mono cursor-pointer select-none">
                                I AGREE TO <span className="text-cyan-400">MISSION PROTOCOLS</span>
                            </label>
                        </motion.div>

                        <motion.button
                            whileHover={{ scale: 1.02, letterSpacing: "2px" }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1 }}
                            disabled={loading}
                            className="tech-button w-full py-3 rounded-none font-bold flex items-center justify-center gap-2 mt-4 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Rocket className="w-4 h-4" />}
                            {loading ? "INITIALIZING..." : "JOIN THE MISSION"}
                        </motion.button>

                        <div className="relative flex items-center justify-center my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-cyan-500/20"></div>
                            </div>
                            <span className="relative bg-black px-2 text-cyan-500/40 text-[10px] tracking-widest font-mono uppercase">
                                OR REGISTER WITH
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <SocialAuthButton
                                icon={FaGoogle}
                                label="GOOGLE"
                                onClick={() => handleSocialLogin("google")}
                            />
                            <SocialAuthButton
                                icon={FaGithub}
                                label="GITHUB"
                                onClick={() => handleSocialLogin("github")}
                            />
                        </div>
                    </form>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1 }}
                        className="mt-6 text-center"
                    >
                        <p className="text-cyan-500/40 text-xs font-mono">
                            ALREADY A COMMANDER?{" "}
                            <Link to="/login" className="text-cyan-400 hover:text-cyan-300 transition-colors underline decoration-cyan-500/30 hover:decoration-cyan-400 underline-offset-4">
                                ACCESS SYSTEM
                            </Link>
                        </p>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default Signup;
