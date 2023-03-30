const { createUser } = require("../queries/user.queries");

exports.signup = async (req, res, next) => {
  const body = req.body;
  try {
    const user = await createUser(body);
    const token = req.login(user);
    res.json({
      username: user.username,
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
    });
  } catch (e) {
    next(e);
  }
};

exports.logout = (req, res) => {
  const refreshToken = req.body.token;
  req.filterRefreshToken(refreshToken);
  res.status(200).json("You logged out successfully.");
};
