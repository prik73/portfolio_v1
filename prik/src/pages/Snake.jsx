import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useTransition } from '../context/TransitionContext';
import ThemeToggle from '../components/ui/ThemeToggle';
import SnakeGame from '../components/games/SnakeGame';


const GRID_WIDTH = 40;
const SNAKE_CELL = 1;
const FOOD_CELL  = 2;
const UP    = { x: 0,  y: -1 };
const DOWN  = { x: 0,  y:  1 };
const LEFT  = { x: -1, y:  0 };
const RIGHT = { x: 1,  y:  0 };
const INITIAL_LEN = 4;
const BRAILLE_SPACE = '\u2800';

function cellAt(grid, x, y)       { return grid[x % GRID_WIDTH + y * GRID_WIDTH]; }
function setCellAt(grid, x, y, v) { grid[x % GRID_WIDTH + y * GRID_WIDTH] = v; }

function gridString(grid) {
  let str = '';
  for (let x = 0; x < GRID_WIDTH; x += 2) {
    const n = 0
      | (cellAt(grid, x,   0) ? 1 : 0) << 0
      | (cellAt(grid, x,   1) ? 1 : 0) << 1
      | (cellAt(grid, x,   2) ? 1 : 0) << 2
      | (cellAt(grid, x+1, 0) ? 1 : 0) << 3
      | (cellAt(grid, x+1, 1) ? 1 : 0) << 4
      | (cellAt(grid, x+1, 2) ? 1 : 0) << 5
      | (cellAt(grid, x,   3) ? 1 : 0) << 6
      | (cellAt(grid, x+1, 3) ? 1 : 0) << 7;
    str += String.fromCharCode(0x2800 + n);
  }
  return str;
}

function dropFood(grid, snake) {
  const empty = grid.length - snake.length;
  if (!empty) return;
  let drop = Math.floor(Math.random() * empty);
  for (let i = 0; i < grid.length; i++) {
    if (grid[i] === SNAKE_CELL) continue;
    if (drop === 0) { grid[i] = FOOD_CELL; break; }
    drop--;
  }
}

function tickTime(snake, grid) {
  return 125 + snake.length * (75 - 125) / grid.length;
}

function detectWsChar() {
  history.replaceState(null, null, '#' + BRAILLE_SPACE + BRAILLE_SPACE);
  if (location.hash.indexOf(BRAILLE_SPACE) !== -1) return null;
  const candidates = [['૟', 'strange symbols'], ['⟋', 'weird slashes']];
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.font = '30px system-ui';
  const N = 5;
  const tw = ctx.measureText(BRAILLE_SPACE.repeat(N)).width;
  for (const [char] of candidates) {
    const w = ctx.measureText(char.repeat(N)).width;
    if (Math.abs(tw - w) / tw > 0.1) continue;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillText(char.repeat(N), 0, 30);
    const px = ctx.getImageData(0, 0, w, 30).data;
    let colored = 0;
    for (let j = 0; j < px.length / 4; j++) if (px[j*4+3]) colored++;
    if (colored / (px.length / 4) < 0.15) return char;
  }
  return '░';
}

