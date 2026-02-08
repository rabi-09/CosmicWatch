import { motion } from "framer-motion";

const SocialAuthButton = ({ icon: Icon, label, onClick }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "rgba(6, 182, 212, 0.1)" }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            type="button"
            className="flex items-center justify-center gap-3 w-full py-3 border border-cyan-500/30 rounded-none bg-transparent hover:border-cyan-400/50 transition-all duration-300 group relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Icon className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
            <span className="text-cyan-300/80 text-xs font-mono tracking-wider group-hover:text-cyan-200 transition-colors">
                {label}
            </span>
        </motion.button>
    );
};

export default SocialAuthButton;
