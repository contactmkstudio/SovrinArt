# Admin Panel

This folder contains all admin-related pages and components for the Sovrinart admin dashboard.

## Structure

```
adminpanel/
├── components/          # Reusable admin components
│   ├── AdminSidebar.jsx    # Sidebar navigation for admin
│   ├── AdminHeader.jsx     # Header with search and user info
│   └── DashboardStats.jsx  # Dashboard statistics cards
│
└── pages/              # Admin pages
    ├── AdminDashboard.jsx  # Main dashboard page
    ├── AdminOrders.jsx     # Orders management page
    └── AdminProducts.jsx   # Products management page
```

## Features

- **AdminDashboard**: Main dashboard with statistics and recent activity
- **AdminSidebar**: Collapsible sidebar with navigation menu
- **AdminHeader**: Header with search bar and notifications
- **DashboardStats**: Statistics cards showing key metrics

## Routes

- `/admin/dashboard` - Main admin dashboard
- `/admin/orders` - Orders management (coming soon)
- `/admin/products` - Products management (coming soon)
- `/admin/customers` - Customers management (coming soon)
- `/admin/messages` - Messages management (coming soon)
- `/admin/analytics` - Analytics page (coming soon)
- `/admin/settings` - Settings page (coming soon)

## Design System

The admin panel uses the same color palette as the main website:
- Primary: `#546B41`
- Secondary: `#99AD7A`
- Accent: `#DCCCAC`
- Background: `#FFF8EC`, `#FAFAFA`
- Text: Various shades of primary colors

## Future Enhancements

- Complete remaining admin pages
- Add authentication/authorization
- Implement CRUD operations for products
- Add order tracking functionality
- Create analytics dashboard
- Implement real-time notifications
