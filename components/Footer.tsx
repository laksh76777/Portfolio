import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-8 mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold text-slate-200">Laksh Suthar</h3>
            <p className="text-sm text-slate-500">Computer Science Engineer</p>
          </div>
          
          <div className="flex space-x-6">
            <a 
              href="https://github.com/laksh76777" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-indigo-400 transition-colors"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/in/laksh-suthar" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-indigo-400 transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=lakshsuthar703@gmail.com"
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-indigo-400 transition-colors"
              title="Compose email in Gmail"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-900 text-center text-xs text-slate-600">
          &copy; {new Date().getFullYear()} Laksh Suthar. All rights reserved.
        </div>
      </div>
    </footer>
  );
};