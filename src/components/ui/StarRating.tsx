import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: number;
  showValue?: boolean;
  reviewCount?: number;
}

export function StarRating({ rating, size = 16, showValue = true, reviewCount }: StarRatingProps) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map(star => {
          const filled = star <= Math.floor(rating);
          const partial = !filled && star === Math.ceil(rating);
          return (
            <div key={star} className="relative">
              <Star size={size} className="text-gray-200 fill-gray-200" />
              {(filled || partial) && (
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: filled ? '100%' : `${(rating % 1) * 100}%` }}
                >
                  <Star size={size} className="text-yellow-400 fill-yellow-400" />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {showValue && (
        <span className="text-sm font-semibold text-gray-800">{rating.toFixed(1)}</span>
      )}
      {reviewCount !== undefined && (
        <span className="text-sm text-gray-500">({reviewCount.toLocaleString()} avaliações)</span>
      )}
    </div>
  );
}
