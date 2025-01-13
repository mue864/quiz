import { createContext } from "react";

export const DifficultyContext = createContext();

export const DifficultyProvider = ({children}) => {
    const difficulty = {
        easy: 'easy',
        medium: 'medium',
        hard: 'hard'
    }

    return (
        <DifficultyContext.Provider value={difficulty}>
            {children}
        </DifficultyContext.Provider>
    )
}