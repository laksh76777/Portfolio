import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Terminal, 
  Cpu, 
  Database, 
  Globe, 
  Sparkles, 
  Code2, 
  Flame, 
  Monitor,
  Layers,
  Compass,
  ArrowDownCircle,
  Activity,
  Gauge
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HomeProps {
  onNavigate: (path: string) => void;
  theme?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  isSpark: boolean;
  life?: number;
  maxLife?: number;
}

interface ClickRipple {
  id: number;
  x: number;
  y: number;
  color: string;
}

// 4 Cosmic Realms representing the deep-space scroll states
const COSMIC_REALMS = [
  {
    name: 'Hyper Indigo',
    primary: 'rgba(99, 102, 241, 0.25)',
    secondary: 'rgba(139, 92, 246, 0.1)',
    particleColor: '#6366f1',
    sparkColor: '#818cf8',
    gradientText: 'from-indigo-400 via-purple-400 to-indigo-300',
    accentColor: 'indigo',
    borderColor: 'border-indigo-500/20',
    glowColor: 'shadow-indigo-600/30',
    bgBase: 'bg-slate-950',
    gridColor: 'rgba(99, 102, 241, 0.04)'
  },
  {
    name: 'Nebula Purple',
    primary: 'rgba(168, 85, 247, 0.25)',
    secondary: 'rgba(236, 72, 153, 0.1)',
    particleColor: '#a855f7',
    sparkColor: '#f472b6',
    gradientText: 'from-purple-400 via-pink-400 to-fuchsia-300',
    accentColor: 'purple',
    borderColor: 'border-purple-500/20',
    glowColor: 'shadow-purple-600/30',
    bgBase: 'bg-zinc-950',
    gridColor: 'rgba(168, 85, 247, 0.04)'
  },
  {
    name: 'Emerald Matrix',
    primary: 'rgba(16, 185, 129, 0.25)',
    secondary: 'rgba(20, 184, 166, 0.1)',
    particleColor: '#10b981',
    sparkColor: '#2dd4bf',
    gradientText: 'from-emerald-400 via-teal-400 to-green-300',
    accentColor: 'emerald',
    borderColor: 'border-emerald-500/20',
    glowColor: 'shadow-emerald-600/30',
    bgBase: 'bg-stone-950',
    gridColor: 'rgba(16, 185, 129, 0.04)'
  },
  {
    name: 'Cyber Amber',
    primary: 'rgba(245, 158, 11, 0.25)',
    secondary: 'rgba(239, 68, 68, 0.1)',
    particleColor: '#f59e0b',
    sparkColor: '#f87171',
    gradientText: 'from-amber-400 via-orange-400 to-red-300',
    accentColor: 'amber',
    borderColor: 'border-amber-500/20',
    glowColor: 'shadow-amber-600/30',
    bgBase: 'bg-gray-950',
    gridColor: 'rgba(245, 158, 11, 0.04)'
  }
];

