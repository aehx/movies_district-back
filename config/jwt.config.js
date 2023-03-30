const secret = process.env.SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;
const { app } = require("../app");
const jwt = require("jsonwebtoken");
const { findUserPerId } = require("../queries/user.queries");

let refreshedTokens = [];

const createJwtToken = ({ user = null, id = null }) => {
  const jwtToken = jwt.sign(
    {
      sub: id || user._id.toString(),
    },
    secret,
    { expiresIn: "5s" }
  );
  return jwtToken;
};

const createRefreshToken = ({ user = null, id = null }) => {
  const jwtToken = jwt.sign(
    {
      sub: id || user._id.toString(),
    },
    REFRESH_SECRET
  );
  return jwtToken;
};

exports.refreshedTokens = refreshedTokens;
exports.createJwtToken = createJwtToken;
exports.createRefreshToken = createRefreshToken;

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
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

const addJwtFeatures = (req, res, next) => {
  req.array = () => {
    console.log(refreshedTokens);
  };
  req.login = (user) => {
    const accessToken = createJwtToken({ user });
    const refreshToken = createRefreshToken({ user });
    refreshedTokens.push(refreshToken);
    return { accessToken, refreshToken };
  };
  req.filterRefreshToken = (refreshToken) => {
    return (refreshedTokens = refreshedTokens.filter(
      (token) => token !== refreshToken
    ));
  };

  req.checkIfRefreshTokenArrayIncludeRefreshToken = (refreshToken) => {
    return refreshedTokens.includes(refreshToken);
  };
  next();
};

app.use(addJwtFeatures);
