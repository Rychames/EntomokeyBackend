// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rota para login com Google
router.post('/google', authController.googleAuth);

module.exports = router;
