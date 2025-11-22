let users = require('../data/users');
let products = require('../data/products');

const UserSchema = require("../models/usermodel");
const ProductSchema = require("../models/productmodel");

//GET ROOT '/' Api Working
const getHello = (req, res) => {
    res.json({ message: "API funcionando" });
};

// GET USERS
const getUsers = (req, res) => {
    res.json(users);
};

//GET USER BY ID
const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);

    if (!user) return res.status(404).json({error: "User not found"});

    res.json(user);
};

//POST USER
const createUser = (req, res) => {
    console.log("BODY RECIBIDO:", req.body);
    console.log("ENTRANDO AL CREATE USER");

   try {
    const parsed = UserSchema.parse(req.body);

    const newUser = {
        id: users.length + 1,
        ...parsed
    };
    users.push(newUser);
    
    res.status(201).json(newUser);
    } catch (err) {
        console.error("ERROR EN CREATE USER:", err);

        return res.status(400).json({ error: err.errors });
    }

};

//PUT USER
const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    let user = users.find(u => u.id === id);

    if(!user) return res.status(404).json({error: "User not found"});

    try {
        const parsed = UserSchema.partial().parse(req.body);

        user = { ...user, ...parsed };

        users = users.map(u => (u.id === id ? user : u));

        res.json(user);

    } catch (err) {
        return res.status(400).json({ error: err.erros });
    }
};

//DELETE USER
const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);

    const exists = users.some(u => u.id === id);
    if (!exists) return res.status(404).json({ error: "User not found" });

    users = users.filter(u => u.id !== id);

    res.json({ message: "User deleted" });
};
//GET PRODUCTS
const getProducts = (req, res) => {
    res.json(products);
};

//GET PRODUCTS by ID
const getProductsById = (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);

    if(!product) return res.status(404).json({error: "Product not found"});

    res.json(product);

};

//POST PRODUCT
const createProducts = (req, res) => {
    try {
        const parsed = ProductSchema.parse(req.body);

        const newProduct = {
            id: products.length + 1,
            ...parsed
        };

        products.push(newProduct);
        return res.status(201).json(newProduct);

    } catch (err) {
        return res.status(400).json({ error: err.errors });
    }
};

//PUT PRODUCT
const updateProducts = (req, res) => {
    const id = parseInt(req.params.id);
    let product = products.find(p => p.id === id);

    if (!product) return res.status(404).json({error: "Product not found"});

    try {
        const parsed = ProductSchema.partial().parse(req.body);

        product = { ...product, ...parsed };

        products = products.map(p => (p.id === id ? product : p));

        res.json(product);

    } catch (err) {
        return res.status(400).json({ error: err.errors });
    }
};

//DELETE PRODUCT

const deleteProducts = (req, res) => {
    const id = parseInt(req.params.id);

    const exists = products.some(p => p.id === id);
    if (!exists) return res.status(404).json({ error: "Product not found" });

    products = products.filter(p => p.id !== id);

    res.json({ message: "Product deleted" });
};


module.exports = {
    getHello,
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getProducts,
    createProducts,
    updateProducts,
    deleteProducts
};
