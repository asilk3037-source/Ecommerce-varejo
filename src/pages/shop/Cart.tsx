import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight, Tag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export function Cart() {
  const { items, itemCount, subtotal, removeItem, updateQuantity, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const shipping = subtotal >= 299 ? 0 : 19.9;
  const discount = subtotal > 1000 ? subtotal * 0.05 : 0;
  const total = subtotal + shipping - discount;

  const formatPrice = (p: number) => p.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <ShoppingCart size={56} className="text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Seu carrinho está vazio</h2>
        <p className="text-gray-500 text-sm mb-6">Explore nossos produtos e adicione itens ao carrinho</p>
        <Link to="/products" className="btn-primary">
          Explorar Produtos <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">

      {/* Page title */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-base sm:text-2xl font-bold text-gray-900">
          Meu Carrinho
          <span className="text-gray-400 font-normal text-sm sm:text-base ml-1.5">({itemCount})</span>
        </h1>
        <button
          onClick={clearCart}
          className="text-xs text-red-500 hover:text-red-600 font-medium flex items-center gap-1"
        >
          <Trash2 size={12} /> Limpar tudo
        </button>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4">

        {/* ── Cart Items ── */}
        <div className="lg:col-span-2 space-y-3">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 sm:p-4">
              <div className="flex gap-3">

                {/* Thumbnail */}
                <Link to={`/products/${product.id}`} className="flex-shrink-0">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg bg-gray-50"
                  />
                </Link>

                {/* Info — flex-1 + min-w-0 + overflow-hidden prevents horizontal blowout */}
                <div className="flex-1 min-w-0 overflow-hidden">
                  <div className="flex items-start justify-between gap-1 mb-1.5">
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] text-primary-600 font-semibold truncate">{product.brand}</p>
                      <Link to={`/products/${product.id}`}>
                        <h3 className="text-xs sm:text-sm font-semibold text-gray-900 hover:text-primary-700 line-clamp-2 leading-snug">
                          {product.name}
                        </h3>
                      </Link>
                    </div>
                    <button
                      onClick={() => removeItem(product.id)}
                      className="flex-shrink-0 p-1 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  {/* Quantity + Price row */}
                  <div className="flex items-center justify-between gap-2">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="px-2 py-1.5 hover:bg-gray-100 transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="px-2.5 py-1 text-xs font-bold text-gray-900 min-w-[24px] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        disabled={quantity >= product.stock}
                        className="px-2 py-1.5 hover:bg-gray-100 disabled:opacity-40 transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right flex-shrink-0">
                      {product.originalPrice && product.discount && (
                        <p className="text-[10px] text-gray-400 line-through leading-none">
                          {formatPrice(product.originalPrice * quantity)}
                        </p>
                      )}
                      <p className="text-sm sm:text-base font-black text-primary-900 leading-none">
                        {formatPrice(product.price * quantity)}
                      </p>
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        {formatPrice(product.price)} un.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Order Summary ── */}
        <div className="space-y-3 lg:space-y-4">

          {/* Coupon */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 sm:p-4">
            <h3 className="font-semibold text-gray-900 mb-2.5 flex items-center gap-1.5 text-sm">
              <Tag size={14} className="text-accent-500" /> Cupom de Desconto
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Código do cupom"
                className="flex-1 min-w-0 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button className="flex-shrink-0 bg-primary-900 hover:bg-primary-800 text-white text-sm font-semibold px-3 py-2 rounded-lg transition-colors">
                OK
              </button>
            </div>
          </div>

          {/* Summary card */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 lg:sticky lg:top-24">
            <h3 className="font-bold text-gray-900 mb-3 text-sm sm:text-base">Resumo do Pedido</h3>

            <div className="space-y-2.5 mb-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal ({itemCount} itens)</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Frete</span>
                <span className={`font-semibold ${shipping === 0 ? 'text-green-600' : ''}`}>
                  {shipping === 0 ? 'GRÁTIS' : formatPrice(shipping)}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Desconto (5%)</span>
                  <span className="text-green-600 font-semibold">-{formatPrice(discount)}</span>
                </div>
              )}
            </div>

            {subtotal < 299 && (
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-2.5 mb-4 text-xs text-blue-700">
                🚚 Faltam <strong>{formatPrice(299 - subtotal)}</strong> para frete grátis!
              </div>
            )}

            <div className="border-t border-gray-100 pt-3 mb-4">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-gray-900">Total</span>
                <span className="font-black text-lg sm:text-xl text-primary-900">{formatPrice(total)}</span>
              </div>
              <p className="text-[11px] text-gray-400 text-right mt-0.5">
                12x de {formatPrice(total / 12)} sem juros
              </p>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-accent-500 hover:bg-accent-600 active:scale-95 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm sm:text-base shadow-md shadow-accent-500/20"
            >
              Finalizar Compra <ArrowRight size={16} />
            </button>

            <Link
              to="/products"
              className="block text-center text-xs sm:text-sm text-primary-600 hover:text-primary-700 mt-3 font-medium"
            >
              ← Continuar Comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
