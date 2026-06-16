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
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <ShoppingCart size={64} className="text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Seu carrinho está vazio</h2>
        <p className="text-gray-500 mb-6">Explore nossos produtos e adicione itens ao carrinho</p>
        <Link to="/products" className="btn-primary">
          Explorar Produtos <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h1 className="text-lg sm:text-2xl font-bold text-gray-900">
          Carrinho ({itemCount} {itemCount === 1 ? 'item' : 'itens'})
        </h1>
        <button
          onClick={clearCart}
          className="text-xs sm:text-sm text-red-500 hover:text-red-600 font-medium flex items-center gap-1"
        >
          <Trash2 size={13} /> Limpar
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Items */}
        <div className="lg:col-span-2 space-y-2 sm:space-y-3">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="card p-3 sm:p-4 flex gap-3 sm:gap-4">
              <Link to={`/products/${product.id}`} className="flex-shrink-0">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-lg bg-gray-50"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex gap-2 justify-between">
                  <div className="min-w-0">
                    <p className="text-[10px] sm:text-xs text-primary-600 font-medium">{product.brand}</p>
                    <Link to={`/products/${product.id}`}>
                      <h3 className="text-xs sm:text-sm font-semibold text-gray-900 hover:text-primary-700 line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>
                    {product.stock <= 5 && (
                      <p className="text-[10px] sm:text-xs text-orange-600 mt-0.5">Apenas {product.stock} em estoque</p>
                    )}
                  </div>
                  <button
                    onClick={() => removeItem(product.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0 p-1"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="flex items-center justify-between mt-2 sm:mt-3">
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="px-2 py-1 sm:px-2.5 sm:py-1.5 hover:bg-gray-100 transition-colors"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-semibold">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      disabled={quantity >= product.stock}
                      className="px-2 py-1 sm:px-2.5 sm:py-1.5 hover:bg-gray-100 disabled:opacity-40 transition-colors"
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                  <div className="text-right">
                    {product.originalPrice && (
                      <p className="text-[10px] sm:text-xs text-gray-400 line-through">
                        {formatPrice(product.originalPrice * quantity)}
                      </p>
                    )}
                    <p className="text-sm sm:text-base font-bold text-primary-900">
                      {formatPrice(product.price * quantity)}
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-500">
                      {formatPrice(product.price)} cada
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="space-y-3 sm:space-y-4">
          {/* Coupon */}
          <div className="card p-3 sm:p-4">
            <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
              <Tag size={15} className="text-accent-500" /> Cupom de Desconto
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Digite o cupom"
                className="input-field text-sm flex-1 py-2"
              />
              <button className="btn-secondary text-sm py-2 px-3 sm:px-4">Aplicar</button>
            </div>
          </div>

          {/* Order summary */}
          <div className="card p-4 sm:p-5 lg:sticky lg:top-24">
            <h3 className="font-bold text-gray-900 mb-4">Resumo do Pedido</h3>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal ({itemCount} itens)</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Frete</span>
                <span className={shipping === 0 ? 'text-green-600 font-medium' : 'font-medium'}>
                  {shipping === 0 ? 'GRÁTIS' : formatPrice(shipping)}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Desconto (5%)</span>
                  <span className="text-green-600 font-medium">-{formatPrice(discount)}</span>
                </div>
              )}
              {subtotal < 299 && (
                <div className="bg-blue-50 rounded-lg p-3 text-xs text-blue-700">
                  Adicione mais {formatPrice(299 - subtotal)} para frete grátis! 🚚
                </div>
              )}
            </div>

            <div className="border-t border-gray-100 pt-4 mb-5">
              <div className="flex justify-between">
                <span className="font-bold text-gray-900">Total</span>
                <span className="font-bold text-xl text-primary-900">{formatPrice(total)}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1 text-right">
                Em até 12x de {formatPrice(total / 12)} sem juros
              </p>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-accent-500 hover:bg-accent-600 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              Finalizar Compra <ArrowRight size={18} />
            </button>

            <Link
              to="/products"
              className="block text-center text-sm text-primary-600 hover:text-primary-700 mt-3 font-medium"
            >
              Continuar Comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
