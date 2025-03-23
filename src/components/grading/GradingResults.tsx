import React, { useEffect, useState } from 'react';
import { AlertCircle, Loader } from 'lucide-react';

interface GradingResultsProps {
  isGrading: boolean;
  isLoading: boolean;
  grade?: string; // Grade (e.g., "PREMIUM", "STANDARD", "ECONOMY")
  overallScore?: number; // Overall score (e.g., 0.85)
}

interface Recommendation {
  market_recommendation?: string;
  storage_recommendation?: string;
  handling_recommendation?: string;
  price_range?: string;
}

export const GradingResults: React.FC<GradingResultsProps> = ({
  isGrading,
  isLoading,
  grade,
  overallScore,
}) => {
  const [recommendations, setRecommendations] = useState<Recommendation | null>(null);

  // Fetch recommendations when the grade changes
  useEffect(() => {
    if (grade) {
      fetchRecommendations(grade);
    }
  }, [grade]);

  const fetchRecommendations = async (grade: string) => {
    try {
      const response = await fetch(`/recommendations/${grade}/`);
      if (!response.ok) {
        throw new Error('Failed to fetch recommendations');
      }
      const data = await response.json();
      setRecommendations(data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  return (
    <div className="w-1/3 bg-gray-50 p-6 rounded-lg shadow-sm ml-6">
      <h2 className="text-xl font-semibold mb-4">Grading Results</h2>
      {isLoading ? (
        <div className="flex items-center justify-center h-48">
          <Loader className="h-8 w-8 text-gray-500 animate-spin" />
          <span className="ml-2 text-gray-500">Grading in progress...</span>
        </div>
      ) : isGrading ? (
        <div className="space-y-4">
          {/* Quality Grade Section */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium">Quality Grade</span>
              <span className={`text-${grade === 'PREMIUM' ? 'green' : grade === 'STANDARD' ? 'yellow' : 'red'}-600 font-semibold`}>
                {grade}
              </span>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              Based on color, shape, and surface analysis
            </div>
          </div>

          {/* Scores Section */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600">Overall Score</div>
              <div className="text-lg font-semibold">{overallScore ? `${(overallScore * 100).toFixed(2)}%` : 'N/A'}</div>
              <div className="mt-2 text-xs text-gray-500">
                {grade === 'PREMIUM'
                  ? 'Excellent quality'
                  : grade === 'STANDARD'
                  ? 'Good quality'
                  : 'Needs improvement'}
              </div>
            </div>
          </div>

          {/* Recommendations Section */}
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">Recommendations</h3>
            <div className="space-y-3">
              {recommendations?.market_recommendation && (
                <RecommendationCard
                  type="market"
                  title="Market Opportunity"
                  content={recommendations.market_recommendation}
                />
              )}
              {recommendations?.storage_recommendation && (
                <RecommendationCard
                  type="storage"
                  title="Storage"
                  content={recommendations.storage_recommendation}
                />
              )}
              {recommendations?.handling_recommendation && (
                <RecommendationCard
                  type="handling"
                  title="Handling"
                  content={recommendations.handling_recommendation}
                />
              )}
              {recommendations?.price_range && (
                <RecommendationCard
                  type="next-steps"
                  title="Price Range"
                  content={recommendations.price_range}
                />
              )}
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
    'next-steps': 'orange',
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