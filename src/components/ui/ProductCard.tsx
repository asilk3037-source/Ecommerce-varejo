import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Heart, Eye, Zap } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export function ProductCard({ product, compact = false }: ProductCardProps) {
  const { addItem, isInCart } = useCart();
  const inCart = isInCart(product.id);

  const formatPrice = (price: number) =>
    price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  const discountPercent = product.discount ?? 0;

  return (
    <Link to={`/products/${product.id}`} className="group block h-full">
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden h-full flex flex-col
        shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out">

        {/* Image container */}
        <div className="relative overflow-hidden bg-gray-50" style={{ aspectRatio: '1' }}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          />

          {/* Overlay gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
            {discountPercent > 0 && (
              <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-md flex items-center gap-0.5">
                <Zap size={9} className="fill-white" />
                -{discountPercent}%
              </span>
            )}
            {product.featured && (
              <span className="bg-primary-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md flex items-center gap-0.5">
                <Star size={9} className="fill-yellow-400 text-yellow-400" />
                Destaque
              </span>
            )}
          </div>

          {product.stock > 0 && product.stock <= 5 && (
            <span className="absolute top-2.5 right-10 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">
              Últimas!
            </span>
          )}

          {/* Action buttons (aparecem no hover) */}
          <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
            <button
              onClick={e => e.preventDefault()}
              className="bg-white hover:bg-red-50 rounded-full p-1.5 shadow-md transition-colors"
              title="Adicionar aos favoritos"
            >
              <Heart size={15} className="text-gray-400 hover:text-red-500 transition-colors" />
            </button>
            <Link
              to={`/products/${product.id}`}
              className="bg-white hover:bg-primary-50 rounded-full p-1.5 shadow-md transition-colors block"
              title="Ver produto"
              onClick={e => e.stopPropagation()}
            >
              <Eye size={15} className="text-gray-400 hover:text-primary-600 transition-colors" />
            </Link>
          </div>

          {/* Quick add to cart (aparece no hover, bottom) */}
          {!compact && (
            <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <button
                onClick={handleAddToCart}
                className={`w-full py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                  inCart
                    ? 'bg-green-500 text-white'
                    : 'bg-primary-900 hover:bg-primary-800 text-white'
                }`}
              >
                <ShoppingCart size={14} />
                {inCart ? 'Adicionado ✓' : 'Adicionar ao Carrinho'}
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className={`flex flex-col flex-1 ${compact ? 'p-3' : 'p-4'}`}>
          <p className="text-[10px] text-primary-600 font-semibold uppercase tracking-wider mb-1">{product.brand}</p>

          <h3 className={`font-medium text-gray-800 line-clamp-2 flex-1 leading-snug mb-2 group-hover:text-primary-700 transition-colors ${compact ? 'text-xs' : 'text-sm'}`}>
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-2.5">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  size={10}
                  className={star <= Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : star === Math.ceil(product.rating) && product.rating % 1 > 0
                      ? 'fill-yellow-200 text-yellow-300'
                      : 'text-gray-200 fill-gray-200'
                  }
                />
              ))}
            </div>
            <span className="text-[10px] text-gray-400 font-medium">({product.reviewCount >= 1000
              ? `${(product.reviewCount / 1000).toFixed(1)}k`
              : product.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="mt-auto">
            {product.originalPrice && discountPercent > 0 && (
              <p className="text-[10px] text-gray-400 line-through leading-none mb-0.5">
                {formatPrice(product.originalPrice)}
              </p>
            )}
            <p className={`font-black text-primary-900 leading-none ${compact ? 'text-base' : 'text-lg'}`}>
              {formatPrice(product.price)}
            </p>
            <p className="text-[10px] text-green-600 font-medium mt-0.5">
              {compact ? '12x sem juros' : `12x de ${formatPrice(product.price / 12)} s/ juros`}
            </p>
          </div>

          {/* Add to cart button (sempre visível em telas pequenas / compact) */}
          {compact && (
            <button
              onClick={handleAddToCart}
              className={`mt-2.5 w-full py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                inCart ? 'bg-green-100 text-green-700' : 'bg-primary-900 text-white hover:bg-primary-800'
              }`}
            >
              <ShoppingCart size={12} />
              {inCart ? 'Adicionado' : 'Adicionar'}
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}
