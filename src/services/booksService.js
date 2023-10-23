import axios from "axios";
import endPoints from "./endPoints";

export const getBooks = async() =>{
    try {
        const {data} = await axios.get(endPoints.library);
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}