const Category = require("../models/Category");
exports.getCategoriesServices = async () => {
  const result = await Category.find({});
  return result;
};
exports.createCategoriesServices = async (data) => {
  const category = await Category.create(data);
  return category;
};
