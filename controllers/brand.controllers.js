const {
  createBrandService,
  getBrandService,
  getBrandByIdService,
  updateBrandByIdService,
} = require("../services/brand.services");
exports.createBrands = async (req, res, next) => {
  try {
    const result = await createBrandService(req.body);
    res.status(200).json({
      status: "success",
      message: "Sucessfully created the Brand",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "couldnt created the brand",
    });
  }
};
exports.getBrands = async (req, res, next) => {
  try {
    const brands = await getBrandService();
    res.status(200).json({
      status: "success",
      data: brands,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "couldnt get the brands",
    });
  }
};

exports.getBrand = async (req, res, next) => {
  const { id } = req.params;
  try {
    const brand = await getBrandByIdService(id);
    if (!brand) {
      return res.status(400).json({
        status: "fail",
        error: "couldnt created the brand",
      });
    }
    res.status(200).json({
      status: "success",
      data: brand,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "couldnt get the brand",
    });
  }
};

exports.updateBrand = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await updateBrandByIdService(id, req.body);
    if (!result.nModified) {
      return res.status(400).json({
        status: "fail",
        error: "couldnt updated the brand its a error",
      });
    }
    res.status(200).json({
      status: "success",
      message: "SUccess to update data",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "couldnt update the brand",
    });
  }
};
