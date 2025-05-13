// app/contact/page.jsx
import { FaGithub, FaInstagram, FaTwitter, FaEnvelope } from "react-icons/fa";
import ArtImage from "../components/ArtImage";

export default function Contact() {
  return (
    <div className="pt-45 min-h-screen w-full bg-black text-white flex flex-col items-center px-6 py-12 -my-15 scrollbar-hide">
      <ArtImage />
      <h1 className="text-4xl font-bold mb-2">Let’s Get in Touch</h1>
      <p className="mb-8 text-gray-400 text-center max-w-2xl">
        Whether it’s a project, a question, or just a hello — I’d love to hear from you.
        Feel free to drop me an email or connect on any platform below.
      </p>

      <div className="text-center bg-neutral-900 border border-neutral-800 px-6 py-4 rounded-lg shadow-md mb-8">
        <div className="flex items-center justify-center gap-2 text-lg text-white">
          <FaEnvelope className="text-gray-300" />
          <a
            href="mailto:prinovac@gmail.com"
            className="hover:underline text-blue-400"
          >
            prinovac@gmail.com
          </a>
        </div>
      </div>

      <div className="flex gap-6 items-center text-2xl text-gray-300">
        <a
          href="https://github.com/prik73"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.instagram.com/prik.73/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-400 transition"
        >
          <FaInstagram />
        </a>
        <a
          href="https://twitter.com/prik73"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400 transition"
        >
          <FaTwitter />
        </a>
      </div>

      <p className="mt-6 text-sm text-gray-500 text-center">
        Thanks for stopping by — really means a lot.
      </p>
    </div>
  );
}
