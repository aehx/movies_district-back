const router = require("express").Router();
const {
  getAllMovies,
  getTrailer,
  getMoviesByPage,
  inputSearchMovie,
} = require("../controllers/movies.controllers");

router.get("/inputSearch/:searchMovie/:page", inputSearchMovie);
router.get("/trailer/:id", getTrailer);
router.get("/:category/:page", getMoviesByPage);
router.get("/all", getAllMovies);

module.exports = router;
