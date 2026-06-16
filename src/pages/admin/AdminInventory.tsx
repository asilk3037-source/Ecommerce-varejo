import { useState } from 'react';
import { Search, AlertTriangle, TrendingDown, Package, Plus, Minus, ChevronDown } from 'lucide-react';
import { products as initialProducts } from '../../data/mockData';
import { Product } from '../../types';

export function AdminInventory() {
  const [productList, setProductList] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [adjustments, setAdjustments] = useState<Record<string, number>>({});

  const filtered = productList.filter(p => {
    const matchSearch = !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    if (filter === 'critical') return matchSearch && p.stock <= 5;
    if (filter === 'low') return matchSearch && p.stock <= 20 && p.stock > 5;
    if (filter === 'ok') return matchSearch && p.stock > 20;
    return matchSearch;
  });

  const critical = productList.filter(p => p.stock <= 5).length;
  const low = productList.filter(p => p.stock <= 20 && p.stock > 5).length;
  const ok = productList.filter(p => p.stock > 20).length;

  const adjust = (id: string, delta: number) => {
    setAdjustments(prev => ({ ...prev, [id]: (prev[id] || 0) + delta }));
  };

  const applyAdjustment = (id: string) => {
    const delta = adjustments[id] || 0;
    if (delta === 0) return;
    setProductList(prev =>
      prev.map(p => p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p)
    );
    setAdjustments(prev => ({ ...prev, [id]: 0 }));
  };

  const stockStatus = (stock: number) => {
    if (stock <= 5) return { label: 'Crítico', color: 'bg-red-100 text-red-700', dot: 'bg-red-500' };
    if (stock <= 20) return { label: 'Baixo', color: 'bg-orange-100 text-orange-700', dot: 'bg-orange-400' };
    if (stock <= 50) return { label: 'Normal', color: 'bg-blue-100 text-blue-700', dot: 'bg-blue-400' };
    return { label: 'Alto', color: 'bg-green-100 text-green-700', dot: 'bg-green-500' };
  };

  return (
    <div className="space-y-4">
      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        <div
          className={`card p-4 cursor-pointer border-2 transition-colors ${filter === 'critical' ? 'border-red-400' : 'border-transparent'}`}
          onClick={() => setFilter(filter === 'critical' ? 'all' : 'critical')}
        >
          <div className="flex items-center gap-3">
            <div className="bg-red-100 rounded-lg p-2">
              <AlertTriangle size={20} className="text-red-600" />
            </div>
            <div>
              <p className="text-xl font-black text-red-600">{critical}</p>
              <p className="text-xs text-gray-500">Crítico (≤5)</p>
            </div>
          </div>
        </div>
        <div
          className={`card p-4 cursor-pointer border-2 transition-colors ${filter === 'low' ? 'border-orange-400' : 'border-transparent'}`}
          onClick={() => setFilter(filter === 'low' ? 'all' : 'low')}
        >
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 rounded-lg p-2">
              <TrendingDown size={20} className="text-orange-600" />
            </div>
            <div>
              <p className="text-xl font-black text-orange-600">{low}</p>
              <p className="text-xs text-gray-500">Baixo (6-20)</p>
            </div>
          </div>
        </div>
        <div
          className={`card p-4 cursor-pointer border-2 transition-colors ${filter === 'ok' ? 'border-green-400' : 'border-transparent'}`}
          onClick={() => setFilter(filter === 'ok' ? 'all' : 'ok')}
        >
          <div className="flex items-center gap-3">
            <div className="bg-green-100 rounded-lg p-2">
              <Package size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-xl font-black text-green-600">{ok}</p>
              <p className="text-xs text-gray-500">Normal (&gt;20)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-60 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar produto ou SKU..."
            className="input-field pl-9 text-sm"
          />
        </div>
        <div className="relative">
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="input-field text-sm pr-8 appearance-none"
          >
            <option value="all">Todos ({productList.length})</option>
            <option value="critical">Crítico ({critical})</option>
            <option value="low">Baixo ({low})</option>
            <option value="ok">Normal ({ok})</option>
          </select>
          <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Inventory table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="text-xs text-gray-500 border-b border-gray-200">
                <th className="text-left p-4 font-semibold">Produto</th>
                <th className="text-left p-4 font-semibold hidden sm:table-cell">SKU</th>
                <th className="text-center p-4 font-semibold">Estoque Atual</th>
                <th className="text-center p-4 font-semibold">Status</th>
                <th className="text-left p-4 font-semibold hidden md:table-cell">Vendidos</th>
                <th className="text-center p-4 font-semibold">Ajustar Estoque</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(product => {
                const status = stockStatus(product.stock);
                const adj = adjustments[product.id] || 0;
                return (
                  <tr key={product.id} className={`transition-colors ${product.stock <= 5 ? 'bg-red-50/50' : 'hover:bg-gray-50'}`}>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${status.dot}`} />
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded-lg bg-gray-50 flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate max-w-xs">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 hidden sm:table-cell">
                      <span className="text-xs font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded">{product.sku}</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-xl font-black text-gray-900">{product.stock}</span>
                      <p className="text-xs text-gray-500">unidades</p>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`badge ${status.color}`}>{status.label}</span>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <span className="text-sm text-gray-700">{product.sold.toLocaleString()} vendidos</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => adjust(product.id, -5)}
                          className="p-1.5 hover:bg-red-100 text-red-500 rounded-lg transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <div className="text-center min-w-[3rem]">
                          <span className={`text-sm font-bold ${adj > 0 ? 'text-green-600' : adj < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                            {adj > 0 ? '+' : ''}{adj}
                          </span>
                        </div>
                        <button
                          onClick={() => adjust(product.id, 5)}
                          className="p-1.5 hover:bg-green-100 text-green-600 rounded-lg transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                        {adj !== 0 && (
                          <button
                            onClick={() => applyAdjustment(product.id)}
                            className="text-xs bg-primary-900 text-white px-2 py-1 rounded-lg hover:bg-primary-800"
                          >
                            OK
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="py-12 text-center">
              <Package size={32} className="text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">Nenhum produto encontrado</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
