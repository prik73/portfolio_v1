export default function Footer({ visitCount, onlineUsers }) {
    return (
        <div className="py-8 text-center text-sm border-t border-[var(--theme-border)] text-[var(--theme-text-muted)] flex flex-col gap-2 items-center">
            <p>
                Built with sweat and blood.
                <span className="opacity-40 text-xs ml-2 font-mono">[ Press 'F' or Double Click to remix ]</span>
            </p>
            {(visitCount > 0) && (
                <div className="flex gap-4 items-center justify-center text-xs opacity-70">
                    <span>Total Visits: {visitCount.toLocaleString()}</span>
                    <span className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-[var(--theme-accent)] animate-pulse"></div>
                        {onlineUsers} Online
                    </span>
                </div>
            )}
        </div>
    );
}
