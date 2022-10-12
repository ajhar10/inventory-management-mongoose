const Product = require("../models/Product");
const Brand = require("../models/Brand");

exports.getProductService = async (filters, quires) => {
  const product = await Product.find(filters)
    .skip(quires.skip)
    .limit(quires.limit)
    .select(quires.fieldsBy)
    .sort(quires.sortBy);
  const totalProduct = await Product.countDocuments();
  const pageCount = Math.ceil(totalProduct / quires.limit);
  return { totalProduct, pageCount, product };
};

exports.createProductService = async (data) => {
  const product = await Product.create(data);
  const { _id: productId, brand } = product;
  const result = await Brand.updateOne(
    { _id: brand.id },
    { $push: { products: productId } }
  );
  console.log(result);
  return product;
};
exports.updateProductByIdService = async (productId, data) => {
  const result = await Product.updateOne(
    { _id: productId },
    { $inc: data },
    { runValidators: true }
  );
  return result;
};
exports.bulkUpdateProductService = async (data) => {
  //   const result = await Product.updateMany({ _id: data.ids }, data.data, {
  //     runValidators: true,
  //   });
  const products = [];
  data.ids.forEach((product) => {
    products.push(Product.updateOne({ _id: product.id }, product.data));
  });
  const result = await Promise.all(products);
  return result;
};
exports.bulkDeleteProductService = async () => {
  const result = await Product.deleteMany({});
  return result;
};
exports.deleteProductByIdService = async (id) => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};
