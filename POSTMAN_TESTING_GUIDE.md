# Postman Testing Guide - Step by Step

## Quick Setup

1. Download Postman from https://www.postman.com/downloads/
2. Open Postman
3. Import the `Postman_Collection.json` file from this project

OR manually follow the steps below:

---

## STEP 1: Register a New User

**Method:** POST  
**URL:** http://localhost:5000/api/auth/register

**Headers:**
```
Content-Type: application/json
```

**Body (select raw → JSON):**
```json
{
  "name": "Ritika",
  "email": "ritika@test.com",
  "password": "123456"
}
```

**Click Send**

**Response will be:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "69f2dcf3ef367edb06c8956e",
    "name": "Ritika",
    "email": "ritika@test.com"
  }
}
```

**IMPORTANT:** Copy the `token` value (the long string that looks like eyJhbGciOi...)

---

## STEP 2: Create a Product (using the token)

**Method:** POST  
**URL:** http://localhost:5000/api/products

**Headers:**
```
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Replace `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` with your actual token from Step 1.

**Body (select raw → JSON):**
```json
{
  "name": "Wireless Mouse",
  "description": "A smooth and responsive wireless mouse for daily use.",
  "price": 799,
  "category": "electronics",
  "stock": 25,
  "imageUrl": "https://example.com/mouse.jpg"
}
```

**Click Send**

**If it works, you will see:**
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "_id": "...",
    "name": "Wireless Mouse",
    "price": 799,
    "category": "electronics",
    "stock": 25,
    "createdAt": "2026-04-30T04:40:00.000Z"
  }
}
```

---

## STEP 3: Get All Products (No Token Needed)

**Method:** GET  
**URL:** http://localhost:5000/api/products

**Headers:** (none needed)

**Click Send**

**Response:**
```json
{
  "success": true,
  "count": 1,
  "total": 1,
  "page": 1,
  "pages": 1,
  "data": [
    {
      "_id": "...",
      "name": "Wireless Mouse",
      "price": 799,
      "category": "electronics",
      "stock": 25
    }
  ]
}
```

---

## TROUBLESHOOTING

### Issue: "Not authorized, token missing"

**Solution:** You forgot to add the `Authorization: Bearer` header.

Make sure you:
1. Register first to get a token
2. Copy the token completely
3. Add it to the header like this:
   ```
   Authorization: Bearer <your_token_here>
   ```
4. Replace `<your_token_here>` with your actual token

### Issue: "Invalid email or password"

**Solution:** Email already exists. Use a different email in registration:
```json
{
  "name": "Another User",
  "email": "another@test.com",
  "password": "123456"
}
```

### Issue: Connection refused / Server not running

**Solution:** Make sure your server is running:
```bash
npm run dev
```

---

## Other Endpoints

### Login (Get token without registering again)

**Method:** POST  
**URL:** http://localhost:5000/api/auth/login

**Body:**
```json
{
  "email": "ritika@test.com",
  "password": "123456"
}
```

### Get Current User (protected route)

**Method:** GET  
**URL:** http://localhost:5000/api/auth/me

**Headers:**
```
Authorization: Bearer <your_token>
```

### Update Product

**Method:** PUT  
**URL:** http://localhost:5000/api/products/<product_id>

**Headers:**
```
Content-Type: application/json
Authorization: Bearer <your_token>
```

**Body:**
```json
{
  "price": 899,
  "stock": 30
}
```

### Delete Product

**Method:** DELETE  
**URL:** http://localhost:5000/api/products/<product_id>

**Headers:**
```
Authorization: Bearer <your_token>
```

---

## Filter Products

**Method:** GET  
**URL:** http://localhost:5000/api/products?search=mouse&category=electronics&minPrice=100&maxPrice=1000&inStock=true&sort=-price&page=1&limit=10

**Query Parameters:**
- `search=mouse` — search in product name
- `category=electronics` — filter by category
- `minPrice=100` — minimum price
- `maxPrice=1000` — maximum price
- `inStock=true` — only products with stock > 0
- `sort=-price` — sort by price (descending)
- `sort=price` — sort by price (ascending)
- `sort=-createdAt` — newest first
- `page=1` — page number
- `limit=10` — items per page

---

## Common Error Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad request (validation error) |
| 401 | Unauthorized (token missing/invalid) |
| 404 | Not found |
| 500 | Server error |

Good luck!
