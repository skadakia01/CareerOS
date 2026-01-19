import { motion } from 'framer-motion';
import { MessageSquare, BookOpen, Users, Clock, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface Question {
  category: string;
  question: string;
  tips: string[];
  icon: React.ReactNode;
}

const interviewQuestions: Question[] = [
  {
    category: 'Behavioral',
    question: 'Tell me about a time you overcame a significant challenge at work',
    tips: [
      'Use STAR method (Situation, Task, Action, Result)',
      'Quantify results when possible',
      'Show problem-solving skills',
      'Demonstrate resilience and learning',
    ],
    icon: <MessageSquare className="w-5 h-5" />,
  },
  {
    category: 'Technical',
    question: 'Explain your approach to solving complex technical problems',
    tips: [
      'Break down complex problems step-by-step',
      'Explain your thought process clearly',
      'Discuss trade-offs and solutions',
      'Show knowledge of best practices',
    ],
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    category: 'Leadership',
    question: 'How do you handle conflicts in a team?',
    tips: [
      'Show empathy and active listening',
      'Focus on finding mutual solutions',
      'Demonstrate maturity and professionalism',
      'Provide specific examples',
    ],
    icon: <Users className="w-5 h-5" />,
  },
  {
    category: 'Situational',
    question: 'What would you do if you missed a critical deadline?',
    tips: [
      'Take responsibility immediately',
      'Explain corrective actions taken',
      'Show commitment to communication',
      'Describe preventive measures',
    ],
    icon: <Clock className="w-5 h-5" />,
  },
];

export default function InterviewPrep() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [completedIndex, setCompletedIndex] = useState<Set<number>>(new Set());

  const toggleCompleted = (index: number) => {
    const newSet = new Set(completedIndex);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    setCompletedIndex(newSet);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500">
          <MessageSquare className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white">Interview Preparation</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white mb-4">Common Interview Questions</h4>
          {interviewQuestions.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`border rounded-lg transition-all cursor-pointer ${
                expandedIndex === index
                  ? 'bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border-cyan-500/50'
                  : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
              }`}
            >
              <motion.button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="w-full p-4 text-left"
              >
                <div className="flex items-start gap-3">
                  <div className="text-cyan-400 mt-1">{item.icon}</div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-cyan-400 mb-1">{item.category}</p>
                    <p className="text-white text-sm">{item.question}</p>
                  </div>
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCompleted(index);
                    }}
                    whileHover={{ scale: 1.1 }}
                    className="flex-shrink-0"
                  >
                    <CheckCircle
                      className={`w-5 h-5 ${
                        completedIndex.has(index)
                          ? 'text-green-400 fill-green-400'
                          : 'text-gray-600'
                      }`}
                    />
                  </motion.button>
                </div>
              </motion.button>

              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-gray-700 px-4 py-4 space-y-3"
                  >
                    <div>
                      <p className="text-xs font-semibold text-gray-400 mb-3 uppercase">Key Tips</p>
                      <ul className="space-y-2">
                        {item.tips.map((tip, i) => (
                          <li key={i} className="flex gap-2 text-sm text-gray-300">
                            <span className="text-cyan-400 flex-shrink-0">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      className="w-full py-2 bg-cyan-600 text-white text-sm font-semibold rounded-lg hover:bg-cyan-700 transition-colors"
                    >
                      Practice Answer
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-800 rounded-xl p-6">
            <h4 className="text-white font-semibold mb-4">Interview Quick Stats</h4>
            <div className="space-y-4">
              {[
                { label: 'Questions Prepared', value: `${completedIndex.size} / ${interviewQuestions.length}` },
                { label: 'Preparation Score', value: `${Math.round((completedIndex.size / interviewQuestions.length) * 100)}%` },
                { label: 'Interviews Scheduled', value: '2' },
                { label: 'Success Rate', value: '75%' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex justify-between items-center pb-3 border-b border-gray-700 last:border-0"
                >
                  <span className="text-gray-400 text-sm">{stat.label}</span>
                  <span className="text-white font-semibold">{stat.value}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-800 rounded-xl p-6">
            <h4 className="text-white font-semibold mb-3">Pro Tips</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex gap-2">
                <span className="text-blue-400 flex-shrink-0">→</span>
                Practice with a mirror or record yourself
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400 flex-shrink-0">→</span>
                Research the company thoroughly beforehand
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400 flex-shrink-0">→</span>
                Prepare thoughtful questions for the interviewer
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400 flex-shrink-0">→</span>
                Dress professionally and arrive 10 minutes early
              </li>
            </ul>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all"
          >
            Start Mock Interview
          </motion.button>
        </div>
      </div>
    </div>
  );
}

import { AnimatePresence } from 'framer-motion';
