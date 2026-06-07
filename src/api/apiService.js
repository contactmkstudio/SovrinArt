import axios from 'axios'

// Base API configuration
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const API_BASE_URL = 'http://192.168.0.106:8000/api/'

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, 
})

// Request interceptor (for adding auth tokens, etc.)
apiClient.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor (for handling errors globally)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response?.data)
      
      // Handle specific status codes
      if (error.response.status === 401) {
        // Unauthorized - clear token and redirect to login
        localStorage.removeItem('authToken')
        window.location.href = '/login'
      }
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.request)
    } else {
      // Something else happened
      console.error('Error:', error?.message)
    }
    return Promise.reject(error)
  }
)

// ======================
// FAQ API ENDPOINTS
// ======================

export const faqApi = {
  // Get all FAQs
  getAllFaqs: async () => {
    try {
      const response = await apiClient.get('core/faqs')
      return response.data
    } catch (error) {
      throw error
    }
  },


  // Create new FAQ
  createFaq: async (faqData) => {
    try {
      const response = await apiClient.post('core/faqs/', faqData)
      return response.data
    } catch (error) {
      throw error
    }
  },


  // Delete FAQ
  deleteFaq: async (id) => {
    try {
      const response = await apiClient.delete(`/faqs/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  },
}




export const registerUser = async(data) => {
  try{
    const response = await apiClient.post('accounts/register/', data)
    return response;
  } catch(error){
    throw error;
  }
}
   

export const loginUser = async(data) => {
  try{
    const response = await apiClient.post('accounts/login/', data)
    return response;
  } catch(error){
    throw error;
  }
}


export const sendEmail = async(data) => {
  try{
    const response = await apiClient.post('core/send-email/', data)
    return response.data
  } catch(error){
    throw error;
  }
}

export const deleteFaq = async(id) => {
    try{
       const response = await apiClient.delete(`core/${id}/delete-faq/`)
       return response.data
    } catch(error){
       throw error;
    }
}

export const addProduct = async(data) => {
   try{
      const response = await apiClient.post('products/add-products/', data)
      return response.data
   } catch(error){
      throw error;
   }
}

export const getProducts = async() => {
    try{
      const response = await apiClient.get('products/get-products/')
      return response.data
    } catch(error){
      throw error;
    }
}

export const getProductById = async(id) => {
    try{
      const response = await apiClient.get(`products/get-product/${id}/`)
      return response.data
    } catch(error){
      throw error;
    }
}

export const deleteProduct = async(productId) => {
    try{
      const response = await apiClient.delete(`products/delete-product/${productId}/`)
      return response.data
    } catch(error){
      throw error;
    }
}

export const addToCart = async(cartData) => {
  try{
    const response = await apiClient.post('carts/add-to-cart/', cartData)
    return response.data  
  } catch(error){
    throw error;
  }
}
export const getCartItems = async(userEmail) => {
  try{
    const response = await apiClient.get(`carts/get-cart-item/?email=${userEmail}`)
    return response.data  
  } catch(error){
    throw error;
  }
}

export const createOrder = async(orderData) => {
  try{
    const response = await apiClient.post('create-order/create/', orderData)
    return response.data  
  } catch(error){
    throw error;
  } 
}

export const verifyPayment = async(paymentData) => {
  try{
    const response = await apiClient.post('/verify-payment/verify/', paymentData)
    return response.data
  } catch(error){
    throw error;
  }
}

export const createPaypalOrder = async(orderData) => {
  try{
    const response = await apiClient.post('paypal/create/', orderData)
    return response.data
  } catch(error){
    throw error;
  }
}

export const capturePaypalOrder = async(captureData) => {
  try{
    const response = await apiClient.post('paypal/capture/', captureData)
    return response.data
  } catch(error){
    throw error;
  }
}

export const getUserOrders = async(userEmail) => {
  try{
    const response = await apiClient.get(`get-orders/orders/?user_email=${userEmail}`)
    return response.data
  } catch(error){
    throw error;
  }
}

export const getDashboardStats = async() => {
  try{
    const response = await apiClient.get('core/dashboard-stats/')
    return response.data
  } catch(error){
    throw error;
  }
}

export const getAnnouncement = async() => {
  try{
    const response = await apiClient.get('core/announcement/')
    return response.data
  } catch(error){
    throw error;
  }
}

export const postAnnouncement = async(data) => {
  try{
    const response = await apiClient.post('core/announcement/', data)
    return response.data
  } catch(error){
    throw error;
  }
}