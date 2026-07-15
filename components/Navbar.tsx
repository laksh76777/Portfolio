import React, { useState } from 'react';
import { Menu, X, Code2, Sparkles } from 'lucide-react';
import { NavItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Resume', path: '/resume' },
  { label: 'Bio-Data', path: '/bio' },
  { label: 'Contact', path: '/contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    onNavigate(path);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 w-full bg-slate-950/20 backdrop-blur-lg border-b border-slate-900/40 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo Brand with Micro-Interactive Animation */}
          <div className="flex items-center">
            <a 
              href="/" 
              onClick={(e) => handleLinkClick(e, '/')}
              className="flex-shrink-0 flex items-center gap-2.5 group"
            >
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 10 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-tr from-indigo-600 to-purple-600 p-1.5 rounded-xl text-white shadow-lg shadow-indigo-600/30"
              >
                <Code2 size={18} />
              </motion.div>
              <span className="font-bold text-base text-slate-100 tracking-tight font-sans">
                Laksh<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 font-extrabold">.dev</span>
              </span>
            </a>
          </div>
          
          {/* Desktop Menu - High Glass Liquid Slider */}
          <div className="hidden md:flex md:items-center bg-slate-900/40 p-1 rounded-full border border-slate-800/40">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => handleLinkClick(e, item.path)}
                  className={`relative px-4 py-1.5 rounded-full text-xs uppercase tracking-wider font-mono font-semibold transition-colors duration-300 select-none ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-indigo-300'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-indigo-500/15 border border-indigo-500/25 rounded-full shadow-[0_4px_16px_rgba(99,102,241,0.25),inset_0_2px_4px_rgba(255,255,255,0.08)] z-0"
                      transition={{
                        type: "spring",
                        stiffness: 140,
                        damping: 12,
                        mass: 0.75
                      }}
                      style={{ originY: '0px' }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </div>

          {/* Connect CTA on Navbar */}
          <div className="hidden md:flex items-center">
            <motion.a
              href="/contact"
              onClick={(e) => handleLinkClick(e, '/contact')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-300 rounded-full border border-indigo-500/20 text-[11px] font-semibold uppercase tracking-wider font-mono transition-all"
            >
              <Sparkles size={11} className="animate-pulse" />
              <span>Hire Me</span>
            </motion.a>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <motion.button
              onClick={toggleMenu}
              whileTap={{ scale: 0.92 }}
              className="inline-flex items-center justify-center p-1.5 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-slate-900/60 focus:outline-none transition-colors"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Panel with Smooth Framer Motion Collapse */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden bg-slate-950/95 border-t border-slate-900/80 rounded-b-2xl backdrop-blur-xl"
          >
            <div className="px-3 pt-2 pb-4 space-y-1 sm:px-4">
              {NAV_ITEMS.map((item) => {
                 const isActive = currentPath === item.path;
                 return (
                  <a
                    key={item.path}
                    href={item.path}
                    onClick={(e) => handleLinkClick(e, item.path)}
                    className={`relative block px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-mono font-bold transition-all ${
                       isActive
                        ? 'text-indigo-400 bg-indigo-500/10 border-l-2 border-indigo-500'
                        : 'text-slate-400 hover:text-indigo-400 hover:bg-slate-900/50'
                    }`}
                  >
                    {item.label}
                  </a>
                 );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
