import { motion } from 'framer-motion';

export default function Navigation({ activeSection, navItems, scrollToSection, handleStatsClick }) {
    return (
        <>
            {/* Desktop Right-Side Navigation */}
            <nav className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
                <div className="flex flex-col space-y-6">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={(e) => {
                                if (item.url) {
                                    window.open(item.url, '_blank');
                                } else if (item.path) {
                                    handleStatsClick(e, item.path);
                                } else {
                                    scrollToSection(item.id);
                                }
                            }}
                            className={`
                text-sm font-medium transition-all duration-300 relative group text-left
                ${activeSection === item.id
                                    ? 'text-[var(--theme-text)]'
                                    : 'text-[var(--theme-text-muted)] hover:opacity-100'}`}
                        >
                            {activeSection === item.id && (
                                <motion.span
                                    layoutId="activeNav"
                                    className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--theme-text)]"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                            {item.label}
                        </button>
                    ))}
                </div>
            </nav>

            {/* Mobile Bottom-Right Navigation */}
            <nav className="lg:hidden fixed bottom-6 right-6 z-50">
                <div className="flex flex-col gap-3 items-end">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={(e) => {
                                if (item.url) {
                                    window.open(item.url, '_blank');
                                } else if (item.path) {
                                    handleStatsClick(e, item.path);
                                } else {
                                    scrollToSection(item.id);
                                }
                            }}
                            className={`
                text-xs font-medium transition-all duration-300
                ${activeSection === item.id
                                    ? 'text-[var(--theme-text)] scale-110'
                                    : 'text-[var(--theme-text-muted)] hover:opacity-100'}`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </nav>
        </>
    );
}
