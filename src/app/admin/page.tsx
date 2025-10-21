'use client';

import { AdminLogin } from '../../components/AdminLogin';
import { AdminDashboard } from '../../components/AdminDashboard';
import { useState, useEffect } from 'react';
import PageLayout from '../../components/PageLayout';

export default function Admin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminToken, setAdminToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setAdminToken(token);
      setIsAdmin(true);
    }
  }, []);

  const handleAdminLogin = (token: string) => {
    setAdminToken(token);
    setIsAdmin(true);
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('adminToken');
    setAdminToken(null);
    setIsAdmin(false);
  };

  if (!isAdmin) {
    return <AdminLogin onLogin={handleAdminLogin} />;
  }
  
  return (
    <PageLayout>
      <AdminDashboard onLogout={handleAdminLogout} />
    </PageLayout>
  );
}
