const jwt = require("jsonwebtoken");
const REFRESH_SECRET = process.env.REFRESH_SECRET;
const secret = process.env.SECRET;
const { findUserPerEmail, createUser } = require("../queries/user.queries");

let refreshedTokens = [];

const createJwtToken = (id = null) => {
  const jwtToken = jwt.sign(
    {
      sub: id,
    },
    secret,
    { expiresIn: "1h" }
  );
  return jwtToken;
};

const createRefreshToken = (id = null) => {
  const jwtToken = jwt.sign(
    {
      sub: id,
    },
    REFRESH_SECRET
  );
  return jwtToken;
};

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader.split(" ")[1] !== "undefined") {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, secret, (err, user) => {
      if (err) {
        res.status(403).json("Invalid token");
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    res.status(401).json("you are not authenticated");
  }
};

exports.signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (req.fieldError) {
      const { fieldError } = req;
      res.status(400).json(fieldError);
    } else {
      const user = await findUserPerEmail(email);
      if (user) {
        const match = await user.comparePassword(password);
        if (match) {
          const accessToken = createJwtToken(user._id.toString());
          const refreshToken = createRefreshToken(user._id.toString());
          refreshedTokens.push(refreshToken);
          res.json({
            username: user.username,
            accessToken,
            refreshToken,
            watchList: user.watchList,
          });
        } else {
          res.status(400).json({ matchError: "wrong email or password" });
        }
      } else {
        res.json({ error: "User not found" });
      }
    }
  } catch (e) {
    next(e);
  }
};

exports.signup = async (req, res, next) => {
  const body = req.body;
  try {
    const user = await findUserPerEmail(body.email);
    if (user) {
      res.status(400).json({ error: "user already exist" });
    }
    if (req.fieldError) {
      const { fieldError } = req;
      res.status(400).json(fieldError);
    } else {
      const user = await createUser(body);
      const accessToken = createJwtToken(user._id.toString());
      const refreshToken = createRefreshToken(user._id.toString());
      refreshedTokens.push(refreshToken);
      res.json({
        username: user.username,
        accessToken,
        refreshToken,
        watchList: user.watchList,
      });
    }
  } catch (e) {
    next(e);
  }
};

exports.logout = (req, res) => {
  const refreshToken = req.body.token;
  refreshedTokens = refreshedTokens.filter((token) => token !== refreshToken);
  res.status(200).json("You logged out successfully.");
};
