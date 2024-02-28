import axios from "axios";

const moviesInstance = axios.create({
    baseURL: "http://localhost:3000/api/movies"
})

export const fetchAllMovies = async ()=> {
    const {data} = await moviesInstance.get("/");
    return data;
}