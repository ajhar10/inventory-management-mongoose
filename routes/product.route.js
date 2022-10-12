const express = require("express");
const router = express.Router();
const productcontroller = require("../controllers/product.controllers");
const multer = require("multer");
const uploader = require("../middleware/uploader");

router.post(
  "/file-upload",
  uploader.array("image"),
  productcontroller.fileUploader
);

router.route("/");
router
  .route("/")
  .get(productcontroller.getProduct)
  .post(productcontroller.createProduct);
router
  .route("/bulk-update")
  .patch(productcontroller.bulkUpdateProduct)
  .delete(productcontroller.bulkDeleteProduct);
router
  .route("/:id")
  .patch(productcontroller.updateProductById)
  .delete(productcontroller.deleteProductById);

module.exports = router;
