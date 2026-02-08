import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, AlertCircle, Loader2 } from "lucide-react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import SocialAuthButton from "../components/SocialAuthButton";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo/logo.png";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(""); // Clear error on typing
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Basic Validation
        if (!formData.email || !formData.password) {
            setError("ALL FIELDS REQUIRED FOR ACCESS");
            setLoading(false);
            return;
        }

        try {
            const result = await login(formData.email, formData.password);
            if (result.success) {
                navigate("/dashboard");
            } else {
                setError(result.message.toUpperCase());
            }
        } catch (err) {
            setError("SYSTEM ERROR: CONNECTION FAILED");
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

            <div className="min-h-screen w-full flex items-center justify-center p-4">
                <div className="glass-card p-10 rounded-sm w-full max-w-md relative z-10 border-cyan-500/30 shadow-[0_0_30px_rgba(0,243,255,0.1)]">
                    {/* Technical corners */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-500"></div>
                    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-500"></div>
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-500"></div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-500"></div>

                    <div className="text-center mb-10 mt-8">
                        <motion.h1
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-4xl font-bold text-cyan-400 tracking-widest font-mono"
                        >
                            SYSTEM ACCESS
                        </motion.h1>
                        <motion.p
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 0.7 }}
                            transition={{ delay: 0.3 }}
                            className="text-cyan-200/60 text-xs mt-2 tracking-[0.3em] uppercase"
                        >
                            Authorization Required
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

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="relative group"
                        >
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-500/50 w-5 h-5 group-focus-within:text-cyan-400 transition-colors" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="tech-input w-full py-4 pl-12 pr-4 rounded-none focus:outline-none text-sm tracking-wide"
                                disabled={loading}
                            />
                            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-500 group-focus-within:w-full transition-all duration-300"></div>
                        </motion.div>

                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="relative group"
                        >
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-500/50 w-5 h-5 group-focus-within:text-cyan-400 transition-colors" />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="tech-input w-full py-4 pl-12 pr-4 rounded-none focus:outline-none text-sm tracking-wide"
                                disabled={loading}
                            />
                            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-500 group-focus-within:w-full transition-all duration-300"></div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.55 }}
                            className="flex justify-end"
                        >
                            <Link
                                to="/forgot-password"
                                className="text-cyan-500/60 text-xs font-mono hover:text-cyan-400 transition-colors hover:underline decoration-cyan-500/30 underline-offset-4 tracking-wider"
                            >
                                LOST PASSWORD?
                            </Link>
                        </motion.div>

                        <motion.button
                            whileHover={{ scale: 1.02, letterSpacing: "4px" }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            disabled={loading}
                            className="tech-button w-full py-4 rounded-none font-bold flex items-center justify-center gap-2 mt-8 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <LogIn className="w-5 h-5" />}
                            {loading ? "AUTHENTICATING..." : "ACCESS SYSTEM"}
                        </motion.button>

                        <div className="relative flex items-center justify-center my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-cyan-500/20"></div>
                            </div>
                            <span className="relative bg-black px-2 text-cyan-500/40 text-[10px] tracking-widest font-mono uppercase">
                                OR ACCESS WITH
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
                        transition={{ delay: 0.7 }}
                        className="mt-8 text-center"
                    >
                        <p className="text-cyan-500/40 text-xs font-mono">
                            NO CLEARANCE?{" "}
                            <Link to="/signup" className="text-cyan-400 hover:text-cyan-300 transition-colors underline decoration-cyan-500/30 hover:decoration-cyan-400 underline-offset-4">
                                INITIATE REGISTRATION
                            </Link>
                        </p>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default Login;
