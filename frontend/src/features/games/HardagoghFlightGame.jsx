import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Sparkles, Trophy, RotateCcw, Info, Volume2, Flame } from 'lucide-react';
import { gameAudio } from './gameAudio';

export default function HardagoghFlightGame({ t }) {
  const f = t.games.flight;
  const canvasRef = useRef(null);

  const [gameState, setGameState] = useState('ready');
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    try {
      return parseInt(localStorage.getItem('vahagn_hardagogh_best') || '0', 10);
    } catch {
      return 0;
    }
  });
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [showStory, setShowStory] = useState(false);

  const stateRef = useRef({
    gameState: 'ready',
    score: 0,
    bestScore: 0,
    vahagn: {
      x: 140,
      y: 240,
      vy: 0,
      radius: 18,
      rotation: 0,
      flapTimer: 0
    },
    gravity: 0.38,
    jumpForce: -7.2,
    pillars: [],
    straws: [],
    particles: [],
    stars: [],
    mountains: [],
    bgOffset: 0,
    pillarTimer: 0,
    gameSpeed: 2.8,
    shake: 0
  });

  stateRef.current.bestScore = bestScore;

  const initWorld = useCallback((w, h) => {
    const stars = [];
    for (let i = 0; i < 70; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * (h * 0.75),
        radius: Math.random() * 1.8 + 0.5,
        alpha: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.03 + 0.01
      });
    }

    const mountains = [];
    mountains.push({
      x: w * 0.3,
      baseY: h,
      height: h * 0.38,
      width: 220,
      name: 'Masis'
    });
    mountains.push({
      x: w * 0.65,
      baseY: h,
      height: h * 0.28,
      width: 160,
      name: 'Sis'
    });

    stateRef.current.stars = stars;
    stateRef.current.mountains = mountains;
    stateRef.current.pillars = [];
    stateRef.current.straws = [];
    stateRef.current.particles = [];
    stateRef.current.vahagn.y = h * 0.45;
    stateRef.current.vahagn.vy = 0;
    stateRef.current.pillarTimer = 0;
    stateRef.current.gameSpeed = 2.8;
  }, []);

  const triggerJump = useCallback(() => {
    const s = stateRef.current;
    if (s.gameState === 'ready') {
      s.gameState = 'playing';
      setGameState('playing');
      s.score = 0;
      setScore(0);
      setIsNewRecord(false);
      gameAudio.playFlap();
      s.vahagn.vy = s.jumpForce;
      s.vahagn.flapTimer = 12;
      return;
    }

    if (s.gameState === 'playing') {
      s.vahagn.vy = s.jumpForce;
      s.vahagn.flapTimer = 12;
      gameAudio.playFlap();

      for (let i = 0; i < 5; i++) {
        s.particles.push({
          x: s.vahagn.x - 10,
          y: s.vahagn.y + (Math.random() * 10 - 5),
          vx: -(Math.random() * 2 + 1),
          vy: Math.random() * 3 - 1.5,
          radius: Math.random() * 3 + 2,
          life: 1,
          decay: 0.04,
          color: Math.random() > 0.4 ? '#ffd700' : '#ff7a00'
        });
      }
    }
  }, []);

  const handleRestart = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    initWorld(canvas.width, canvas.height);
    stateRef.current.gameState = 'playing';
    setGameState('playing');
    stateRef.current.score = 0;
    setScore(0);
    setIsNewRecord(false);
    stateRef.current.vahagn.vy = stateRef.current.jumpForce;
    stateRef.current.vahagn.flapTimer = 12;
    gameAudio.playFlap();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const handleResize = () => {
      const container = canvas.parentElement;
      const w = Math.min(container.clientWidth || 880, 880);
      const h = Math.min(window.innerHeight * 0.62, 540);
      canvas.width = Math.max(w, 320);
      canvas.height = Math.max(h, 420);
      initWorld(canvas.width, canvas.height);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const onKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        triggerJump();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    const loop = () => {
      const s = stateRef.current;
      const w = canvas.width;
      const h = canvas.height;

      ctx.save();
      if (s.shake > 0) {
        const shakeX = (Math.random() - 0.5) * s.shake;
        const shakeY = (Math.random() - 0.5) * s.shake;
        ctx.translate(shakeX, shakeY);
        s.shake = Math.max(0, s.shake - 0.7);
      }

      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, '#040208');
      grad.addColorStop(0.55, '#120b22');
      grad.addColorStop(1, '#1b122e');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      for (let star of s.stars) {
        star.alpha += Math.sin(Date.now() * star.twinkleSpeed) * 0.015;
        star.alpha = Math.max(0.15, Math.min(0.95, star.alpha));
        ctx.fillStyle = `rgba(255, 235, 170, ${star.alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let m of s.mountains) {
        const mx = ((m.x - s.bgOffset * 0.25) % (w + m.width * 2)) - m.width * 0.5;
        ctx.fillStyle = '#0a0714';
        ctx.beginPath();
        ctx.moveTo(mx - m.width, m.baseY);
        ctx.lineTo(mx, m.baseY - m.height);
        ctx.lineTo(mx + m.width, m.baseY);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = 'rgba(212, 175, 55, 0.2)';
        ctx.beginPath();
        ctx.moveTo(mx - m.width * 0.25, m.baseY - m.height * 0.75);
        ctx.lineTo(mx, m.baseY - m.height);
        ctx.lineTo(mx + m.width * 0.25, m.baseY - m.height * 0.75);
        ctx.closePath();
        ctx.fill();
      }

      if (s.gameState === 'playing') {
        s.bgOffset += s.gameSpeed;
        s.gameSpeed = 2.8 + Math.min(2.5, s.score * 0.08);

        s.vahagn.vy += s.gravity;
        s.vahagn.y += s.vahagn.vy;

        s.vahagn.rotation = Math.max(-0.45, Math.min(0.65, s.vahagn.vy * 0.06));
        if (s.vahagn.flapTimer > 0) s.vahagn.flapTimer--;

        if (Math.random() > 0.15) {
          s.particles.push({
            x: s.vahagn.x - 14,
            y: s.vahagn.y + (Math.random() * 8 - 4),
            vx: -(s.gameSpeed * 0.75 + Math.random() * 1.5),
            vy: Math.random() * 1.2 - 0.6,
            radius: Math.random() * 3.5 + 1.5,
            life: 1,
            decay: 0.02,
            color: Math.random() > 0.4 ? '#ffd700' : '#ff9500'
          });
        }

        s.pillarTimer++;
        if (s.pillarTimer >= 105) {
          s.pillarTimer = 0;
          const gap = Math.max(145, 185 - s.score * 1.2);
          const topHeight = Math.random() * (h - gap - 120) + 50;
          const bottomY = topHeight + gap;
          const bottomHeight = h - bottomY;
          const pillarX = w + 40;

          s.pillars.push({
            x: pillarX,
            width: 58,
            topHeight,
            bottomY,
            bottomHeight,
            passed: false
          });

          if (Math.random() > 0.25) {
            s.straws.push({
              x: pillarX + 29,
              y: topHeight + gap / 2 + (Math.random() * 40 - 20),
              radius: 12,
              collected: false,
              pulse: 0
            });
          }
        }

        if (s.vahagn.y + s.vahagn.radius >= h || s.vahagn.y - s.vahagn.radius <= 0) {
          triggerGameOver();
        }

        for (let i = s.pillars.length - 1; i >= 0; i--) {
          const p = s.pillars[i];
          p.x -= s.gameSpeed;

          const vx = s.vahagn.x;
          const vy = s.vahagn.y;
          const vr = s.vahagn.radius - 3;

          const inPillarX = vx + vr > p.x && vx - vr < p.x + p.width;
          const hitTop = vy - vr < p.topHeight;
          const hitBottom = vy + vr > p.bottomY;

          if (inPillarX && (hitTop || hitBottom)) {
            triggerGameOver();
            break;
          }

          if (!p.passed && p.x + p.width < s.vahagn.x) {
            p.passed = true;
            s.score += 1;
            setScore(s.score);
          }

          if (p.x + p.width < -50) {
            s.pillars.splice(i, 1);
          }
        }

        for (let i = s.straws.length - 1; i >= 0; i--) {
          const st = s.straws[i];
          st.x -= s.gameSpeed;
          st.pulse += 0.08;

          const dx = s.vahagn.x - st.x;
          const dy = s.vahagn.y - st.y;
          const dist = Math.hypot(dx, dy);

          if (dist < s.vahagn.radius + st.radius + 6 && !st.collected) {
            st.collected = true;
            s.score += 2;
            setScore(s.score);
            gameAudio.playStrawCollect();

            for (let k = 0; k < 12; k++) {
              const ang = (Math.PI * 2 * k) / 12;
              const spd = Math.random() * 3 + 2;
              s.particles.push({
                x: st.x,
                y: st.y,
                vx: Math.cos(ang) * spd,
                vy: Math.sin(ang) * spd,
                radius: Math.random() * 3 + 2,
                life: 1,
                decay: 0.035,
                color: '#fff37a'
              });
            }
            s.straws.splice(i, 1);
            continue;
          }

          if (st.x < -40) {
            s.straws.splice(i, 1);
          }
        }
      }

      for (let p of s.pillars) {
        drawBasaltPillar(ctx, p.x, 0, p.width, p.topHeight, true);
        drawBasaltPillar(ctx, p.x, p.bottomY, p.width, p.bottomHeight, false);
      }

      for (let st of s.straws) {
        drawStrawBundle(ctx, st.x, st.y, st.radius, st.pulse);
      }

      for (let i = s.particles.length - 1; i >= 0; i--) {
        const pt = s.particles[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.life -= pt.decay;

        if (pt.life <= 0) {
          s.particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, pt.life);
        ctx.fillStyle = pt.color;
        ctx.shadowColor = pt.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.radius * pt.life, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      drawVahagn(ctx, s.vahagn.x, s.vahagn.y, s.vahagn.rotation, s.vahagn.flapTimer);

      ctx.restore();
      animId = requestAnimationFrame(loop);
    };

    function triggerGameOver() {
      const s = stateRef.current;
      if (s.gameState === 'gameover') return;
      s.gameState = 'gameover';
      setGameState('gameover');
      s.shake = 18;
      gameAudio.playHit();
      gameAudio.playDefeat();

      if (s.score > s.bestScore) {
        s.bestScore = s.score;
        setBestScore(s.score);
        setIsNewRecord(true);
        try {
          localStorage.setItem('vahagn_hardagogh_best', s.score.toString());
        } catch {
        }
        setTimeout(() => gameAudio.playVictory(), 350);
      }
    }

    function drawBasaltPillar(c, x, y, width, height, isTop) {
      const pGrad = c.createLinearGradient(x, 0, x + width, 0);
      pGrad.addColorStop(0, '#1a1424');
      pGrad.addColorStop(0.3, '#2a2038');
      pGrad.addColorStop(0.7, '#241a32');
      pGrad.addColorStop(1, '#0e0915');

      c.fillStyle = pGrad;
      c.fillRect(x, y, width, height);

      c.strokeStyle = 'rgba(212, 175, 55, 0.45)';
      c.lineWidth = 1.5;
      c.strokeRect(x, y, width, height);

      const capHeight = 12;
      const capY = isTop ? y + height - capHeight : y;
      const capGrad = c.createLinearGradient(x, 0, x + width, 0);
      capGrad.addColorStop(0, '#d4af37');
      capGrad.addColorStop(0.5, '#fff1a8');
      capGrad.addColorStop(1, '#b8860b');

      c.fillStyle = capGrad;
      c.fillRect(x - 2, capY, width + 4, capHeight);

      c.strokeStyle = 'rgba(255, 215, 0, 0.25)';
      c.beginPath();
      c.moveTo(x + width * 0.35, y);
      c.lineTo(x + width * 0.35, y + height);
      c.moveTo(x + width * 0.7, y);
      c.lineTo(x + width * 0.7, y + height);
      c.stroke();
    }

    function drawStrawBundle(c, x, y, radius, pulse) {
      c.save();
      c.translate(x, y);

      const glow = Math.sin(pulse) * 4 + 10;
      c.shadowColor = '#ffd700';
      c.shadowBlur = glow;

      c.fillStyle = '#ffd700';
      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
        c.save();
        c.rotate(angle);
        c.fillRect(-2, -radius, 4, radius * 2);
        c.restore();
      }

      c.fillStyle = '#fff4a3';
      c.beginPath();
      c.arc(0, 0, radius * 0.55, 0, Math.PI * 2);
      c.fill();

      c.restore();
    }

    function drawVahagn(c, x, y, rotation, flapTimer) {
      c.save();
      c.translate(x, y);
      c.rotate(rotation);

      c.shadowColor = '#ff8c00';
      c.shadowBlur = 18;
      const auraGrad = c.createRadialGradient(0, 0, 6, 0, 0, 24);
      auraGrad.addColorStop(0, 'rgba(255, 215, 0, 0.85)');
      auraGrad.addColorStop(0.6, 'rgba(255, 120, 0, 0.45)');
      auraGrad.addColorStop(1, 'rgba(255, 60, 0, 0)');
      c.fillStyle = auraGrad;
      c.beginPath();
      c.arc(0, 0, 24, 0, Math.PI * 2);
      c.fill();

      const wingSpan = flapTimer > 0 ? -14 : 6;
      c.fillStyle = '#ff7700';
      c.beginPath();
      c.moveTo(-10, 0);
      c.quadraticCurveTo(-24, wingSpan, -30, wingSpan * 0.5);
      c.quadraticCurveTo(-20, 4, -10, 8);
      c.closePath();
      c.fill();

      c.fillStyle = '#ffd700';
      c.beginPath();
      c.moveTo(-6, 2);
      c.quadraticCurveTo(-18, wingSpan * 0.8, -22, wingSpan * 0.4);
      c.quadraticCurveTo(-14, 4, -6, 6);
      c.closePath();
      c.fill();

      c.fillStyle = '#b91c1c';
      c.beginPath();
      c.arc(-2, 2, 13, 0, Math.PI * 2);
      c.fill();

      c.fillStyle = '#d4af37';
      c.beginPath();
      c.arc(-2, 2, 9, 0, Math.PI * 2);
      c.fill();

      c.fillStyle = '#ffedd5';
      c.beginPath();
      c.arc(5, -4, 8, 0, Math.PI * 2);
      c.fill();

      c.fillStyle = '#ef4444';
      c.beginPath();
      c.moveTo(2, -10);
      c.quadraticCurveTo(-6, -16, -14, -10);
      c.quadraticCurveTo(-8, -4, 0, -4);
      c.closePath();
      c.fill();

      c.fillStyle = '#111827';
      c.beginPath();
      c.arc(7, -4, 1.8, 0, Math.PI * 2);
      c.fill();

      c.fillStyle = '#eab308';
      c.fillRect(4, 3, 10, 5);
      c.fillRect(8, 0, 8, 4);

      c.restore();
    }

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [initWorld, triggerJump]);

  return (
    <div className="flight-game-wrapper">
      <div className="flight-hud-bar">
        <div className="hud-badge score-badge">
          <Sparkles size={16} color="#ffd700" />
          <span className="badge-label">{f.score}:</span>
          <span className="badge-value">{score}</span>
        </div>

        <div className="flight-game-title">
          <Flame size={18} color="#f59e0b" />
          <span>{f.title}</span>
        </div>

        <div className="hud-badge best-badge">
          <Trophy size={16} color="#f59e0b" />
          <span className="badge-label">{f.bestScore}:</span>
          <span className="badge-value">{bestScore}</span>
        </div>
      </div>

      <div
        className="canvas-stage"
        onClick={triggerJump}
        role="button"
        tabIndex={0}
        aria-label="Flight Arena"
      >
        <canvas ref={canvasRef} className="flight-canvas" />

        {gameState === 'ready' && (
          <div className="flight-overlay ready-overlay">
            <div className="overlay-box">
              <div className="legend-icon-wrap">
                <Sparkles size={36} color="#ffd700" />
              </div>
              <h2 className="overlay-heading">{f.title}</h2>
              <p className="overlay-sub">{f.subtitle}</p>

              <button
                type="button"
                className="btn-start-flight"
                onClick={(e) => {
                  e.stopPropagation();
                  triggerJump();
                }}
              >
                {f.touchJump} ➔
              </button>
              <span className="overlay-hint">{f.instructions}</span>

              <button
                type="button"
                className="btn-legend-toggle"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowStory(!showStory);
                }}
              >
                <Info size={14} />
                <span>{f.legendTitle}</span>
              </button>

              {showStory && (
                <div className="story-content-box">
                  <p>{f.legendText}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {gameState === 'gameover' && (
          <div className="flight-overlay gameover-overlay">
            <div className="overlay-box">
              <h2 className="overlay-heading gameover-heading">{f.gameOverTitle}</h2>
              <p className="overlay-sub">{f.gameOverDesc}</p>

              <div className="gameover-stats">
                <div className="stat-row">
                  <span>{f.score}</span>
                  <strong>{score}</strong>
                </div>
                <div className="stat-row">
                  <span>{f.bestScore}</span>
                  <strong>{bestScore}</strong>
                </div>
                {isNewRecord && (
                  <div className="new-record-pill">
                    ★ NEW RECORD! ★
                  </div>
                )}
              </div>

              <button
                type="button"
                className="btn-restart-flight"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRestart();
                }}
              >
                <RotateCcw size={16} />
                <span>{f.restart}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flight-bottom-controls">
        <button
          type="button"
          className="btn-mobile-jump"
          onClick={triggerJump}
        >
          <Flame size={18} />
          <span>{f.touchJump}</span>
        </button>
        <span className="desktop-controls-hint">
          ⌨️ {f.instructions}
        </span>
      </div>
    </div>
  );
}
