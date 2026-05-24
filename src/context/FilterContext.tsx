import React, { createContext, useContext, useState, type ReactNode } from "react";

interface PriceRange {
  min: string;
  max: string;
}

export interface FilterState {
  categories: string[];
  priceRange: PriceRange;
  brands: string[];
}

interface FilterContextType {
  selectedCategories: string[];
  priceRange: PriceRange;
  selectedBrands: string[];
  toggleCategory: (item: string) => void;
  setPriceRange: React.Dispatch<React.SetStateAction<PriceRange>>;
  toggleBrand: (brand: string) => void;
  appliedFilters: FilterState;
  handleApply: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<PriceRange>({ min: "", max: "" });
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  
  const [appliedFilters, setAppliedFilters] = useState<FilterState>({
    categories: [],
    priceRange: { min: "", max: "" },
    brands: [],
  });

  const toggleCategory = (item: string) => {
    setSelectedCategories((prev) => {
      const newSelection = prev.includes(item) ? [] : [item];
      setSelectedBrands([]); // Clear brands when category changes
      setAppliedFilters(current => ({ ...current, categories: newSelection, brands: [] }));
      return newSelection;
    });
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => {
      const newSelection = prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand];
      setAppliedFilters(current => ({ ...current, brands: newSelection }));
      return newSelection;
    });
  };

  const handleApply = () => {
    setAppliedFilters({
      categories: selectedCategories,
      priceRange,
      brands: selectedBrands,
    });
  };

  return (
    <FilterContext.Provider
      value={{
        selectedCategories,
        priceRange,
        selectedBrands,
        toggleCategory,
        setPriceRange,
        toggleBrand,
        appliedFilters,
        handleApply,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilterContext must be used within a FilterProvider");
  }
  return context;
};
