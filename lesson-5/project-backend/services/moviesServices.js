import Movie from "../models/Movie.js";

export const getAllMovies = ()=> Movie.find();

export const addMovie = data => Movie.create(data);