import { supabase } from '../lib/supabase';

const IP_API = 'https://ipapi.co/json/';

export const trackVisit = async () => {
    try {
        // 1. Check if Supabase is configured
        if (!supabase.supabaseUrl) return;

        // 2. Identify Visitor (Client-side UUID)
        let visitorId = localStorage.getItem('visitor_id');
        if (!visitorId) {
            visitorId = crypto.randomUUID();
            localStorage.setItem('visitor_id', visitorId);
        }

        // 3. Check for DAU (Daily Active User)
        const today = new Date().toISOString().split('T')[0];
        const lastVisitDate = localStorage.getItem('last_visit_date');

        if (lastVisitDate === today) {
            // Already visited today, don't log a new row
            return;
        }

        // 4. Gather Data
        let geo = {};
        try {
            // Try primary API
            const res = await fetch('https://ipapi.co/json/');
            if (res.ok) {
                geo = await res.json();
            } else {
                throw new Error('Primary API failed');
            }
        } catch (e) {
            console.warn('Primary geo API failed, trying fallback...', e);
            try {
                // Fallback API
                const res = await fetch('https://ipwho.is/');
                if (res.ok) {
                    geo = await res.json();
                }
            } catch (e2) {
                console.warn('All geo APIs failed', e2);
            }
        }

        const { city, country_name: country, latitude, longitude } = geo;
        const { userAgent } = navigator;

        // 5. Parse simplified device/OS (Regex helper)
        const isMobile = /Mobi|Android/i.test(userAgent);
        const device_type = isMobile ? 'mobile' : 'desktop';

        let os = 'Unknown';
        if (userAgent.indexOf('Win') !== -1) os = 'Windows';
        if (userAgent.indexOf('Mac') !== -1) os = 'MacOS';
        if (userAgent.indexOf('Linux') !== -1) os = 'Linux';
        if (userAgent.indexOf('Android') !== -1) os = 'Android';
        if (userAgent.indexOf('like Mac') !== -1) os = 'iOS';

        // 6. Push to Supabase
        const { error } = await supabase.from('website_visits').insert({
            visitor_id: visitorId,
            city: city || 'Unknown',
            country: country || 'Unknown',
            device_type,
            os,
            browser: userAgent, // minimal parsing for now
        });

        if (!error) {
            localStorage.setItem('last_visit_date', today);
        } else {
            console.error('Supabase analytics error:', error);
        }

    } catch (err) {
        console.error('Analytics tracking failed:', err);
    }
};

export const getUniqueVisitors = async () => {
    // Count distinct visitor_ids
    // Note: Supabase 'count' with distinct is tricky in simple client calls without RPC.
    // We'll stick to simple "count of rows" typically, OR "count of distinct visitor_id" if we add an RPC.
    // For now, let's just get raw count of visits table as "Total Sessions" or similar, 
    // OR we can fetch all and distinct locally (bad for scale)
    // BETTER: Use head:true and count: exact for total visits implies "Total Sessions"
    // To get "Unique Visitors", we really should use an RPC function in SQL.
    // Let's fallback to just getting the table count for now, it's approximately good enough for a small portfolio.

    // Actually, let's use the RPC approach if the user is willing to run it. 
    // If not, we can just return the total row count.

    const { count, error } = await supabase
        .from('website_visits')
        .select('*', { count: 'exact', head: true });

    if (error) return 0;
    return count;
};
