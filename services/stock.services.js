const Stock = require("../models/Stock");

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
// exports.updateProductByIdService = async (productId, data) => {
//   const result = await Product.updateOne(
//     { _id: productId },
//     { $inc: data },
//     { runValidators: true }
//   );
//   return result;
// };
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
