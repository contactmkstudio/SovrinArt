# API Service Documentation

## Overview
All API calls are centralized in `/src/api/apiService.js`. This file contains:
- Axios configuration with interceptors
- All API endpoints organized by feature
- Error handling

## Configuration

1. Set your API base URL in `.env`:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

2. The axios instance automatically:
   - Adds auth tokens from localStorage
   - Handles 401 errors (redirects to login)
   - Has a 10-second timeout

## Available APIs

### FAQ API (`faqApi`)
```javascript
import { faqApi } from '../api/apiService'

// Get all FAQs
const faqs = await faqApi.getAllFaqs()

// Get single FAQ
const faq = await faqApi.getFaqById(id)

// Create FAQ
const newFaq = await faqApi.createFaq({ question: '...', answer: '...' })

// Update FAQ
const updated = await faqApi.updateFaq(id, { question: '...', answer: '...' })

// Delete FAQ
await faqApi.deleteFaq(id)
```

### Product API (`productApi`)
```javascript
import { productApi } from '../api/apiService'

// Get all products
const products = await productApi.getAllProducts()

// Get single product
const product = await productApi.getProductById(id)

// Create product
const newProduct = await productApi.createProduct(productData)

// Update product
const updated = await productApi.updateProduct(id, productData)

// Delete product
await productApi.deleteProduct(id)
```

### Order API (`orderApi`)
```javascript
import { orderApi } from '../api/apiService'

// Get all orders
const orders = await orderApi.getAllOrders()

// Get single order
const order = await orderApi.getOrderById(id)

// Create order
const newOrder = await orderApi.createOrder(orderData)

// Update order status
const updated = await orderApi.updateOrderStatus(id, 'shipped')
```

### Contact API (`contactApi`)
```javascript
import { contactApi } from '../api/apiService'

// Submit contact form
const response = await contactApi.submitContactForm({
  name: '...',
  email: '...',
  reason: '...',
  message: '...'
})

// Get all contacts (admin)
const contacts = await contactApi.getAllContacts()
```

### Auth API (`authApi`)
```javascript
import { authApi } from '../api/apiService'

// Login
const response = await authApi.login({ email: '...', password: '...' })
// Token is automatically saved to localStorage

// Register
const user = await authApi.register({ name: '...', email: '...', password: '...' })

// Logout
authApi.logout()
// Removes token from localStorage

// Get current user
const user = await authApi.getCurrentUser()
```

## Usage Example (AddFaq.jsx)

```javascript
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { faqApi } from '../../api/apiService'

const AddFaq = () => {
  const { register, handleSubmit, reset } = useForm()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      await faqApi.createFaq(data)
      alert('FAQ added successfully!')
      reset()
    } catch (error) {
      alert('Error: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* form fields */}
      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  )
}
```

## Error Handling

All API functions automatically handle errors. You can catch them in your component:

```javascript
try {
  const result = await faqApi.createFaq(data)
  // Success
} catch (error) {
  if (error.response) {
    // Server responded with error
    console.log(error.response.data.message)
    console.log(error.response.status)
  } else if (error.request) {
    // No response from server
    console.log('Network error')
  } else {
    // Other error
    console.log(error.message)
  }
}
```

## Adding New API Endpoints

To add a new API endpoint, edit `/src/api/apiService.js`:

```javascript
export const yourApi = {
  yourMethod: async (params) => {
    try {
      const response = await apiClient.get('/your-endpoint')
      return response.data
    } catch (error) {
      throw error
    }
  },
}
```

## Authentication

The axios instance automatically:
1. Adds `Authorization: Bearer <token>` header to all requests
2. Redirects to `/login` on 401 errors
3. Stores/removes tokens via `authApi.login()` and `authApi.logout()`

Token is stored in `localStorage` with key `authToken`.
