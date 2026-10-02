const strong = "text-[var(--theme-text)] font-semibold";
const linkClass = "underline underline-offset-2 text-[var(--theme-link)] hover:no-underline";

const links = [
    { label: 'github', href: 'https://github.com/prik73', external: true },
    { label: 'instagram', href: 'https://instagram.com/catchydham', external: true },
    { label: 'resume', href: 'https://drive.google.com/file/d/14yioCM1VcLtcMuhdQgaiJ8pU58519Ze8/view?usp=sharing', external: true },
];

export default function HeroSection({ greeting }) {
    return (
        <section id="home" className="mb-12">
            <h1 className="font-[Verdana,sans-serif] text-2xl font-bold mb-4">{greeting}</h1>

            <p className="mb-3">
                <span className={strong}>I'm Priyanshu</span>, a <span className={strong}>tinkerer</span>.
            </p>
            <ul className="space-y-1 mb-3 text-[var(--theme-text-muted)]">
                <li className="flex gap-3">
                    <span aria-hidden="true">–</span>
                    <span>Currently at <span className={strong}>Apollyon Dynamics</span>, witnessing the team do great things.</span>
                </li>
                <li className="flex gap-3">
                    <span aria-hidden="true">–</span>
                    <span>Trying new stuff, exploring what can be done with technologies.</span>
                </li>
                <li className="flex gap-3">
                    <span aria-hidden="true">–</span>
                    <span>Earlier used to create fun, scalable applications.</span>
                </li>
            </ul>
            <p className="mb-6 text-[var(--theme-text-muted)]">
                Try them out, just scroll down, would love to know your feedback :)
            </p>

            <nav className="flex flex-wrap items-center gap-x-2 text-[var(--theme-text-muted)]">
                {links.map((l, i) => (
                    <span key={l.label} className="flex items-center gap-x-2">
                        {i > 0 && <span aria-hidden="true">·</span>}
                        <a
                            href={l.href}
                            {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                            className={linkClass}
                        >
                            {l.label}
                        </a>
                    </span>
                ))}
            </nav>
        </section>
    );
}
