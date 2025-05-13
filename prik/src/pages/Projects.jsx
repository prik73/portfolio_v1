// app/projects/page.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Michelangelo from '../assets/mic.jpg'
import ArtImage from '../components/ArtImage'

import { AuroraText } from "@/components/magicui/aurora-text";


const projects = [
  {
    title: "Drunk Monk Micro-Blogging",
    description: "A full-stack micro-blogging platform inspired by Twitter, featuring ChatGPT-powered hate speech detection and JWT-based authentication.",
    techStack: ["MERN", "JavaScript", "daisyUI", "JWT", "Cloudinary"],
    live: "https://drunk-monk-micro-bloging.onrender.com/",
    github: "https://github.com/prik73/Drunk-Monk-Micro-Blogging",
    // image: "/images/drunk-monk.png",
  },
  {
    title: "SMM Foundation Website",
    description: "Developed and deployed a responsive website for SMM Foundation using React.js and Bootstrap.",
    techStack: ["React", "React-Bootstrap", "JavaScript"],
    github: "https://github.com/prik73/smm-foundation-website",
    live: "https://smmfoundation.org.in",
    // image: smm,
  },
  {
    title: "Multithreaded Reverse Proxy Server",
    description: "Developed a multithreaded reverse proxy web server in C with low-level socket programming and thread pools to handle concurrent client requests efficiently.",
    techStack: ["C", "Sockets", "LRU Cache", "Multithreading"],
    github: "https://github.com/prik73/reverse-proxy-server",
    image: "/images/reverse-proxy.png",
  },
  {
    title: "Drunk Ape M2",
    description: "A video calling and collaborative code editor platform tailored for developers.",
    techStack: ["WebRTC", "Socket.IO", "React", "CodeMirror"],
    live: "https://minor2codevc.vercel.app/",
    github: "https://github.com/prik73/drunk_ape_m2",
  },
  {
    title: "Fractal App",
    description: "An assignment project focused on fractal generation and visualization.",
    techStack: ["React", "Canvas", "JavaScript"],
    live: "https://fractal-app-brown.vercel.app/",
    github: "https://github.com/prik73/fractal_app",
  },
  {
    title: "Digitalyz Assignment",
    description: "An assignment project for Digitalyz. They didn't hire me, but the experience was valuable.",
    techStack: ["React", "JavaScript"],
    live: "https://digitalyz-assignment.vercel.app/",
    github: "https://github.com/prik73/digitalyz_assignment",
  },
  {
    title: "Web IDE Basic",
    description: "A basic web-based IDE supporting code editing and execution.",
    techStack: ["React", "CodeMirror", "Node.js"],
    live: "https://web-ide-pg-client.onrender.com/",
    github: "https://github.com/prik73/web_ide_basic",
  },
  {
    title: "Particle Design",
    description: "An interactive particle design project showcasing animations and user interactions.",
    techStack: ["JavaScript", "Canvas", "HTML5"],
    github: "https://github.com/prik73/particle_design",
    live: "https://particle-design.vercel.app/"
  },
];

export default function Projects() {
  return (
    <div className="pt-40 min-h-screen w-full bg-black text-white flex flex-col items-center px-6 py-12 scrollbar-hide">
        {/* Art Banner */}
      {/* <ArtImage /> */}
      <h1 className="text-4xl font-bold mb-8"><AuroraText>projects which i've made</AuroraText> in the last year</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 max-w-6xl w-full">
        {projects.map((project, index) => (
          <Card key={index} className="bg-neutral-900 border border-neutral-800 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-neutral-800">
            <CardHeader>
              <CardTitle className="text-xl text-white">{project.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 flex-1 flex flex-col">
              <div className="relative w-full mb-4">
                {/* <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-full rounded"
                /> */}
              </div>
              <p className="mb-2">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.map((tech, idx) => (
                  <span key={idx} className="bg-gray-700 text-white text-xs px-2 py-1 rounded">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-auto">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline mr-4"
                >
                  GitHub
                </a>
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    Live Site
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
