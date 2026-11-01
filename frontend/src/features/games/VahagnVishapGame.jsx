import React, { useRef, useEffect, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { gameAudio } from './gameAudio';
import { Zap, Shield, Skull, RotateCcw, Volume2, VolumeX, Sparkles } from 'lucide-react';

export default function VahagnVishapGame({ t, language }) {
  const canvasRef = useRef(null);

  const [gameState, setGameState] = useState('playing');
  const [playerHp, setPlayerHp] = useState(100);
  const [maxPlayerHp] = useState(100);
  const [playerShield, setPlayerShield] = useState(0);
  const [bossHp, setBossHp] = useState(320);
  const [maxBossHp] = useState(320);
  const [isPhase2, setIsPhase2] = useState(false);
  const [score, setScore] = useState(0);
  const [gameTime, setGameTime] = useState(0);

  const [cdAramazd, setCdAramazd] = useState(0);
  const [cdAnahit, setCdAnahit] = useState(0);
  const [cdDevil, setCdDevil] = useState(0);

  const engineRef = useRef({
    keys: {},
    mouse: { x: 460, y: 270, isDown: false },
    player: {
      x: 200,
      y: 270,
      vx: 0,
      vy: 0,
      speed: 3.8,
      size: 22,
      hp: 100,
      shield: 0,
      dashCooldown: 0,
      isDashing: 0,
      attackCooldown: 0,
      damageBuffTimer: 0,
      trail: []
    },
    boss: {
      x: 700,
      y: 270,
      vx: 0,
      vy: 0,
      angle: 0,
      hp: 320,
      stunned: 0,
      segments: Array.from({ length: 14 }, (_, i) => ({ x: 700 + i * 22, y: 270 })),
      shootCooldown: 60,
      specialCooldown: 180,
      shockwaveCooldown: 240,
      isEnraged: false
    },
    playerProjectiles: [],
    bossProjectiles: [],
    particles: [],
    floatingTexts: [],
    shockwaves: [],
    lightningTelegraphs: [],
    cooldowns: { aramazd: 0, anahit: 0, devil: 0 },
    score: 0,
    startTime: Date.now(),
    lastFrameTime: performance.now(),
    rafId: null
  });

  const activateAramazd = useCallback(() => {
    const e = engineRef.current;
    if (e.cooldowns.aramazd > 0 || gameState !== 'playing') return;
    e.cooldowns.aramazd = 18;
    setCdAramazd(18);

    gameAudio.playThunder();
    e.boss.hp = Math.max(0, e.boss.hp - 45);
    e.boss.stunned = 100;
    e.score += 250;

    for (let i = 0; i < 40; i++) {
      e.particles.push({
        x: e.boss.x,
        y: e.boss.y,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.5) * 12,
        color: '#ffd700',
        size: Math.random() * 5 + 3,
        alpha: 1,
        life: 45
      });
    }

    e.floatingTexts.push({
      x: e.boss.x,
      y: e.boss.y - 40,
      text: '⚡ Արամազդ: -45!',
      color: '#ffd700',
      size: 24,
      vy: -1.5,
      alpha: 1
    });

    setBossHp(e.boss.hp);
    if (e.boss.hp <= 0) handleVictory();
  }, [gameState]);

  const activateAnahit = useCallback(() => {
    const e = engineRef.current;
    if (e.cooldowns.anahit > 0 || gameState !== 'playing') return;
    e.cooldowns.anahit = 20;
    setCdAnahit(20);

    gameAudio.playHeal();
    e.player.hp = Math.min(100, e.player.hp + 30);
    e.player.shield = 40;
    setPlayerHp(e.player.hp);
    setPlayerShield(e.player.shield);

    for (let i = 0; i < 35; i++) {
      e.particles.push({
        x: e.player.x,
        y: e.player.y,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        color: '#70e000',
        size: Math.random() * 4 + 2,
        alpha: 1,
        life: 40
      });
    }

    e.floatingTexts.push({
      x: e.player.x,
      y: e.player.y - 30,
      text: '🛡️ Անահիտ: +30 HP & Զրահ!',
      color: '#a7f3d0',
      size: 20,
      vy: -1.2,
      alpha: 1
    });
  }, [gameState]);

  const activateDevil = useCallback(() => {
    const e = engineRef.current;
    if (e.cooldowns.devil > 0 || gameState !== 'playing') return;
    if (e.player.hp <= 15) return;
    e.cooldowns.devil = 16;
    setCdDevil(16);

    gameAudio.playDarkDeal();
    e.player.hp -= 12;
    e.player.damageBuffTimer = 480;
    setPlayerHp(e.player.hp);

    for (let i = 0; i < 30; i++) {
      e.particles.push({
        x: e.player.x,
        y: e.player.y,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        color: '#ff0055',
        size: Math.random() * 5 + 2,
        alpha: 1,
        life: 50
      });
    }

    e.floatingTexts.push({
      x: e.player.x,
      y: e.player.y - 30,
      text: '💀 Դև: 2.5x Կրակ (-12 HP)',
      color: '#ff1744',
      size: 20,
      vy: -1.2,
      alpha: 1
    });
  }, [gameState]);

  const handleVictory = () => {
    setGameState('victory');
    gameAudio.playVictory();
    try {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 }
      });
    } catch (err) {
    }
  };

  const handleDefeat = () => {
    setGameState('defeat');
    gameAudio.playDefeat();
  };

  const restartGame = () => {
    const e = engineRef.current;
    e.player.x = 200;
    e.player.y = 270;
    e.player.hp = 100;
    e.player.shield = 0;
    e.player.damageBuffTimer = 0;
    e.player.isDashing = 0;
    e.player.dashCooldown = 0;

    e.boss.x = 700;
    e.boss.y = 270;
    e.boss.hp = 320;
    e.boss.stunned = 0;
    e.boss.isEnraged = false;
    e.boss.segments = Array.from({ length: 14 }, (_, i) => ({ x: 700 + i * 22, y: 270 }));

    e.playerProjectiles = [];
    e.bossProjectiles = [];
    e.particles = [];
    e.floatingTexts = [];
    e.shockwaves = [];
    e.lightningTelegraphs = [];
    e.cooldowns = { aramazd: 0, anahit: 0, devil: 0 };
    e.score = 0;
    e.startTime = Date.now();

    setPlayerHp(100);
    setPlayerShield(0);
    setBossHp(320);
    setIsPhase2(false);
    setScore(0);
    setCdAramazd(0);
    setCdAnahit(0);
    setCdDevil(0);
    setGameState('playing');
  };

  const performDash = useCallback(() => {
    const e = engineRef.current;
    if (e.player.dashCooldown > 0 || gameState !== 'playing') return;
    e.player.dashCooldown = 45;
    e.player.isDashing = 15;
    gameAudio.playSlash();

    let dx = 0;
    let dy = 0;
    if (e.keys['KeyW'] || e.keys['ArrowUp']) dy -= 1;
    if (e.keys['KeyS'] || e.keys['ArrowDown']) dy += 1;
    if (e.keys['KeyA'] || e.keys['ArrowLeft']) dx -= 1;
    if (e.keys['KeyD'] || e.keys['ArrowRight']) dx += 1;

    if (dx === 0 && dy === 0) {
      dx = e.mouse.x - e.player.x;
      dy = e.mouse.y - e.player.y;
    }
    const len = Math.hypot(dx, dy) || 1;
    e.player.vx = (dx / len) * 11;
    e.player.vy = (dy / len) * 11;

    for (let i = 0; i < 15; i++) {
      e.particles.push({
        x: e.player.x,
        y: e.player.y,
        vx: -e.player.vx * 0.4 + (Math.random() - 0.5) * 3,
        vy: -e.player.vy * 0.4 + (Math.random() - 0.5) * 3,
        color: '#ff7700',
        size: Math.random() * 4 + 2,
        alpha: 1,
        life: 25
      });
    }
  }, [gameState]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const e = engineRef.current;

    const handleKeyDown = (ev) => {
      e.keys[ev.code] = true;
      if (ev.code === 'KeyK' || ev.code === 'ShiftLeft' || ev.code === 'ShiftRight') {
        performDash();
      }
      if (ev.code === 'Digit1') activateAramazd();
      if (ev.code === 'Digit2') activateAnahit();
      if (ev.code === 'Digit3') activateDevil();
      if (ev.code === 'Space') {
        ev.preventDefault();
        e.mouse.isDown = true;
      }
    };

    const handleKeyUp = (ev) => {
      e.keys[ev.code] = false;
      if (ev.code === 'Space') {
        e.mouse.isDown = false;
      }
    };

    const handleMouseMove = (ev) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      e.mouse.x = (ev.clientX - rect.left) * scaleX;
      e.mouse.y = (ev.clientY - rect.top) * scaleY;
    };

    const handleMouseDown = (ev) => {
      if (ev.button === 0) e.mouse.isDown = true;
    };

    const handleMouseUp = () => {
      e.mouse.isDown = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const cdInterval = setInterval(() => {
      if (gameState !== 'playing') return;
      if (e.cooldowns.aramazd > 0) {
        e.cooldowns.aramazd--;
        setCdAramazd(e.cooldowns.aramazd);
      }
      if (e.cooldowns.anahit > 0) {
        e.cooldowns.anahit--;
        setCdAnahit(e.cooldowns.anahit);
      }
      if (e.cooldowns.devil > 0) {
        e.cooldowns.devil--;
        setCdDevil(e.cooldowns.devil);
      }
      setGameTime(Math.floor((Date.now() - e.startTime) / 1000));
    }, 1000);

    let pulseTime = 0;

    const gameLoop = () => {
      pulseTime += 0.03;

      if (gameState === 'playing') {
        if (e.player.isDashing > 0) {
          e.player.isDashing--;
          e.player.x += e.player.vx;
          e.player.y += e.player.vy;
        } else {
          let moveX = 0;
          let moveY = 0;
          if (e.keys['KeyW'] || e.keys['ArrowUp']) moveY -= 1;
          if (e.keys['KeyS'] || e.keys['ArrowDown']) moveY += 1;
          if (e.keys['KeyA'] || e.keys['ArrowLeft']) moveX -= 1;
          if (e.keys['KeyD'] || e.keys['ArrowRight']) moveX += 1;

          if (moveX !== 0 && moveY !== 0) {
            moveX *= 0.7071;
            moveY *= 0.7071;
          }

          const spd = e.player.damageBuffTimer > 0 ? e.player.speed * 1.3 : e.player.speed;
          e.player.x += moveX * spd;
          e.player.y += moveY * spd;
        }

        e.player.x = Math.max(30, Math.min(canvas.width - 30, e.player.x));
        e.player.y = Math.max(30, Math.min(canvas.height - 30, e.player.y));

        e.player.trail.push({ x: e.player.x, y: e.player.y, alpha: 0.6 });
        if (e.player.trail.length > 8) e.player.trail.shift();

        if (e.player.dashCooldown > 0) e.player.dashCooldown--;

        if (e.player.attackCooldown > 0) e.player.attackCooldown--;
        if (e.player.damageBuffTimer > 0) e.player.damageBuffTimer--;

        if (e.mouse.isDown && e.player.attackCooldown <= 0) {
          e.player.attackCooldown = 12;
          gameAudio.playFireball();

          const dx = e.mouse.x - e.player.x;
          const dy = e.mouse.y - e.player.y;
          const angle = Math.atan2(dy, dx);
          const pSpeed = 10;
          const isBuffed = e.player.damageBuffTimer > 0;

          e.playerProjectiles.push({
            x: e.player.x,
            y: e.player.y,
            vx: Math.cos(angle) * pSpeed,
            vy: Math.sin(angle) * pSpeed,
            damage: isBuffed ? 25 : 10,
            radius: isBuffed ? 8 : 5,
            color: isBuffed ? '#ff0055' : '#ffd700',
            life: 60
          });
        }

        if (e.boss.stunned > 0) {
          e.boss.stunned--;
        } else {
          const targetX = e.boss.hp < maxBossHp * 0.5 ? e.player.x : (canvas.width * 0.7);
          const targetY = e.player.y + Math.sin(pulseTime * 2) * 80;

          const bdx = targetX - e.boss.x;
          const bdy = targetY - e.boss.y;
          const bDist = Math.hypot(bdx, bdy) || 1;
          const bSpeed = e.boss.isEnraged ? 3.0 : 1.8;

          e.boss.vx += (bdx / bDist) * 0.15;
          e.boss.vy += (bdy / bDist) * 0.15;
          e.boss.vx *= 0.94;
          e.boss.vy *= 0.94;

          e.boss.x += e.boss.vx * bSpeed;
          e.boss.y += e.boss.vy * bSpeed;

          let prev = { x: e.boss.x, y: e.boss.y };
          for (let i = 0; i < e.boss.segments.length; i++) {
            const seg = e.boss.segments[i];
            const sdx = seg.x - prev.x;
            const sdy = seg.y - prev.y;
            const sAngle = Math.atan2(sdy, sdx);
            const dist = 22;
            seg.x = prev.x + Math.cos(sAngle) * dist;
            seg.y = prev.y + Math.sin(sAngle) * dist;
            prev = seg;
          }

          if (e.boss.hp <= maxBossHp * 0.5 && !e.boss.isEnraged) {
            e.boss.isEnraged = true;
            setIsPhase2(true);
            gameAudio.playThunder();
            e.floatingTexts.push({
              x: canvas.width / 2,
              y: 120,
              text: '⚠️ ՎԻՇԱՊԸ ԶԱՅՐԱՑԱՎ!',
              color: '#ff1744',
              size: 28,
              vy: -0.5,
              alpha: 1
            });
          }

          if (e.boss.shootCooldown > 0) e.boss.shootCooldown--;
          if (e.boss.shootCooldown <= 0) {
            e.boss.shootCooldown = e.boss.isEnraged ? 38 : 55;
            gameAudio.playFireball();

            const bAngle = Math.atan2(e.player.y - e.boss.y, e.player.x - e.boss.x);
            const count = e.boss.isEnraged ? 3 : 1;
            const spread = 0.28;

            for (let c = 0; c < count; c++) {
              const offset = (c - (count - 1) / 2) * spread;
              const spd = e.boss.isEnraged ? 5.5 : 4.5;
              e.bossProjectiles.push({
                x: e.boss.x,
                y: e.boss.y,
                vx: Math.cos(bAngle + offset) * spd,
                vy: Math.sin(bAngle + offset) * spd,
                damage: 14,
                radius: 7,
                color: '#a855f7',
                life: 140
              });
            }
          }

          if (e.boss.shockwaveCooldown > 0) e.boss.shockwaveCooldown--;
          if (e.boss.shockwaveCooldown <= 0) {
            e.boss.shockwaveCooldown = e.boss.isEnraged ? 180 : 260;
            e.shockwaves.push({
              x: e.boss.x,
              y: e.boss.y,
              radius: 10,
              maxRadius: 280,
              speed: 4.0,
              damage: 18,
              hasHit: false
            });
            gameAudio.playThunder();
          }

          if (e.boss.isEnraged) {
            if (e.boss.specialCooldown > 0) e.boss.specialCooldown--;
            if (e.boss.specialCooldown <= 0) {
              e.boss.specialCooldown = 150;
              e.lightningTelegraphs.push({
                x: e.player.x,
                y: e.player.y,
                timer: 60,
                radius: 45
              });
            }
          }
        }

        for (let i = e.playerProjectiles.length - 1; i >= 0; i--) {
          const p = e.playerProjectiles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.life--;

          let hit = false;
          const headDist = Math.hypot(p.x - e.boss.x, p.y - e.boss.y);
          if (headDist < 28) hit = true;

          if (!hit) {
            for (let s = 0; s < e.boss.segments.length; s += 2) {
              const seg = e.boss.segments[s];
              if (Math.hypot(p.x - seg.x, p.y - seg.y) < 22) {
                hit = true;
                break;
              }
            }
          }

          if (hit) {
            gameAudio.playHit();
            e.boss.hp = Math.max(0, e.boss.hp - p.damage);
            e.score += p.damage * 10;
            setBossHp(e.boss.hp);
            setScore(e.score);

            e.floatingTexts.push({
              x: p.x,
              y: p.y - 15,
              text: `-${p.damage}`,
              color: p.color,
              size: 16,
              vy: -1.0,
              alpha: 1
            });

            for (let k = 0; k < 6; k++) {
              e.particles.push({
                x: p.x,
                y: p.y,
                vx: (Math.random() - 0.5) * 5,
                vy: (Math.random() - 0.5) * 5,
                color: p.color,
                size: Math.random() * 3 + 1,
                alpha: 1,
                life: 20
              });
            }

            e.playerProjectiles.splice(i, 1);
            if (e.boss.hp <= 0) {
              handleVictory();
              break;
            }
            continue;
          }

          if (p.life <= 0 || p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
            e.playerProjectiles.splice(i, 1);
          }
        }

        for (let i = e.bossProjectiles.length - 1; i >= 0; i--) {
          const bp = e.bossProjectiles[i];
          bp.x += bp.vx;
          bp.y += bp.vy;
          bp.life--;

          const pDist = Math.hypot(bp.x - e.player.x, bp.y - e.player.y);
          if (pDist < e.player.size + bp.radius && e.player.isDashing <= 0) {
            gameAudio.playHit();
            let dmg = bp.damage;
            if (e.player.shield > 0) {
              if (e.player.shield >= dmg) {
                e.player.shield -= dmg;
                dmg = 0;
              } else {
                dmg -= e.player.shield;
                e.player.shield = 0;
              }
              setPlayerShield(e.player.shield);
            }
            if (dmg > 0) {
              e.player.hp = Math.max(0, e.player.hp - dmg);
              setPlayerHp(e.player.hp);
            }

            e.floatingTexts.push({
              x: e.player.x,
              y: e.player.y - 20,
              text: `-${bp.damage}`,
              color: '#ef4444',
              size: 18,
              vy: -1.0,
              alpha: 1
            });

            e.bossProjectiles.splice(i, 1);
            if (e.player.hp <= 0) {
              handleDefeat();
              break;
            }
            continue;
          }

          if (bp.life <= 0 || bp.x < 0 || bp.x > canvas.width || bp.y < 0 || bp.y > canvas.height) {
            e.bossProjectiles.splice(i, 1);
          }
        }

        for (let i = e.shockwaves.length - 1; i >= 0; i--) {
          const sw = e.shockwaves[i];
          sw.radius += sw.speed;

          if (!sw.hasHit && e.player.isDashing <= 0) {
            const dist = Math.hypot(sw.x - e.player.x, sw.y - e.player.y);
            if (Math.abs(dist - sw.radius) < 18) {
              sw.hasHit = true;
              gameAudio.playHit();
              e.player.hp = Math.max(0, e.player.hp - sw.damage);
              setPlayerHp(e.player.hp);
              e.floatingTexts.push({
                x: e.player.x,
                y: e.player.y - 20,
                text: `-${sw.damage}`,
                color: '#ef4444',
                size: 18,
                vy: -1.0,
                alpha: 1
              });
              if (e.player.hp <= 0) {
                handleDefeat();
                break;
              }
            }
          }

          if (sw.radius >= sw.maxRadius) {
            e.shockwaves.splice(i, 1);
          }
        }

        for (let i = e.lightningTelegraphs.length - 1; i >= 0; i--) {
          const lt = e.lightningTelegraphs[i];
          lt.timer--;
          if (lt.timer <= 0) {
            gameAudio.playThunder();
            const dist = Math.hypot(lt.x - e.player.x, lt.y - e.player.y);
            if (dist < lt.radius && e.player.isDashing <= 0) {
              e.player.hp = Math.max(0, e.player.hp - 25);
              setPlayerHp(e.player.hp);
              e.floatingTexts.push({
                x: e.player.x,
                y: e.player.y - 20,
                text: `-25 ⚡`,
                color: '#ef4444',
                size: 22,
                vy: -1.2,
                alpha: 1
              });
              if (e.player.hp <= 0) {
                handleDefeat();
                break;
              }
            }
            for (let k = 0; k < 25; k++) {
              e.particles.push({
                x: lt.x,
                y: lt.y,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8,
                color: '#ffd700',
                size: Math.random() * 4 + 2,
                alpha: 1,
                life: 30
              });
            }
            e.lightningTelegraphs.splice(i, 1);
          }
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0a080e';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(212, 175, 55, 0.06)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(pulseTime * 0.1);

      ctx.strokeStyle = 'rgba(212, 175, 55, 0.15)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, 160, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(212, 175, 55, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, 120, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(255, 215, 0, 0.25)';
      ctx.lineWidth = 3;
      for (let a = 0; a < 8; a++) {
        ctx.rotate((Math.PI * 2) / 8);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(40, 40, 80, 0);
        ctx.stroke();
      }
      ctx.restore();

      ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
      ctx.lineWidth = 4;
      ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

      e.shockwaves.forEach((sw) => {
        ctx.strokeStyle = `rgba(168, 85, 247, ${1 - sw.radius / sw.maxRadius})`;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.stroke();
      });

      e.lightningTelegraphs.forEach((lt) => {
        ctx.fillStyle = 'rgba(239, 68, 68, 0.25)';
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(lt.x, lt.y, lt.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#ffd700';
        ctx.font = '16px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('⚡', lt.x, lt.y + 6);
      });

      for (let i = e.particles.length - 1; i >= 0; i--) {
        const p = e.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 1 / p.life;
        if (p.alpha <= 0) {
          e.particles.splice(i, 1);
          continue;
        }
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      for (let s = e.boss.segments.length - 1; s >= 0; s--) {
        const seg = e.boss.segments[s];
        const segSize = 22 - s * 0.8;
        const ratio = s / e.boss.segments.length;

        ctx.fillStyle = e.boss.isEnraged
          ? `rgb(${160 + ratio * 80}, ${10 + ratio * 20}, ${20})`
          : `rgb(${45 + ratio * 40}, ${15 + ratio * 20}, ${60 + ratio * 30})`;

        ctx.beginPath();
        ctx.arc(seg.x, seg.y, Math.max(6, segSize), 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = e.boss.isEnraged ? '#ff4500' : '#8b5cf6';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        if (s % 2 === 0) {
          ctx.fillStyle = e.boss.isEnraged ? '#ffd700' : '#c084fc';
          ctx.beginPath();
          ctx.arc(seg.x, seg.y - segSize * 0.8, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.save();
      ctx.translate(e.boss.x, e.boss.y);
      const headAngle = Math.atan2(e.player.y - e.boss.y, e.player.x - e.boss.x);
      ctx.rotate(headAngle);

      ctx.fillStyle = e.boss.isEnraged ? '#991b1b' : '#3b0764';
      ctx.strokeStyle = e.boss.isEnraged ? '#f59e0b' : '#c084fc';
      ctx.lineWidth = 2.5;

      ctx.beginPath();
      ctx.moveTo(28, 0);
      ctx.lineTo(-15, -22);
      ctx.lineTo(-24, 0);
      ctx.lineTo(-15, 22);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.strokeStyle = '#ffd700';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-10, -18);
      ctx.quadraticCurveTo(-25, -35, -40, -30);
      ctx.moveTo(-10, 18);
      ctx.quadraticCurveTo(-25, 35, -40, 30);
      ctx.stroke();

      ctx.fillStyle = e.boss.isEnraged ? '#ff0033' : '#facc15';
      ctx.beginPath();
      ctx.arc(4, -9, 4, 0, Math.PI * 2);
      ctx.arc(4, 9, 4, 0, Math.PI * 2);
      ctx.fill();

      if (Math.random() < 0.4) {
        e.particles.push({
          x: e.boss.x + Math.cos(headAngle) * 30,
          y: e.boss.y + Math.sin(headAngle) * 30,
          vx: Math.cos(headAngle) * 2 + (Math.random() - 0.5) * 2,
          vy: Math.sin(headAngle) * 2 + (Math.random() - 0.5) * 2,
          color: e.boss.isEnraged ? '#ff4500' : '#a855f7',
          size: Math.random() * 4 + 2,
          alpha: 0.8,
          life: 25
        });
      }
      ctx.restore();

      if (e.boss.stunned > 0) {
        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 20px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('💫 STUNNED', e.boss.x, e.boss.y - 45);
      }

      e.bossProjectiles.forEach((bp) => {
        ctx.fillStyle = bp.color;
        ctx.shadowColor = bp.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(bp.x, bp.y, bp.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      e.playerProjectiles.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      e.player.trail.forEach((t, idx) => {
        ctx.fillStyle = e.player.damageBuffTimer > 0 ? '#ff0055' : '#ff7700';
        ctx.globalAlpha = (idx / e.player.trail.length) * 0.35;
        ctx.beginPath();
        ctx.arc(t.x, t.y, e.player.size * 0.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      const auraGradient = ctx.createRadialGradient(
        e.player.x, e.player.y, 5,
        e.player.x, e.player.y, e.player.size + 16
      );
      if (e.player.damageBuffTimer > 0) {
        auraGradient.addColorStop(0, 'rgba(255, 0, 80, 0.7)');
        auraGradient.addColorStop(1, 'rgba(255, 0, 80, 0)');
      } else {
        auraGradient.addColorStop(0, 'rgba(255, 120, 0, 0.6)');
        auraGradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
      }
      ctx.fillStyle = auraGradient;
      ctx.beginPath();
      ctx.arc(e.player.x, e.player.y, e.player.size + 16, 0, Math.PI * 2);
      ctx.fill();

      if (e.player.shield > 0) {
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(e.player.x, e.player.y, e.player.size + 8, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.fillStyle = '#b45309';
      ctx.beginPath();
      ctx.arc(e.player.x, e.player.y, e.player.size, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffd700';
      ctx.beginPath();
      ctx.arc(e.player.x, e.player.y, e.player.size * 0.6, 0, Math.PI * 2);
      ctx.fill();

      const pAngle = Math.atan2(e.mouse.y - e.player.y, e.mouse.x - e.player.x);
      ctx.save();
      ctx.translate(e.player.x, e.player.y);
      ctx.rotate(pAngle);

      ctx.strokeStyle = '#ffd700';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(10, 10);
      ctx.lineTo(28, 10);
      ctx.stroke();
      ctx.fillStyle = '#ff4500';
      ctx.beginPath();
      ctx.moveTo(34, 10);
      ctx.lineTo(26, 6);
      ctx.lineTo(26, 14);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(8, -5, 3.5, 0, Math.PI * 2);
      ctx.arc(8, 5, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ff3b00';
      ctx.beginPath();
      ctx.arc(9, -5, 1.8, 0, Math.PI * 2);
      ctx.arc(9, 5, 1.8, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      for (let i = e.floatingTexts.length - 1; i >= 0; i--) {
        const ft = e.floatingTexts[i];
        ft.y += ft.vy;
        ft.alpha -= 0.02;
        if (ft.alpha <= 0) {
          e.floatingTexts.splice(i, 1);
          continue;
        }
        ctx.fillStyle = ft.color;
        ctx.globalAlpha = Math.max(0, ft.alpha);
        ctx.font = `bold ${ft.size || 16}px Cinzel, sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText(ft.text, ft.x, ft.y);
        ctx.globalAlpha = 1;
      }

      e.rafId = requestAnimationFrame(gameLoop);
    };

    e.rafId = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(e.rafId);
      clearInterval(cdInterval);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [gameState, performDash, activateAramazd, activateAnahit, activateDevil, maxBossHp]);

  const act = t.games.action;

  return (
    <div className="vahagn-game-container">
      {}
      <div className="game-hud-top">
        {}
        <div className="boss-hud-card">
          <div className="boss-hud-header">
            <span className="boss-name">{act.bossName}</span>
            <span className="boss-hp-val">
              {bossHp} / {maxBossHp} HP
            </span>
          </div>
          <div className="hud-bar-bg boss-bar-bg">
            <div
              className={`hud-bar-fill boss-bar-fill ${isPhase2 ? 'enraged' : ''}`}
              style={{ width: `${Math.max(0, (bossHp / maxBossHp) * 100)}%` }}
            />
          </div>
        </div>

        {}
        <div className="player-hud-card">
          <div className="player-hud-header">
            <span className="player-name">
              ⚡ {act.playerHp} {playerShield > 0 && `(+${playerShield} 🛡️)`}
            </span>
            <span className="player-score">
              {act.score}: <strong>{score}</strong>
            </span>
          </div>
          <div className="hud-bar-bg player-bar-bg">
            <div
              className="hud-bar-fill player-bar-fill"
              style={{ width: `${Math.max(0, (playerHp / maxPlayerHp) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {}
      <div className="canvas-wrapper">
        <canvas
          ref={canvasRef}
          width={920}
          height={540}
          className="game-canvas"
        />

        {}
        {isPhase2 && (
          <div className="phase2-banner">
            {act.phase2Alert}
          </div>
        )}

        {}
        {gameState === 'victory' && (
          <div className="game-overlay-modal victory-modal">
            <div className="modal-inner">
              <Sparkles size={48} color="#ffd700" className="victory-icon" />
              <h2 className="modal-title">{act.victoryTitle}</h2>
              <p className="modal-desc">{act.victoryDesc}</p>
              <div className="final-stats">
                <div>{act.score}: <strong>{score}</strong></div>
                <div>{act.time}: <strong>{gameTime}s</strong></div>
              </div>
              <button className="btn-primary-action" onClick={restartGame}>
                <RotateCcw size={18} />
                <span>{act.playAgain}</span>
              </button>
            </div>
          </div>
        )}

        {}
        {gameState === 'defeat' && (
          <div className="game-overlay-modal defeat-modal">
            <div className="modal-inner">
              <Skull size={48} color="#ef4444" className="defeat-icon" />
              <h2 className="modal-title">{act.defeatTitle}</h2>
              <p className="modal-desc">{act.defeatDesc}</p>
              <button className="btn-primary-action retry-btn" onClick={restartGame}>
                <RotateCcw size={18} />
                <span>{act.playAgain}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {}
      <div className="game-controls-bar">
        {}
        <div className="blessings-group">
          <button
            type="button"
            className={`blessing-btn ${cdAramazd > 0 ? 'disabled' : ''}`}
            onClick={activateAramazd}
            disabled={cdAramazd > 0 || gameState !== 'playing'}
            title="Արամազդի Շանթ (Ստեղն 1)"
          >
            <Zap size={18} color="#ffd700" />
            <span className="blessing-label">{act.blessingAramazd}</span>
            {cdAramazd > 0 && <span className="cd-badge">{cdAramazd}s</span>}
          </button>

          <button
            type="button"
            className={`blessing-btn ${cdAnahit > 0 ? 'disabled' : ''}`}
            onClick={activateAnahit}
            disabled={cdAnahit > 0 || gameState !== 'playing'}
            title="Անահիտի Զրահ (Ստեղն 2)"
          >
            <Shield size={18} color="#10b981" />
            <span className="blessing-label">{act.blessingAnahit}</span>
            {cdAnahit > 0 && <span className="cd-badge">{cdAnahit}s</span>}
          </button>

          <button
            type="button"
            className={`blessing-btn ${cdDevil > 0 ? 'disabled' : ''}`}
            onClick={activateDevil}
            disabled={cdDevil > 0 || gameState !== 'playing'}
            title="Դևի Գործարք (Ստեղն 3)"
          >
            <Skull size={18} color="#f43f5e" />
            <span className="blessing-label">{act.blessingDevil}</span>
            {cdDevil > 0 && <span className="cd-badge">{cdDevil}s</span>}
          </button>
        </div>

        {}
        <div className="mobile-actions">
          <button
            type="button"
            className="mobile-act-btn dash-btn"
            onClick={performDash}
            title="Dash (Shift / K)"
          >
            💨 {act.touchDash}
          </button>
        </div>
      </div>

      {}
      <div className="game-instructions">
        <span className="inst-item">🕹️ {act.controlsMove}</span>
        <span className="inst-dot">•</span>
        <span className="inst-item">🔥 {act.controlsAttack}</span>
        <span className="inst-dot">•</span>
        <span className="inst-item">💨 {act.controlsDash}</span>
        <span className="inst-dot">•</span>
        <span className="inst-item">⚡ {act.controlsBlessings}</span>
      </div>
    </div>
  );
}

