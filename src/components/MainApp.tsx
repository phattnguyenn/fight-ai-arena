
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import HomeFeed from "@/components/HomeFeed";
import ProfileSetup from "@/components/ProfileSetup";
import CreatePost from "@/components/CreatePost";
import MatchmakingApp from "@/components/MatchmakingApp";
import UserProfile from "@/components/UserProfile";
import AIAnalyze from "@/components/AIAnalyze";
import Notifications from "@/components/Notifications";

interface MainAppProps {
  onShowAuth?: () => void;
}

const MainApp = ({ onShowAuth }: MainAppProps) => {
  const [activeTab, setActiveTab] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({
    username: "",
    displayName: "",
    bio: "",
    martialArts: [],
    avatar: "",
    rank: "Bronze I",
    eloPoints: 1200,
    posts: 24,
    followers: 156,
    following: 89,
    subscribers: 100,
    isCreator: true,
    wins: 12,
    losses: 3,
    draws: 1,
    totalFights: 16,
    winRate: 75,
    avgPerformance: 82,
    profileImages: [
      "/lovable-uploads/70f89bc1-fad9-4a7c-9373-6275256cd8b8.png",
      "/lovable-uploads/449a86e6-a6a3-4ead-aa65-72378005773c.png",
      "/lovable-uploads/f0ea7ce1-8701-4f54-be86-df087cb69b67.png",
      "/lovable-uploads/c96b90b9-9167-42be-965e-b40348944f1c.png",
      "/lovable-uploads/ae9b405c-35e9-4c78-b66e-48359e3748d7.png",
      "/lovable-uploads/617d9ba0-8592-426a-b3e5-2958df7d67b0.png"
    ],
    matchHistory: [
      {
        id: 1,
        opponent: "Jake Martinez",
        result: "Win",
        method: "TKO",
        round: 3,
        date: "2024-03-15",
        event: "Fight Night 42"
      },
      {
        id: 2,
        opponent: "Alex Thompson",
        result: "Loss",
        method: "Decision",
        round: 5,
        date: "2024-02-20",
        event: "Championship Series"
      },
      {
        id: 3,
        opponent: "Mike Chen",
        result: "Win",
        method: "Submission",
        round: 2,
        date: "2024-01-10",
        event: "Underground Battle"
      }
    ]
  });

  const [hasCompletedSetup, setHasCompletedSetup] = useState(false);

  const handleLogout = () => {
    setHasCompletedSetup(false);
    setUserProfile({
      username: "",
      displayName: "",
      bio: "",
      martialArts: [],
      avatar: "",
      rank: "Bronze I",
      eloPoints: 1200,
      posts: 0,
      followers: 0,
      following: 0,
      subscribers: 0,
      isCreator: false,
      wins: 0,
      losses: 0,
      draws: 0,
      totalFights: 0,
      winRate: 0,
      avgPerformance: 0,
      profileImages: [],
      matchHistory: []
    });
  };

  const handleEloIncrease = (points: number) => {
    setUserProfile(prev => ({
      ...prev,
      eloPoints: prev.eloPoints + points
    }));
  };

  if (!hasCompletedSetup) {
    return (
      <ProfileSetup 
        onComplete={(profile) => {
          setUserProfile({
            ...profile, 
            wins: 12, 
            losses: 3, 
            draws: 1, 
            totalFights: 16, 
            winRate: 75, 
            avgPerformance: 82,
            subscribers: 100,
            isCreator: true,
            profileImages: [
              "/lovable-uploads/70f89bc1-fad9-4a7c-9373-6275256cd8b8.png",
              "/lovable-uploads/449a86e6-a6a3-4ead-aa65-72378005773c.png",
              "/lovable-uploads/f0ea7ce1-8701-4f54-be86-df087cb69b67.png",
              "/lovable-uploads/c96b90b9-9167-42be-965e-b40348944f1c.png",
              "/lovable-uploads/ae9b405c-35e9-4c78-b66e-48359e3748d7.png",
              "/lovable-uploads/617d9ba0-8592-426a-b3e5-2958df7d67b0.png"
            ],
            matchHistory: [
              {
                id: 1,
                opponent: "Jake Martinez",
                result: "Win",
                method: "TKO",
                round: 3,
                date: "2024-03-15",
                event: "Fight Night 42"
              },
              {
                id: 2,
                opponent: "Alex Thompson",
                result: "Loss",
                method: "Decision",
                round: 5,
                date: "2024-02-20",
                event: "Championship Series"
              }
            ]
          });
          setHasCompletedSetup(true);
        }} 
      />
    );
  }

  const menuItems = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "create", label: "Create", icon: "➕" },
    { id: "analyze", label: "Analyze", icon: "🎯" },
    { id: "matchup", label: "Match Up", icon: "⚔️" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
    { id: "profile", label: "Profile", icon: "👤" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex flex-col">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === "home" && <HomeFeed />}
        {activeTab === "create" && <CreatePost />}
        {activeTab === "analyze" && <AIAnalyze onEloIncrease={handleEloIncrease} userElo={userProfile.eloPoints} />}
        {activeTab === "matchup" && <MatchmakingApp isAuthenticated={true} onAuthRequired={onShowAuth} />}
        {activeTab === "notifications" && <Notifications />}
        {activeTab === "profile" && <UserProfile profile={userProfile} onLogout={handleLogout} />}
      </div>

      {/* Bottom Navigation Bar for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-orange-500/20 px-2 py-1">
        <div className="flex justify-around items-center">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center p-2 rounded-lg transition-all ${
                activeTab === item.id 
                  ? 'text-orange-500 scale-110' 
                  : 'text-gray-400'
              }`}
            >
              <span className="text-xl mb-1">{item.icon}</span>
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Padding to Account for Navigation Bar */}
      <div className="h-20"></div>
    </div>
  );
};

export default MainApp;
