

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Trash2,
  X,
  Key,
  User,
} from 'lucide-react';

import {
  chatbotKnowledgeBase,
  personalInfo,
  skillsData,
  projectsData,
  aboutContent,
  experienceData,
} from '../../data/portfolioData';

export default function AiChatbot({
  isOpenAsModal = false,
  onCloseModal,
}) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Hello! I am **${personalInfo.name}'s AI Assistant** powered by Google Gemini.

You can ask me about Naveen's:
• DSA & problem-solving skills
• MERN stack development
• Projects
• Education
• Achievements
• Software development experience
• Internship opportunities

How can I help you?`,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(false);

  const envKey = import.meta.env.VITE_GEMINI_API_KEY || '';

  const [apiKey, setApiKey] = useState(
    localStorage.getItem('gemini_api_key') || envKey
  );

  const [showApiKeyModal, setShowApiKeyModal] = useState(false);

  const chatContainerRef = useRef(null);
  const recognitionRef = useRef(null);

  /*
   * ---------------------------------------------------------
   * BUILD COMPLETE PORTFOLIO CONTEXT FOR GEMINI
   * ---------------------------------------------------------
   */

  const portfolioContext = `
NAVEEN KUMAR - PORTFOLIO INFORMATION

PERSONAL INFORMATION
Name: ${personalInfo.name}
Title: ${personalInfo.title}
Location: ${personalInfo.location}
Current Status: ${personalInfo.status}
Email: ${personalInfo.email}
GitHub: ${personalInfo.github}
LinkedIn: ${personalInfo.linkedin}

ROLES
${personalInfo.roles.join(', ')}

BIO
${personalInfo.bio}

==================================================
TECHNICAL SKILLS
==================================================

FRONTEND
${skillsData.Frontend.map((skill) => `- ${skill.name}`).join('\n')}

BACKEND
${skillsData.Backend.map((skill) => `- ${skill.name}`).join('\n')}

DATABASE
${skillsData.Database.map((skill) => `- ${skill.name}`).join('\n')}

CLOUD & DEVOPS
${skillsData['Cloud & DevOps']
  .map((skill) => `- ${skill.name}`)
  .join('\n')}

PROGRAMMING LANGUAGES
${skillsData['Programming Languages']
  .map((skill) => `- ${skill.name}`)
  .join('\n')}

TOOLS & SOFTWARE
${skillsData['Tools & Software']
  .map((skill) => `- ${skill.name}`)
  .join('\n')}

PROFESSIONAL SKILLS
${skillsData['Professional Skills']
  .map((skill) => `- ${skill.name}`)
  .join('\n')}

==================================================
DATA STRUCTURES & ALGORITHMS
==================================================

Naveen is actively developing his Data Structures & Algorithms
and competitive programming skills.

DSA TOPICS HE HAS STUDIED/PRACTICED:

- Arrays
- Strings
- Linked Lists
- Stacks
- Queues
- Trees
- Binary Search Trees
- Graphs
- Graph Traversals
- BFS
- DFS
- Topological Sorting
- Kahn's Algorithm
- Dijkstra's Algorithm
- Greedy Algorithms
- Sliding Window
- Heaps / Priority Queues
- Dynamic Programming
- Recursion
- Backtracking
- Segment Trees
- Range Queries
- Range Updates
- Lazy Propagation
- Sum Queries
- Minimum Queries
- Maximum Queries
- XOR Queries
- GCD Queries
- Complexity Analysis
- Competitive Programming

IMPORTANT:
Do NOT claim that Naveen is an expert in every DSA topic.
Describe him as actively practicing and strengthening these concepts.
If asked about his DSA level, explain that he has a growing foundation with
hands-on problem solving and is continuously improving through practice.

==================================================
PROJECTS
==================================================

${projectsData
  .map(
    (project) => `
PROJECT: ${project.title}

Category: ${project.category}
Tagline: ${project.tagline}

DESCRIPTION:
${project.description}

FEATURES:
${project.features.map((feature) => `- ${feature}`).join('\n')}

TECH STACK:
${project.techStack.map((tech) => `- ${tech}`).join('\n')}

GitHub:
${project.githubUrl}

Live Demo:
${project.demoUrl}
`
  )
  .join('\n')}

==================================================
ABOUT / DEVELOPMENT JOURNEY
==================================================

${aboutContent.summary}

JOURNEY:

