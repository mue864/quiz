import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLightbulb, FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';

export const Hint = ({ questionData, hintsUsed, onUseHint }) => {
  const [showHint, setShowHint] = useState(false);
  
  // Generate hints based on question data
  const generateHint = () => {
    if (!questionData) return '';
    
    const { correctAnswer, incorrectAnswers, category } = questionData;
    
    // Different types of hints
    const hints = [
      // Hint 1: Category-based hint
      `This question is from the ${category} category.`,
      
      // Hint 2: First letter hint
      `The answer starts with the letter "${correctAnswer.charAt(0).toUpperCase()}".`,
      
      // Hint 3: Length hint
      `The answer contains ${correctAnswer.length} characters.`,
      
      // Hint 4: Elimination hint (for multiple choice)
      `One of these is definitely wrong: ${incorrectAnswers[0]}.`,
    ];
    
    // Return appropriate hint based on how many have been used
    return hints[Math.min(hintsUsed, hints.length - 1)];
  };

  const handleUseHint = () => {
    if (!showHint) {
      onUseHint(); // Notify parent component that hint was used (may affect score)
      setShowHint(true);
    }
  };
  
  return (
    <div className="relative">
      <motion.button
        onClick={handleUseHint}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${showHint ? 'bg-yellow-600 text-white' : 'bg-yellow-100 text-yellow-800'}`}
        disabled={showHint}
      >
        <FaLightbulb className="text-xs" />
        <span>Use Hint</span>
      </motion.button>
      
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 left-0 sm:left-auto sm:right-0 w-60 sm:w-64 bg-yellow-50 border border-yellow-200 p-3 rounded-lg shadow-lg z-10"
          >
            <button 
              onClick={() => setShowHint(false)}
              className="absolute top-2 right-2 text-yellow-500 hover:text-yellow-700"
            >
              <FaTimes size={12} />
            </button>
            <div className="flex items-start">
              <div className="mr-2 flex-shrink-0">
                <FaLightbulb className="text-yellow-500 text-sm" />
              </div>
              <p className="text-yellow-800 text-xs sm:text-sm mb-2">
                <span className="font-bold">Hint {hintsUsed + 1}:</span> {generateHint()}
              </p>
            </div>
            <div className="mt-2 text-xs text-yellow-600 italic text-center">
              Note: Using hints reduces your potential score.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

Hint.propTypes = {
  questionData: PropTypes.shape({
    correctAnswer: PropTypes.string.isRequired,
    incorrectAnswers: PropTypes.arrayOf(PropTypes.string).isRequired,
    category: PropTypes.string.isRequired,
  }),
  hintsUsed: PropTypes.number.isRequired,
  onUseHint: PropTypes.func.isRequired
};

Hint.defaultProps = {
  hintsUsed: 0
};
