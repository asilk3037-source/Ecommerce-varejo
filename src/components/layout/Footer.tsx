import { Link } from 'react-router-dom';
import {
  Mail, Phone, MapPin, Facebook, Instagram, Twitter,
  Youtube, CreditCard, QrCode, Truck, Shield, Award, Headphones
} from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary-900 text-white mt-16">
      {/* Trust badges */}
      <div className="border-b border-primary-800">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: 'Frete Grátis', desc: 'Acima de R$ 299' },
              { icon: Shield, title: 'Compra Segura', desc: '100% protegida' },
              { icon: Award, title: 'Produtos Originais', desc: 'Garantia de autenticidade' },
              { icon: Headphones, title: 'Suporte 24h', desc: 'Sempre disponível' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-3">
                <div className="bg-accent-500 rounded-lg p-2.5 flex-shrink-0">
                  <Icon size={22} />
                </div>
                <div>
                  <p className="font-semibold text-sm">{title}</p>
                  <p className="text-primary-300 text-xs">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-accent-500 rounded-lg p-2">
                <span className="font-black text-white text-xl leading-none">SK</span>
              </div>
              <div>
                <span className="font-bold text-xl block">SK Services</span>
                <span className="text-primary-300 text-sm">Varejo Online</span>
              </div>
            </div>
            <p className="text-primary-300 text-sm leading-relaxed mb-6">
              Sua loja online de confiança com as melhores marcas e os melhores preços.
              Entregamos em todo o Brasil com rapidez e segurança.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary-300 text-sm">
                <Mail size={15} />
                <span>contato@skservices.com.br</span>
              </div>
              <div className="flex items-center gap-2 text-primary-300 text-sm">
                <Phone size={15} />
                <span>(11) 3000-0000</span>
              </div>
              <div className="flex items-center gap-2 text-primary-300 text-sm">
                <MapPin size={15} />
                <span>São Paulo, SP - Brasil</span>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-5">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <button
                  key={i}
                  className="bg-primary-800 hover:bg-accent-500 rounded-lg p-2 transition-colors"
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white">
              Categorias
            </h4>
            <ul className="space-y-2">
              {['Eletrônicos', 'Moda', 'Casa & Jardim', 'Esportes', 'Beleza', 'Livros', 'Brinquedos'].map(cat => (
                <li key={cat}>
                  <Link
                    to={`/products?category=${cat}`}
                    className="text-primary-300 hover:text-white text-sm transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white">
              Minha Conta
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Fazer Login', href: '/login' },
                { label: 'Cadastrar', href: '/register' },
                { label: 'Meus Pedidos', href: '/orders' },
                { label: 'Meu Perfil', href: '/profile' },
                { label: 'Lista de Desejos', href: '/' },
                { label: 'Carrinho', href: '/cart' },
              ].map(link => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-primary-300 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white">
              Informações
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Sobre Nós', href: '/about' },
                { label: 'Política de Privacidade', href: '/about' },
                { label: 'Termos de Uso', href: '/about' },
                { label: 'Como Comprar', href: '/about' },
                { label: 'Trocas e Devoluções', href: '/about' },
                { label: 'Rastrear Pedido', href: '/orders' },
              ].map(link => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-primary-300 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Payment & bottom */}
      <div className="border-t border-primary-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-primary-300 text-xs">Pagamentos aceitos:</span>
              <div className="flex items-center gap-2">
                <div className="bg-white rounded px-2 py-1 flex items-center gap-1">
                  <CreditCard size={16} className="text-primary-900" />
                  <span className="text-primary-900 text-xs font-bold">VISA</span>
                </div>
                <div className="bg-white rounded px-2 py-1 flex items-center gap-1">
                  <CreditCard size={16} className="text-primary-900" />
                  <span className="text-primary-900 text-xs font-bold">MC</span>
                </div>
                <div className="bg-white rounded px-2 py-1 flex items-center gap-1">
                  <QrCode size={16} className="text-primary-900" />
                  <span className="text-primary-900 text-xs font-bold">PIX</span>
                </div>
                <div className="bg-white rounded px-2 py-1">
                  <span className="text-primary-900 text-xs font-bold">BOLETO</span>
                </div>
              </div>
            </div>
            <p className="text-primary-400 text-xs text-center">
              © 2024 SK Services. Todos os direitos reservados. CNPJ: 00.000.000/0001-00
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
