import {Route, Router, useNavigate} from "react-router-dom";
import logo from "../assets/img/logo.svg"
import brain from '../assets/img/brain.svg'
import idea from "../assets/img/idea.svg"
import '../index.css'
export const Landing = () => {
    const navigate = useNavigate();
    const handlePlayGameClick =() => {
        setTimeout(() => {
            navigate('/onboard')
        }, 500);
    }
    const handleScoreClick =() => {
        setTimeout(() => {
            navigate('/scores')
        }, 500);
    }
    return (
      <>
        <div className="flex justify-center items-center min-h-[20vh]">
          <div className="font-OCR flex justify-center items-center text-5xl">
            <img src={logo} 
            alt="logo" 
            className="w-20"/>
            Trivia
          </div>
        </div>

        <div className="flex justify-center items-center min-h-[80vh] relative">
            <img src={idea}
             alt="bulb"
             className="w-40 absolute left-[80%] top-[50%] -z-10" />
            <img src={brain}
             alt="bulb"
             className="w-52 absolute left-[30%] top-[50%] -z-30" />
          <div className="flex flex-col items-center space-y-3">
            <button 
            onClick={handlePlayGameClick}
            className="px-20 py-3 text-white font-bold bg-[#6F87F6] border border-white rounded-2xl menu-btn">
              Play Game
            </button>
            <button 
            onClick={handleScoreClick}
            className="px-20 py-3 text-white font-bold bg-[#6AA558] border border-white rounded-2xl menu-btn">
              High Scores
            </button>

            <p className="text-red-900 text-lg">* Please Note, this is still under maintanance and is not working properly</p>
          </div>
        </div>
      </>
    );
}