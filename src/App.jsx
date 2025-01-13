import {Routes, Route} from "react-router-dom";
import { Landing } from "./components/Landing";
import { OnboardingPage} from "./components/OnboardingPage"
import './index.css'
import { Game } from "./components/Game";
import { Highscores } from "./components/Highscores";


function App() {

  return (
    <>
      <Routes>
          <Route path={'/'} element={<Landing/>} />
          <Route path={'/onboard'} element={<OnboardingPage />} />
          <Route path={'/game'} element={<Game />} />
          <Route path={'/scores'} element={<Highscores />} />
      </Routes>
    </>
  )
}

export default App