// ─── component ────────────────────────────────────────────────────────────────
export default function Snake() {
  const { themeColor } = useTheme();
  const { startTransition } = useTransition();
  const [boardOpen, setBoardOpen] = useState(false);
  const stateRef = useRef(null);
  const fg = themeColor.textColor;
  const bg = themeColor.backgroundColor;

  // URL snake — always running while on this page
  useEffect(() => {
    const wsChar = detectWsChar();

    function makeState() {
      const grid  = new Array(GRID_WIDTH * 4).fill(null);
      const snake = [];
      for (let x = 0; x < INITIAL_LEN; x++) {
        snake.unshift({ x, y: 2 });
        setCellAt(grid, x, 2, SNAKE_CELL);
      }
      dropFood(grid, snake);
      return { grid, snake, dir: RIGHT, moveQueue: [], hasMoved: false, paused: false, lastTime: null };
    }

    stateRef.current = makeState();

    function draw() {
      const { grid, snake } = stateRef.current;
      const score = snake.length - INITIAL_LEN;
      let hash = '#|' + gridString(grid) + '|[score:' + score + ']';
      if (wsChar) hash = hash.replace(/\u2800/g, wsChar);
      history.replaceState(null, null, hash);
      if (decodeURIComponent(location.hash) !== hash) location.hash = hash;
    }

    function update() {
      const s = stateRef.current;
      if (s.moveQueue.length) s.dir = s.moveQueue.pop();
      const head = s.snake[0];
      const tail = s.snake[s.snake.length - 1];
      const nx = (head.x + s.dir.x + GRID_WIDTH) % GRID_WIDTH;
      const ny = (head.y + s.dir.y + 4) % 4;
      const selfHit = cellAt(s.grid, nx, ny) === SNAKE_CELL && !(nx === tail.x && ny === tail.y);
      if (selfHit) {
        const score = s.snake.length - INITIAL_LEN;
        const best  = parseInt(localStorage.snakeBest || 0);
        if (score > best && s.hasMoved) localStorage.snakeBest = score;
        stateRef.current = makeState();
        return;
      }
      const ate = cellAt(s.grid, nx, ny) === FOOD_CELL;
      if (!ate) { s.snake.pop(); setCellAt(s.grid, tail.x, tail.y, null); }
      setCellAt(s.grid, nx, ny, SNAKE_CELL);
      s.snake.unshift({ x: nx, y: ny });
      if (ate) dropFood(s.grid, s.snake);
    }

    const dirMap = {
      ArrowLeft: LEFT, ArrowRight: RIGHT, ArrowUp: UP, ArrowDown: DOWN,
      a: LEFT, d: RIGHT, w: UP, s: DOWN,
      A: LEFT, D: RIGHT, W: UP, S: DOWN,
    };

    function onKey(e) {
      const s = stateRef.current;
      if (!s) return;
      const d = dirMap[e.key];
      if (d) {
        e.preventDefault();
        const last = s.moveQueue[0] || s.dir;
        if (d.x + last.x !== 0 || d.y + last.y !== 0) s.moveQueue.unshift(d);
        s.hasMoved = true;
      }
    }

    function onBlur()  { if (stateRef.current) stateRef.current.paused = true; }
    function onFocus() { if (stateRef.current) { stateRef.current.paused = false; stateRef.current.lastTime = null; } }

    window.addEventListener('keydown', onKey);
    window.addEventListener('blur',    onBlur);
    window.addEventListener('focus',   onFocus);

    let rafId;
    function loop(ts) {
      const s = stateRef.current;
      if (!s.paused) {
        if (!s.lastTime) s.lastTime = ts;
        if (ts - s.lastTime >= tickTime(s.snake, s.grid)) {
          update();
          draw();
          stateRef.current.lastTime = ts;
        }
      }
      rafId = requestAnimationFrame(loop);
    }
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('blur',    onBlur);
      window.removeEventListener('focus',   onFocus);
      history.replaceState(null, null, '/snake');
    };
  }, []);

  const handleBack = (e) => {
    e.preventDefault();
    startTransition(e.clientX, e.clientY, '/');
  };

  const best = parseInt(typeof localStorage !== 'undefined' ? localStorage.snakeBest || 0 : 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 gap-10"
      style={{ backgroundColor: bg, color: fg }}
    >
      <ThemeToggle />

      <a
        href="/"
        onClick={handleBack}
        className="fixed top-6 left-8 font-mono text-sm tracking-widest uppercase transition-opacity hover:opacity-50"
        style={{ color: fg }}
      >
        ← back
      </a>

      {/* URL snake info */}
      <div className="flex flex-col items-center gap-3 text-center">
        <h1 className="font-mono text-4xl font-bold tracking-widest uppercase" style={{ color: fg }}>
          URL Snake
        </h1>
        <p className="font-mono text-sm" style={{ color: fg + '88' }}>
          The game is running in your address bar ↑
        </p>
        <p className="font-mono text-xs tracking-wider" style={{ color: fg + '88' }}>
          WASD / ↑↓←→ to move
        </p>
        {best > 0 && (
          <p className="font-mono text-xs tracking-widest" style={{ color: fg }}>
            best score: {best}
          </p>
        )}
      </div>

      {/* Triangle → canvas board */}
      <div className="flex flex-col items-center gap-3">
        <button
          onClick={() => setBoardOpen(v => !v)}
          className="transition-opacity hover:opacity-60"
          title={boardOpen ? 'Close board' : 'Play on board'}
          style={{ background: 'none', border: 'none', padding: 0 }}
        >
          <motion.svg
            width="56"
            height="56"
            viewBox="0 0 72 72"
            animate={{ rotate: boardOpen ? 90 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <polygon points="14,8 14,64 62,36" fill={fg} />
          </motion.svg>
        </button>
        <p className="font-mono text-xs tracking-widest" style={{ color: fg + '66' }}>
          {boardOpen ? 'click to close board' : 'click to play on board'}
        </p>
      </div>

      {/* Canvas game board */}
      <AnimatePresence>
        {boardOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <SnakeGame />
          </motion.div>
        )}
      </AnimatePresence>

      <p className="fixed bottom-6 font-mono text-xs tracking-widest" style={{ color: fg + '88' }}>
        original concept by{' '}
        <a
          href="https://github.com/epidemian/snake"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:opacity-60 transition-opacity"
          style={{ color: fg }}
        >
          epidemian
        </a>
      </p>
    </motion.div>
  );
}
