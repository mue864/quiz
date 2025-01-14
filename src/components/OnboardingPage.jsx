import brain from "../assets/img/brain.svg";
import { useContext, useState } from "react";
import { DataContext } from "../app/DataProvider";
import { useNavigate } from "react-router-dom";

export const OnboardingPage = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(new Set());
  const [data, setData] = useState('');


  const { addCategories, addDifficulty } = useContext(DataContext);
  const navigate = useNavigate();

  const handlePlayClick = () => {
    try {
      addCategories(data);
      addDifficulty(selectedDifficulty);
      navigate('/game');
    } catch(error) {
      console.error("Nav error: ", error);
    }
  }

  const difficultySelection = (difficulty) => {

    setSelectedDifficulty(difficulty);
  };

  const handleSelectedCategory = (category) => {
    setSelectedCategory((prevCategory) => {
      const newCatogory = new Set(prevCategory);

      if (newCatogory.has(category)) {
        newCatogory.delete(category);
      } else {
        newCatogory.add(category);
      }

      console.log(newCatogory);
      const convertedString = Array.from(newCatogory).join(",");
      setData(convertedString)
      return newCatogory;
    });
  };


  const addSelectedStyle = (difficulty) => {
    return selectedDifficulty === difficulty ? "bg-red-700" : "bg-gray-500";
  };

  return (
    <div className="relative">
      <div className="flex flex-col justify-center items-center min-h-[20vh]">
        <div className="flex flex-col items-center justify-center ">
          <div className="font-OCR text-4xl">Trivia</div>
          <div className="pt-4 font-Outfit text-lg">Choose:</div>
        </div>
      </div>

      <div>
        <div className="flex min-h-[65vh] justify-center pt-10">
          <img
            src={brain}
            alt="brain"
            className="-z-50 w-96 top-[20%] left-[35%] absolute brain"
          />

          <div className="flex flex-col w-1/2 items-center ">
            <div className="font-Outfit text-center text-gray-600">
              Difficulty
            </div>
            <hr className="pb-5 mt-3 w-60" />
            <button
              onClick={() => difficultySelection("easy")}
              className={` w-[18rem] py-3 text-center text-white font-bold font-Outfit border border-white menu-btn rounded-2xl 
              ${addSelectedStyle("easy")}`}
            >
              Easy
            </button>
            <button
              onClick={() => difficultySelection("medium")}
              className={` mt-2 w-[18rem] py-3 text-center text-white font-bold font-Outfit border border-white menu-btn rounded-2xl
                ${addSelectedStyle("medium")}`}
            >
              Medium
            </button>
            <button
              onClick={() => difficultySelection("hard")}
              className={`bg-[#FA2D2D] mt-2 w-[18rem] py-3 text-center text-white font-bold font-Outfit border border-white menu-btn rounded-2xl 
            ${addSelectedStyle("hard")}`}
            >
              Hard
            </button>
            <hr className="mt-5 pb-3 w-60" />
            <div className="font-Outfit max-w-64 text-gray-600">
              * the difficulty is dynamic. If you get good at easy, it will tone
              up and vice versa
            </div>
          </div>

          <div className="flex flex-col w-1/2  items-center">
            <div className="font-Outfit text-center text-gray-600">
              Category
            </div>
            <hr className="mt-2 pb-3 w-96" />
            <div className="flex flex-row space-x-4">
              {/* first row */}
              {[
                { name: "Music", color: "bg-[#F6A96F]" },
                { name: "Film", color: "bg-[#6F87F6]" },
                { name: "Sport", color: "bg-[#BB1FEF]" },
              ].map((category) => (
                <button
                  key={category.name}
                  onClick={() => handleSelectedCategory(category.name)}
                  className={`${
                    selectedCategory.has(category.name)
                      ? "bg-red-700"
                      : category.color
                  } mt-2 w-[8rem] py-3 text-center text-white font-bold font-Outfit border border-white menu-btn rounded-2xl`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            <div className="flex flex-row space-x-4">
              {/* second row */}
              {[
                { name: "Arts", color: "bg-[#F66F99]" },
                { name: "History", color: "bg-[#6FF6C4]" },
                { name: "Culture", color: "bg-[#7AAA48]" },
              ].map((category) => (
                <button
                  key={category.name}
                  onClick={() => handleSelectedCategory(category.name)}
                  className={`${
                    selectedCategory.has(category.name)
                      ? "bg-red-700"
                      : category.color
                  } mt-2 w-[8rem] py-3 text-center text-white font-bold font-Outfit border border-white menu-btn rounded-2xl`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            <div className="flex flex-row space-x-4">
              {/* third row */}

              {[
                { name: "Science", color: "bg-[#F29F87]" },
                { name: "General", color: "bg-[#F66F99]" },
                { name: "Geography", color: "bg-[#09154B]" },
              ].map((category) => (
                <button
                  key={category.name}
                  onClick={() => handleSelectedCategory(category.name)}
                  className={`${
                    selectedCategory.has(category.name)
                      ? "bg-red-700"
                      : category.color
                  } mt-2 w-[8rem] py-3 text-center text-white font-bold font-Outfit border border-white menu-btn rounded-2xl`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            <hr className="mt-5 pb-3 w-96" />
            <div className="font-Outfit text-gray-600">
              * you can choose more than 1 category
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <div className="flex justify-center items-center">
          <button
            onClick={handlePlayClick}
            className="w-60 bg-[#6F87F6] py-3 rounded-full menu-btn text-white font-JoseFin text-xl"
          >
            Play
          </button>
        </div>
      </div>
    </div>
  );
};
