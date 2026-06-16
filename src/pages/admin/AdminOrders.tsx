import { useState } from 'react';
import { Search, Eye, ShoppingBag, ChevronDown } from 'lucide-react';
import { orders as initialOrders } from '../../data/mockData';
import { Order } from '../../types';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  processing: 'bg-blue-100 text-blue-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

const statusLabels: Record<string, string> = {
  pending: 'Pendente',
  processing: 'Processando',
  shipped: 'Enviado',
  delivered: 'Entregue',
  cancelled: 'Cancelado',
};

const paymentColors: Record<string, string> = {
  pending: 'text-yellow-600',
  paid: 'text-green-600',
  refunded: 'text-red-500',
};

const paymentLabels: Record<string, string> = {
  pending: 'Pendente',
  paid: 'Pago',
  refunded: 'Estornado',
};

export function AdminOrders() {
  const [orderList, setOrderList] = useState<Order[]>(initialOrders);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const formatPrice = (p: number) => p.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const filtered = orderList.filter(o => {
    const matchSearch = !search ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !statusFilter || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const updateStatus = (id: string, status: Order['status']) => {
    setOrderList(prev =>
      prev.map(o => o.id === id ? { ...o, status, updatedAt: new Date().toISOString().split('T')[0] } : o)
    );
    if (selectedOrder?.id === id) {
      setSelectedOrder(prev => prev ? { ...prev, status } : null);
    }
  };

  const totalRevenue = orderList.reduce((s, o) => s + o.total, 0);
  const delivered = orderList.filter(o => o.status === 'delivered').length;
  const pending = orderList.filter(o => o.status === 'pending').length;

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="card p-3 text-center">
          <p className="text-lg font-black text-gray-900">{orderList.length}</p>
          <p className="text-xs text-gray-500">Total Pedidos</p>
        </div>
        <div className="card p-3 text-center">
          <p className="text-lg font-black text-yellow-600">{pending}</p>
          <p className="text-xs text-gray-500">Pendentes</p>
        </div>
        <div className="card p-3 text-center">
          <p className="text-lg font-black text-green-600">{delivered}</p>
          <p className="text-xs text-gray-500">Entregues</p>
        </div>
        <div className="card p-3 text-center">
          <p className="text-lg font-black text-primary-900">{formatPrice(totalRevenue)}</p>
          <p className="text-xs text-gray-500">Receita Total</p>
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
            placeholder="Buscar pedido, cliente ou e-mail..."
            className="input-field pl-9 text-sm"
          />
        </div>
        <div className="relative">
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="input-field text-sm pr-8 appearance-none"
          >
            <option value="">Todos os status</option>
            {Object.entries(statusLabels).map(([val, label]) => (
              <option key={val} value={val}>{label}</option>
            ))}
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
                <th className="text-left p-4 font-semibold">Pedido</th>
                <th className="text-left p-4 font-semibold">Cliente</th>
                <th className="text-left p-4 font-semibold hidden sm:table-cell">Data</th>
                <th className="text-center p-4 font-semibold">Status</th>
                <th className="text-center p-4 font-semibold hidden md:table-cell">Pagamento</th>
                <th className="text-right p-4 font-semibold">Total</th>
                <th className="text-center p-4 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(order => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <p className="text-sm font-bold text-primary-700">{order.id}</p>
                    <p className="text-xs text-gray-500">{order.items.length} item(ns)</p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm font-medium text-gray-900">{order.customerName}</p>
                    <p className="text-xs text-gray-500 hidden sm:block">{order.customerEmail}</p>
                  </td>
                  <td className="p-4 hidden sm:table-cell">
                    <p className="text-sm text-gray-600">{order.createdAt}</p>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`badge ${statusColors[order.status]}`}>
                      {statusLabels[order.status]}
                    </span>
                  </td>
                  <td className="p-4 text-center hidden md:table-cell">
                    <p className={`text-xs font-semibold ${paymentColors[order.paymentStatus]}`}>
                      {paymentLabels[order.paymentStatus]}
                    </p>
                    <p className="text-xs text-gray-400">{order.paymentMethod}</p>
                  </td>
                  <td className="p-4 text-right">
                    <p className="text-sm font-bold text-gray-900">{formatPrice(order.total)}</p>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="p-1.5 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
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
              <ShoppingBag size={32} className="text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">Nenhum pedido encontrado</p>
            </div>
          )}
        </div>
      </div>

      {/* Order detail modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Pedido {selectedOrder.id}</h2>
                <p className="text-sm text-gray-500">{selectedOrder.createdAt}</p>
              </div>
              <span className={`badge ${statusColors[selectedOrder.status]}`}>
                {statusLabels[selectedOrder.status]}
              </span>
            </div>

            <div className="p-6 space-y-4">
              {/* Client info */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Cliente</h3>
                <p className="text-sm font-medium">{selectedOrder.customerName}</p>
                <p className="text-xs text-gray-500">{selectedOrder.customerEmail}</p>
              </div>

              {/* Items */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Itens</h3>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <img src={item.image} alt={item.productName} className="w-10 h-10 object-cover rounded-lg bg-gray-50" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{item.productName}</p>
                        <p className="text-xs text-gray-500">Qtd: {item.quantity} × {formatPrice(item.price)}</p>
                      </div>
                      <p className="text-sm font-bold">{formatPrice(item.total)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-600">Subtotal</span><span>{formatPrice(selectedOrder.subtotal)}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Frete</span><span className={selectedOrder.shipping === 0 ? 'text-green-600' : ''}>{selectedOrder.shipping === 0 ? 'Grátis' : formatPrice(selectedOrder.shipping)}</span></div>
                {selectedOrder.discount > 0 && <div className="flex justify-between text-green-600"><span>Desconto</span><span>-{formatPrice(selectedOrder.discount)}</span></div>}
                <div className="flex justify-between font-bold border-t pt-2"><span>Total</span><span>{formatPrice(selectedOrder.total)}</span></div>
              </div>

              {/* Tracking */}
              {selectedOrder.trackingCode && (
                <div className="bg-blue-50 rounded-xl p-3 text-sm">
                  <span className="text-blue-700 font-medium">Código de Rastreio: </span>
                  <span className="font-mono">{selectedOrder.trackingCode}</span>
                </div>
              )}

              {/* Status change */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Atualizar Status</h3>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.entries(statusLabels) as [Order['status'], string][]).map(([status, label]) => (
                    <button
                      key={status}
                      onClick={() => updateStatus(selectedOrder.id, status)}
                      className={`text-xs py-2 px-3 rounded-lg border transition-colors ${
                        selectedOrder.status === status
                          ? 'border-primary-600 bg-primary-50 text-primary-700 font-bold'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100">
              <button onClick={() => setSelectedOrder(null)} className="btn-outline w-full justify-center">Fechar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
