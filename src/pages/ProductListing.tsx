import { Search } from "lucide-react";
import Pagination from "../components/common/Pagination";
import FilterPanel from "../components/FilterPanel";
import ProductGrid from "../components/ProductGrid";
import useProductCategoryList from "../hooks/useProductCategoryList";
import useProducts from "../hooks/useProducts";
import { useFilterContext } from "../context/FilterContext";
import { useLayoutContext } from "../hooks/useLayoutContext";

const SkeletonCard = () => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col animate-pulse">
    <div className="w-full aspect-square bg-gray-200 rounded-lg mb-4" />
    <div className="flex flex-col gap-2 mt-auto">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="flex gap-2 mt-1">
        <div className="h-3 bg-gray-200 rounded w-12" />
        <div className="h-3 bg-gray-200 rounded w-16" />
      </div>
    </div>
  </div>
);

const ProductListing = () => {
  const { appliedFilters } = useFilterContext();
  const { products, totalPages, currentPage, setCurrentPage, loading, availableBrands } = useProducts(appliedFilters);
  const { list, loading: categoryLoading } = useProductCategoryList();
  const { isFilterOpen, onCloseFilter } = useLayoutContext();

  const renderContent = () => {
    if (loading) {
      return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      );
    }

    if (products.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <Search size={72} strokeWidth={1.5} className="text-gray-300" />
          <p className="text-lg font-semibold text-gray-700">No products found</p>
          <p className="text-sm text-gray-400">Try adjusting your filters or search for something else.</p>
        </div>
      );
    }

    return (
      <>
        <ProductGrid products={products} />
        <div className="w-full flex items-center justify-center my-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </>
    );
  };

  return (
    <div className="flex gap-4">
      <FilterPanel
        list={list}
        brands={availableBrands}
        loading={categoryLoading}
        isOpen={isFilterOpen}
        onClose={onCloseFilter}
      />
      <div className="flex-1 px-4 py-4 min-w-0">
        {renderContent()}
      </div>
    </div>
  );
};

export default ProductListing;
