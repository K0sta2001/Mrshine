const express = require('express');
const router = express.Router();
const productController = require('../../controllers/productcontrollers/index');

router.get('/products', productController.getAllProducts);
router.post('/products', productController.createProduct);

module.exports = router;
