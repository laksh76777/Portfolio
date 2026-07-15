import React from 'react';
import { User, MapPin, Calendar, Phone, Mail, Flag, GraduationCap, Award, Compass } from 'lucide-react';

const handleMouseMove3D = (e: React.MouseEvent<HTMLDivElement>) => {
  const card = e.currentTarget;
  const box = card.getBoundingClientRect();
  const x = e.clientX - box.left - box.width / 2;
  const y = e.clientY - box.top - box.height / 2;
  
  const rotX = -(y / (box.height / 2)) * 5;
  const rotY = (x / (box.width / 2)) * 5;
  
  card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.01, 1.01, 1.01)`;
  card.style.boxShadow = `0 15px 30px -15px rgba(99, 102, 241, 0.2)`;
};

const handleMouseLeave3D = (e: React.MouseEvent<HTMLDivElement>) => {
  const card = e.currentTarget;
  card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  card.style.boxShadow = `none`;
};

export const BioData: React.FC = () => {
  return (
    <div className="bg-slate-950 min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-grid-pattern relative">
      {/* Decorative ambient gradients */}
      <div className="absolute top-10 right-10 w-[250px] h-[250px] bg-purple-600/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[250px] h-[250px] bg-indigo-600/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* Dossier Card Container */}
        <div 
          onMouseMove={handleMouseMove3D}
          onMouseLeave={handleMouseLeave3D}
          className="glass-panel rounded-3xl overflow-hidden shadow-2xl border border-slate-800/80 tilt-card"
        >
          {/* Dossier Header */}
          <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 px-8 py-12 text-center border-b border-indigo-950/80 relative">
            <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-10 pointer-events-none" />
            <div className="inline-flex items-center gap-1 bg-indigo-500/15 text-indigo-300 border border-indigo-500/20 px-3 py-1 rounded-full text-xs font-mono mb-3 uppercase tracking-wider">
              <User size={12} />
              <span>Personal Dossier</span>
            </div>
            <h1 className="text-4xl text-white font-extrabold font-display tracking-tight">Bio-Data</h1>
            <p className="text-slate-400 mt-2 font-mono text-sm">Laksh Suthar - Professional Profile</p>
          </div>

          <div className="p-8 md:p-12 space-y-10">
            
            {/* Primary Particulars Grid */}
            <div>
              <div className="flex items-center gap-2 mb-6 border-b border-slate-800/80 pb-2">
                <Compass className="text-indigo-400" size={18} />
                <h3 className="text-lg font-bold text-white font-display uppercase tracking-wide">General Particulars</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <BioRow icon={<User size={16} />} label="Full Name" value="Laksh Suthar" />
                <BioRow icon={<Calendar size={16} />} label="Date of Birth" value="14 September 2003" />
                <BioRow icon={<Flag size={16} />} label="Nationality" value="Indian" />
                <BioRow icon={<MapPin size={16} />} label="Current Location" value="Bengaluru, Karnataka" />
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <div className="flex items-center gap-2 mb-6 border-b border-slate-800/80 pb-2">
                <Phone className="text-indigo-400" size={18} />
                <h3 className="text-lg font-bold text-white font-display uppercase tracking-wide">Reachability</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <BioRow icon={<Phone size={16} />} label="Mobile Phone" value="+91-9024005934" />
                <BioRow icon={<Mail size={16} />} label="Email Address" value="lakshsuthar703@gmail.com" />
              </div>
            </div>

            {/* Educational Qualifications Table */}
            <div>
              <div className="flex items-center gap-2 mb-6 border-b border-slate-800/80 pb-2">
                <GraduationCap className="text-indigo-400" size={18} />
                <h3 className="text-lg font-bold text-white font-display uppercase tracking-wide">Academic Qualifications</h3>
              </div>
              <div className="overflow-hidden border border-slate-800/80 rounded-xl">
                <table className="min-w-full divide-y divide-slate-800/80">
                  <thead className="bg-slate-950">
                    <tr>
                      <th className="px-5 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">Degree</th>
                      <th className="px-5 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">Institution</th>
                      <th className="px-5 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">Current Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-slate-900/40 divide-y divide-slate-800/80">
                    <tr className="hover:bg-slate-900/60 transition-colors">
                      <td className="px-5 py-4 whitespace-nowrap text-sm font-bold text-indigo-300">
                        B.E. (Computer Science & Eng)
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-300">
                        JSS Academy of Technical Education, Bengaluru
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-sm">
                        <span className="px-2.5 py-0.5 text-xs font-medium bg-indigo-500/15 text-indigo-300 border border-indigo-500/20 rounded-full font-mono">
                          Pursuing (Grad May 2027)
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Languages Known */}
            <div>
              <div className="flex items-center gap-2 mb-6 border-b border-slate-800/80 pb-2">
                <Award className="text-indigo-400" size={18} />
                <h3 className="text-lg font-bold text-white font-display uppercase tracking-wide">Languages</h3>
              </div>
              <div className="flex gap-2.5 flex-wrap">
                <LanguageBadge language="English" prof="Professional" />
                <LanguageBadge language="Hindi" prof="Native Bilingual" />
                <LanguageBadge language="Kannada" prof="Elementary" />
              </div>
            </div>
            
            {/* Solemn Declaration & Signature */}
            <div className="bg-slate-950/50 rounded-2xl p-6 border border-slate-850/80 space-y-6">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest font-mono">Declaration</h4>
              <p className="text-slate-400 text-sm italic leading-relaxed">
                "I hereby solemnly declare that the facts and particulars stated in this dossier are true, correct, and complete to the best of my knowledge and belief, and I bear full responsibility for the accuracy of the same."
              </p>
              
              <div className="flex justify-end pt-4">
                <div className="text-center">
                  <p className="font-serif text-2xl text-slate-200 tracking-widest italic font-medium">
                    Laksh Suthar
                  </p>
                  <p className="text-[10px] text-slate-500 font-mono border-t border-slate-800/80 pt-1.5 px-6 uppercase tracking-wider">
                    Dossier Signature
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

interface BioRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const BioRow: React.FC<BioRowProps> = ({ icon, label, value }) => (
  <div className="flex items-center p-4 bg-slate-950/40 rounded-xl border border-slate-800/60 hover:border-indigo-500/20 transition-all duration-300 group">
    <div className="text-indigo-400 mr-4 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <div>
      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">{label}</p>
      <p className="text-sm font-semibold text-slate-200 mt-0.5">{value}</p>
    </div>
  </div>
);

interface LanguageBadgeProps {
  language: string;
  prof: string;
}

const LanguageBadge: React.FC<LanguageBadgeProps> = ({ language, prof }) => (
  <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/60 border border-slate-800 hover:border-indigo-500/20 rounded-xl text-sm transition-all">
    <span className="font-bold text-slate-200">{language}</span>
    <span className="text-slate-500 font-mono text-xs">({prof})</span>
  </div>
);
