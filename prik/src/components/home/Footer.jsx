export default function Footer({ visitCount, onlineUsers }) {
    return (
        <footer className="pt-4 text-sm border-t border-[var(--theme-border)] text-[var(--theme-text-muted)]">
            <p>Built with sweat and blood.</p>
            {visitCount > 0 && (
                <p className="text-xs opacity-70">
                    {visitCount.toLocaleString()} visits · {onlineUsers} online
                </p>
            )}
        </footer>
    );
}
