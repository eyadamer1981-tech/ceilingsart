import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AdminLogin } from '../../components/AdminLogin';
import { AdminDashboard } from '../../components/AdminDashboard';
import Head from 'next/head';
import '../../app/globals.css'; // Import the global CSS with Tailwind
import './admin.css'; // Import admin-specific CSS
import { LanguageProvider } from '../../contexts/LanguageContext';

export default function AdminPage() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if admin is already logged in
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAdminLoggedIn(true);
    }
    setLoading(false);
  }, []);

  const handleAdminLogin = (token: string) => {
    setIsAdminLoggedIn(true);
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAdminLoggedIn(false);
    router.push('/');
  };

  return (
    <>
      <Head>
        <title>Admin Panel - CA CEILINGS Art</title>
        <meta name="description" content="Admin panel for CA CEILINGS ART" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </Head>
      <LanguageProvider>
        {loading ? (
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
            <div 
              className="text-white text-xl"
              style={{ color: 'white', fontSize: '1.25rem' }}
            >
              Loading...
            </div>
          </div>
        ) : isAdminLoggedIn ? (
          <AdminDashboard onLogout={handleAdminLogout} />
        ) : (
          <AdminLogin onLogin={handleAdminLogin} />
        )}
      </LanguageProvider>
    </>
  );
}
