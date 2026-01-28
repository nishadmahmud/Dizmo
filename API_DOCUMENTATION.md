# Dizmo E-Commerce Platform - API Documentation

**Base URL:** `https://www.outletexpense.xyz/api`  
**Store ID:** `265` (configured via `NEXT_PUBLIC_STORE_ID`)

---

## Table of Contents

1. [Environment Variables](#environment-variables)
2. [Authentication APIs](#authentication-apis)
3. [Product APIs](#product-apis)
4. [Category APIs](#category-apis)
5. [Order & Checkout APIs](#order--checkout-apis)
6. [Blog APIs](#blog-apis)
7. [Banner & Slider APIs](#banner--slider-apis)
8. [Offer APIs](#offer-apis)
9. [Brand APIs](#brand-apis)
10. [Profile & Customer APIs](#profile--customer-apis)
11. [Common Response Structures](#common-response-structures)

---

## Environment Variables

The following environment variables are used throughout the application:

```env
NEXT_PUBLIC_API_BASE_URL=https://www.outletexpense.xyz/api
NEXT_PUBLIC_STORE_ID=265

# Product Endpoints
NEXT_PUBLIC_ENDPOINT_PRODUCTS=/latest-ecommerce-product-list
NEXT_PUBLIC_ENDPOINT_PRODUCT_DETAIL=/public/products-detail
NEXT_PUBLIC_ENDPOINT_CATEGORY_PRODUCTS=/latest-ecommerce-category-product

# Category Endpoints
NEXT_PUBLIC_ENDPOINT_CATEGORIES=/latest-ecommerce-category-list

# Offer Endpoints
NEXT_PUBLIC_ENDPOINT_NEW_ARRIVALS=/latest-ecommerce-new-arrival-list
NEXT_PUBLIC_ENDPOINT_BEST_DEALS=/latest-ecommerce-best-deal-list
NEXT_PUBLIC_ENDPOINT_BEST_SELLERS=/latest-ecommerce-best-seller-list

# Brand Endpoints
NEXT_PUBLIC_ENDPOINT_BRAND_PRODUCTS=/latest-ecommerce-brand-product

# Banner & Slider Endpoints
NEXT_PUBLIC_ENDPOINT_BANNERS=/get-banners
NEXT_PUBLIC_ENDPOINT_SLIDERS=/get-sliders

# Blog Endpoints
NEXT_PUBLIC_ENDPOINT_BLOGS=/latest-ecommerce-blog-list
```

---

## Authentication APIs

### 1. Customer Login

**Endpoint:** `POST /customer-login`

**Description:** Authenticates a customer and returns a JWT token.

**Request Body:**
```json
{
  "email": "customer@example.com",
  "password": "password123",
  "user_id": "265"
}
```

**Response (Success):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "customer": {
    "id": 123,
    "first_name": "John",
    "last_name": "Doe",
    "email": "customer@example.com",
    "phone": "01712345678",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

**Usage Location:** `context/AuthContext.js`

---

### 2. Customer Registration

**Endpoint:** `POST /customer-registration`

**Description:** Creates a new customer account.

**Request Body:**
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "phone": "01712345678",
  "email": "customer@example.com",
  "password": "password123",
  "user_id": "265"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Registration successful",
  "customer": {
    "id": 123,
    "first_name": "John",
    "last_name": "Doe",
    "email": "customer@example.com",
    "phone": "01712345678"
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Email already exists"
}
```

**Usage Location:** `app/register/page.js`

---

## Product APIs

### 3. Get All Products

**Endpoint:** `GET /latest-ecommerce-product-list/{storeId}`

**Description:** Retrieves all products for the store with enhanced brand data.

**Request:**
```
GET https://www.outletexpense.xyz/api/latest-ecommerce-product-list/265
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 86065,
      "name": "iPhone 17 Pro Max",
      "retails_price": "184000.00",
      "discount": "0",
      "discount_type": "Percentage",
      "status": "In stock",
      "image_path": "https://www.outletexpense.xyz/uploads/...",
      "brand_name": "Apple",
      "brand_id": 1,
      "current_stock": 10,
      "slug": "iphone-17-pro-max",
      "brands": {
        "id": 1,
        "name": "Apple"
      },
      "review_summary": {
        "average_rating": "4.5",
        "total_reviews": 12
      },
      "imeis": [
        {
          "id": 1,
          "sale_price": "184000.00",
          "color": "Desert Titanium",
          "color_code": "#C5B097",
          "storage": "256GB",
          "region": "SIM+eSim AUS",
          "battery_life": "Brand New",
          "image_path": "https://..."
        }
      ]
    }
  ]
}
```

**Usage Location:** `context/ProductContext.js`

---

### 4. Get Product Detail

**Endpoint:** `GET /public/products-detail/{productId}`

**Description:** Retrieves detailed information for a specific product.

**Request:**
```
GET https://www.outletexpense.xyz/api/public/products-detail/86065
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 86065,
    "name": "iPhone 17 Pro Max",
    "retails_price": "184000.00",
    "selling_price": "184000.00",
    "discount": "0",
    "discount_type": "Percentage",
    "status": "In stock",
    "warranty": "Official Warranty",
    "description": "Product description here...",
    "short_description": "Brief description",
    "image_path": "https://...",
    "brand_name": "Apple",
    "brand_id": 1,
    "current_stock": 10,
    "slug": "iphone-17-pro-max",
    "images": [
      "https://...",
      "https://..."
    ],
    "specifications": {
      "Display": "6.7 inch",
      "Processor": "A18 Pro",
      "RAM": "8GB"
    },
    "imeis": [
      {
        "id": 1,
        "sale_price": "184000.00",
        "color": "Desert Titanium",
        "color_code": "#C5B097",
        "storage": "256GB",
        "region": "SIM+eSim AUS",
        "battery_life": "Brand New",
        "image_path": "https://..."
      }
    ],
    "review_summary": {
      "average_rating": "4.5",
      "total_reviews": 12
    }
  }
}
```

**Usage Location:** `app/products/[id]/page.js`, `components/CompareClient.js`

---

### 5. Get Category Products (Paginated)

**Endpoint:** `GET /latest-ecommerce-category-product/{categoryId}?page={page}&limit={limit}`

**Description:** Retrieves products for a specific category with pagination support.

**Request:**
```
GET https://www.outletexpense.xyz/api/latest-ecommerce-category-product/7822?page=1&limit=20
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 86065,
      "name": "iPhone 17 Pro Max",
      "retails_price": "184000.00",
      "discount": "0",
      "discount_type": "Percentage",
      "status": "In stock",
      "image_path": "https://...",
      "brand_name": "Apple",
      "brand_id": 1,
      "current_stock": 10,
      "imeis": [...],
      "review_summary": {
        "average_rating": "4.5",
        "total_reviews": 12
      }
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 5,
    "total_items": 100
  }
}
```

**Usage Location:** `app/categories/[slug]/page.js`, `context/ProductContext.js`, `components/Navbar.js`, `components/ProductsContent.js`

---

## Category APIs

### 6. Get All Categories

**Endpoint:** `GET /latest-ecommerce-category-list/{storeId}`

**Description:** Retrieves all product categories for the store.

**Request:**
```
GET https://www.outletexpense.xyz/api/latest-ecommerce-category-list/265
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "category_id": 7822,
      "user_id": 265,
      "name": "Phones",
      "image_url": "https://www.outletexpense.xyz/uploads/265-Dizmo/1765608315_693d0b7b9e5d6.png",
      "banner": null,
      "slug": "phones",
      "created_at": "2024-01-01T00:00:00.000Z"
    },
    {
      "category_id": 7823,
      "name": "Tablet",
      "image_url": "https://...",
      "slug": "tablet"
    }
  ]
}
```

**Usage Location:** `app/categories/page.js`, `app/categories/[slug]/page.js`, `app/products/[id]/page.js`, `context/ProductContext.js`, `components/Navbar.js`, `components/CategoryIcons.js`, `components/ProductsContent.js`

---

## Order & Checkout APIs

### 7. Save Sales Order

**Endpoint:** `POST /public/ecommerce-save-sales`

**Description:** Creates a new sales order (checkout).

**Request Body:**
```json
{
  "products": [
    {
      "id": 86065,
      "name": "iPhone 17 Pro Max",
      "quantity": 1,
      "price": 184000,
      "imei_id": 1,
      "variant": {
        "color": "Desert Titanium",
        "storage": "256GB",
        "region": "SIM+eSim AUS"
      }
    }
  ],
  "customer_name": "John Doe",
  "customer_phone": "01712345678",
  "customer_email": "customer@example.com",
  "customer_address": "123 Main St, Dhaka",
  "delivery_area": "Dhaka",
  "payment_method": "Cash on Delivery",
  "subtotal": 184000,
  "delivery_fee": 60,
  "total": 184060,
  "variants": [],
  "imeis": [null],
  "created_at": "2024-12-31T13:18:27.000Z",
  "customer_id": null,
  "sales_id": 265,
  "wholeseller_id": 1,
  "status": 3
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Order placed successfully",
  "data": {
    "invoice_id": "INV-2024-001",
    "order_id": 12345,
    "total": 184060
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Failed to place order"
}
```

**Usage Location:** `app/checkout/page.js`

---

### 8. Track Order

**Endpoint:** `POST /public/track-order`

**Description:** Retrieves order status by invoice ID or phone number.

**Request Body:**
```json
{
  "invoice_id": "INV-2024-001",
  "phone": "01712345678"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "invoice_id": "INV-2024-001",
    "status": "Processing",
    "created_at": "2024-12-31T13:18:27.000Z",
    "total": 184060,
    "products": [...]
  }
}
```

**Usage Location:** `app/track-order/page.js`

---

## Profile & Customer APIs

### 9. Get Customer Orders

**Endpoint:** `POST /customer-order-list`

**Description:** Retrieves order history for authenticated customer.

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "customer_id": 123
}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "invoice_id": "INV-2024-001",
      "order_id": 12345,
      "total": 184060,
      "status": "Delivered",
      "created_at": "2024-12-31T13:18:27.000Z",
      "products": [...]
    }
  ]
}
```

**Usage Location:** `app/profile/page.js`

---

### 10. Update Customer Profile

**Endpoint:** `POST /customer/update-profile`

**Description:** Updates customer profile information.

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "customer_id": 123,
  "first_name": "John",
  "last_name": "Doe",
  "phone": "01712345678",
  "email": "customer@example.com",
  "address": "123 Main St, Dhaka"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "customer": {
    "id": 123,
    "first_name": "John",
    "last_name": "Doe",
    "email": "customer@example.com",
    "phone": "01712345678",
    "address": "123 Main St, Dhaka"
  }
}
```

**Usage Location:** `app/profile/page.js`

---

## Blog APIs

### 11. Get All Blogs

**Endpoint:** `GET /latest-ecommerce-blog-list/{storeId}`

**Description:** Retrieves all blog posts for the store.

**Request:**
```
GET https://www.outletexpense.xyz/api/latest-ecommerce-blog-list/265
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Top 10 Smartphones of 2024",
      "slug": "top-10-smartphones-2024",
      "excerpt": "Discover the best smartphones...",
      "content": "Full blog content here...",
      "image": "https://...",
      "author": "Admin",
      "created_at": "2024-12-01T00:00:00.000Z",
      "category": "Tech News"
    }
  ]
}
```

**Usage Location:** `app/blog/page.js`, `app/blog/[id]/page.js`, `components/BlogSection.js`

---

## Banner & Slider APIs

### 12. Get Banners

**Endpoint:** `GET /get-banners/{storeId}`

**Description:** Retrieves promotional banners for the store.

**Request:**
```
GET https://www.outletexpense.xyz/api/get-banners/265
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Summer Sale",
      "image": "https://...",
      "link": "/offers/summer-sale",
      "position": "hero",
      "active": true
    }
  ]
}
```

**Usage Location:** `components/HeroSection.js`, `components/FullWidthBanner.js`, `components/PromoBanners.js`

---

### 13. Get Sliders

**Endpoint:** `GET /get-sliders/{storeId}`

**Description:** Retrieves hero slider images.

**Request:**
```
GET https://www.outletexpense.xyz/api/get-sliders/265
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "image": "https://...",
      "title": "New iPhone 17 Pro",
      "subtitle": "Pre-order now",
      "link": "/products/86065",
      "order": 1
    }
  ]
}
```

**Usage Location:** `components/HeroSection.js`

---

## Offer APIs

### 14. Get New Arrivals

**Endpoint:** `GET /latest-ecommerce-new-arrival-list/{storeId}`

**Description:** Retrieves newly added products.

**Request:**
```
GET https://www.outletexpense.xyz/api/latest-ecommerce-new-arrival-list/265
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 86065,
      "name": "iPhone 17 Pro Max",
      "retails_price": "184000.00",
      "discounted_price": "184000.00",
      "discount": "0",
      "discount_rate": "0",
      "status": "In stock",
      "image_path": "https://...",
      "brand_name": "Apple",
      "category_id": 7822,
      "imeis": [...],
      "review_summary": {...}
    }
  ]
}
```

**Usage Location:** `context/ProductContext.js`, `components/OfferTabs.js`, `components/NewArrivals.js`

---

### 15. Get Best Deals

**Endpoint:** `GET /latest-ecommerce-best-deal-list/{storeId}`

**Description:** Retrieves products with the best discounts.

**Request:**
```
GET https://www.outletexpense.xyz/api/latest-ecommerce-best-deal-list/265
```

**Response:** Same structure as New Arrivals

**Usage Location:** `context/ProductContext.js`, `components/OfferTabs.js`, `components/FlashSale.js`

---

### 16. Get Best Sellers

**Endpoint:** `GET /latest-ecommerce-best-seller-list/{storeId}`

**Description:** Retrieves top-selling products.

**Request:**
```
GET https://www.outletexpense.xyz/api/latest-ecommerce-best-seller-list/265
```

**Response:** Same structure as New Arrivals

**Usage Location:** `context/ProductContext.js`, `components/OfferTabs.js`, `components/FeaturedProducts.js`, `components/TrendingProducts.js`

---

### 17. Get Offers List

**Endpoint:** `GET /latest-ecommerce-offer-list/{storeId}`

**Description:** Retrieves all active promotional offers.

**Request:**
```
GET https://www.outletexpense.xyz/api/latest-ecommerce-offer-list/265
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Flash Sale - Up to 50% Off",
      "description": "Limited time offer...",
      "discount_percentage": 50,
      "start_date": "2024-12-01T00:00:00.000Z",
      "end_date": "2024-12-31T23:59:59.000Z",
      "image": "https://...",
      "products": [...]
    }
  ]
}
```

**Usage Location:** `app/offers/page.js`, `app/offers/[id]/page.js`

---

## Brand APIs

### 18. Get Brand Products

**Endpoint:** `GET /latest-ecommerce-brand-product/{brandId}`

**Description:** Retrieves all products for a specific brand.

**Request:**
```
GET https://www.outletexpense.xyz/api/latest-ecommerce-brand-product/1
```

**Response:** Same structure as Category Products

**Usage Location:** `components/BrandShowcase.js`

---

## Common Response Structures

### Success Response
```json
{
  "success": true,
  "data": {...},
  "message": "Optional success message"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": {
    "field_name": ["Validation error message"]
  }
}
```

### Pagination Response
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "current_page": 1,
    "total_pages": 10,
    "total_items": 200,
    "per_page": 20
  }
}
```

