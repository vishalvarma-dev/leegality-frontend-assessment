import { useState, useEffect, useMemo } from "react";
import { getProducts, getProductsByCategory } from "../api/product";
import type { Product } from "../types/product";
import type { FilterState } from "../context/FilterContext";

const LIMIT = 12;

const useProducts = (filters: FilterState) => {
  const [rawProducts, setRawProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availableBrands, setAvailableBrands] = useState<string[]>([]);

  const currentCategory =
    filters.categories.length > 0
      ? filters.categories[0]
      : undefined;

/* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setAvailableBrands([]);
  }, [currentCategory]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    filters.categories,
    filters.priceRange.min,
    filters.priceRange.max,
    filters.brands,
  ]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const skip = (currentPage - 1) * LIMIT;

        const data = currentCategory
          ? await getProductsByCategory(currentCategory, {
              limit: LIMIT,
              skip,
            })
          : await getProducts({
              limit: LIMIT,
              skip,
            });

        setRawProducts(data.products);

        setTotalPages(Math.ceil(data.total / LIMIT));

        // Accumulate brands across pages
        setAvailableBrands((prev) => {
          const newBrands = data.products
            .map((p: Product) => p.brand)
            .filter(Boolean);

          return Array.from(
            new Set([...prev, ...newBrands])
          );
        });
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentCategory, currentPage]);

  // Filter products locally
  const products = useMemo(() => {
    return rawProducts.filter((p: Product) => {
      const aboveMin =
        !filters.priceRange.min ||
        p.price >= Number(filters.priceRange.min);

      const belowMax =
        !filters.priceRange.max ||
        p.price <= Number(filters.priceRange.max);

      const brandMatch =
        !filters.brands.length ||
        filters.brands.includes(p.brand);

      return aboveMin && belowMax && brandMatch;
    });
  }, [
    rawProducts,
    filters.priceRange.min,
    filters.priceRange.max,
    filters.brands,
  ]);

  return {
    products,
    totalPages,
    currentPage,
    setCurrentPage,
    loading,
    error,
    availableBrands,
  };
};

export default useProducts;