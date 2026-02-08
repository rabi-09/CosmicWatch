import React from 'react';
import { Github, Database, Cpu } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="py-12 bg-space-void border-t border-white/5 relative z-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left">
                        <h3 className="font-display font-bold text-xl text-white mb-2">
                            COSMIC<span className="font-light text-space-highlight">WATCH</span>
                        </h3>
                        <p className="text-space-highlight/40 text-sm">
                            Built for space awareness and public understanding.
                        </p>
                    </div>

                    <div className="flex items-center gap-6">
                        <a href="#" className="flex items-center gap-2 text-space-highlight/60 hover:text-white transition-colors text-sm">
                            <Github size={16} /> GitHub
                        </a>
                        <a href="#" className="flex items-center gap-2 text-space-highlight/60 hover:text-white transition-colors text-sm">
                            <Database size={16} /> API Docs
                        </a>
                        <a href="#" className="flex items-center gap-2 text-space-highlight/60 hover:text-white transition-colors text-sm">
                            <Cpu size={16} /> AI-LOG
                        </a>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/5 text-center text-xs text-white/80 font-mono">
                    &copy; {new Date().getFullYear()} CosmicWatch Initiative. Data courtesy of NASA JPL / CNEOS.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
