const express = require("express");
const checkAuth = require("../middleware/check-auth");

const activitiesControllers = require("../controllers/activities-controllers");

const router = express.Router();

router.get("/:aid", activitiesControllers.getActivityByID);

router.get("/", activitiesControllers.getActivities);

router.post("/", activitiesControllers.createActivity);

router.patch("/save/:aid", checkAuth, activitiesControllers.saveActivity);

module.exports = router;
