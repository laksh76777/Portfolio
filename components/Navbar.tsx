import React, { useState } from 'react';
import { Menu, X, Code2 } from 'lucide-react';
import { NavItem } from '../types';

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
    <nav className="fixed top-0 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a 
              href="/" 
              onClick={(e) => handleLinkClick(e, '/')}
              className="flex-shrink-0 flex items-center gap-2"
            >
              <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
                <Code2 size={24} />
              </div>
              <span className="font-bold text-xl text-slate-100 tracking-tight">
                Laksh<span className="text-indigo-500">.dev</span>
              </span>
            </a>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => handleLinkClick(e, item.path)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-indigo-400 bg-indigo-500/10'
                      : 'text-slate-400 hover:text-indigo-400 hover:bg-slate-900'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-indigo-400 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_ITEMS.map((item) => {
               const isActive = currentPath === item.path;
               return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => handleLinkClick(e, item.path)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                     isActive
                      ? 'text-indigo-400 bg-indigo-500/10'
                      : 'text-slate-400 hover:text-indigo-400 hover:bg-slate-900'
                  }`}
                >
                  {item.label}
                </a>
               );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};