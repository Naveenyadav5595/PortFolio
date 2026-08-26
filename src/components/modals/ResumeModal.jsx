

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  FileText,
  User,
  Briefcase,
  Mail,
  MapPin,
  CheckCircle2,
  Sparkles,
  Code2,
} from 'lucide-react';

import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons';
import {
  personalInfo,
  skillsData,
  experienceData,
} from '../../data/portfolioData';

import pic1 from '../../assets/pic1.jpeg';

export default function ResumeModal({ onClose }) {

  const topSkills = [
    ...skillsData.Frontend,
    ...skillsData.Backend,
    ...skillsData.Database,
    ...skillsData['Cloud & DevOps'],
    ...skillsData['Programming Languages'],
    ...skillsData['Professional Skills'],
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 overflow-y-auto">

        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-gray-950/85 backdrop-blur-md"
        />

        {/* Resume Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.96 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
          className="relative w-full max-w-4xl my-6 glass-card rounded-3xl border border-white/15 overflow-hidden shadow-2xl z-10"
        >

          {/* Header */}
          <div className="flex items-center justify-between p-5 sm:p-7 border-b border-white/10 bg-gray-950/80">

            <div className="flex items-center gap-3">

              <div className="p-2.5 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 text-white">
                <FileText className="w-5 h-5" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-white">
                  Curriculum Vitae
                </h2>

                <p className="text-xs text-gray-400">
                  Interactive Resume — {personalInfo.name}
                </p>
              </div>

            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-gray-800 border border-white/10 text-gray-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

          </div>

          {/* Resume Body */}
          <div className="p-5 sm:p-8 space-y-8 overflow-y-auto max-h-[80vh]">

            {/* Profile Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 p-6 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-indigo-950/60 to-purple-950/60 border border-cyan-500/30">

              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center shrink-0 shadow-xl shadow-cyan-500/20 overflow-hidden">

                <img
                  src={pic1}
                  alt="Naveen Yadav"
                  className="w-full h-full object-cover"
                />

              </div>

              <div className="space-y-1.5">

                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {personalInfo.name}
                </h1>

                <p className="text-sm font-semibold text-cyan-300">
                  {personalInfo.title}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 pt-1">

                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    {personalInfo.email}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-purple-400" />
                    {personalInfo.location}
                  </span>

                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    GitHub
                  </a>

                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 hover:text-indigo-300 transition-colors"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5" />
                    LinkedIn
                  </a>

                </div>

              </div>

            </div>


            {/* Professional Summary */}
            <div className="space-y-3">

              <h3 className="text-base font-bold text-white flex items-center gap-2 uppercase tracking-widest">
                <User className="w-4 h-4 text-cyan-400" />
                <span>Professional Summary</span>
              </h3>

              <p className="text-sm text-gray-300 leading-relaxed p-4 rounded-xl bg-gray-900/60 border border-white/5">
                {personalInfo.bio}
              </p>

            </div>


            {/* Core Skills */}
            <div className="space-y-4">

              <h3 className="text-base font-bold text-white flex items-center gap-2 uppercase tracking-widest">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Core Technical Skills</span>
              </h3>

              <div className="flex flex-wrap gap-2">

                {topSkills.map((skill) => (
                  <span
                    key={skill.name}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold border border-white/10 bg-gray-900/70"
                    style={{ color: skill.color }}
                  >
                    {skill.name}
                  </span>
                ))}

              </div>

            </div>


            {/* Education & Certifications */}
            <div className="space-y-4">

              <h3 className="text-base font-bold text-white flex items-center gap-2 uppercase tracking-widest">
                <Briefcase className="w-4 h-4 text-emerald-400" />
                <span>Education & Achievements</span>
              </h3>

              <div className="space-y-4">

                {experienceData.map((item, idx) => (

                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-2xl bg-gray-900/60 border border-white/5 space-y-2"
                  >

                    <div className="flex flex-wrap items-center justify-between gap-2">

                      <h4 className="text-sm font-bold text-white">
                        {item.title}
                      </h4>

                      <span className="text-xs text-gray-400 bg-gray-800 px-2.5 py-1 rounded-full border border-white/5">
                        {item.period}
                      </span>

                    </div>

                    <p className="text-xs font-semibold text-cyan-300">
                      {item.institution}
                    </p>

                    <p className="text-xs text-gray-400 leading-relaxed">
                      {item.description}
                    </p>

                    {item.highlights && (

                      <div className="pt-1.5 flex flex-wrap gap-2">

                        {item.highlights.map((highlight, hIdx) => (

                          <span
                            key={hIdx}
                            className="flex items-center gap-1 text-[11px] text-emerald-300"
                          >
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            {highlight}
                          </span>

                        ))}

                      </div>

                    )}

                  </div>

                ))}

              </div>

            </div>


            {/* Key Projects */}
            <div className="space-y-4">

              <h3 className="text-base font-bold text-white flex items-center gap-2 uppercase tracking-widest">
                <Code2 className="w-4 h-4 text-indigo-400" />
                <span>Key Project</span>
              </h3>

              <div className="grid grid-cols-1 gap-4">

                {/* WanderLust */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-950/50 to-indigo-950/50 border border-cyan-500/20 space-y-3">

                  <div className="flex flex-wrap items-center justify-between gap-2">

                    <h4 className="text-base font-bold text-white">
                      WanderLust
                    </h4>

                    <span className="text-xs px-2.5 py-1 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/30">
                      Full Stack Web App
                    </span>

                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed">
                    An Airbnb-inspired travel accommodation and property
                    listing platform built using Node.js, Express.js,
                    MongoDB, EJS, and JavaScript.
                  </p>

                  <div className="space-y-2">

                    <p className="text-xs font-semibold text-gray-300">
                      Key Features
                    </p>

                    <div className="flex flex-wrap gap-2">

                      {[
                        'Authentication & Authorization',
                        'Property Listing Management',
                        'Image Uploads',
                        'Interactive Maps',
                        'Search & Filtering',
                        'Reviews & Ratings',
                        'Owner Access Control',
                        'Check availability',
                        'Booking System',
                        'Secure Payment Integration',
                        'Joi Validation',
                        'Responsive UI',
                      ].map((feature) => (

                        <span
                          key={feature}
                          className="flex items-center gap-1 text-[11px] text-emerald-300"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          {feature}
                        </span>

                      ))}

                    </div>

                  </div>

                  <div className="flex flex-wrap gap-1 pt-1">

                    {[
                      'MongoDB',
                      'Express.js',
                      'Node.js',
                      'EJS',
                      'JavaScript',
                      'Bootstrap',
                      'Cloudinary',
                      'Leaflet',
                      'Joi',
                      'Passport.js',
                    ].map((tech) => (

                      <span
                        key={tech}
                        className="text-[10px] px-2 py-0.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/30"
                      >
                        {tech}
                      </span>

                    ))}

                  </div>

                </div>

              </div>

            </div>


            {/* Career Objective */}
            <div className="space-y-3">

              <h3 className="text-base font-bold text-white flex items-center gap-2 uppercase tracking-widest">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Career Objective</span>
              </h3>

              <p className="text-sm text-gray-300 leading-relaxed p-4 rounded-xl bg-gray-900/60 border border-white/5">
                Aspiring Software Developer focused on building scalable
                and reliable software applications, strengthening Data
                Structures & Algorithms and backend development skills,
                and contributing to impactful real-world software projects.
                Open to SDE and SWE internship opportunities.
              </p>

            </div>

          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  );
}
