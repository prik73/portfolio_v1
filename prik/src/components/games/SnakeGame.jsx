import { useEffect, useRef, useState, useCallback } from 'react';
import { useTheme } from '../../context/ThemeContext';

const CELL = 18;
const COLS = 20;
const ROWS = 20;
const CANVAS_SIZE = CELL * COLS; // 360px

const DIRS = {
  ArrowUp:    { x: 0,  y: -1 },
  ArrowDown:  { x: 0,  y:  1 },
  ArrowLeft:  { x: -1, y:  0 },
  ArrowRight: { x: 1,  y:  0 },
  w: { x: 0,  y: -1 }, W: { x: 0,  y: -1 },
  s: { x: 0,  y:  1 }, S: { x: 0,  y:  1 },
  a: { x: -1, y:  0 }, A: { x: -1, y:  0 },
  d: { x: 1,  y:  0 }, D: { x: 1,  y:  0 },
};


function randomFood(snake) {
  let pos;
  do {
    pos = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
  } while (snake.some(s => s.x === pos.x && s.y === pos.y));
  return pos;
}

// Parse hex color to rgb components
function hexToRgb(hex) {
  const h = hex.replace('#', '');
  const full = h.length === 3
    ? h.split('').map(c => c + c).join('')
    : h;
  const n = parseInt(full.slice(0, 6), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export default function SnakeGame() {
  const { themeColor } = useTheme();
  const canvasRef = useRef(null);
  const gameRef   = useRef(null);
  const rafRef    = useRef(null);

  const [status, setStatus]       = useState('idle');
  const [score, setScore]         = useState(0);
  const [highScore, setHighScore] = useState(() =>
    parseInt(localStorage.getItem('snake_hs') || '0', 10)
  );

  const bg = themeColor.backgroundColor;
  const fg = themeColor.textColor;

  const draw = useCallback((snake, food, ctx) => {
    const [fr, fg2, fb] = hexToRgb(fg);

    // ── background ──────────────────────────────────────────────────────────
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // subtle grid lines
    ctx.strokeStyle = `rgba(${fr},${fg2},${fb},0.06)`;
    ctx.lineWidth = 1;
    for (let x = 0; x <= COLS; x++) {
      ctx.beginPath();
      ctx.moveTo(x * CELL, 0);
      ctx.lineTo(x * CELL, CANVAS_SIZE);
      ctx.stroke();
    }
    for (let y = 0; y <= ROWS; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * CELL);
      ctx.lineTo(CANVAS_SIZE, y * CELL);
      ctx.stroke();
    }

    // ── food ────────────────────────────────────────────────────────────────
    const fx = food.x * CELL + CELL / 2;
    const fy = food.y * CELL + CELL / 2;
    // outer glow ring
    ctx.strokeStyle = `rgba(${fr},${fg2},${fb},0.25)`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(fx, fy, CELL / 2 - 2, 0, Math.PI * 2);
    ctx.stroke();
    // solid dot
    ctx.fillStyle = fg;
    ctx.beginPath();
    ctx.arc(fx, fy, CELL / 4, 0, Math.PI * 2);
    ctx.fill();

    // ── snake ───────────────────────────────────────────────────────────────
    snake.forEach((seg, i) => {
      const t     = 1 - i / (snake.length + 6);
      const alpha = i === 0 ? 1 : 0.25 + 0.75 * t;
      const pad  = i === 0 ? 2 : 4;
      const x    = seg.x * CELL + pad;
      const y    = seg.y * CELL + pad;
      const size = CELL - pad * 2;

      ctx.fillStyle = `rgba(${fr},${fg2},${fb},${alpha.toFixed(2)})`;
      ctx.fillRect(x, y, size, size);

      // head highlight
      if (i === 0) {
        ctx.fillStyle = `rgba(${fr},${fg2},${fb},0.18)`;
        ctx.fillRect(x + 2, y + 2, size / 2, size / 3);
      }
    });
  }, [bg, fg]);

  const startGame = useCallback(() => {
    const initSnake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
    gameRef.current = {
      snake:    initSnake,
      dir:      { x: 1, y: 0 },
      nextDir:  { x: 1, y: 0 },
      food:     randomFood(initSnake),
      score:    0,
      lastTime: null,
      speed:    150,
    };
    setScore(0);
    setStatus('playing');
  }, []);

  // game loop
  useEffect(() => {
    if (status !== 'playing') { cancelAnimationFrame(rafRef.current); return; }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const g   = gameRef.current;

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
          setStatus('dead');
          draw(g.snake, g.food, ctx);
          return;
        }
        const ate = head.x === g.food.x && head.y === g.food.y;
        const newSnake = [head, ...g.snake];
        if (!ate) newSnake.pop();
        else {
          g.food  = randomFood(newSnake);
          g.score += 10;
          g.speed  = Math.max(60, 150 - Math.floor(g.score / 50) * 10);
          setScore(g.score);
          setHighScore(prev => {
            const next = Math.max(prev, g.score);
            localStorage.setItem('snake_hs', String(next));
            return next;
          });
        }
        g.snake = newSnake;
      }
      draw(g.snake, g.food, ctx);
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [status, draw]);

  // redraw on theme / state change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const g   = gameRef.current;
    if (g && (status === 'paused' || status === 'dead')) {
      draw(g.snake, g.food, ctx);
    } else if (status === 'idle') {
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
  }, [bg, fg, status, draw]);

  // keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key) && status === 'playing')
        e.preventDefault();
      if (e.key === ' ' || e.key === 'Escape') {
        e.preventDefault();
        if (status === 'playing')              setStatus('paused');
        else if (status === 'paused')          setStatus('playing');
        else if (status === 'dead' || status === 'idle') startGame();
        return;
      }
      if (e.key === 'Enter') { if (status !== 'playing') startGame(); return; }
      const newDir = DIRS[e.key];
      if (!newDir || !gameRef.current) return;
      const { dir } = gameRef.current;
      if (newDir.x === -dir.x && newDir.y === -dir.y) return;
      gameRef.current.nextDir = newDir;
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [status, startGame]);

  const overlayText = {
    idle:   { title: 'SNAKE',     sub: 'Press Enter to start' },
    paused: { title: 'PAUSED',    sub: 'Space to resume' },
    dead:   { title: 'GAME OVER', sub: `Score: ${score}` },
  };
  const ov          = overlayText[status] || {};
  const showOverlay = status !== 'playing';

  return (
    <div className="flex flex-col items-center gap-5 select-none">

      {/* score bar */}
      <div className="flex gap-10 font-mono text-xs tracking-widest uppercase" style={{ color: fg + '77' }}>
        <span>Score <span className="font-bold" style={{ color: fg }}>{score}</span></span>
        <span>Best  <span className="font-bold" style={{ color: fg }}>{highScore}</span></span>
      </div>

      {/* canvas */}
      <div
        className="relative"
        style={{
          width:     CANVAS_SIZE,
          height:    CANVAS_SIZE,
          boxShadow: `0 0 0 1px ${fg}22, 0 8px 32px ${fg}18`,
        }}
      >
        <canvas ref={canvasRef} width={CANVAS_SIZE} height={CANVAS_SIZE} style={{ display: 'block' }} />

        {showOverlay && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-5"
            style={{ backgroundColor: bg + 'd0', backdropFilter: 'blur(6px)' }}
          >
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: fg + '55' }}>
              {status === 'idle' ? 'ready' : status}
            </p>
            <h2 className="font-mono text-4xl font-bold tracking-widest" style={{ color: fg }}>
              {ov.title}
            </h2>
            {ov.sub && (
              <p className="font-mono text-xs" style={{ color: fg + '88' }}>{ov.sub}</p>
            )}
            <button
              onClick={startGame}
              className="mt-1 px-8 py-2 font-mono text-xs tracking-widest uppercase transition-all duration-150 hover:opacity-70"
              style={{ border: `1px solid ${fg}`, color: fg, backgroundColor: 'transparent' }}
            >
              {status === 'dead' ? 'Restart' : 'Start'}
            </button>
          </div>
        )}
      </div>



      {/* mobile d-pad */}
      <div className="flex flex-col items-center gap-1 md:hidden">
        {[['ArrowUp','▲']].map(([key, label]) => (
          <button key={key}
            onClick={() => { const g = gameRef.current; if (!g) return; const d = DIRS[key]; if (d.x !== -g.dir.x || d.y !== -g.dir.y) g.nextDir = d; }}
            className="w-11 h-11 flex items-center justify-center font-mono transition-opacity active:opacity-40"
            style={{ border: `1px solid ${fg}33`, color: fg, backgroundColor: bg }}
          >{label}</button>
        ))}
        <div className="flex gap-1">
          {[['ArrowLeft','◀'],['ArrowDown','▼'],['ArrowRight','▶']].map(([key, label]) => (
            <button key={key}
              onClick={() => { const g = gameRef.current; if (!g) return; const d = DIRS[key]; if (d.x !== -g.dir.x || d.y !== -g.dir.y) g.nextDir = d; }}
              className="w-11 h-11 flex items-center justify-center font-mono transition-opacity active:opacity-40"
              style={{ border: `1px solid ${fg}33`, color: fg, backgroundColor: bg }}
            >{label}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