---

## Product Data Structure

### Standard Product Object
```typescript
{
  id: number;
  name: string;
  retails_price: string;        // Original price
  selling_price?: string;       // Discounted price (if applicable)
  discount: string;             // Discount value
  discount_type: "Percentage" | "Fixed";
  status: "In stock" | "Out of stock";
  image_path: string;
  brand_name: string;
  brand_id?: number;
  current_stock: number;
  slug?: string;
  warranty?: string;
  description?: string;
  short_description?: string;
  images?: string[];            // Additional product images
  specifications?: object;      // Product specs (key-value pairs)
  imeis: Array<{               // Product variants
    id: number;
    sale_price: string;
    color: string;
    color_code: string;
    storage: string;
    region: string;
    battery_life: string;
    image_path: string;
  }>;
  review_summary?: {
    average_rating: string;
    total_reviews: number;
  };
  brands?: {                   // Enhanced brand data (from products endpoint)
    id: number;
    name: string;
  };
}
```

---

## Authentication Flow

1. **Login:**
   - User submits email/password
   - API returns JWT token + customer data
   - Token stored in `localStorage` as `dizmo_token`
   - Customer data stored as `dizmo_user`

2. **Authenticated Requests:**
   - Include token in Authorization header:
     ```
     Authorization: Bearer {token}
     ```

