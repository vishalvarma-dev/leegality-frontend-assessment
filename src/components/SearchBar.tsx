import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import useProductSearch from "../hooks/useProductSearch";

const SearchBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const { products, loading } = useProductSearch(query);
  const containerRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    if (loading) setIsPending(false);
  }, [loading]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isBusy = isPending || loading;

  return (
    <div className="hidden md:flex flex-1 max-w-3xl mx-auto relative" ref={containerRef}>
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setIsPending(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="block w-full pl-10 pr-3 py-2 border-none rounded-md bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search products..."
        />
      </div>

      {isOpen && query.trim().length > 0 && (
        <div className="absolute top-full mt-2 w-full  bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden z-50">
          {isBusy ? (
            <div className="p-4 text-gray-500 text-sm text-center">Searching...</div>
          ) : products.length > 0 ? (
            <ul className="max-h-96 overflow-y-auto">
              {products.map((product) => (
                <li 
                  key={product.id} 
                  onClick={() => {
                    setIsOpen(false);
                    navigate(`/product/${product.id}`);
                  }}
                  className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer p-3 flex items-center gap-4 transition-colors"
                >
                  <div className="w-12 h-12 shrink-0 bg-white border border-gray-100 rounded overflow-hidden p-1 flex items-center justify-center">
                    <img src={product.thumbnail} alt={product.title} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">{product.title}</div>
                    <div className="text-xs text-gray-500 truncate capitalize">{product.category.replace(/-/g, ' ')}</div>
                  </div>
                  <div className="text-sm font-bold text-gray-900">
                    ${product.price.toFixed(0)}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-gray-500 text-sm text-center">No products found for "{query}"</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
