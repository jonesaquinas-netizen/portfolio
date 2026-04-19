/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { 
  User, 
  Briefcase, 
  Code, 
  Mail, 
  ExternalLink, 
  ChevronRight, 
  Database, 
  BarChart3, 
  Layout, 
  Smartphone, 
  Search, 
  Github, 
  Linkedin, 
  Send,
  MapPin,
  Calendar,
  Award,
  GraduationCap,
  Download,
  Laptop,
  Moon,
  Sun
} from "lucide-react";
import { useState, FormEvent, useEffect } from "react";

// --- Types ---
interface Project {
  id: number;
  title: string;
  category: "Consumer Insights" | "Econometric Modeling" | "Behavioral Systems";
  description: string;
  image: string;
  tags: string[];
  methodologies: string[];
  challenges: string;
  results: string;
  takeaways: string[];
}

interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  achievements: string[];
}

// --- Data ---
const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Consumer Trend Synthesis & Longitudinal Modeling",
    category: "Econometric Modeling",
    description: "An empirical analysis of emerging consumer behaviors. Utilized longitudinal datasets to identify shifts in purchasing intensity and brand loyalty during macroeconomic fluctuations.",
    image: "https://picsum.photos/seed/statistics/800/600",
    tags: ["Power BI", "SQL", "Market Research", "Correlation Analysis"],
    methodologies: ["Multivariate Regression", "Time-Series Analysis", "Data Mining"],
    challenges: "Handling sparse data across emerging demographics and correlating external macroeconomic factors with internal purchasing datasets.",
    results: "Identified three leading behavioral indicators that predicted a 15% shift in regional brand loyalty six months in advance.",
    takeaways: [
      "Macroeconomic shifts correlate significantly with micro-demographic purchasing intensity.",
      "Longitudinal synthesis reduces predictive noise by 25%.",
      "Dynamic data mining is essential for identifying latent choice architecture."
    ]
  },
  {
    id: 2,
    title: "Psychometric Consumer Profiling",
    category: "Consumer Insights",
    description: "A data-driven investigation into implicit brand loyalty. Applied behavioral modeling to complex consumer datasets to quantify pre-attentive biases influencing choice architecture.",
    image: "https://picsum.photos/seed/neuro/800/600",
    tags: ["Psychometrics", "Data Modeling", "Market Research"],
    methodologies: ["Latent Variable Modeling", "Focus Group Synthesis", "Statistical Validation"],
    challenges: "Quantifying subjective emotional responses into actionable quantitative metrics for strategic decision-making.",
    results: "Developed a proprietary profiling framework that increased marketing campaign alignment with target demographic values by 22%.",
    takeaways: [
      "Implicit bias profiling generates more accurate loyalty metrics than self-reporting.",
      "Latent variable modeling reveals cross-category brand affinity triggers.",
      "Alignment between demographic values and campaign messaging is the primary driver of engagement."
    ]
  },
  {
    id: 3,
    title: "Insight Automation Framework (IAF)",
    category: "Behavioral Systems",
    description: "Architected a systematic framework for automated data extraction using Python and advanced Excel modeling, reducing reporting latency by 40%.",
    image: "https://picsum.photos/seed/automation/800/600",
    tags: ["Excel VBA", "Python", "ETL", "Optimization"],
    methodologies: ["ETL Pipeline Design", "VBA Macro Optimization", "Process Mapping"],
    challenges: "Standardizing heterogeneous data formats from legacy systems into a unified reporting structure without manual intervention.",
    results: "Reduced average weekly reporting time from 15 hours to under 4 hours, and eliminated 98% of manual transcription errors.",
    takeaways: [
      "Process mapping is the critical first step for scalable ETL automation.",
      "Hybrid Python-VBA architectures leverage existing legacy strengths while improving throughput.",
      "Error-rate reduction correlates directly with increased stakeholder confidence in data integrity."
    ]
  },
  {
    id: 4,
    title: "Clinical Operational Efficacy Audit",
    category: "Behavioral Systems",
    description: "A comprehensive audit of clinical support workflows. Optimized ticketing metrics and system profiles to enhance user satisfaction and data precision.",
    image: "https://picsum.photos/seed/clinical/800/600",
    tags: ["Systems Analysis", "Quality Control", "Audit", "Methodology"],
    methodologies: ["Workflow Analysis", "User Persona Profiling", "KPI Definition"],
    challenges: "Balancing high-volume clinical support tickets with limited resource allocation during peak operational hours.",
    results: "Improved first-line resolution rates by 30% and increased overall clinician satisfaction scores by 1.5 points on a 5-point scale.",
    takeaways: [
      "Targeted persona profiling drastically improves user support efficacy.",
      "Real-time ticketing analysis allows for dynamic resource reallocation during peak loads.",
      "Systematic audits are necessary to prevent workflow rot in high-pressure environments."
    ]
  }
];