3. **Logout:**
   - Remove `dizmo_token` and `dizmo_user` from localStorage
   - Redirect to login page

---

## Error Handling

All API calls should handle the following scenarios:

1. **Network Errors:**
   ```javascript
   try {
     const response = await fetch(url);
     if (!response.ok) throw new Error('Network error');
   } catch (error) {
     console.error('API Error:', error);
   }
   ```

2. **Invalid JSON Response:**
   ```javascript
   const contentType = response.headers.get('content-type');
   if (!contentType || !contentType.includes('application/json')) {
     throw new Error('Server error');
   }
   ```

3. **API-Level Errors:**
   ```javascript
   const data = await response.json();
   if (!data.success) {
     throw new Error(data.message || 'Operation failed');
   }
   ```

---

## Rate Limiting

- No explicit rate limiting is currently enforced
- Recommended: Implement debouncing for search queries
- Background fetching uses chunked requests (3 categories at a time)

---

## Caching Strategy

### Client-Side Caching:
1. **ProductContext:** Caches all products in memory
2. **Navbar Brands:** Cached in localStorage (`dizmo_brands_cache`)
3. **Categories:** Fetched on-demand, no persistent cache

### Server-Side Caching:
- Product detail pages: `cache: 'no-store'` (always fresh)
- Category pages: Dynamic, no caching

---

## Notes

1. **Store ID:** All requests require the store ID (265 for Dizmo)
2. **Pagination:** Category products support pagination with `page` and `limit` params
3. **Brand Detection:** Products without `category_id` use brand-based detection
4. **Price Calculation:** Lowest IMEI price is used as the display price
5. **Image Optimization:** Use Next.js Image component with `unoptimized` prop for external URLs

---

**Last Updated:** December 31, 2024  
**Version:** 1.0.0
