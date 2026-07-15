import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Briefcase, 
  Award, 
  Code, 
  Download, 
  Github, 
  Linkedin, 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  FileText,
  CheckCircle2,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { PortfolioDB } from '../services/dbService';

// 3D Tilt Hook/Handlers for visual polish
const handleMouseMove3D = (e: React.MouseEvent<HTMLDivElement>) => {
  const card = e.currentTarget;
  const box = card.getBoundingClientRect();
  const x = e.clientX - box.left - box.width / 2;
  const y = e.clientY - box.top - box.height / 2;
  
  // Calculate rotations (max 8 degrees for elegant feel)
  const rotX = -(y / (box.height / 2)) * 8;
  const rotY = (x / (box.width / 2)) * 8;
  
  card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
  card.style.boxShadow = `0 20px 40px -15px rgba(99, 102, 241, 0.25)`;
};

const handleMouseLeave3D = (e: React.MouseEvent<HTMLDivElement>) => {
  const card = e.currentTarget;
  card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  card.style.boxShadow = `none`;
};

export const Resume: React.FC = () => {
  const [generatingPDF, setGeneratingPDF] = useState(false);

  // Helper to construct jsPDF instance representing the official document
  const createPDFDocument = (): jsPDF => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Page parameters (A4 is 210mm x 297mm)
    const pageWidth = 210;
    let y = 14;

    // Primary Color Palette
    const primaryColor = [15, 23, 42]; // Slate 900
    const secondaryColor = [79, 70, 229]; // Indigo 600
    const textColor = [51, 65, 85]; // Slate 700

    // Helper for drawing custom horizontal rules
    const drawDivider = (currentY: number) => {
      doc.setDrawColor(226, 232, 240); // slate-200
      doc.setLineWidth(0.3);
      doc.line(15, currentY, pageWidth - 15, currentY);
    };

    // Header: Name & Contact
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('Laksh Suthar', pageWidth / 2, y, { align: 'center' });
    y += 6;

    // Contact Info line
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.text('+91-9024005934  |  lakshsuthar703@gmail.com  |  Bengaluru, Karnataka', pageWidth / 2, y, { align: 'center' });
    y += 5;

    // Links Line
    doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.text('LinkedIn  |  GitHub  |  Portfolio', pageWidth / 2, y, { align: 'center' });
    y += 7;

    // Section drawing helper
    const drawSectionTitle = (title: string, currentY: number): number => {
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text(title.toUpperCase(), 15, currentY);
      drawDivider(currentY + 1.5);
      return currentY + 5.5;
    };

    // 1. SUMMARY
    y = drawSectionTitle('Summary', y);
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    const summaryText = "Final-year Computer Science Engineering student (Expected Graduation: May 2027) with hands-on experience building scalable full-stack applications using Java, Python, React.js, TypeScript, and Firebase. Strong foundation in Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems, Computer Networks, and Software Engineering.";
    const wrappedSummary = doc.splitTextToSize(summaryText, pageWidth - 30);
    doc.text(wrappedSummary, 15, y);
    y += (wrappedSummary.length * 4.5) + 3;

    // 2. EDUCATION
    y = drawSectionTitle('Education', y);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('JSS Academy of Technical Education, Bengaluru', 15, y);
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.text('2023 - 2027', pageWidth - 15, y, { align: 'right' });
    y += 4.5;
    doc.text('Bachelor of Engineering in Computer Science and Engineering', 15, y);
    doc.setFont('Helvetica', 'bold');
    doc.text('CGPA: 8.24/10', pageWidth - 15, y, { align: 'right' });
    y += 7.5;

    // 3. PROJECT EXPERIENCE
    y = drawSectionTitle('Project Experience', y);
    
    // Project 1
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('Fake News Analysis System', 15, y);
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.text('2026', pageWidth - 15, y, { align: 'right' });
    y += 4.5;
    doc.setFont('Helvetica', 'italic');
    doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.text('React, TypeScript, Vite, AI APIs, HTML, CSS', 15, y);
    y += 4.5;

    doc.setFont('Helvetica', 'normal');
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    const proj1Bullets = [
      "Developed a React-based Fake News Analysis System that analyzes news articles in real time and generates authenticity scores using AI APIs.",
      "Built an interactive frontend using React and TypeScript, providing users with real-time news credibility predictions.",
      "Integrated external AI APIs to analyze news content and generate authenticity scores with detailed insights.",
      "Designed a responsive and user-friendly interface using Vite, HTML, and CSS to enhance accessibility and performance.",
      "Applied component-based architecture and API integration to deliver a scalable and maintainable web application."
    ];
    proj1Bullets.forEach((bullet) => {
      doc.text('\u2022', 18, y);
      const wrappedBullet = doc.splitTextToSize(bullet, pageWidth - 35);
      doc.text(wrappedBullet, 22, y);
      y += (wrappedBullet.length * 4.2) + 0.5;
    });
    y += 2;

    // Project 2
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('Inventory Management System', 15, y);
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.text('2025', pageWidth - 15, y, { align: 'right' });
    y += 4.5;
    doc.setFont('Helvetica', 'italic');
    doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.text('React, JavaScript, Firebase, HTML, CSS', 15, y);
    y += 4.5;

    doc.setFont('Helvetica', 'normal');
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    const proj2Bullets = [
      "Developed an inventory management system to automate product tracking and stock management.",
      "Implemented real-time inventory updates using Firebase, ensuring synchronized data across users.",
      "Added low-stock alerts and inventory monitoring features to improve stock availability and operational efficiency.",
      "Designed responsive dashboards for managing products, inventory status, and stock updates.",
      "Utilized React and Firebase to build a scalable, user-friendly web application for efficient inventory management."
    ];
    proj2Bullets.forEach((bullet) => {
      doc.text('\u2022', 18, y);
      const wrappedBullet = doc.splitTextToSize(bullet, pageWidth - 35);
      doc.text(wrappedBullet, 22, y);
      y += (wrappedBullet.length * 4.2) + 0.5;
    });
    y += 3;

    // 4. TECHNICAL SKILLS
    y = drawSectionTitle('Technical Skills', y);
    doc.setFontSize(9.5);
    const skillLines = [
      { label: "Programming Languages: ", val: "Java, C, Python, JavaScript, TypeScript" },
      { label: "Frontend: ", val: "HTML, CSS, Tailwind CSS, React.js, Next.js, Vite" },
      { label: "Backend: ", val: "Node.js, Express.js, Flask, REST APIs, API Integration" },
      { label: "Databases: ", val: "SQL, Firebase Firestore" },
      { label: "Tools & Platforms: ", val: "Git, GitHub, VS Code, Firebase, Vercel, Netlify, Canva, Figma" },
      { label: "Core CS: ", val: "Data Structures and Algorithm, Object-Oriented Programming, Database Management Systems, Operating Systems, Computer Networks, Software Engineering" },
      { label: "Soft Skills: ", val: "Problem Solving, Team Collaboration, Communication, Agile Methodology" }
    ];
    skillLines.forEach((item) => {
      doc.setFont('Helvetica', 'bold');
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text(item.label, 15, y);
      const labelWidth = doc.getTextWidth(item.label);
      doc.setFont('Helvetica', 'normal');
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      const wrappedVal = doc.splitTextToSize(item.val, pageWidth - 30 - labelWidth);
      doc.text(wrappedVal, 15 + labelWidth, y);
      y += (wrappedVal.length * 4.2) + 0.8;
    });
    y += 2;

    // 5. CERTIFICATIONS
    y = drawSectionTitle('Certifications', y);
    doc.setFont('Helvetica', 'normal');
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    const certs = [
      "GeeksforGeeks GFG 160 Certification - Certificate",
      "Machine Learning Specialization (Stanford University & DeepLearning.AI) - Certificate"
    ];
    certs.forEach((cert) => {
      doc.text('\u2022', 18, y);
      doc.text(cert, 22, y);
      y += 4.5;
    });
    y += 2.5;

    // 6. ACHIEVEMENTS
    y = drawSectionTitle('Achievements', y);
    const achievements = [
      "Solved 100+ Data Structures and Algorithms problems across LeetCode and Codolio.",
      "Developed and deployed real-world projects including a Fake News Analysis System and an Inventory Management System using React, TypeScript, Firebase, and AI APIs.",
      "Maintained a CGPA of 8.24/10 in Computer Science and Engineering."
    ];
    achievements.forEach((ach) => {
      doc.text('\u2022', 18, y);
      const wrappedAch = doc.splitTextToSize(ach, pageWidth - 25);
      doc.text(wrappedAch, 22, y);
      y += (wrappedAch.length * 4.2) + 0.5;
    });

    return doc;
  };

  // Pre-populate IndexedDB Database with the official PDF binary on application mount
  useEffect(() => {
    const prefillDatabase = async () => {
      try {
        const storedPdf = await PortfolioDB.getResume();
        if (!storedPdf) {
          const doc = createPDFDocument();
          const base64 = doc.output('datauristring').split(',')[1];
          await PortfolioDB.saveResume(base64);
          console.log("Resume database successfully pre-populated!");
        }
      } catch (err) {
        console.warn("Database prefill warning:", err);
      }
    };
    prefillDatabase();
  }, []);

  // Programmatic PDF Retrieval from the database with direct generation fallback
  const generatePDFResume = async () => {
    setGeneratingPDF(true);
    try {
      // 1. Attempt to fetch from IndexedDB database
      let pdfBase64 = await PortfolioDB.getResume();
      
      // 2. If database is missing the value, construct it, save it, and then proceed
      if (!pdfBase64) {
        const doc = createPDFDocument();
        pdfBase64 = doc.output('datauristring').split(',')[1];
        await PortfolioDB.saveResume(pdfBase64);
      }

      // 3. Download the PDF retrieved directly from the database
      const byteCharacters = atob(pdfBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'Laksh_Suthar_Resume.pdf';
      link.click();
    } catch (e) {
      console.error("Database retrieval failed, running direct fallback generation:", e);
      try {
        const doc = createPDFDocument();
        doc.save('Laksh_Suthar_Resume.pdf');
      } catch (err) {
        console.error("Direct fallback failed too:", err);
      }
    } finally {
      setGeneratingPDF(false);
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-grid-pattern relative">
      {/* Absolute floating graphical ambient mesh */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none animate-blob-slow" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none animate-blob-delay" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header Branding Card */}
        <div className="glass-panel rounded-2xl p-8 mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all duration-500" />
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 text-xs font-semibold bg-indigo-500/20 text-indigo-300 rounded-full border border-indigo-500/30 font-mono tracking-wider uppercase">
                Ready to Deploy
              </span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight font-display">
              Laksh <span className="text-indigo-400">Suthar</span>
            </h1>
            <p className="text-lg text-slate-400 mt-1 font-mono">
              B.Tech in Computer Science & Engineering
            </p>
            
            {/* Quick social links */}
            <div className="flex flex-wrap gap-4 mt-4 text-sm">
              <a href="tel:+919024005934" className="flex items-center gap-1.5 text-slate-400 hover:text-indigo-400 transition-colors">
                <Phone size={14} className="text-indigo-500" />
                <span>+91-9024005934</span>
              </a>
              <a href="mailto:lakshsuthar703@gmail.com" className="flex items-center gap-1.5 text-slate-400 hover:text-indigo-400 transition-colors">
                <Mail size={14} className="text-indigo-500" />
                <span>lakshsuthar703@gmail.com</span>
              </a>
              <span className="flex items-center gap-1.5 text-slate-400">
                <MapPin size={14} className="text-indigo-500" />
                <span>Bengaluru, Karnataka</span>
              </span>
            </div>
          </div>

          <button 
            onClick={generatePDFResume}
            disabled={generatingPDF}
            className="w-full md:w-auto flex items-center justify-center gap-2.5 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all duration-300 border border-indigo-400/30 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transform active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed"
          >
            {generatingPDF ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Download size={20} className="animate-bounce" />
                <span>Download Resume PDF</span>
              </>
            )}
          </button>
        </div>

        {/* 3D Bento-Grid Style Resume Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Main Column */}
          <div className="md:col-span-2 space-y-8">
            
            {/* Summary */}
            <div 
              onMouseMove={handleMouseMove3D}
              onMouseLeave={handleMouseLeave3D}
              className="glass-panel rounded-2xl p-8 shadow-xl transition-all duration-300 border-t border-indigo-500/10 tilt-card"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl">
                  <FileText size={22} />
                </div>
                <h2 className="text-2xl font-bold text-white font-display">Professional Summary</h2>
              </div>
              <p className="text-slate-300 leading-relaxed text-base">
                Final-year Computer Science Engineering student (Expected Graduation: <strong className="text-indigo-300">May 2027</strong>) with hands-on experience building scalable full-stack applications using <strong className="text-indigo-300">Java, Python, React.js, TypeScript</strong>, and <strong className="text-indigo-300">Firebase</strong>. Strong foundation in Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems, Computer Networks, and Software Engineering.
              </p>
            </div>

            {/* Education */}
            <div 
              onMouseMove={handleMouseMove3D}
              onMouseLeave={handleMouseLeave3D}
              className="glass-panel rounded-2xl p-8 shadow-xl transition-all duration-300 border-t border-indigo-500/10 tilt-card"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl">
                  <BookOpen size={22} />
                </div>
                <h2 className="text-2xl font-bold text-white font-display">Education</h2>
              </div>
              
              <div className="border-l-2 border-indigo-500/30 pl-6 space-y-2 relative">
                <div className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-indigo-500 ring-4 ring-indigo-500/20" />
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                  <h3 className="text-xl font-bold text-slate-100">JSS Academy of Technical Education, Bengaluru</h3>
                  <span className="text-xs sm:text-sm font-mono text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                    2023 - 2027
                  </span>
                </div>
                <p className="text-slate-400">Bachelor of Engineering (B.E.) in Computer Science and Engineering</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 text-xs font-semibold bg-indigo-500/10 text-indigo-300 rounded border border-indigo-500/20 font-mono">
                    CGPA: 8.24 / 10
                  </span>
                </div>
              </div>
            </div>

            {/* Project Experience */}
            <div 
              onMouseMove={handleMouseMove3D}
              onMouseLeave={handleMouseLeave3D}
              className="glass-panel rounded-2xl p-8 shadow-xl transition-all duration-300 border-t border-indigo-500/10 tilt-card"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl">
                  <Briefcase size={22} />
                </div>
                <h2 className="text-2xl font-bold text-white font-display">Project Experience</h2>
              </div>
              
              <div className="space-y-8">
                {/* Project 1 */}
                <div className="p-5 bg-slate-950/50 rounded-xl border border-slate-800/80 hover:border-indigo-500/30 transition-all duration-300 group/item">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg font-bold text-slate-100 group-hover/item:text-indigo-400 transition-colors">
                          Fake News Analysis System
                        </h3>
                        <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                          2026
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 font-mono mt-1">
                        React, TypeScript, Vite, AI APIs, HTML, CSS
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <a 
                        href="https://github.com/laksh76777" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-1.5 bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg border border-slate-800 transition-all"
                        title="GitHub Repository"
                      >
                        <Github size={18} />
                      </a>
                    </div>
                  </div>
                  
                  <ul className="mt-4 space-y-2 text-sm text-slate-400">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-indigo-500 mt-0.5 flex-shrink-0" />
                      <span>Developed a React-based Fake News Analysis System that analyzes news articles in real time and generates authenticity scores using AI APIs.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-indigo-500 mt-0.5 flex-shrink-0" />
                      <span>Built an interactive frontend using React and TypeScript, providing users with real-time news credibility predictions.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-indigo-500 mt-0.5 flex-shrink-0" />
                      <span>Integrated external AI APIs to analyze news content and generate authenticity scores with detailed insights.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-indigo-500 mt-0.5 flex-shrink-0" />
                      <span>Designed a responsive and user-friendly interface using Vite, HTML, and CSS to enhance accessibility and performance.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-indigo-500 mt-0.5 flex-shrink-0" />
                      <span>Applied component-based architecture and API integration to deliver a scalable and maintainable web application.</span>
                    </li>
                  </ul>
                </div>

                {/* Project 2 */}
                <div className="p-5 bg-slate-950/50 rounded-xl border border-slate-800/80 hover:border-indigo-500/30 transition-all duration-300 group/item">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg font-bold text-slate-100 group-hover/item:text-indigo-400 transition-colors">
                          Inventory Management System
                        </h3>
                        <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                          2025
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 font-mono mt-1">
                        React, JavaScript, Firebase, HTML, CSS
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <a 
                        href="https://github.com/laksh76777" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-1.5 bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg border border-slate-800 transition-all"
                        title="GitHub Repository"
                      >
                        <Github size={18} />
                      </a>
                    </div>
                  </div>
                  
                  <ul className="mt-4 space-y-2 text-sm text-slate-400">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-indigo-500 mt-0.5 flex-shrink-0" />
                      <span>Developed an inventory management system to automate product tracking and stock management.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-indigo-500 mt-0.5 flex-shrink-0" />
                      <span>Implemented real-time inventory updates using Firebase, ensuring synchronized data across users.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-indigo-500 mt-0.5 flex-shrink-0" />
                      <span>Added low-stock alerts and inventory monitoring features to improve stock availability and operational efficiency.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-indigo-500 mt-0.5 flex-shrink-0" />
                      <span>Designed responsive dashboards for managing products, inventory status, and stock updates.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-indigo-500 mt-0.5 flex-shrink-0" />
                      <span>Utilized React and Firebase to build a scalable, user-friendly web application for efficient inventory management.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            
            {/* Technical Skills Category */}
            <div 
              onMouseMove={handleMouseMove3D}
              onMouseLeave={handleMouseLeave3D}
              className="glass-panel rounded-2xl p-6 shadow-xl transition-all duration-300 border-t border-indigo-500/10 tilt-card"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl">
                  <Code size={20} />
                </div>
                <h2 className="text-xl font-bold text-white font-display">Technical Skills</h2>
              </div>
              
              <div className="space-y-4">
                <SkillCategory label="Languages" list={["Java", "C", "Python", "JavaScript", "TypeScript"]} />
                <SkillCategory label="Frontend" list={["HTML", "CSS", "Tailwind CSS", "React.js", "Next.js", "Vite"]} />
                <SkillCategory label="Backend" list={["Node.js", "Express.js", "Flask", "REST APIs", "API Integration"]} />
                <SkillCategory label="Databases" list={["SQL", "Firebase Firestore"]} />
                <SkillCategory label="Tools & Platforms" list={["Git", "GitHub", "VS Code", "Firebase", "Vercel", "Netlify"]} />
                <SkillCategory label="Core CS" list={["Data Structures and Algorithm", "Object-Oriented Programming", "Database Management Systems", "Operating Systems", "Computer Networks", "Software Engineering"]} />
              </div>
            </div>

            {/* Certifications */}
            <div 
              onMouseMove={handleMouseMove3D}
              onMouseLeave={handleMouseLeave3D}
              className="glass-panel rounded-2xl p-6 shadow-xl transition-all duration-300 border-t border-indigo-500/10 tilt-card"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl">
                  <Award size={20} />
                </div>
                <h2 className="text-xl font-bold text-white font-display">Certifications</h2>
              </div>
              
              <div className="space-y-4">
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                  <p className="text-sm font-bold text-slate-200">GFG 160 Certification</p>
                  <p className="text-xs text-indigo-400 mt-0.5">GeeksforGeeks</p>
                </div>
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                  <p className="text-sm font-bold text-slate-200">Machine Learning Specialization</p>
                  <p className="text-xs text-indigo-400 mt-0.5">Stanford & DeepLearning.AI</p>
                </div>
              </div>
            </div>

            {/* Key Achievements */}
            <div 
              onMouseMove={handleMouseMove3D}
              onMouseLeave={handleMouseLeave3D}
              className="glass-panel rounded-2xl p-6 shadow-xl transition-all duration-300 border-t border-indigo-500/10 tilt-card"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl">
                  <Sparkles size={20} />
                </div>
                <h2 className="text-xl font-bold text-white font-display">Achievements</h2>
              </div>
              
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex gap-2">
                  <ChevronRight size={16} className="text-indigo-500 flex-shrink-0 mt-0.5" />
                  <span>Solved <strong className="text-slate-200">100+ DSA</strong> problems on LeetCode & Codolio.</span>
                </li>
                <li className="flex gap-2">
                  <ChevronRight size={16} className="text-indigo-500 flex-shrink-0 mt-0.5" />
                  <span>Deployed 2 major full-stack apps using <strong className="text-slate-200">Firebase & AI APIs</strong>.</span>
                </li>
                <li className="flex gap-2">
                  <ChevronRight size={16} className="text-indigo-500 flex-shrink-0 mt-0.5" />
                  <span>Maintained an Engineering CGPA of <strong className="text-slate-200">8.24 / 10</strong>.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

// Skill Category Component
interface SkillCategoryProps {
  label: string;
  list: string[];
}

const SkillCategory: React.FC<SkillCategoryProps> = ({ label, list }) => (
  <div className="space-y-1.5">
    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</p>
    <div className="flex flex-wrap gap-1.5">
      {list.map((s, idx) => (
        <span 
          key={idx} 
          className="px-2 py-0.5 text-xs font-medium bg-slate-900/80 text-indigo-300 rounded border border-indigo-500/10 hover:border-indigo-500/30 transition-colors"
        >
          {s}
        </span>
      ))}
    </div>
  </div>
);
