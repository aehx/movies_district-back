const router = require("express").Router();
const { signin, refreshToken } = require("../controllers/auth.controllers");
const { fieldsValidationLogin } = require("../middleware/login.middleware");

router.post("/", fieldsValidationLogin, signin);
router.post("/refreshToken", refreshToken);

module.exports = router;
