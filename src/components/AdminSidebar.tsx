import { LogOut, Settings, Image, FileText, Briefcase, Sliders, X, Volume2, Layers, Monitor } from 'lucide-react';

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  onCloseSidebar?: () => void;
}

export function AdminSidebar({ activeTab, setActiveTab, onLogout, onCloseSidebar }: AdminSidebarProps) {
  const menuItems = [
    { id: 'acoustic-panels', label: 'Acoustic Panels', icon: Volume2 },
    { id: 'stretch-ceilings', label: 'Stretch Ceilings', icon: Layers },
    { id: 'projects', label: 'Projects', icon: Image },
    { id: 'blogs', label: 'Blogs', icon: FileText },
    { id: 'page-covers', label: 'Page Covers', icon: Monitor },
    { id: 'sliders', label: 'Custom Sliders', icon: Sliders },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    // Close sidebar on mobile after selection
    if (onCloseSidebar) {
      onCloseSidebar();
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Close button for mobile */}
      {onCloseSidebar && (
        <div className="lg:hidden flex justify-end p-4">
          <button
            onClick={onCloseSidebar}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      )}

      <div className="p-8 border-b border-gray-700">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full mx-auto mb-3 flex items-center justify-center">
            <span className="text-white font-bold text-xl">CA</span>
          </div>
          <h2 className="text-xl font-light tracking-wide">Art Ceiling Admin</h2>
          <p className="text-gray-400 text-sm mt-1">Management Panel</p>
        </div>
      </div>

      <nav className="mt-8 px-4 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
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

      <div className="p-6 border-t border-gray-700">
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