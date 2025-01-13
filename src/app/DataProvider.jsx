import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const DataContext = createContext();

export const DataProvider = ({children}) => {
    const [data, setData] = useState(null);
    const category = ``
    useEffect(() => {
        axios
          .get(`https://the-trivia-api.com/v2/questions?${category}`)
          .then((response) => setData(response.data))
          .catch((error) => console.log("there has been an error: ", error));
    }, [])

    

    return (
       <DataContext.Provider value={data}>
            {children}
       </DataContext.Provider>
    )
}