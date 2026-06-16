import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, UserPlus, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const update = (field: string, value: string | boolean) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const passwordStrength = (pwd: string) => {
    if (!pwd) return { strength: 0, label: '', color: '' };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    if (score <= 1) return { strength: 25, label: 'Fraca', color: 'bg-red-500' };
    if (score === 2) return { strength: 50, label: 'Regular', color: 'bg-yellow-500' };
    if (score === 3) return { strength: 75, label: 'Boa', color: 'bg-blue-500' };
    return { strength: 100, label: 'Forte', color: 'bg-green-500' };
  };

  const pwStrength = passwordStrength(form.password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    if (form.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    if (!form.acceptTerms) {
      setError('Você deve aceitar os termos de uso.');
      return;
    }

    setLoading(true);
    try {
      const success = await register(form.name, form.email, form.password, form.phone);
      if (success) navigate('/');
    } catch {
      setError('Erro ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="bg-primary-900 rounded-xl p-2">
              <div className="bg-accent-500 rounded-lg p-1">
                <span className="font-black text-white text-lg leading-none">SK</span>
              </div>
            </div>
            <span className="text-2xl font-black text-primary-900">SK Services</span>
          </Link>
          <p className="text-gray-500 text-sm mt-2">Crie sua conta gratuitamente</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Criar nova conta</h1>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 mb-5 text-sm">
              <AlertCircle size={16} className="flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Nome Completo</label>
              <input
                type="text"
                value={form.name}
                onChange={e => update('name', e.target.value)}
                placeholder="Seu nome completo"
                required
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">E-mail</label>
              <input
                type="email"
                value={form.email}
                onChange={e => update('email', e.target.value)}
                placeholder="seu@email.com"
                required
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Telefone <span className="text-gray-400 font-normal">(opcional)</span>
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={e => update('phone', e.target.value)}
                placeholder="(00) 00000-0000"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Senha</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => update('password', e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  required
                  className="input-field pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {form.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    <div className={`h-1 flex-1 rounded-full ${pwStrength.strength >= 25 ? pwStrength.color : 'bg-gray-200'}`} />
                    <div className={`h-1 flex-1 rounded-full ${pwStrength.strength >= 50 ? pwStrength.color : 'bg-gray-200'}`} />
                    <div className={`h-1 flex-1 rounded-full ${pwStrength.strength >= 75 ? pwStrength.color : 'bg-gray-200'}`} />
                    <div className={`h-1 flex-1 rounded-full ${pwStrength.strength >= 100 ? pwStrength.color : 'bg-gray-200'}`} />
                  </div>
                  <p className="text-xs text-gray-500">Força: {pwStrength.label}</p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirmar Senha</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.confirmPassword}
                  onChange={e => update('confirmPassword', e.target.value)}
                  placeholder="Repita a senha"
                  required
                  className="input-field pr-10"
                />
                {form.confirmPassword && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {form.password === form.confirmPassword
                      ? <CheckCircle size={18} className="text-green-500" />
                      : <AlertCircle size={18} className="text-red-400" />
                    }
                  </div>
                )}
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.acceptTerms}
                onChange={e => update('acceptTerms', e.target.checked)}
                className="mt-0.5 w-4 h-4 text-primary-600 rounded"
              />
              <span className="text-sm text-gray-600">
                Li e aceito os{' '}
                <Link to="/about" className="text-primary-600 hover:underline">Termos de Uso</Link>
                {' '}e a{' '}
                <Link to="/about" className="text-primary-600 hover:underline">Política de Privacidade</Link>
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary justify-center py-3 text-base disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <UserPlus size={18} />
                  Criar Conta
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6 pt-6 border-t border-gray-100">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-primary-600 hover:text-primary-700 font-semibold">
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
