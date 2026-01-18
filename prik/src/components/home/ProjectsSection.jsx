import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { projects } from '../../data/projects';

export default function ProjectsSection({ sectionsRef }) {
    return (
        <section
            ref={el => sectionsRef.current['projects'] = el}
            data-section="projects"
            className="min-h-screen flex flex-col justify-center py-20 border-t border-[var(--theme-border)]"
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <div className="inline-block mb-12">
                    <div className="p-1 border border-[var(--theme-border)] rounded-lg bg-[var(--theme-inverse-bg)]">
                        <div className="p-1 border border-[var(--theme-border)] rounded-lg bg-[var(--theme-bg)]">
                            <div className="px-6 py-3 bg-[var(--theme-bg)]">
                                <h2 className="text-4xl lg:text-5xl font-bold underline hover:no-underline transition-all cursor-pointer">Projects</h2>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="border-b border-[var(--theme-border)] pb-6 last:border-b-0"
                        >
                            {project.live ? (
                                <a
                                    href={project.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xl font-semibold mb-2 hover:opacity-80 transition-colors inline-block text-[var(--theme-text)]"
                                >
                                    {project.title}
                                </a>
                            ) : (
                                <h3 className="text-xl font-semibold mb-2 text-[var(--theme-text)]">{project.title}</h3>
                            )}
                            <p className="mb-3 text-[var(--theme-text-muted)]">{project.description}</p>

                            <div className="flex flex-wrap gap-2 mb-3">
                                {project.techStack.map((tech, idx) => (
                                    <span
                                        key={idx}
                                        className="text-xs px-2 py-1 rounded border border-[var(--theme-border)] text-[var(--theme-text)] font-medium"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-4 text-sm">
                                {project.github && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 transition-colors text-[var(--theme-text-muted)] hover:text-[var(--theme-text)]"
                                    >
                                        <Github className="w-4 h-4" />
                                        Code
                                    </a>
                                )}
                                {project.live && (
                                    <a
                                        href={project.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 text-[var(--theme-text)] font-semibold hover:opacity-80 transition-colors"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        Live
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
