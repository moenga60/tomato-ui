import React from 'react';
import { Search, Filter } from 'lucide-react';

interface ProductFiltersProps {
  selectedGrade: string;
  onGradeChange: (grade: string) => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  selectedGrade,
  onGradeChange,
}) => {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Quality Grade</h3>
            <Filter className="h-4 w-4 text-gray-400" />
          </div>
          <div className="flex justify-center gap-4 lg:space-y-2 lg:flex-col">
            {['all', 'premium', 'standard', 'economy'].map((grade) => (
              <label key={grade} className="flex items-center">
                <input
                  type="radio"
                  name="grade"
                  checked={selectedGrade === grade}
                  onChange={() => onGradeChange(grade)}
                  className="rounded text-red-600"
                />
                <span className="ml-2 capitalize">{grade === 'all' ? 'All Grades' : grade}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};