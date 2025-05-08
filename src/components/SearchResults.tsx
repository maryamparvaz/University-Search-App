
import React from 'react';
import { University } from '@/services/universityService';
import UniversityCard from './UniversityCard';
import Pagination from './Pagination';

interface SearchResultsProps {
  universities: University[];
  currentPage: number;
  totalResults: number;
  itemsPerPage: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  searchQuery: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  universities,
  currentPage,
  totalResults,
  itemsPerPage,
  isLoading,
  onPageChange,
  searchQuery,
}) => {
  const totalPages = Math.ceil(totalResults / itemsPerPage);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Searching for universities...</p>
        </div>
      </div>
    );
  }

  if (searchQuery && universities.length === 0) {
    return (
      <div className="text-center p-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-600/10 text-amber-600 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 2 2 22"></path>
            <path d="M11 12a7 7 0 0 0 7 7m0-13a7 7 0 0 0-7 7"></path>
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">No universities found</h3>
        <p className="text-gray-500">
          We couldn't find any universities matching "{searchQuery}". <br />
          Try a different search term or check your spelling.
        </p>
      </div>
    );
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalResults);

  return (
    <div>
      {searchQuery && universities.length > 0 && (
        <div className="text-gray-500 text-center mb-6">
          Showing {startIndex + 1}-{endIndex} of {totalResults} results for "{searchQuery}"
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {universities.map((university, index) => (
          <UniversityCard key={`${university.name}-${index}`} university={university} />
        ))}
      </div>

      {totalResults > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default SearchResults;
