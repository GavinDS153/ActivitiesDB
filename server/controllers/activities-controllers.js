const Activity = require("../models/activity");
const HttpError = require("../models/http-error");
const mongoose = require("mongoose");

const User = require("../models/user");

const getActivities = async (req, res, next) => {
  let activities;
  try {
    activities = await Activity.find({});
  } catch (err) {
    const error = new HttpError(
      "Could not fetch activities. Please try again later",
      500
    );
    return next(error);
  }
  res.json({
    activities: activities.map((activity) =>
      activity.toObject({ getters: true })
    ),
  });
};

const getActivityByID = async (req, res, next) => {
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

  res.json({ activity: activity.toObject({ getters: true }) });
};

const createActivity = async (req, res, next) => {
  const { name, org, dur, desc, loc } = req.body;

  const createdActivity = new Activity({
    name,
    org,
    dur,
    desc,
    loc,
  });

  try {
    await createdActivity.save();
  } catch (err) {
    const error = new HttpError(
      "Creating activity failed, please try again",
      500
    );
    return next(error);
  }

  res.status(201).json({ activity: createdActivity });
};

const saveActivity = async (req, res, next) => {
  // Identifies activity that needs to be saved
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

  // Identifies user that needs the activity to be saved to
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

  // Saves selected activity to logged in user
  if (user.activities.indexOf(new mongoose.Types.ObjectId(activityID)) == -1) {
    try {
      const sess = await mongoose.startSession();
      sess.startTransaction();
      user.activities.push(activity);
      await user.save({ session: sess });
      await sess.commitTransaction();
    } catch (err) {
      const error = new HttpError("Saving place failed, please try again", 500);
      return next(error);
    }
  } else {
    try {
      const sess = await mongoose.startSession();
      sess.startTransaction();
      const index = user.activities.indexOf(
        new mongoose.Types.ObjectId(activityID)
      );
      user.activities.splice(index, 1);
      await user.save({ session: sess });
      await sess.commitTransaction();
    } catch (err) {
      const error = new HttpError(
        "Removing place failed, please try again",
        500
      );
      return next(error);
    }
  }
};

exports.getActivityByID = getActivityByID;
exports.createActivity = createActivity;
exports.getActivities = getActivities;
exports.saveActivity = saveActivity;
