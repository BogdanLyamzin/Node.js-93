const path = require("path");

const path1 = path.join("movies", "movies.json");
// console.log(path1)
// console.log(__dirname);
const moviesAbsolutePath1 = path.join(__dirname, "movies", "movies.json");
// console.log(moviesAbsolutePath1)
const moviesAbsolutePath2 = path.resolve("movies", "movies.json");
console.log(moviesAbsolutePath2);