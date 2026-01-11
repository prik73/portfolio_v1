import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { FaUsers, FaGlobeAmericas } from 'react-icons/fa';
import { Map, MapControls } from '../components/ui/map';





export default function Stats() {
    const [totalVisits, setTotalVisits] = useState(0);
    const [onlineUsers, setOnlineUsers] = useState(1);
    const [locations, setLocations] = useState([]);
    const [themeColor, setThemeColor] = useState(() => {
        const saved = JSON.parse(localStorage.getItem('themeColor'));
        return saved || { backgroundColor: '#000000', textColor: '#ffffff', accentColor: '#10B981' };
    });

    useEffect(() => {
        // 1. Fetch Total Visits Logic (Simplified as count of rows for now)
        const fetchStats = async () => {
            const { count } = await supabase.from('website_visits').select('*', { count: 'exact', head: true });
            if (count) setTotalVisits(count);

            // Fetch locations (grouped by country/city would be better in RPC, but let's fetch last 50 for map markers)
            // Note: fetching raw rows to client isn't great for scale, better to enable an RPC function.
            // For this portfolio, we'll fetch unique cities from last 1000 rows locally.
            const { data } = await supabase.from('website_visits').select('city, country').limit(500);

            if (data) {
                // Mocking coordinates for simplicity since we only stored city names string. 
                // In a real app, we should store lat/long in the DB.
                // For this demo, let's just show some static markers or if we had coords.
                // Actually, let's skip markers on map if we don't have lat/long, 
                // OR we can just visually highlight countries if we match names.
                // Let's go with highlighting countries that have visitors.
                const countries = new Set(data.map(d => d.country));
                setLocations(Array.from(countries));
            }
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
            className="min-h-screen p-8 lg:p-20"
            style={{
                backgroundColor: themeColor.backgroundColor,
                color: themeColor.textColor,
                '--theme-bg': themeColor.backgroundColor,
                '--theme-text': themeColor.textColor,
                '--theme-text-muted': themeColor.textColor + 'b3',
                '--theme-border': themeColor.textColor + '33',
                '--theme-inverse-bg': themeColor.textColor,
                '--theme-inverse-text': themeColor.backgroundColor,
                '--theme-accent': themeColor.accentColor || '#10B981',
            }}
        >
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center gap-4 mb-8">
                        <button
                            onClick={() => window.location.href = '/'}
                            className="text-sm opacity-60 hover:opacity-100 transition-opacity"
                        >
                            &larr; Back home
                        </button>
                        <h1 className="text-3xl font-bold">Traffic & Stats</h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

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
                        </div>

                        <div className="p-4 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-inverse-bg)]/5">
                            <div className="flex items-center gap-3 mb-2 opacity-70">
                                <FaGlobeAmericas />
                                <span className="text-sm font-medium">Countries Reached</span>
                            </div>
                            <p className="text-3xl font-bold">{locations.length}</p>
                        </div>

                    </div>


                    <div className="border border-[var(--theme-border)] rounded-xl p-4 overflow-hidden bg-[var(--theme-inverse-bg)]/5">
                        <h2 className="text-xl font-bold mb-4 ml-2">Visitor Map</h2>
                        <div className="h-[300px] w-full rounded-lg overflow-hidden relative">
                            <Map center={[20, 0]} zoom={1.5}>
                                <MapControls />
                                {/* We can map locations to markers here if we had lat/long data */}
                                {/* For now, just showing the beautiful dark basemap as requested */}
                            </Map>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>);
}
