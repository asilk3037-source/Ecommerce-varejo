import { Link } from 'react-router-dom';
import {
  Target, Users, Award, Truck, Shield, Heart,
  Mail, Phone, MapPin, ArrowRight, CheckCircle
} from 'lucide-react';

export function About() {
  const stats = [
    { value: '50K+', label: 'Clientes Satisfeitos' },
    { value: '10K+', label: 'Produtos Disponíveis' },
    { value: '99.8%', label: 'Índice de Satisfação' },
    { value: '5 Anos', label: 'No Mercado' },
  ];

  const team = [
    { name: 'Carlos Silva', role: 'CEO & Fundador', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' },
    { name: 'Ana Rodrigues', role: 'Diretora de Operações', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200' },
    { name: 'Pedro Santos', role: 'Head de Tecnologia', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200' },
    { name: 'Julia Lima', role: 'Head de Marketing', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200' },
  ];

  const values = [
    { icon: Target, title: 'Nossa Missão', desc: 'Conectar pessoas aos melhores produtos com a melhor experiência de compra online do Brasil.' },
    { icon: Heart, title: 'Nossos Valores', desc: 'Transparência, inovação, qualidade e cuidado com cada cliente são os pilares da SK Services.' },
    { icon: Users, title: 'Nossa Visão', desc: 'Ser a plataforma de e-commerce mais confiável e amada pelos brasileiros até 2030.' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary-900 to-primary-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-accent-500 rounded-xl p-3">
              <span className="font-black text-white text-3xl leading-none">SK</span>
            </div>
            <span className="text-4xl font-black">SK Services</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Sua Loja Online de Confiança
          </h1>
          <p className="text-primary-200 text-lg max-w-2xl mx-auto">
            Desde 2019, conectamos milhares de brasileiros aos melhores produtos com
            qualidade, segurança e os melhores preços do mercado.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-5xl mx-auto px-4 -mt-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-100 overflow-hidden">
          {stats.map(stat => (
            <div key={stat.label} className="p-6 text-center">
              <p className="text-2xl md:text-3xl font-black text-primary-900">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mission, Vision, Values */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Quem Somos</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {values.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card p-6 text-center">
              <div className="bg-primary-100 rounded-xl p-3 w-14 h-14 flex items-center justify-center mx-auto mb-4">
                <Icon size={26} className="text-primary-700" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Our story */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Nossa História</h2>
              <div className="space-y-3 text-gray-600 text-sm leading-relaxed">
                <p>
                  A SK Services nasceu em 2019, de um sonho simples: democratizar o acesso a produtos
                  de qualidade para todos os brasileiros, independentemente de onde estejam.
                </p>
                <p>
                  Começamos com um pequeno catálogo de eletrônicos e, hoje, oferecemos mais de
                  10.000 produtos em diversas categorias, com entrega para todos os estados do Brasil.
                </p>
                <p>
                  Nossa equipe é apaixonada por tecnologia e por proporcionar a melhor experiência
                  de compra online. Cada detalhe é pensado para que você compre com segurança,
                  comodidade e satisfação garantida.
                </p>
              </div>
              <div className="mt-6 space-y-2">
                {[
                  'Mais de 50.000 clientes ativos em todo o Brasil',
                  'Parcerias com as maiores marcas do mercado',
                  'Logística própria para entregas expressas',
                  'Atendimento 24h via chat, e-mail e telefone',
                ].map(item => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Award, label: 'Melhor E-commerce 2023', color: 'bg-yellow-100 text-yellow-700' },
                { icon: Shield, label: 'Compra 100% Segura', color: 'bg-green-100 text-green-700' },
                { icon: Truck, label: 'Entrega Garantida', color: 'bg-blue-100 text-blue-700' },
                { icon: Heart, label: '50K Clientes Felizes', color: 'bg-red-100 text-red-700' },
              ].map(({ icon: Icon, label, color }) => (
                <div key={label} className={`${color} rounded-xl p-6 text-center`}>
                  <Icon size={28} className="mx-auto mb-2" />
                  <p className="text-sm font-semibold">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Nossa Equipe</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {team.map(member => (
            <div key={member.name} className="card p-4 text-center">
              <img
                src={member.image}
                alt={member.name}
                className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-4 border-primary-100"
              />
              <h3 className="font-bold text-gray-900 text-sm">{member.name}</h3>
              <p className="text-xs text-primary-600 mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="bg-primary-900 text-white py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Entre em Contato</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              { icon: Mail, title: 'E-mail', info: 'contato@skservices.com.br', sub: 'Resposta em até 2h' },
              { icon: Phone, title: 'Telefone', info: '(11) 3000-0000', sub: 'Seg-Sex, 8h às 18h' },
              { icon: MapPin, title: 'Endereço', info: 'São Paulo, SP', sub: 'Av. Paulista, 1000' },
            ].map(({ icon: Icon, title, info, sub }) => (
              <div key={title} className="text-center">
                <div className="bg-primary-800 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Icon size={22} className="text-accent-400" />
                </div>
                <h3 className="font-semibold mb-1">{title}</h3>
                <p className="text-sm">{info}</p>
                <p className="text-xs text-primary-300">{sub}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/products"
              className="bg-accent-500 hover:bg-accent-600 text-white font-bold px-8 py-3 rounded-xl transition-colors inline-flex items-center gap-2"
            >
              Começar a Comprar <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
