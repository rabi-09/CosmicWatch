import React from 'react';
import { FiActivity, FiAlertTriangle, FiTarget } from 'react-icons/fi';

const LiveStats = () => {
    return (
        <section className="py-12 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="bg-space-card/20 backdrop-blur-lg border border-space-border rounded-2xl p-6">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                <h2 className="text-2xl font-bold text-white">COSMIC DASHBOARD</h2>
                            </div>
                            <p className="text-space-gray-light">Real-time monitoring and threat assessment system</p>
                        </div>
                        
                        <div className="mt-4 md:mt-0">
                            <div className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-full">
                                <FiAlertTriangle className="text-red-400" />
                                <span className="text-red-400 font-semibold">ACTIVE MONITORING</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Daily Orbital Scan */}
                        <div className="bg-space-card/40 backdrop-blur-sm border border-space-border rounded-xl p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <FiActivity className="text-cyan-400 text-xl" />
                                    <h3 className="text-lg font-semibold text-white">Daily Orbital Scan</h3>
                                </div>
                                <div className="px-3 py-1 bg-green-500/20 rounded-full">
                                    <span className="text-green-400 text-sm font-bold">LIVE</span>
                                </div>
                            </div>
                            <div className="text-center py-4">
                                <div className="text-5xl font-bold text-white mb-2">12</div>
                                <div className="text-space-gray-light">Objects Detected</div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-space-border/50">
                                <div className="flex justify-between text-sm">
                                    <span className="text-space-gray">Last Updated</span>
                                    <span className="text-white">00:02:34 ago</span>
                                </div>
                            </div>
                        </div>

                        {/* NEOs Today */}
                        <div className="bg-space-card/40 backdrop-blur-sm border border-space-border rounded-xl p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <FiTarget className="text-yellow-400 text-xl" />
                                    <h3 className="text-lg font-semibold text-white">NEOs Today</h3>
                                </div>
                                <div className="px-3 py-1 bg-green-500/20 rounded-full">
                                    <span className="text-green-400 text-sm font-bold">LIVE</span>
                                </div>
                            </div>
                            <div className="text-center py-4">
                                <div className="text-5xl font-bold text-white mb-2">2</div>
                                <div className="text-space-gray-light">Potentially Hazardous</div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-space-border/50">
                                <div className="flex justify-between text-sm">
                                    <span className="text-space-gray">Risk Level</span>
                                    <span className="text-yellow-400 font-semibold">MEDIUM</span>
                                </div>
                            </div>
                        </div>

                        {/* Close Approach */}
                        <div className="bg-space-card/40 backdrop-blur-sm border border-red-500/30 rounded-xl p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <FiAlertTriangle className="text-red-400 text-xl" />
                                    <h3 className="text-lg font-semibold text-white">Close Approach</h3>
                                </div>
                                <div className="px-3 py-1 bg-red-500/20 rounded-full">
                                    <span className="text-red-400 text-sm font-bold">ALERT</span>
                                </div>
                            </div>
                            <div className="text-center py-4">
                                <div className="text-5xl font-bold text-red-400 mb-2">1.2</div>
                                <div className="text-space-gray-light">Lunar Distance (LD)</div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-space-border/50">
                                <div className="flex justify-between text-sm">
                                    <span className="text-space-gray">Closest Object</span>
                                    <span className="text-white font-semibold">2024 AB3</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Status footer */}
                    <div className="mt-8 pt-6 border-t border-space-border">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-sm text-space-gray-light">All Systems Normal</span>
                                </div>
                                <div className="w-px h-4 bg-space-border"></div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                                    <span className="text-sm text-space-gray-light">Data Streaming Active</span>
                                </div>
                            </div>
                            <div className="text-sm text-space-gray">
                                Next Full Scan: <span className="text-white">23:00 UTC</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LiveStats;