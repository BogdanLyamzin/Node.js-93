import {useState, useEffect} from "react";

import { fetchAllMovies } from "../../api/movies-api";

const MoviesList = ()=> {
    const [movies, setMovies] = useState([]);

    useEffect(()=> {
        const fetchMovies = async()=> {
            try {
                const data = await fetchAllMovies();
                setMovies(data);
            }
            catch(error) {
                console.log(error.message);
            }
        }

        fetchMovies();
    }, []);

    const elements = movies.map(({id, title, director}) => <li key={id}>Title: {title}. Director: {director}.</li>);

    return (
        <ul>
            {elements}
        </ul>
    )
}

export default MoviesList;