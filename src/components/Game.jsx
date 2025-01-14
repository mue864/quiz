import { Nav } from "./Nav"
import { DataContext } from "../app/DataProvider"
import { useContext } from "react"
export const Game = () => {
    
    const {data} = useContext(DataContext);
    return (
        <div>
            <Nav />

            {console.log(data)}
        </div>
    )
}