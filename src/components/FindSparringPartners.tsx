
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const FindSparringPartners = () => {
  const [searchRadius, setSearchRadius] = useState("10");
  const [selectedMartialArt, setSelectedMartialArt] = useState("");
  const [selectedRank, setSelectedRank] = useState("");

  const [sparringPartners] = useState([
    {
      id: 1,
      username: "boxingbeast",
      displayName: "Jordan Smith",
      avatar: "",
      rank: "Silver II",
      distance: "2.3 miles",
      martialArts: ["Boxing", "Kickboxing"],
      bio: "Looking for technical sparring partners. Focus on improvement over ego!",
      isOnline: true,
      lastActive: "2 hours ago"
    },
    {
      id: 2,
      username: "muay_thai_mike",
      displayName: "Mike Johnson",
      avatar: "",
      rank: "Gold I",
      distance: "4.1 miles",
      martialArts: ["Muay Thai", "Boxing"],
      bio: "Experienced fighter, happy to work with all skill levels. Let's train!",
      isOnline: false,
      lastActive: "1 day ago"
    },
    {
      id: 3,
      username: "bjj_queen",
      displayName: "Lisa Park",
      avatar: "",
      rank: "Silver III",
      distance: "6.8 miles",
      martialArts: ["Brazilian Jiu-Jitsu", "Wrestling"],
      bio: "BJJ enthusiast looking for rolling partners. Respectful training environment.",
      isOnline: true,
      lastActive: "30 minutes ago"
    }
  ]);

  const handleSendChallenge = (partnerId: number) => {
    console.log("Sending challenge to partner:", partnerId);
    alert("Challenge request sent! 🥊");
  };

  return (
    <div className="space-y-6">
      {/* Search Filters */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">⚔️ Find Sparring Partners</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Search Radius
              </label>
              <Select value={searchRadius} onValueChange={setSearchRadius}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Select radius" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="5">5 miles</SelectItem>
                  <SelectItem value="10">10 miles</SelectItem>
                  <SelectItem value="25">25 miles</SelectItem>
                  <SelectItem value="50">50 miles</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Martial Art
              </label>
              <Select value={selectedMartialArt} onValueChange={setSelectedMartialArt}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Any martial art" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="boxing">Boxing</SelectItem>
                  <SelectItem value="muaythai">Muay Thai</SelectItem>
                  <SelectItem value="bjj">Brazilian Jiu-Jitsu</SelectItem>
                  <SelectItem value="mma">MMA</SelectItem>
                  <SelectItem value="kickboxing">Kickboxing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Skill Level
              </label>
              <Select value={selectedRank} onValueChange={setSelectedRank}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Any level" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="bronze">Bronze</SelectItem>
                  <SelectItem value="silver">Silver</SelectItem>
                  <SelectItem value="gold">Gold</SelectItem>
                  <SelectItem value="platinum">Platinum</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button className="bg-orange-600 hover:bg-orange-700">
            🔍 Update Search
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        <h3 className="text-white text-lg font-semibold">Available Sparring Partners</h3>
        
        {sparringPartners.map((partner) => (
          <Card key={partner.id} className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="relative">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={partner.avatar} />
                      <AvatarFallback className="bg-orange-600 text-white text-lg">
                        {partner.displayName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {partner.isOnline && (
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800"></div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="text-white font-semibold">{partner.displayName}</h4>
                      <Badge className="bg-orange-600 text-white">{partner.rank}</Badge>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">@{partner.username} • {partner.distance}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {partner.martialArts.map((art, index) => (
                        <Badge key={index} variant="outline" className="border-orange-500 text-orange-500 text-xs">
                          {art}
                        </Badge>
                      ))}
                    </div>

                    <p className="text-gray-300 text-sm mb-2">{partner.bio}</p>
                    
                    <div className="flex items-center space-x-4 text-xs text-gray-400">
                      <span className={partner.isOnline ? "text-green-400" : ""}>
                        {partner.isOnline ? "🟢 Online" : `⚫ Last seen ${partner.lastActive}`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  <Button
                    onClick={() => handleSendChallenge(partner.id)}
                    className="bg-orange-600 hover:bg-orange-700 text-white"
                  >
                    ⚔️ Challenge
                  </Button>
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                    👁️ View Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {sparringPartners.length === 0 && (
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-white text-lg font-semibold mb-2">No partners found</h3>
            <p className="text-gray-400 mb-4">Try expanding your search radius or adjusting your filters</p>
            <Button className="bg-orange-600 hover:bg-orange-700">
              Expand Search
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FindSparringPartners;
