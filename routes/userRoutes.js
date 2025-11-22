const express = require('express');
const router = express.Router();

const { getUsers,
    getUserById, 
    getHello, 
    getProducts, 
    createUser, 
    updateUser, 
    createProducts, 
    deleteUser, 
    deleteProducts,
    updateProducts
 } = require('../controllers/userController');

 //ROOT
router.get('/', getHello);

//USERS
router.get('/users', getUsers);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users', deleteUser);
router.get('/users/:id', getUserById);




//PRODUCTS
router.get('/products', getProducts);
router.post('/products', createProducts);
router.put('/products/:id', updateProducts);
router.delete('/products', deleteProducts);



module.exports = router;
