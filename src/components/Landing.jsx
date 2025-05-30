import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPlay, FaTrophy, FaBrain, FaLightbulb } from "react-icons/fa";

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
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="py-8 px-6 text-center">
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center items-center space-x-4"
        >
          <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center">
            <FaBrain className="text-indigo-600 text-3xl" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Trivia Master
          </h1>
        </motion.div>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-4 text-gray-600 text-lg"
        >
          Test your knowledge and climb the leaderboard!
        </motion.p>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-4xl w-full grid md:grid-cols-3 gap-8">
          {/* Feature Cards */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-white rounded-2xl p-6 shadow-lg flex flex-col items-center text-center"
          >
            <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
              <FaLightbulb className="text-indigo-600 text-3xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Challenging Questions</h3>
            <p className="text-gray-600 mb-4">Test your knowledge with our carefully curated questions across various categories.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="bg-white rounded-2xl p-6 shadow-lg flex flex-col items-center text-center relative z-10"
          >
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full font-medium">
              Ready to Play?
            </div>
            <div className="mt-8 flex flex-col space-y-4 w-full">
              <button 
                onClick={handlePlayGameClick}
                className="btn btn-primary flex items-center justify-center space-x-2 w-full"
              >
                <FaPlay className="text-sm" />
                <span>Start Game</span>
              </button>
              <button 
                onClick={handleScoreClick}
                className="btn btn-outline flex items-center justify-center space-x-2 w-full"
              >
                <FaTrophy className="text-yellow-500" />
                <span>View High Scores</span>
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-white rounded-2xl p-6 shadow-lg flex flex-col items-center text-center"
          >
            <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
              <FaBrain className="text-indigo-600 text-3xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
            <p className="text-gray-600">Monitor your improvement and compete with friends on the leaderboard.</p>
          </motion.div>
        </div>
      </main>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-1/2 right-20 w-40 h-40 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-10 left-1/3 w-36 h-36 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
    </div>
  );
};