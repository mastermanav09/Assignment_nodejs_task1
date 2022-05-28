const mongoose = require("mongoose");
const Product = require("../models/product");

exports.addProduct = async (req, res, next) => {
  const name = req.body.name;
  const price = req.body.price;

  try {
    if (name.length < 3 || Math.round(price) < 1) {
      const error = new Error("Please enter valid details!");
      error.statusCode = 422;
      throw error;
    }

    const newProduct = new Product({
      name,
      price,
    });

    await newProduct.save();

    res.status(201).json({
      message: "Product has been added!",
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      products: products,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};

exports.getProduct = async (req, res, next) => {
  const productId = req.params.productId;

  try {
    const product = await Product.findById(productId);

    res.status(200).json({
      product: product,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  const productId = req.body.productId;
  const name = req.body.name;
  const price = +req.body.price;

  try {
    if (name.length < 3 || Math.round(price) < 1) {
      const error = new Error("Please enter valid details!");
      error.statusCode = 422;
      throw error;
    }

    const result = await Product.findByIdAndUpdate(productId, {
      name: name,
      price: price,
    });

    if (!result) {
      const error = new Error("Something went wrong!");
      error.statusCode = 500;
      throw error;
    }

    res.status(200).json({
      message: "Product updated successfully!",
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  const productId = req.params.productId;

  try {
    const result = await Product.deleteOne({ _id: productId });

    if (!result.deletedCount) {
      const error = new Error("Something went wrong!");
      error.statusCode = 500;
      throw error;
    }

    res.status(200).json({
      message: "Product deleted successfully!",
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};
