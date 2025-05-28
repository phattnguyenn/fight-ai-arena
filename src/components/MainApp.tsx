
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import HomeFeed from "@/components/HomeFeed";
import ProfileSetup from "@/components/ProfileSetup";
import CreatePost from "@/components/CreatePost";
import MatchUpAndEvents from "@/components/MatchUpAndEvents";
import UserProfile from "@/components/UserProfile";
import AIAnalyze from "@/components/AIAnalyze";

const MainApp = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(true);
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
    wins: 12,
    losses: 3,
    draws: 1,
    totalFights: 16,
    winRate: 75,
    avgPerformance: 82,
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
      wins: 0,
      losses: 0,
      draws: 0,
      totalFights: 0,
      winRate: 0,
      avgPerformance: 0,
      matchHistory: []
    });
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
    { id: "analyze", label: "Analyze", icon: "📊" },
    { id: "matchup", label: "Match Up", icon: "⚔️" },
    { id: "profile", label: "Profile", icon: "👤" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex">
      {/* Vertical Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-gradient-to-b from-black via-orange-900/20 to-red-900/20 backdrop-blur-sm border-r border-orange-500/20 flex flex-col`}>
        {/* Header */}
        <div className="p-4 border-b border-orange-500/20">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <h1 className="text-xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-blue-500 bg-clip-text text-transparent">
                FIGHT<span className="text-white">CLUB</span>
              </h1>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white hover:bg-orange-500/20"
            >
              {sidebarOpen ? "◀" : "▶"}
            </Button>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-orange-500/20">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10 ring-2 ring-orange-500/50">
              <AvatarImage src={userProfile.avatar} />
              <AvatarFallback className="bg-gradient-to-br from-orange-600 to-red-600 text-white">
                {userProfile.displayName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{userProfile.displayName}</p>
                <Badge className="bg-gradient-to-r from-orange-600 to-red-600 text-white border-none text-xs">
                  {userProfile.rank}
                </Badge>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 p-4">
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => setActiveTab(item.id)}
                className={`w-full ${sidebarOpen ? 'justify-start' : 'justify-center'} ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                    : 'text-gray-300 hover:bg-orange-500/20 hover:text-white'
                } transition-all`}
              >
                <span className="text-lg">{item.icon}</span>
                {sidebarOpen && <span className="ml-3">{item.label}</span>}
              </Button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto p-6">
          {activeTab === "home" && <HomeFeed />}
          {activeTab === "create" && <CreatePost />}
          {activeTab === "analyze" && <AIAnalyze />}
          {activeTab === "matchup" && <MatchUpAndEvents />}
          {activeTab === "profile" && <UserProfile profile={userProfile} onLogout={handleLogout} />}
        </div>
      </div>
    </div>
  );
};

export default MainApp;
