import { useEffect, useRef, useState, useCallback } from 'react';
import { useTheme } from '../../context/ThemeContext';

const CELL = 10;
const COLS = 14;
const ROWS = 14;
const W = CELL * COLS; // 180px
const H = CELL * ROWS; // 180px

const DIRS = {
  ArrowUp:    { x: 0,  y: -1 },
  ArrowDown:  { x: 0,  y:  1 },
  ArrowLeft:  { x: -1, y:  0 },
  ArrowRight: { x: 1,  y:  0 },
  w: { x: 0, y: -1 }, W: { x: 0, y: -1 },
  s: { x: 0, y:  1 }, S: { x: 0, y:  1 },
  a: { x: -1, y: 0 }, A: { x: -1, y: 0 },
  d: { x: 1,  y: 0 }, D: { x: 1,  y: 0 },
};

function randomFood(snake) {
  let pos;
  do {
    pos = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
  } while (snake.some(s => s.x === pos.x && s.y === pos.y));
  return pos;
}


export default function CornerSnake() {
  const { themeColor } = useTheme();
  const canvasRef = useRef(null);
  const gameRef = useRef(null);
  const rafRef = useRef(null);
  const [mode, setMode] = useState('auto');   // 'auto' | 'player' | 'dead'
  const [score, setScore] = useState(0);
  const [collapsed, setCollapsed] = useState(false);

  const bg  = themeColor.backgroundColor;
  const fg  = themeColor.textColor;

  const draw = useCallback((snake, food, ctx) => {
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // subtle grid
    ctx.fillStyle = fg + '12';
    for (let x = 0; x < COLS; x++)
      for (let y = 0; y < ROWS; y++)
        ctx.fillRect(x * CELL + CELL / 2 - 1, y * CELL + CELL / 2 - 1, 1.5, 1.5);

    // food
    ctx.fillStyle = fg;
    ctx.fillRect(food.x * CELL + 3, food.y * CELL + 3, CELL - 6, CELL - 6);

    // snake
    snake.forEach((seg, i) => {
      const ratio = 1 - i / (snake.length + 4);
      ctx.fillStyle = fg + Math.round(ratio * 255).toString(16).padStart(2, '0');
      const pad = i === 0 ? 1 : 2;
      ctx.fillRect(seg.x * CELL + pad, seg.y * CELL + pad, CELL - pad * 2, CELL - pad * 2);
    });
  }, [bg, fg]);

  const initGame = useCallback(() => {
    const snake = [
      { x: 9, y: 9 }, { x: 8, y: 9 }, { x: 7, y: 9 }
    ];
    gameRef.current = {
      snake,
      dir:     { x: 1, y: 0 },
      nextDir: { x: 1, y: 0 },
      food:    randomFood(snake),
      score:   0,
      lastTime: null,
      speed:   160,
    };
    setScore(0);
  }, []);

  // Start auto-play immediately on mount
  useEffect(() => {
    initGame();
    setMode('auto');
  }, [initGame]);

  // Main game loop
  useEffect(() => {
    if (!gameRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const g = gameRef.current;
    if (collapsed) {
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);
      return;
    }

    cancelAnimationFrame(rafRef.current);

    if (mode === 'dead') {
      draw(g.snake, g.food, ctx);
      return;
    }

    const loop = (ts) => {
      if (!g.lastTime) g.lastTime = ts;
      if (ts - g.lastTime >= g.speed) {
        g.lastTime = ts;

        g.dir = { ...g.nextDir };
        const head = {
          x: (g.snake[0].x + g.dir.x + COLS) % COLS,
          y: (g.snake[0].y + g.dir.y + ROWS) % ROWS,
        };

        if (g.snake.some(s => s.x === head.x && s.y === head.y)) {
          if (mode === 'player') {
            setMode('dead');
          } else {
            initGame(); // auto mode — restart quietly and keep going
          }
          draw(g.snake, g.food, ctx);
          return;
        }

        const ate = head.x === g.food.x && head.y === g.food.y;
        const newSnake = [head, ...g.snake];
        if (!ate) newSnake.pop();
        else {
          g.food = randomFood(newSnake);
          g.score += 10;
          g.speed = Math.max(80, 160 - Math.floor(g.score / 60) * 10);
          setScore(g.score);
        }
        g.snake = newSnake;
      }

      draw(g.snake, g.food, ctx);
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [mode, collapsed, draw, initGame, bg]);

  // Redraw on theme change
  useEffect(() => {
    if (!gameRef.current || collapsed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    draw(gameRef.current.snake, gameRef.current.food, canvas.getContext('2d'));
  }, [bg, fg, draw, collapsed]);

  // Keyboard controls (only active in player mode)
  useEffect(() => {
    if (mode !== 'player') return;
    const onKey = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }
      const newDir = DIRS[e.key];
      if (!newDir || !gameRef.current) return;
      const { dir } = gameRef.current;
      if (newDir.x === -dir.x && newDir.y === -dir.y) return;
      gameRef.current.nextDir = newDir;
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mode]);

  const handleCanvasClick = () => {
    if (collapsed) return;
    if (mode === 'auto') {
      setMode('player');
    } else if (mode === 'dead') {
      initGame();
      setMode('player');
    }
  };

  if (collapsed) {
    return (
      <button
        onClick={() => setCollapsed(false)}
        title="Play Snake"
        className="fixed bottom-6 left-6 z-40 w-10 h-10 flex items-center justify-center transition-opacity hover:opacity-70"
        style={{
          border: `1px solid ${fg}44`,
          backgroundColor: bg,
          color: fg,
          fontSize: '18px',
        }}
      >
        ▶
      </button>
    );
  }

  return (
    <div
      className="fixed bottom-6 left-6 z-40 flex flex-col"
      style={{
        border: `1px solid ${fg}33`,
        backgroundColor: bg,
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center justify-between px-2 py-1"
        style={{ borderBottom: `1px solid ${fg}22` }}
      >
        <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: fg + '66' }}>
          snake {mode === 'auto' ? '· ai' : mode === 'dead' ? '· dead' : `· ${score}`}
        </span>
        <button
          onClick={() => setCollapsed(true)}
          className="font-mono text-[10px] leading-none transition-opacity hover:opacity-50 pl-3"
          style={{ color: fg + '66' }}
          title="Minimize"
        >
          ✕
        </button>
      </div>

      {/* Canvas */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          onClick={handleCanvasClick}
          style={{ display: 'block', cursor: mode === 'player' ? 'default' : 'pointer' }}
        />

        {/* "click to play" hint — only in auto mode */}
        {mode === 'auto' && (
          <div
            className="absolute inset-0 flex items-end justify-center pb-2 pointer-events-none"
          >
            <span
              className="font-mono text-[9px] tracking-widest uppercase px-2 py-0.5"
              style={{
                color: fg + '77',
                backgroundColor: bg + 'cc',
              }}
            >
              click to play
            </span>
          </div>
        )}

        {/* Dead overlay */}
        {mode === 'dead' && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-1 cursor-pointer"
            onClick={handleCanvasClick}
            style={{ backgroundColor: bg + 'cc' }}
          >
            <span className="font-mono text-xs font-bold tracking-widest" style={{ color: fg }}>
              GAME OVER
            </span>
            <span className="font-mono text-[10px]" style={{ color: fg + '88' }}>
              score {score} · click to retry
            </span>
          </div>
        )}
      </div>

      {/* Controls hint in player mode */}
      {mode === 'player' && (
        <div
          className="px-2 py-1 font-mono text-[9px] tracking-wider text-center"
          style={{ color: fg + '44', borderTop: `1px solid ${fg}11` }}
        >
          WASD / ↑↓←→
        </div>
      )}
    </div>
  );
}
