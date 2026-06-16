import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Package, BarChart2, Users, ShoppingBag,
  TrendingUp, LogOut, Menu, X, Bell, ChevronRight, Store
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: Package, label: 'Produtos', href: '/admin/products' },
  { icon: BarChart2, label: 'Estoque', href: '/admin/inventory' },
  { icon: Users, label: 'Clientes', href: '/admin/customers' },
  { icon: ShoppingBag, label: 'Pedidos', href: '/admin/orders' },
  { icon: TrendingUp, label: 'Relatórios', href: '/admin/reports' },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const currentPage = navItems.find(item => item.href === location.pathname)?.label || 'Dashboard';

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50
        w-64 bg-primary-900 text-white flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="p-5 border-b border-primary-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-accent-500 rounded-lg p-1.5">
              <span className="font-black text-white text-base leading-none">SK</span>
            </div>
            <div>
              <span className="font-bold text-sm block">SK Services</span>
              <span className="text-primary-300 text-xs">Painel Admin</span>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden hover:bg-primary-800 p-1 rounded"
          >
            <X size={18} />
          </button>
        </div>

        {/* Admin info */}
        <div className="px-5 py-4 border-b border-primary-800">
          <div className="flex items-center gap-3">
            <div className="bg-accent-500 rounded-full w-9 h-9 flex items-center justify-center font-bold text-sm">
              {user?.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-medium">{user?.name.split(' ')[0]}</p>
              <p className="text-primary-300 text-xs">Administrador</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map(({ icon: Icon, label, href }) => {
              const isActive = location.pathname === href;
              return (
                <li key={href}>
                  <Link
                    to={href}
                    onClick={() => setSidebarOpen(false)}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                      ${isActive
                        ? 'bg-accent-500 text-white'
                        : 'text-primary-200 hover:bg-primary-800 hover:text-white'
                      }
                    `}
                  >
                    <Icon size={18} />
                    {label}
                    {isActive && <ChevronRight size={14} className="ml-auto" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom actions */}
        <div className="p-3 border-t border-primary-800 space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-primary-200 hover:bg-primary-800 hover:text-white transition-colors"
          >
            <Store size={18} />
            Ver Loja
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-900/30 w-full transition-colors"
          >
            <LogOut size={18} />
            Sair
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4 flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu size={20} />
          </button>

          <div>
            <h1 className="text-lg font-bold text-gray-900">{currentPage}</h1>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Link to="/admin" className="hover:text-primary-600">Admin</Link>
              {currentPage !== 'Dashboard' && (
                <>
                  <span>/</span>
                  <span>{currentPage}</span>
                </>
              )}
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent-500 rounded-full"></span>
            </button>
            <div className="bg-accent-500 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold text-sm">
              {user?.name.charAt(0)}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
