
import React, { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import SearchBar from '@/components/SearchBar';
import SearchResults from '@/components/SearchResults';
import { searchUniversities, University } from '@/services/universityService';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [universities, setUniversities] = useState<University[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 9;

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    fetchUniversities(query, 1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (searchQuery) {
      fetchUniversities(searchQuery, page);
    }
  };

  const fetchUniversities = async (query: string, page: number) => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    try {
      const { universities, total } = await searchUniversities({
        name: query,
        page,
        limit: itemsPerPage
      });
      
      setUniversities(universities);
      setTotalResults(total);
      
      if (total === 0) {
        toast({
          title: "No results found",
          description: `No universities found matching "${query}"`,
        });
      }
    } catch (error) {
      console.error('Error searching universities:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to search universities. Please try again later.",
      });
      setUniversities([]);
      setTotalResults(0);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-gradient-to-r from-amber-600 to-pink-500 text-white py-16">
        <div className="container px-4 mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            University Finder
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 opacity-90">
            Search for universities around the world and discover their information
          </p>
          <div className="max-w-3xl mx-auto">
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          </div>
        </div>
      </header>

      <main className="container px-4 mx-auto py-12">
        {(!searchQuery && universities.length === 0) ? (
          <div className="text-center py-16">
            <div className="inline-block p-6 rounded-full bg-amber-600/10 text-amber-600 mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m21 21-6-6m-8-3a8 8 0 1 1 16 0 8 8 0 0 1-16 0z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-4">Search for Universities</h2>
            <p className="text-gray-500 max-w-md mx-auto">
              Enter the name of a university in the search bar above to find information about universities around the world.
            </p>
          </div>
        ) : (
          <SearchResults
            universities={universities}
            currentPage={currentPage}
            totalResults={totalResults}
            itemsPerPage={itemsPerPage}
            isLoading={isLoading}
            onPageChange={handlePageChange}
            searchQuery={searchQuery}
          />
        )}
      </main>

      <footer className="bg-white py-8 border-t border-gray-100">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p className="mt-2">
            © {new Date().getFullYear()} University Finder
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
