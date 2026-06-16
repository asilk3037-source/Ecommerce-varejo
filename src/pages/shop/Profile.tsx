import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Package, MapPin, Lock, Edit2, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { orders } from '../../data/mockData';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  processing: 'bg-blue-100 text-blue-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

const statusLabels: Record<string, string> = {
  pending: 'Pendente',
  processing: 'Em Processamento',
  shipped: 'Enviado',
  delivered: 'Entregue',
  cancelled: 'Cancelado',
};

export function Profile() {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);

  const formatPrice = (p: number) => p.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  if (!isAuthenticated || !user) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <User size={48} className="text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Faça login para ver seu perfil</h2>
        <Link to="/login" className="btn-primary mt-4">Fazer Login</Link>
      </div>
    );
  }

  const handleSave = async () => {
    await new Promise(r => setTimeout(r, 800));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { id: 'profile', label: 'Meus Dados', icon: User },
    { id: 'orders', label: 'Pedidos', icon: Package },
    { id: 'address', label: 'Endereço', icon: MapPin },
    { id: 'security', label: 'Segurança', icon: Lock },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="card p-6 mb-6 flex items-center gap-4">
        <div className="bg-primary-900 rounded-full w-16 h-16 flex items-center justify-center text-white font-black text-2xl">
          {user.name.charAt(0)}
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">{user.name}</h1>
          <p className="text-gray-500 text-sm">{user.email}</p>
          <p className="text-xs text-gray-400 mt-1">Membro desde {user.createdAt}</p>
        </div>
        <div className="ml-auto hidden sm:flex gap-4 text-center">
          <div>
            <p className="text-xl font-black text-primary-900">{user.totalOrders}</p>
            <p className="text-xs text-gray-500">Pedidos</p>
          </div>
          <div>
            <p className="text-xl font-black text-primary-900">{formatPrice(user.totalSpent)}</p>
            <p className="text-xs text-gray-500">Total Gasto</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <nav className="space-y-1">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === id
                  ? 'bg-primary-900 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="md:col-span-3">
          {activeTab === 'profile' && (
            <div className="card p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-gray-900">Dados Pessoais</h2>
                {saved && (
                  <span className="flex items-center gap-1.5 text-green-600 text-sm">
                    <CheckCircle size={16} /> Salvo!
                  </span>
                )}
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Nome Completo</label>
                  <input type="text" defaultValue={user.name} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">E-mail</label>
                  <input type="email" defaultValue={user.email} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Telefone</label>
                  <input type="tel" defaultValue={user.phone || ''} placeholder="(00) 00000-0000" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Data de Nascimento</label>
                  <input type="date" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">CPF</label>
                  <input type="text" placeholder="000.000.000-00" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Gênero</label>
                  <select className="input-field">
                    <option value="">Prefiro não informar</option>
                    <option>Masculino</option>
                    <option>Feminino</option>
                    <option>Outro</option>
                  </select>
                </div>
              </div>
              <button onClick={handleSave} className="btn-primary mt-5">
                <Edit2 size={16} /> Salvar Alterações
              </button>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900">Meus Pedidos</h2>
              {orders.slice(0, 3).map(order => (
                <div key={order.id} className="card p-4">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <p className="font-bold text-gray-900 text-sm">Pedido #{order.id}</p>
                      <p className="text-xs text-gray-500">{order.createdAt}</p>
                    </div>
                    <span className={`badge ${statusColors[order.status]}`}>
                      {statusLabels[order.status]}
                    </span>
                  </div>
                  <div className="flex gap-2 mb-3">
                    {order.items.slice(0, 3).map((item, i) => (
                      <img key={i} src={item.image} alt={item.productName} className="w-12 h-12 object-cover rounded-lg bg-gray-50" />
                    ))}
                    {order.items.length > 3 && (
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-500 font-medium">
                        +{order.items.length - 3}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-primary-900">{formatPrice(order.total)}</p>
                    {order.trackingCode && (
                      <span className="text-xs text-gray-500">Rastreio: {order.trackingCode}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'address' && (
            <div className="card p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-5">Endereço de Entrega</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">CEP</label>
                  <input type="text" defaultValue={user.address?.zipCode || ''} placeholder="00000-000" className="input-field" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Rua</label>
                  <input type="text" defaultValue={user.address?.street || ''} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Número</label>
                  <input type="text" defaultValue={user.address?.number || ''} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Complemento</label>
                  <input type="text" defaultValue={user.address?.complement || ''} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Bairro</label>
                  <input type="text" defaultValue={user.address?.neighborhood || ''} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Cidade</label>
                  <input type="text" defaultValue={user.address?.city || ''} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Estado</label>
                  <input type="text" defaultValue={user.address?.state || ''} className="input-field" />
                </div>
              </div>
              <button onClick={handleSave} className="btn-primary mt-5">
                <Edit2 size={16} /> Salvar Endereço
              </button>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="card p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-5">Alterar Senha</h2>
              <div className="space-y-4 max-w-sm">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Senha Atual</label>
                  <input type="password" placeholder="••••••••" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Nova Senha</label>
                  <input type="password" placeholder="••••••••" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirmar Nova Senha</label>
                  <input type="password" placeholder="••••••••" className="input-field" />
                </div>
                <button className="btn-primary">
                  <Lock size={16} /> Alterar Senha
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
