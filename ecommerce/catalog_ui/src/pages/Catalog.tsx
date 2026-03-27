import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  img?: string;
}

interface User {
  id: string;
  username: string;
  profile?: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

const Catalog: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [page, setPage] = useState(1);
  const [nextId, setNextId] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(process.env.REACT_APP_TOKEN_KEY || 'ecommerce_token');
    const userData = localStorage.getItem(process.env.REACT_APP_USER_KEY || 'ecommerce_user');
    
    if (!token) {
      navigate('/login');
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
    }

    fetchProducts(1, true);
  }, [navigate]);

  const fetchProducts = async (pageNum: number = 0, reset: boolean = false) => {
    try {
      if (pageNum === 0 && reset) {
        setIsLoading(true);
      } else {
        setIsLoadingMore(true);
      }
      let nextid = nextId

      const response = await fetch(`${process.env.REACT_APP_CATALOG_API_URL}/products?id=${nextid}&limit=10`, {
        headers: {
          'Authorization': ` ${localStorage.getItem(process.env.REACT_APP_TOKEN_KEY || 'ecommerce_token')}`
        },
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        
        if (reset) {
          setAllProducts(data.products || data);
          setProducts(data.products || data);
          setPage(1);
          setNextId(data.at(-1).id)
        } else {
          const newProducts = data.products || data;
          setAllProducts(prev => [...prev, ...newProducts]);
          setProducts(prev => [...prev, ...newProducts]);
          setNextId(newProducts.at(-1).id)
        }
        
        setHasMore(data.hasMore !== false && (data.products?.length || data?.length) > 0);
      } else {
        setError('Failed to fetch products');
      }
    } catch (err) {
      setError('Error fetching products');
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(process.env.REACT_APP_TOKEN_KEY || 'ecommerce_token');
    localStorage.removeItem(process.env.REACT_APP_USER_KEY || 'ecommerce_user');
    navigate('/login');
  };

  // Throttled scroll handler
  const handleScroll = () => {
    if (!hasMore || isLoadingMore) return;

    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 200) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchProducts(nextPage, false);
    }
  };

  // Throttle function
  const throttle = (func: Function, limit: number) => {
    let inThrottle: boolean;
    return function(this: any, ...args: any[]) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  };

  // Add scroll event listener with throttling
  useEffect(() => {
    const throttledScroll = throttle(handleScroll, 200);
    window.addEventListener('scroll', throttledScroll);
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [hasMore, isLoadingMore, page]);

  // Reset products when filters change
  useEffect(() => {
    if (searchTerm || selectedCategory !== 'all') {
      const filtered = allProducts.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
      });
      setProducts(filtered);
    } else {
      setProducts(allProducts);
    }
  }, [searchTerm, selectedCategory, allProducts]);

  const filteredProducts = products;

  const categories = ['all', ...Array.from(new Set(allProducts.map(p => p.category)))];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading catalog...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Ecommerce Catalog</h1>
              {user && (
                <p className="text-sm text-gray-600">
                  Welcome, {user.profile?.firstName || user.username}
                </p>
              )}
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    {product.img ? (
                      <img
                        src={process.env.REACT_APP_IMG_BASE_URL + product.img}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-400">No Image</div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-2xl font-bold text-indigo-600">₹{product.price}</span>
                      <span className={`text-sm px-2 py-1 rounded ${
                        product.stock > 10 ? 'bg-green-100 text-green-800' :
                        product.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {product.stock > 0 ? `` : 'Out of stock'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {product.category}
                      </span>
                      <button
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded text-sm font-medium disabled:opacity-50"
                        disabled={product.stock === 0}
                      >
                        {product.stock === 0 ? 'Unavailable' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Loading spinner for scroll loading */}
            {isLoadingMore && (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              </div>
            )}
            
            {/* End of products message */}
            {!hasMore && filteredProducts.length > 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No more products to load</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Catalog;
