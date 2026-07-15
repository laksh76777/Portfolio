import React from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { motion } from 'motion/react';

interface FooterProps {
  theme?: string;
}

export const Footer: React.FC<FooterProps> = ({ theme }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="relative z-30 w-full py-10 px-4 sm:px-6 lg:px-8 mt-auto">
      {/* Curved glowing glass container for the footer content */}
      <div className="max-w-7xl mx-auto glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl transition-all duration-300">
        
        {/* Subtle decorative glow spots that match the portfolio ambient style */}
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-[60px] pointer-events-none" />
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-[60px] pointer-events-none" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
          
          {/* Identity & Subtext */}
          <div className="text-center md:text-left space-y-1">
            <h3 className="text-lg font-extrabold text-white font-display tracking-wide">
              Laksh Suthar
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Computer Science & Engineering Student
            </p>
          </div>

          {/* Social Links with Elegant Hover States */}
          <div className="flex items-center space-x-4">
            <motion.a 
              href="https://github.com/laksh76777" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 rounded-xl bg-slate-900/40 border border-slate-800/40 hover:border-indigo-500/30 text-slate-400 hover:text-indigo-400 shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-colors cursor-pointer"
              title="GitHub Profile"
            >
              <Github size={20} />
            </motion.a>

            <motion.a 
              href="https://www.linkedin.com/in/laksh-suthar" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 rounded-xl bg-slate-900/40 border border-slate-800/40 hover:border-indigo-500/30 text-slate-400 hover:text-indigo-400 shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-colors cursor-pointer"
              title="LinkedIn Profile"
            >
              <Linkedin size={20} />
            </motion.a>

            <motion.a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=lakshsuthar703@gmail.com"
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 rounded-xl bg-slate-900/40 border border-slate-800/40 hover:border-indigo-500/30 text-slate-400 hover:text-indigo-400 shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-colors cursor-pointer"
              title="Compose Email in Gmail"
            >
              <Mail size={20} />
            </motion.a>
          </div>

          {/* Interactive Scroll to Top Action */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 font-mono hidden sm:inline uppercase tracking-wider">
              Return to Top
            </span>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 hover:text-white hover:bg-indigo-600/20 transition-all duration-300 cursor-pointer shadow-[0_4px_12px_rgba(99,102,241,0.1)]"
              aria-label="Scroll to Top"
              title="Scroll to Top"
            >
              <ArrowUp size={18} />
            </motion.button>
          </div>

        </div>

        {/* Separator / Divider with subtle lighting gradient */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-slate-800 to-transparent my-6 opacity-60" />

        {/* Copyright info */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-center text-xs text-slate-500 font-mono gap-2">
          <span>&copy; {new Date().getFullYear()} Laksh Suthar. All rights reserved.</span>
          <span className="text-[10px] text-slate-600">Built with React, TypeScript & Tailwind CSS</span>
        </div>

      </div>
    </footer>
  );
};
