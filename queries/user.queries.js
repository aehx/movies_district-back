const User = require("../database/models/user.model");

exports.findUserPerEmail = (email) => {
  return User.findOne({ "local.email": email }).exec();
};

exports.createUser = async (user) => {
  try {
    const isUserAlreadyExist = await User.findOne({ username: user.username });
    if (isUserAlreadyExist) {
      return { error: "User already exists" };
    } else {
      const hashedPassword = await User.hashPassword(user.password);
      const newUser = new User({
        username: user.username,
        local: {
          email: user.email,
          password: hashedPassword,
        },
        watchList: [],
      });
      return await newUser.save();
    }
  } catch (e) {
    throw e;
  }
};

exports.addFavoritesMovie = async (username, movieId) => {
  try {
    const userFound = await User.findOne({ username });
    if (!userFound) {
      return { error: "User not found" };
    }
    let updatedUser;
    if (userFound.watchList.includes(movieId)) {
      await User.findOneAndUpdate(
        { username: username },
        { $pull: { watchList: movieId } }
      );
    } else {
      await User.findOneAndUpdate(
        { username: username },
        { $push: { watchList: movieId } }
      );
    }
    updatedUser = await User.findOne({ username });
    return updatedUser;
  } catch (e) {
    throw e;
  }
};
