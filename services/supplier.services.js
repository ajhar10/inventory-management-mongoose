const Supplier = require("../models/Supplier");

exports.getSupplierServices = async () => {
  const supplier = await Supplier.find({});
  return supplier;
};

exports.createSupplierServices = async (data) => {
  const supplier = await Supplier.create(data);

  return supplier;
};

exports.getSupplierByIdServices = async (supplierId) => {
  const supplier = await Supplier.find({ _id: supplierId });

  return supplier;
};
exports.updateSupplierServices = async (supplierId, data) => {
  const result = await Supplier.updateOne({ _id: supplierId }, data, {
    runValidators: true,
  });

  return result;
};
