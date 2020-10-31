const { buildSchemaFromTypeDefinitions } = require("apollo-server");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const { UserInputError } = require("apollo-server");
const { InputValidators, LoginValidators } = require("../../utils/validators");
const { SECRETE_KEY } = require("../../config");

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      userName: user.userName,
      email: user.email,
    },
    SECRETE_KEY,
    { expiresIn: "1h" }
  );
}

module.exports = {
  Mutation: {
    async login(_, { userName, password }) {
      const { errors, valid } = LoginValidators(userName, password);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const user = await User.findOne({ userName });
      if (!user) {
        errors.general = "User not found!";
        throw new UserInputError("User not found!", { errors });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Credentials not matching!";
        throw new Error("Credentials not matching!", { errors });
      }
      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async register(
      _,
      { registerInput: { userName, email, password, confirmedPassword } },
      context,
      info
    ) {
      const { errors, valid } = InputValidators(
        userName,
        email,
        password,
        confirmedPassword
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const user = await User.findOne({ userName });
      if (user) {
        throw new UserInputError("Username is taken", {
          error: {
            userName: "This username is taken!!",
          },
        });
      }
      password = await bcrypt.hash(password, 12);
      const newUser = new User({
        userName,
        email,
        password,
        createdAt: new Date().toISOString(),
      });
      const storedUser = await newUser.save();
      const token = generateToken(storedUser);

      return {
        ...storedUser._doc,
        id: storedUser._id,
        token,
      };
    },
  },
};
