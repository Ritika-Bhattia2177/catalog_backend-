# E-commerce Product Catalog API

A professional Node.js, Express, and MongoDB backend API for an e-commerce product catalog with authentication, CRUD operations, validation, and filtering.

## Features

- User registration and login
- JWT authentication
- Protected routes
- Full product CRUD
- MongoDB integration with Mongoose
- Request validation
- Basic logging and centralized error handling
- Filtering, sorting, and pagination for products

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Express Validator

## Project Structure

- src/config: database connection
- src/controllers: request handlers
- src/middleware: logging, auth, validation, error handling
- src/models: Mongoose schemas
- src/routes: API routes
- src/utils: reusable helpers

## Setup

1. Install dependencies:
   - npm install

2. Create a .env file from .env.example

3. Add your MongoDB connection string and JWT secret

4. Start the server:
   - npm run dev

## Environment Variables

- PORT
- MONGODB_URI
- JWT_SECRET
- JWT_EXPIRES_IN
- NODE_ENV

## API Endpoints

### Auth

- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me  [protected]

### Products

- GET /api/products
- GET /api/products/:id
- POST /api/products  [protected]
- PUT /api/products/:id  [protected]
- PATCH /api/products/:id  [protected]
- DELETE /api/products/:id  [protected]

## Product Query Options

Use these query params on GET /api/products:

- search=phone
- category=electronics
- minPrice=100
- maxPrice=500
- inStock=true
- sort=price or sort=-price or sort=-createdAt
- page=1
- limit=10

## Authentication Flow

1. Register a user with /api/auth/register
2. Login with /api/auth/login
3. Copy the JWT token from the response
4. Send it in the Authorization header:
   - Bearer <token>
5. Access protected routes like product create/update/delete

## Postman Testing

### Register

- Method: POST
- URL: http://localhost:5000/api/auth/register
- Body:
  {
    "name": "Ritika",
    "email": "ritika@example.com",
    "password": "123456"
  }

### Login

- Method: POST
- URL: http://localhost:5000/api/auth/login
- Body:
  {
    "email": "ritika@example.com",
    "password": "123456"
  }

### Create Product

- Method: POST
- URL: http://localhost:5000/api/products
- Headers:
  Authorization: Bearer <token>
- Body:
  {
    "name": "Wireless Mouse",
    "description": "A smooth and responsive wireless mouse for daily use.",
    "price": 799,
    "category": "electronics",
    "stock": 25,
    "imageUrl": "https://example.com/mouse.jpg"
  }

## Viva Points

- Request flow: route -> controller -> model -> response
- Database flow: Mongoose schema -> validation -> CRUD -> MongoDB
- Authentication flow: login/register -> JWT token -> protected route check

## Deployment

This app can be deployed on Render, Railway, or any cloud platform. Set the environment variables in the hosting dashboard and connect your MongoDB Atlas cluster.
