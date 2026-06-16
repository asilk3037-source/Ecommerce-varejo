import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart, Heart, Share2, ChevronRight, Minus, Plus,
  Truck, Shield, RotateCcw, Award, Star
} from 'lucide-react';
import { products } from '../../data/mockData';
import { useCart } from '../../context/CartContext';
import { StarRating } from '../../components/ui/StarRating';
import { ProductCard } from '../../components/ui/ProductCard';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem, isInCart } = useCart();
  const product = products.find(p => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <span className="text-5xl mb-4 block">😕</span>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Produto não encontrado</h2>
        <Link to="/products" className="btn-primary mt-4">Ver todos os produtos</Link>
      </div>
    );
  }

  const formatPrice = (p: number) => p.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const inCart = isInCart(product.id);

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    navigate('/cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-primary-600">Início</Link>
        <ChevronRight size={14} />
        <Link to="/products" className="hover:text-primary-600">Produtos</Link>
        <ChevronRight size={14} />
        <Link to={`/products?category=${product.category}`} className="hover:text-primary-600">{product.category}</Link>
        <ChevronRight size={14} />
        <span className="text-gray-900 font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Images */}
        <div className="space-y-3">
          <div className="bg-gray-50 rounded-2xl overflow-hidden aspect-square">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-contain p-4"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === idx ? 'border-primary-600' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div>
          <p className="text-sm text-primary-600 font-semibold mb-1">{product.brand}</p>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-4 mb-4">
            <StarRating rating={product.rating} reviewCount={product.reviewCount} />
            <span className="text-sm text-gray-500">{product.sold.toLocaleString()} vendidos</span>
          </div>

          {/* SKU */}
          <p className="text-xs text-gray-400 mb-4">SKU: {product.sku}</p>

          {/* Price */}
          <div className="bg-gray-50 rounded-xl p-4 mb-5">
            {product.originalPrice && (
              <div className="flex items-center gap-2 mb-1">
                <span className="text-gray-400 line-through text-sm">{formatPrice(product.originalPrice)}</span>
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  -{product.discount}% OFF
                </span>
              </div>
            )}
            <p className="text-3xl font-black text-primary-900">{formatPrice(product.price)}</p>
            <p className="text-sm text-green-600 font-medium mt-1">
              Em até 12x de {formatPrice(product.price / 12)} sem juros
            </p>
            <p className="text-sm text-green-700 font-semibold mt-1">
              {formatPrice(product.price * 0.95)} no PIX (5% OFF)
            </p>
          </div>

          {/* Stock */}
          <div className="flex items-center gap-2 mb-5">
            <span className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className={`text-sm font-medium ${product.stock > 0 ? 'text-green-700' : 'text-red-600'}`}>
              {product.stock > 0
                ? product.stock <= 5
                  ? `Apenas ${product.stock} em estoque!`
                  : 'Em estoque'
                : 'Fora de estoque'
              }
            </span>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-5">
            <span className="text-sm font-medium text-gray-700">Quantidade:</span>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="px-3 py-2 hover:bg-gray-100 transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="px-4 py-2 font-semibold text-gray-900 min-w-[3rem] text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                className="px-3 py-2 hover:bg-gray-100 transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={handleBuyNow}
              disabled={product.stock === 0}
              className="flex-1 bg-accent-500 hover:bg-accent-600 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Comprar Agora
            </button>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex-1 font-bold py-3 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2 ${
                inCart
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-primary-900 text-white hover:bg-primary-800'
              }`}
            >
              <ShoppingCart size={18} />
              {inCart ? 'No Carrinho' : 'Adicionar'}
            </button>
            <button className="border border-gray-300 hover:border-red-300 hover:bg-red-50 p-3 rounded-xl transition-colors">
              <Heart size={20} className="text-gray-500 hover:text-red-500" />
            </button>
            <button className="border border-gray-300 hover:bg-gray-50 p-3 rounded-xl transition-colors">
              <Share2 size={20} className="text-gray-500" />
            </button>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Truck, title: 'Frete Grátis', desc: 'Acima de R$ 299' },
              { icon: Shield, title: 'Garantia', desc: '12 meses' },
              { icon: RotateCcw, title: 'Devolução', desc: '30 dias' },
              { icon: Award, title: 'Original', desc: '100% autêntico' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-2 bg-gray-50 rounded-lg p-3">
                <Icon size={18} className="text-primary-600 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-gray-800">{title}</p>
                  <p className="text-xs text-gray-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-12">
        <div className="flex border-b border-gray-200 mb-6">
          {[
            { id: 'description', label: 'Descrição' },
            { id: 'specs', label: 'Especificações' },
            { id: 'reviews', label: `Avaliações (${product.reviewCount})` },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-semibold transition-colors border-b-2 -mb-px ${
                activeTab === tab.id
                  ? 'border-primary-600 text-primary-700'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'description' && (
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {product.tags.map(tag => (
                <span key={tag} className="badge bg-primary-100 text-primary-700">#{tag}</span>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'specs' && (
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              ['Marca', product.brand],
              ['Categoria', product.category],
              ['SKU', product.sku],
              ['Estoque', `${product.stock} unidades`],
              ['Vendidos', product.sold.toLocaleString()],
              ['Avaliação', `${product.rating}/5`],
            ].map(([key, val]) => (
              <div key={key} className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                <span className="text-sm font-semibold text-gray-600 w-28 flex-shrink-0">{key}:</span>
                <span className="text-sm text-gray-900">{val}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            <div className="flex items-center gap-6 mb-6 p-6 bg-gray-50 rounded-xl">
              <div className="text-center">
                <p className="text-5xl font-black text-gray-900">{product.rating}</p>
                <div className="flex justify-center my-1">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} size={16} className={s <= Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200 fill-gray-200'} />
                  ))}
                </div>
                <p className="text-sm text-gray-500">{product.reviewCount.toLocaleString()} avaliações</p>
              </div>
              <div className="flex-1 space-y-2">
                {[5,4,3,2,1].map(star => (
                  <div key={star} className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 w-3">{star}</span>
                    <Star size={12} className="fill-yellow-400 text-yellow-400" />
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{ width: `${star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 7 : 2}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-500 text-center">As avaliações dos clientes serão exibidas aqui.</p>
          </div>
        )}
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Produtos Relacionados</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}
