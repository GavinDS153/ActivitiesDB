const User = require("../models/user");
const Activity = require("../models/activity");
const UserSavedAct = require("../models/userSavedAct");
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

  let activityList;
  try {
    activityList = await UserSavedAct.find({ u_id: user._id });
  } catch (err) {
    const error = new HttpError(
      "Fetching saved activities failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!activityList) {
    return next(
      new HttpError("Could not find activities for the provided user id.", 404)
    );
  }

  // if (!places || places.length === 0) {
  // if (!user || user.activities.length === 0) {
  //   return next(
  //     new HttpError("Could not find places for the provided user id.", 404)
  //   );
  // }

  let fullActs = [];

  for (let i = 0; i < activityList.length; i++) {
    const fullAct = await Activity.findById(activityList[i].a_id);
    fullActs.push(fullAct.toObject({ getters: true }));
  }

  res.json({
    activities: fullActs,
  });
};

const getActivitySaveStatus = async (req, res, next) => {
  const activityID = req.params.aid;

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

  if (!user) {
    res.json({ saved: false });
    return next(
      new HttpError("Could not find a user with the provided ID!", 404)
    );
  }

  let userActEntry;
  try {
    userActEntry = await UserSavedAct.findOne({
      u_id: user._id,
      a_id: activityID,
    });
  } catch (err) {
    const error = new HttpError(
      "Fetching saved activity failed, please try again later.",
      500
    );
    return next(error);
  }

  if (userActEntry) {
    res.json({ saved: true });
  } else {
    res.json({ saved: false });
  }
};

exports.loadProfilePage = loadProfilePage;
exports.getActivitiesByUserId = getActivitiesByUserId;
exports.getActivitySaveStatus = getActivitySaveStatus;
