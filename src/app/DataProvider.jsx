import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const DataContext = createContext();

export const DataProvider = ({children}) => {
    const [data, setData] = useState(null);
    const [difficulty, setDifficulty] = useState('');
    const [category, setCategory] = useState('');
    useEffect(() => {
        axios
          .get(`https://the-trivia-api.com/v2/questions?categories=${category}`)
          .then((response) => {
            // filtering data based on selected difficulty
            const filterData = response.data.filter(
                (item) => item.difficulty === difficulty
            )
            setData(filterData)
          })
          .catch((error) => console.log("there has been an error: ", error));
    }, [category, difficulty])

    const addCategories = (selected) => {
        console.log(selected)
        setCategory(selected);
    }

    const addDifficulty = (level) => {
        setDifficulty(level)
        console.log("difficulty: ", level)
    }
    return (
       <DataContext.Provider value={{data, addCategories, addDifficulty}}>
            {children}
       </DataContext.Provider>
    )
}