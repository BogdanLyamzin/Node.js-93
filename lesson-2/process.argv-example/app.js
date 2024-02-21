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

const actionIndex = process.argv.indexOf("--action");
if(actionIndex !== -1) {
    const action = process.argv[actionIndex + 1];
    invokeAction({action})
}