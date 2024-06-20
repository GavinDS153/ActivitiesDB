const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // JWT token is sent in the Authorization header of the HTTP request (Authorization: "Bearer TOKEN")
    if (!token) {
      // If authorization header is sent but token isn't there
      throw new Error("Authentication failed.");
    }
    const decodedToken = jwt.verify(token, "supersecret_dont_share");
    req.userData = { userID: decodedToken.userID };
    next();
  } catch (err) {
    // Runs if authorization header isn't set at all
    const error = new HttpError("Authentication failed!", 401);
    return next(error);
  }
};
