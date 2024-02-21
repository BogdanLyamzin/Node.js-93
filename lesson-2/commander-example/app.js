import {program} from "commander";

import * as moviesService from "./movies/index.js";

const invokeAction = async ({action, id, ...data})=> {
    switch(action) {
        case "list":
            const allMovies = await moviesService.getAllMovies();
            return console.log(allMovies);
        case "getById":
            const oneMovie = await moviesService.getMovieById(id);
            return console.log(oneMovie);
        case "add": 
            const newMovie = await moviesService.addMovie(data);
            return console.log(newMovie);
        case "updateById":
            const updateMovie = await moviesService.updateMovieById(id, data);
            return console.log(updateMovie);
        case "deleteById":
            const deleteMovie = await moviesService.deleteMovieById(id);
            return console.log(deleteMovie);
    }
}

program
    .option("-a, --action <type>")
    .option("-i, --id <type>")
    .option("-t, --title <type>")
    .option("-d, --director <type>");

program.parse();

const options = program.opts();
invokeAction(options);
