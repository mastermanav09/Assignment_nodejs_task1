require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const compression = require("compression");
const fs = require("fs");
const path = require("path");
const helmet = require("helmet");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const reviewRoutes = require("./routes/review");

app.use(compression());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, DELETE, PATCH"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "origin, Authorization, Content-Type"
  );

  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  }

  next();
});

app.use(helmet.hidePoweredBy());
app.use(helmet.contentSecurityPolicy());

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  {
    flags: "a",
  }
);

app.use(morgan("dev", { stream: accessLogStream }));

app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/review", reviewRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message || "Something went wrong!";
  const errorData = error.data;
  res.status(status).json({
    message: message,
    errorData: errorData,
  });
});

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log(err));

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "client", "build")));
// }

app.listen(process.env.PORT || 8080, () => {
  console.log("Backend server is running!");
});
