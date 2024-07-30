const User = require("../models/user");
const Activity = require("../models/activity");
const HttpError = require("../models/http-error");
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");

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

const getActivitySaveStatus = async (req, res, next) => {
  const activityID = req.params.aid;

  let activity;
  try {
    activity = await Activity.findById(activityID);
  } catch (err) {
    // Runs if something is actually wrong with the request like a missing field
    const error = new HttpError(
      "Something went wrong, could not find an activity",
      500
    );
    return next(error);
  }

  if (!activity) {
    // Runs if the request could not find a matching ID
    return next(
      new HttpError("Could not find a place with the provided ID!", 404)
    );
  }

  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return next(new Error("Not signed in"));
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

  if (user.activities.indexOf(new mongoose.Types.ObjectId(activityID)) == -1) {
    res.json({ saved: false });
  } else {
    res.json({ saved: true });
  }
};

exports.loadProfilePage = loadProfilePage;
exports.getActivitiesByUserId = getActivitiesByUserId;
exports.getActivitySaveStatus = getActivitySaveStatus;
