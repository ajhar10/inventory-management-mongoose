const express = require("express");
const app = express();
const cors = require("cors");

//Middleware
app.use(express.json());
app.use(cors());

//routes
const productRoute = require("./routes/product.route");
const brandRoute = require("./routes/brand.route");
const categoryRoute = require("./routes/category.route");
const supplierRoute = require("./routes/supplier.route");
const stockRoute = require("./routes/stock.route");
// const brandRoute = require("./routes/brand.route");

//Posting to database
app.use("/api/v1/product", productRoute);
app.use("/api/v1/brand", brandRoute);
app.use("/api/v1/category", categoryRoute);
// app.use("/api/v1/store", brandRoute);
app.use("/api/v1/supplier", supplierRoute);
app.use("/api/v1/stock", stockRoute);

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

module.exports = app;