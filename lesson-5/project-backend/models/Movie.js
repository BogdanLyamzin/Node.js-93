import {Schema, model} from "mongoose";

import { genreList, releaseYearRegexp } from "../constants/movie-constants.js";

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    director: {
        type: String,
        required: true,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    genre: {
        type: String,
        enum: genreList,
        required: true,
    },
    releaseYear: {
       type: String,
       match: releaseYearRegexp,
       required: true, 
    }
}, {versionKey: false, timestamps: true})

const Movie = model("movie", movieSchema);
// category => categories
// mouse => mice

export default Movie;