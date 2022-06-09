const User = require('../models/userModel.js')
const asyncHandler = require('express-async-handler')
const generateToken = require('../utils/generateToken.js')


const login = asyncHandler(async (req, res) => {
  const { email, password } = await req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
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



module.exports = {
  login,
  register
};
