const express = require("express");
const router = express.Router();
const {
  getSuppliers,
  createSupplier,
  getSupplierById,
  updateSupplier,
} = require("../controllers/supplier.controllers");

router.route("/").get(getSuppliers).post(createSupplier);
router.route("/:id").get(getSupplierById).patch(updateSupplier);

module.exports = router;
