import { Nav } from "./Nav";
import { DataContext } from "../app/DataProvider";
import { useContext, useEffect, useState } from "react";
export const Game = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answerCorrect, setAnswerCorrect] = useState(false);
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

  const checkResult = (result) => {
    setAnswerCorrect(result);
  }

useEffect(() => {
  if (data) {
    const transformData = data.map((item) => ({
      difficulty: item.difficulty,
      question: item.question.text,
      answers: [
        { text: item.correctAnswer, color: getRandomColor(), isCorrect: true },
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


  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }

  return (
    <div>
      {Array.isArray(questions) && questions.length > 0 ? (
        <div>
          <div className="nav">
            {questions[currentQuestionIndex] && (
              <Nav difficulty={questions[currentQuestionIndex].difficulty} />
            )}
          </div>
          <div className="body flex flex-col justify-center items-center min-h-[90vh]">
            <p className="font-Outfit text-3xl font-semibold max-w-3xl text-center">
              {questions[currentQuestionIndex].question}
            </p>

            <div className="mt-8 flex flex-col">
              {questions[currentQuestionIndex]?.answers.map((item, i) => (
                <button
                  key={i}
                  className={`${item.color} w-72  mb-3 py-3 font-Outfit text-white text-center border border-white rounded-2xl menu-btn`}
                  onClick={() => checkResult(item.isCorrect)}
                >
                  {answerCorrect ? "true" : "false"}
                  {item.text}
                </button>
              ))}
            </div>

            <button
              onClick={handleNextQuestion}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            >
              Next Question
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center text-center min-h-[60vh]">
          <div>Loading questions...</div>
        </div>
      )}
    </div>
  );
};
