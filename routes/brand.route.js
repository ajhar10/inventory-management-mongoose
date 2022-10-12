const express = require("express");
const router = express.Router();
const {
  createBrands,
  getBrands,
  getBrand,
  updateBrand,
} = require("../controllers/brand.controllers");

router.route("/").post(createBrands).get(getBrands);
router.route("/:id").get(getBrand).patch(updateBrand);

module.exports = router;
