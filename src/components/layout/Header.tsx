import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart, Search, User, Menu, X, ChevronDown,
  Package, LogOut, LayoutDashboard, Heart, MapPin
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export function Header() {
  const { itemCount } = useCart();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  const navLinks = [
    { label: 'Eletrônicos', href: '/products?category=Eletrônicos' },
    { label: 'Moda', href: '/products?category=Moda' },
    { label: 'Casa & Jardim', href: '/products?category=Casa & Jardim' },
    { label: 'Esportes', href: '/products?category=Esportes' },
    { label: 'Sobre Nós', href: '/about' },
  ];

  return (
    <header className="bg-primary-900 text-white sticky top-0 z-50 shadow-lg">
      {/* Top bar */}
      <div className="border-b border-primary-800">
        <div className="max-w-7xl mx-auto px-4 py-1 flex items-center justify-between text-xs text-primary-200">
          <div className="flex items-center gap-1">
            <MapPin size={12} />
            <span>Entrega para todo o Brasil</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Frete grátis acima de R$ 299</span>
            <span>|</span>
            <Link to="/about" className="hover:text-white transition-colors">Central de Ajuda</Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2">
            <div className="bg-accent-500 rounded-lg p-1.5">
              <span className="font-black text-white text-lg leading-none">SK</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-lg leading-none block">SK Services</span>
              <span className="text-primary-300 text-xs">Varejo Online</span>
            </div>
          </Link>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
            <div className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Buscar produtos, marcas e muito mais..."
                className="flex-1 px-4 py-2.5 rounded-l-lg text-gray-900 text-sm focus:outline-none"
              />
              <button
                type="submit"
                className="bg-accent-500 hover:bg-accent-600 px-4 py-2.5 rounded-r-lg transition-colors"
              >
                <Search size={20} />
              </button>
            </div>
          </form>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-1.5 hover:bg-primary-800 rounded-lg px-3 py-2 transition-colors text-sm"
              >
                <User size={20} />
                <div className="hidden sm:block text-left">
                  <span className="text-xs text-primary-300 block">
                    {isAuthenticated ? 'Olá,' : 'Entrar'}
                  </span>
                  <span className="font-semibold text-xs">
                    {isAuthenticated ? user!.name.split(' ')[0] : 'Minha Conta'}
                  </span>
                </div>
                <ChevronDown size={14} className="hidden sm:block" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900">{user!.name}</p>
                        <p className="text-xs text-gray-500">{user!.email}</p>
                      </div>
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <User size={16} /> Meu Perfil
                      </Link>
                      <Link
                        to="/orders"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Package size={16} /> Meus Pedidos
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-accent-500 hover:bg-orange-50 font-medium"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <LayoutDashboard size={16} /> Painel Admin
                        </Link>
                      )}
                      <hr className="my-1" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 w-full"
                      >
                        <LogOut size={16} /> Sair
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 font-medium"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Entrar
                      </Link>
                      <Link
                        to="/register"
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Criar Conta
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Wishlist */}
            <button className="hidden sm:flex items-center gap-1.5 hover:bg-primary-800 rounded-lg px-3 py-2 transition-colors">
              <Heart size={20} />
              <span className="text-xs font-semibold hidden sm:block">Lista de<br/>Desejos</span>
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              className="flex items-center gap-1.5 hover:bg-primary-800 rounded-lg px-3 py-2 transition-colors relative"
            >
              <div className="relative">
                <ShoppingCart size={22} />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-semibold hidden sm:block">
                Carrinho<br/>
                <span className="text-accent-400">
                  {itemCount} {itemCount === 1 ? 'item' : 'itens'}
                </span>
              </span>
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden hover:bg-primary-800 rounded-lg p-2 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation bar */}
      <nav className="hidden md:block bg-primary-800 border-t border-primary-700">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center gap-1">
            {navLinks.map(link => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className="block px-4 py-2.5 text-sm text-primary-100 hover:text-white hover:bg-primary-700 transition-colors rounded"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="ml-auto">
              <Link
                to="/products"
                className="block px-4 py-2.5 text-sm text-accent-400 hover:text-accent-300 font-semibold transition-colors"
              >
                Ver todos os produtos →
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-primary-800 border-t border-primary-700">
          <nav className="max-w-7xl mx-auto px-4 py-2">
            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className="block px-4 py-3 text-sm text-primary-100 hover:text-white hover:bg-primary-700 rounded transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
