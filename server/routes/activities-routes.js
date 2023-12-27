const express = require("express");

const activitiesControllers = require("../controllers/activities-controllers");

const router = express.Router();

router.get("/:aid", activitiesControllers.getActivityByID);

router.get("/", activitiesControllers.getActivities);

router.post("/", activitiesControllers.createActivity);

module.exports = router;