import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AdminLogin } from '../../components/AdminLogin';
import { AdminDashboard } from '../../components/AdminDashboard';
import Head from 'next/head';

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
        <title>Admin Panel - CA CEILINGS ATR</title>
        <meta name="description" content="Admin panel for CA CEILINGS ATR" />
      </Head>
      
      {loading ? (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
          <div className="text-white text-xl">Loading...</div>
        </div>
      ) : isAdminLoggedIn ? (
        <AdminDashboard onLogout={handleAdminLogout} />
      ) : (
        <AdminLogin onLogin={handleAdminLogin} />
      )}
    </>
  );
}
