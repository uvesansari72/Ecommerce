const routes = require('express').Router();
const {getAllProducts} = require('../controller/productController')

routes.get('/products',getAllProducts)

module.exports = routes
