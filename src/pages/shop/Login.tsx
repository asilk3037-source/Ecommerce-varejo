import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        if (email === 'admin@skservices.com') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        setError('E-mail ou senha incorretos. Tente novamente.');
      }
    } catch {
      setError('Erro ao fazer login. Tente novamente.');
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
          <p className="text-gray-500 text-sm mt-2">Faça login para continuar</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Entrar na sua conta</h1>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 mb-5 text-sm">
              <AlertCircle size={16} className="flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="input-field"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-gray-700">Senha</label>
                <button type="button" className="text-xs text-primary-600 hover:text-primary-700">
                  Esqueci minha senha
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
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
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary justify-center py-3 text-base disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn size={18} />
                  Entrar
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="bg-blue-50 rounded-lg p-4 text-xs text-blue-700 mb-4">
              <strong>Contas de demonstração:</strong><br />
              👤 Cliente: joao@email.com / 123456<br />
              🔧 Admin: admin@skservices.com / admin123
            </div>
            <p className="text-center text-sm text-gray-600">
              Não tem uma conta?{' '}
              <Link to="/register" className="text-primary-600 hover:text-primary-700 font-semibold">
                Cadastre-se grátis
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
