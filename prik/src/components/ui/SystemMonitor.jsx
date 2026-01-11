import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBatteryThreeQuarters, FaWifi, FaMicrochip, FaGlobe, FaDesktop, FaMemory } from 'react-icons/fa';

export const SystemMonitor = ({ isOpen, onClose }) => {
    const [stats, setStats] = useState({
        battery: null,
        connection: null,
        hardware: null,
        screen: null,
        geo: null,
        loading: true
    });

    useEffect(() => {
        if (!isOpen) return;

        const gatherStats = async () => {
            // 1. Hardware (Offline)
            const hardware = {
                cores: navigator.hardwareConcurrency || 'Unknown',
                memory: navigator.deviceMemory ? `~${navigator.deviceMemory} GB` : 'Unknown',
                userAgent: navigator.userAgent,
                platform: navigator.platform,
                language: navigator.language
            };

            // 2. Screen (Offline)
            const screenData = {
                width: window.screen.width,
                height: window.screen.height,
                colorDepth: window.screen.colorDepth,
                pixelRatio: window.devicePixelRatio
            };

            // 3. Network (Reliable Native API - Offlineish)
            const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
            const netData = connection ? {
                type: connection.effectiveType || 'Unknown',
                downlink: connection.downlink ? `${connection.downlink} Mbps` : 'Unknown',
                rtt: connection.rtt ? `${connection.rtt} ms` : 'Unknown'
            } : null;

            // 4. Battery (Native API)
            let batteryData = null;
            if (navigator.getBattery) {
                try {
                    const b = await navigator.getBattery();
                    batteryData = {
                        level: Math.round(b.level * 100) + '%',
                        charging: b.charging ? 'Charging' : 'Discharging'
                    };
                } catch (e) { console.warn('Battery API not supported'); }
            }

            // 5. Geo (Online)
            let geoData = null;
            try {
                const res = await fetch('https://ipapi.co/json/');
                if (res.ok) geoData = await res.json();
            } catch (e) {
                // Fallback
                try {
                    const res2 = await fetch('https://ipwho.is/');
                    if (res2.ok) geoData = await res2.json();
                } catch (e2) { }
            }

            setStats({
                hardware,
                screen: screenData,
                connection: netData,
                battery: batteryData,
                geo: geoData,
                loading: false
            });
        };

        gatherStats();

        const interval = setInterval(gatherStats, 13000);
        return () => clearInterval(interval);
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed inset-0 m-auto z-50 w-full max-w-4xl h-fit max-h-[90vh] overflow-y-auto p-2 md:p-8"
                    >
                        <div className="bg-[#0a0a0a] border border-[var(--theme-border)] rounded-2xl p-3 md:p-6 shadow-2xl relative overflow-hidden">
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-3 right-3 md:top-4 md:right-4 text-xs opacity-50 hover:opacity-100 p-2"
                            >
                                [CLOSE]
                            </button>

                            <div className="flex items-center gap-3 mb-4 md:mb-8 border-b border-[var(--theme-border)] pb-4">
                                <div className="w-3 h-3 rounded-full bg-[var(--theme-accent)] animate-pulse" />
                                <h2 className="text-xl font-bold font-mono text-[var(--theme-accent)]">SYSTEM_DIAGNOSTICS_TOOL</h2>
                            </div>

                            {stats.loading ? (
                                <div className="h-64 flex items-center justify-center font-mono animate-pulse text-zinc-400">
                                    SCANNING_HARDWARE...
                                </div>
                            ) : (
                                <div className="font-mono text-sm md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4">

                                    {/* Section 1: Hardware */}
                                    <div className="mb-6 md:mb-0 md:p-4 md:rounded-xl md:bg-zinc-900/50 md:border md:border-zinc-800">
                                        <div className="flex items-center gap-2 mb-2 md:mb-3 text-[var(--theme-accent)]">
                                            <FaMicrochip /> <span className="font-bold uppercase tracking-wider md:tracking-normal">Hardware</span>
                                        </div>
                                        <div className="space-y-1 md:space-y-2 text-zinc-500 md:text-zinc-400 pl-6 md:pl-0 border-l border-zinc-800 md:border-none">
                                            <div className="flex justify-between"><span>Cores</span> <span className="text-zinc-200">{stats.hardware.cores}</span></div>
                                            <div className="flex justify-between"><span>Memory</span> <span className="text-zinc-200">{stats.hardware.memory}</span></div>
                                            <div className="flex justify-between"><span>Platform</span> <span className="text-zinc-200">{stats.hardware.platform}</span></div>
                                        </div>
                                    </div>

                                    {/* Section 2: Screen */}
                                    <div className="mb-6 md:mb-0 md:p-4 md:rounded-xl md:bg-zinc-900/50 md:border md:border-zinc-800">
                                        <div className="flex items-center gap-2 mb-2 md:mb-3 text-[var(--theme-accent)]">
                                            <FaDesktop /> <span className="font-bold uppercase tracking-wider md:tracking-normal">Display</span>
                                        </div>
                                        <div className="space-y-1 md:space-y-2 text-zinc-500 md:text-zinc-400 pl-6 md:pl-0 border-l border-zinc-800 md:border-none">
                                            <div className="flex justify-between"><span>Res</span> <span className="text-zinc-200">{stats.screen.width}x{stats.screen.height}</span></div>
                                            <div className="flex justify-between"><span>Depth</span> <span className="text-zinc-200">{stats.screen.colorDepth}-bit</span></div>
                                            <div className="flex justify-between"><span>Ratio</span> <span className="text-zinc-200">{stats.screen.pixelRatio}x</span></div>
                                        </div>
                                    </div>

                                    {/* Section 3: Battery */}
                                    <div className="mb-6 md:mb-0 md:p-4 md:rounded-xl md:bg-zinc-900/50 md:border md:border-zinc-800">
                                        <div className="flex items-center gap-2 mb-2 md:mb-3 text-[var(--theme-accent)]">
                                            <FaBatteryThreeQuarters /> <span className="font-bold uppercase tracking-wider md:tracking-normal">Power</span>
                                        </div>
                                        {stats.battery ? (
                                            <div className="space-y-1 md:space-y-2 text-zinc-500 md:text-zinc-400 pl-6 md:pl-0 border-l border-zinc-800 md:border-none">
                                                <div className="flex justify-between"><span>Level</span> <span className="text-zinc-200">{stats.battery.level}</span></div>
                                                <div className="flex justify-between"><span>Status</span> <span className="text-zinc-200">{stats.battery.charging}</span></div>
                                            </div>
                                        ) : (
                                            <div className="text-xs opacity-50 pl-6 md:pl-0 border-l border-zinc-800 md:border-none">Desktop Mode / No Battery API</div>
                                        )}
                                    </div>

                                    {/* Section 4: Network */}
                                    <div className="mb-6 md:mb-0 md:p-4 md:rounded-xl md:bg-zinc-900/50 md:border md:border-zinc-800">
                                        <div className="flex items-center gap-2 mb-2 md:mb-3 text-[var(--theme-accent)]">
                                            <FaWifi /> <span className="font-bold uppercase tracking-wider md:tracking-normal">Network</span>
                                        </div>
                                        {stats.connection ? (
                                            <div className="space-y-1 md:space-y-2 text-zinc-500 md:text-zinc-400 pl-6 md:pl-0 border-l border-zinc-800 md:border-none">
                                                <div className="flex justify-between"><span>Type</span> <span className="text-zinc-200">{stats.connection.type}</span></div>
                                                <div className="flex justify-between"><span>Speed</span> <span className="text-zinc-200">{stats.connection.downlink}</span></div>
                                                <div className="flex justify-between"><span>Latency</span> <span className="text-zinc-200">{stats.connection.rtt}</span></div>
                                            </div>
                                        ) : (
                                            <div className="text-xs opacity-50 pl-6 md:pl-0 border-l border-zinc-800 md:border-none">Network API Unsupported</div>
                                        )}
                                    </div>

                                    {/* Section 5: Geo */}
                                    <div className="col-span-1 md:col-span-2 md:p-4 md:rounded-xl md:bg-zinc-900/50 md:border md:border-zinc-800">
                                        <div className="flex items-center gap-2 mb-2 md:mb-3 text-[var(--theme-accent)]">
                                            <FaGlobe /> <span className="font-bold uppercase tracking-wider md:tracking-normal">Geolocation</span>
                                        </div>
                                        {stats.geo ? (
                                            <div className="pl-6 md:pl-0 border-l border-zinc-800 md:border-none">
                                                {/* Mobile View: Stacked Text */}
                                                <div className="md:hidden space-y-2 text-zinc-500">
                                                    <div className="flex justify-between"><span>City</span> <span className="text-zinc-200">{stats.geo.city}</span></div>
                                                    <div className="flex justify-between"><span>Country</span> <span className="text-zinc-200">{stats.geo.country || stats.geo.country_name}</span></div>
                                                    <div className="flex justify-between"><span>ISP</span> <span className="text-zinc-200">{stats.geo.org || stats.geo.isp}</span></div>
                                                    <div className="flex justify-between"><span>Coords</span> <span className="text-zinc-200 font-mono text-xs">{stats.geo.latitude} / {stats.geo.longitude}</span></div>
                                                </div>

                                                {/* Desktop View: Grid */}
                                                <div className="hidden md:grid grid-cols-2 gap-4 text-zinc-400">
                                                    <div className="flex flex-col">
                                                        <span className="text-xs opacity-50">City</span>
                                                        <span className="text-zinc-200">{stats.geo.city}</span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-xs opacity-50">Country</span>
                                                        <span className="text-zinc-200">{stats.geo.country || stats.geo.country_name}</span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-xs opacity-50">ISP</span>
                                                        <span className="text-zinc-200">{stats.geo.org || stats.geo.isp || 'Unknown'}</span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-xs opacity-50">Coordinates</span>
                                                        <span className="font-mono text-xs text-zinc-200">{stats.geo.latitude}, {stats.geo.longitude}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-xs opacity-50 pl-6 md:pl-0 border-l border-zinc-800 md:border-none">Signal Lost / Blocked</div>
                                        )}
                                    </div>

                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
