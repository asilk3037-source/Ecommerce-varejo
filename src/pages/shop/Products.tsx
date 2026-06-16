import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, ChevronDown, X, Grid, List } from 'lucide-react';
import { ProductCard } from '../../components/ui/ProductCard';
import { products, categories } from '../../data/mockData';

const sortOptions = [
  { value: 'relevance', label: 'Relevância' },
  { value: 'price-asc', label: 'Menor Preço' },
  { value: 'price-desc', label: 'Maior Preço' },
  { value: 'rating', label: 'Mais Avaliados' },
  { value: 'newest', label: 'Mais Recentes' },
];

export function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState('relevance');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const searchQuery = searchParams.get('search') || '';

  const filtered = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }

    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (minRating > 0) {
      result = result.filter(p => p.rating >= minRating);
    }

    switch (sort) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      default: break;
    }

    return result;
  }, [searchQuery, selectedCategory, priceRange, minRating, sort]);

  const clearFilter = (type: string) => {
    if (type === 'category') { setSelectedCategory(''); setSearchParams({}); }
    if (type === 'search') setSearchParams({});
    if (type === 'rating') setMinRating(0);
    if (type === 'price') setPriceRange([0, 10000]);
  };

  const activeFilters = [
    selectedCategory && { type: 'category', label: selectedCategory },
    searchQuery && { type: 'search', label: `"${searchQuery}"` },
    minRating > 0 && { type: 'rating', label: `${minRating}+ estrelas` },
    (priceRange[0] > 0 || priceRange[1] < 10000) && {
      type: 'price',
      label: `R$ ${priceRange[0]} - R$ ${priceRange[1]}`
    },
  ].filter(Boolean) as Array<{ type: string; label: string }>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex gap-6">
        {/* Filters Sidebar */}
        <aside className={`
          fixed md:static inset-0 z-40 bg-black/50 md:bg-transparent
          ${showFilters ? 'block' : 'hidden md:block'}
          md:w-64 flex-shrink-0
        `}>
          <div className="absolute md:static right-0 top-0 bottom-0 w-72 md:w-full bg-white md:rounded-xl shadow-sm border border-gray-100 p-5 overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-gray-900">Filtros</h3>
              <button onClick={() => setShowFilters(false)} className="md:hidden p-1 hover:bg-gray-100 rounded">
                <X size={18} />
              </button>
            </div>

            {/* Category filter */}
            <div className="mb-6">
              <h4 className="font-semibold text-sm text-gray-700 mb-3">Categoria</h4>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === ''}
                    onChange={() => setSelectedCategory('')}
                    className="text-primary-600"
                  />
                  <span className="text-sm text-gray-600">Todas as categorias</span>
                </label>
                {categories.map(cat => (
                  <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === cat.name}
                      onChange={() => setSelectedCategory(cat.name)}
                      className="text-primary-600"
                    />
                    <span className="text-sm text-gray-600">{cat.icon} {cat.name}</span>
                    <span className="ml-auto text-xs text-gray-400">({cat.productCount})</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price range */}
            <div className="mb-6">
              <h4 className="font-semibold text-sm text-gray-700 mb-3">Faixa de Preço</h4>
              <div className="flex gap-2">
                <div>
                  <label className="text-xs text-gray-500">Mínimo</label>
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="input-field text-sm"
                    min={0}
                    max={priceRange[1]}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Máximo</label>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="input-field text-sm"
                    min={priceRange[0]}
                  />
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="mb-6">
              <h4 className="font-semibold text-sm text-gray-700 mb-3">Avaliação Mínima</h4>
              <div className="space-y-2">
                {[0, 3, 4, 4.5].map(rating => (
                  <label key={rating} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      checked={minRating === rating}
                      onChange={() => setMinRating(rating)}
                      className="text-primary-600"
                    />
                    <span className="text-sm text-gray-600">
                      {rating === 0 ? 'Qualquer avaliação' : `${rating}+ ⭐`}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Products area */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <button
              onClick={() => setShowFilters(true)}
              className="md:hidden btn-outline text-sm py-2 px-4"
            >
              <SlidersHorizontal size={16} /> Filtros
            </button>

            <h1 className="text-lg font-bold text-gray-900">
              {searchQuery ? `Resultados para "${searchQuery}"` : selectedCategory || 'Todos os Produtos'}
            </h1>

            <span className="text-sm text-gray-500">
              {filtered.length} produto{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
            </span>

            <div className="ml-auto flex items-center gap-3">
              {/* View mode */}
              <div className="hidden sm:flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-primary-900 text-white' : 'hover:bg-gray-50 text-gray-600'}`}
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-primary-900 text-white' : 'hover:bg-gray-50 text-gray-600'}`}
                >
                  <List size={16} />
                </button>
              </div>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  className="input-field py-2 text-sm pr-8 appearance-none cursor-pointer"
                >
                  {sortOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Active filters */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {activeFilters.map(f => (
                <span
                  key={f.type}
                  className="flex items-center gap-1.5 bg-primary-100 text-primary-800 text-xs font-medium px-3 py-1.5 rounded-full"
                >
                  {f.label}
                  <button onClick={() => clearFilter(f.type)}>
                    <X size={12} />
                  </button>
                </span>
              ))}
              <button
                onClick={() => { setSelectedCategory(''); setMinRating(0); setPriceRange([0, 10000]); setSearchParams({}); }}
                className="text-xs text-red-600 hover:text-red-700 font-medium px-2"
              >
                Limpar todos
              </button>
            </div>
          )}

          {/* Products grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <span className="text-5xl mb-4 block">🔍</span>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum produto encontrado</h3>
              <p className="text-gray-500 text-sm">Tente ajustar os filtros ou buscar por outros termos</p>
            </div>
          ) : (
            <div className={`grid gap-4 ${
              viewMode === 'grid'
                ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
                : 'grid-cols-1 sm:grid-cols-2'
            }`}>
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
