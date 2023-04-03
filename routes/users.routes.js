const { verifyToken } = require("../controllers/auth.controllers");
const {
  addToWatchlist,
  getUserMovies,
} = require("../controllers/user.controller");
const router = require("express").Router();

router.put("/updateWatchlist", verifyToken, addToWatchlist);
router.post("/getUserMovies", verifyToken, getUserMovies);

module.exports = router;
