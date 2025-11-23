# Node.js API — Express + Zod + Prisma + PostgreSQL

A modern and minimal API built with **Express.js**, **Zod validation**, **Prisma ORM**, and **PostgreSQL** (running locally or via Docker).  
This project is designed to reinforce backend fundamentals while showcasing industry-standard architecture and tooling.

----------

## ✨ Features

-   ⚡ Fast and lightweight **Express.js** server
    
-   🛡 Input validation using **Zod**
    
-   💾 **Prisma ORM** with auto migrations
    
-   🐘 **PostgreSQL** (local or Docker)
    
-   🗂 Clean architecture: Routes, Controllers, Schemas
    
-   🔧 Fully testable with Postman or cURL
    
-   🐳 Docker-ready for real backend deployments
    

----------

## 📁 Project Structure

/js\
 ├── controllers/\
 │    └── userController.js\
 ├── models/\
 │    ├── usermodel.js\
 │    └── productmodel.js\
 ├── prisma/\
 │    ├── schema.prisma\
 │    └── migrations/\
 ├── routes/\
 │    └── userRoutes.js\
 ├── data/\
 │    ├── users.js\
 │    └── products.js\
 ├── db.js\
 ├── app.js\
 └── package.json\ 

----------

# ⚙️ Installation & Setup

## 1️⃣ Clone the Repository

`git clone https://github.com/<YOUR_USERNAME>/<YOUR_REPO>.git cd js` 

## 2️⃣ Install Dependencies

`npm install` 

## 3️⃣ Environment Variables

Create a `.env` file:

`DATABASE_URL="postgresql://fidel:1234@localhost:5432/apinode?schema=public"` 

Adjust user/password to match your setup.

----------

# 🐘 PostgreSQL Setup

## Option A — Local PostgreSQL

`brew install postgresql
brew services start postgresql
createdb apinode` 

## Option B — Docker PostgreSQL + PgAdmin

Create a `docker-compose.yml`:

`version:  "3.9"  services:  postgres:  image:  postgres:16  environment:  POSTGRES_USER:  fidel  POSTGRES_PASSWORD:  1234  POSTGRES_DB:  apinode  ports:  -  "5432:5432"  volumes:  -  pgdata:/var/lib/postgresql/data  pgadmin:  image:  dpage/pgadmin4  environment:  PGADMIN_DEFAULT_EMAIL:  admin@example.com  PGADMIN_DEFAULT_PASSWORD:  admin123  ports:  -  "8080:80"  depends_on:  -  postgres  volumes:  pgdata:` 

Start the database:

`docker compose up -d` 

Access PgAdmin at:  
➡ `http://localhost:8080`

----------

# 🧬 Prisma ORM

### Run migrations:

`npx prisma migrate dev` 

### GUI database viewer:

`npx prisma studio` 

----------

# 🚀 Run the API

`npm run dev` 

Default URL:

`http://localhost:3000` 

----------

# 📡 API Endpoints

## 👤 USERS

### GET `/users`

Fetch all users.

### GET `/users/:id`

Fetch a user by ID.

### POST `/users`

Example:

`{  "name":  "example",  "email":  "example@example.com",  "password":  "1234"  }` 

### PUT `/users/:id`

Update a user.

### DELETE `/users/:id`

Delete a user.

----------

## 📦 PRODUCTS

### GET `/products`

Fetch all products.

### GET `/products/:id`

Fetch a product by ID.

### POST `/products`

Example:

`{  "name":  "Laptop",  "brand":  "Apple",  "price":  1200,  "stock":  5  }` 

### PUT `/products/:id`

Update a product.

### DELETE `/products/:id`

Delete a product.

----------

# 🛠 Tech Stack

-   Node.js
    
-   Express.js
    
-   Zod
    
-   Prisma ORM
    
-   PostgreSQL
    
-   Docker & Docker Compose
    
-   PgAdmin
    
-   Postman / Curl
    

----------

# 🧾 License

Free to use and modify for learning or portfolio purposes.

----------

# 👤 Author

**Fidel Silva**  
Backend Developer & Cloud Developer
