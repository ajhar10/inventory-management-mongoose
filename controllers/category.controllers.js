const {
  getCategoriesServices,
  createCategoriesServices,
} = require("../services/category.services");

exports.getCategories = async (req, res, next) => {
  try {
    const result = await getCategoriesServices();
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
exports.createCategory = async (req, res, next) => {
  try {
    const category = await createCategoriesServices(req.body);
    res.status(200).json({
      status: "success",
      message: "successfully create category",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "couldnt find the category",
    });
  }
};
