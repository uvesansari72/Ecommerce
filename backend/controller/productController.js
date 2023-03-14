const Product = require("../model/productModel");

//create product

exports.createProduct = async (req, res, next) => {
  try {
    const product = new Product(req.body);
    await product.save();

    return res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

//getAllProducts
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

//update product

exports.updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(500).json({
        success: false,
        message: `Product not found with id ${req.params.id}`,
      });
    } else {
      let updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          useFindAndModify: false,
          runValidators: true,
        }
      );

      return res.status(200).json({
        success: true,
        message: `Product updated succesfully`,
        updatedProduct,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(500).json({
        success: false,
        message: `Product not found with id ${req.params.id}`,
      });
    } else {
      await Product.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        success: true,
        message: `Product deleted succesfully`,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error,
    });
  }
};


exports.getProductById = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(500).json({
        success: false,
        message: `Product not found with id ${req.params.id}`,
      });
    } else {
      return res.status(200).json({
        success: true,
        product
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error,
    });
  }
};