import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  ShoppingCart, Search, User, Menu, X, ChevronDown,
  Package, LogOut, LayoutDashboard, Heart, MapPin,
  Smartphone, Shirt, Home as HomeIcon, Dumbbell, Sparkles,
  BookOpen, Baby, ShoppingBag, Tag, ChevronRight
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const navCategories = [
  {
    label: 'Eletrônicos',
    href: '/products?category=Eletrônicos',
    icon: Smartphone,
    sub: [
      { label: 'Smartphones', href: '/products?category=Eletrônicos&search=smartphone' },
      { label: 'Notebooks', href: '/products?category=Eletrônicos&search=notebook' },
      { label: 'Fones & Áudio', href: '/products?category=Eletrônicos&search=fone' },
      { label: 'Smart TVs', href: '/products?category=Eletrônicos&search=tv' },
      { label: 'Câmeras', href: '/products?category=Eletrônicos&search=câmera' },
      { label: 'Smartwatches', href: '/products?category=Eletrônicos&search=smartwatch' },
    ],
  },
  {
    label: 'Moda',
    href: '/products?category=Moda',
    icon: Shirt,
    sub: [
      { label: 'Camisas & Camisetas', href: '/products?category=Moda&search=camisa' },
      { label: 'Calças & Jeans', href: '/products?category=Moda&search=calça' },
      { label: 'Calçados', href: '/products?category=Moda&search=tênis' },
      { label: 'Bolsas & Mochilas', href: '/products?category=Moda&search=mochila' },
      { label: 'Acessórios', href: '/products?category=Moda&search=acessório' },
    ],
  },
  {
    label: 'Casa & Jardim',
    href: '/products?category=Casa & Jardim',
    icon: HomeIcon,
    sub: [
      { label: 'Cozinha', href: '/products?category=Casa & Jardim&search=cozinha' },
      { label: 'Cafeteiras', href: '/products?category=Casa & Jardim&search=café' },
      { label: 'Decoração', href: '/products?category=Casa & Jardim&search=decoração' },
      { label: 'Jardim', href: '/products?category=Casa & Jardim&search=jardim' },
    ],
  },
  {
    label: 'Esportes',
    href: '/products?category=Esportes',
    icon: Dumbbell,
    sub: [
      { label: 'Calçados Esportivos', href: '/products?category=Esportes&search=tênis' },
      { label: 'Roupas Esportivas', href: '/products?category=Esportes&search=roupa' },
      { label: 'Equipamentos', href: '/products?category=Esportes&search=equipamento' },
      { label: 'Suplementos', href: '/products?category=Esportes&search=suplemento' },
    ],
  },
  {
    label: 'Beleza',
    href: '/products?category=Beleza',
    icon: Sparkles,
    sub: [
      { label: 'Perfumes', href: '/products?category=Beleza&search=perfume' },
      { label: 'Skincare', href: '/products?category=Beleza&search=skincare' },
      { label: 'Maquiagem', href: '/products?category=Beleza&search=maquiagem' },
      { label: 'Cabelos', href: '/products?category=Beleza&search=cabelo' },
    ],
  },
  {
    label: 'Livros',
    href: '/products?category=Livros',
    icon: BookOpen,
    sub: [
      { label: 'Autoajuda', href: '/products?category=Livros&search=autoajuda' },
      { label: 'Negócios', href: '/products?category=Livros&search=negócios' },
      { label: 'Ficção', href: '/products?category=Livros&search=ficção' },
      { label: 'Infantil', href: '/products?category=Livros&search=infantil' },
    ],
  },
  {
    label: 'Brinquedos',
    href: '/products?category=Brinquedos',
    icon: Baby,
    sub: [
      { label: 'Para Bebês', href: '/products?category=Brinquedos&search=bebê' },
      { label: 'Educativos', href: '/products?category=Brinquedos&search=educativo' },
      { label: 'Jogos de Mesa', href: '/products?category=Brinquedos&search=jogo' },
    ],
  },
  {
    label: 'Alimentos',
    href: '/products?category=Alimentos',
    icon: ShoppingBag,
    sub: [
      { label: 'Orgânicos', href: '/products?category=Alimentos&search=orgânico' },
      { label: 'Bebidas', href: '/products?category=Alimentos&search=bebida' },
      { label: 'Snacks', href: '/products?category=Alimentos&search=snack' },
    ],
  },
];

