import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getProductById } from "../api/product";
import type { Product } from "../types/product";
import Rating from "../components/common/Rating";
import Pagination from "../components/common/Pagination";

const SkeletonDetail = () => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex gap-8 animate-pulse">
    <div className="w-64 h-80 bg-gray-200 rounded-xl shrink-0" />
    <div className="flex-1 flex flex-col gap-4">
      <div className="h-7 bg-gray-200 rounded w-48" />
      <div className="h-6 bg-gray-200 rounded w-28" />
      <div className="h-4 bg-gray-200 rounded w-40" />
      <div className="h-4 bg-gray-200 rounded w-36" />
      <div className="border-t border-gray-100 pt-4 mt-2 flex flex-col gap-2">
        <div className="h-5 bg-gray-200 rounded w-28" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
      </div>
    </div>
  </div>
);

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imagePage, setImagePage] = useState(1);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    getProductById(Number(id))
      .then((data) => setProduct(data))
      .catch(() => setError("Failed to load product details."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleBack = () => navigate(-1);

  if (loading) {
    return (
      <div className="py-4">
        <button
          onClick={handleBack}
          className="flex items-center gap-1 px-3 py-2 mb-4 border border-gray-300 rounded-lg text-sm text-gray-600 bg-white hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <SkeletonDetail />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="py-4">
        <button
          onClick={handleBack}
          className="flex items-center gap-1 px-3 py-2 mb-4 border border-gray-300 rounded-lg text-sm text-gray-600 bg-white hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center text-gray-500">
          {error ?? "Product not found."}
        </div>
      </div>
    );
  }

  const totalImagePages = product.images?.length || 0;

  return (
    <div className="py-4">
      {/* Back button */}
      <button
        onClick={handleBack}
        className="flex items-center gap-1 px-3 py-2 mb-4 border border-gray-300 rounded-lg text-sm text-gray-600 bg-white hover:bg-gray-50 transition-colors"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      {/* Main card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col md:flex-row gap-8">
        {/* Product image and pagination */}
        <div className="shrink-0 flex flex-col items-center w-full md:w-auto min-w-[16rem]">
          <div className="flex-1 flex items-center justify-center mb-4">
            <img
              src={product.images?.[imagePage - 1] || product.thumbnail}
              alt={product.title}
              className="w-56 h-72 object-contain rounded-xl"
            />
          </div>
          {totalImagePages > 1 && (
            <Pagination
              currentPage={imagePage}
              totalPages={totalImagePages}
              onPageChange={setImagePage}
            />
          )}
        </div>

        {/* Right side details */}
        <div className="flex-1 flex flex-col">
          {/* Title & Price */}
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{product.title}</h1>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            <Rating rating={product.rating} />
          </div>

          {/* Brand & Category */}
          <div className="flex flex-col gap-1 text-sm text-gray-700 mb-4">
            <p>
              <span className="font-semibold">Brand:</span> {product.brand}
            </p>
            <p>
              <span className="font-semibold">Category:</span>{" "}
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </p>
          </div>

          {/* Divider */}
          <hr className="border-gray-100 mb-4" />

          {/* Description */}
          <h2 className="text-base font-bold text-gray-900 mb-1">Description</h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            {product.description}
          </p>

          {/* Divider */}
          <hr className="border-gray-100 mb-4" />

          {/* Reviews */}
          <h2 className="text-base font-bold text-gray-900 mb-3">Reviews</h2>
          <div className="flex flex-col gap-4">
            {product.reviews?.map((review, index) => (
              <div key={index}>
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-semibold text-sm text-gray-900">
                    {review.reviewerName}
                  </span>
                  <Rating rating={review.rating} />
                </div>
                <p className="text-sm text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
