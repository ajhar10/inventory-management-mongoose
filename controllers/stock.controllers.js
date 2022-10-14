const { updateOne } = require("../models/Product");
const Stock = require("../models/Stock");
const {
  getStockService,
  createStockService,
} = require("../services/stock.services");

exports.getStock = async (req, res, next) => {
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

    const stocks = await getStockService(filters, quires);
    res.status(200).json({
      status: "success",
      data: stocks,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
      message: "can not find your data",
    });
  }
};

exports.createStock = async (req, res) => {
  try {
    const result = createStockService(req.body);
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

// exports.updateStockById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const result = await updateStockByIdService(id, req.body);

//     res.status(200).json({
//       status: "success",
//       message: "Product successfully updated",
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "fail",
//       message: "Data cant update",
//       error: error.message,
//     });
//   }
// };

// exports.bulkUpdateStock = async (req, res, next) => {
//   try {
//     // console.log(req.body);
//     const result = await bulkUpdateStockService(req.body);

//     res.status(200).json({
//       status: "success",
//       message: "Product successfully updated",
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "fail",
//       message: "Data cant update",
//       error: error.message,
//     });
//   }
// };
// exports.bulkDeleteStock = async (req, res, next) => {
//   try {
//     // console.log(req.body);
//     const result = await bulkDeleteStockService(req.body.ids);

//     res.status(200).json({
//       status: "success",
//       message: "Product successfully Deleted",
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "fail",
//       message: "Data cant delete",
//       error: error.message,
//     });
//   }
// };
// exports.deleteStockById = async (req, res, next) => {
//   try {
//     // console.log(req.body);
//     const { id } = req.params;
//     const result = await deleteStockByIdService(id);

//     res.status(200).json({
//       status: "success",
//       message: "Product successfully deleted",
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "fail",
//       message: "Data cant delete",
//       error: error.message,
//     });
//   }
// };
