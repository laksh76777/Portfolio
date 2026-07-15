import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquarePlus, Sparkles, CheckCircle } from 'lucide-react';

const handleMouseMove3D = (e: React.MouseEvent<HTMLDivElement>) => {
  const card = e.currentTarget;
  const box = card.getBoundingClientRect();
  const x = e.clientX - box.left - box.width / 2;
  const y = e.clientY - box.top - box.height / 2;
  
  const rotX = -(y / (box.height / 2)) * 6;
  const rotY = (x / (box.width / 2)) * 6;
  
  card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.01, 1.01, 1.01)`;
  card.style.boxShadow = `0 15px 30px -10px rgba(99, 102, 241, 0.25)`;
};

const handleMouseLeave3D = (e: React.MouseEvent<HTMLDivElement>) => {
  const card = e.currentTarget;
  card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  card.style.boxShadow = `none`;
};

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate neat form sending transition
    setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
    }, 1200);
  };

  return (
    <div className="bg-slate-950 min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-grid-pattern relative">
      {/* Decorative ambient gradients */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-indigo-600/5 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-purple-600/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Page Title */}
        <div className="text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 text-indigo-300 rounded-full text-xs font-mono border border-indigo-500/20 uppercase tracking-wider">
            <Sparkles size={12} className="animate-pulse" />
            <span>Inquiry Hub</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white font-display tracking-tight">
            Get in Touch
          </h1>
          <p className="text-slate-400 max-w-lg mx-auto text-sm sm:text-base">
            Have an open software engineering role, a collaborative project idea, or just want to say hi? Send an inquiry!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Info Card */}
          <div 
            onMouseMove={handleMouseMove3D}
            onMouseLeave={handleMouseLeave3D}
            className="md:col-span-5 glass-panel rounded-2xl p-8 border border-slate-800 shadow-2xl tilt-card space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold text-white font-display">Direct Channels</h2>
              <p className="text-xs text-slate-500 font-mono mt-1 uppercase tracking-wider">Communication Logs</p>
            </div>
            
            <div className="space-y-6">
              <ContactChannel 
                icon={<Phone size={20} />} 
                title="Mobile Line" 
                detail="+91-9024005934" 
                sub="Available Mon-Fri, 9am-6pm"
              />

              <ContactChannel 
                icon={<Mail size={20} />} 
                title="Electronic Mail" 
                detail="lakshsuthar703@gmail.com" 
                href="mailto:lakshsuthar703@gmail.com"
                sub="Primary correspondence"
              />

              <ContactChannel 
                icon={<MapPin size={20} />} 
                title="Engineering Location" 
                detail="Bengaluru, Karnataka" 
                sub="JSS Academy of Technical Education"
              />
            </div>
          </div>

          {/* Column 2: Form Card */}
          <div 
            onMouseMove={handleMouseMove3D}
            onMouseLeave={handleMouseLeave3D}
            className="md:col-span-7 glass-panel rounded-2xl p-8 border border-slate-800 shadow-2xl tilt-card"
          >
             <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-850/80">
                <div className="flex items-center gap-2">
                  <MessageSquarePlus className="text-indigo-400" size={20} />
                  <h2 className="text-2xl font-bold text-white font-display">Inquiry Slate</h2>
                </div>
                <span className="text-xs font-mono text-slate-500">secure_inbox.sh</span>
             </div>

             {submitted ? (
                 <div className="flex flex-col items-center justify-center text-center py-10 space-y-4">
                     <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center border border-emerald-500/20 animate-bounce">
                         <CheckCircle size={32} />
                     </div>
                     <h3 className="text-2xl font-bold text-white font-display">Message Lodged!</h3>
                     <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
                       Thank you for reaching out. Your message has been successfully saved, and Laksh will get back to you shortly.
                     </p>
                     <button 
                        onClick={() => setSubmitted(false)}
                        className="mt-4 px-5 py-2.5 bg-slate-900 text-indigo-400 hover:text-indigo-300 font-semibold text-sm rounded-xl border border-slate-800 transition-colors"
                     >
                        Send another message
                     </button>
                 </div>
             ) : (
                 <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="name" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">Full Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="mt-1.5 block w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all placeholder-slate-600 font-sans"
                          placeholder="Laksh Suthar"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="mt-1.5 block w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all placeholder-slate-600 font-sans"
                          placeholder="you@example.com"
                        />
                    </div>
                  </div>
                  <div>
                      <label htmlFor="message" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">Message Inquiry</label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="mt-1.5 block w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none placeholder-slate-600 font-sans"
                        placeholder="Detail your inquiry here..."
                      />
                  </div>
                  
                  <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 border border-indigo-500/20 text-sm font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none transition-all duration-300 shadow-lg shadow-indigo-600/20 active:scale-95 disabled:opacity-50"
                  >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Delivering...</span>
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          <span>Transmit Message</span>
                        </>
                      )}
                  </button>
                 </form>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface ContactChannelProps {
  icon: React.ReactNode;
  title: string;
  detail: string;
  href?: string;
  sub: string;
}

const ContactChannel: React.FC<ContactChannelProps> = ({ icon, title, detail, href, sub }) => (
  <div className="flex items-start group/item p-3.5 hover:bg-slate-900/40 rounded-xl border border-transparent hover:border-slate-800/80 transition-all duration-300">
    <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400 group-hover/item:scale-110 transition-transform">
      {icon}
    </div>
    <div className="ml-5">
      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">{title}</p>
      {href ? (
        <a href={href} className="text-base font-bold text-indigo-300 hover:text-indigo-400 transition-colors block mt-0.5">
          {detail}
        </a>
      ) : (
        <p className="text-base font-bold text-slate-200 mt-0.5">{detail}</p>
      )}
      <p className="text-xs text-slate-500 mt-1">{sub}</p>
    </div>
  </div>
);
