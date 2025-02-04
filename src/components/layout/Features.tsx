import React from 'react';
import { Camera, ShoppingBag, BarChart3 } from 'lucide-react';

export const Features = () => {
  return (
    <div className="bg-white mt-12 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-center mb-8">Platform Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <Camera className="h-8 w-8 mx-auto text-red-600" />
            <h3 className="mt-4 text-lg font-medium">AI-Powered Grading</h3>
            <p className="mt-2 text-gray-600">
              Advanced computer vision for accurate quality assessment
            </p>
          </div>
          <div className="text-center">
            <ShoppingBag className="h-8 w-8 mx-auto text-red-600" />
            <h3 className="mt-4 text-lg font-medium">Market Access</h3>
            <p className="mt-2 text-gray-600">
              Direct connection between farmers and buyers
            </p>
          </div>
          <div className="text-center">
            <BarChart3 className="h-8 w-8 mx-auto text-red-600" />
            <h3 className="mt-4 text-lg font-medium">Analytics & Insights</h3>
            <p className="mt-2 text-gray-600">
              Data-driven decisions for better outcomes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};