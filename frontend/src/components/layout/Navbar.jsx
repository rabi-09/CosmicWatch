import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, AlertTriangle, User } from 'lucide-react';
import clsx from 'clsx';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo/logo.png';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [alerts, setAlerts] = useState([]);
    const [showAlerts, setShowAlerts] = useState(false);
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/login');
        setIsOpen(false);
    };

    // Fetch alerts when authenticated
    useEffect(() => {
        if (isAuthenticated && user?.token) {
            fetchAlerts();
            // Set up polling interval for real-time-ish updates (every 60s)
            const interval = setInterval(fetchAlerts, 60000);
            return () => clearInterval(interval);
        }
    }, [isAuthenticated, user]);

    const fetchAlerts = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/user/alerts', {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setAlerts(res.data);
        } catch (err) {
            console.error("Failed to fetch alerts", err);
        }
    };

    const markAllRead = async (e) => {
        e.stopPropagation();
        try {
            // Optimistic update
            const updatedAlerts = alerts.map(a => ({ ...a, isRead: true }));
            setAlerts(updatedAlerts);

            // In a real app we'd have a bulk mark-read endpoint, for now we just rely on individual clicks or UI state
            // Or we could loop calls, but that's inefficient. 
            // Let's assume user clicks individually for now or implement bulk later. 
            // Actually, for this hackathon, let's just update local state to clear badge.
        } catch (err) {
            console.error(err);
        }
    };

    const handleAlertClick = async (alert) => {
        try {
            if (!alert.isRead) {
                await axios.put(`http://localhost:5000/api/user/alerts/${alert._id}/read`, {}, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                // Update local state
                setAlerts(prev => prev.map(a => a._id === alert._id ? { ...a, isRead: true } : a));
            }
            setShowAlerts(false);
            if (alert.asteroidId) {
                navigate(`/asteroid/${alert.asteroidId._id || alert.asteroidId}`);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Dashboard', path: '/dashboard' },
        // { name: 'Community Chat', path: '/community' },
        { name: 'About', path: '/about' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={clsx(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent',
                scrolled ? 'bg-space-void/80 backdrop-blur-md border-white/10 py-3' : 'bg-transparent py-5'
            )}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group cursor-pointer">
                    <img
                        src={logo}
                        alt="CosmicWatch Logo"
                        className="h-[100px] w-[100px] object-contain"
                    />
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="relative text-space-highlight hover:text-space-accent font-sans text-sm tracking-wide transition-colors group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-space-accent transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className="hidden md:flex items-center gap-4 relative">
                    <button
                        className="text-space-highlight hover:text-space-warning transition-colors relative"
                        title="Alerts"
                        onClick={() => setShowAlerts(!showAlerts)}
                    >
                        <AlertTriangle size={20} />
                        {alerts.filter(a => !a.isRead).length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                {alerts.filter(a => !a.isRead).length}
                            </span>
                        )}
                    </button>

                    {/* Alert Dropdown */}
                    <AnimatePresence>
                        {showAlerts && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute top-10 right-0 w-80 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 max-h-96 overflow-y-auto"
                            >
                                <div className="p-4 border-b border-white/10 flex justify-between items-center">
                                    <h3 className="font-bold text-space-highlight text-sm">NOTIFICATIONS</h3>
                                    {alerts.some(a => !a.isRead) && (
                                        <button
                                            onClick={markAllRead}
                                            className="text-xs text-blue-400 hover:text-blue-300"
                                        >
                                            Mark all read
                                        </button>
                                    )}
                                </div>

                                {alerts.length === 0 ? (
                                    <div className="p-8 text-center text-gray-500 text-sm">
                                        No new alerts
                                    </div>
                                ) : (
                                    <div className="flex flex-col">
                                        {alerts.map(alert => (
                                            <div
                                                key={alert._id}
                                                className={`p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors ${!alert.isRead ? 'bg-white/5 border-l-2 border-l-red-500' : ''}`}
                                                onClick={() => handleAlertClick(alert)}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <AlertTriangle className={`w-4 h-4 mt-1 ${alert.alertType === 'RISK_INCREASE' ? 'text-red-500' : 'text-yellow-500'}`} />
                                                    <div>
                                                        <p className={`text-sm ${!alert.isRead ? 'text-white font-medium' : 'text-gray-400'}`}>
                                                            {alert.message}
                                                        </p>
                                                        <span className="text-xs text-gray-600 mt-1 block">
                                                            {new Date(alert.createdAt).toLocaleString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {isAuthenticated ? (
                        <div className="flex items-center gap-4">
                            <span className="text-space-highlight text-sm">
                                {user?.name}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 border border-red-500/50 rounded hover:bg-red-500/10 transition-all text-red-400 font-display text-sm uppercase tracking-wider"
                            >
                                <span>Logout</span>
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="flex items-center gap-2 px-4 py-2 border border-space-accent/50 rounded hover:bg-space-accent/10 transition-all text-space-accent font-display text-sm uppercase tracking-wider">
                            <User size={16} />
                            <span>Login</span>
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-space-highlight"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-space-void/95 backdrop-blur-xl border-t border-white/5 overflow-hidden"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="text-lg font-display text-space-highlight hover:text-space-accent"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="h-[1px] bg-white/10 my-2" />
                            <button className="flex items-center gap-2 text-space-warning">
                                <AlertTriangle size={18} /> Alerts
                            </button>
                            {isAuthenticated ? (
                                <>
                                    <span className="text-space-accent font-display text-lg uppercase tracking-wider px-2">
                                        {user?.name || 'User'}
                                    </span>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-2 text-red-400 font-display text-lg uppercase tracking-wider text-left"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <Link
                                    to="/login"
                                    className="flex items-center gap-2 text-space-accent font-display text-lg uppercase tracking-wider"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </motion.nav>
    );
};

export default Navbar;
