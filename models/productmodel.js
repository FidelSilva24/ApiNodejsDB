const { z } = require("zod");

const ProductSchema = z.object({
    name: z.string().min(2, "Name must have at least 2 characters"),
    brand: z.string().min(2),
    price: z.number().int().positive(),
    stock: z.number().int().positive("Price must be a positive number")

});

module.exports = ProductSchema;