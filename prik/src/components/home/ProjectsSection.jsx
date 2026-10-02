import { useEffect, useState } from 'react';
import { projects } from '../../data/projects';

const linkClass = "underline underline-offset-2 text-[var(--theme-link)] hover:no-underline";

const MAX_OPEN = 2;

export default function ProjectsSection() {
    // Titles of expanded projects, oldest first; opening a third closes the oldest.
    const [openTitles, setOpenTitles] = useState([]);

    const [sectionOpen, setSectionOpen] = useState(false);

    // Nav links to #projects should reveal the collapsed list
    useEffect(() => {
        const openIfTargeted = () => {
            if (window.location.hash === '#projects') setSectionOpen(true);
        };
        openIfTargeted();
        window.addEventListener('hashchange', openIfTargeted);
        return () => window.removeEventListener('hashchange', openIfTargeted);
    }, []);

    const toggle = (title) => {
        setOpenTitles((prev) =>
            prev.includes(title)
                ? prev.filter((t) => t !== title)
                : [...prev, title].slice(-MAX_OPEN)
        );
    };

    return (
        <section id="projects" className="mb-12 scroll-mt-6">
            <h2 className="font-[Verdana,sans-serif] text-xl font-bold mb-4">
                <button
                    onClick={() => setSectionOpen((o) => !o)}
                    aria-expanded={sectionOpen}
                    className="flex items-baseline gap-3 cursor-pointer font-bold"
                >
                    <span aria-hidden="true" className={`w-3 text-base transition-transform ${sectionOpen ? 'rotate-90' : ''}`}>▸</span>
                    Projects
                </button>
            </h2>

            <div className={`border-t border-[var(--theme-border)] ${sectionOpen ? '' : 'hidden'}`}>
                {projects.map((project) => (
                    <details key={project.title} open={openTitles.includes(project.title)} className="group border-b border-[var(--theme-border)]">
                        <summary onClick={(e) => { e.preventDefault(); toggle(project.title); }} className="flex items-baseline gap-3 py-3 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                            <span aria-hidden="true" className="w-3 text-[var(--theme-text-muted)] transition-transform group-open:rotate-90">▸</span>
                            <span className="font-semibold">{project.title}</span>
                        </summary>

                        <div className="pb-4 pl-6 space-y-3">
                            <p className="text-[var(--theme-text-muted)]">{project.description}</p>

                            {project.image && (
                                <img
                                    src={project.image}
                                    alt={`${project.title} screenshot`}
                                    loading="lazy"
                                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                    className="w-full border border-[var(--theme-border)]"
                                />
                            )}

                            <p className="text-sm text-[var(--theme-text-muted)]">
                                {project.techStack.length > 0 && project.techStack.join(' · ')}
                            </p>

                            <p className="text-sm flex flex-wrap items-baseline gap-x-4">
                                {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" className={linkClass}>live</a>}
                                {project.note && <span className="text-red-500">{project.note}</span>}
                                {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className={linkClass}>code</a>}
                                {project.docker && <a href={project.docker} target="_blank" rel="noopener noreferrer" className={linkClass}>test locally</a>}
                            </p>
                        </div>
                    </details>
                ))}
            </div>
        </section>
    );
}
