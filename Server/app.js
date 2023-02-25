var express = require("express");
var cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var areasRouter = require("./routes/areaRoutes");
var productsRouter = require("./routes/productRoutes");
var productTypesRouter = require("./routes/productTypeRoutes");
var usersRouter = require("./routes/userRoutes");
var userTypesRouter = require("./routes/userTypeRoutes");

const router = express.Router();

var app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", router);
app.use("/areas", areasRouter);
app.use("/products", productsRouter);
app.use("/productTypes", productTypesRouter);
app.use("/users", usersRouter);
app.use("/userTypes", userTypesRouter);

module.exports = app;
