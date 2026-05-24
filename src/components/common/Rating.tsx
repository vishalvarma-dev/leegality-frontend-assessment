import { Star, StarHalf } from "lucide-react";

const Rating = ({ rating }: { rating: number }) => {
  const roundedRating = Math.round(rating * 2) / 2;

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => {
          if (roundedRating >= star) {
            return (
              <Star
                key={star}
                size={14}
                className="fill-yellow-400 stroke-yellow-400"
              />
            );
          }
          if (roundedRating >= star - 0.5) {
            return (
              <StarHalf
                key={star}
                size={14}
                className="fill-yellow-400 stroke-yellow-400"
              />
            );
          }
          return (
            <Star
              key={star}
              size={14}
              className="fill-gray-200 stroke-gray-200 text-gray-200"
            />
          );
        })}
      </div>
      <span className="text-gray-500 text-sm font-medium">
        ({rating.toFixed(1)})
      </span>
    </div>
  );
};

export default Rating;
