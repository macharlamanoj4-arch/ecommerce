# Ecommerce Catalog UI

A React TypeScript frontend for an ecommerce catalog application with authentication and product browsing.

## Features

- **Authentication**: Login and signup functionality
- **Product Catalog**: Browse and search products
- **Responsive Design**: Mobile-friendly UI using Tailwind CSS
- **Type Safety**: Full TypeScript implementation

## Tech Stack

- React 18 with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Axios for API calls
- React Hooks for state management

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Copy the environment file:
   ```bash
   cp .env.example .env
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The app will be available at `http://localhost:3000`

## Environment Variables

Configure your API endpoints in `.env`:

```env
# API Configuration
REACT_APP_API_BASE_URL=http://localhost:3001
REACT_APP_CATALOG_API_URL=http://localhost:3001/api/catalog
REACT_APP_USER_API_URL=http://localhost:3001/api/users
REACT_APP_PROFILE_API_URL=http://localhost:3001/api/profile

# Authentication
REACT_APP_TOKEN_KEY=ecommerce_token
REACT_APP_USER_KEY=ecommerce_user
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
│   ├── Login.tsx       # Login page
│   ├── Signup.tsx      # Signup page
│   └── Catalog.tsx     # Product catalog page
├── services/           # API service layer
│   └── api.ts          # Axios configuration and API calls
├── App.tsx             # Main app component with routing
├── index.css           # Global styles with Tailwind
└── index.tsx           # App entry point
```

## API Endpoints

The app expects the following API endpoints:

### Authentication
- `POST /api/users/login` - User login
- `POST /api/users/register` - User registration

### Catalog
- `GET /api/catalog/products` - Get all products
- `GET /api/catalog/products/:id` - Get product by ID
- `POST /api/catalog/products` - Create product
- `PUT /api/catalog/products/:id` - Update product
- `DELETE /api/catalog/products/:id` - Delete product

### Profile
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Commit and push to your branch
5. Create a Pull Request
