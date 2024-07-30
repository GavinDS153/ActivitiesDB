const express = require("express");

const tagsControllers = require("../controllers/tags-controllers");

const router = express.Router();

router.post("/", tagsControllers.createTag);

router.get("/", tagsControllers.getAllTags);

module.exports = router;
