const mongoose = require("mongoose");
const Review = require("../models/review");
const User = require("../models/user");
const Product = require("../models/product");

exports.addReview = async (req, res, next) => {
  const description = req.body.description;
  const productId = req.body.productId;
  const userId = req.body.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("User not found.");
      error.statusCode = 404;
      throw error;
    }

    const product = await Product.findById(productId);
    if (!product) {
      const error = new Error("Product not found.");
      error.statusCode = 404;
      throw error;
    }

    if (description.trim().length < 5) {
      const error = new Error("Description is too small.");
      error.statusCode = 422;
      throw error;
    }

    const newReview = new Review({
      description,
      userId,
      productId,
    });

    await newReview.save();

    res.status(201).json({
      message: "Review has been added!",
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};

exports.deleteReview = async (req, res, next) => {
  const reviewId = req.params.reviewId;

  try {
    const result = await Review.deleteOne({ _id: reviewId });

    if (!result.deletedCount) {
      const error = new Error("Something went wrong!");
      error.statusCode = 500;
      throw error;
    }

    res.status(200).json({
      message: "Review deleted successfully!",
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};

exports.getReviews = async (req, res, next) => {
  const productId = req.params.productId;

  try {
    const reviews = await Review.find({ productId: productId });

    res.status(200).json({
      reviews: reviews,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};
