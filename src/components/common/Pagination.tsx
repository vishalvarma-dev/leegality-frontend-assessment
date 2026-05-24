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

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  classNames,
}: PaginationProps) => {
  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <div className={cn("flex gap-1 mx-auto items-center", classNames?.root)}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "flex items-center px-3 py-2 border rounded-md hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent transition-colors",
          classNames?.previous
        )}
      >
        <ChevronLeft size={20} />
        <span className="ml-1">Previous</span>
      </button>

      {pages.map((page, index) =>
        page === "..." ? (
          <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">...</span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              "px-4 py-2 border rounded-md transition-colors",
              page === currentPage
                ? "bg-orange-500 text-white border-orange-600 font-bold"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50",
              classNames?.page
            )}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "flex items-center px-3 py-2 border rounded-md hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent transition-colors",
          classNames?.next
        )}
      >
        <span className="mr-1">Next</span>
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;