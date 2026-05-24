import { X } from "lucide-react";
import { useFilterContext, type FilterState } from "../context/FilterContext";

interface FilterPanelProps {
  list?: string[];
  brands?: string[];
  loading?: boolean;
  onFilterChange?: (filters: FilterState) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const FilterPanel = ({
  list,
  brands,
  loading = false,
  onFilterChange,
  isOpen = true,
  onClose,
}: FilterPanelProps) => {
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
    onFilterChange?.({
      categories: selectedCategories,
      priceRange,
      brands: selectedBrands,
    });
    if (window.innerWidth < 768) {
      onClose?.();
    }
  };

  const renderCategories = () => {
    if (loading) {
      return (
        <div className="flex flex-col gap-2.5 animate-pulse">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-4 h-4 bg-gray-200 rounded shrink-0" />
              <div
                className="h-3 bg-gray-200 rounded"
                style={{ width: `${55 + (i % 3) * 20}%` }}
              />
            </div>
          ))}
        </div>
      );
    }

    if (!list || list.length === 0) {
      return (
        <p className="text-xs text-gray-400 py-2">No categories available</p>
      );
    }

    return (
      <div className="flex flex-col gap-2.5 max-h-[200px] overflow-y-auto pr-2">
        {list.map((item) => (
          <label
            key={item}
            className="flex items-center gap-3 cursor-pointer group"
          >
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

  const panelContent = (
    <div className="flex flex-col gap-6">
      {/* Header — shown only in drawer mode on mobile */}
      <div className="flex items-center justify-between md:hidden">
        <h2 className="font-bold text-gray-900 text-lg">Filters</h2>
        <button
          onClick={onClose}
          className="p-1.5 rounded-md hover:bg-gray-100 transition-colors text-gray-600"
          aria-label="Close filters"
        >
          <X size={20} />
        </button>
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
        {renderCategories()}
      </div>

      {/* Price Range */}
      <div className="w-full">
        <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
        <div className="flex gap-2 mb-3">
          <input
            type="number"
            placeholder="Min"
            value={priceRange.min}
            onChange={(e) =>
              setPriceRange((p) => ({ ...p, min: e.target.value }))
            }
            className="w-full min-w-0 flex-1 border border-gray-300 rounded-md px-2 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <input
            type="number"
            placeholder="Max"
            value={priceRange.max}
            onChange={(e) =>
              setPriceRange((p) => ({ ...p, max: e.target.value }))
            }
            className="w-full min-w-0 flex-1 border border-gray-300 rounded-md px-2 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
        <button
          onClick={handleApply}
          className="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white text-sm font-medium py-2 rounded-md transition-colors"
        >
          Apply
        </button>
      </div>

      {/* Brands */}
      {brands?.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Brands</h3>
          <div className="flex flex-col gap-2.5 max-h-[200px] overflow-y-auto pr-2">
            {brands.map((brand) => (
              <label
                key={brand}
                className="flex items-center gap-3 cursor-pointer group"
              >
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
      )}
    </div>
  );

  return (
    <>
      {/* ── MOBILE: Overlay + Drawer ── */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel (slides from left) */}
      <aside
        className={`filter-panel fixed top-0 left-0 h-full w-80 max-w-[90vw] bg-white shadow-2xl z-50 md:hidden
          flex flex-col p-6 overflow-y-auto overflow-x-hidden transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        aria-label="Filter panel"
        role="dialog"
        aria-modal="true"
      >
        {panelContent}
      </aside>

      {/* ── DESKTOP: Collapsible sidebar ── */}
      <aside
        className={`filter-panel hidden md:flex flex-col shrink-0 bg-white border-r border-gray-200 p-6
          h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto overflow-x-hidden
          transition-all duration-300 ease-in-out
          ${isOpen ? "w-72 opacity-100" : "w-0 opacity-0 p-0 overflow-hidden border-0"}`}
        aria-label="Filter panel"
        aria-hidden={!isOpen}
      >
        <div
          className={`w-full overflow-hidden transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0"}`}
        >
          {panelContent}
        </div>
      </aside>
    </>
  );
};

export default FilterPanel;