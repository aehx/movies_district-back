const User = require("../database/models/user.model");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
const { findUserPerEmail } = require("../queries/user.queries");

exports.signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await findUserPerEmail(email);
    if (user) {
      const match = await user.comparePassword(password);
      if (match) {
        const token = req.login(user);
        res.json({
          username: user.username,
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
        });
        res.end();
      } else {
        res.json({ error: "wrong password" });
      }
    } else {
      res.json({ error: "User not found" });
    }
  } catch (e) {
    next(e);
  }
};

exports.refreshToken = (req, res, next) => {
  const refreshToken = req.body.token;
  // if (!refreshToken) return res.status(401).json("You are not authenticated");
  // if (!checkIfRefreshTokenArrayIncludeRefreshToken(refreshToken)) {
  //   return res.status(403).json("refresh token is not valid");
  // }
  console.log(refreshToken);
  jwt.verify(refreshToken, secret, (err, user) => {
    err && console.log(err);
    //   // filterRefreshToken(refreshToken);
    // const token = login(user);
    // console.log(token);
    res.status(200).json("e");
  });
};
