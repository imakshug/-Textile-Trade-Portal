# Database Schema Design - Textile Trade Portal

## Entity Relationship Overview

### Core Entities
1. **Users** (Base entity for all user types)
2. **Manufacturers** (Extends Users)
3. **Buyers** (Extends Users) 
4. **Admins** (Extends Users)
5. **Products**
6. **Categories**
7. **Quotations**
8. **Notifications**
9. **Reviews** (Future implementation)

## Detailed Schema

### 1. Users Collection
```javascript
{
  _id: ObjectId,
  email: String (unique, required),
  password: String (hashed),
  phone: String,
  role: Enum['manufacturer', 'buyer', 'admin'],
  isVerified: Boolean (default: false),
  isActive: Boolean (default: true),
  emailVerifiedAt: Date,
  phoneVerifiedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### 2. Manufacturers Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  companyName: String (required),
  businessType: String,
  gstin: String (required, unique),
  panNumber: String,
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    pincode: String
  },
  contactPerson: {
    name: String,
    designation: String,
    phone: String,
    email: String
  },
  documents: [{
    type: Enum['gst_certificate', 'pan_card', 'company_registration', 'other'],
    fileName: String,
    fileUrl: String,
    uploadedAt: Date,
    verificationStatus: Enum['pending', 'approved', 'rejected']
  }],
  verificationStatus: Enum['pending', 'approved', 'rejected'],
  verifiedAt: Date,
  verifiedBy: ObjectId (ref: Users),
  rating: Number (default: 0),
  totalReviews: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

### 3. Buyers Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  companyName: String,
  businessType: String,
  gstin: String,
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    pincode: String
  },
  preferences: {
    interestedCategories: [ObjectId] (ref: Categories),
    priceRange: {
      min: Number,
      max: Number
    }
  },
  createdAt: Date,
  updatedAt: Date
}
```

### 4. Categories Collection
```javascript
{
  _id: ObjectId,
  name: String (required, unique),
  description: String,
  parentCategory: ObjectId (ref: Categories), // For subcategories
  isActive: Boolean (default: true),
  sortOrder: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### 5. Products Collection
```javascript
{
  _id: ObjectId,
  manufacturerId: ObjectId (ref: Manufacturers, required),
  name: String (required),
  description: String,
  category: ObjectId (ref: Categories, required),
  specifications: {
    material: String (required), // Cotton, Silk, Polyester, etc.
    weight: Number, // GSM
    width: Number, // in cm
    composition: String, // Material composition
    finish: String, // Matt, Glossy, etc.
    pattern: String, // Plain, Printed, Embroidered
    usage: String // Apparel, Home textile, etc.
  },
  pricing: {
    pricePerMeter: Number (required),
    currency: String (default: 'INR'),
    minOrderQuantity: Number (required),
    maxOrderQuantity: Number
  },
  inventory: {
    totalStock: Number (required),
    availableStock: Number (required),
    unit: String (default: 'meters')
  },
  colors: [{
    colorName: String,
    colorCode: String, // Hex code
    availability: Boolean,
    stockQuantity: Number
  }],
  images: [{
    url: String,
    alt: String,
    isMain: Boolean,
    sortOrder: Number
  }],
  compliance: [{
    certificateType: String, // OEKO-TEX, GOTS, etc.
    certificateNumber: String,
    fileUrl: String,
    validTill: Date
  }],
  gstRate: Number (required),
  isActive: Boolean (default: true),
  featured: Boolean (default: false),
  tags: [String], // For search optimization
  seoMetadata: {
    title: String,
    description: String,
    keywords: [String]
  },
  createdAt: Date,
  updatedAt: Date
}
```

### 6. Quotations Collection
```javascript
{
  _id: ObjectId,
  quotationNumber: String (unique, auto-generated),
  buyerId: ObjectId (ref: Buyers, required),
  manufacturerId: ObjectId (ref: Manufacturers, required),
  productId: ObjectId (ref: Products, required),
  requirements: {
    quantity: Number (required),
    unit: String (default: 'meters'),
    colors: [String],
    specifications: Object, // Any specific requirements
    deliveryLocation: String,
    expectedDeliveryDate: Date
  },
  buyerNotes: String,
  status: Enum['pending', 'quoted', 'accepted', 'rejected', 'expired'],
  manufacturerResponse: {
    quotedPrice: Number,
    totalAmount: Number,
    gstAmount: Number,
    finalAmount: Number,
    deliveryTime: String,
    validTill: Date,
    notes: String,
    respondedAt: Date
  },
  expiresAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### 7. Notifications Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users, required),
  type: Enum['quotation_request', 'quotation_response', 'verification_update', 'system_alert'],
  title: String,
  message: String,
  data: Object, // Additional context data
  isRead: Boolean (default: false),
  readAt: Date,
  createdAt: Date
}
```

### 8. Reviews Collection (Future)
```javascript
{
  _id: ObjectId,
  reviewerId: ObjectId (ref: Buyers, required),
  manufacturerId: ObjectId (ref: Manufacturers, required),
  quotationId: ObjectId (ref: Quotations),
  rating: Number (1-5, required),
  review: String,
  isVerified: Boolean (default: false),
  moderationStatus: Enum['pending', 'approved', 'rejected'],
  createdAt: Date,
  updatedAt: Date
}
```

## Indexes for Performance

### Products Collection Indexes
```javascript
// Compound indexes for efficient filtering
db.products.createIndex({ "category": 1, "isActive": 1 })
db.products.createIndex({ "specifications.material": 1, "isActive": 1 })
db.products.createIndex({ "pricing.pricePerMeter": 1, "isActive": 1 })
db.products.createIndex({ "manufacturerId": 1, "isActive": 1 })
db.products.createIndex({ "tags": 1, "isActive": 1 })

// Text index for search
db.products.createIndex({ 
  "name": "text", 
  "description": "text", 
  "tags": "text" 
})
```

### Other Important Indexes
```javascript
// Users
db.users.createIndex({ "email": 1 })
db.users.createIndex({ "role": 1, "isActive": 1 })

// Manufacturers
db.manufacturers.createIndex({ "gstin": 1 })
db.manufacturers.createIndex({ "verificationStatus": 1 })

// Quotations
db.quotations.createIndex({ "buyerId": 1, "status": 1 })
db.quotations.createIndex({ "manufacturerId": 1, "status": 1 })
db.quotations.createIndex({ "status": 1, "expiresAt": 1 })
```