const EXPERIENCES: Experience[] = [
  {
    role: "Consumer Insights Analyst",
    company: "Eli Lilly and Company",
    location: "Houston, United States",
    period: "05/2024 - 01/2026",
    achievements: [
      "Utilized advanced Excel functions to manipulate large datasets for insightful reporting.",
      "Mentored junior analysts, providing guidance and support to foster professional development.",
      "Implemented quality control measures for analytical processes, maintaining high standards.",
      "Helped clients enhance internal structures and improve handling of current and potential problems.",
      "Documented process flows and created user manuals to support effective change management.",
      "Managed large datasets, ensuring compliance with data protection regulations."
    ]
  },
  {
    role: "Clinical Support Analyst",
    company: "CEDA Behavioral Health",
    location: "Brownsburg, United States",
    period: "05/2019 - 02/2022",
    achievements: [
      "Managed ticketing system efficiently, prioritising and escalating issues as necessary for prompt resolution.",
      "Delivered first-line support to users, diagnosing issues and providing step-by-step solutions.",
      "Followed user guides and technical manuals to complete skilled repairs.",
      "Performed recovery operations to restore systems following failures.",
      "Customised user profiles and system settings to meet individual needs and preferences."
    ]
  }
];

const SKILLS = [
  { name: "Data Management", category: "Core" },
  { name: "Resource Allocation", category: "Scientific" },
  { name: "Data Analysis", category: "Scientific" },
  { name: "Analytical Mindset", category: "Core" },
  { name: "Microsoft Power BI", category: "Technical" },
  { name: "Microsoft Excel", category: "Technical" },
  { name: "Quality Control", category: "Strategic" },
  { name: "Leadership Coaching", category: "Strategic" }
];

