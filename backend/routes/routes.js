const routes = require('express').Router();
const products = require('../controller/productController')
const user =  require('../controller/userController');
const { isAuthenticateUser, authorizeRole } = require('../middleware/auth');


//Products routes
routes.post('/product/new',isAuthenticateUser,authorizeRole("admin"), products.createProduct)
routes.get('/products',products.getAllProducts)
routes.put('/updateProduct/:id',isAuthenticateUser,authorizeRole("admin"),products.updateProduct)
routes.delete('/deleteProduct/:id',isAuthenticateUser,authorizeRole("admin"),products.deleteProduct)
routes.get('/getProductById/:id',products.getProductById)


//User routes
routes.post('/login',user.loginUser)
routes.post('/register',user.registerUser)
routes.get('/logout',user.logoutUser)

module.exports = routes
