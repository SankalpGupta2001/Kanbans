const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

// register a new user
router.post("/register", async (req, res) => {
  try {
    // check if the user already exists
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      throw new Error("User already exists");
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    // save the user
    const user = new User(req.body);
    await user.save();
    res.send({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// login a user
router.post("/login", async (req, res) => {
  try {
    // check if the user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("User does not exist");
    }

    // check if the password is correct
    const passwordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordCorrect) {
      throw new Error("Invalid password");
    }

    // create and assign a token
    
    const token = jwt.sign({ userId: user._id },"heyheyheyhey", {
      expiresIn: "1d",
    });

    res.send({
      success: true,
      data: token,
      message: "User logged in successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get logged in user
router.get("/get-logged-in-user", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });

    // remove the password from the user object
    user.password = undefined;

    res.send({
      success: true,
      data: user,
      message: "User fetched successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.put("/update_profile", authMiddleware, async (req, res) => {
  try {
    const userId = req.body.userId; // Assuming you store the user's ID in req.user

    // Find the user to update
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // Update user data
    if (req.body.firstName) {
      user.firstName = req.body.firstName;
    }
    if (req.body.lastName) {
      user.lastName = req.body.lastName;
    }
    if (req.body.email) {
      user.email = req.body.email;
    }

    // If the request includes a new password, hash and update it
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }

    // Save the updated user
    await user.save();

    res.send({
      success: true,
      message: "User profile updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;