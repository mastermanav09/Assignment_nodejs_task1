const mongoose = require("mongoose");
const User = require("../models/user");
const { isEmailValid, isPhoneNoValid } = require("../utils/validation");

exports.addUser = async (req, res, next) => {
  const name = req.body.name;
  const password = req.body.password;
  const email = req.body.email;
  const phoneNo = +req.body.phoneNo;

  try {
    if (
      name.length < 3 ||
      !isEmailValid(email) ||
      isNaN(phoneNo) ||
      !isPhoneNoValid(phoneNo)
    ) {
      const error = new Error("Please enter valid details!");
      error.statusCode = 422;
      throw error;
    }

    // password is hashed here.

    const newUser = new User({
      email,
      password,
      name,
      phone: phoneNo,
    });

    await newUser.save();

    res.status(201).json({
      message: "User has been added!",
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};
