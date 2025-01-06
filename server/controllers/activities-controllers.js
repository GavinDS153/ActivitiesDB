const Activity = require("../models/activity");
const HttpError = require("../models/http-error");
const mongoose = require("mongoose");

const User = require("../models/user");
const Tag = require("../models/tag");
const UserSavedAct = require("../models/userSavedAct");
const userSavedAct = require("../models/userSavedAct");

const getActivities = async (req, res, next) => {
  let activities;
  let queryObj = {};
  try {
    const tagNames = req.query.tags
      ? decodeURIComponent(req.query.tags).split(",")
      : [];

    const pageNum = req.query.page || 1;
    const limit = req.query.limit || 0;
    const searchTerm = req.query.search || "";

    if (tagNames.length) {
      const tags = await Tag.find({ name: { $in: tagNames } });
      const tagIds = tags.map((tag) => tag._id);
      queryObj = { ...queryObj, tags: { $all: tagIds } };
    }

    queryObj = { ...queryObj, name: { $regex: searchTerm, $options: `i` } };

    activities = await Activity.find(queryObj)
      .skip((pageNum - 1) * limit)
      .limit(limit)
      .populate("tags");
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

const toggleSaveActivity = async (req, res, next) => {
  // Identifies activity that needs to be saved
  const activityID = req.params.aid;

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

  let activityExist;
  try {
    activityExist = await UserSavedAct.findOne({
      a_id: activityID,
      u_id: req.userData.userID,
    });
  } catch (err) {
    const error = new HttpError(
      "Could not check activity. Please try again later",
      500
    );
    return next(error);
  }

  // Saves selected activity to logged in user
  if (!activityExist) {
    try {
      // Creates saved activity document and saves it to the db
      const savedAct = new UserSavedAct({
        u_id: req.userData.userID,
        a_id: activityID,
      });
      await savedAct.save();

      res.json({ saved: true });
    } catch (err) {
      const error = new HttpError("Saving place failed, please try again", 500);
      return next(error);
    }
  } else {
    try {
      const result = await UserSavedAct.deleteOne({
        a_id: activityID,
        u_id: req.userData.userID,
      });

      res.json({ saved: false });
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
exports.toggleSaveActivity = toggleSaveActivity;
