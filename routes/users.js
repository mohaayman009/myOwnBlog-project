const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.js');
const verifyToken = require('../middleware/verfiyToken');

// Get all users (protected)
router.get('/', verifyToken, usersController.getAllUsers);

// Register
router.post('/register', usersController.register);

// Login
router.post('/login/', usersController.login);

module.exports = router;