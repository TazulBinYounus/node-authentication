const express = require('express');

const  {
  getUsers,
  login,
  register,
  updateUserProfile,
} = require('../controllers/userController.js');


const {admin, protect}  = require('../middlewares/authMiddleware.js');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', protect, admin, getUsers);
router.put('/', protect, updateUserProfile);

module.exports = router;