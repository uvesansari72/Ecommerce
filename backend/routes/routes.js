const routes = require('express').Router();
const products = require('../controller/productController')


//Products routes
routes.post('/product/new', products.createProduct)
routes.get('/products',products.getAllProducts)
routes.put('/updateProduct/:id',products.updateProduct)
routes.delete('/deleteProduct/:id',products.deleteProduct)
routes.get('/getProductById/:id',products.getProductById)

module.exports = routes
