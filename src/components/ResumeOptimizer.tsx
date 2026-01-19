import { motion } from 'framer-motion';
import { Zap, TrendingUp, Copy, Download } from 'lucide-react';
import { useState } from 'react';

interface ResumeOptimizerProps {
  jobDescription?: string;
}

export default function ResumeOptimizer({ jobDescription = '' }: ResumeOptimizerProps) {
  const [jobDesc, setJobDesc] = useState(jobDescription);
  const [atsScore, setAtsScore] = useState(0);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const mockSuggestions = [
    'Add "Project Management" to your skills section - appears 5 times in job posting',
    'Include "Agile/Scrum" experience - mentioned 3 times',
    'Highlight "Cross-functional collaboration" - key requirement',
    'Add metrics to your achievements (e.g., "increased productivity by 40%")',
    'Include "Python" and "SQL" in technical skills',
    'Add "Leadership" experience from your previous roles',
  ];

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setAtsScore(84);
      setSuggestions(mockSuggestions);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
          <Zap className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white">Resume Optimizer</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Job Description</label>
          <textarea
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
            placeholder="Paste the job description here..."
            rows={6}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
          />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAnalyze}
            disabled={!jobDesc || isAnalyzing}
            className="w-full mt-4 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Zap className="w-5 h-5" />
            {isAnalyzing ? 'Analyzing...' : 'Analyze & Optimize'}
          </motion.button>
        </div>

        <div>
          {atsScore > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-300 font-medium">ATS Score</span>
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>

                <div className="relative h-12 bg-gray-800 rounded-lg overflow-hidden mb-4">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${atsScore}%` }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-end pr-2"
                  >
                    <span className="text-white font-bold text-sm">{atsScore}%</span>
                  </motion.div>
                </div>

                <p className="text-sm text-gray-400">Strong match with job requirements</p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">Optimization Suggestions</h4>
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {suggestions.map((suggestion, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3 p-3 bg-gray-800/50 border border-gray-700 rounded-lg"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 flex-shrink-0" />
                      <p className="text-sm text-gray-300">{suggestion}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="flex-1 py-2 border border-gray-700 text-gray-300 rounded-lg hover:border-gray-600 hover:text-white transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <Copy className="w-4 h-4" />
                  Copy Results
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="flex-1 py-2 border border-gray-700 text-gray-300 rounded-lg hover:border-gray-600 hover:text-white transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <Download className="w-4 h-4" />
                  Export
                </motion.button>
              </div>
            </motion.div>
          )}

          {atsScore === 0 && (
            <div className="h-full flex items-center justify-center text-center text-gray-400">
              <div>
                <Zap className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>Paste a job description and click Analyze</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
