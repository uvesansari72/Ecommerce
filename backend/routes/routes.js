const routes = require('express').Router();
const products = require('../controller/productController')
const user =  require('../controller/userController');


//Products routes
routes.post('/product/new', products.createProduct)
routes.get('/products',products.getAllProducts)
routes.put('/updateProduct/:id',products.updateProduct)
routes.delete('/deleteProduct/:id',products.deleteProduct)
routes.get('/getProductById/:id',products.getProductById)


//User routes
routes.post('/login',user.loginUser)
routes.post('/register',user.registerUser)

module.exports = routes
