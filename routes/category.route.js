const express = require("express");
const router = express.Router();
const {
  getCategories,
  createCategory,
} = require("../controllers/category.controllers");

router.route("/").get(getCategories).post(createCategory);

module.exports = router;
