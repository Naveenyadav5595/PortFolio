

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserCheck,
  Code2,
  Layers,
  Zap,
  ShieldCheck,
  Target,
  Compass,
  Terminal,
  Milestone,
  Database,
  Braces,
} from 'lucide-react';

import { aboutContent, personalInfo } from '../../data/portfolioData';

export default function About() {
  const [activeTab, setActiveTab] = useState('story');

  const tabs = [
    { id: 'story', label: 'My Story', icon: UserCheck },
    { id: 'skills', label: 'Development Focus', icon: Code2 },
    { id: 'philosophy', label: 'Development Philosophy', icon: Terminal },
  ];

  return (
    <section id="about" className="relative py-24 bg-gray-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            <UserCheck className="w-3.5 h-3.5" />
            <span>About Me</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Building Scalable Software with{' '}
            <span className="text-gradient-primary">
              MERN & Strong Problem-Solving Skills
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-400">
            Learn more about my development journey, technical focus,
            problem-solving approach, and goals as a software developer.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center p-1.5 glass-card rounded-2xl border border-white/10 max-w-xl w-full">

            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                    isActive
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >

                  {isActive && (
                    <motion.div
                      layoutId="aboutActiveTab"
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 border border-cyan-400/40 rounded-xl"
                      transition={{
                        type: 'spring',
                        stiffness: 350,
                        damping: 25,
                      }}
                    />
                  )}

                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-cyan-400' : 'text-gray-400'
                    }`}
                  />

                  <span>{tab.label}</span>
                </button>
              );
            })}

          </div>
        </div>

        {/* Tab Content */}
        <div className="glass-card p-6 sm:p-10 rounded-3xl border border-white/10">

          <AnimatePresence mode="wait">

            {/* ================= MY STORY ================= */}
            {activeTab === 'story' && (
              <motion.div
                key="story"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                  <div className="lg:col-span-7 space-y-4">

                    <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                      <Code2 className="w-6 h-6 text-cyan-400" />
                      Full Stack Developer & Problem Solver
                    </h3>

                    <p className="text-gray-300 leading-relaxed text-base">
                      I'm{' '}
                      <strong className="text-cyan-300">
                        {personalInfo.name}
                      </strong>
                      , an aspiring Software Developer and B.Tech student
                      at NIT Jalandhar. My primary interests are full-stack
                      web development, backend development, Data Structures
                      & Algorithms, and problem solving.
                    </p>

                    <p className="text-gray-400 leading-relaxed text-base">
                      My development journey started with programming
                      fundamentals, HTML, CSS, JavaScript, and Python.
                      I then moved into MERN stack development, learning
                      React, Node.js, Express.js, MongoDB, REST APIs,
                      authentication, database management, and deployment.
                    </p>

                    <p className="text-gray-400 leading-relaxed text-base">
                      Alongside development, I continuously work on Data
                      Structures & Algorithms and competitive programming.
                      I enjoy solving challenging problems and understanding
                      how efficient algorithms and well-designed systems
                      can improve software performance and scalability.
                    </p>

                  </div>

                  {/* Stats */}
                  <div className="lg:col-span-5 grid grid-cols-2 gap-4">

                    <div className="p-4 rounded-2xl bg-gray-900/80 border border-cyan-500/20">
                      <Target className="w-6 h-6 text-cyan-400 mb-2" />
                      <p className="text-xs text-gray-400">
                        Core Focus
                      </p>
                      <p className="text-sm font-bold text-white">
                        MERN,Software Development & DSA
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-gray-900/80 border border-purple-500/20">
                      <Compass className="w-6 h-6 text-purple-400 mb-2" />
                      <p className="text-xs text-gray-400">
                        Location
                      </p>
                      <p className="text-sm font-bold text-white">
                        India
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-gray-900/80 border border-emerald-500/20">
                      <Braces className="w-6 h-6 text-emerald-400 mb-2" />
                      <p className="text-xs text-gray-400">
                        Specialization
                      </p>
                      <p className="text-sm font-bold text-white">
                        MERN • Backend • DSA
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-gray-900/80 border border-indigo-500/20">
                      <Milestone className="w-6 h-6 text-indigo-400 mb-2" />
                      <p className="text-xs text-gray-400">
                        Current Focus
                      </p>
                      <p className="text-sm font-bold text-white">
                        Software Engineering
                      </p>
                    </div>

                  </div>
                </div>

                {/* Timeline */}
                <div className="pt-6 border-t border-white/10 space-y-6">

                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <Milestone className="w-5 h-5 text-cyan-400" />
                    <span>Development Journey</span>
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {aboutContent.journey.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-gray-900/60 border border-white/5 space-y-2"
                      >

                        <span className="inline-block px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 text-xs font-bold border border-cyan-800/40">
                          {item.year}
                        </span>

                        <h5 className="text-base font-bold text-white">
                          {item.title}
                        </h5>

                        <p className="text-xs text-gray-400 leading-relaxed">
                          {item.description}
                        </p>

                      </div>
                    ))}

                  </div>
                </div>

              </motion.div>
            )}

            {/* ================= DEVELOPMENT FOCUS ================= */}
            {activeTab === 'skills' && (
              <motion.div
                key="skills"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >

                <div className="max-w-3xl space-y-4">

                  <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                    <Code2 className="w-6 h-6 text-cyan-400" />
                    Development & Problem Solving
                  </h3>

                  <p className="text-gray-300 leading-relaxed text-base">
                    My primary focus is becoming a strong software developer
                    with solid fundamentals in Data Structures & Algorithms,
                    full-stack development, backend engineering, and database
                    management.
                  </p>

                  <p className="text-gray-400 leading-relaxed text-base">
                    I enjoy building complete applications from the frontend
                    to the backend while also improving my ability to design
                    efficient algorithms and solve complex programming
                    problems.
                  </p>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">

                  <div className="p-5 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 space-y-2">
                    <Code2 className="w-6 h-6 text-cyan-400" />

                    <h4 className="text-base font-bold text-white">
                      MERN Stack Development
                    </h4>

                    <p className="text-xs text-gray-300">
                      Building responsive and scalable applications using
                      React, Node.js, Express.js and MongoDB.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-purple-950/40 border border-purple-500/30 space-y-2">
                    <Layers className="w-6 h-6 text-purple-400" />

                    <h4 className="text-base font-bold text-white">
                      Data Structures & Algorithms
                    </h4>

                    <p className="text-xs text-gray-300">
                      Practicing trees, graphs, dynamic programming, greedy
                      algorithms, segment trees, and range queries.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-2">
                    <Database className="w-6 h-6 text-emerald-400" />

                    <h4 className="text-base font-bold text-white">
                      Backend & Databases
                    </h4>

                    <p className="text-xs text-gray-300">
                      Developing REST APIs, authentication systems,
                      database schemas, and reliable backend services.
                    </p>
                  </div>

                </div>

              </motion.div>
            )}

            {/* ================= PHILOSOPHY ================= */}
            {activeTab === 'philosophy' && (
              <motion.div
                key="philosophy"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >

                <div className="max-w-3xl space-y-4">

                  <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                    <Terminal className="w-6 h-6 text-indigo-400" />
                    Clean Code, Efficiency & Scalability
                  </h3>

                  <p className="text-gray-300 leading-relaxed text-base">
                    I believe good software is built on strong fundamentals,
                    clean code, efficient algorithms, maintainable
                    architecture, and a clear understanding of user needs.
                  </p>

                  <p className="text-gray-400 leading-relaxed text-base">
                    While developing applications, I focus on writing
                    reusable components, designing reliable backend systems,
                    maintaining clean database structures, and optimizing
                    performance wherever possible.
                  </p>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">

                  {aboutContent.pillars.map((pillar, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-gray-900/60 border border-white/10 flex items-start gap-4"
                    >

                      <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
                        <Layers className="w-6 h-6" />
                      </div>

                      <div className="space-y-1">

                        <h4 className="text-base font-bold text-white">
                          {pillar.title}
                        </h4>

                        <p className="text-xs text-gray-400 leading-relaxed">
                          {pillar.description}
                        </p>

                      </div>

                    </div>
                  ))}

                </div>

              </motion.div>
            )}

          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}