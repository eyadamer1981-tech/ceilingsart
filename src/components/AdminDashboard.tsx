import { useState, useCallback } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AcousticPanelsManager } from './AcousticPanelsManager';
import { StretchCeilingsManager } from './StretchCeilingsManager';
import { ProjectsManager } from './ProjectsManager';
import { BlogsManager } from './BlogsManager';
import { PageCoversManager } from './PageCoversManager';
import { CustomSlidersManager } from './CustomSlidersManager';

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('acoustic-panels');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = useCallback(() => {
    switch (activeTab) {
      case 'acoustic-panels':
        return <AcousticPanelsManager />;
      case 'stretch-ceilings':
        return <StretchCeilingsManager />;
      case 'projects':
        return <ProjectsManager />;
      case 'blogs':
        return <BlogsManager />;
      case 'page-covers':
        return <PageCoversManager />;
      case 'sliders':
        return <CustomSlidersManager />;
      default:
        return <AcousticPanelsManager />;
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <AdminSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onLogout={onLogout}
          onCloseSidebar={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Mobile header */}
        <div className="lg:hidden bg-white shadow-lg border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl font-medium text-gray-900">Admin Dashboard</h1>
            <div className="w-10" /> {/* Spacer for centering */}
          </div>
        </div>

        {/* Desktop header */}
        <header className="hidden lg:block bg-white shadow-lg border-b border-gray-200">
          <div className="px-8 py-6">
            <div className="text-center">
              <h1 className="text-4xl font-light text-gray-900 mb-2 tracking-wide">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 text-lg">
                Manage your content and services
              </p>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}