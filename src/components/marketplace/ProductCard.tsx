import React from 'react';
import { MapPin, ShoppingBag, User, BarChart3, MessageCircle } from 'lucide-react';

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

interface ProductCardProps {
  product: Product;
  onContact: (vendor: Vendor) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onContact }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
        <div className="w-full md:w-2/3 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-600 mt-1">{product.description}</p>
            </div>
            <span className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full capitalize">
              {product.grade}
            </span>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center text-gray-600">
              <MapPin className="h-4 w-4 mr-1" />
              {product.vendor.location}
            </div>
            <div className="flex items-center text-gray-600">
              <ShoppingBag className="h-4 w-4 mr-1" />
              {product.quantity} kg available
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="font-medium">{product.vendor.name}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  {product.vendor.totalSales}+ kg sold
                  <span className="mx-2">•</span>
                  <span className="flex items-center">
                    ⭐ {product.vendor.rating}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-red-600">
                  KES {product.price}
                  <span className="text-sm font-normal text-gray-600">/kg</span>
                </div>
                <button
                  onClick={() => onContact(product.vendor)}
                  className="mt-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Contact Vendor</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};