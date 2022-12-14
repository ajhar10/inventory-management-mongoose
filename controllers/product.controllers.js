const { updateOne } = require("../models/Product");
const Product = require("../models/Product");
const {
  getProductService,
  createProductService,
  updateProductByIdService,
  bulkUpdateProductService,
  bulkDeleteProductService,
  deleteProductByIdService,
} = require("../services/product.services");

exports.getProduct = async (req, res, next) => {
  try {
    let filters = { ...req.query };
    const excludedField = ["page", "limit", "sort"];
    excludedField.forEach((field) => delete filters[field]);
    //{price:{$gt:50}}
    //{price:{gt:'50'}}
    let filterString = JSON.stringify(filters);
    filterString = filterString.replace(
      /\b(gt|lt|gte|lte)\b/g,
      (match) => `$${match}`
    );
    filters = JSON.parse(filterString);

    const quires = {};
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      quires.sortBy = sortBy;
    }
    if (req.query.fields) {
      const fieldsBy = req.query.fields.split(",").join(" ");
      quires.fieldsBy = fieldsBy;
    }

    //Pagination
    if (req.query.page) {
      const { page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * Number(limit);
      quires.skip = skip;
      quires.limit = parseInt(limit);
    }

    const products = await getProductService(filters, quires);
    res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
      message: "can not find your data",
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    //create
    //const result = await Product.create(req.body)
    const result = createProductService(req.body);
    // if (product.quantity === 0) {
    //   product.status = "out-of-stock";
    // }
    // const result = await product.save();
    res.status(200).json({
      status: "success",
      message: "Data inserted Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Data isnt inserted",
      error: error.message,
    });
  }
};

exports.updateProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateProductByIdService(id, req.body);

    res.status(200).json({
      status: "success",
      message: "Product successfully updated",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Data cant update",
      error: error.message,
    });
  }
};

exports.bulkUpdateProduct = async (req, res, next) => {
  try {
    // console.log(req.body);
    const result = await bulkUpdateProductService(req.body);

    res.status(200).json({
      status: "success",
      message: "Product successfully updated",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Data cant update",
      error: error.message,
    });
  }
};
exports.bulkDeleteProduct = async (req, res, next) => {
  try {
    // console.log(req.body);
    const result = await bulkDeleteProductService(req.body.ids);

    res.status(200).json({
      status: "success",
      message: "Product successfully Deleted",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Data cant delete",
      error: error.message,
    });
  }
};
exports.deleteProductById = async (req, res, next) => {
  try {
    // console.log(req.body);
    const { id } = req.params;
    const result = await deleteProductByIdService(id);

    res.status(200).json({
      status: "success",
      message: "Product successfully deleted",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Data cant delete",
      error: error.message,
    });
  }
};

exports.fileUploader = async (req, res) => {
  try {
    res.status(200).json(req.files);
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Data cant delete",
      error: error.message,
    });
  }
};
