import { Nav } from "./Nav";
import { DataContext } from "../app/DataProvider";
import { useContext, useEffect, useState } from "react";
export const Game = () => {
  const [questions, setQuestions] = useState([]);
  const { data } = useContext(DataContext);

  useEffect(() => {
    if (data !== null) {
         const transformData = data.map((item) => ({
           difficulty: item.difficulty,
           question: item.question.text,
           answer: item.correctAnswer,
           wrongAnswers: item.incorrectAnswers,
         }));
         setQuestions(transformData);
    } else {
        const errorData = {
            difficulty: "Unable to contact server."
        }
        setQuestions(errorData);
    }
   
  }, [data]);

  return (
    <div>
      <div className="nav">
        <Nav />
      </div>

      <div className="body flex flex-col justify-center items-center min-h-[60vh]">
        
        {questions.map((item, id) => (
          <div key={id} className="">
            <p className="font-Outfit text-3xl font-semibold"> {item.question}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
