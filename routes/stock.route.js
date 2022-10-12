const express = require("express");
const router = express.Router();
const {
  getStocks,
  createStock,
  updateStocks,
  deleteStock,
} = require("../controllers/stock.controllers");

router.route("/").get(getStocks).post(createStock);
router.route("/:id").patch(updateStocks).delete(deleteStock);
