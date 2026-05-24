import { useState, useEffect } from "react";
import { getProductsBySearch } from "../api/product";
import type { Product } from "../types/product";
const useProductSearch = (query: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [prevQuery, setPrevQuery] = useState(query);

  if (prevQuery !== query) {
    setPrevQuery(query);
  }

  useEffect(() => {
    const fetchProducts = async () => {
      if (!query.trim()) {
        setProducts([]);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const data = await getProductsBySearch(query);

        setProducts(data.products);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  return { products, loading, error };
};

export default useProductSearch;
