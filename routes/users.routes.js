const { logout, signup } = require("../controllers/user.controller");
const { fieldsValidationSignup } = require("../middleware/login.middleware");
const router = require("express").Router();

// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.post("/", fieldsValidationSignup, signup);
router.post("/logout", logout);

module.exports = router;
