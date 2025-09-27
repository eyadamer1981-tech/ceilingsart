import { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { ServicesManager } from './ServicesManager';
import { ProjectsManager } from './ProjectsManager';
import { BlogsManager } from './BlogsManager';

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('services');

  const renderContent = () => {
    switch (activeTab) {
      case 'services':
        return <ServicesManager />;
      case 'projects':
        return <ProjectsManager />;
      case 'blogs':
        return <BlogsManager />;
      default:
        return <ServicesManager />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={onLogout}
      />

      <div className="flex-1 ml-64">
        <header className="bg-white shadow-lg border-b border-gray-200">
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

        <main className="p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}