const express = require("express");
const router = express.Router();
const {
  getStocks,
  createStock,
  getStockById,
} = require("../controllers/stock.controllers");

router.route("/").get(getStocks).post(createStock);
router.route("/:id").get(getStockById);
module.exports = router;
