const Product = require("../../models/products/index");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

async function getAll() {
  const products = await Product.find();
  console.log(products)
}

exports.createProduct = async (req, res) => {
  const {
    name,
    price,
    description,
    imgSrc,
    reducedPricePercentage,
    isPinned,
    category,
    code,
    inStock,
  } = req.body;

  const product = new Product({
    name,
    price,
    description,
    imgSrc,
    reducedPricePercentage,
    isPinned,
    category,
    code,
    inStock,
  });
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