export default function App() {
  const [activeNav, setActiveNav] = useState("hero");
  const [projectFilter, setProjectFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const categories = ["All", "Consumer Insights", "Econometric Modeling", "Behavioral Systems"];
  const filteredProjects = projectFilter === "All" 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === projectFilter);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveNav(id);
    }
  };

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Simplified form handling for demo
    alert("Thank you for your message! (Demo purposes only)");
  };

  return (
    <div className="min-h-screen font-sans selection:bg-blue-500/30 selection:text-white bg-white dark:bg-[#000000] text-slate-900 dark:text-slate-100 transition-colors duration-500">
      {/* --- Background Atmosphere --- */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-900/10 dark:bg-blue-900/10 rounded-full blur-[120px] opacity-50 dark:opacity-100" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-900/10 dark:bg-purple-900/10 rounded-full blur-[120px] opacity-50 dark:opacity-100" />
      </div>

      {/* --- Navigation --- */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-2 glass rounded-full flex items-center gap-4 md:gap-8 shadow-2xl">
        <div className="flex items-center gap-4 md:gap-8">
          {[
            { id: "hero", icon: User, label: "Home" },
            { id: "about", icon: Database, label: "About" },
            { id: "skills", icon: Code, label: "Skills" },
            { id: "experience", icon: Briefcase, label: "Experience" },
            { id: "projects", icon: BarChart3, label: "Projects" },
            { id: "contact", icon: Mail, label: "Contact" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`flex items-center gap-2 text-[10px] md:text-sm font-medium transition-colors ${
                activeNav === item.id ? "text-blue-500" : "text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white"
              }`}
            >
              <item.icon size={16} />
              <span className="hidden lg:inline">{item.label}</span>
            </button>
          ))}
        </div>
        <div className="w-[1px] h-6 bg-slate-200 dark:bg-white/10 mx-2" />
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-slate-600 dark:text-slate-400"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-20 relative">
        {/* --- Hero Section --- */}
        <section id="hero" className="min-h-[80vh] flex flex-col items-center justify-center text-center pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex flex-col items-center"
          >
            <div className="w-48 h-48 rounded-full border-4 border-blue-500/20 p-2 mb-8 bg-gradient-to-br from-blue-500/10 to-transparent shadow-[0_0_50px_rgba(37,99,235,0.15)] group/profile">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden relative">
                {/* 
                  Note: To use the image you uploaded:
                  1. Right-click the image in your chat/file explorer.
                  2. Rename it to 'profile.jpg'.
                  3. Ensure it is in the root directory (the same place as package.json).
                */}
                <img 
                  src="https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=400&h=400" 
                  alt="Caturah Brunson - Behavioral Synthesis" 
                  className="w-full h-full object-cover grayscale group-hover/profile:grayscale-0 transition-all duration-1000 group-hover/profile:scale-110"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback to a similar conceptual image if the specific source fails
                    e.currentTarget.src = "https://picsum.photos/seed/psychology-mind/400/400";
                  }}
                />
                {/* Glow Backdrop */}
                <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full pointer-events-none group-hover/profile:bg-blue-500/10 transition-colors" />
              </div>
            </div>
            <h2 className="text-slate-500 dark:text-slate-400 font-sans text-[10px] tracking-[0.5em] uppercase mb-4 font-semibold italic">Senior Insights Analyst • Behavioral Systems</h2>
            <h1 className="font-serif text-5xl md:text-8xl font-light tracking-tight text-slate-900 dark:text-white mb-8 px-4 leading-[0.85]">
              CATURAH <span className="font-semibold italic font-serif">BRUNSON, <span className="text-blue-500 dark:text-blue-400">B.SC.</span></span>
            </h1>
            <p className="text-sm md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed font-sans font-light italic">
              "Advancing the science of human behavioral synthesis through <span className="text-slate-900 dark:text-slate-200">econometric rigor and psychometric precision."</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap justify-center gap-4 mt-10"
          >
            <button 
              onClick={() => scrollTo("projects")}
              className="px-10 py-3 accent-gradient text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-[0_8px_20px_rgba(59,130,246,0.2)] hover:scale-105 active:scale-95"
            >
              Selected Works
            </button>
            <button 
              onClick={() => scrollTo("contact")}
              className="px-10 py-3 glass hover:bg-slate-50 dark:hover:bg-white/10 text-slate-900 dark:text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
            >
              Start Conversation
            </button>
            <a 
              href="#" 
              download="Caturah_Brunson_Resume.pdf"
              className="px-10 py-3 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/30 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all hover:bg-slate-50 dark:hover:bg-white/5 flex items-center gap-2"
            >
              <Download size={14} />
              Download CV
            </a>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-20 text-slate-500 opacity-30"
          >
            <ChevronRight size={40} className="rotate-90" />
          </motion.div>
        </section>

        {/* --- About Section --- */}
        <section id="about" className="py-24 scroll-mt-20 border-t border-slate-100 dark:border-white/5">
          <div className="flex flex-col md:flex-row gap-16 items-start">
            <div className="w-full md:w-1/2">
              <span className="text-[10px] uppercase tracking-[0.4em] text-blue-600 dark:text-blue-500 font-bold mb-4 block">Section .01</span>
              <h3 className="font-serif text-4xl font-light italic mb-8 text-slate-900 dark:text-white">
                Analytical Ethos
              </h3>
              <div className="glass p-10 rounded-[2.5rem] space-y-6 leading-relaxed text-base text-slate-600 dark:text-slate-400 font-light">
                <p>
                  As an analyst grounded in the Georgia Institute of Technology's psychological methodologies, I approach data not as static numbers, but as dynamic indicators of human behavior.
                </p>
                <p>
                  My work at Eli Lilly and CEDA Behavioral Health has been defined by a commitment to rigorous quality control and the synthesis of complex datasets into high-fidelity actionable intelligence.
                </p>
                <div className="pt-6 grid grid-cols-1 gap-6 border-t border-slate-100 dark:border-white/5">
                  <div className="flex items-center gap-4 text-slate-500 dark:text-slate-500 text-[10px] tracking-[0.3em] uppercase font-bold">
                    <MapPin size={14} className="text-blue-600 dark:text-blue-500" />
                    <span className="text-slate-700 dark:text-slate-300">Florida, United States</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-500 dark:text-slate-500 text-[10px] tracking-[0.3em] uppercase font-bold">
                    <Mail size={14} className="text-purple-600 dark:text-purple-500" />
                    <span className="lowercase font-sans font-medium tracking-normal text-slate-600 dark:text-slate-400">wtt8199@gmail.com</span>
                  </div>
                  <div className="pt-2">
                    <a 
                      href="#" 
                      className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-slate-900 dark:hover:text-white transition-colors text-[10px] uppercase font-bold tracking-widest border-b border-blue-500/30 pb-1"
                    >
                      <Download size={12} />
                      Academic Résumé (PDF)
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Skills Section --- */}
        <section id="skills" className="py-24 scroll-mt-20 border-t border-slate-100 dark:border-white/5">
          <div className="mb-16">
            <span className="text-[10px] uppercase tracking-[0.4em] text-blue-600 dark:text-blue-500 font-bold mb-4 block">Section .02</span>
            <h3 className="font-serif text-4xl font-light italic mb-8 text-slate-900 dark:text-white">
              Methodological Stack
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-light italic max-w-2xl">
              A comprehensive architecture of technical proficiencies and strategic governance models utilized to synthesize behavioral datasets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Quantitative Analysis",
                icon: BarChart3,
                skills: ["Multivariable Modeling", "Longitudinal Synthesis", "Econometric Rigor", "Psychometric Mapping"],
                color: "text-blue-600 dark:text-blue-500"
              },
              {
                title: "Systems Optimization",
                icon: Code,
                skills: ["ETL Logic Implementation", "Process Automation", "Python (Data)", "VBA Architecture"],
                color: "text-purple-600 dark:text-purple-500"
              },
              {
                title: "Governance & Quality",
                icon: Award,
                skills: ["ISO Quality Control", "Data Compliance", "Manual Documentation", "System Audits"],
                color: "text-emerald-600 dark:text-emerald-500"
              },
              {
                title: "Strategic Consulting",
                icon: Laptop,
                skills: ["Leadership Coaching", "Change Management", "Capacity Planning", "Stakeholder Synthesis"],
                color: "text-orange-600 dark:text-orange-500"
              }
            ].map((category, i) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass p-8 rounded-[2.5rem] border-slate-100 dark:border-white/10 hover:border-slate-200 dark:hover:border-white/20 transition-all group"
              >
                <div className={`mb-6 ${category.color} p-4 bg-slate-100 dark:bg-white/5 rounded-2xl w-fit group-hover:scale-110 transition-transform`}>
                  <category.icon size={24} />
                </div>
                <h4 className="font-serif text-xl text-slate-900 dark:text-white mb-6 italic">{category.title}</h4>
                <ul className="space-y-4">
                  {category.skills.map(skill => (
                    <li key={skill} className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-light italic">
                      <div className={`w-1.5 h-1.5 rounded-full ${category.color.replace('text', 'bg')} opacity-40`} />
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- Experience Section --- */}
        <section id="experience" className="py-24 border-t border-slate-100 dark:border-white/5">
          <div className="mb-20 flex items-center gap-6">
             <div className="h-[1px] flex-grow bg-slate-200 dark:bg-white/10" />
             <h3 className="font-serif text-3xl font-light italic whitespace-nowrap text-slate-900 dark:text-white">Research History & Industry Impact</h3>
             <div className="h-[1px] flex-grow bg-slate-200 dark:bg-white/10" />
          </div>
          <div className="space-y-20 relative before:absolute before:left-8 before:top-4 before:bottom-4 before:w-[1px] before:bg-slate-200 dark:before:bg-white/10">
            {EXPERIENCES.map((exp, index) => (
              <motion.div 
                key={exp.period}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative pl-12 md:pl-24 group"
              >
                <div className="absolute left-[29px] top-4 w-[6px] h-[6px] rounded-full bg-blue-600 dark:bg-blue-500 z-10 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                
                <div className="glass p-8 rounded-[2rem] hover:bg-slate-50 dark:hover:bg-white/[0.04] transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                    <div>
                      <h4 className="font-serif text-xl md:text-2xl font-light text-slate-900 dark:text-white">{exp.role}</h4>
                      <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mt-1 text-[10px] uppercase tracking-[0.2em] font-bold text-left">
                        <span>{exp.company}</span>
                        <span className="text-slate-400 dark:text-slate-600 tracking-normal">•</span>
                        <span className="text-slate-500 dark:text-slate-500 tracking-widest">{exp.location}</span>
                      </div>
                    </div>
                    <div className="text-slate-500 dark:text-slate-400 font-sans text-[10px] uppercase tracking-widest font-bold bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/5 w-fit">
                      {exp.period}
                    </div>
                  </div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-left">
                    {exp.achievements.map((item, i) => (
                      <li key={i} className="flex gap-3 text-slate-500 dark:text-slate-400 text-xs leading-relaxed transition-colors group-hover:text-slate-900 dark:group-hover:text-slate-200">
                        <div className="w-1 h-1 rounded-full bg-blue-500/40 mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- Projects Section --- */}
        <section id="projects" className="py-24 scroll-mt-20 border-t border-slate-100 dark:border-white/5">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div className="max-w-xl text-left">
              <span className="text-[10px] uppercase tracking-[0.4em] text-purple-600 dark:text-purple-500 font-bold mb-4 block">Section .04</span>
              <h3 className="font-serif text-4xl font-light italic mb-4 text-slate-900 dark:text-white">Case Studies</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-light">
                An archival presentation of complex datasets synthesized into authoritative strategic frameworks and automated solutions.
              </p>
            </div>
            
            {/* Filter Mechanism */}
            <div className="flex flex-wrap gap-2 glass p-2 rounded-2xl">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setProjectFilter(cat)}
                  className={`px-6 py-2 rounded-xl text-[10px] uppercase tracking-widest font-bold transition-all duration-300 ${
                    projectFilter === cat 
                      ? "bg-blue-600 dark:bg-blue-500 text-white shadow-[0_4px_12px_rgba(59,130,246,0.3)]" 
                      : "text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="group relative cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="glass rounded-[3rem] p-5 h-full flex flex-col hover:bg-slate-50 dark:hover:bg-white/[0.04] transition-all border-slate-100 dark:border-white/5 hover:border-slate-200 dark:hover:border-white/10 overflow-hidden">
                    <div className="relative h-72 rounded-[2rem] overflow-hidden mb-8 border border-slate-100 dark:border-white/5 shadow-2xl group/img">
                      <motion.img 
                        src={project.image} 
                        alt={project.title}
                        className="absolute -inset-4 w-[calc(100%+2rem)] h-[calc(100%+2rem)] object-cover grayscale group-hover/img:grayscale-0 transition-all duration-1000"
                        whileHover={{ scale: 1.1, x: -20, y: -10 }}
                        referrerPolicy="no-referrer"
                      />
                      {/* Subtle Overlay Fade-in */}
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                      {/* Inner Shine Effect */}
                      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </div>
                  <div className="px-6 pb-6 flex flex-col flex-grow text-left">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-[9px] uppercase font-bold tracking-[0.3em] ${i % 2 === 0 ? 'text-blue-600 dark:text-blue-500' : 'text-purple-600 dark:text-purple-500'}`}>
                        {project.category}
                      </span>
                    </div>
                    <h4 className="font-serif text-3xl font-light mb-4 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight italic">{project.title}</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed font-light line-clamp-4 mb-8 italic opacity-90 border-l border-slate-200 dark:border-white/10 pl-4 py-1">
                      {project.description}
                    </p>
                    <div className="mt-auto pt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                      <div className="flex gap-1.5">
                        {project.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="text-[8px] font-bold px-2 py-0.5 bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 rounded border border-slate-200 dark:border-white/10 uppercase tracking-tighter">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <button className="flex items-center gap-1 text-[9px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold group/btn hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        Review Methodology <ChevronRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* --- Contact Section --- */}
        <section id="contact" className="py-24 scroll-mt-20">
          <div className="glass p-12 rounded-[3rem] relative overflow-hidden border-slate-100 dark:border-white/5 shadow-2xl">
            <div className="flex flex-col lg:flex-row gap-16 relative z-10">
              <div className="w-full lg:w-1/2 text-left">
                <h3 className="text-xs uppercase tracking-[0.4em] text-slate-500 dark:text-slate-500 mb-6 font-bold">Inquiry</h3>
                <h2 className="font-serif text-4xl mb-8 font-light italic text-slate-900 dark:text-white">Ready for the next challenge?</h2>
                <div className="space-y-6">
                  <a 
                    href="mailto:wtt8199@gmail.com"
                    className="flex items-center gap-4 group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center group-hover:bg-blue-500/10 transition-all border border-slate-200 dark:border-white/5">
                      <Mail className="text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" size={18} />
                    </div>
                    <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors tracking-widest font-light">wtt8199@gmail.com</span>
                  </a>
                  <div className="flex gap-4">
                    {['LinkedIn', 'GitHub'].map(platform => (
                      <button key={platform} className="text-[10px] uppercase tracking-[0.3em] text-slate-500 dark:text-slate-600 font-bold hover:text-slate-900 dark:hover:text-white transition-colors">
                        {platform}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/2">
                <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="Name"
                      className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500/30 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                    />
                    <input 
                      type="email" 
                      placeholder="Email"
                      className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500/30 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                    />
                  </div>
                  <textarea 
                    placeholder="Brief scope of the project..."
                    rows={4}
                    className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500/30 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 resize-none"
                  />
                  <button 
                    type="submit"
                    className="accent-gradient text-white rounded-xl py-4 text-xs font-bold uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    Start Conversation
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-slate-100 dark:border-white/5 text-center px-6">
        <p className="text-slate-500 dark:text-slate-400 text-[10px] tracking-[0.4em] flex items-center justify-center gap-4 uppercase font-bold">
          © {new Date().getFullYear()} Caturah Brunson, B.Sc. • Georgia Institute of Technology Alumni • Analyst at Eli Lilly
        </p>
      </footer>

      {/* --- Detailed Project Modal --- */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-6 py-20 pointer-events-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-slate-900/60 dark:bg-slate-950/90 backdrop-blur-md pointer-events-auto"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl max-h-full overflow-y-auto bg-white dark:glass border border-slate-200 dark:border-white/10 rounded-[3rem] p-8 md:p-12 pointer-events-auto shadow-2xl custom-scrollbar"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 dark:text-slate-500 dark:hover:text-white transition-colors"
              >
                <Database size={24} className="rotate-45" />
              </button>

              <div className="flex flex-col gap-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start text-left">
                  <div className="space-y-8">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.4em] text-blue-600 dark:text-blue-500 font-bold block mb-4 italic">Project Overview</span>
                      <h2 className="font-serif text-4xl text-slate-900 dark:text-white font-light italic leading-tight">{selectedProject.title}</h2>
                    </div>
                    <div className="relative aspect-video rounded-3xl overflow-hidden border border-slate-100 dark:border-white/5 mx-auto">
                      <img 
                        src={selectedProject.image} 
                        alt={selectedProject.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>

                  <div className="space-y-10">
                    <div>
                      <h4 className="text-[10px] uppercase tracking-[0.3em] text-slate-500 dark:text-slate-500 font-bold mb-6 italic pb-2 border-b border-slate-100 dark:border-white/5">Abstract</h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-light italic">"{selectedProject.description}"</p>
                    </div>

                    <div>
                      <h4 className="text-[10px] uppercase tracking-[0.3em] text-slate-500 dark:text-slate-500 font-bold mb-6 italic pb-2 border-b border-slate-100 dark:border-white/5">Research Methodologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.methodologies.map(m => (
                          <span key={m} className="px-4 py-2 rounded-xl bg-slate-50 dark:glass border border-slate-100 dark:border-white/5 text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">{m}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-slate-100 dark:border-white/5 text-left">
                  <div>
                    <h4 className="flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-slate-500 dark:text-slate-500 font-bold mb-6">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-500" />
                      Analytical Challenges
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-light italic opacity-80 pl-4 border-l border-slate-200 dark:border-white/5">
                      {selectedProject.challenges}
                    </p>
                  </div>
                  <div>
                    <h4 className="flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-slate-500 dark:text-slate-500 font-bold mb-6">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-600 dark:bg-purple-500" />
                      Quantifiable Impact
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-light italic opacity-80 pl-4 border-l border-slate-200 dark:border-white/5">
                      {selectedProject.results}
                    </p>
                  </div>
                </div>

                <div className="pt-12 border-t border-slate-100 dark:border-white/5 text-left">
                  <h4 className="flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-slate-500 dark:text-slate-500 font-bold mb-8">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Key Takeaways & Theoretical Synthesis
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {selectedProject.takeaways.map((takeaway, idx) => (
                      <div key={idx} className="glass p-6 rounded-[2rem] border-emerald-500/10 dark:border-emerald-500/10 hover:border-emerald-500/30 transition-all group/takeaway">
                        <div className="text-emerald-500 mb-4 opacity-50 group-hover/takeaway:opacity-100 transition-opacity">
                          <BarChart3 size={20} />
                        </div>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed font-light italic">
                          {takeaway}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center pt-8">
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="px-12 py-4 accent-gradient text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] shadow-xl hover:scale-105 transition-all"
                  >
                    Close Archive
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
