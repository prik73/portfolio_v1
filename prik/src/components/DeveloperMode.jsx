import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const asciiArt = String.raw`
      [-- Developer Mode Activated --]
      ________________
     |                |
     |   0  1  1  0   |
     |   1  1  0  1   |
     |   0  1  1  0   |
     |   1  0  0  1   |
     |________________|
        ||      ||
     __||______||___
    |  |_|____|_|  |
    \_/          \_/
`;

const TYPING_SPEED = 5; // ms per character
const RESTART_DELAY = 2000; // ms before restarting

export default function DeveloperMode() {
  const [index, setIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (index < asciiArt.length) {
      const timeout = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, TYPING_SPEED);
      return () => clearTimeout(timeout);
    } else {
      // Animation done, wait and reset
      const timeout = setTimeout(() => {
        setIndex(0);
      }, RESTART_DELAY);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  useEffect(() => {
    const blink = setInterval(() => {
      setShowCursor((c) => !c);
    }, 500);
    return () => clearInterval(blink);
  }, []);

  return (
    <pre className="text-xs text-green-500 font-mono whitespace-pre-wrap leading-tight">
      {asciiArt.slice(0, index)}
      {showCursor && <span className="animate-pulse">▊</span>}
    </pre>
  );
}