export const Home: React.FC<HomeProps> = ({ onNavigate, theme }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [trailPos, setTrailPos] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
  
  // Scroll Metrics State
  const [scrollY, setScrollY] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [activeRealmIndex, setActiveRealmIndex] = useState(0);
  const [clickRipples, setClickRipples] = useState<ClickRipple[]>([]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dashboardCardRef = useRef<HTMLDivElement>(null);
  const aboutCardRef = useRef<HTMLDivElement>(null);
  
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const lastScrollY = useRef(0);
  const velocityTimer = useRef<number | null>(null);

  const rawRealm = COSMIC_REALMS[activeRealmIndex];
  const isLight = theme === 'light';

  const activeRealm = {
    ...rawRealm,
    bgBase: isLight ? (
      activeRealmIndex === 0 ? 'bg-slate-50' :
      activeRealmIndex === 1 ? 'bg-zinc-50' :
      activeRealmIndex === 2 ? 'bg-stone-50' :
      'bg-gray-50'
    ) : rawRealm.bgBase,
    particleColor: isLight ? (
      activeRealmIndex === 0 ? '#4f46e5' :
      activeRealmIndex === 1 ? '#7c3aed' :
      activeRealmIndex === 2 ? '#059669' :
      '#d97706'
    ) : rawRealm.particleColor,
    sparkColor: isLight ? (
      activeRealmIndex === 0 ? '#6366f1' :
      activeRealmIndex === 1 ? '#a855f7' :
      activeRealmIndex === 2 ? '#10b981' :
      '#f59e0b'
    ) : rawRealm.sparkColor,
    gridColor: isLight ? 'rgba(0, 0, 0, 0.08)' : rawRealm.gridColor,
    primary: isLight ? 'rgba(79, 70, 229, 0.15)' : rawRealm.primary,
    secondary: isLight ? 'rgba(124, 58, 237, 0.08)' : rawRealm.secondary,
  };

  // Tracking dimension updates
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Tracking general cursor positions
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Tracking dynamic scrolling behavior, speed, and shifting realms
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const rawPercent = totalHeight > 0 ? currentScrollY / totalHeight : 0;
      const clampedPercent = Math.min(1, Math.max(0, rawPercent));
      
      setScrollY(currentScrollY);
      setScrollPercent(clampedPercent);

      // Map scroll percentage directly to realm index (e.g., 4 phases)
      const mappedIndex = Math.min(
        COSMIC_REALMS.length - 1,
        Math.floor(clampedPercent * COSMIC_REALMS.length)
      );
      setActiveRealmIndex(mappedIndex);

      // Compute immediate scroll speed/velocity
      const diff = Math.abs(currentScrollY - lastScrollY.current);
      setScrollVelocity(prev => Math.min(50, prev + diff * 0.4)); // Cap visual speed burst
      lastScrollY.current = currentScrollY;

      // Reset scroll velocity decay timer
      if (velocityTimer.current) {
        cancelAnimationFrame(velocityTimer.current);
      }

      const decayVelocity = () => {
        setScrollVelocity(prev => {
          if (prev <= 0.1) return 0;
          const nextVal = prev * 0.92; // smooth decay
          velocityTimer.current = requestAnimationFrame(decayVelocity);
          return nextVal;
        });
      };
      velocityTimer.current = requestAnimationFrame(decayVelocity);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (velocityTimer.current) cancelAnimationFrame(velocityTimer.current);
    };
  }, []);

  // Smooth trail calculation for ambient spotlight
  useEffect(() => {
    let animationId: number;
    const updateTrail = () => {
      setTrailPos(prev => {
        const dx = mousePos.x - prev.x;
        const dy = mousePos.y - prev.y;
        return {
          x: prev.x + dx * 0.08,
          y: prev.y + dy * 0.08
        };
      });
      animationId = requestAnimationFrame(updateTrail);
    };
    animationId = requestAnimationFrame(updateTrail);
    return () => cancelAnimationFrame(animationId);
  }, [mousePos]);

  // Canvas particle initial configurations
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const initParticles = () => {
      const list: Particle[] = [];
      const particleCount = Math.min(120, Math.floor((window.innerWidth * window.innerHeight) / 10000));
      for (let i = 0; i < particleCount; i++) {
        list.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          radius: Math.random() * 2 + 0.8,
          color: activeRealm.particleColor,
          alpha: Math.random() * 0.4 + 0.15,
          isSpark: false
        });
      }
      particlesRef.current = list;
    };

    initParticles();
  }, [activeRealmIndex]);

  // Main high-performance render loop for particles (Reacts to cursor AND scroll velocity)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Draw active background grid shifting slightly on scroll
      const gridOffset = (scrollY * 0.15) % 40;
      ctx.strokeStyle = activeRealm.gridColor;
      ctx.lineWidth = 0.5;
      
      // Horizontal lines
      for (let y = gridOffset; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      // Vertical lines
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Render/Update nodes
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (p.isSpark) {
          // Spark behavior with velocity forces
          p.x += p.vx;
          p.y += p.vy + (scrollVelocity * 0.1); // push down with scroll speed
          p.vx *= 0.95;
          p.vy *= 0.95;
          if (p.life !== undefined) {
            p.life--;
            p.alpha = p.life / (p.maxLife || 1);
          }
          
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fill();

          if (p.life !== undefined && p.life <= 0) {
            particles.splice(i, 1);
            i--;
          }
          continue;
        }

        // Standard floating particle drift + Scroll warp push down
        p.x += p.vx;
        // Scroll speed warps particles vertically creating falling stardust effect
        p.y += p.vy + (scrollVelocity * 0.25); 

        // Boundary looping
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Interactive mouse magnetic fields
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 160;

        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          p.x -= (dx / dist) * force * 1.8;
          p.y -= (dy / dist) * force * 1.8;
        }

        // Warp stretch effect: Draw lines instead of circles if scrolling quickly
        ctx.beginPath();
        if (scrollVelocity > 4) {
          ctx.moveTo(p.x, p.y);
          // Stretch length proportional to scroll speed
          ctx.lineTo(p.x, p.y + (scrollVelocity * 1.4));
          ctx.strokeStyle = activeRealm.particleColor;
          ctx.lineWidth = p.radius;
          ctx.globalAlpha = p.alpha * 1.3;
          ctx.stroke();
        } else {
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = activeRealm.particleColor;
          ctx.globalAlpha = p.alpha;
          ctx.fill();
        }

        // Draw connections if calm
        if (scrollVelocity < 8) {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            if (p2.isSpark) continue;

            const dxConn = p.x - p2.x;
            const dyConn = p.y - p2.y;
            const distConn = Math.sqrt(dxConn * dxConn + dyConn * dyConn);

            if (distConn < 100) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = activeRealm.particleColor;
              ctx.globalAlpha = (1 - distConn / 100) * 0.1;
              ctx.lineWidth = 0.4;
              ctx.stroke();
            }
          }
        }
      }

      ctx.globalAlpha = 1.0;
      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animId);
  }, [activeRealmIndex, scrollVelocity, scrollY]);

  // Click burst ripples & particles emissions
  const handleGlobalClick = (e: React.MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;

    const sparksCount = 15;
    const newSparks: Particle[] = [];
    for (let i = 0; i < sparksCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 1.2;
      newSparks.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 2 + 1,
        color: activeRealm.sparkColor,
        alpha: 1.0,
        isSpark: true,
        life: Math.floor(Math.random() * 25) + 15,
        maxLife: 40
      });
    }
    particlesRef.current = [...particlesRef.current, ...newSparks];

    const newRipple: ClickRipple = {
      id: Date.now() + Math.random(),
      x,
      y,
      color: activeRealm.sparkColor
    };
    setClickRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setClickRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 700);
  };

  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    e.stopPropagation();
    onNavigate(path);
  };

  // 3D Card tilting + dynamic gloss reflections
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, ref: React.RefObject<HTMLDivElement | null>) => {
    const card = ref.current;
    if (!card) return;

    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    
    const centerX = box.width / 2;
    const centerY = box.height / 2;
    
    const rotateX = -((y - centerY) / centerY) * 11;
    const rotateY = ((x - centerX) / centerX) * 11;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.boxShadow = `0 30px 60px -15px ${activeRealm.primary.replace('0.25', '0.4')}`;
    
    const glare = card.querySelector('.card-glare-overlay') as HTMLDivElement | null;
    if (glare) {
      const percentageX = (x / box.width) * 100;
      const percentageY = (y / box.height) * 100;
      glare.style.background = `radial-gradient(circle at ${percentageX}% ${percentageY}%, rgba(255, 255, 255, 0.18) 0%, transparent 60%)`;
      glare.style.opacity = '1';
    }
  };

  const handleCardMouseLeave = (ref: React.RefObject<HTMLDivElement | null>) => {
    const card = ref.current;
    if (!card) return;
    
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    card.style.boxShadow = `none`;
    
    const glare = card.querySelector('.card-glare-overlay') as HTMLDivElement | null;
    if (glare) {
      glare.style.opacity = '0';
    }
  };

  // Cursor-based 3D Parallax Offsets
  const px = (mousePos.x - dimensions.width / 2) * 0.05;
  const py = (mousePos.y - dimensions.height / 2) * 0.05;
  const pxDeep = (mousePos.x - dimensions.width / 2) * -0.02;
  const pyDeep = (mousePos.y - dimensions.height / 2) * -0.02;

  return (
    <div 
      onClick={handleGlobalClick}
      className={`flex flex-col items-center text-slate-100 min-h-screen relative overflow-hidden transition-colors duration-1000 selection:bg-indigo-500/30 selection:text-indigo-200 ${activeRealm.bgBase}`}
    >
      {/* Scroll warp interactive background canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none z-0" 
      />

      {/* Dynamic Cursor Spotlight Glowing Backdrop */}
      <div 
        className="pointer-events-none fixed w-[650px] h-[650px] rounded-full blur-[140px] opacity-30 mix-blend-screen z-0 transition-all duration-700"
        style={{
          left: `${trailPos.x - 325}px`,
          top: `${trailPos.y - 325}px`,
          background: `radial-gradient(circle, ${activeRealm.primary} 0%, ${activeRealm.secondary} 50%, transparent 100%)`,
        }}
      />

      {/* Parallax Orbs (Hue-shifting matching scroll realm) */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none transition-transform duration-300 ease-out z-0 opacity-40"
        style={{
          transform: `translate3d(${px}px, ${py - scrollY * 0.15}px, 0)`,
          top: '10%',
          right: '8%',
          background: `radial-gradient(circle, ${activeRealm.primary} 0%, transparent 70%)`
        }}
      />
      <div 
        className="absolute w-[400px] h-[400px] rounded-full blur-[110px] pointer-events-none transition-transform duration-300 ease-out z-0 opacity-30"
        style={{
          transform: `translate3d(${pxDeep}px, ${pyDeep + scrollY * 0.1}px, 0)`,
          bottom: '15%',
          left: '8%',
          background: `radial-gradient(circle, ${activeRealm.secondary} 0%, transparent 70%)`
        }}
      />

      {/* Shockwave expanding click rings */}
      <AnimatePresence>
        {clickRipples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ opacity: 0.8, scale: 0, x: ripple.x, y: ripple.y }}
            animate={{ opacity: 0, scale: 4.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed w-16 h-16 rounded-full border-2 pointer-events-none z-40 transform -translate-x-1/2 -translate-y-1/2"
            style={{ 
              borderColor: ripple.color,
              boxShadow: `0 0 20px ${ripple.color}, inset 0 0 10px ${ripple.color}`
            }}
          />
        ))}
      </AnimatePresence>



      {/* Floating Interactive Realm Controls */}
      <div className="absolute top-20 right-6 z-30">
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className={`flex items-center gap-2.5 px-3 py-1.5 bg-slate-900/90 text-xs font-mono rounded-full border ${activeRealm.borderColor} text-slate-300 shadow-lg backdrop-blur-md`}
        >
          <Layers size={13} className="text-indigo-400 animate-pulse" />
          <span>Realm: <strong className="text-white">{activeRealm.name}</strong></span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
        </motion.div>
      </div>

      {/* Hero Section */}
      <section className="w-full pt-20 pb-24 px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero text container */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-slate-950/85 text-indigo-300 rounded-full border ${activeRealm.borderColor} text-xs font-semibold font-mono tracking-wide uppercase shadow-inner`}
            >
              <Sparkles size={14} className="animate-spin text-indigo-400" style={{ animationDuration: '5s' }} />
              <span>Full-Stack Computer Science Engineer</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white font-display leading-tight">
              Hi, I'm <br />
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${activeRealm.gradientText} drop-shadow-[0_2px_15px_rgba(99,102,241,0.25)] transition-all duration-700`}>
                Laksh Suthar
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
              A forward-thinking Computer Science student specializing in building high-performance, real-time web solutions with <strong className="text-slate-200 font-medium">Java, Python, React.js</strong>, and <strong className="text-slate-200 font-medium">Firebase</strong>.
            </p>

            {/* CTA controls */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <motion.a 
                href="/resume" 
                onClick={(e) => handleLinkClick(e, '/resume')}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 cursor-pointer border border-indigo-400/20"
              >
                View Resume
                <ArrowRight className="ml-2 h-5 w-5 animate-pulse" />
              </motion.a>
              
              <motion.a 
                href="/contact" 
                onClick={(e) => handleLinkClick(e, '/contact')}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold rounded-xl text-slate-300 bg-slate-900 hover:bg-slate-850 border border-slate-800 transition-all cursor-pointer"
              >
                Let's Collaborate
              </motion.a>
            </div>

            {/* Live Stats counters */}
            <div className="grid grid-cols-3 gap-4 pt-10 border-t border-slate-900/60 max-w-lg mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <p className="text-3xl font-extrabold text-white font-display">8.24</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-mono mt-1">B.E. CGPA</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-3xl font-extrabold text-indigo-400 font-display">100+</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-mono mt-1">DSA Solved</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-3xl font-extrabold text-purple-400 font-display">2</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-mono mt-1">Core Projects</p>
              </div>
            </div>
          </motion.div>

          {/* Premium Graphical 3D Card Widget */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div 
              ref={dashboardCardRef}
              onMouseMove={(e) => handleCardMouseMove(e, dashboardCardRef)}
              onMouseLeave={() => handleCardMouseLeave(dashboardCardRef)}
              className="w-full max-w-[420px] glass-panel rounded-2xl p-6 shadow-2xl transition-all duration-200 ease-out preserve-3d relative overflow-hidden group cursor-default"
              style={{ borderColor: activeRealm.particleColor + '3a' }}
            >
              {/* Gloss shine reflection overlay */}
              <div className="card-glare-overlay absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300 z-10" />

              <div className="flex items-center justify-between border-b border-slate-900 pb-4 mb-4 relative z-20">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.5)] animate-pulse" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_8px_rgba(245,158,11,0.5)] animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
                <span className="text-xs font-mono text-slate-500 group-hover:text-indigo-400 transition-colors">laksh_suthar.json</span>
              </div>

              {/* Graphics visual indicators */}
              <div className="space-y-4 relative z-20">
                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-900 shadow-inner group-hover:border-indigo-500/20 transition-all">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-mono text-indigo-400 font-bold flex items-center gap-1.5">
                      <Cpu size={14} className="animate-spin" style={{ animationDuration: '6s' }} />
                      AI Fake News Analyzer
                    </span>
                    <span className="text-xs font-mono text-slate-500">Live Web AI</span>
                  </div>
                  <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '85%' }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full" 
                    />
                  </div>
                  <div className="flex justify-between items-center mt-2 text-[10px] text-slate-500 font-mono">
                    <span>Authenticity Engine</span>
                    <span className="text-indigo-400">98.4% Accuracy</span>
                  </div>
                </div>

                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-900 shadow-inner group-hover:border-emerald-500/20 transition-all">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                      <Database size={14} />
                      Firebase Stock Ledger
                    </span>
                    <span className="text-xs font-mono text-slate-500">Synced</span>
                  </div>
                  <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '92%' }}
                      transition={{ duration: 1.5, delay: 0.7 }}
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" 
                    />
                  </div>
                  <div className="flex justify-between items-center mt-2 text-[10px] text-slate-500 font-mono">
                    <span>Inventory Realtime Sync</span>
                    <span className="text-emerald-400 font-semibold">Live Syncing [Active]</span>
                  </div>
                </div>

                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-900 shadow-inner space-y-2 group-hover:border-purple-500/20 transition-all">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                    <Flame size={14} className="text-orange-500 animate-bounce" />
                    <span>DSA Milestone Tracker</span>
                  </div>
                  <div className="flex items-center justify-between gap-2 text-xs font-mono">
                    <span className="text-slate-500">Completed LeetCode</span>
                    <span className="text-indigo-400 font-bold">100+ Solved</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Domain expertise section (With 3D hover effects) */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full py-20 bg-slate-900/10 border-y border-slate-900/60 relative z-10 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 text-indigo-300 rounded-full text-xs font-mono mb-3 border ${activeRealm.borderColor}`}>
              <Code2 size={12} />
              <span>Core Expertise</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white font-display tracking-tight animate-pulse" style={{ animationDuration: '6s' }}>
              Engineering Domain & Capabilities
            </h2>
            <p className="mt-4 text-base text-slate-400 max-w-2xl mx-auto">
              Translating complex algorithms and computer science fundamentals into responsive, enterprise-grade digital experiences.
            </p>
          </div>

          <motion.div 
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.12
                }
              }
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <motion.div variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 15 } } }}>
              <InteractiveSkillCard 
                icon={<Terminal size={28} />} 
                title="C & Python Scripting" 
                description="Strong foundations in core programming, scripting, Flask development, and statistical intelligence." 
                accent="indigo"
                activeColor={activeRealm.particleColor}
              />
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 15 } } }}>
              <InteractiveSkillCard 
                icon={<Cpu size={28} />} 
                title="Java & OOP Architecture" 
                description="Object-oriented patterns, software engineering standards, robust logic, and secure codebases." 
                accent="purple"
                activeColor={activeRealm.particleColor}
              />
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 15 } } }}>
              <InteractiveSkillCard 
                icon={<Globe size={28} />} 
                title="Full-Stack Web Dev" 
                description="Building dynamic interfaces with React, Next.js, TypeScript, and modern styling solutions like Tailwind CSS." 
                accent="indigo"
                activeColor={activeRealm.particleColor}
              />
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 15 } } }}>
              <InteractiveSkillCard 
                icon={<Database size={28} />} 
                title="Databases & Firebase" 
                description="Mastery in relational SQL databases and highly responsive real-time structures with Firebase Firestore." 
                accent="emerald"
                activeColor={activeRealm.particleColor}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Scroll indicator banner */}
      <div className="w-full py-10 flex flex-col items-center justify-center relative z-20 pointer-events-none text-slate-500 font-mono text-xs gap-2">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDownCircle size={18} className="text-indigo-400" />
        </motion.div>
        <span>SCROLL DOWN TO PROGRESS SPATIAL COORDINATES</span>
      </div>

      {/* Interactive About Brief Card */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.96, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="w-full py-20 relative z-10 max-w-4xl mx-auto px-4 sm:px-6"
      >
        <div 
          ref={aboutCardRef}
          onMouseMove={(e) => handleCardMouseMove(e, aboutCardRef)}
          onMouseLeave={() => handleCardMouseLeave(aboutCardRef)}
          className="glass-panel rounded-3xl p-8 md:p-12 shadow-2xl transition-all duration-200 ease-out preserve-3d relative overflow-hidden group cursor-default"
          style={{ borderColor: activeRealm.particleColor + '3a' }}
        >
          {/* Shine reflection overlay */}
          <div className="card-glare-overlay absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300 z-10" />

          <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-600/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-indigo-600/20 transition-all duration-500 z-0" />
          
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-20">
            <div className="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-indigo-400 flex-shrink-0 animate-pulse group-hover:scale-105 transition-transform duration-300">
              <Monitor size={54} />
            </div>
            
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-3xl font-extrabold text-white font-display">A Closer Look</h2>
              <p className="text-slate-400 leading-relaxed text-base font-sans">
                Currently pursuing a Bachelor of Engineering (B.E.) in Computer Science & Engineering at the prestigious <strong className="text-indigo-400 font-medium">JSS Academy of Technical Education, Bengaluru</strong>. Focused on modern web technologies, AI integrations, data structures, and building robust full-stack applications.
              </p>
              <div className="pt-2">
                <a 
                  href="/bio" 
                  onClick={(e) => handleLinkClick(e, '/bio')}
                  className="text-indigo-400 font-semibold hover:text-indigo-300 inline-flex items-center gap-2 group/link cursor-pointer transition-colors"
                >
                  <span>Explore personal profile</span> 
                  <ArrowRight className="h-4 w-4 transform group-hover/link:translate-x-1.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

    </div>
  );
};

