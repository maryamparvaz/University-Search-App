
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Handle edge cases
  if (totalPages <= 1) return null;

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // Show all pages if total pages are less than or equal to maxPagesToShow
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include first page, last page, current page, and pages around current
      if (currentPage <= 3) {
        // Near start, show first 5 pages
        for (let i = 1; i <= maxPagesToShow; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        // Near end, show last 5 pages
        for (let i = totalPages - maxPagesToShow + 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Middle, show current and 2 pages on each side
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <Button
        variant="outline"
        size="icon"
        className="pagination-item"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        <ChevronsLeft className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        className="pagination-item"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      {pageNumbers.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "default" : "outline"}
          className={`pagination-item ${
            page === currentPage ? "bg-amber-600 text-white hover:bg-amber-700" : ""
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}
      
      <Button
        variant="outline"
        size="icon"
        className="pagination-item"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        className="pagination-item"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        <ChevronsRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;
