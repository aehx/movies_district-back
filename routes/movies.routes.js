const router = require("express").Router();
const {
  getAllMoviesByGenre,
  getTrailer,
  getMoviesByPage,
  inputSearchMovie,
} = require("../controllers/movies.controllers");

router.get("/inputSearch/:searchMovie/:page", inputSearchMovie);
router.get("/trailer/:id", getTrailer);
router.get("/:category", getAllMoviesByGenre);
router.get("/:category/:page", getMoviesByPage);

module.exports = router;
