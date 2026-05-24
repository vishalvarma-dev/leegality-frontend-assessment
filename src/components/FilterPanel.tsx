import { useFilterContext, type FilterState } from "../context/FilterContext";

const BRANDS = ["Essence", "Glamour Beauty", "beauty", "Chanel"];

const FilterPanel = ({
  list,
  brands = BRANDS,
  loading = false,
  onFilterChange,
}: {
  list?: string[];
  brands?: string[];
  loading?: boolean;
  onFilterChange?: (filters: FilterState) => void;
}) => {
  const {
    selectedCategories,
    priceRange,
    selectedBrands,
    toggleCategory,
    setPriceRange,
    toggleBrand,
    handleApply: contextHandleApply,
  } = useFilterContext();

  const handleApply = () => {
    contextHandleApply();
    onFilterChange?.({ categories: selectedCategories, priceRange, brands: selectedBrands });
  };

  const renderCategories = () => {
    if (loading) {
      return (
        <div className="flex flex-col gap-2.5 animate-pulse">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-4 h-4 bg-gray-200 rounded shrink-0" />
              <div className="h-3 bg-gray-200 rounded" style={{ width: `${55 + (i % 3) * 20}%` }} />
            </div>
          ))}
        </div>
      );
    }

    if (!list || list.length === 0) {
      return <p className="text-xs text-gray-400 py-2">No categories available</p>;
    }

    return (
      <div className="flex flex-col gap-2.5 max-h-[200px] overflow-y-auto pr-2">
        {list.map((item) => (
          <label key={item} className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={selectedCategories.includes(item)}
              onChange={() => toggleCategory(item)}
              className="w-4 h-4 rounded border-gray-300 text-blue-500 accent-blue-500 cursor-pointer shrink-0"
            />
            <span className="text-gray-600 group-hover:text-gray-900 text-sm capitalize truncate transition-colors">
              {item.replace(/-/g, " ")}
            </span>
          </label>
        ))}
      </div>
    );
  };

  return (
    <div className="w-54 shrink-0 bg-white border-r border-gray-200 p-6 h-screen sticky top-0 flex flex-col gap-6 overflow-y-auto">
      {/* Categories */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
        {renderCategories()}
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
        <div className="flex gap-2 mb-3">
          <input
            type="number"
            placeholder="Min"
            value={priceRange.min}
            onChange={(e) => setPriceRange((p) => ({ ...p, min: e.target.value }))}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="number"
            placeholder="Max"
            value={priceRange.max}
            onChange={(e) => setPriceRange((p) => ({ ...p, max: e.target.value }))}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={handleApply}
          className="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white text-sm font-medium py-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-500"
        >
          Apply 
        </button>
      </div>

      {/* Brands */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Brands</h3>
        <div className="flex flex-col gap-2.5 max-h-[200px] overflow-y-auto pr-2">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="w-4 h-4 rounded border-gray-300 text-blue-500 accent-blue-500 cursor-pointer shrink-0"
              />
              <span className="text-gray-600 group-hover:text-gray-900 text-sm transition-colors">
                {brand}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
