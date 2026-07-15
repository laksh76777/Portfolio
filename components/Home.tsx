import React from 'react';
import { 
  ArrowRight, 
  Terminal, 
  Cpu, 
  Database, 
  Globe, 
  Sparkles, 
  Code2, 
  Flame, 
  FileCheck, 
  TrendingUp,
  Github,
  Monitor
} from 'lucide-react';

interface HomeProps {
  onNavigate: (path: string) => void;
}

// 3D Tilt Handlers
const handleMouseMove3D = (e: React.MouseEvent<HTMLDivElement>) => {
  const card = e.currentTarget;
  const box = card.getBoundingClientRect();
  const x = e.clientX - box.left - box.width / 2;
  const y = e.clientY - box.top - box.height / 2;
  
  const rotX = -(y / (box.height / 2)) * 6;
  const rotY = (x / (box.width / 2)) * 6;
  
  card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
  card.style.boxShadow = `0 15px 30px -10px rgba(99, 102, 241, 0.25)`;
};

const handleMouseLeave3D = (e: React.MouseEvent<HTMLDivElement>) => {
  const card = e.currentTarget;
  card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  card.style.boxShadow = `none`;
};

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <div className="flex flex-col items-center bg-slate-950 text-slate-100 min-h-screen relative overflow-hidden bg-grid-pattern">
      
      {/* Decorative ambient gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 left-10 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[90px] pointer-events-none" />

      {/* Hero Section */}
      <section className="w-full pt-16 pb-24 px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Intro */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/20 text-xs font-semibold font-mono tracking-wide uppercase">
              <Sparkles size={14} className="animate-spin text-indigo-400" />
              <span>Full-Stack Computer Science Engineer</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white font-display leading-tight">
              Hi, I'm <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-300 drop-shadow-[0_2px_10px_rgba(99,102,241,0.2)] animate-pulse">
                Laksh Suthar
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
              A forward-thinking Computer Science student specializing in building high-performance, real-time web solutions with <strong className="text-slate-200">Java, Python, React.js</strong>, and <strong className="text-slate-200">Firebase</strong>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <a 
                href="/resume" 
                onClick={(e) => handleLinkClick(e, '/resume')}
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-105 active:scale-95 cursor-pointer border border-indigo-400/20"
              >
                View Resume
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a 
                href="/contact" 
                onClick={(e) => handleLinkClick(e, '/contact')}
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold rounded-xl text-slate-300 bg-slate-900 hover:bg-slate-800 transition-all duration-300 shadow-sm border border-slate-800 hover:scale-105 active:scale-95 cursor-pointer"
              >
                Let's Collaborate
              </a>
            </div>

            {/* Live Stats Row */}
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
          </div>

          {/* Graphical 3D-styled Visual Dashboard Widget */}
          <div className="lg:col-span-5 flex justify-center">
            <div 
              onMouseMove={handleMouseMove3D}
              onMouseLeave={handleMouseLeave3D}
              className="w-full max-w-[420px] glass-panel rounded-2xl p-6 shadow-2xl border-t border-indigo-500/20 transition-all duration-300 tilt-card preserve-3d"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <span className="text-xs font-mono text-slate-500">laksh_suthar.json</span>
              </div>

              {/* Graphics Visual representation of AI News Analyzer & Firestore System */}
              <div className="space-y-4">
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-mono text-indigo-400 font-bold flex items-center gap-1">
                      <Cpu size={14} className="animate-pulse" />
                      AI Fake News Analyzer
                    </span>
                    <span className="text-xs font-mono text-slate-500">Live API Verified</span>
                  </div>
                  <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse" style={{ width: '85%' }} />
                  </div>
                  <div className="flex justify-between items-center mt-2 text-[10px] text-slate-500 font-mono">
                    <span>Authenticity Engine</span>
                    <span className="text-indigo-400">98.4% Accuracy</span>
                  </div>
                </div>

                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1">
                      <Database size={14} />
                      Firebase Stock Ledger
                    </span>
                    <span className="text-xs font-mono text-slate-500">Synced</span>
                  </div>
                  <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" style={{ width: '92%' }} />
                  </div>
                  <div className="flex justify-between items-center mt-2 text-[10px] text-slate-500 font-mono">
                    <span>Inventory Realtime Sync</span>
                    <span className="text-emerald-400">Live Sync [Active]</span>
                  </div>
                </div>

                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                    <Flame size={14} className="text-orange-500 animate-bounce" />
                    <span>DSA LeetCode Milestone</span>
                  </div>
                  <div className="flex items-center justify-between gap-2 text-xs font-mono">
                    <span className="text-slate-500">Progress</span>
                    <span className="text-indigo-400">100+ Problems</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Skills Showcase Bento Grid */}
      <section className="w-full py-20 bg-slate-900/60 border-y border-slate-900 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-500/10 text-indigo-300 rounded-full text-xs font-mono mb-3">
              <Code2 size={12} />
              <span>Core Expertise</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white font-display tracking-tight">
              Engineering Domain & Capabilities
            </h2>
            <p className="mt-4 text-base text-slate-400 max-w-2xl mx-auto">
              Translating complex algorithms and computer science fundamentals into responsive, enterprise-grade digital experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SkillCard 
              icon={<Terminal size={28} />} 
              title="C & Python Scripting" 
              description="Strong foundations in core programming, scripting, Flask development, and statistical intelligence." 
              accent="indigo"
            />
            <SkillCard 
              icon={<Cpu size={28} />} 
              title="Java & OOP Architecture" 
              description="Object-oriented patterns, software engineering standards, robust logic, and secure codebases." 
              accent="purple"
            />
            <SkillCard 
              icon={<Globe size={28} />} 
              title="Full-Stack Web Dev" 
              description="Building dynamic interfaces with React, Next.js, TypeScript, and modern styling solutions like Tailwind CSS." 
              accent="indigo"
            />
            <SkillCard 
              icon={<Database size={28} />} 
              title="Databases & Firebase" 
              description="Mastery in relational SQL databases and highly responsive real-time structures with Firebase Firestore." 
              accent="emerald"
            />
          </div>
        </div>
      </section>
      
      {/* Interactive About Brief Card */}
      <section className="w-full py-20 relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <div 
          onMouseMove={handleMouseMove3D}
          onMouseLeave={handleMouseLeave3D}
          className="glass-panel rounded-3xl p-8 md:p-12 shadow-2xl border-t border-indigo-500/10 tilt-card relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-600/20 transition-all duration-500" />
          
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-indigo-400 flex-shrink-0 animate-pulse">
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
                  className="text-indigo-400 font-semibold hover:text-indigo-300 inline-flex items-center gap-2 group cursor-pointer transition-colors"
                >
                  <span>Explore personal profile</span> 
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

interface SkillCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  accent: 'indigo' | 'purple' | 'emerald';
}

const SkillCard: React.FC<SkillCardProps> = ({ icon, title, description, accent }) => {
  const accentColors = {
    indigo: 'text-indigo-400 group-hover:text-indigo-300 border-indigo-500/10 group-hover:border-indigo-500/30',
    purple: 'text-purple-400 group-hover:text-purple-300 border-purple-500/10 group-hover:border-purple-500/30',
    emerald: 'text-emerald-400 group-hover:text-emerald-300 border-emerald-500/10 group-hover:border-emerald-500/30'
  };

  return (
    <div 
      onMouseMove={handleMouseMove3D}
      onMouseLeave={handleMouseLeave3D}
      className={`p-6 bg-slate-950/60 rounded-2xl border shadow-xl transition-all duration-300 tilt-card group ${accentColors[accent]}`}
    >
      <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-white mb-2 font-display">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed font-sans">{description}</p>
    </div>
  );
};
