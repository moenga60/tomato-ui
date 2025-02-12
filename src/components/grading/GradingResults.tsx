import React from 'react';
import { AlertCircle, Loader } from 'lucide-react';

interface GradingResultsProps {
  isGrading: boolean;
  isLoading: boolean;
}

export const GradingResults: React.FC<GradingResultsProps> = ({ isGrading, isLoading }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Grading Results</h2>
      {isLoading ? (
        <div className="flex items-center justify-center h-48">
          <Loader className="h-8 w-8 text-gray-500 animate-spin" />
          <span className="ml-2 text-gray-500">Grading in progress...</span>
        </div>
      ) : isGrading ? (
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium">Quality Grade</span>
              <span className="text-green-600 font-semibold">Premium</span>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              Based on color, shape, and surface analysis
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600">Color Score</div>
              <div className="text-lg font-semibold">95%</div>
              <div className="mt-2 text-xs text-gray-500">
                Excellent red coloration
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600">Shape Score</div>
              <div className="text-lg font-semibold">92%</div>
              <div className="mt-2 text-xs text-gray-500">
                Good uniformity
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">Recommendations</h3>
            <div className="space-y-3">
              <RecommendationCard
                type="market"
                title="Market Opportunity"
                content="Premium grade tomatoes - Suitable for high-end markets and export. Current market price: KES 180-200/kg"
              />
              <RecommendationCard
                type="storage"
                title="Storage"
                content="Store at 12-15°C for optimal shelf life. Expected shelf life: 10-14 days under proper conditions"
              />
              <RecommendationCard
                type="handling"
                title="Handling"
                content="Handle with care to maintain premium quality. Use plastic crates for transportation to minimize damage"
              />
              <RecommendationCard
                type="next-steps"
                title="Next Steps"
                content="Visit the marketplace to list your premium tomatoes. Current demand is high for this grade"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-48 text-gray-500">
          Upload or capture a photo to see grading results
        </div>
      )}
    </div>
  );
};

interface RecommendationCardProps {
  type: 'market' | 'storage' | 'handling' | 'next-steps';
  title: string;
  content: string;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ type, title, content }) => {
  const colors = {
    market: 'green',
    storage: 'blue',
    handling: 'purple',
    'next-steps': 'orange'
  };
  const color = colors[type];

  return (
    <div className={`p-4 bg-${color}-50 rounded-lg border border-${color}-100`}>
      <div className="flex items-start">
        <AlertCircle className={`h-5 w-5 text-${color}-600 mt-0.5 mr-2`} />
        <div>
          <h4 className={`font-medium text-${color}-800`}>{title}</h4>
          <p className={`text-sm text-${color}-700 mt-1`}>{content}</p>
        </div>
      </div>
    </div>
  );
};