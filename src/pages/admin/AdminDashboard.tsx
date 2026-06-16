import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, Users, Package, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { salesStats, monthlySales, orders, products } from '../../data/mockData';

function StatCard({
  title, value, growth, icon: Icon, color, href
}: {
  title: string;
  value: string;
  growth: number;
  icon: React.ElementType;
  color: string;
  href: string;
}) {
  const isPositive = growth >= 0;
  return (
    <Link to={href} className="card p-5 hover:shadow-md transition-shadow block group">
      <div className="flex items-start justify-between mb-3">
        <div className={`${color} rounded-xl p-2.5`}>
          <Icon size={22} className="text-white" />
        </div>
        <span className={`flex items-center gap-0.5 text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-500'}`}>
          {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {Math.abs(growth)}%
        </span>
      </div>
      <p className="text-2xl font-black text-gray-900 mb-1">{value}</p>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xs text-primary-600 mt-2 group-hover:underline">Ver detalhes →</p>
    </Link>
  );
}

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

export function AdminDashboard() {
  const formatPrice = (p: number) => p.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const maxRevenue = Math.max(...monthlySales.map(m => m.revenue));

  const lowStockProducts = products.filter(p => p.stock <= 20).slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Receita Total"
          value={formatPrice(salesStats.totalRevenue)}
          growth={salesStats.revenueGrowth}
          icon={DollarSign}
          color="bg-green-500"
          href="/admin/reports"
        />
        <StatCard
          title="Total de Pedidos"
          value={salesStats.totalOrders.toLocaleString()}
          growth={salesStats.ordersGrowth}
          icon={ShoppingBag}
          color="bg-blue-500"
          href="/admin/orders"
        />
        <StatCard
          title="Clientes"
          value={salesStats.totalCustomers.toLocaleString()}
          growth={salesStats.customersGrowth}
          icon={Users}
          color="bg-purple-500"
          href="/admin/customers"
        />
        <StatCard
          title="Produtos Ativos"
          value={salesStats.totalProducts.toLocaleString()}
          growth={5.2}
          icon={Package}
          color="bg-accent-500"
          href="/admin/products"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 card p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-gray-900">Receita Mensal (2024)</h2>
            <span className="text-xs text-gray-500">R$ {(salesStats.totalRevenue / 1000).toFixed(0)}K total</span>
          </div>
          <div className="flex items-end gap-2 h-36">
            {monthlySales.map(({ month, revenue }) => (
              <div key={month} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs text-gray-500" style={{ fontSize: '10px' }}>
                  {formatPrice(revenue).replace('R$ ', 'R$')}
                </span>
                <div
                  className="w-full bg-primary-600 hover:bg-accent-500 rounded-t-sm transition-colors cursor-pointer"
                  style={{ height: `${(revenue / maxRevenue) * 100}px` }}
                  title={`${month}: ${formatPrice(revenue)}`}
                />
                <span className="text-xs text-gray-500">{month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Low stock */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900">Estoque Baixo</h2>
            <Link to="/admin/inventory" className="text-xs text-primary-600 hover:underline flex items-center gap-1">
              Ver tudo <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {lowStockProducts.map(product => (
              <div key={product.id} className="flex items-center gap-3">
                <img src={product.images[0]} alt={product.name} className="w-10 h-10 object-cover rounded-lg bg-gray-50" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                  <p className="text-xs text-gray-500">{product.category}</p>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                  product.stock <= 5 ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                }`}>
                  {product.stock}un
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-900">Pedidos Recentes</h2>
          <Link to="/admin/orders" className="text-xs text-primary-600 hover:underline flex items-center gap-1">
            Ver todos <ArrowRight size={12} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-gray-500 border-b border-gray-100">
                <th className="text-left pb-3 font-medium">Pedido</th>
                <th className="text-left pb-3 font-medium">Cliente</th>
                <th className="text-left pb-3 font-medium hidden sm:table-cell">Itens</th>
                <th className="text-left pb-3 font-medium">Status</th>
                <th className="text-right pb-3 font-medium">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 text-sm font-medium text-primary-700">{order.id}</td>
                  <td className="py-3">
                    <p className="text-sm font-medium text-gray-900">{order.customerName}</p>
                    <p className="text-xs text-gray-500">{order.createdAt}</p>
                  </td>
                  <td className="py-3 hidden sm:table-cell">
                    <span className="text-sm text-gray-600">{order.items.length} item(ns)</span>
                  </td>
                  <td className="py-3">
                    <span className={`badge ${statusColors[order.status]}`}>
                      {statusLabels[order.status]}
                    </span>
                  </td>
                  <td className="py-3 text-right text-sm font-bold text-gray-900">
                    {formatPrice(order.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
