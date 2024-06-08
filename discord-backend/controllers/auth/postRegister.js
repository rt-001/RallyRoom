const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const postRegister = async (req, res) => {
  try {
    const { username, mail, password } = req.body;
    // check if user exist
    const userExist = await User.exists({ mail: mail });
    if (userExist) {
      return res.status(409).send("E-mail already in use.");
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    // create user document and save in database
    const user = await User.create({
      username,
      mail: mail.toLowerCase(),
      password: encryptedPassword,
    });
    // Create JWT Token
    const token = jwt.sign(
      {
        userId: user._id,
        mail,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "24h",
      }
    );
    return res.status(201).json({
      userDetails: {
        mail: user.mail,
        username: user.username,
        token: token,
      },
    });
  } catch (err) {
    return res.status(500).send("Error occured. Please try again");
  }
};
module.exports = postRegister;
