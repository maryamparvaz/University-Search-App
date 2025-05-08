
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-500 " />
        </div>
        <input
          type="text"
          className="search-input w-full pl-12 pr-24 text-black"
          placeholder="Search for universities..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="absolute inset-y-0 right-2 flex items-center">
          <Button 
            type="submit" 
            disabled={isLoading || !searchQuery.trim()}
            className="bg-amber-600 hover:bg-amber-700"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
