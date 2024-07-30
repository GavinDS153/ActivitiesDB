const express = require("express");
const router = express.Router();
const Tag = require("../models/tag");
const HttpError = require("../models/http-error");

// Create a new tag
const createTag = async (req, res, next) => {
  const { name } = req.body;
  const newTag = new Tag({ name });
  try {
    await newTag.save();
  } catch (err) {
    const error = new HttpError("Creating tag failed, please try again", 500);
    return next(error);
  }
  res.status(201).json(newTag);
};

const getAllTags = async (req, res, next) => {
  let tags;
  try {
    tags = await Tag.find({});
  } catch (err) {
    const error = new HttpError(
      "Could not fetch tags. Please try again later",
      500
    );
    return next(error);
  }
  res.json({
    tags: tags.map((tag) => tag.toObject({ getters: true })),
  });
};

exports.createTag = createTag;
exports.getAllTags = getAllTags;