interface InteractiveSkillCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  accent: 'indigo' | 'purple' | 'emerald';
  activeColor: string;
}

const InteractiveSkillCard: React.FC<InteractiveSkillCardProps> = ({ icon, title, description, accent, activeColor }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    
    const centerX = box.width / 2;
    const centerY = box.height / 2;
    
    const rotateX = -((y - centerY) / centerY) * 11;
    const rotateY = ((x - centerX) / centerX) * 11;
    
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`;
    card.style.boxShadow = `0 20px 45px -10px ${activeColor}2b`;
    
    const glare = card.querySelector('.skill-glare-overlay') as HTMLDivElement | null;
    if (glare) {
      const percentageX = (x / box.width) * 100;
      const percentageY = (y / box.height) * 100;
      glare.style.background = `radial-gradient(circle at ${percentageX}% ${percentageY}%, rgba(255, 255, 255, 0.15) 0%, transparent 60%)`;
      glare.style.opacity = '1';
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    
    card.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    card.style.boxShadow = 'none';
    
    const glare = card.querySelector('.skill-glare-overlay') as HTMLDivElement | null;
    if (glare) {
      glare.style.opacity = '0';
    }
  };

  const accentColors = {
    indigo: 'text-indigo-400 border-slate-900 hover:border-indigo-500/30 shadow-indigo-600/5',
    purple: 'text-purple-400 border-slate-900 hover:border-purple-500/30 shadow-purple-600/5',
    emerald: 'text-emerald-400 border-slate-900 hover:border-emerald-500/30 shadow-emerald-600/5'
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`p-6 bg-slate-950/80 rounded-2xl border shadow-xl transition-all duration-200 ease-out preserve-3d relative overflow-hidden group cursor-default ${accentColors[accent]}`}
    >
      {/* Glare spotlight layer */}
      <div className="skill-glare-overlay absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300 z-10" />

      <div className="mb-4 group-hover:scale-110 transition-transform duration-300 relative z-20">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-white mb-2 font-display relative z-20">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed font-sans relative z-20">{description}</p>
    </div>
  );
};
