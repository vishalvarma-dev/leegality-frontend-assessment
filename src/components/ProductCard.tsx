import { Link } from "react-router-dom";
import type { Product } from "../types/product";
import Rating from "./common/Rating";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col hover:shadow-md transition-shadow duration-200">
      <Link to={`/product/${product.id}`} className="w-full aspect-square flex items-center justify-center p-4 mb-4">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-contain"
        />
      </Link>
      <div className="flex flex-col gap-2 mt-auto">
        <Link to={`/product/${product.id}`} className="font-semibold text-gray-800 text-base hover:text-blue-600 hover:underline transition-colors">
          {product.title}
        </Link>
        <div className="flex items-center gap-3">
          <span className="font-bold text-lg text-gray-900">
            ${product.price.toFixed(0)}
          </span>
          <Rating rating={product.rating} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
