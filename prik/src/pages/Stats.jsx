import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { FaUsers, FaGlobeAmericas } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext'; // Import useTheme context
import { useTransition } from '../context/TransitionContext'; // Import useTransition context

import { SystemMonitor } from '../components/ui/SystemMonitor';






export default function Stats() {
    const [totalVisits, setTotalVisits] = useState(0);
    const [onlineUsers, setOnlineUsers] = useState(1);
    const [showSystemMonitor, setShowSystemMonitor] = useState(false);
    const { themeColor } = useTheme(); // Use global theme
    const { startTransition } = useTransition();

    useEffect(() => {
        // 1. Fetch Total Visits Logic (Simplified as count of rows for now)
        const fetchStats = async () => {
            const { count } = await supabase.from('website_visits').select('*', { count: 'exact', head: true });
            if (count) setTotalVisits(count);

        };
        fetchStats();

        // 2. Realtime Online Users
        if (supabase.supabaseUrl) {
            const channel = supabase.channel('online-users');
            channel
                .on('presence', { event: 'sync' }, () => {
                    const presenceState = channel.presenceState();
                    const count = Object.keys(presenceState).length;
                    setOnlineUsers(count > 0 ? count : 1);
                })
                .subscribe(async (status) => {
                    if (status === 'SUBSCRIBED') {
                        await channel.track({ online_at: new Date().toISOString() });
                    }
                });

            return () => {
                supabase.removeChannel(channel);
            };
        }
    }, []);

    return (
        <div
            className="min-h-screen p-8 lg:p-20 transition-colors duration-500" // Kept simple
        >
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center gap-4 mb-8">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                startTransition(e.clientX, e.clientY, '/');
                            }}
                            className="text-sm opacity-60 hover:opacity-100 transition-opacity"
                        >
                            &larr; Back home
                        </button>
                        <h1 className="text-3xl font-bold">Traffic & Stats</h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">

                        <div className="p-4 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-inverse-bg)]/5">
                            <div className="flex items-center gap-3 mb-2 opacity-70">
                                <FaUsers />
                                <span className="text-sm font-medium">Total Global Visits</span>
                            </div>
                            <p className="text-3xl font-bold">{totalVisits.toLocaleString()}</p>
                        </div>

                        <div className="p-4 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-inverse-bg)]/5">
                            <div className="flex items-center gap-3 mb-2 opacity-70">
                                <div className="w-2 h-2 rounded-full bg-[var(--theme-accent)] animate-pulse"></div>
                                <span className="text-sm font-medium">Live Users</span>
                            </div>
                            <p className="text-3xl font-bold">{onlineUsers}</p>
                            {onlineUsers === 1 && (
                                <p className="text-xs mt-2 opacity-60 italic">it's only you here, you beautiful human being :)</p>
                            )}
                        </div>

                    </div>



                </motion.div>

                {/* System Diagnostics Toggle */}
                <div className="fixed bottom-4 right-4 opacity-50 hover:opacity-100 transition-opacity flex flex-col items-end gap-2">
                    <button
                        onClick={() => setShowSystemMonitor(true)}
                        className="text-[10px] uppercase tracking-wider font-mono border border-[var(--theme-text)]/20 bg-[var(--theme-bg)] text-[var(--theme-text)] px-3 py-1.5 rounded hover:bg-[var(--theme-text)] hover:text-[var(--theme-inverse-text)] transition-all"
                    >
                        [ SYSTEM_DIAGNOSTICS ]
                    </button>
                </div>
            </div>

            <SystemMonitor
                isOpen={showSystemMonitor}
                onClose={() => setShowSystemMonitor(false)}
            />
        </div>
    );
}
