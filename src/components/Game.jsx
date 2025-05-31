import { DataContext } from "../app/DataProvider";
import { useContext, useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheck, FaTimes, FaArrowRight, FaTrophy, FaClock, FaInfoCircle, FaRedo } from "react-icons/fa";
import { Hint } from "./Hint";
import { Timer } from "./Timer";

export const Game = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [timeUp, setTimeUp] = useState(false);
  const [hintsUsed, setHintsUsed] = useState({});
  const [userName, setUserName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const [scoreSaved, setScoreSaved] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30); // 30 seconds per question
  const timerRef = useRef(null);
  
  const { data, loading, error, saveScore } = useContext(DataContext);

  const getRandomColor = useCallback(() => {
    const colors = [
      "bg-[#6AA558]", // green
      "bg-[#FA2D2D]", // red
      "bg-[#4765EA]", // blue
      "bg-[#F66F99]", // pink
      "bg-[#9333EA]", // purple
      "bg-[#EAB308]", // yellow
      "bg-[#15803D]", // dark green
      "bg-[#0369A1]", // sky blue
      "bg-[#EA580C]", // orange
      "bg-[#7C3AED]", // violet
      "bg-[#059669]", // emerald
      "bg-[#DC2626]", // bright red
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }, []);

  useEffect(() => {
    if (data) {
      const transformData = data.map((item) => ({
        difficulty: item.difficulty,
        category: item.category,
        question: item.question.text,
        correctAnswer: item.correctAnswer,
        incorrectAnswers: item.incorrectAnswers,
        type: item.type,
        answers: [
          {
            text: item.correctAnswer,
            color: getRandomColor(),
            isCorrect: true,
          },
          ...item.incorrectAnswers.map((answer) => ({
            text: answer,
            color: getRandomColor(),
            isCorrect: false,
          })),
        ].sort(() => Math.random() - 0.5),
      }));
      setQuestions(transformData);
    }
  }, [data, getRandomColor]);
  
  // Handle time up event - this is called when the timer reaches zero
  const handleTimeUp = useCallback(() => {
    // Mark question as wrong when time runs out
    if (answeredQuestions[currentQuestionIndex] === undefined) {
      setAnsweredQuestions(prev => ({
        ...prev,
        [currentQuestionIndex]: false
      }));
      
      // Reduce score for timing out
      setScore(prev => Math.max(prev - 1, 0));
    }
  }, [answeredQuestions, currentQuestionIndex]);

  // Define startTimer function before using it in useEffect
  const startTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    setTimeRemaining(30); // Reset timer to 30 seconds
    
    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          setTimeUp(true);
          handleTimeUp(); // Call handleTimeUp when time is up
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [handleTimeUp]);

  // Separate effect for timer to avoid circular dependencies
  useEffect(() => {
    if (questions.length > 0) {
      // Start the timer when questions are loaded
      startTimer();
      
      // Cleanup timer on unmount
      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [questions, startTimer]); // startTimer is now properly defined

  const handleAnswerClick = (isCorrect, questionIndex, answerIndex) => {
    if (!answeredQuestions[questionIndex] && !timeUp) {
      // Clear the timer when an answer is selected
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      setAnsweredQuestions((prev) => ({
        ...prev,
        [questionIndex]: isCorrect,
      }));

      setSelectedAnswers((prev) => ({
        ...prev,
        [questionIndex]: answerIndex,
      }));

      // Calculate score based on difficulty and time remaining
      const currentQuestion = questions[questionIndex];
      const difficultyMultiplier = {
        easy: 1,
        medium: 1.5,
        hard: 2
      }[currentQuestion.difficulty] || 1;
      
      // Reduce score if hints were used
      const hintPenalty = hintsUsed[questionIndex] ? hintsUsed[questionIndex] * 1 : 0;
      
      // Time bonus: more points for faster answers
      const timeBonus = Math.floor(timeRemaining / 5);
      
      if (isCorrect) {
        const pointsEarned = Math.max(5 * difficultyMultiplier + timeBonus - hintPenalty, 1);
        setScore((prev) => prev + pointsEarned);
      } else {
        setScore((prev) => Math.max(prev - 2, 0)); // Prevent negative scores
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setTimeUp(false);
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimeRemaining(30); // Reset timer for next question
      
      // Start the timer for the next question
      startTimer();
    } else {
      // This was the last question
      setGameCompleted(true);
      setShowNameInput(true);
      
      // If it's the last question and the user clicks 'See Results',
      // we'll show the score saving UI first, then they can navigate to scores
    }
  };
  
  const handleUseHint = () => {
    setHintsUsed(prev => ({
      ...prev,
      [currentQuestionIndex]: (prev[currentQuestionIndex] || 0) + 1
    }));
  };
  

  
  const handleSaveScore = () => {
    if (userName.trim()) {
      // Get the category and difficulty from the first question
      const categoryName = questions.length > 0 ? questions[0].category : 'General';
      const difficultyLevel = questions.length > 0 ? questions[0].difficulty : 'medium';
      
      // Save to local storage via context
      saveScore(userName, score, categoryName, difficultyLevel);
      
      // Hide the name input and show a success message
      setShowNameInput(false);
      
      // Show a message that the score was saved
      setScoreSaved(true);
    }
  };

  // Game state management functions

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <div className="inline-block h-12 w-12 border-4 border-t-4 border-t-indigo-500 border-indigo-200 rounded-full animate-spin mb-4"></div>
            <p className="text-xl font-medium">Loading questions...</p>
          </div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center bg-white/10 backdrop-blur-md p-8 rounded-xl max-w-md">
            <FaInfoCircle className="text-red-400 text-4xl mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong</h2>
            <p className="text-gray-300 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      ) : Array.isArray(questions) && questions.length > 0 ? (
        <div className="container mx-auto px-4 py-8">
          {/* Header with progress and score */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div className="flex flex-wrap items-center gap-2 md:space-x-4 mb-4 md:mb-0">
              <h2 className="text-xl md:text-2xl font-bold w-full md:w-auto">Question {currentQuestionIndex + 1}</h2>
              {!answeredQuestions[currentQuestionIndex] && !timeUp && (
                <Hint 
                  questionData={currentQuestion} 
                  hintsUsed={hintsUsed[currentQuestionIndex] || 0}
                  onUseHint={handleUseHint}
                />
              )}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <div className="bg-white/10 backdrop-blur-md rounded-full w-12 h-12 sm:w-12 sm:h-12 flex items-center justify-center">
                <span className="text-lg sm:text-xl font-bold">{currentQuestionIndex + 1}/{questions.length}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-3 py-1 sm:px-4 sm:py-2 rounded-full">
                <span className="text-xs sm:text-sm text-gray-300">Score: </span>
                <span className="font-bold text-yellow-400">{score}</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <Timer timeRemaining={timeRemaining} timeUp={timeUp || !!answeredQuestions[currentQuestionIndex]} />
              <div className="bg-white/10 backdrop-blur-md px-3 py-1 sm:px-4 sm:py-2 rounded-full">
                <span className="text-xs sm:text-sm text-gray-300">Difficulty: </span>
                <span className="font-bold capitalize text-sm">{currentQuestion?.difficulty}</span>
              </div>
            </div>
          </div>

          {/* Question and Answers */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl mx-auto"
            >
              {!gameCompleted && !timeUp ? (
                <>
                  <motion.h2 
                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8 md:mb-12 leading-tight px-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    dangerouslySetInnerHTML={{ __html: currentQuestion?.question }}
                  >
                  </motion.h2>

                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-12"
                    variants={{
                      hidden: { opacity: 0 },
                      show: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.1,
                          delayChildren: 0.2
                        }
                      }
                    }}
                    initial="hidden"
                    animate="show"
                  >
                    {currentQuestion?.answers.map((item, i) => {
                      const isSelected = selectedAnswers[currentQuestionIndex] === i;
                      const isCorrect = item.isCorrect;
                      const hasAnswered = answeredQuestions[currentQuestionIndex] !== undefined;
                      const showFeedback = hasAnswered;
                      
                      // Determine button styling based on answer state
                      let buttonStyle = "relative p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl text-left transition-all duration-300 transform ";
                      
                      if (hasAnswered) {
                        if (isCorrect) {
                          // Highlight correct answer in green
                          buttonStyle += "bg-green-600/80 border-2 border-green-400";
                        } else if (isSelected) {
                          // Highlight selected wrong answer in red
                          buttonStyle += "bg-red-600/80 border-2 border-red-400";
                        } else {
                          // Dim other answers
                          buttonStyle += "bg-white/10 border-2 border-transparent opacity-60";
                        }
                      } else {
                        // Normal state for unanswered questions
                        buttonStyle += "bg-white/10 hover:bg-white/20 border-2 border-transparent hover:border-white/30 hover:scale-105";
                      }
                      
                      return (
                        <motion.button
                          key={i}
                          variants={{
                            hidden: { opacity: 0, y: 20 },
                            show: { opacity: 1, y: 0 }
                          }}
                          disabled={hasAnswered}
                          className={buttonStyle}
                          whileHover={!hasAnswered ? { scale: 1.02 } : {}}
                          whileTap={!hasAnswered ? { scale: 0.98 } : {}}
                          onClick={() => {
                            if (!hasAnswered) {
                              handleAnswerClick(
                                item.isCorrect, 
                                currentQuestionIndex,
                                i
                              );
                            }
                          }}
                        >
                          <div className="flex items-center">
                            {showFeedback && (
                              <div className="mr-4">
                                {isCorrect ? (
                                  <FaCheck className="text-green-300 text-xl" />
                                ) : isSelected ? (
                                  <FaTimes className="text-red-300 text-xl" />
                                ) : null}
                              </div>
                            )}
                            <span className="text-sm sm:text-base md:text-lg font-medium">{item.text}</span>
                          </div>
                        </motion.button>
                      );
                    })}
                  </motion.div>

                  {answeredQuestions[currentQuestionIndex] !== undefined && (
                    <motion.div 
                      className="text-center mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <motion.button
                        onClick={handleNextQuestion}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-5 sm:px-6 md:px-8 py-3 sm:py-3 md:py-4 rounded-full font-medium text-base sm:text-lg transition-all duration-300 transform hover:scale-105"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>{isLastQuestion ? 'See Results' : 'Next Question'}</span>
                        <FaArrowRight className="text-sm sm:text-base" />
                      </motion.button>
                    </motion.div>
                  )}
                </>
              ) : (
                <motion.div 
                  className="text-center py-6 sm:py-8 md:py-12 px-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
                    <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-yellow-500/20 mb-4 sm:mb-6">
                      {timeUp ? (
                        <FaClock className="text-yellow-400 text-2xl sm:text-3xl" />
                      ) : (
                        <FaTrophy className="text-yellow-400 text-2xl sm:text-3xl" />
                      )}
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
                      {gameCompleted ? 'Quiz Completed!' : timeUp ? 'Time\'s Up!' : 'Question Completed!'}
                    </h3>
                    
                    {showNameInput ? (
                      <div className="mb-6">
                        <p className="text-base sm:text-lg text-gray-300 mb-3 sm:mb-4">
                          Congratulations! You scored {score} points!
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:space-x-2">
                          <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="Enter your name"
                            className="w-full sm:w-auto px-3 sm:px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                          <button
                            onClick={handleSaveScore}
                            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg font-medium transition-colors"
                          >
                            Save Score
                          </button>
                        </div>
                      </div>
                    ) : scoreSaved ? (
                      <div className="mb-6">
                        <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 mb-6 text-center">
                          <p className="text-green-300 font-medium">Score saved successfully!</p>
                        </div>
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/10 rounded-xl p-6">
                            <div>
                              <h4 className="text-gray-400 text-sm mb-1">Player</h4>
                              <p className="text-xl font-bold">{userName}</p>
                            </div>
                            <div>
                              <h4 className="text-gray-400 text-sm mb-1">Score</h4>
                              <p className="text-xl font-bold text-yellow-400">{score} points</p>
                            </div>
                            <div>
                              <h4 className="text-gray-400 text-sm mb-1">Category</h4>
                              <p className="text-lg">{questions[0]?.category || 'General'}</p>
                            </div>
                            <div>
                              <h4 className="text-gray-400 text-sm mb-1">Difficulty</h4>
                              <p className="text-lg capitalize">{questions[0]?.difficulty || 'medium'}</p>
                            </div>
                          </div>
                          
                          <div className="flex justify-center space-x-4">
                            <button
                              onClick={() => navigate('/scores')}
                              className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                            >
                              <FaTrophy /> View Highscores
                            </button>
                            <button
                              onClick={() => window.location.reload()}
                              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                            >
                              <FaRedo /> Play Again
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="mb-6">
                        <p className="text-xl text-gray-300 mb-4">
                          You scored {score} points!
                        </p>
                        <div className="flex justify-center space-x-4">
                          <button
                            onClick={() => navigate('/')}
                            className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-medium transition-colors"
                          >
                            Back to Home
                          </button>
                          <button
                            onClick={() => window.location.reload()}
                            className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-medium transition-colors"
                          >
                            Play Again
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center bg-white/10 backdrop-blur-md p-8 rounded-xl max-w-md">
            <h2 className="text-2xl font-bold mb-4">No Questions Available</h2>
            <p className="text-gray-300 mb-6">Please go back and select different categories or difficulty levels.</p>
            <button 
              onClick={() => window.location.href = '/onboard'}
              className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Back to Selection
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
