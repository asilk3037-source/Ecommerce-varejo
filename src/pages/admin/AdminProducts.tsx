import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Package, Star, ChevronDown } from 'lucide-react';
import { products as initialProducts } from '../../data/mockData';
import { Product } from '../../types';

export function AdminProducts() {
  const [productList, setProductList] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [sortBy, setSortBy] = useState('name');

  const formatPrice = (p: number) => p.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const filtered = productList.filter(p => {
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    const matchCategory = !categoryFilter || p.category === categoryFilter;
    return matchSearch && matchCategory;
  }).sort((a, b) => {
    if (sortBy === 'price') return b.price - a.price;
    if (sortBy === 'stock') return a.stock - b.stock;
    if (sortBy === 'rating') return b.rating - a.rating;
    return a.name.localeCompare(b.name);
  });

  const categories = [...new Set(productList.map(p => p.category))];

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      setProductList(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  return (
    <div className="space-y-4">
      {/* Top bar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex-1 min-w-60">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar por nome, marca ou SKU..."
              className="input-field pl-9 text-sm"
            />
          </div>
        </div>

        <div className="relative">
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="input-field text-sm pr-8 appearance-none"
          >
            <option value="">Todas as categorias</option>
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>
          <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="input-field text-sm pr-8 appearance-none"
          >
            <option value="name">Nome A-Z</option>
            <option value="price">Maior Preço</option>
            <option value="stock">Menor Estoque</option>
            <option value="rating">Melhor Avaliação</option>
          </select>
          <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        <button
          onClick={() => { setEditingProduct(null); setShowModal(true); }}
          className="btn-primary text-sm py-2"
        >
          <Plus size={16} /> Novo Produto
        </button>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="card p-3 text-center">
          <p className="text-lg font-black text-gray-900">{productList.length}</p>
          <p className="text-xs text-gray-500">Total de Produtos</p>
        </div>
        <div className="card p-3 text-center">
          <p className="text-lg font-black text-orange-600">{productList.filter(p => p.stock <= 10).length}</p>
          <p className="text-xs text-gray-500">Estoque Crítico</p>
        </div>
        <div className="card p-3 text-center">
          <p className="text-lg font-black text-green-600">{productList.filter(p => p.featured).length}</p>
          <p className="text-xs text-gray-500">Em Destaque</p>
        </div>
      </div>

      {/* Product table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="text-xs text-gray-500 border-b border-gray-200">
                <th className="text-left p-4 font-semibold">Produto</th>
                <th className="text-left p-4 font-semibold hidden md:table-cell">SKU</th>
                <th className="text-left p-4 font-semibold hidden sm:table-cell">Categoria</th>
                <th className="text-right p-4 font-semibold">Preço</th>
                <th className="text-center p-4 font-semibold">Estoque</th>
                <th className="text-center p-4 font-semibold hidden lg:table-cell">Avaliação</th>
                <th className="text-center p-4 font-semibold">Status</th>
                <th className="text-center p-4 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(product => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
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
                  <td className="p-4 hidden md:table-cell">
                    <span className="text-xs font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded">{product.sku}</span>
                  </td>
                  <td className="p-4 hidden sm:table-cell">
                    <span className="text-sm text-gray-600">{product.category}</span>
                  </td>
                  <td className="p-4 text-right">
                    <p className="text-sm font-bold text-gray-900">{formatPrice(product.price)}</p>
                    {product.discount && (
                      <p className="text-xs text-red-500">-{product.discount}%</p>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    <span className={`text-sm font-bold px-2 py-1 rounded-full ${
                      product.stock <= 5 ? 'bg-red-100 text-red-700' :
                      product.stock <= 20 ? 'bg-orange-100 text-orange-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="p-4 text-center hidden lg:table-cell">
                    <div className="flex items-center justify-center gap-1">
                      <Star size={12} className="fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-700">{product.rating}</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    {product.featured ? (
                      <span className="badge bg-primary-100 text-primary-700">Destaque</span>
                    ) : (
                      <span className="badge bg-gray-100 text-gray-600">Normal</span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-1.5 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-1.5 hover:bg-red-100 text-red-500 rounded-lg transition-colors"
                        title="Excluir"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">
                {editingProduct ? 'Editar Produto' : 'Novo Produto'}
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Nome do Produto</label>
                <input type="text" defaultValue={editingProduct?.name} placeholder="Nome do produto" className="input-field" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Preço</label>
                  <input type="number" defaultValue={editingProduct?.price} placeholder="0.00" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Estoque</label>
                  <input type="number" defaultValue={editingProduct?.stock} placeholder="0" className="input-field" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Categoria</label>
                  <select className="input-field" defaultValue={editingProduct?.category}>
                    <option value="">Selecione</option>
                    {categories.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Marca</label>
                  <input type="text" defaultValue={editingProduct?.brand} placeholder="Marca" className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Descrição</label>
                <textarea rows={3} defaultValue={editingProduct?.description} placeholder="Descrição do produto" className="input-field resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">URL da Imagem</label>
                <input type="url" placeholder="https://..." className="input-field" defaultValue={editingProduct?.images[0]} />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked={editingProduct?.featured} className="text-primary-600" />
                <span className="text-sm text-gray-700">Produto em Destaque</span>
              </label>
            </div>
            <div className="p-6 border-t border-gray-100 flex gap-3">
              <button onClick={() => setShowModal(false)} className="btn-outline flex-1">Cancelar</button>
              <button onClick={() => setShowModal(false)} className="btn-primary flex-1">
                {editingProduct ? 'Salvar Alterações' : 'Criar Produto'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
