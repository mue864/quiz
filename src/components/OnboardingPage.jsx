import { motion, AnimatePresence } from 'framer-motion';
import { useContext, useState } from 'react';
import { DataContext } from '../app/DataProvider';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaCheck, FaChevronRight } from 'react-icons/fa';

const difficulties = [
  {
    id: 'easy',
    name: 'Easy',
    description: 'Perfect for beginners',
    color: 'from-green-400 to-emerald-500',
    selectedColor: 'bg-gradient-to-r from-green-500 to-emerald-600',
  },
  {
    id: 'medium',
    name: 'Medium',
    description: 'A bit more challenging',
    color: 'from-yellow-400 to-amber-500',
    selectedColor: 'bg-gradient-to-r from-amber-500 to-yellow-600',
  },
  {
    id: 'hard',
    name: 'Hard',
    description: 'For trivia experts',
    color: 'from-red-400 to-rose-500',
    selectedColor: 'bg-gradient-to-r from-rose-500 to-red-600',
  },
];

const categories = [
  { id: 'general', name: 'General Knowledge' },
  { id: 'science', name: 'Science & Nature' },
  { id: 'history', name: 'History' },
  { id: 'geography', name: 'Geography' },
  { id: 'art', name: 'Art & Literature' },
  { id: 'sports', name: 'Sports' },
  { id: 'entertainment', name: 'Entertainment' },
  { id: 'animals', name: 'Animals' },
];

