let users = require('../data/users');
let products = require('../data/products');
const prisma = require('../db')
const UserSchema = require("../models/usermodel");
const ProductSchema = require("../models/productmodel");

const hasPrismaProduct = () => {
    try {
        return !!prisma.product;
    }catch {
        return false;
    }
};

//GET ROOT '/' Api Working
const getHello = (req, res) => {
    res.json({ message: "API funcionando" });
};

// GET USERS
const getUsers = async (req, res) => {
  try {
    // intenta obtener desde Prisma si existe el model
    if (prisma.user) {
      const dbUsers = await prisma.user.findMany();
      return res.json(dbUsers);
    }
  } catch (err) {
    console.warn("Prisma user read failed, falling back to memory store:", err.message);
    // continúa a fallback
  }

  // fallback in-memory
  res.json(users);
};

//GET USER BY ID
const getUserById = async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

  try {
    if (prisma.user) {
      const user = await prisma.user.findUnique({ where: { id } });
      if (!user) return res.status(404).json({ error: "User not found" });
      return res.json(user);
    }
  } catch (err) {
    console.warn("Prisma findUnique failed, falling back:", err.message);
  }

  // fallback
  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
};

//POST USER
const createUser = async (req, res) => {
  console.log("BODY RECIBIDO:", req.body);
  try {
    const parsed = UserSchema.parse(req.body);

    // if Prisma model exists, use it
    if (prisma.user) {
      const created = await prisma.user.create({
        data: parsed
      });
      return res.status(201).json(created);
    }

    // fallback in-memory
    const newUser = {
      id: users.length ? Math.max(...users.map(u => u.id)) + 1 : 1,
      ...parsed
    };
    users.push(newUser);
    return res.status(201).json(newUser);

  } catch (err) {
    console.error("ERROR EN CREATE USER:", err);
    // Zod errors have .errors, Prisma errors have message
    if (err.errors) return res.status(400).json({ error: err.errors });
    return res.status(500).json({ error: err.message || String(err) });
  }
};

//PUT USER
const updateUser = async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

  try {
    const parsed = UserSchema.partial().parse(req.body);

    if (prisma.user) {
      try {
        const updated = await prisma.user.update({
          where: { id },
          data: parsed
        });
        return res.json(updated);
      } catch (prismaErr) {
        if (prismaErr.code === 'P2025') { // record not found
          return res.status(404).json({ error: "User not found" });
        }
        throw prismaErr;
      }
    }

    // fallback in-memory
    let user = users.find(u => u.id === id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user = { ...user, ...parsed };
    users = users.map(u => (u.id === id ? user : u));
    return res.json(user);

  } catch (err) {
    console.error("ERROR EN UPDATE USER:", err);
    if (err.errors) return res.status(400).json({ error: err.errors });
    return res.status(500).json({ error: err.message || String(err) });
  }
};

//DELETE USER
const deleteUser = async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

  try {
    if (prisma.user) {
      try {
        await prisma.user.delete({ where: { id } });
        return res.json({ message: "User deleted" });
      } catch (prismaErr) {
        if (prismaErr.code === 'P2025') {
          return res.status(404).json({ error: "User not found" });
        }
        throw prismaErr;
      }
    }

    // fallback in-memory
    const exists = users.some(u => u.id === id);
    if (!exists) return res.status(404).json({ error: "User not found" });
    users = users.filter(u => u.id !== id);
    return res.json({ message: "User deleted" });

  } catch (err) {
    console.error("ERROR EN DELETE USER:", err);
    return res.status(500).json({ error: err.message || String(err) });
  }
};

//GET PRODUCTS
const getProducts = async (req, res) => {
  try {
    if (hasPrismaProduct()) {
      const dbProducts = await prisma.product.findMany();
      return res.json(dbProducts);
    }
  } catch (err) {
    console.warn("Prisma product findMany failed, falling back:", err.message);
  }

  res.json(products);
};

//GET PRODUCTS by ID
const getProductsById = async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

  try {
    if (hasPrismaProduct()) {
      const product = await prisma.product.findUnique({ where: { id } });
      if (!product) return res.status(404).json({ error: "Product not found" });
      return res.json(product);
    }
  } catch (err) {
    console.warn("Prisma product findUnique failed, falling back:", err.message);
  }

  const product = products.find(p => p.id === id);
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
};

//POST PRODUCT
const createProducts = async (req, res) => {
  try {
    const parsed = ProductSchema.parse(req.body);

    if (hasPrismaProduct()) {
      const created = await prisma.product.create({ data: parsed });
      return res.status(201).json(created);
    }

    const newProduct = {
      id: products.length ? Math.max(...products.map(p => p.id)) + 1 : 1,
      ...parsed
    };
    products.push(newProduct);
    return res.status(201).json(newProduct);

  } catch (err) {
    console.error("ERROR CREATE PRODUCT:", err);
    if (err.errors) return res.status(400).json({ error: err.errors });
    return res.status(500).json({ error: err.message || String(err) });
  }
};

//PUT PRODUCT
const updateProducts = async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

  try {
    const parsed = ProductSchema.partial().parse(req.body);

    if (hasPrismaProduct()) {
      try {
        const updated = await prisma.product.update({
          where: { id },
          data: parsed
        });
        return res.json(updated);
      } catch (prismaErr) {
        if (prismaErr.code === 'P2025') return res.status(404).json({ error: "Product not found" });
        throw prismaErr;
      }
    }

    // fallback in-memory
    let product = products.find(p => p.id === id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    product = { ...product, ...parsed };
    products = products.map(p => (p.id === id ? product : p));
    return res.json(product);

  } catch (err) {
    console.error("ERROR UPDATE PRODUCT:", err);
    if (err.errors) return res.status(400).json({ error: err.errors });
    return res.status(500).json({ error: err.message || String(err) });
  }
};

//DELETE PRODUCT

const deleteProducts = async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

  try {
    if (hasPrismaProduct()) {
      try {
        await prisma.product.delete({ where: { id } });
        return res.json({ message: "Product deleted" });
      } catch (prismaErr) {
        if (prismaErr.code === 'P2025') return res.status(404).json({ error: "Product not found" });
        throw prismaErr;
      }
    }

    // fallback in-memory
    const exists = products.some(p => p.id === id);
    if (!exists) return res.status(404).json({ error: "Product not found" });
    products = products.filter(p => p.id !== id);
    return res.json({ message: "Product deleted" });

  } catch (err) {
    console.error("ERROR DELETE PRODUCT:", err);
    return res.status(500).json({ error: err.message || String(err) });
  }
};


module.exports = {
    getHello,
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getProducts,
    getProductsById,
    createProducts,
    updateProducts,
    deleteProducts
};
