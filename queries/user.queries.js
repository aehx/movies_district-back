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
      });
      return await newUser.save();
    }
  } catch (e) {
    throw e;
  }
};
