import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight, ChevronLeft, Zap, Star, ArrowRight,
  Truck, ShieldCheck, RotateCcw, Headphones, TrendingUp
} from 'lucide-react';
import { ProductCard } from '../../components/ui/ProductCard';
import { products, categories } from '../../data/mockData';

const banners = [
  {
    id: 1,
    tag: 'Eletrônicos em Oferta',
    title: 'Tecnologia ao\nSeu Alcance',
    highlight: 'até 30% OFF',
    subtitle: 'Smartphones, notebooks e fones com os melhores preços do Brasil',
    cta: 'Comprar Agora',
    href: '/products?category=Eletrônicos',
    gradient: 'from-primary-950 via-primary-900 to-primary-800',
    accentColor: 'text-accent-400',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=900&q=80',
  },
  {
    id: 2,
    tag: 'Nova Coleção',
    title: 'Moda & Estilo\nExclusivos',
    highlight: 'frete grátis',
    subtitle: 'As últimas tendências com entrega expressa direto na sua porta',
    cta: 'Ver Coleção',
    href: '/products?category=Moda',
    gradient: 'from-purple-950 via-purple-900 to-purple-800',
    accentColor: 'text-purple-300',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
  },
  {
    id: 3,
    tag: 'Promoção Especial',
    title: 'Casa & Jardim\nRepaginados',
    highlight: '12x sem juros',
    subtitle: 'Tudo para deixar sua casa mais bonita e funcional com ótimos preços',
    cta: 'Aproveitar',
    href: '/products?category=Casa & Jardim',
    gradient: 'from-emerald-950 via-emerald-900 to-emerald-800',
    accentColor: 'text-emerald-300',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80',
  },
];

const trustItems = [
  { icon: Truck,       label: 'Frete Grátis',   sub: 'Acima de R$ 299',   color: 'text-blue-500'   },
  { icon: ShieldCheck, label: 'Compra Segura',   sub: '100% protegida',    color: 'text-green-500'  },
  { icon: RotateCcw,   label: 'Troca Fácil',    sub: 'Até 30 dias',       color: 'text-purple-500' },
  { icon: Headphones,  label: 'Suporte 24h',    sub: 'Sempre disponível', color: 'text-orange-500' },
];

const categoryColors = [
  'from-blue-500 to-blue-600',
  'from-purple-500 to-purple-600',
  'from-green-500 to-green-600',
  'from-orange-500 to-orange-600',
  'from-pink-500 to-pink-600',
  'from-teal-500 to-teal-600',
  'from-yellow-500 to-yellow-600',
  'from-red-500 to-red-600',
];

function useCountdown(targetSeconds: number) {
  const [secs, setSecs] = useState(targetSeconds);
  useEffect(() => {
    const t = setInterval(() => setSecs(s => (s > 0 ? s - 1 : targetSeconds)), 1000);
    return () => clearInterval(t);
  }, [targetSeconds]);
  const h = String(Math.floor(secs / 3600)).padStart(2, '0');
  const m = String(Math.floor((secs % 3600) / 60)).padStart(2, '0');
  const s = String(secs % 60).padStart(2, '0');
  return { h, m, s };
}

