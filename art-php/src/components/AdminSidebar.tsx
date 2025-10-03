import { LogOut, Settings, Image, FileText, Briefcase, Sliders } from 'lucide-react';

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

export function AdminSidebar({ activeTab, setActiveTab, onLogout }: AdminSidebarProps) {
  const menuItems = [
    { id: 'services', label: 'Services', icon: Settings },
    { id: 'projects', label: 'Projects', icon: Image },
    { id: 'blogs', label: 'Blogs', icon: FileText },
    { id: 'sliders', label: 'Custom Sliders', icon: Sliders },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-2xl">
      <div className="p-8 border-b border-gray-700">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full mx-auto mb-3 flex items-center justify-center">
            <span className="text-white font-bold text-xl">CA</span>
          </div>
          <h2 className="text-xl font-light tracking-wide">Art Ceiling Admin</h2>
          <p className="text-gray-400 text-sm mt-1">Management Panel</p>
        </div>
      </div>

      <nav className="mt-8 px-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full text-left px-6 py-4 flex items-center space-x-4 hover:bg-gray-700 transition-all duration-300 rounded-lg mb-2 group ${
                activeTab === item.id 
                  ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg transform scale-105' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                activeTab === item.id ? 'text-white' : 'text-gray-400'
              }`} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-700">
        <button
          onClick={onLogout}
          className="w-full text-left px-6 py-4 flex items-center space-x-4 hover:bg-red-600 transition-all duration-300 rounded-lg group"
        >
          <LogOut className="w-5 h-5 text-red-400 group-hover:text-white transition-colors" />
          <span className="text-red-400 group-hover:text-white font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}