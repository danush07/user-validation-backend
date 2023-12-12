const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// Create new user
const createUser = asyncHandler(async (req, res) => {
  const {
    firstname,
    lastname,
    mobile,
    address1,
    address2,
    state,
    city,
    country,
    zipcode,
    email,
  } = req.body;

  if (
    !firstname ||
    !email ||
    !lastname ||
    !mobile ||
    !address1 ||
    !state ||
    !city ||
    !country ||
    !zipcode
  ) {
    res.status(400);
    throw new Error("Please include all the necessary fields");
  }
  const userEmailExists = await User.findOne({ email });

  if (userEmailExists) {
    res.status(400);
    throw new Error("User with Same Email already exists");
  }

  const usermobileExists = await User.findOne({ mobile });
  if (usermobileExists) {
    res.status(400);
    throw new Error("User with Same Mobile Number Already Exists");
  }
  const user = await User.create({
    firstname,
    lastname,
    email,
    mobile,
    address1,
    address2,
    state,
    city,
    country,
    zipcode,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      mobile: user.mobile,
      address1: user.address1,
      address2: user.address2,
      state: user.state,
      city: user.city,
      country: user.country,
      zipcode: user.zipcode,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// get all the user data
const getAllUsers = asyncHandler(async (req, res) => {
  const allusers = await User.find();
  res.status(200).json(allusers);
});

// edit singl user

const updateUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const {
    firstname,
    lastname,
    mobile,
    address1,
    address2,
    state,
    city,
    country,
    zipcode,
    email,
  } = req.body;

  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.firstname = firstname || user.firstname;
  user.lastname = lastname || user.lastname;
  user.mobile = mobile || user.mobile;
  user.address1 = address1 || user.address1;
  user.address2 = address2 || user.address2;
  user.state = state || user.state;
  user.city = city || user.city;
  user.country = country || user.country;
  user.zipcode = zipcode || user.zipcode;
  user.email = email || user.email;

  const updatedUser = await user.save();

  res.status(200).json({
    _id: updatedUser._id,
    firstname: updatedUser.firstname,
    lastname: updatedUser.lastname,
    email: updatedUser.email,
    mobile: updatedUser.mobile,
    address1: updatedUser.address1,
    address2: updatedUser.address2,
    state: updatedUser.state,
    city: updatedUser.city,
    country: updatedUser.country,
    zipcode: updatedUser.zipcode,
  });
});

//delete single user

const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const deletedUser = await User.findByIdAndDelete(userId);

  if (!deletedUser) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({ message: "User removed" });
});


// get single user

const getSingleUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({
    _id: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    mobile: user.mobile,
    address1: user.address1,
    address2: user.address2,
    state: user.state,
    city: user.city,
    country: user.country,
    zipcode: user.zipcode,
  });
});

module.exports = {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getSingleUser,
};
