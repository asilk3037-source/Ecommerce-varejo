import { TrendingUp, DollarSign, ShoppingBag, Users, Package, Award } from 'lucide-react';
import { salesStats, monthlySales, products, orders } from '../../data/mockData';

export function AdminReports() {
  const formatPrice = (p: number) => p.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const maxRevenue = Math.max(...monthlySales.map(m => m.revenue));
  const maxOrders = Math.max(...monthlySales.map(m => m.orders));

  const topProducts = [...products].sort((a, b) => b.sold - a.sold).slice(0, 5);
  const topCategories = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + p.sold;
    return acc;
  }, {} as Record<string, number>);
  const topCatEntries = Object.entries(topCategories).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const maxCatSold = Math.max(...topCatEntries.map(e => e[1]));

  const paymentMethods = orders.reduce((acc, o) => {
    acc[o.paymentMethod] = (acc[o.paymentMethod] || 0) + o.total;
    return acc;
  }, {} as Record<string, number>);

  const kpis = [
    { icon: DollarSign, label: 'Receita Total', value: formatPrice(salesStats.totalRevenue), growth: salesStats.revenueGrowth, color: 'bg-green-500' },
    { icon: ShoppingBag, label: 'Total de Pedidos', value: salesStats.totalOrders.toLocaleString(), growth: salesStats.ordersGrowth, color: 'bg-blue-500' },
    { icon: Users, label: 'Clientes Ativos', value: salesStats.totalCustomers.toLocaleString(), growth: salesStats.customersGrowth, color: 'bg-purple-500' },
    { icon: Package, label: 'Ticket Médio', value: formatPrice(salesStats.avgOrderValue), growth: 5.2, color: 'bg-accent-500' },
  ];

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map(({ icon: Icon, label, value, growth, color }) => (
          <div key={label} className="card p-4">
            <div className="flex items-start justify-between mb-3">
              <div className={`${color} rounded-xl p-2`}>
                <Icon size={20} className="text-white" />
              </div>
              <span className="flex items-center gap-0.5 text-sm font-semibold text-green-600">
                <TrendingUp size={12} />
                {growth}%
              </span>
            </div>
            <p className="text-xl font-black text-gray-900">{value}</p>
            <p className="text-xs text-gray-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue chart */}
        <div className="card p-5">
          <h2 className="font-bold text-gray-900 mb-5">Receita por Mês</h2>
          <div className="space-y-3">
            {monthlySales.map(({ month, revenue }) => (
              <div key={month} className="flex items-center gap-3">
                <span className="text-xs text-gray-500 w-7">{month}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                  <div
                    className="bg-primary-600 h-full rounded-full flex items-center justify-end pr-2 transition-all"
                    style={{ width: `${(revenue / maxRevenue) * 100}%` }}
                  >
                    <span className="text-white text-xs font-medium">
                      R${(revenue / 1000).toFixed(0)}k
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Orders chart */}
        <div className="card p-5">
          <h2 className="font-bold text-gray-900 mb-5">Pedidos por Mês</h2>
          <div className="space-y-3">
            {monthlySales.map(({ month, orders }) => (
              <div key={month} className="flex items-center gap-3">
                <span className="text-xs text-gray-500 w-7">{month}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                  <div
                    className="bg-accent-500 h-full rounded-full flex items-center justify-end pr-2 transition-all"
                    style={{ width: `${(orders / maxOrders) * 100}%` }}
                  >
                    <span className="text-white text-xs font-medium">{orders}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top products */}
        <div className="card p-5">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Award size={18} className="text-yellow-500" /> Top 5 Produtos Mais Vendidos
          </h2>
          <div className="space-y-3">
            {topProducts.map((product, idx) => (
              <div key={product.id} className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                  idx === 0 ? 'bg-yellow-400 text-white' :
                  idx === 1 ? 'bg-gray-300 text-gray-700' :
                  idx === 2 ? 'bg-orange-400 text-white' :
                  'bg-gray-100 text-gray-600'
                }`}>{idx + 1}</span>
                <img src={product.images[0]} alt={product.name} className="w-10 h-10 object-cover rounded-lg bg-gray-50" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                  <p className="text-xs text-gray-500">{product.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{product.sold.toLocaleString()} un</p>
                  <p className="text-xs text-green-600">{formatPrice(product.sold * product.price)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="card p-5">
          <h2 className="font-bold text-gray-900 mb-4">Vendas por Categoria</h2>
          <div className="space-y-3">
            {topCatEntries.map(([category, sold]) => (
              <div key={category}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">{category}</span>
                  <span className="text-gray-500">{sold.toLocaleString()} vendidos</span>
                </div>
                <div className="bg-gray-100 rounded-full h-2.5">
                  <div
                    className="bg-primary-600 h-2.5 rounded-full"
                    style={{ width: `${(sold / maxCatSold) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment methods */}
      <div className="card p-5">
        <h2 className="font-bold text-gray-900 mb-4">Formas de Pagamento</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Object.entries(paymentMethods).map(([method, total]) => (
            <div key={method} className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-lg font-black text-gray-900">{formatPrice(total)}</p>
              <p className="text-xs text-gray-500 mt-1">{method}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
