const jwt = require("jsonwebtoken");
const { SECRETE_KEY } = require("../config");
const { AuthenticationError } = require("apollo-server");
module.exports = (context) => {
  const authHeader = context.req.headers.authorization;
  console.log(authHeader);
  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, SECRETE_KEY);
        return user;
      } catch (error) {
        throw new AuthenticationError("Invalid/Expired Token!!");
      }
    }
    throw new AuthenticationError("Wrong Token format!");
  }
  throw new AuthenticationError("Authorization header must be provided!");
};
