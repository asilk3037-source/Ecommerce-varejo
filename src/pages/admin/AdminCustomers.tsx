import { useState } from 'react';
import { Search, Mail, Phone, Eye, ChevronDown, Users } from 'lucide-react';
import { users } from '../../data/mockData';
import { User } from '../../types';

export function AdminCustomers() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const formatPrice = (p: number) => p.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const filtered = users.filter(u =>
    !search ||
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    (u.phone || '').includes(search)
  ).sort((a, b) => {
    if (sortBy === 'orders') return b.totalOrders - a.totalOrders;
    if (sortBy === 'spent') return b.totalSpent - a.totalSpent;
    return a.name.localeCompare(b.name);
  });

  const totalCustomers = users.length;
  const totalRevenue = users.reduce((s, u) => s + u.totalSpent, 0);
  const avgSpent = totalRevenue / totalCustomers;

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card p-4 text-center">
          <p className="text-2xl font-black text-primary-900">{totalCustomers}</p>
          <p className="text-xs text-gray-500">Total de Clientes</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-black text-green-600">{formatPrice(totalRevenue)}</p>
          <p className="text-xs text-gray-500">Receita Total</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-black text-blue-600">{formatPrice(avgSpent)}</p>
          <p className="text-xs text-gray-500">Ticket Médio por Cliente</p>
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
            placeholder="Buscar por nome, e-mail ou telefone..."
            className="input-field pl-9 text-sm"
          />
        </div>
        <div className="relative">
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="input-field text-sm pr-8 appearance-none"
          >
            <option value="name">Nome A-Z</option>
            <option value="orders">Mais Pedidos</option>
            <option value="spent">Maior Gasto</option>
          </select>
          <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="text-xs text-gray-500 border-b border-gray-200">
                <th className="text-left p-4 font-semibold">Cliente</th>
                <th className="text-left p-4 font-semibold hidden sm:table-cell">Contato</th>
                <th className="text-left p-4 font-semibold hidden md:table-cell">Localização</th>
                <th className="text-center p-4 font-semibold">Pedidos</th>
                <th className="text-right p-4 font-semibold">Total Gasto</th>
                <th className="text-center p-4 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(user => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary-100 rounded-full w-9 h-9 flex items-center justify-center font-bold text-primary-700 text-sm flex-shrink-0">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">Desde {user.createdAt}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 hidden sm:table-cell">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-gray-600">
                        <Mail size={12} />
                        {user.email}
                      </div>
                      {user.phone && (
                        <div className="flex items-center gap-1.5 text-xs text-gray-600">
                          <Phone size={12} />
                          {user.phone}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    {user.address ? (
                      <p className="text-sm text-gray-600">
                        {user.address.city}, {user.address.state}
                      </p>
                    ) : (
                      <span className="text-xs text-gray-400">Não informado</span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-sm font-bold text-gray-900">{user.totalOrders}</span>
                  </td>
                  <td className="p-4 text-right">
                    <span className="text-sm font-bold text-gray-900">{formatPrice(user.totalSpent)}</span>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="p-1.5 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                      title="Ver detalhes"
                    >
                      <Eye size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="py-12 text-center">
              <Users size={32} className="text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">Nenhum cliente encontrado</p>
            </div>
          )}
        </div>
      </div>

      {/* Detail modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center font-black text-primary-700 text-lg">
                  {selectedUser.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{selectedUser.name}</h2>
                  <p className="text-sm text-gray-500">{selectedUser.email}</p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <p className="text-xl font-black text-green-700">{formatPrice(selectedUser.totalSpent)}</p>
                  <p className="text-xs text-gray-500">Total Gasto</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <p className="text-xl font-black text-blue-700">{selectedUser.totalOrders}</p>
                  <p className="text-xs text-gray-500">Pedidos</p>
                </div>
              </div>
              {selectedUser.phone && (
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Phone size={14} className="text-gray-400" />
                  {selectedUser.phone}
                </div>
              )}
              {selectedUser.address && (
                <div className="text-sm text-gray-700">
                  <p className="font-medium mb-1">Endereço:</p>
                  <p className="text-gray-600">
                    {selectedUser.address.street}, {selectedUser.address.number}
                    {selectedUser.address.complement && ` - ${selectedUser.address.complement}`}<br />
                    {selectedUser.address.neighborhood} - {selectedUser.address.city}/{selectedUser.address.state}
                    <br />{selectedUser.address.zipCode}
                  </p>
                </div>
              )}
              <p className="text-xs text-gray-400">Cliente desde {selectedUser.createdAt}</p>
            </div>
            <div className="p-4 border-t border-gray-100">
              <button onClick={() => setSelectedUser(null)} className="btn-outline w-full justify-center">Fechar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
