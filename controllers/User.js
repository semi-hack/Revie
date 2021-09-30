import express from "express";
import User from "../models/Users.js";


const registerUser = async (req, res) => {
  try {
    const exist = await User.findOne({ email: req.body.email }).exec();
    if (exist) {
      return res.status(409).json({
        error: "This user exists",
        success: false,
      });
    }

    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    await user.save();

    return  res.status(201).json({
      success: true,
      data: user,
    });

  } catch(error) {
    return res.status(400).json({
      error: "error",
      success: false,
  });
  }
}

const getAllUsers = async (req, res) => {
    try {

      const users = await User.find({});
      return res.status(200).json({
        success: true,
        data: users,
      });

    } catch (error) {
        return res.status(401).json({
            error: "unauthorized",
            success: false,
        });
    }
    
};

export default { registerUser, getAllUsers }