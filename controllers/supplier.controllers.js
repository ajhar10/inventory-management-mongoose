const {
  getSupplierServices,
  createSupplierServices,
  getSupplierByIdServices,
  updateSupplierServices,
} = require("../services/supplier.services");

exports.createSupplier = async (req, res) => {
  try {
    const category = await createSupplierServices(req.body);
    res.status(200).json({
      status: "success",
      message: "successfully create supplier",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "couldnt create the supplier",
    });
  }
};
exports.getSuppliers = async (req, res) => {
  try {
    const result = await getSupplierServices();
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "couldnt find the category",
    });
  }
};
exports.getSupplierById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const supplier = await getSupplierByIdServices(id);
    if (!supplier) {
      res.status(400).json({
        status: "failed",
        message: "could not find the supplier with this id",
      });
    }
    res.status(200).json({
      status: "success",
      message: "successfully get supplier",
      data: supplier,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "couldnt find the supplier",
    });
  }
};
exports.updateSupplier = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await updateSupplierServices(id, req.body);
    if (!result.nModified) {
      res.status(400).json({
        status: "fail",
        message: "does not  modified supplier",
      });
    }
    res.status(200).json({
      status: "success",
      message: "successfully modified supplier",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "couldnt modified the supplier",
    });
  }
};
