import { cn } from "../../utils/cn";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  classNames?: {
    root?: string;
    previous?: string;
    next?: string;
    page?: string;
  };
}

const getPageNumbers = (current: number, total: number): (number | "...")[] => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "...", total];
  if (current >= total - 3) return [1, "...", total-4, total-3, total-2, total-1, total];
  return [1, "...", current - 1, current, current + 1, "...", total];
};

// Compact version for mobile
const getMobilePageNumbers = (current: number, total: number): (number | "...")[] => {
  if (total <= 3) return Array.from({ length: total }, (_, i) => i + 1);
  if (current === 1) return [1, 2, "...", total];
  if (current === total) return [1, "...", total - 1, total];
  return [1, "...", current, "...", total];
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  classNames,
}: PaginationProps) => {
  const pages = getPageNumbers(currentPage, totalPages);
  const mobilePages = getMobilePageNumbers(currentPage, totalPages);

  const renderPageButton = (page: number | "...", index: number) =>
    page === "..." ? (
      <span key={`ellipsis-${index}`} className="px-1.5 py-1.5 text-gray-400 text-sm select-none">
        &hellip;
      </span>
    ) : (
      <button
        key={page}
        onClick={() => onPageChange(page)}
        className={cn(
          "w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium border transition-all duration-150",
          page === currentPage
            ? "bg-blue-500 text-white border-blue-500 shadow-sm shadow-blue-200 scale-105"
            : "bg-white text-gray-600 border-gray-200 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600",
          classNames?.page
        )}
      >
        {page}
      </button>
    );

  return (
    <div className={cn("flex gap-1.5 mx-auto items-center flex-wrap justify-center", classNames?.root)}>
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-lg text-sm font-medium border transition-all duration-150",
          "bg-white border-gray-200 text-gray-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-200 disabled:hover:text-gray-600",
          classNames?.previous
        )}
      >
        <ChevronLeft size={16} />
        <span className="hidden sm:inline">Prev</span>
      </button>

      {/* Page numbers — full on md+, compact on mobile */}
      <div className="hidden sm:flex gap-1.5 items-center">
        {pages.map((page, index) => renderPageButton(page, index))}
      </div>
      <div className="flex sm:hidden gap-1.5 items-center">
        {mobilePages.map((page, index) => renderPageButton(page, index))}
      </div>

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-lg text-sm font-medium border transition-all duration-150",
          "bg-white border-gray-200 text-gray-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-200 disabled:hover:text-gray-600",
          classNames?.next
        )}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;