const { z } = require("zod");

console.log("CARGANDO USER MODEL DESDE:", __filename);

const UserSchema = z.object({
    name: z.string().min(2, "Name must have at least 2 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(2, "Age must be a positive number")
});

console.log("SCHEMA DEFINIDO ES:", UserSchema);

module.exports = UserSchema;
