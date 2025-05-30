import { motion, AnimatePresence } from 'framer-motion';
import { useContext, useState } from 'react';
import { DataContext } from '../app/DataProvider';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaBrain, FaCheck, FaChevronRight } from 'react-icons/fa';

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

  const { addCategories, addDifficulty } = useContext(DataContext);
  const navigate = useNavigate();

  const handlePlayClick = () => {
    try {
      addCategories(data);
      addDifficulty(selectedDifficulty);
      navigate('/game');
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  const handleNextStep = () => {
    if (step === 1 && !selectedDifficulty) return;
    if (step === 2 && selectedCategories.size === 0) return;
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between relative">
            {/* Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -z-10">
              <motion.div
                className="h-full bg-indigo-600 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${(step / 2) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            
            {/* Steps */}
            {[1, 2].map((stepNum) => (
              <div key={stepNum} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${
                    step >= stepNum
                      ? 'bg-indigo-600'
                      : 'bg-gray-300'
                  }`}
                >
                  {step > stepNum ? <FaCheck /> : stepNum}
                </div>
                <span className="mt-2 text-sm font-medium text-gray-600">
                  {stepNum === 1 ? 'Difficulty' : 'Categories'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
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
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      Select Difficulty
                    </h2>
                    <p className="text-gray-600">
                      Choose how challenging you want the questions to be
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    {difficulties.map((difficulty) => (
                      <motion.div
                        key={difficulty.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative p-6 rounded-xl cursor-pointer transition-all ${
                          selectedDifficulty === difficulty.id
                            ? 'ring-2 ring-offset-2 ring-indigo-500 bg-gradient-to-br from-indigo-50 to-blue-50'
                            : 'bg-white border-2 border-gray-200 hover:border-indigo-300'
                        }`}
                        onClick={() => handleDifficultySelect(difficulty.id)}
                      >
                        <div
                          className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center text-white text-xl ${
                            selectedDifficulty === difficulty.id
                              ? difficulty.selectedColor
                              : `bg-gradient-to-r ${difficulty.color}`
                          }`}
                        >
                          {difficulty.id === 'easy' && '😊'}
                          {difficulty.id === 'medium' && '🤔'}
                          {difficulty.id === 'hard' && '🧠'}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {difficulty.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {difficulty.description}
                        </p>
                        {selectedDifficulty === difficulty.id && (
                          <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
                            <FaCheck className="text-indigo-600 text-xs" />
                          </div>
                        )}
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
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      Select Categories
                    </h2>
                    <p className="text-gray-600">
                      Choose one or more categories you're interested in
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                    {categories.map((category) => (
                      <motion.div
                        key={category.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          isCategorySelected(category.id)
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-gray-200 hover:border-indigo-300'
                        }`}
                        onClick={() => toggleCategory(category.id)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900">
                            {category.name}
                          </span>
                          {isCategorySelected(category.id) && (
                            <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center">
                              <FaCheck className="text-indigo-600 text-xs" />
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-12 flex justify-between">
              {step > 1 && (
                <motion.button
                  onClick={handlePrevStep}
                  whileHover={{ x: -4 }}
                  className="flex items-center text-gray-600 hover:text-gray-900 font-medium"
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
              ) : (
                <motion.button
                  onClick={handlePlayClick}
                  disabled={selectedCategories.size === 0}
                  className={`ml-auto flex items-center px-6 py-3 rounded-xl font-medium text-white ${
                    selectedCategories.size > 0
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                  whileHover={selectedCategories.size > 0 ? { scale: 1.03 } : {}}
                  whileTap={selectedCategories.size > 0 ? { scale: 0.98 } : {}}
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
