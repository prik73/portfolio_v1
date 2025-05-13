// app/about/page.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import fool from '../assets/fool.png'

export default function About() {
  return (
    <div className="min-h-screen w-full bg-black text-white flex items-center justify-center px-5 -my-15 overflow-hidden no-scrollbar">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl w-full">
        {/* Left side: About me content */}
        <div className="flex flex-col justify-center space-y-4">
          <h1 className="text-5xl font-extrabold tracking-tight">
            <span className="text-white">{'<'}</span>
            About
            <span className="text-white">{' />'}</span>
          </h1>
          <p className="text-lg text-gray-300">
            The human behind the keyboard • Code enthusiast • Learning addict
          </p>
          <div className="text-gray-400 mt-4">
            <p>
              Started my B.Tech degree in 2022, diving headfirst into the world of programming.
              By 2024, I was freelancing and building web applications that actually work... 
              most of the time.
            </p>
          </div>
          <a
            href="/projects"
            className="inline-block px-6 py-3 mt-2 bg-white text-black rounded-lg hover:bg-gray-200 transition w-fit"
          >
            See My Projects
          </a>
        </div>

        {/* Right side: Personal Card */}
        {/* <Card className="w-60 h-30 bg-neutral-900 border border-neutral-700 shadow-lg">
              <CardContent className="p-0 h-full w-full"> */}
                <img
                  src={fool} // Replace with your image path
                  alt="Profile"
                  className="object-cover h-full w-full rounded-md"
                />
              {/* </CardContent>
            </Card> */}
        
        

        {/* Additional section for more about me */}
        <div className="md:col-span-2 grid grid-cols-1 gap-4 mt-6">
          <Card className="bg-neutral-900 border border-neutral-700 shadow-lg">
            <CardHeader className="border-b border-neutral-700">
              <CardTitle className="text-xl text-white">// README.md</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-400 pt-4">
              <p className="mb-3">
                Started coding in 2022 when I began my B.Tech journey. What began as course requirements
                quickly evolved into a passion for building things on the web.
              </p>
              <p className="mb-3">
                I specialize in the MERN stack (MongoDB, Express, React, Node.js) but I'm always
                exploring new technologies to add to my toolkit. In the summer of 2024, I took the leap
                into freelancing, helping clients bring their ideas to life.
              </p>
              <p>
                When I'm not in front of a computer, you might find me overthinking about code architecture
                while pretending to do something else. My debugging philosophy is simple: if it works, 
                don't touch it; if it doesn't, add more console.logs until it surrenders.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}