export const OnboardingPage = () => {
  const [step, setStep] = useState(1);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [data, setData] = useState('');
  const [questionAmount, setQuestionAmountLocal] = useState(10);

  const { addCategories, addDifficulty, setQuestionAmount } = useContext(DataContext);
  const navigate = useNavigate();

  const handlePlayClick = () => {
    try {
      addCategories(data);
      addDifficulty(selectedDifficulty);
      setQuestionAmount(questionAmount);
      navigate('/game');
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  const handleNextStep = () => {
    if (step === 1 && !selectedDifficulty) return;
    if (step === 2 && selectedCategories.size === 0) return;
    if (step === 3) {
      handlePlayClick();
      return;
    }
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleDifficultySelect = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const toggleCategory = (category) => {
    setSelectedCategories((prev) => {
      const newCategories = new Set(prev);
      if (newCategories.has(category)) {
        newCategories.delete(category);
      } else {
        newCategories.add(category);
      }
      const categoriesString = Array.from(newCategories).join(',');
      setData(categoriesString);
      return newCategories;
    });
  };

  const isCategorySelected = (category) => selectedCategories.has(category);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between relative">
            {/* Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/20 -z-10">
              <motion.div
                className="h-full bg-indigo-500 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${(step / 3) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            
            {/* Steps */}
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${
                    step >= stepNum
                      ? 'bg-indigo-500'
                      : 'bg-white/20'
                  }`}
                >
                  {step > stepNum ? <FaCheck /> : stepNum}
                </div>
                <span className="mt-2 text-sm font-medium text-indigo-200">
                  {stepNum === 1 ? 'Difficulty' : stepNum === 2 ? 'Categories' : 'Options'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-white/20">
          <div className="p-8">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-white mb-2">
                      Select Difficulty
                    </h2>
                    <p className="text-indigo-200">
                      Choose how challenging you want the questions to be
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {difficulties.map((difficulty) => (
                      <motion.div
                        key={difficulty.id}
                        onClick={() => handleDifficultySelect(difficulty.id)}
                        className={`cursor-pointer rounded-xl overflow-hidden transition-all duration-300 relative ${selectedDifficulty === difficulty.id ? 'ring-2 ring-indigo-400 transform scale-105' : 'hover:shadow-lg'}`}
                        whileHover={{ y: -4 }}
                        whileTap={{ y: 0 }}
                      >
                        <div className={`bg-gradient-to-br ${difficulty.color} p-6 text-white backdrop-blur-md bg-opacity-20 border border-white/10`}>
                          <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold mb-1">{difficulty.name}</h3>
                            {difficulty.id === 'easy' && <span className="text-2xl">😊</span>}
                            {difficulty.id === 'medium' && <span className="text-2xl">🤔</span>}
                            {difficulty.id === 'hard' && <span className="text-2xl">🧠</span>}
                          </div>
                          <p className="text-white/80 text-sm">{difficulty.description}</p>
                          
                          {selectedDifficulty === difficulty.id && (
                            <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-indigo-500/30 flex items-center justify-center">
                              <FaCheck className="text-white text-xs" />
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-white mb-2">
                      Select Categories
                    </h2>
                    <p className="text-indigo-200">
                      Choose one or more categories you&apos;re interested in
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                    {categories.map((category) => (
                      <motion.div
                        key={category.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${
                          isCategorySelected(category.id)
                            ? 'border-indigo-400 bg-indigo-500/20 backdrop-blur-md'
                            : 'border-white/10 hover:border-indigo-400/50 bg-white/5 backdrop-blur-md'
                        }`}
                        onClick={() => toggleCategory(category.id)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-white">
                            {category.name}
                          </span>
                          {isCategorySelected(category.id) && (
                            <div className="w-5 h-5 rounded-full bg-indigo-500/30 flex items-center justify-center">
                              <FaCheck className="text-white text-xs" />
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-white mb-2">
                      Quiz Options
                    </h2>
                    <p className="text-indigo-200">
                      Customize your quiz experience
                    </p>
                  </div>

                  <div className="max-w-md mx-auto">
                    <div className="mb-8">
                      <label className="block text-sm font-medium text-white mb-2">Number of Questions</label>
                      <div className="flex items-center">
                        <input
                          type="range"
                          min="5"
                          max="50"
                          step="5"
                          value={questionAmount}
                          onChange={(e) => setQuestionAmountLocal(parseInt(e.target.value))}
                          className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="ml-4 bg-indigo-500/30 text-white font-medium px-3 py-1 rounded-lg min-w-[3rem] text-center">
                          {questionAmount}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-indigo-200">
                        {questionAmount < 10 ? 'Quick quiz' : questionAmount > 30 ? 'Long quiz session' : 'Standard quiz length'}
                      </p>
                    </div>

                    <div className="bg-indigo-500/20 backdrop-blur-md rounded-xl p-4 border border-indigo-400/30">
                      <h3 className="font-medium text-white mb-2">Quiz Summary</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                          <span className="text-indigo-200">Difficulty:</span>
                          <span className="font-medium text-white capitalize">{selectedDifficulty}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-indigo-200">Categories:</span>
                          <span className="font-medium text-white">{selectedCategories.size} selected</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-indigo-200">Questions:</span>
                          <span className="font-medium text-white">{questionAmount}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-12 flex justify-between">
              {step > 1 && (
                <motion.button
                  onClick={handlePrevStep}
                  whileHover={{ x: -4 }}
                  className="flex items-center text-indigo-200 hover:text-white font-medium"
                >
                  <FaChevronRight className="transform rotate-180 mr-2" />
                  Back
                </motion.button>
              )}
              
              {step < 2 ? (
                <motion.button
                  onClick={handleNextStep}
                  disabled={!selectedDifficulty}
                  className={`ml-auto flex items-center px-6 py-3 rounded-xl font-medium text-white ${
                    selectedDifficulty
                      ? 'bg-indigo-600 hover:bg-indigo-700'
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                  whileHover={selectedDifficulty ? { scale: 1.03 } : {}}
                  whileTap={selectedDifficulty ? { scale: 0.98 } : {}}
                >
                  Next
                  <FaChevronRight className="ml-2" />
                </motion.button>
              ) : step < 3 ? (
                <motion.button
                  onClick={handleNextStep}
                  disabled={selectedCategories.size === 0}
                  className={`ml-auto flex items-center px-6 py-3 rounded-xl font-medium text-white ${
                    selectedCategories.size > 0
                      ? 'bg-indigo-600 hover:bg-indigo-700'
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                  whileHover={selectedCategories.size > 0 ? { scale: 1.03 } : {}}
                  whileTap={selectedCategories.size > 0 ? { scale: 0.98 } : {}}
                >
                  Next
                  <FaChevronRight className="ml-2" />
                </motion.button>
              ) : (
                <motion.button
                  onClick={handlePlayClick}
                  className="ml-auto flex items-center px-6 py-3 rounded-xl font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start Game
                  <FaArrowRight className="ml-2" />
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
