const router = require("express").Router();
const usersRoute = require("./users.routes");
const moviesRoute = require("./movies.routes");
const authRoute = require("./auth.routes");

router.use("/users", usersRoute);
router.use("/movies", moviesRoute);
router.use("/auth", authRoute);

module.exports = router;
