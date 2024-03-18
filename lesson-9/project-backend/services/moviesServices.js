import Movie from "../models/Movie.js";

export const getAllMovies = (filter = {}, query = {}) => Movie.find(filter, "-createdAt -updatedAt", query).populate("type", "name");

export const getMovieById = id => Movie.findById(id);

export const getOneMovie = filter => Movie.findOne(filter);

export const addMovie = data => Movie.create(data);

export const updateMovieById = (id, data) => Movie.findByIdAndUpdate(id, data);

export const updateOneMovie = (filter, data) => Movie.findOneAndUpdate(filter, data);

export const deleteMovieById = id => Movie.findByIdAndDelete(id);

export const deleteOneMovie = filter => Movie.findOneAndDelete(filter);