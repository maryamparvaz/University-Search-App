
import React from 'react';
import { University } from '@/services/universityService';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

interface UniversityCardProps {
  university: University;
}

const UniversityCard: React.FC<UniversityCardProps> = ({ university }) => {
  return (
    <Card className="card-hover-effect overflow-hidden border border-gray-100 bg-white">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg text-gray-800 mb-2">
              {university.name}
            </h3>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-amber-600/10 text-amber-600 text-xs font-medium px-2.5 py-0.5 rounded">
                {university.country}
              </span>
              {university.state_province && (
                <span className="bg-pink-500/10 text-pink-500 text-xs font-medium px-2.5 py-0.5 rounded">
                  {university.state_province}
                </span>
              )}
            </div>
            {university.domains && university.domains.length > 0 && (
              <p className="text-sm text-gray-500 mt-2">
                {university.domains[0]}
              </p>
            )}
          </div>
          {university.web_pages && university.web_pages.length > 0 && (
            <a
              href={university.web_pages[0]}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full p-2 bg-amber-600/10 text-amber-600 hover:bg-amber-600 hover:text-white transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UniversityCard;
