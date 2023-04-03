const { body, validationResult } = require("express-validator");

exports.checkSignupFields = [
  body("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email adress"),
  body("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("username").trim().not().isEmpty().withMessage("Username is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.fieldError = { errors: errors.array() };
    }
    next();
  },
];

exports.checkLoginFields = [
  body("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email adress"),
  body("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.fieldError = { errors: errors.array() };
    }
    next();
  },
];
