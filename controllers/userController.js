const User = require('../models/userModel.js')
const asyncHandler = require('express-async-handler')
const generateToken = require('../utils/generateToken.js')


//@desc     Auth User & Get Token
//@route    POST api/users/login
//@access   Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = await req.body;
  const user = await User.findOne({ email });

  // if (user && (await user.matchPassword(password))) {
  if (user) {

    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or Password');
  }
});

//@desc     REGISTER User & Get Token
//@route    POST api/users/register
//@access   Public
const register = asyncHandler( async (req, res) => {
  const { name, email, password } = req.body;
  const userExist = await User.findOne({ email });
  console.log(userExist);

  if (userExist) {
    res.status(400);
    throw new Error('User already Exist');
  }

  const user = await User.create({ name, email, password });
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid User Data');
  }
});

//@desc     Get all Users
//@route    GET api/users
//@access   Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

//@desc     Update User Profile
//@route    PUT api/users/profile/:id
//@access   Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    return res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not Found');
  }
});

module.exports = {
  getUsers,
  login,
  updateUserProfile,
  register
};


// export { login, register, getUsers, updateUserProfile };