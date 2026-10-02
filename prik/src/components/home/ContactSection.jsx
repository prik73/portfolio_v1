const linkClass = "underline underline-offset-2 text-[var(--theme-link)] hover:no-underline";

const socials = [
    { label: 'github', href: 'https://github.com/prik73' },
    { label: 'linkedin', href: 'https://www.linkedin.com/in/prik73/' },
    { label: 'twitter', href: 'https://twitter.com/prik73' },
    { label: 'instagram', href: 'https://instagram.com/catchydham' },
];

export default function ContactSection() {
    return (
        <section id="contact" className="mb-12 scroll-mt-6">
            <h2 className="font-[Verdana,sans-serif] text-xl font-bold mb-4">Contact</h2>
            <p className="mb-3 text-[var(--theme-text-muted)]">
                Any comments or feedback on my projects or this very page, or just want to say Hi / Namaste :) Would love to hear from you.
            </p>
            <p className="mb-3">
                <a href="mailto:prinovac@gmail.com" className={linkClass}>prinovac@gmail.com</a>
            </p>
            <p className="flex flex-wrap items-center gap-x-2 text-[var(--theme-text-muted)]">
                {socials.map((s, i) => (
                    <span key={s.label} className="flex items-center gap-x-2">
                        {i > 0 && <span aria-hidden="true">·</span>}
                        <a href={s.href} target="_blank" rel="noopener noreferrer" className={linkClass}>{s.label}</a>
                    </span>
                ))}
            </p>
        </section>
    );
}