export function Header() {
  const { itemCount } = useCart();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  // Close user menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

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

  const handleMouseEnter = (label: string) => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimer.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  return (
    <header ref={headerRef} className="bg-primary-900 text-white sticky top-0 z-50 shadow-xl w-full max-w-full overflow-x-hidden">
      {/* Top bar */}
      <div className="bg-primary-950 border-b border-primary-800/50">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between text-xs text-primary-300">
          <div className="flex items-center gap-1.5">
            <MapPin size={11} className="text-accent-400" />
            <span>Entrega para <strong className="text-white">todo o Brasil</strong></span>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Tag size={11} className="text-accent-400" />
              Frete grátis acima de <strong className="text-white ml-1">R$ 299</strong>
            </span>
            <span className="text-primary-700">|</span>
            <Link to="/about" className="hover:text-white transition-colors hover:underline">Central de Ajuda</Link>
            <span className="text-primary-700">|</span>
            <Link to="/about" className="hover:text-white transition-colors hover:underline">Rastrear Pedido</Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-3 md:gap-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2.5 group">
            <div className="bg-accent-500 group-hover:bg-accent-400 rounded-xl p-2 transition-colors shadow-lg shadow-accent-500/30">
              <span className="font-black text-white text-base leading-none tracking-tight">SK</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-black text-base leading-none block tracking-tight">SK Services</span>
              <span className="text-primary-400 text-[10px] font-medium tracking-widest uppercase">Varejo Online</span>
            </div>
          </Link>

          {/* Search bar — min-w-0 on form AND input prevents horizontal overflow on mobile */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl min-w-0">
            <div className={`flex rounded-xl overflow-hidden ring-2 transition-all duration-200 ${searchFocused ? 'ring-accent-400 shadow-lg shadow-accent-500/20' : 'ring-transparent'}`}>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Buscar produtos..."
                className="flex-1 min-w-0 px-3 py-2.5 text-gray-900 text-sm focus:outline-none placeholder:text-gray-400"
              />
              <button
                type="submit"
                className="flex-shrink-0 bg-accent-500 hover:bg-accent-400 px-4 py-2.5 transition-colors flex items-center gap-1.5 font-medium text-sm"
              >
                <Search size={17} />
                <span className="hidden md:inline">Buscar</span>
              </button>
            </div>
          </form>

          {/* Right actions */}
          <div className="flex items-center gap-1">
            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-1.5 hover:bg-white/10 rounded-xl px-2.5 py-2 transition-all text-sm group"
              >
                <div className="relative">
                  {isAuthenticated ? (
                    <div className="bg-accent-500 rounded-full w-7 h-7 flex items-center justify-center text-xs font-black">
                      {user!.name.charAt(0)}
                    </div>
                  ) : (
                    <User size={20} className="text-primary-200 group-hover:text-white transition-colors" />
                  )}
                </div>
                <div className="hidden sm:block text-left">
                  <span className="text-[10px] text-primary-400 block leading-none mb-0.5">
                    {isAuthenticated ? `Olá, ${user!.name.split(' ')[0]}` : 'Entrar'}
                  </span>
                  <span className="font-semibold text-xs leading-none">
                    {isAuthenticated ? 'Minha Conta' : 'Cadastrar'}
                  </span>
                </div>
                <ChevronDown size={13} className={`hidden sm:block text-primary-400 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* User dropdown */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-in">
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center gap-2.5">
                          <div className="bg-primary-900 rounded-full w-9 h-9 flex items-center justify-center text-white font-black text-sm">
                            {user!.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900">{user!.name}</p>
                            <p className="text-xs text-gray-500">{user!.email}</p>
                          </div>
                        </div>
                      </div>
                      {[
                        { to: '/profile', icon: User, label: 'Meu Perfil' },
                        { to: '/orders', icon: Package, label: 'Meus Pedidos' },
                      ].map(({ to, icon: Icon, label }) => (
                        <Link key={to} to={to} onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-700 transition-colors">
                          <Icon size={15} className="text-gray-400" /> {label}
                        </Link>
                      ))}
                      {isAdmin && (
                        <Link to="/admin" onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-accent-600 hover:bg-orange-50 font-semibold transition-colors">
                          <LayoutDashboard size={15} className="text-accent-500" /> Painel Admin
                        </Link>
                      )}
                      <div className="border-t border-gray-100 mt-1 pt-1">
                        <button onClick={handleLogout}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 w-full transition-colors">
                          <LogOut size={15} /> Sair da Conta
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="p-2">
                      <Link to="/login" onClick={() => setUserMenuOpen(false)}
                        className="block w-full text-center bg-primary-900 hover:bg-primary-800 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors mb-2">
                        Entrar
                      </Link>
                      <Link to="/register" onClick={() => setUserMenuOpen(false)}
                        className="block w-full text-center border-2 border-gray-200 hover:border-primary-300 text-gray-700 font-semibold px-4 py-2 rounded-xl text-sm transition-colors">
                        Criar Conta
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Wishlist */}
            <button className="hidden md:flex flex-col items-center hover:bg-white/10 rounded-xl px-2.5 py-2 transition-all group relative">
              <Heart size={20} className="text-primary-200 group-hover:text-red-400 transition-colors" />
              <span className="text-[10px] text-primary-400 font-medium mt-0.5">Favoritos</span>
            </button>

            {/* Cart */}
            <Link to="/cart" className="flex items-center gap-2 hover:bg-white/10 rounded-xl px-2.5 py-2 transition-all group relative">
              <div className="relative">
                <ShoppingCart size={22} className="text-primary-200 group-hover:text-white transition-colors" />
                {itemCount > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 bg-accent-500 text-white text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center shadow-md animate-bounce-once">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:block">
                <span className="text-[10px] text-primary-400 block leading-none mb-0.5">Meu</span>
                <span className="font-semibold text-xs leading-none">Carrinho</span>
              </div>
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden hover:bg-white/10 rounded-xl p-2.5 transition-colors ml-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <div className="relative w-5 h-5">
                <Menu size={20} className={`absolute inset-0 transition-all duration-200 ${mobileMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} />
                <X size={20} className={`absolute inset-0 transition-all duration-200 ${mobileMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation bar with dropdowns */}
      <nav className="hidden md:block bg-primary-800/80 backdrop-blur-sm border-t border-primary-700/50">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center">
            <li>
              <Link
                to="/products"
                className="flex items-center gap-1.5 px-3 py-3 text-sm font-semibold text-accent-400 hover:text-accent-300 transition-colors border-b-2 border-transparent hover:border-accent-400"
              >
                <Tag size={14} />
                Todas as Categorias
              </Link>
            </li>
            <li className="w-px h-5 bg-primary-700 mx-1" />

            {navCategories.map(cat => (
              <li
                key={cat.label}
                className="relative"
                onMouseEnter={() => handleMouseEnter(cat.label)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to={cat.href}
                  className={`flex items-center gap-1 px-3 py-3 text-sm transition-all border-b-2 ${
                    activeDropdown === cat.label
                      ? 'text-white border-accent-400 bg-primary-700/50'
                      : 'text-primary-200 hover:text-white border-transparent hover:border-white/30'
                  }`}
                >
                  {cat.label}
                  <ChevronDown size={12} className={`transition-transform duration-200 ${activeDropdown === cat.label ? 'rotate-180' : ''}`} />
                </Link>

                {/* Dropdown submenu */}
                {activeDropdown === cat.label && (
                  <div
                    className="absolute top-full left-0 min-w-[200px] bg-white rounded-b-2xl shadow-2xl border border-gray-100 py-2 z-50"
                    onMouseEnter={() => handleMouseEnter(cat.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="px-3 pb-2 border-b border-gray-100 mb-1">
                      <Link
                        to={cat.href}
                        className="flex items-center gap-2 text-xs font-bold text-primary-700 hover:text-primary-900 uppercase tracking-wider"
                      >
                        <cat.icon size={13} />
                        Ver tudo em {cat.label}
                        <ChevronRight size={11} className="ml-auto" />
                      </Link>
                    </div>
                    {cat.sub.map(sub => (
                      <Link
                        key={sub.label}
                        to={sub.href}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-primary-700 hover:bg-primary-50 transition-colors"
                      >
                        <span className="w-1 h-1 rounded-full bg-gray-300 flex-shrink-0" />
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}

            <li className="ml-auto">
              <Link
                to="/about"
                className="flex items-center gap-1 px-3 py-3 text-sm text-primary-300 hover:text-white transition-colors border-b-2 border-transparent hover:border-white/30"
              >
                Sobre Nós
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`md:hidden w-full overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <div className="w-full bg-primary-800 border-t border-primary-700">
          {/* Mobile search */}
          <div className="px-4 pt-3 pb-2">
            <form onSubmit={handleSearch} className="w-full">
              <div className="flex rounded-xl overflow-hidden w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Buscar produtos..."
                  className="flex-1 min-w-0 px-4 py-2.5 text-gray-900 text-sm focus:outline-none"
                />
                <button type="submit" className="flex-shrink-0 bg-accent-500 px-4">
                  <Search size={18} />
                </button>
              </div>
            </form>
          </div>

          <nav className="px-3 pb-3">
            {navCategories.map(cat => (
              <div key={cat.label}>
                <Link
                  to={cat.href}
                  className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-primary-100 hover:text-white hover:bg-primary-700/50 rounded-lg transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <cat.icon size={15} className="text-primary-400" />
                  {cat.label}
                  <ChevronRight size={13} className="ml-auto text-primary-500" />
                </Link>
              </div>
            ))}
            <div className="border-t border-primary-700 mt-2 pt-2">
              <Link
                to="/about"
                className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-primary-300 hover:text-white rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sobre Nós
              </Link>
              {!isAuthenticated && (
                <div className="flex gap-2 mt-2 px-3">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-center bg-primary-700 hover:bg-primary-600 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors">
                    Entrar
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-center bg-accent-500 hover:bg-accent-600 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors">
                    Cadastrar
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
