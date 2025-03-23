import React, { useEffect, useState } from 'react';
import { ProductCard } from './ProductCard';

interface Vendor {
  id: number;
  name: string;
  location: string;
  phone: string;
  rating: number;
  totalSales: number;
}

interface Product {
  id: number;
  name: string;
  grade: string;
  price: number;
  quantity: number;
  image: string;
  vendor: Vendor;
  description: string;
}

export const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/market-trends/'); // Replace with your backend API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle contact vendor action
  const handleContactVendor = (vendor: Vendor) => {
    console.log('Contacting vendor:', vendor);
    // Add logic to send a message to the vendor (e.g., via API)
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onContact={handleContactVendor}
        />
      ))}
    </div>
  );
};