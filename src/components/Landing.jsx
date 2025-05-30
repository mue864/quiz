import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPlay, FaTrophy, FaBrain, FaLightbulb, FaClock, FaFilter, FaChartLine, FaGraduationCap, FaAward } from "react-icons/fa";

import '../index.css';

export const Landing = () => {
  const navigate = useNavigate();

  const handlePlayGameClick = () => {
    navigate('/onboard');
  };

  const handleScoreClick = () => {
    navigate('/scores');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-purple-400 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-1/2 right-20 w-80 h-80 bg-indigo-400 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-blue-400 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="text-center mb-16">
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center">
              <FaBrain className="text-indigo-300 text-4xl" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
              Trivia Challenge
            </h1>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-6 max-w-2xl mx-auto"
          >
            <p className="text-xl text-indigo-200">
              Test your knowledge with our enhanced quiz experience!
            </p>
          </motion.div>
        </header>

        {/* Main Content */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Left Side Features */}
          <div className="lg:col-span-4 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-indigo-500/50 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                  <FaLightbulb className="text-indigo-300 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white">Smart Hints</h3>
                  <p className="text-indigo-200">Get helpful clues when you&apos;re stuck on difficult questions. Use hints strategically to maximize your score.</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-indigo-500/50 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                  <FaClock className="text-indigo-300 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white">Timed Challenges</h3>
                  <p className="text-indigo-200">Race against the clock to earn bonus points. Faster answers mean higher scores in this exciting time-based quiz format.</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-indigo-500/50 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                  <FaChartLine className="text-indigo-300 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white">Performance Stats</h3>
                  <p className="text-indigo-200">Track your progress with detailed statistics. Filter scores by category and difficulty to see your strengths.</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Center Call to Action */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="lg:col-span-4 flex flex-col items-center justify-center"
          >
            <div className="bg-gradient-to-b from-indigo-800/80 to-purple-900/80 backdrop-blur-lg rounded-3xl p-8 border border-indigo-500/30 shadow-xl shadow-indigo-900/30 w-full max-w-md mx-auto relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500 rounded-full opacity-20 blur-2xl"></div>
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500 rounded-full opacity-20 blur-2xl"></div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 mx-auto flex items-center justify-center mb-6">
                  <FaGraduationCap className="text-white text-3xl" />
                </div>
                
                <h2 className="text-2xl font-bold text-center mb-6 text-white">Ready to Challenge Yourself?</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="bg-white/10 rounded-lg p-4">
                    <h4 className="font-semibold text-indigo-200 mb-3 text-center">Game Features</h4>
                    <ul className="space-y-3">
                      <li className="flex items-center text-white">
                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center mr-3">
                          <FaClock className="text-indigo-300" />
                        </div>
                        <span>Timed questions with bonus points</span>
                      </li>
                      <li className="flex items-center text-white">
                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center mr-3">
                          <FaLightbulb className="text-indigo-300" />
                        </div>
                        <span>Hint system for difficult questions</span>
                      </li>
                      <li className="flex items-center text-white">
                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center mr-3">
                          <FaFilter className="text-indigo-300" />
                        </div>
                        <span>Customizable quiz options</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <button 
                    onClick={handlePlayGameClick}
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/30"
                  >
                    <FaPlay className="text-sm" />
                    <span>Start Game</span>
                  </button>
                  <button 
                    onClick={handleScoreClick}
                    className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 border border-white/20 hover:border-white/40"
                  >
                    <FaTrophy className="text-yellow-400" />
                    <span>View High Scores</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side Features */}
          <div className="lg:col-span-4 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-indigo-500/50 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                  <FaFilter className="text-indigo-300 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white">Custom Categories</h3>
                  <p className="text-indigo-200">Choose from a wide range of topics including science, history, entertainment, and more to customize your quiz experience.</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-indigo-500/50 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                  <FaAward className="text-indigo-300 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white">Difficulty Levels</h3>
                  <p className="text-indigo-200">Select your challenge level from easy to hard. Higher difficulties offer more points but tougher questions.</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-indigo-500/50 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                  <FaBrain className="text-indigo-300 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white">Knowledge Expansion</h3>
                  <p className="text-indigo-200">Learn interesting facts while having fun. Our diverse question bank helps expand your knowledge across multiple domains.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center text-indigo-300/60 text-sm">
          <p>© 2025 Trivia Challenge | Test your knowledge and have fun!</p>
        </footer>
      </div>
    </div>
  );
};