const express = require('express');
const authRoutes = require('../../controllers/admin/login');

const router = express.Router();


router.use('/auth', authRoutes);

module.exports = router;
