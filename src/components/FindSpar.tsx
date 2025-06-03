
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const FindSpar = () => {
  const [fighters] = useState([
    {
      fighterId: "fighter_002",
      name: "Carlos Santos",
      nickname: "El Toro",
      avatarUrl: "/lovable-uploads/ba675398-bfb1-409c-8318-bba2efd7bef8.png",
      elo: 1420,
      tier: "Silver",
      weightClass: "145 lbs",
      discipline: "Muay Thai",
      distance: "3 km",
      lastSeen: "2 hrs ago",
      profileVideoUrl: "/lovable-uploads/65228cf8-7a4e-404d-b553-a86f91873a66.png"
    },
    {
      fighterId: "fighter_003",
      name: "Linh Tran",
      nickname: "White Tiger",
      avatarUrl: "/lovable-uploads/7f2979c2-84d3-4f21-8f48-dbc366d81a02.png",
      elo: 1580,
      tier: "Gold",
      weightClass: "135 lbs",
      discipline: "Boxing",
      distance: "5 km",
      lastSeen: "30 min ago",
      profileVideoUrl: "/lovable-uploads/9ca2307a-074c-4c7e-97bd-1fad9667b086.png"
    },
    {
      fighterId: "fighter_004",
      name: "Michael Jones",
      nickname: "Big Mike",
      avatarUrl: "/lovable-uploads/f91a95e9-94db-4bbe-860a-982c5befc2cf.png",
      elo: 1250,
      tier: "Bronze",
      weightClass: "155 lbs",
      discipline: "MMA",
      distance: "9 km",
      lastSeen: "1 day ago",
      profileVideoUrl: "/lovable-uploads/64e82796-d1f7-402a-8cea-be11b4e417fa.png"
    },
    {
      fighterId: "fighter_005",
      name: "David Kim",
      nickname: "Thunder",
      avatarUrl: "/lovable-uploads/17fcef92-2d4e-4c81-bd3c-13fc6526e0b1.png",
      elo: 1390,
      tier: "Silver",
      weightClass: "145 lbs",
      discipline: "Kickboxing",
      distance: "7 km",
      lastSeen: "4 hrs ago",
      profileVideoUrl: "/lovable-uploads/2fd5aa7d-6e85-434c-ab7f-81e157c7961b.png"
    }
  ]);

  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedFighter, setSelectedFighter] = useState(null);

  const handleRequestSpar = (fighter) => {
    setSelectedFighter(fighter);
    setShowRequestModal(true);
  };

  const sendSparRequest = () => {
    setShowRequestModal(false);
    setSelectedFighter(null);
    alert("Spar request sent! 🥊");
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">FIND SPARRING PARTNERS</h2>
        <p className="text-gray-400">Discover fighters near you</p>
      </div>

      {/* Filter Bar */}
      <div 
        className="p-4 rounded-lg mb-6 space-y-4"
        style={{ backgroundColor: '#181818' }}
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-white text-sm font-medium mb-2 block">Location</label>
            <select 
              className="w-full p-2 rounded text-white"
              style={{ backgroundColor: '#101010', borderColor: '#1E90FF', border: '1px solid' }}
            >
              <option>HCMC, 10 km</option>
              <option>HCMC, 25 km</option>
            </select>
          </div>
          
          <div>
            <label className="text-white text-sm font-medium mb-2 block">Weight Class</label>
            <select 
              className="w-full p-2 rounded text-white"
              style={{ backgroundColor: '#101010', borderColor: '#1E90FF', border: '1px solid' }}
            >
              <option>All Classes</option>
              <option>135 lbs</option>
              <option>145 lbs</option>
              <option>155 lbs</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-white text-sm font-medium mb-2 block">ELO Range</label>
            <input 
              type="range" 
              min="1000" 
              max="2000" 
              className="w-full"
              style={{ accentColor: '#E31837' }}
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>1200</span>
              <span>1500</span>
            </div>
          </div>
          
          <div>
            <label className="text-white text-sm font-medium mb-2 block">Discipline</label>
            <div className="flex space-x-2">
              {["Boxing", "MMA", "Muay Thai"].map((discipline) => (
                <button
                  key={discipline}
                  className="px-3 py-1 text-xs rounded border text-white hover:bg-blue-600"
                  style={{ borderColor: '#1E90FF' }}
                >
                  {discipline}
                </button>
              ))}
            </div>
          </div>
        </div>

        <Button 
          className="w-full text-white"
          style={{ backgroundColor: '#1E90FF' }}
        >
          🔍 UPDATE SEARCH
        </Button>
      </div>

      {/* Fighter Results */}
      <div className="space-y-4">
        {fighters.map((fighter) => (
          <Card key={fighter.fighterId} style={{ backgroundColor: '#181818', borderColor: '#333333' }}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                {/* Avatar */}
                <div className="relative">
                  <Avatar className="w-16 h-16 border-2 border-blue-500">
                    <AvatarImage src={fighter.avatarUrl} />
                    <AvatarFallback style={{ backgroundColor: '#E31837' }}>
                      {fighter.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black"></div>
                </div>

                {/* Fighter Info */}
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-white font-bold">{fighter.name}</h3>
                    <Badge 
                      className="text-white text-xs"
                      style={{ backgroundColor: '#1E90FF' }}
                    >
                      {fighter.elo} | {fighter.tier}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-400 text-sm">"{fighter.nickname}"</p>
                  
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-300">
                    <span>🥊 {fighter.discipline}</span>
                    <span>⚖️ {fighter.weightClass}</span>
                    <span>📍 {fighter.distance}</span>
                  </div>
                  
                  <p className="text-gray-500 text-xs mt-1">Last seen: {fighter.lastSeen}</p>
                </div>

                {/* Action Button */}
                <Button
                  onClick={() => handleRequestSpar(fighter)}
                  variant="outline"
                  size="sm"
                  className="text-white border-red-500 hover:bg-red-500"
                >
                  REQUEST SPAR
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-6">
        <Button 
          variant="ghost" 
          className="text-blue-500 hover:text-white hover:bg-blue-600"
        >
          Load More Fighters
        </Button>
      </div>

      {/* Spar Request Modal */}
      {showRequestModal && selectedFighter && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md" style={{ backgroundColor: '#181818', borderColor: '#E31837' }}>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-4">REQUEST SPAR</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400">To: {selectedFighter.name}</p>
                  <p className="text-gray-400">ELO: {selectedFighter.elo} | {selectedFighter.tier}</p>
                </div>
                
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Date & Time</label>
                  <select 
                    className="w-full p-2 rounded text-white"
                    style={{ backgroundColor: '#101010', borderColor: '#1E90FF', border: '1px solid' }}
                  >
                    <option>Jun 28, 2025 / 18:00</option>
                    <option>Jun 29, 2025 / 12:00</option>
                    <option>Jun 30, 2025 / 19:00</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Message (Optional)</label>
                  <textarea 
                    placeholder="Looking forward to sparring with you!"
                    className="w-full p-3 rounded text-white h-20 resize-none"
                    style={{ backgroundColor: '#101010', borderColor: '#1E90FF', border: '1px solid' }}
                  />
                </div>
                
                <div className="flex space-x-3">
                  <Button
                    onClick={() => setShowRequestModal(false)}
                    variant="outline"
                    className="flex-1 text-gray-300 border-gray-600 hover:bg-gray-700"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={sendSparRequest}
                    className="flex-1 text-white"
                    style={{ backgroundColor: '#E31837' }}
                  >
                    Send Request
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default FindSpar;
