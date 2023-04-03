const router = require("express").Router();
const {
  signin,
  logout,
  verifyToken,
  signup,
} = require("../controllers/auth.controllers");
const {
  checkLoginFields,
  checkSignupFields,
} = require("../middleware/checkfields.middleware");

router.post("/", checkLoginFields, signin);
router.post("/signup", checkSignupFields, signup);
router.post("/logout", verifyToken, logout);

module.exports = router;