export function Home() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [bannerKey, setBannerKey] = useState(0);
  const featuredProducts = products.filter(p => p.featured);
  const dealsProducts = products.filter(p => (p.discount ?? 0) > 0).slice(0, 6);
  const newProducts = products.slice(-4);
  const countdown = useCountdown(4 * 3600 + 32 * 60 + 18);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner(prev => (prev + 1) % banners.length);
      setBannerKey(k => k + 1);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const goTo = (idx: number) => { setCurrentBanner(idx); setBannerKey(k => k + 1); };
  const nextBanner = () => goTo((currentBanner + 1) % banners.length);
  const prevBanner = () => goTo((currentBanner - 1 + banners.length) % banners.length);

  const banner = banners[currentBanner];

  return (
    <div className="min-h-screen">

      {/* ── Hero Banner ─────────────────────────────────── */}
      <div className="relative overflow-hidden h-64 sm:h-80 md:h-[420px]">
        <div key={bannerKey} className={`absolute inset-0 bg-gradient-to-r ${banner.gradient} animate-fade-in`} />
        <img
          key={`img-${bannerKey}`}
          src={banner.image}
          alt={banner.title}
          className="absolute inset-0 w-full h-full object-cover opacity-20 animate-fade-in"
        />
        {/* Decorative circles */}
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/5" />
        <div className="absolute right-10 -bottom-10 w-48 h-48 rounded-full bg-white/5" />

        {/* Content — left padding accounts for the arrow button width on mobile */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-12 sm:px-10 md:px-8 w-full">
            <div key={`content-${bannerKey}`} className="max-w-xl animate-slide-up">
              <span className="inline-block bg-white/15 backdrop-blur-sm text-white text-[11px] font-bold px-3 py-1 rounded-full mb-3 border border-white/20">
                {banner.tag}
              </span>
              <h1 className="text-xl sm:text-4xl md:text-5xl font-black text-white mb-1.5 leading-tight">
                {banner.title.replace('\n', ' ')}
              </h1>
              <p className={`text-base sm:text-lg md:text-xl font-black mb-2 ${banner.accentColor}`}>
                {banner.highlight}
              </p>
              <p className="text-white/70 mb-4 text-xs sm:text-sm md:text-base max-w-sm hidden sm:block">
                {banner.subtitle}
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <Link
                  to={banner.href}
                  className="bg-accent-500 hover:bg-accent-400 active:scale-95 text-white font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-xl inline-flex items-center gap-2 transition-all shadow-lg shadow-accent-500/30 text-sm sm:text-base"
                >
                  {banner.cta} <ArrowRight size={16} />
                </Link>
                <Link
                  to="/products"
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-xl inline-flex items-center gap-2 transition-all border border-white/20 backdrop-blur-sm text-sm sm:text-base"
                >
                  Ver Catálogo
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Prev / Next — positioned below content area on mobile to avoid overlap */}
        <button
          onClick={prevBanner}
          className="absolute left-1.5 sm:left-4 bottom-10 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-1.5 sm:p-2 transition-colors backdrop-blur-sm"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={nextBanner}
          className="absolute right-1.5 sm:right-4 bottom-10 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-1.5 sm:p-2 transition-colors backdrop-blur-sm"
        >
          <ChevronRight size={16} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`transition-all duration-300 rounded-full ${idx === currentBanner ? 'w-5 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/50'}`}
            />
          ))}
        </div>
      </div>

      {/* ── Trust bar ───────────────────────────────────── */}
      {/* gap-px + bg-gray-100 creates clean 1px dividers in any grid layout */}
      <div className="bg-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px">
            {trustItems.map(({ icon: Icon, label, sub, color }) => (
              <div key={label} className="bg-white flex items-center gap-2.5 py-3.5 px-3 sm:px-5">
                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0 ${color}`}>
                  <Icon size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">{label}</p>
                  <p className="text-[10px] sm:text-xs text-gray-500 leading-tight truncate">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Categories ──────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-10">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-base sm:text-xl font-bold text-gray-900">Comprar por Categoria</h2>
          <Link to="/products" className="text-xs sm:text-sm text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-0.5 transition-colors">
            Ver todas <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2 sm:gap-3">
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.name}`}
              className="group flex flex-col items-center gap-1.5 sm:gap-2.5 p-2 sm:p-3 rounded-2xl hover:-translate-y-1 transition-all duration-200"
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${categoryColors[i % categoryColors.length]} flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow text-xl sm:text-2xl`}>
                {cat.icon}
              </div>
              <span className="text-[10px] sm:text-[11px] text-gray-700 text-center font-semibold group-hover:text-primary-700 transition-colors leading-tight">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Deals of the Day ────────────────────────────── */}
      <div className="bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 py-6 sm:py-10 border-y border-red-100/50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">

          {/* Header row 1: title + link */}
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-red-500 rounded-lg sm:rounded-xl p-2 sm:p-2.5 shadow-md shadow-red-500/30">
                <Zap size={15} className="text-white fill-white" />
              </div>
              <div>
                <h2 className="text-base sm:text-xl font-black text-gray-900 leading-none">Ofertas do Dia</h2>
                <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">Desconto por tempo limitado</p>
              </div>
            </div>
            <Link to="/products" className="text-xs sm:text-sm text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-0.5 transition-colors">
              Ver todas <ChevronRight size={14} />
            </Link>
          </div>

          {/* Header row 2: countdown timer on its own line */}
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <span className="text-[11px] sm:text-xs font-semibold text-gray-500">Termina em:</span>
            {[countdown.h, countdown.m, countdown.s].map((val, i) => (
              <span key={i} className="flex items-center gap-1">
                <span className="bg-primary-900 text-white font-black text-xs sm:text-sm px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-md sm:rounded-lg min-w-[30px] sm:min-w-[36px] text-center tabular-nums shadow-sm">
                  {val}
                </span>
                {i < 2 && <span className="text-primary-900 font-black text-xs sm:text-sm">:</span>}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
            {dealsProducts.map(product => (
              <ProductCard key={product.id} product={product} compact />
            ))}
          </div>
        </div>
      </div>

      {/* ── Featured Products ───────────────────────────── */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-10">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div>
            <h2 className="text-base sm:text-xl font-black text-gray-900 flex items-center gap-1.5">
              <Star size={18} className="text-yellow-400 fill-yellow-400" />
              Produtos em Destaque
            </h2>
            <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">Os favoritos dos nossos clientes</p>
          </div>
          <Link to="/products" className="text-xs sm:text-sm text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-0.5 transition-colors">
            Ver todos <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* ── Stats strip ─────────────────────────────────── */}
      <div className="bg-primary-900 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            {[
              { value: '50.000+', label: 'Clientes Satisfeitos', icon: '😊' },
              { value: '10.000+', label: 'Produtos Disponíveis', icon: '📦' },
              { value: '4.9/5',   label: 'Avaliação Média',      icon: '⭐' },
              { value: '24h',     label: 'Suporte ao Cliente',   icon: '💬' },
            ].map(s => (
              <div key={s.label} className="flex flex-col items-center gap-1">
                <span className="text-xl sm:text-2xl">{s.icon}</span>
                <p className="text-lg sm:text-2xl font-black text-white">{s.value}</p>
                <p className="text-[10px] sm:text-xs text-primary-300 font-medium leading-tight">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── New Arrivals ────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-10">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div>
            <h2 className="text-base sm:text-xl font-black text-gray-900 flex items-center gap-1.5">
              <TrendingUp size={18} className="text-green-500" />
              Novidades
            </h2>
            <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">Recém-chegados na loja</p>
          </div>
          <Link to="/products" className="text-xs sm:text-sm text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-0.5 transition-colors">
            Ver todos <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
          {newProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* ── Promo banner ────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 pb-8 sm:pb-12">
        <div className="relative bg-gradient-to-r from-primary-950 via-primary-900 to-primary-800 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
          {/* Decorative */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-accent-500/10" />
            <div className="absolute right-20 -bottom-10 w-48 h-48 rounded-full bg-primary-400/10" />
          </div>

          <div className="relative flex flex-col lg:flex-row items-center gap-6 p-6 sm:p-8 md:p-12">
            <div className="flex-1 text-center lg:text-left w-full">
              <span className="inline-block bg-accent-500/20 text-accent-400 text-[11px] font-bold px-3 py-1.5 rounded-full mb-3 sm:mb-4 border border-accent-500/30">
                🎁 Programa de Fidelidade
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-2 sm:mb-3 leading-tight">
                Cadastre-se e ganhe{' '}
                <span className="text-accent-400">10% de desconto</span>{' '}
                na primeira compra
              </h2>
              <p className="text-primary-200 mb-4 sm:mb-6 text-xs sm:text-sm max-w-sm mx-auto lg:mx-0">
                Mais de 50.000 clientes já aproveitam benefícios exclusivos, cashback e promoções antecipadas.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link
                  to="/register"
                  className="bg-accent-500 hover:bg-accent-400 active:scale-95 text-white font-bold px-6 py-2.5 sm:py-3 rounded-xl transition-all shadow-lg shadow-accent-500/30 flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  Criar Conta Grátis <ArrowRight size={16} />
                </Link>
                <Link
                  to="/about"
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-2.5 sm:py-3 rounded-xl transition-all border border-white/20 flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  Saiba Mais
                </Link>
              </div>
            </div>

            {/* Benefit cards — only on large screens */}
            <div className="hidden lg:grid grid-cols-2 gap-3 flex-shrink-0">
              {[
                { emoji: '🎁', title: 'Cupons Exclusivos',  desc: 'Ofertas só para membros' },
                { emoji: '💳', title: 'Cashback',           desc: '5% em todo pedido'       },
                { emoji: '🚚', title: 'Frete Grátis',       desc: 'Sem valor mínimo'        },
                { emoji: '⚡', title: 'Acesso Antecipado',  desc: 'Às melhores ofertas'    },
              ].map(b => (
                <div key={b.title} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                  <div className="text-2xl mb-2">{b.emoji}</div>
                  <p className="text-white font-bold text-sm">{b.title}</p>
                  <p className="text-primary-300 text-xs mt-0.5">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
