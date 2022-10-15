const mongoose = require("mongoose");
const Stock = require("../models/Stock");
const ObjectId = mongoose.Types.ObjectId;

exports.getStockService = async (filters, quires) => {
  const stock = await Stock.find(filters)
    .skip(quires.skip)
    .limit(quires.limit)
    .select(quires.fieldsBy)
    .sort(quires.sortBy);
  const totalStock = await Stock.countDocuments();
  const pageCount = Math.ceil(totalStock / quires.limit);
  return { totalStock, pageCount, stock };
};

exports.createStockService = async (data) => {
  const stock = await Stock.create(data);

  return stock;
};
exports.getStockByIdService = async (id) => {
  // const result = await Stock.findOne({ _id: id })
  //   .populate("brand.id")
  //   .populate("suppliedBy.id");

  const result = await Stock.aggregate([
    { $match: { _id: ObjectId(id) } },
    {
      $project: {
        name: 1,
        productId: 1,
        "brand.name": { $toLower: "$brand.name" },
      },
    },
    {
      $lookup: {
        from: "brands",
        localField: "brand.name",
        foreignField: "name",
        as: "brandDetails",
      },
    },
  ]);
  return result;
};
// exports.bulkUpdateProductService = async (data) => {
//   //   const result = await Product.updateMany({ _id: data.ids }, data.data, {
//   //     runValidators: true,
//   //   });
//   const products = [];
//   data.ids.forEach((product) => {
//     products.push(Product.updateOne({ _id: product.id }, product.data));
//   });
//   const result = await Promise.all(products);
//   return result;
// };
// exports.bulkDeleteProductService = async () => {
//   const result = await Product.deleteMany({});
//   return result;
// };
// exports.deleteProductByIdService = async (id) => {
//   const result = await Product.deleteOne({ _id: id });
//   return result;
// };
