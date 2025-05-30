import { Nav } from "./Nav";
import { DataContext } from "../app/DataProvider";
import { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheck, FaTimes, FaArrowRight, FaTrophy } from "react-icons/fa";

export const Game = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [endSession, setEndSession] = useState(false);
  const [reset, setReset] = useState(false);
  const { data } = useContext(DataContext);

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

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    if (data) {
      const transformData = data.map((item) => ({
        difficulty: item.difficulty,
        question: item.question.text,
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
  }, [data]);

  const handleAnswerClick = (isCorrect, questionIndex, answerIndex) => {
    if (!answeredQuestions[questionIndex]) {
      setSelectedIndex(answerIndex);

      setAnsweredQuestions((prev) => ({
        ...prev,
        [questionIndex]: isCorrect,
      }));

      setSelectedAnswers((prev) => ({
        ...prev,
        [questionIndex]: answerIndex,
      }));

      if (isCorrect) {
        setScore((prev) => prev + 5);
      } else {
        setScore((prev) => prev - 3);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setEndSession(false);
      setSelectedIndex(null);
      setCurrentQuestionIndex((prev) => prev + 1);
      setReset(true);
    }
  };

  const onEndSession = (endSession) => {
    setEndSession(endSession);
  };

  const onReset = (toggleReset) => {
    setReset(toggleReset);
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
      {Array.isArray(questions) && questions.length > 0 ? (
        <div className="container mx-auto px-4 py-8">
          {/* Header with progress and score */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-4">
              <div className="bg-white/10 backdrop-blur-md rounded-full w-12 h-12 flex items-center justify-center">
                <span className="text-xl font-bold">{currentQuestionIndex + 1}/{questions.length}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
                <span className="text-sm text-gray-300">Score: </span>
                <span className="font-bold text-yellow-400">{score}</span>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
              <span className="text-sm text-gray-300">Difficulty: </span>
              <span className="font-bold capitalize">{currentQuestion?.difficulty}</span>
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
              {!endSession ? (
                <>
                  <motion.h2 
                    className="text-3xl md:text-4xl font-bold text-center mb-12 leading-tight"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {currentQuestion?.question}
                  </motion.h2>

                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12"
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
                      const showFeedback = answeredQuestions[currentQuestionIndex];
                      
                      return (
                        <motion.button
                          key={i}
                          variants={{
                            hidden: { opacity: 0, y: 20 },
                            show: { opacity: 1, y: 0 }
                          }}
                          disabled={answeredQuestions[currentQuestionIndex]}
                          className={`relative p-6 rounded-2xl text-left transition-all duration-300 transform hover:scale-105 ${
                            showFeedback
                              ? isCorrect
                                ? 'bg-green-600/80 border-2 border-green-400'
                                : isSelected
                                ? 'bg-red-600/80 border-2 border-red-400'
                                : 'bg-white/10 border-2 border-transparent'
                              : 'bg-white/10 hover:bg-white/20 border-2 border-transparent hover:border-white/30'
                          }`}
                          onClick={() =>
                            handleAnswerClick(
                              item.isCorrect,
                              currentQuestionIndex,
                              i
                            )
                          }
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
                            <span className="text-lg font-medium">{item.text}</span>
                          </div>
                        </motion.button>
                      );
                    })}
                  </motion.div>

                  {answeredQuestions[currentQuestionIndex] && (
                    <motion.div 
                      className="text-center mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <motion.button
                        onClick={handleNextQuestion}
                        className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 transform hover:scale-105"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>{isLastQuestion ? 'See Results' : 'Next Question'}</span>
                        <FaArrowRight />
                      </motion.button>
                    </motion.div>
                  )}
                </>
              ) : (
                <motion.div 
                  className="text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-2xl mx-auto">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-500/20 mb-6">
                      <FaTrophy className="text-yellow-400 text-3xl" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4">
                      {isLastQuestion ? 'Quiz Completed!' : 'Time\'s Up!'}
                    </h3>
                    <p className="text-lg text-gray-300 mb-8">
                      {isLastQuestion 
                        ? `You scored ${score} out of ${questions.length * 5} points!`
                        : 'You can still continue to the next question.'}
                    </p>
                    <button
                      onClick={handleNextQuestion}
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
                    >
                      <span>{isLastQuestion ? 'View Results' : 'Next Question'}</span>
                      <FaArrowRight />
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <div className="inline-block h-12 w-12 border-4 border-t-4 border-t-indigo-500 border-indigo-200 rounded-full animate-spin mb-4"></div>
            <p className="text-xl font-medium">Loading questions...</p>
          </div>
        </div>
      )}
    </div>
  );
};
