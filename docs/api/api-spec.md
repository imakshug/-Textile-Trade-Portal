# API Documentation - Textile Trade Portal

## Base URL
- Development: `http://localhost:3001/api/v1`
- Production: `https://api.textiletradeportal.com/v1`

## Authentication
- **Type**: JWT Bearer Token
- **Header**: `Authorization: Bearer <token>`
- **Token Expiry**: 24 hours (configurable)

## Common Response Format
```json
{
  "success": boolean,
  "message": string,
  "data": object | array | null,
  "meta": {
    "timestamp": "ISO_8601_date",
    "requestId": "uuid"
  }
}
```

## Error Response Format
```json
{
  "success": false,
  "message": "Error description",
  "error": {
    "code": "ERROR_CODE",
    "details": "Detailed error message"
  },
  "meta": {
    "timestamp": "ISO_8601_date",
    "requestId": "uuid"
  }
}
```

---

## 1. Authentication Endpoints

### POST /auth/register
Register a new user

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "phone": "+91XXXXXXXXXX",
  "role": "manufacturer" | "buyer",
  "companyName": "Company Name", // Required for manufacturers
  "gstin": "GSTIN_NUMBER" // Required for manufacturers
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful. Please verify your email.",
  "data": {
    "userId": "user_id",
    "email": "user@example.com",
    "role": "manufacturer",
    "isVerified": false
  }
}
```

### POST /auth/login
User login

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "jwt_token",
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "role": "manufacturer",
      "isVerified": true
    }
  }
}
```

### POST /auth/verify-email
Verify email with OTP

**Request Body:**
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

### POST /auth/forgot-password
Request password reset

### POST /auth/reset-password
Reset password with token

---

## 2. User Management Endpoints

### GET /users/profile
Get current user profile

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "role": "manufacturer"
    },
    "profile": {
      // Role-specific profile data
    }
  }
}
```

### PUT /users/profile
Update user profile

### POST /users/upload-documents
Upload verification documents (manufacturers only)

---

## 3. Product Management Endpoints

### GET /products
Get products with filtering and pagination

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20, max: 100)
- `category`: Category ID
- `material`: Material type
- `color`: Color filter
- `minPrice`: Minimum price per meter
- `maxPrice`: Maximum price per meter
- `manufacturer`: Manufacturer ID
- `search`: Search query
- `sortBy`: Sort field (price, name, createdAt)
- `sortOrder`: asc | desc

**Response:**
```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "product_id",
        "name": "Product Name",
        "description": "Product description",
        "category": {
          "id": "category_id",
          "name": "Category Name"
        },
        "manufacturer": {
          "id": "manufacturer_id",
          "companyName": "Company Name",
          "isVerified": true
        },
        "specifications": {
          "material": "Cotton",
          "weight": 150,
          "width": 44
        },
        "pricing": {
          "pricePerMeter": 125.50,
          "minOrderQuantity": 100
        },
        "colors": [
          {
            "colorName": "Red",
            "colorCode": "#FF0000",
            "availability": true
          }
        ],
        "images": [
          {
            "url": "image_url",
            "isMain": true
          }
        ]
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "totalPages": 8
    }
  }
}
```

### GET /products/:id
Get single product details

### POST /products
Create new product (manufacturers only)

**Request Body:**
```json
{
  "name": "Product Name",
  "description": "Product description",
  "categoryId": "category_id",
  "specifications": {
    "material": "Cotton",
    "weight": 150,
    "width": 44,
    "composition": "100% Cotton",
    "finish": "Matt",
    "pattern": "Plain"
  },
  "pricing": {
    "pricePerMeter": 125.50,
    "minOrderQuantity": 100,
    "maxOrderQuantity": 10000
  },
  "inventory": {
    "totalStock": 5000,
    "availableStock": 5000
  },
  "colors": [
    {
      "colorName": "Red",
      "colorCode": "#FF0000",
      "stockQuantity": 1000
    }
  ],
  "gstRate": 12
}
```

### PUT /products/:id
Update product (manufacturers only)

### DELETE /products/:id
Delete product (manufacturers only)

### POST /products/:id/images
Upload product images

---

## 4. Category Endpoints

### GET /categories
Get all categories

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "category_id",
      "name": "Cotton Fabrics",
      "description": "All types of cotton fabrics",
      "parentCategory": null,
      "subcategories": [
        {
          "id": "subcategory_id",
          "name": "Printed Cotton"
        }
      ]
    }
  ]
}
```

### GET /categories/:id
Get category details

---

## 5. Quotation Endpoints

### POST /quotations
Create quotation request (buyers only)

**Request Body:**
```json
{
  "productId": "product_id",
  "requirements": {
    "quantity": 500,
    "colors": ["Red", "Blue"],
    "deliveryLocation": "Mumbai, Maharashtra",
    "expectedDeliveryDate": "2025-08-15"
  },
  "notes": "Urgent requirement for export order"
}
```

### GET /quotations
Get quotations (filtered by user role)

**Query Parameters:**
- `status`: pending | quoted | accepted | rejected
- `page`: Page number
- `limit`: Items per page

### GET /quotations/:id
Get quotation details

### PUT /quotations/:id/respond
Respond to quotation (manufacturers only)

**Request Body:**
```json
{
  "quotedPrice": 120.00,
  "deliveryTime": "15-20 days",
  "validTill": "2025-08-10",
  "notes": "Price includes GST. Delivery to Mumbai port."
}
```

### PUT /quotations/:id/accept
Accept quotation (buyers only)

### PUT /quotations/:id/reject
Reject quotation

---

## 6. Admin Endpoints

### GET /admin/manufacturers/pending
Get pending manufacturer verifications

### PUT /admin/manufacturers/:id/verify
Verify manufacturer

**Request Body:**
```json
{
  "status": "approved" | "rejected",
  "notes": "Verification notes"
}
```

### GET /admin/products/flagged
Get flagged products for moderation

### GET /admin/analytics/dashboard
Get admin dashboard analytics

---

## 7. Notification Endpoints

### GET /notifications
Get user notifications

### PUT /notifications/:id/read
Mark notification as read

### PUT /notifications/mark-all-read
Mark all notifications as read

---

## Status Codes

- **200**: Success
- **201**: Created
- **400**: Bad Request
- **401**: Unauthorized
- **403**: Forbidden
- **404**: Not Found
- **422**: Validation Error
- **500**: Internal Server Error

## Rate Limiting

- **General APIs**: 100 requests per minute per IP
- **Authentication APIs**: 5 requests per minute per IP
- **Search APIs**: 50 requests per minute per IP
