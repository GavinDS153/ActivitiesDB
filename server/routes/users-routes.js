const express = require("express");
const { check } = require("express-validator");

const usersControllers = require("../controllers/users-controllers");
const profilesController = require("../controllers/profiles-controllers");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post(
  "/signup",
  [
    check("username").isLength({ min: 5 }),
    check("email").not().isEmpty(),
    check("password").not().isEmpty(),
  ],
  usersControllers.signup
);

router.post(
  "/login",
  [
    check("username").isLength({ min: 5 }),
    check("email").not().isEmpty(),
    check("password").not().isEmpty(),
  ],
  usersControllers.login
);

router.get("/profile", checkAuth, profilesController.loadProfilePage);
router.get("/activities", checkAuth, profilesController.getActivitiesByUserId);

module.exports = router;
