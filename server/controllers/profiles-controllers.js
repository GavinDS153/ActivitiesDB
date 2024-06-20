const User = require("../models/user");
const Activity = require("../models/activity");
const HttpError = require("../models/http-error");
const jwt = require("jsonwebtoken");

const loadProfilePage = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    throw new Error("Not signed in");
  }

  let user;
  try {
    user = await User.findById(req.userData.userID);
  } catch (err) {
    const error = new HttpError(
      "Could not fetch profile. Please try again later",
      500
    );
    return next(error);
  }

  res.json({
    username: user.username,
    email: user.email,
    activities: user.activities,
  });
};

const getActivitiesByUserId = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    throw new Error("Not signed in");
  }

  // let places;
  let user;
  try {
    user = await User.findById(req.userData.userID);
  } catch (err) {
    const error = new HttpError(
      "Fetching places failed, please try again later.",
      500
    );
    return next(error);
  }

  // if (!places || places.length === 0) {
  if (!user || user.activities.length === 0) {
    return next(
      new HttpError("Could not find places for the provided user id.", 404)
    );
  }

  let fullActs = [];

  for (let i = 0; i < user.activities.length; i++) {
    const fullAct = await Activity.findById(user.activities[i]);
    fullActs.push(fullAct.toObject({ getters: true }));
  }

  res.json({
    activities: fullActs,
  });
};

exports.loadProfilePage = loadProfilePage;
exports.getActivitiesByUserId = getActivitiesByUserId;
