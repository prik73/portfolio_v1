const linkClass = "underline underline-offset-2 text-[var(--theme-link)] hover:no-underline";

export default function Navigation({ navItems, handleStatsClick }) {
    return (
        <header className="flex flex-wrap items-center gap-x-4 gap-y-1 pb-2 mb-8 text-sm border-b border-[var(--theme-border)]">
            {navItems.map((item) => {
                if (item.url) {
                    return (
                        <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                            {item.label}
                        </a>
                    );
                }
                if (item.path) {
                    return (
                        <a key={item.id} href={item.path} onClick={(e) => handleStatsClick(e, item.path)} className={linkClass}>
                            {item.label}
                        </a>
                    );
                }
                return (
                    <a key={item.id} href={`#${item.id}`} className={linkClass}>
                        {item.label}
                    </a>
                );
            })}
        </header>
    );
}