${aboutContent.journey
  .map(
    (item) => `
${item.year} - ${item.title}
${item.description}
`
  )
  .join('\n')}

CORE DEVELOPMENT PILLARS:

${aboutContent.pillars
  .map(
    (pillar) =>
      `- ${pillar.title}: ${pillar.description}`
  )
  .join('\n')}

==================================================
EDUCATION / EXPERIENCE / ACHIEVEMENTS
==================================================

${experienceData
  .map(
    (item) => `
${item.type.toUpperCase()}
Title: ${item.title}
Institution: ${item.institution}
Period: ${item.period}
Description: ${item.description}

Highlights:
${item.highlights.map((h) => `- ${h}`).join('\n')}
`
  )
  .join('\n')}
`;

  /*
   * ---------------------------------------------------------
   * SPEECH RECOGNITION
   * ---------------------------------------------------------
   */

  useEffect(() => {
    if (
      'webkitSpeechRecognition' in window ||
      'SpeechRecognition' in window
    ) {
      const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

      const recognition = new SpeechRecognition();

      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const transcript =
          event.results[0][0].transcript;

        setInputText(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  /*
   * ---------------------------------------------------------
   * AUTO SCROLL
   * ---------------------------------------------------------
   */

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  /*
   * ---------------------------------------------------------
   * VOICE INPUT
   * ---------------------------------------------------------
   */

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert(
        'Speech recognition is not supported in this browser. Please use Google Chrome or Microsoft Edge.'
      );

      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        setIsListening(false);
      }
    }
  };

  /*
   * ---------------------------------------------------------
   * TEXT TO SPEECH
   * ---------------------------------------------------------
   */

  const speakText = (text) => {
    if (
      !speechEnabled ||
      !('speechSynthesis' in window)
    ) {
      return;
    }

    window.speechSynthesis.cancel();

    const cleanText = text
      .replace(/[*#_`]/g, '')
      .replace(/•/g, '');

    const utterance =
      new SpeechSynthesisUtterance(cleanText);

    utterance.rate = 1;

    window.speechSynthesis.speak(utterance);
  };

  /*
   * ---------------------------------------------------------
   * LOCAL KNOWLEDGE BASE MATCHING
   * ---------------------------------------------------------
   */

  const findLocalAnswer = (query) => {
    const lowerQuery = query.toLowerCase();

    /*
     * DSA FIRST
     *
     * This is intentionally checked before generic "skills"
     * because questions like "What DSA skills..." contain
     * both "dsa" and "skills".
     */

    if (
      lowerQuery.includes('dsa') ||
      lowerQuery.includes('data structure') ||
      lowerQuery.includes('algorithm') ||
      lowerQuery.includes('leetcode') ||
      lowerQuery.includes('competitive programming') ||
      lowerQuery.includes('problem solving') ||
      lowerQuery.includes('segment tree') ||
      lowerQuery.includes('lazy propagation') ||
      lowerQuery.includes('dijkstra') ||
      lowerQuery.includes('dynamic programming')
    ) {
      return chatbotKnowledgeBase.dsaResponse;
    }

    /*
     * PROJECTS
     */

    if (
      lowerQuery.includes('project') ||
      lowerQuery.includes('projects') ||
      lowerQuery.includes('wanderlust') ||
      lowerQuery.includes('built') ||
      lowerQuery.includes('application') ||
      lowerQuery.includes('app') ||
      lowerQuery.includes('github project')
    ) {
      return chatbotKnowledgeBase.projectResponse;
    }

    /*
     * MERN / TECH STACK
     */

    if (
      lowerQuery.includes('mern') ||
      lowerQuery.includes('tech stack') ||
      lowerQuery.includes('technology') ||
      lowerQuery.includes('technologies') ||
      lowerQuery.includes('frontend') ||
      lowerQuery.includes('backend') ||
      lowerQuery.includes('database') ||
      lowerQuery.includes('node') ||
      lowerQuery.includes('express') ||
      lowerQuery.includes('react') ||
      lowerQuery.includes('mongodb')
    ) {
      return chatbotKnowledgeBase.mernResponse;
    }

    /*
     * EDUCATION
     */

    if (
      lowerQuery.includes('education') ||
      lowerQuery.includes('college') ||
      lowerQuery.includes('degree') ||
      lowerQuery.includes('nit') ||
      lowerQuery.includes('jalandhar') ||
      lowerQuery.includes('study')
    ) {
      return chatbotKnowledgeBase.educationResponse;
    }

    /*
     * ACHIEVEMENTS
     */

    if (
      lowerQuery.includes('achievement') ||
      lowerQuery.includes('award') ||
      lowerQuery.includes('certification') ||
      lowerQuery.includes('cretogee') ||
      lowerQuery.includes('algouniversity')
    ) {
      return chatbotKnowledgeBase.achievementResponse;
    }

    /*
     * CONTACT
     */

    if (
      lowerQuery.includes('hire') ||
      lowerQuery.includes('contact') ||
      lowerQuery.includes('email') ||
      lowerQuery.includes('github') ||
      lowerQuery.includes('linkedin')
    ) {
      return chatbotKnowledgeBase.contactResponse;
    }

    /*
     * ABOUT
     */

    if (
      lowerQuery.includes('who is naveen') ||
      lowerQuery.includes('tell me about naveen') ||
      lowerQuery.includes('about naveen') ||
      lowerQuery.includes('introduce naveen') ||
      lowerQuery === 'about'
    ) {
      return chatbotKnowledgeBase.aboutResponse;
    }

    return null;
  };

  /*
   * ---------------------------------------------------------
   * SEND MESSAGE
   * ---------------------------------------------------------
   */

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputText;

    if (!query.trim()) {
      return;
    }

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages((prev) => [...prev, userMsg]);

    if (!textToSend) {
      setInputText('');
    }

    setIsTyping(true);

    let aiReply = '';

    /*
     * -------------------------------------------------------
     * GEMINI
     * -------------------------------------------------------
     */

    if (apiKey.trim()) {
      try {
        const systemPrompt = `
You are Naveen Kumar's professional AI Portfolio Assistant.

Your job is to answer questions from recruiters, hiring managers,
developers, clients, and visitors about Naveen.

Use ONLY the portfolio information provided below.

CRITICAL RULES:

1. Never invent skills, projects, internships, companies,
   technologies, achievements, ratings, or experience.

2. If the portfolio does not contain the requested information,
   clearly say that the information is not currently listed.

3. Do not exaggerate Naveen's experience.

4. Distinguish between:
   - skills he has studied/practiced
   - technologies used in projects
   - professional experience

5. When discussing DSA, explain the actual topics he has studied.
   Do not simply say "he knows DSA."

6. When discussing projects, explain:
   - project purpose
   - architecture / type
   - important features
   - technologies
   - backend work
   - database work
   - authentication/authorization
   - validation
   - deployment where available

7. For recruiter questions, answer professionally and concisely.

8. Prefer structured answers with short headings and bullet points.

9. If asked "What DSA skills does Naveen have?",
   give a detailed DSA-specific answer rather than a generic skills list.

10. If asked "What projects has Naveen built?",
    explain the actual project(s) and what Naveen implemented.

11. If asked about Naveen's level, use balanced language such as
    "actively developing", "hands-on practice", "strong foundation",
    or "continuously improving" instead of claiming expert-level ability.

PORTFOLIO DATA:

${portfolioContext}

USER QUESTION:

${query}
`;

        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',

            headers: {
              'Content-Type': 'application/json',
            },

            body: JSON.stringify({
              contents: [
                {
                  role: 'user',
                  parts: [
                    {
                      text: systemPrompt,
                    },
                  ],
                },
              ],
            }),
          }
        );

        const data = await res.json();

        if (
          data.candidates &&
          data.candidates[0]?.content?.parts?.[0]?.text
        ) {
          aiReply =
            data.candidates[0].content.parts[0].text;
        }
      } catch (error) {
        console.warn(
          'Gemini API failed. Using local knowledge base.',
          error
        );
      }
    }

    /*
     * -------------------------------------------------------
     * LOCAL FALLBACK
     * -------------------------------------------------------
     */

    if (!aiReply) {
      aiReply = findLocalAnswer(query);
    }

    /*
     * FINAL FALLBACK
     */

    if (!aiReply) {
      aiReply = `Naveen Kumar is an aspiring Software Developer and B.Tech student at NIT Jalandhar.

His main focus areas are:

• MERN Stack Development
• Backend Development
• Data Structures & Algorithms
• Problem Solving
• Database Management
• Software Engineering

You can ask me about his DSA preparation, projects, technical skills, education, achievements, or how to contact him.`;
    }

    /*
     * -------------------------------------------------------
     * SIMULATED TYPING DELAY
     * -------------------------------------------------------
     */

    setTimeout(() => {
      const aiMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiReply,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setMessages((prev) => [...prev, aiMsg]);

      setIsTyping(false);

      speakText(aiReply);
    }, 600);
  };

  /*
   * ---------------------------------------------------------
   * SAVE API KEY
   * ---------------------------------------------------------
   */

  const handleSaveApiKey = (key) => {
    setApiKey(key);

    if (key) {
      localStorage.setItem(
        'gemini_api_key',
        key
      );
    } else {
      localStorage.removeItem(
        'gemini_api_key'
      );
    }

    setShowApiKeyModal(false);
  };

  /*
   * ---------------------------------------------------------
   * SUGGESTED QUESTIONS
   * ---------------------------------------------------------
   */

  const suggestedQuestions = [
    'Tell me about Naveen',
    'What DSA skills does he have?',
    'Explain his projects',
    'Explain the WanderLust project',
    'What are his MERN stack skills?',
    'How can I hire Naveen?',
  ];

  /*
   * ---------------------------------------------------------
   * CHAT CONTENT
   * ---------------------------------------------------------
   */

  const content = (
    <div className="w-full h-full flex flex-col glass-card rounded-3xl border border-cyan-500/30 overflow-hidden shadow-2xl">

      {/* HEADER */}

      <div className="p-4 sm:p-5 bg-gray-950/90 border-b border-white/10 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="relative p-2.5 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/20">

            <Bot className="w-6 h-6 animate-pulse" />

            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-gray-950" />

          </div>

          <div>

            <div className="flex items-center gap-2">

              <h3 className="font-bold text-white text-base">
                Naveen's AI Assistant
              </h3>

              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-700/50">
                Gemini
              </span>

            </div>

            <p className="text-xs text-gray-400">
              Ask about DSA, skills, projects & experience
            </p>

          </div>

        </div>

        <div className="flex items-center gap-1.5">

          {/* VOICE */}

          <button
            onClick={() =>
              setSpeechEnabled(!speechEnabled)
            }
            className={`p-2 rounded-xl border transition-colors ${
              speechEnabled
                ? 'bg-cyan-950 border-cyan-500/40 text-cyan-300'
                : 'bg-gray-900 border-white/10 text-gray-400 hover:text-white'
            }`}
            title={
              speechEnabled
                ? 'Disable Voice Output'
                : 'Enable Voice Output'
            }
          >
            {speechEnabled ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          {/* API KEY */}

          <button
            onClick={() =>
              setShowApiKeyModal(true)
            }
            className="p-2 rounded-xl bg-gray-900 border border-white/10 text-gray-400 hover:text-white transition-colors"
            title="Configure Gemini API Key"
          >
            <Key className="w-4 h-4" />
          </button>

          {/* CLEAR */}

          <button
            onClick={() =>
              setMessages((prev) =>
                prev.length
                  ? [prev[0]]
                  : []
              )
            }
            className="p-2 rounded-xl bg-gray-900 border border-white/10 text-gray-400 hover:text-white transition-colors"
            title="Clear Chat History"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          {/* CLOSE */}

          {isOpenAsModal && (
            <button
              onClick={onCloseModal}
              className="p-2 rounded-xl bg-gray-800 border border-white/10 text-gray-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}

        </div>

      </div>

      {/* MESSAGES */}

      <div
        ref={chatContainerRef}
        className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 custom-scrollbar bg-gray-950/50"
      >

        {messages.map((msg) => (

          <motion.div
            key={msg.id}
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className={`flex items-start gap-3 ${
              msg.sender === 'user'
                ? 'flex-row-reverse'
                : ''
            }`}
          >

            <div
              className={`p-2 rounded-xl shrink-0 ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white'
                  : 'bg-gray-900 border border-cyan-500/30 text-cyan-400'
              }`}
            >
              {msg.sender === 'user' ? (
                <User className="w-4 h-4" />
              ) : (
                <Bot className="w-4 h-4" />
              )}
            </div>

            <div
              className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl text-xs sm:text-sm space-y-1 ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white rounded-tr-none'
                  : 'glass-card border border-white/10 text-gray-200 rounded-tl-none'
              }`}
            >

              <div className="whitespace-pre-wrap leading-relaxed">
                {msg.text}
              </div>

              <p
                className={`text-[10px] text-right ${
                  msg.sender === 'user'
                    ? 'text-cyan-200'
                    : 'text-gray-400'
                }`}
              >
                {msg.timestamp}
              </p>

            </div>

          </motion.div>

        ))}

        {/* TYPING */}

        {isTyping && (

          <div className="flex items-center gap-3">

            <div className="p-2 rounded-xl bg-gray-900 border border-cyan-500/30 text-cyan-400">
              <Bot className="w-4 h-4" />
            </div>

            <div className="glass-card p-4 rounded-2xl rounded-tl-none border border-white/10 flex items-center gap-1.5">

              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" />

              <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.2s]" />

              <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:0.4s]" />

            </div>

          </div>

        )}

      </div>

      {/* SUGGESTIONS */}

      <div className="px-4 py-2 bg-gray-950/80 border-t border-white/5 flex items-center gap-2 overflow-x-auto custom-scrollbar">

        <span className="text-[11px] text-cyan-400 font-semibold shrink-0">
          Try:
        </span>

        {suggestedQuestions.map((question, index) => (

          <button
            key={index}
            onClick={() =>
              handleSendMessage(question)
            }
            className="px-3 py-1 rounded-full bg-gray-900 hover:bg-gray-800 border border-white/10 text-gray-300 hover:text-white text-xs whitespace-nowrap transition-colors shrink-0"
          >
            {question}
          </button>

        ))}

      </div>

      {/* INPUT */}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-3 sm:p-4 bg-gray-950 border-t border-white/10 flex items-center gap-2"
      >

        <button
          type="button"
          onClick={toggleVoiceInput}
          className={`p-3 rounded-xl border transition-all ${
            isListening
              ? 'bg-rose-950 border-rose-500 text-rose-300 animate-pulse'
              : 'bg-gray-900 border-white/10 text-gray-400 hover:text-white'
          }`}
          title={
            isListening
              ? 'Stop Listening'
              : 'Voice Speech-to-Text Input'
          }
        >
          {isListening ? (
            <MicOff className="w-5 h-5" />
          ) : (
            <Mic className="w-5 h-5" />
          )}
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) =>
            setInputText(e.target.value)
          }
          placeholder={
            isListening
              ? 'Listening... speak now...'
              : "Ask Naveen's AI Assistant..."
          }
          className="flex-1 px-4 py-3 rounded-xl bg-gray-900 border border-white/10 text-white placeholder-gray-400 text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
        />

        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <Send className="w-5 h-5" />
        </button>

      </form>

      {/* API KEY MODAL */}

      {showApiKeyModal && (

        <div className="absolute inset-0 z-50 bg-gray-950/90 backdrop-blur-md flex items-center justify-center p-6">

          <div className="glass-card p-6 rounded-2xl border border-white/15 max-w-md w-full space-y-4">

            <div className="flex items-center justify-between">

              <h4 className="text-base font-bold text-white flex items-center gap-2">

                <Key className="w-4 h-4 text-cyan-400" />

                <span>
                  Configure Gemini API Key
                </span>

              </h4>

              <button
                onClick={() =>
                  setShowApiKeyModal(false)
                }
                className="text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

            </div>

            <p className="text-xs text-gray-300">
              Optional: Enter your Gemini API key to enable
              live Gemini responses. Without a key, the
              portfolio's local knowledge base will answer
              supported questions.
            </p>

            <input
              type="password"
              value={apiKey}
              onChange={(e) =>
                setApiKey(e.target.value)
              }
              placeholder="AIzaSy..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
            />

            <div className="flex justify-end gap-2 pt-2">

              <button
                onClick={() =>
                  handleSaveApiKey('')
                }
                className="px-3.5 py-2 rounded-xl bg-gray-800 text-gray-300 text-xs hover:text-white"
              >
                Clear Key
              </button>

              <button
                onClick={() =>
                  handleSaveApiKey(apiKey)
                }
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-bold"
              >
                Save Preference
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );

  /*
   * ---------------------------------------------------------
   * MODAL RENDER
   * ---------------------------------------------------------
   */

  if (isOpenAsModal) {

    return (
      <AnimatePresence>

        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCloseModal}
            className="fixed inset-0 bg-gray-950/80 backdrop-blur-md"
          />

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 20,
            }}
            className="relative w-full max-w-3xl h-[85vh] z-10"
          >
            {content}
          </motion.div>

        </div>

      </AnimatePresence>
    );
  }

  return content;
}