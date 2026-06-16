import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Tag, Zap, Star, ArrowRight } from 'lucide-react';
import { ProductCard } from '../../components/ui/ProductCard';
import { products, categories } from '../../data/mockData';

const banners = [
  {
    id: 1,
    title: 'Eletrônicos com até 30% OFF',
    subtitle: 'Smartphones, notebooks e muito mais com os melhores preços',
    cta: 'Comprar Agora',
    href: '/products?category=Eletrônicos',
    bg: 'from-primary-900 to-primary-700',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800',
  },
  {
    id: 2,
    title: 'Moda & Estilo Exclusivos',
    subtitle: 'As últimas tendências com entrega expressa para você',
    cta: 'Ver Coleção',
    href: '/products?category=Moda',
    bg: 'from-purple-900 to-purple-700',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
  },
  {
    id: 3,
    title: 'Frete Grátis no Brasil',
    subtitle: 'Compras acima de R$ 299 com entrega em até 5 dias úteis',
    cta: 'Aproveitar',
    href: '/products',
    bg: 'from-emerald-900 to-emerald-700',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
  },
];

export function Home() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const featuredProducts = products.filter(p => p.featured);
  const dealsProducts = products.slice(0, 6);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner(prev => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextBanner = () => setCurrentBanner(prev => (prev + 1) % banners.length);
  const prevBanner = () => setCurrentBanner(prev => (prev - 1 + banners.length) % banners.length);

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="relative overflow-hidden h-80 md:h-96">
        {banners.map((banner, idx) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-700 ${idx === currentBanner ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${banner.bg}`} />
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
                <div className="max-w-lg">
                  <span className="inline-block bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                    Oferta Especial
                  </span>
                  <h1 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight">
                    {banner.title}
                  </h1>
                  <p className="text-white/80 mb-6 text-sm md:text-base">{banner.subtitle}</p>
                  <Link
                    to={banner.href}
                    className="bg-accent-500 hover:bg-accent-600 text-white font-semibold px-6 py-3 rounded-lg inline-flex items-center gap-2 transition-colors"
                  >
                    {banner.cta} <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Controls */}
        <button
          onClick={prevBanner}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={nextBanner}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors"
        >
          <ChevronRight size={20} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentBanner(idx)}
              className={`w-2 h-2 rounded-full transition-colors ${idx === currentBanner ? 'bg-white' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Tag size={20} className="text-accent-500" />
            Comprar por Categoria
          </h2>
          <Link to="/products" className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
            Ver todas <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {categories.map(cat => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.name}`}
              className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl shadow-sm hover:shadow-md hover:border-primary-200 border border-transparent transition-all group"
            >
              <span className="text-2xl">{cat.icon}</span>
              <span className="text-xs text-gray-700 text-center font-medium group-hover:text-primary-700">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Deals of the Day */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Zap size={20} className="text-accent-500 fill-accent-500" />
              Ofertas do Dia
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full ml-1">
                HOT
              </span>
            </h2>
            <Link to="/products" className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
              Ver todas <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {dealsProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Star size={20} className="text-yellow-400 fill-yellow-400" />
            Produtos em Destaque
          </h2>
          <Link to="/products" className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
            Ver todos <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Promotional banner */}
      <div className="max-w-7xl mx-auto px-4 pb-10">
        <div className="bg-primary-900 rounded-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex-1 p-8 md:p-12">
              <span className="text-accent-400 text-sm font-semibold uppercase tracking-wider">Programa de Fidelidade</span>
              <h2 className="text-2xl md:text-3xl font-black text-white mt-2 mb-3">
                Cadastre-se e ganhe<br />
                <span className="text-accent-400">10% de desconto</span> na primeira compra
              </h2>
              <p className="text-primary-200 mb-6 text-sm">
                Junte-se a mais de 50.000 clientes satisfeitos e aproveite benefícios exclusivos.
              </p>
              <div className="flex gap-3">
                <Link
                  to="/register"
                  className="bg-accent-500 hover:bg-accent-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  Criar Conta Grátis
                </Link>
                <Link
                  to="/about"
                  className="border border-white/30 text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  Saiba Mais
                </Link>
              </div>
            </div>
            <div className="hidden md:block w-64 p-8">
              <div className="grid grid-cols-2 gap-3">
                {['🎁', '💳', '🚚', '⭐'].map((emoji, i) => (
                  <div key={i} className="bg-primary-800 rounded-xl p-4 text-center">
                    <span className="text-2xl">{emoji}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
