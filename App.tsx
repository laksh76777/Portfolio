import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { Resume } from './components/Resume';
import { BioData } from './components/BioData';
import { Contact } from './components/Contact';
import { ChatWidget } from './components/ChatWidget';
import { motion } from 'motion/react';

const App: React.FC = () => {
  // Initialize state based on current hash, defaulting to '/'
  const [currentPath, setCurrentPath] = useState(window.location.hash.slice(1) || '/');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleHashChange = () => {
      // Remove the '#' and default to '/' if empty
      const path = window.location.hash.slice(1) || '/';
      setCurrentPath(path);
      window.scrollTo(0, 0);
    };

    // Listen for hash changes to update state (handles browser back/forward)
    window.addEventListener('hashchange', handleHashChange);
    
    // Initial check
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(window.scrollY / totalHeight);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Quick delay check to make sure height is calculated after children are mounted and rendered
    const handle = requestAnimationFrame(handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(handle);
    };
  }, [currentPath]);

  const handleNavigate = (path: string) => {
    window.location.hash = path;
  };

  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return <Home onNavigate={handleNavigate} />;
      case '/resume':
        return <Resume />;
      case '/bio':
        return <BioData />;
      case '/contact':
        return <Contact />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-slate-950 text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Global Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-[100] origin-left pointer-events-none shadow-[0_1px_12px_rgba(139,92,246,0.6)]"
        style={{ scaleX: scrollProgress }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress }}
        transition={{ type: "spring", stiffness: 180, damping: 25, restDelta: 0.001 }}
      />
      <Navbar currentPath={currentPath} onNavigate={handleNavigate} />
      <main className="flex-grow pt-16">
        {renderPage()}
      </main>
      <ChatWidget />
      <Footer />
    </div>
  );
};

export default App;