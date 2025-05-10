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
    let recommendations = null;
    // Fetch recommendations when the grade changes


    let StaticRecommendations = {
        'Grade A': {
            'market': 'Suitable for high-end markets and export',
            'storage': 'Store at 12-15°C for optimal shelf life',
            'handling': 'Handle with extreme care to maintain premium quality',
            'price': 'KES 180-200/kg'
        },
        'Grade B': {
            'market': 'Ideal for local supermarkets',
            'storage': 'Store at 10-12°C',
            'handling': 'Standard handling procedures apply',
            'price': 'KES 150-170/kg'
        },
        'Grade C': {
            'market': 'Suitable for local markets and processing',
            'storage': 'Process within 5-7 days',
            'handling': 'Basic handling required',
            'price': 'KES 120-140/kg'
        }
    }
    console.log(StaticRecommendations['Grade A'])

    console.log(grade)

    if (grade === 'economy') {
        recommendations = StaticRecommendations['Grade C']
    } else if (grade === 'standard') {
        recommendations = StaticRecommendations['Grade B']
    } else {
        recommendations = StaticRecommendations['Grade A']
    }

    console.log(recommendations)


    return (
        <> 
            {/* <h2 className="text-xl font-semibold mb-4">Grading Results</h2> */}
            {isLoading ? (
                <div className="flex items-center justify-center h-48">
                    <Loader className="h-8 w-8 text-gray-500 animate-spin" />
                    <span className="ml-2 text-gray-500">Grading in progress...</span>
                </div>
            ) : isGrading ? (
                <div className="space-y-4">
                    {/* Quality Grade Section */}
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-start">
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
                    <div>
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
                        {recommendations !== null && (

                            <div className="space-y-3">
                                
                                    <RecommendationCard
                                        type="market"
                                        title="Market Opportunity"
                                        content={recommendations?.market}
                                    />
                                
                                
                                    <RecommendationCard
                                        type="storage"
                                        title="Storage"
                                        content={recommendations?.storage}
                                    />
                               
                                
                                    <RecommendationCard
                                        type="handling"
                                        title="Handling"
                                        content={recommendations?.handling}
                                    />
                              
                                
                                    <RecommendationCard
                                        type="next-steps"
                                        title="Price Range"
                                        content={recommendations?.price}
                                    />
                                
                            </div>

                        )}


                    </div>
                </div>
            ) : (
                <>

                </>
            )}
        </>
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