// components/AuroraBackground.jsx
import React from "react";

export function AuroraBackground({ children }) {
  return (
    <div className="relative w-full min-h-screen bg-[#0f0f0f] overflow-hidden">
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-purple-500 rounded-full blur-[200px] opacity-30 mix-blend-screen" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-400 rounded-full blur-[200px] opacity-30 mix-blend-screen" />
      <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-pink-500 rounded-full blur-[200px] opacity-30 mix-blend-screen" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
