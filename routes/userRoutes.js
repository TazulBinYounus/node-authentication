const express = require('express');

const  {
  getUsers,
  updateUserProfile,
} = require('../controllers/userController.js');


const {admin, protect}  = require('../middlewares/authMiddleware.js');
const router = express.Router();


router.get('/', protect, admin, getUsers);
router.put('/', protect, updateUserProfile);

module.exports = router;