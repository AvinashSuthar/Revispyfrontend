const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const sendMail = require("../utils/mailer");
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "1h";

exports.verifyEmail = async (req, res) => {
  try {
    const { otp } = req.body;
    const user = await User.findById(req.user.userId);
    if (user.otp === otp) {
      user.emailVerified = true;
      user.otp = null;
      await user.save();
      res.status(200).json({
        success: true,
        message: "Email verification successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          emailVerified: user.emailVerified,
          category: user.category,
        },
      });
    } else {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
        category: user.category,
      },
      token,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const otp = Math.floor(10000000 + Math.random() * 90000000);

    const mail = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification OTP</title>
</head>
<body>
    <p>Dear User,</p>
    <p>Your One Time Password (OTP) for email verification is:</p>
    <h1 style="font-size: 2em; margin-bottom: 20px;">${otp}</h1>
    <p>Please use this OTP to verify your email address. This OTP is valid for 10 minutes.</p>
    <p>If you did not request this OTP, please ignore this email. Your account security is important to us.</p>
    <p>Thank you for using our service.</p>
    <p>Best regards,</p>
    <p>Revispy <br> Avinash Suthar</p>
</body>
</html>`;

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      otp,
    });
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    sendMail(email, "OTP for Email Verification", mail, (err, info) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.status(201).json({
        success: true,
        message: "OTP sent to email",
        token,
      });
    });
  } catch (error) {
    console.log("Error in signup:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const user = req.user;
    const newUser = await User.findById(user.userId);
    res.status(200).json({
      success: true,
      message: "User found",
      newUser: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        emailVerified: newUser.emailVerified,
        category: newUser.category,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.addCategory = async (req, res) => {
  try {
    const { category } = req.body;
    const user = req.user;
    const newUser = await User.findById(user.userId);
    newUser.category = category;
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Category added",
      newUser: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        emailVerified: newUser.emailVerified,
        category: newUser.category,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};
