import React from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Trophy,
  Target,
  ExternalLink,
  GitBranch,
  Layers,
  Network,
  Brain,
  Search,
  Zap,
} from 'lucide-react';

export default function DSA() {
  const codingProfiles = [
    {
      name: 'LeetCode',
      icon: Code2,
      description: 'Algorithmic problem solving and interview preparation',
      stats: '600+ Problems Solved',
      topics: 'DSA • Algorithms • Problem Solving',
      url: 'https://leetcode.com/u/NaveenYadav5595/',
      badge: 'Problems Solved',
    },
    {
      name: 'CodeChef',
      icon: Trophy,
      description: 'Competitive programming and algorithmic contests',
      stats: 'Competitive Programming',
      topics: 'Algorithms • DSA • Contests',
      url: 'https://www.codechef.com/users/naveen_5595',
      badge: 'Competitive Programming',
    }
  ];

  const dsaTopics = [
    {
      name: 'Arrays & Strings',
      icon: Layers,
    },
    {
      name: 'Linked Lists',
      icon: GitBranch,
    },
    {
      name: 'Stacks & Queues',
      icon: Layers,
    },
    {
      name: 'Trees & BST',
      icon: GitBranch,
    },
    {
      name: 'Graphs',
      icon: Network,
    },
    {
      name: 'Dynamic Programming',
      icon: Brain,
    },
    {
      name: 'Greedy Algorithms',
      icon: Zap,
    },
    {
      name: 'Binary Search',
      icon: Search,
    },
    {
      name: 'Sliding Window',
      icon: Target,
    },
    {
      name: 'Heaps',
      icon: Layers,
    },
    {
      name: 'Segment Trees',
      icon: GitBranch,
    },
    {
      name: 'Graph Algorithms',
      icon: Network,
    },
  ];

  return (
    <section id="dsa" className="relative py-24">
      {/* Background Glow */}
      <div className="glow-orb glow-orb-purple w-80 h-80 top-20 left-10" />
      <div className="glow-orb glow-orb-cyan w-80 h-80 bottom-10 right-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5" />
            <span>Problem Solving</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            DSA &{' '}
            <span className="text-gradient-primary">
              Competitive Programming
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-400">
            Regularly practicing Data Structures & Algorithms through
            competitive programming and coding platforms.
          </p>
        </div>

        {/* Coding Profiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">

          {codingProfiles.map((profile, index) => {
            const Icon = profile.icon;

            return (
              <motion.a
                key={profile.name}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                }}
                whileHover={{ y: -6 }}
                className="glass-card glass-card-hover p-6 rounded-3xl border border-white/10 group"
              >

                {/* Icon + External Link */}
                <div className="flex items-center justify-between mb-6">

                  <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <Icon className="w-7 h-7" />
                  </div>

                  <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 transition-colors" />

                </div>

                {/* Platform Name */}
                <h3 className="text-xl font-bold text-white mb-2">
                  {profile.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-400 leading-relaxed mb-5">
                  {profile.description}
                </p>

                {/* Stats */}
                <div className="px-4 py-3 rounded-xl bg-gray-900/70 border border-white/5 mb-4">
                  <p className="text-sm font-bold text-cyan-300">
                    {profile.stats}
                  </p>

                  <p className="text-[11px] text-gray-500 mt-1">
                    {profile.badge}
                  </p>
                </div>

                {/* Topics */}
                <p className="text-xs text-gray-400">
                  {profile.topics}
                </p>

                {/* View Profile */}
                <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-gray-400 group-hover:text-cyan-300 transition-colors">
                  View Profile
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>

              </motion.a>
            );
          })}

        </div>

        {/* DSA Topics */}
        <div className="space-y-6">

          <div className="flex items-center gap-3 border-b border-white/10 pb-3">

            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <Brain className="w-5 h-5" />
            </div>

            <h3 className="text-xl font-bold text-white">
              Core DSA Topics
            </h3>

            <span className="text-xs px-2.5 py-0.5 rounded-full bg-gray-800 text-gray-400 font-semibold">
              {dsaTopics.length} Topics
            </span>

          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">

            {dsaTopics.map((topic, index) => {
              const Icon = topic.icon;

              return (
                <motion.div
                  key={topic.name}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.04,
                  }}
                  className="glass-card glass-card-hover p-4 rounded-2xl border border-white/10 flex items-center gap-3"
                >

                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                    <Icon className="w-4 h-4" />
                  </div>

                  <span className="text-sm font-semibold text-gray-200">
                    {topic.name}
                  </span>

                </motion.div>
              );
            })}

          </div>

        </div>

      </div>
    </section>
  );
}