import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

interface AdminLoginProps {
  onLogin: (token: string) => void;
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const { t, isRTL } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('hasAdminAccess', 'true');
        onLogin(data.token);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to bottom right, #111827, #1f2937, #1e3a8a)'
      }}
    >
      {/* Language Switcher */}
      <div className="absolute top-6 right-6">
        <LanguageSwitcher />
      </div>

      <div 
        className={`bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md border border-gray-100 ${isRTL ? 'text-right' : 'text-left'}`}
        style={{
          backgroundColor: 'white',
          padding: '2.5rem',
          borderRadius: '1.5rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          width: '100%',
          maxWidth: '28rem',
          border: '1px solid #f3f4f6'
        }}
      >
        <div className="text-center mb-10">
          <div 
            className="w-16 h-16 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full mx-auto mb-6 flex items-center justify-center"
            style={{
              width: '4rem',
              height: '4rem',
              background: 'linear-gradient(to right, #fb923c, #eab308)',
              borderRadius: '50%',
              margin: '0 auto 1.5rem auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <span 
              className="text-white font-bold text-2xl"
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1.5rem'
              }}
            >
              CA
            </span>
          </div>
          <h1 
            className="text-4xl font-light text-gray-900 mb-3 tracking-wide"
            style={{
              fontSize: '2.25rem',
              fontWeight: '300',
              color: '#111827',
              marginBottom: '0.75rem',
              letterSpacing: '0.025em'
            }}
          >
            {t('adminLogin')}
          </h1>
          <p 
            className="text-gray-600 text-lg"
            style={{
              color: '#4b5563',
              fontSize: '1.125rem'
            }}
          >
            {isRTL ? 'الوصول إلى لوحة التحكم الإدارية' : 'Access your management dashboard'}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-8 text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-3">
              {t('adminEmail')}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`w-full px-6 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-lg text-black ${isRTL ? 'text-right' : 'text-left'}`}
              placeholder="admin@admin.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-3">
              {t('password')}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`w-full px-6 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-lg text-black ${isRTL ? 'text-right' : 'text-left'}`}
              placeholder="admin@123"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-400 to-yellow-500 text-white py-4 rounded-xl hover:from-orange-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            {loading ? (isRTL ? 'جاري تسجيل الدخول...' : 'Logging in...') : t('login')}
          </button>
        </form>
      </div>
    </div>
  );
}