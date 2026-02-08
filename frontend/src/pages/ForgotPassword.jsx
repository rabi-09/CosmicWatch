import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, Loader2, CheckCircle } from "lucide-react";
import AuthLayout from "../components/AuthLayout";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("idle"); // idle, loading, success, error
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        setStatus("loading");

        if (!email) {
            setError("COMM LINK REQUIRED");
            setStatus("error");
            return;
        }

        // Simulate Network Request
        setTimeout(() => {
            // Mock validation
            if (email.includes("@")) {
                setStatus("success");
            } else {
                setError("INVALID COMM LINK FORMAT");
                setStatus("error");
            }
        }, 2000);
    };

    return (
        <AuthLayout>
            {/* Orbital Rings */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="w-[120%] h-[120%] border border-cyan-500/10 rounded-full animate-spin-slow"></div>
                <div className="absolute w-[110%] h-[110%] border border-cyan-500/20 rounded-full animate-spin-reverse border-dashed"></div>
            </div>

            <div className="glass-card p-10 rounded-sm w-full relative z-10 border-cyan-500/30 shadow-[0_0_30px_rgba(0,243,255,0.1)]">
                {/* Technical corners */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-500"></div>
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-500"></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-500"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-500"></div>

                <div className="text-center mb-10">
                    <motion.h1
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-3xl font-bold text-cyan-400 tracking-widest font-mono"
                    >
                        RECOVERY
                    </motion.h1>
                    <motion.p
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 0.7 }}
                        transition={{ delay: 0.3 }}
                        className="text-cyan-200/60 text-xs mt-2 tracking-[0.3em] uppercase"
                    >
                        Restore Access Link
                    </motion.p>
                </div>

                {status === "success" ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-8"
                    >
                        <div className="flex justify-center mb-4">
                            <CheckCircle className="w-12 h-12 text-green-400" />
                        </div>
                        <h3 className="text-xl text-white font-mono mb-2">TRANSMISSION SENT</h3>
                        <p className="text-cyan-200/60 text-sm mb-6">
                            Check your comm link for recovery protocols.
                        </p>
                        <Link
                            to="/login"
                            className="tech-button py-3 px-6 text-sm inline-flex items-center gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            RETURN TO ACCESS
                        </Link>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/50 text-red-400 text-xs font-mono text-center">
                                {error}
                            </div>
                        )}

                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="relative group"
                        >
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-500/50 w-5 h-5 group-focus-within:text-cyan-400 transition-colors" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="IDENTITY_KEY (EMAIL)"
                                className="tech-input w-full py-4 pl-12 pr-4 rounded-none focus:outline-none text-sm tracking-widest uppercase"
                                disabled={status === "loading"}
                            />
                            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-500 group-focus-within:w-full transition-all duration-300"></div>
                        </motion.div>

                        <motion.button
                            whileHover={{ scale: 1.02, letterSpacing: "4px" }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            disabled={status === "loading"}
                            className="tech-button w-full py-4 rounded-none font-bold flex items-center justify-center gap-2 mt-8 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {status === "loading" ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                            {status === "loading" ? "TRANSMITTING..." : "INITIATE RECOVERY"}
                        </motion.button>

                        <div className="text-center mt-6">
                            <Link to="/login" className="text-cyan-500/50 hover:text-cyan-400 text-xs font-mono flex items-center justify-center gap-2 transition-colors">
                                <ArrowLeft className="w-3 h-3" />
                                ABORT RECOVERY
                            </Link>
                        </div>
                    </form>
                )}
            </div>
        </AuthLayout>
    );
};

export default ForgotPassword;
