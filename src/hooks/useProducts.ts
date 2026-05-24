import { useState, useEffect } from "react";
import { getProducts, getProductsByCategory } from "../api/product";
import type { Product } from "../types/product";
import type { FilterState } from "../context/FilterContext";

const LIMIT = 12;

const useProducts = (filters:FilterState) => {
  const [rawProducts, setRawProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentCategory = filters.categories.length > 0 ? filters.categories[0] : undefined;
  const [prevCategory, setPrevCategory] = useState(currentCategory);

  if (prevCategory !== currentCategory) {
    setCurrentPage(1);
    setPrevCategory(currentCategory);
  }

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const skip = (currentPage - 1) * LIMIT;
        const data = currentCategory
          ? await getProductsByCategory(currentCategory, { limit: LIMIT, skip })
          : await getProducts({ limit: LIMIT, skip });

        setRawProducts(data.products);
        setTotalPages(Math.ceil(data.total / LIMIT));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentCategory, currentPage]);

  useEffect(() => {
    const filtered = rawProducts.filter((p: Product) => {
      const aboveMin = !filters.priceRange.min || p.price >= Number(filters.priceRange.min);
      const belowMax = !filters.priceRange.max || p.price <= Number(filters.priceRange.max);
      const brandMatch = !filters.brands.length || filters.brands.includes(p.brand);
      return aboveMin && belowMax && brandMatch;
    });

    setProducts(filtered);
  }, [rawProducts, filters.priceRange, filters.brands]);

  return { products, totalPages, currentPage, setCurrentPage, loading, error };
};

export default useProducts;