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
    <div className={cn("flex gap-1.5 mx-auto items-center", classNames?.root)}>
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium border transition-all duration-150",
          "bg-white border-gray-200 text-gray-600 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-200 disabled:hover:text-gray-600",
          classNames?.previous
        )}
      >
        <ChevronLeft size={16} />
        <span>Prev</span>
      </button>

      {/* Page numbers */}
      {pages.map((page, index) =>
        page === "..." ? (
          <span key={`ellipsis-${index}`} className="px-2 py-1.5 text-gray-400 text-sm select-none">
            &hellip;
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              "w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium border transition-all duration-150",
              page === currentPage
                ? "bg-orange-500 text-white border-orange-500 shadow-sm shadow-orange-200 scale-105"
                : "bg-white text-gray-600 border-gray-200 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600",
              classNames?.page
            )}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium border transition-all duration-150",
          "bg-white border-gray-200 text-gray-600 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-200 disabled:hover:text-gray-600",
          classNames?.next
        )}
      >
        <span>Next</span>
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;