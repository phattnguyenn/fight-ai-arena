
import { useState } from "react";
import { Button } from "@/components/ui/button";
import HomeFeed from "@/components/HomeFeed";
import FindSpar from "@/components/FindSpar";
import Events from "@/components/Events";
import Analyze from "@/components/Analyze";
import Profile from "@/components/Profile";

interface MainAppProps {
  userRole: "fighter" | "coach" | "fan";
  onLogout: () => void;
}

const MainApp = ({ userRole, onLogout }: MainAppProps) => {
  const [activeTab, setActiveTab] = useState("home");

  const tabs = [
    { id: "home", label: "HOME", icon: "🏠" },
    { id: "spar", label: "FIND SPAR", icon: "👊" },
    { id: "events", label: "EVENTS", icon: "📅" },
    { id: "analyze", label: "ANALYZE", icon: "📊" },
    { id: "profile", label: "PROFILE", icon: "👤" },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#101010' }}>
      {/* Global Header */}
      <div 
        className="h-14 flex items-center justify-between px-4 border-b"
        style={{ backgroundColor: '#101010', borderColor: '#333333' }}
      >
        <div className="flex items-center space-x-3">
          <div className="text-white font-bold text-lg">FIGHTCONNECT</div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs text-white font-bold"
            style={{ backgroundColor: '#E31837' }}
          >
            FC
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "home" && <HomeFeed userRole={userRole} />}
        {activeTab === "spar" && <FindSpar />}
        {activeTab === "events" && <Events userRole={userRole} />}
        {activeTab === "analyze" && <Analyze />}
        {activeTab === "profile" && <Profile userRole={userRole} onLogout={onLogout} />}
      </div>

      {/* Bottom Tab Bar */}
      <div 
        className="h-16 border-t"
        style={{ backgroundColor: '#101010', borderColor: '#333333' }}
      >
        <div className="flex justify-around items-center h-full px-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center p-2 transition-all ${
                activeTab === tab.id 
                  ? 'text-red-500' 
                  : 'text-gray-500 hover:text-white'
              }`}
            >
              <span className="text-lg mb-1">{tab.icon}</span>
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainApp;
