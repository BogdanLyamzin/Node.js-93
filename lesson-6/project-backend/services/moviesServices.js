import Movie from "../models/Movie.js";

export const getAllMovies = ()=> Movie.find({}, "-createdAt -updatedAt").populate("type", "name");

export const getMovieById = id => Movie.findById(id);

export const addMovie = data => Movie.create(data);

export const updateMovieById = (id, data) => Movie.findByIdAndUpdate(id, data);

export const deleteMovieById = id => Movie.findByIdAndDelete(id);