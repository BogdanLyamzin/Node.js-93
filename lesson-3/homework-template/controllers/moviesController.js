import * as moviesServices from "../services/moviesServices.js"

const getAll = async (req, res)=> {
    const result = await moviesServices.getAllMovies();

    res.json(result);
}

export default {
    getAll,
}