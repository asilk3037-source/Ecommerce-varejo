import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, isInCart } = useCart();
  const inCart = isInCart(product.id);

  const formatPrice = (price: number) =>
    price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
  };

  return (
    <Link to={`/products/${product.id}`} className="group">
      <div className="card hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
        {/* Image */}
        <div className="relative overflow-hidden bg-gray-50 aspect-square">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.discount && product.discount > 0 && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              -{product.discount}%
            </span>
          )}
          {product.stock <= 5 && product.stock > 0 && (
            <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              Últimas unidades
            </span>
          )}
          <button
            onClick={e => { e.preventDefault(); }}
            className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-sm hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
          >
            <Heart size={16} className="text-gray-400 hover:text-red-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <p className="text-xs text-primary-600 font-medium mb-1">{product.brand}</p>
          <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 flex-1">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  size={12}
                  className={star <= Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200 fill-gray-200'}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">({product.reviewCount.toLocaleString()})</span>
          </div>

          {/* Price */}
          <div className="mb-3">
            {product.originalPrice && (
              <p className="text-xs text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </p>
            )}
            <p className="text-lg font-bold text-primary-900">
              {formatPrice(product.price)}
            </p>
            <p className="text-xs text-green-600 font-medium">
              Em até 12x sem juros
            </p>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            className={`
              w-full py-2 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2
              ${inCart
                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                : 'bg-primary-900 text-white hover:bg-primary-800'
              }
            `}
          >
            <ShoppingCart size={16} />
            {inCart ? 'Adicionado' : 'Adicionar ao Carrinho'}
          </button>
        </div>
      </div>
    </Link>
  );
}
