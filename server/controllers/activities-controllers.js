const Activity = require("../models/activity");
const HttpError = require("../models/http-error");


const getActivities = async (req, res, next) => {
    let activities;
    try {
        activities = await Activity.find({});
    } catch (err) {
        const error = new HttpError("Could not fetch activities. Please try again later", 500);
        return next(error);
    }
    res.json({activities: activities.map((activity) => activity.toObject({getters: true}))});
}

const getActivityByID = async (req, res, next) => {
    const activityID = req.params.aid;

    let activity;
    try {
        activity = await Activity.findById(activityID);
    } catch (err) { // Runs if something is actually wrong with the request like a missing field
        const error = new HttpError("Something went wrong, could not find an activity", 500);
        return next(error);
    }
    
    if (!activity) { // Runs if the request could not find a matching ID
        return next(new HttpError("Could not find a place with the provided ID!", 404));
    }

    res.json({activity: activity.toObject({getters: true})});
}

const createActivity = async (req, res, next) => {

    const {name, org, dur, desc, loc} = req.body;

    const createdActivity = new Activity({
        name,
        org,
        dur,
        desc,
        loc
    });

    try {
        await createdActivity.save();
    } catch (err) {
        const error = new HttpError("Creating activity failed, please try again", 500);
        return next(error);
    }

    res.status(201).json({activity: createdActivity});
};

exports.getActivityByID = getActivityByID;
exports.createActivity = createActivity;
exports.getActivities = getActivities;