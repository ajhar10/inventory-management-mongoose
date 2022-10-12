const Brand = require("../models/Brand");

exports.createBrandService = async (data) => {
  const brand = await Brand.create(data);
  return brand;
};
exports.getBrandService = async () => {
  const brands = await Brand.find({}).populate("products");
  return brands;
};
exports.getBrandByIdService = async (id) => {
  const brand = await Brand.find({ _id: id });
  return brand;
};
exports.updateBrandByIdService = async (id, data) => {
  const brand = await Brand.updateOne({ _id: id }, data, {
    runValidators: true,
  });
  return brand;
};
