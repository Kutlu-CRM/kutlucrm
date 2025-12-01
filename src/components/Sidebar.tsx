import { Home, Plus } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onNewMeeting: () => void;
  onHome: () => void;
}

export function Sidebar({ currentView, onNewMeeting, onHome }: SidebarProps) {
  return (
    <div className="w-56 bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M19 3H5C3.89 3 3 3.89 3 5V19C3 20.11 3.89 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.89 20.11 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z" fill="currentColor"/>
            </svg>
          </div>
          <div>
            <div className="font-semibold">Kutlu Yazılım Çözümleri ve Danışmanlık</div>
            <div className="text-xs text-gray-400">Müşteri Görüşme Takip Sistemi</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <button
          onClick={onHome}
          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg mb-2 transition-colors ${
            currentView === 'list' 
              ? 'bg-indigo-600 text-white' 
              : 'text-gray-300 hover:bg-gray-800'
          }`}
        >
          <Home size={20} />
          <span>Ana Sayfa</span>
        </button>

        <button
          onClick={onNewMeeting}
          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
            currentView === 'new' 
              ? 'bg-indigo-600 text-white' 
              : 'bg-gray-800 text-white hover:bg-gray-700'
          }`}
        >
          <Plus size={20} />
          <span>Yeni Görüşme</span>
        </button>
      </nav>
    </div>
  );
}
