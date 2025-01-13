import { createContext } from "react";

export const CategoryContext = createContext();

export const CategoryProvider = ({children}) => {


    return (
        <CategoryContext.Provider>
            {children}
        </CategoryContext.Provider>
    )
}