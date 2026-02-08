import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import { Users, Target, Shield, Cpu, Code2, Rocket, Database, Palette, Satellite, Activity, Bell, Globe, LayoutDashboard, MessageSquare, X, Github, Linkedin, Instagram } from "lucide-react";

// Import Team Images
import member1 from "../assets/team/smruti.jpeg";
import member2 from "../assets/team/mrityunjay.jpeg";
import member3 from "../assets/team/rabi.jpeg";
import member4 from "../assets/team/pratik.jpeg";
import Footer from "../components/layout/Footer";

const TeamMemberModal = ({ member, onClose }) => {
    if (!member) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-md"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative w-full max-w-lg bg-[#0a0a12] border border-cyan-500/30 rounded-2xl p-8 shadow-[0_0_50px_rgba(0,180,216,0.15)] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Background Details */}
                <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
                    <Activity className="text-cyan-500 w-24 h-24 rotate-12" />
                </div>

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-cyan-500/50 hover:text-cyan-400 transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="flex flex-col items-center text-center">
                    <div className="w-32 h-32 rounded-full border-2 border-cyan-500/50 p-1 mb-6 relative group">
                        <div className="w-full h-full rounded-full overflow-hidden bg-space-void">
                            <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-cyan-500/20 to-transparent pointer-events-none" />
                    </div>

                    <h2 className="text-2xl font-bold font-display tracking-wide text-white mb-1">
                        {member.name}
                    </h2>
                    <p className="text-cyan-400 font-mono text-sm tracking-wider uppercase mb-6">
                        {member.role}
                    </p>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 w-full text-left">
                        <p className="text-gray-300 text-sm leading-relaxed mb-4">
                            {member.about}
                        </p>
                        <div className="flex items-center gap-2 text-xs font-mono text-cyan-500/70">
                            <Activity className="w-4 h-4" />
                            <span>{member.experience} EXPERIENCE</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        {[
                            { icon: Github, link: member.links.github, label: "GitHub" },
                            { icon: Linkedin, link: member.links.linkedin, label: "LinkedIn" },
                            { icon: Instagram, link: member.links.instagram, label: "Instagram" }
                        ].map((social, idx) => (
                            <a
                                key={idx}
                                href={social.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-cyan-500/10 hover:border-cyan-500/50 text-gray-400 hover:text-cyan-400 transition-all duration-300 group"
                                title={social.label}
                            >
                                <social.icon className="w-5 h-5" />
                            </a>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const TeamMemberCard = ({ name, role, image, delay, onClick }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        whileHover={{ y: -5 }}
        onClick={onClick}
        className="group relative cursor-pointer"
    >
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 to-blue-600/5 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-colors duration-300 h-full flex flex-col items-center text-center">
            {/* Holographic overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Profile Image */}
            <div className="w-32 h-32 rounded-full border-2 border-white/20 mb-4 relative overflow-hidden group-hover:border-cyan-400/50 transition-colors p-1">
                <div className="w-full h-full rounded-full overflow-hidden bg-space-void">
                    <img src={image} alt={name} className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500 group-hover:opacity-100" />
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-cyan-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>

            <h3 className="text-lg font-bold text-white font-display tracking-wide mb-1 group-hover:text-cyan-400 transition-colors flex items-center gap-2 justify-center">
                {name} <Activity className="w-3 h-3 text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-sm text-cyan-200/60 font-mono uppercase tracking-wider">
                {role}
            </p>
        </div>
    </motion.div>
);

const About = () => {
    const [selectedMember, setSelectedMember] = useState(null);

    const teamMembers = [
        {
            name: "Smruti Sourav Mishra",
            role: "Frontend Developer",
            image: member1,
            experience: "3 YEARS",
            about: "Expert in React and modern UI frameworks. Passionate about creating immersive user experiences and responsive designs that bring cosmic data to life.",
            links: { github: "https://github.com/Smrutixmishra", linkedin: "https://www.linkedin.com/in/smrutisouravmishra/", instagram: "https://www.instagram.com/smrutixmishra/" }
        },
        {
            name: "Mrityunjay Mohanty",
            role: "UI/UX Designer",
            image: member2,
            experience: "4 YEARS",
            about: "Specializes in futuristic interfaces and user-centered design. Focuses on intuitive data visualization and creating the unique sci-fi aesthetic of Cosmic Watch.",
            links: { github: "https://github.com/Mrityunjay-31", linkedin: "https://www.linkedin.com/in/mrityunjay-mohanty-5a0027270/", instagram: "https://www.instagram.com/i.mrityunjay_/" }
        },
        {
            name: "Rabi Narayan Das",
            role: "Backend Developer",
            image: member3,
            experience: "3 YEARS",
            about: "Architects scalable server solutions and real-time data pipelines. Ensures seamless integration with NASA APIs and robust performance for global monitoring.",
            links: { github: "https://github.com/rabi-09/", linkedin: "https://www.linkedin.com/in/rabinarayandas/", instagram: "https://www.instagram.com/_rabi.09_/" }
        },
        {
            name: "Pratik Mohanty",
            role: "AI/ML Developer",
            image: member4,
            experience: "2 YEARS",
            about: "Develops the core risk analysis algorithms. Leveraging machine learning to predict asteroid trajectories and classify potential Earth impact threats.",
            links: { github: "https://github.com/Pratiktech957", linkedin: "https://www.linkedin.com/in/pratik-mohanty-tech/", instagram: "https://www.instagram.com/jarvis_052/" }
        },
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30 overflow-x-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-[#050505] to-[#050505]" />
                <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-20" />
                <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-20" />
                {/* Stars/Dust */}
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
            </div>

            <Navbar />

            <div className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto">
                {/* About Section */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-32"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/10 backdrop-blur-sm mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        <span className="text-xs font-mono text-cyan-300 tracking-widest uppercase">Mission Status: Active</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold font-display tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
                        ABOUT <span className="text-cyan-400">COSMIC WATCH</span>
                    </h1>

                    <div className="max-w-3xl mx-auto space-y-8">
                        <div>
                            <p className="text-2xl md:text-3xl font-light text-cyan-100/80 mb-2">
                                <strong className="font-bold text-white">QuantumBits</strong>
                            </p>
                            <p className="text-sm md:text-base font-mono text-cyan-400/80 tracking-[0.2em] uppercase border-t border-b border-cyan-900/50 py-2 inline-block">
                                "Tracking the unseen. Protecting the known."
                            </p>
                        </div>

                        <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
                            Cosmic Watch is a real-time Near-Earth Object (NEO) monitoring and risk analysis platform.
                            We visualize asteroid threats using live space data, empowering humanity with the knowledge
                            to protect our planet from cosmic hazards.
                        </p>
                    </div>
                </motion.section>

                {/* Features Section */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-32 relative"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/10 to-transparent rounded-2xl pointer-events-none" />
                    <div className="relative glass-card p-8 md:p-12 rounded-2xl border border-cyan-500/10 shadow-[0_0_50px_rgba(0,180,216,0.05)] backdrop-blur-xl">

                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold font-display tracking-wide text-white mb-2">
                                CORE FEATURES
                            </h2>
                            <p className="text-cyan-400/80 font-mono text-xs uppercase tracking-widest">
                                What Powers Cosmic Watch
                            </p>
                        </div>

                        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { icon: Satellite, title: "Real-Time Asteroid Tracking", desc: "Live monitoring of Near-Earth Objects using space-agency data." },
                                { icon: Shield, title: "Risk Analysis Engine", desc: "Intelligent classification based on asteroid size, velocity, and miss distance." },
                                { icon: Bell, title: "Close-Approach Alerts", desc: "Automated notifications for upcoming high-risk flyby events." },
                                { icon: Globe, title: "3D Orbital Visualization", desc: "Interactive visualization of asteroid trajectories relative to Earth." },
                                { icon: LayoutDashboard, title: "Watchlist & Personal Dashboard", desc: "Save and track selected asteroids in a personalized view." },
                                { icon: MessageSquare, title: "Community & Discussion Hub", desc: "Collaborative discussions around observed space objects." }
                            ].map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-4 group hover:bg-white/5 p-4 rounded-lg transition-colors">
                                    <div className="mt-1 p-2 rounded-lg bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 group-hover:text-cyan-300 group-hover:border-cyan-400/50 transition-colors">
                                        <feature.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-white mb-1 group-hover:text-cyan-200 transition-colors font-display tracking-wide">
                                            {feature.title}
                                        </h3>
                                        <p className="text-sm text-gray-400 leading-relaxed">
                                            {feature.desc}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.section>

                {/* Team Section */}
                <section>
                    <div className="flex flex-col items-center justify-center mb-16 border-b border-white/10 pb-8 relative">
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold font-display tracking-wide flex items-center justify-center gap-3 text-center">
                                <Users className="text-cyan-400 w-8 h-8" />
                                OUR TEAM
                            </h2>
                            <p className="text-cyan-200/50 text-sm mt-3 font-mono uppercase tracking-widest text-center">The minds behind the mission</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {teamMembers.map((member, index) => (
                            <TeamMemberCard
                                key={index}
                                {...member}
                                delay={0.1 * index}
                                onClick={() => setSelectedMember(member)}
                            />
                        ))}
                    </div>
                </section>
            </div>

            <Footer />

            <AnimatePresence>
                {selectedMember && (
                    <TeamMemberModal
                        member={selectedMember}
                        onClose={() => setSelectedMember(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default About;
