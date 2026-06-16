import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, CreditCard, QrCode, FileText, CheckCircle, Lock, Truck } from 'lucide-react';
import { useCart } from '../../context/CartContext';

type Step = 'address' | 'payment' | 'confirm';

export function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('address');
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [address, setAddress] = useState({
    zipCode: '', street: '', number: '', complement: '', neighborhood: '', city: '', state: '',
  });
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const shipping = subtotal >= 299 ? 0 : 19.9;
  const discount = subtotal > 1000 ? subtotal * 0.05 : 0;
  const total = subtotal + shipping - discount;
  const formatPrice = (p: number) => p.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const handlePlaceOrder = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    const id = `ORD-${Date.now().toString().slice(-6)}`;
    setOrderId(id);
    setOrderPlaced(true);
    clearCart();
    setLoading(false);
  };

  const steps: { id: Step; label: string }[] = [
    { id: 'address', label: 'Endereço' },
    { id: 'payment', label: 'Pagamento' },
    { id: 'confirm', label: 'Confirmação' },
  ];

  const stepIndex = steps.findIndex(s => s.id === step);

  if (orderPlaced) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={48} className="text-green-500" />
        </div>
        <h1 className="text-2xl font-black text-gray-900 mb-2">Pedido Confirmado!</h1>
        <p className="text-gray-600 mb-2">Obrigado pela sua compra!</p>
        <p className="text-primary-600 font-bold text-lg mb-6">Pedido #{orderId}</p>
        <p className="text-sm text-gray-500 mb-8">
          Você receberá um e-mail com os detalhes do pedido e informações de rastreamento.
        </p>
        <div className="flex gap-3 justify-center">
          <Link to="/orders" className="btn-secondary">Meus Pedidos</Link>
          <Link to="/" className="btn-outline">Continuar Comprando</Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Steps */}
      <div className="flex items-center justify-center mb-8">
        {steps.map((s, idx) => (
          <div key={s.id} className="flex items-center">
            <div className={`flex items-center gap-2 ${idx <= stepIndex ? 'text-primary-700' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                idx < stepIndex ? 'bg-green-500 text-white' :
                idx === stepIndex ? 'bg-primary-900 text-white' :
                'bg-gray-200 text-gray-500'
              }`}>
                {idx < stepIndex ? <CheckCircle size={16} /> : idx + 1}
              </div>
              <span className="text-sm font-medium hidden sm:block">{s.label}</span>
            </div>
            {idx < steps.length - 1 && (
              <ChevronRight size={18} className="mx-2 text-gray-300" />
            )}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {step === 'address' && (
            <div className="card p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                <Truck size={20} className="text-primary-600" /> Endereço de Entrega
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">CEP</label>
                  <input
                    type="text"
                    value={address.zipCode}
                    onChange={e => setAddress({ ...address, zipCode: e.target.value })}
                    placeholder="00000-000"
                    className="input-field"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Rua</label>
                  <input
                    type="text"
                    value={address.street}
                    onChange={e => setAddress({ ...address, street: e.target.value })}
                    placeholder="Nome da rua"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Número</label>
                  <input
                    type="text"
                    value={address.number}
                    onChange={e => setAddress({ ...address, number: e.target.value })}
                    placeholder="Nº"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Complemento</label>
                  <input
                    type="text"
                    value={address.complement}
                    onChange={e => setAddress({ ...address, complement: e.target.value })}
                    placeholder="Apto, casa... (opcional)"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Bairro</label>
                  <input
                    type="text"
                    value={address.neighborhood}
                    onChange={e => setAddress({ ...address, neighborhood: e.target.value })}
                    placeholder="Bairro"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Cidade</label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={e => setAddress({ ...address, city: e.target.value })}
                    placeholder="Cidade"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Estado</label>
                  <select
                    value={address.state}
                    onChange={e => setAddress({ ...address, state: e.target.value })}
                    className="input-field"
                  >
                    <option value="">Selecione</option>
                    {['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button onClick={() => setStep('payment')} className="btn-primary mt-6">
                Continuar para Pagamento <ChevronRight size={18} />
              </button>
            </div>
          )}

          {step === 'payment' && (
            <div className="card p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                <Lock size={20} className="text-primary-600" /> Forma de Pagamento
              </h2>

              <div className="space-y-3 mb-5">
                {[
                  { id: 'credit', icon: CreditCard, label: 'Cartão de Crédito', desc: 'Até 12x sem juros' },
                  { id: 'debit', icon: CreditCard, label: 'Cartão de Débito', desc: 'Débito à vista' },
                  { id: 'pix', icon: QrCode, label: 'PIX', desc: '5% de desconto imediato' },
                  { id: 'boleto', icon: FileText, label: 'Boleto Bancário', desc: 'Vence em 3 dias úteis' },
                ].map(m => (
                  <label key={m.id} className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                    paymentMethod === m.id ? 'border-primary-600 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value={m.id}
                      checked={paymentMethod === m.id}
                      onChange={() => setPaymentMethod(m.id)}
                      className="text-primary-600"
                    />
                    <m.icon size={20} className="text-gray-600" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{m.label}</p>
                      <p className="text-xs text-gray-500">{m.desc}</p>
                    </div>
                  </label>
                ))}
              </div>

              {(paymentMethod === 'credit' || paymentMethod === 'debit') && (
                <div className="bg-gray-50 rounded-xl p-4 mb-5 space-y-3">
                  <input type="text" placeholder="Número do cartão" className="input-field" />
                  <input type="text" placeholder="Nome no cartão" className="input-field" />
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" placeholder="MM/AA" className="input-field" />
                    <input type="text" placeholder="CVV" className="input-field" />
                  </div>
                  {paymentMethod === 'credit' && (
                    <select className="input-field">
                      {[1,2,3,6,10,12].map(n => (
                        <option key={n} value={n}>
                          {n}x de {formatPrice(total / n)}{n <= 6 ? ' sem juros' : ''}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              )}

              {paymentMethod === 'pix' && (
                <div className="bg-gray-50 rounded-xl p-4 mb-5 text-center">
                  <div className="bg-white border-2 border-gray-200 rounded-lg w-32 h-32 mx-auto flex items-center justify-center mb-3">
                    <QrCode size={64} className="text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600">QR Code gerado após confirmar o pedido</p>
                  <p className="text-green-600 font-semibold mt-1">Você pagará: {formatPrice(total * 0.95)}</p>
                </div>
              )}

              <div className="flex gap-3">
                <button onClick={() => setStep('address')} className="btn-outline">
                  Voltar
                </button>
                <button onClick={() => setStep('confirm')} className="btn-primary flex-1">
                  Revisar Pedido <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}

          {step === 'confirm' && (
            <div className="card p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-5">Confirmar Pedido</h2>

              <div className="space-y-3 mb-5">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
                    <img src={product.images[0]} alt={product.name} className="w-12 h-12 object-cover rounded-lg bg-gray-50" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                      <p className="text-xs text-gray-500">Qtd: {quantity}</p>
                    </div>
                    <p className="text-sm font-bold text-gray-900">{formatPrice(product.price * quantity)}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep('payment')} className="btn-outline">Voltar</button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="btn-primary flex-1 justify-center disabled:opacity-60"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>Confirmar Pedido <CheckCircle size={18} /></>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="card p-5 h-fit sticky top-24">
          <h3 className="font-bold text-gray-900 mb-4">Resumo</h3>
          <div className="space-y-2 mb-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Frete</span>
              <span className={shipping === 0 ? 'text-green-600' : ''}>
                {shipping === 0 ? 'GRÁTIS' : formatPrice(shipping)}
              </span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Desconto</span>
                <span>-{formatPrice(discount)}</span>
              </div>
            )}
          </div>
          <div className="border-t pt-3">
            <div className="flex justify-between font-bold text-gray-900">
              <span>Total</span>
              <span className="text-lg">{formatPrice(total)}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-4 text-xs text-gray-500">
            <Lock size={12} />
            Ambiente 100% seguro e criptografado
          </div>
        </div>
      </div>
    </div>
  );
}
