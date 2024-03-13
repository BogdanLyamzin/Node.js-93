import {Schema, model} from "mongoose";

import {handleSaveError, setUpdateSettings} from "./hooks.js";

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
    type: {
        type: Schema.Types.ObjectId,
        ref: "type",
        required: true,
    },
    releaseYear: {
       type: String,
       match: releaseYearRegexp,
       required: true, 
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }
}, {versionKey: false, timestamps: true});

movieSchema.post("save", handleSaveError);

movieSchema.pre("findOneAndUpdate", setUpdateSettings);

movieSchema.post("findOneAndUpdate", handleSaveError);

const Movie = model("movie", movieSchema);

export default Movie;