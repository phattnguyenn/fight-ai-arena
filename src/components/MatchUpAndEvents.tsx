
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MatchUpAndEvents = () => {
  const [activeSubTab, setActiveSubTab] = useState("sparring");
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

  const [gymEvents] = useState([
    {
      id: 1,
      title: "Elite Boxing Sparring Session",
      gym: "Champions Gym",
      type: "Sparring Event",
      date: "June 15, 2025",
      time: "6:00 PM - 8:00 PM",
      location: "Downtown Los Angeles, CA",
      fee: "$25",
      level: "Intermediate to Advanced",
      description: "Join us for an intense boxing sparring session with experienced fighters.",
      spots: "8 spots left",
      image: ""
    },
    {
      id: 2,
      title: "Friday Night Fights - Amateur",
      gym: "Iron Fist Arena",
      type: "Amateur Event",
      date: "June 20, 2025",
      time: "7:00 PM - 11:00 PM",
      location: "Las Vegas, NV",
      fee: "$45",
      level: "Amateur",
      description: "Watch and participate in amateur boxing matches. Great atmosphere!",
      spots: "Tickets available",
      image: ""
    },
    {
      id: 3,
      title: "MMA Cage Warriors Championship",
      gym: "Warrior's Den",
      type: "Professional Event",
      date: "July 4, 2025",
      time: "8:00 PM - 12:00 AM",
      location: "Miami, FL",
      fee: "$120",
      level: "Professional",
      description: "Professional MMA championship featuring top fighters from around the world.",
      spots: "VIP & General admission",
      image: ""
    }
  ]);

  const handleSendChallenge = (partnerId: number) => {
    console.log("Sending challenge to partner:", partnerId);
    alert("Challenge request sent! 🥊");
  };

  const handleJoinEvent = (eventId: number) => {
    console.log("Joining event:", eventId);
    alert("Event registration successful! 🎟️");
  };

  return (
    <div className="space-y-6">
      <Card className="bg-black/50 backdrop-blur-sm border border-orange-500/20 rounded-3xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-orange-500/10 to-red-500/10">
          <CardTitle className="text-white text-2xl">⚔️ Match Up & Events</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs value={activeSubTab} onValueChange={setActiveSubTab}>
            <TabsList className="grid w-full grid-cols-2 bg-gray-900/50 rounded-2xl p-1 mb-6">
              <TabsTrigger 
                value="sparring" 
                className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white rounded-xl"
              >
                🥊 Find Sparring Partners
              </TabsTrigger>
              <TabsTrigger 
                value="events" 
                className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-orange-500 data-[state=active]:text-white rounded-xl"
              >
                🎟️ Events & Tournaments
              </TabsTrigger>
            </TabsList>

            <TabsContent value="sparring" className="space-y-6">
              {/* Search Filters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">
                    Search Radius
                  </label>
                  <Select value={searchRadius} onValueChange={setSearchRadius}>
                    <SelectTrigger className="bg-gray-900/50 border-orange-500/30 text-white rounded-xl">
                      <SelectValue placeholder="Select radius" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-orange-500/30 rounded-xl">
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
                    <SelectTrigger className="bg-gray-900/50 border-orange-500/30 text-white rounded-xl">
                      <SelectValue placeholder="Any martial art" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-orange-500/30 rounded-xl">
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
                    <SelectTrigger className="bg-gray-900/50 border-orange-500/30 text-white rounded-xl">
                      <SelectValue placeholder="Any level" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-orange-500/30 rounded-xl">
                      <SelectItem value="bronze">Bronze</SelectItem>
                      <SelectItem value="silver">Silver</SelectItem>
                      <SelectItem value="gold">Gold</SelectItem>
                      <SelectItem value="platinum">Platinum</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 rounded-xl px-6">
                🔍 Update Search
              </Button>

              {/* Sparring Partners Results */}
              <div className="space-y-4">
                <h3 className="text-white text-lg font-semibold">Available Sparring Partners</h3>
                
                {sparringPartners.map((partner) => (
                  <Card key={partner.id} className="bg-gray-900/30 border border-orange-500/20 rounded-2xl">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className="relative">
                            <Avatar className="w-16 h-16 ring-2 ring-orange-500/50">
                              <AvatarImage src={partner.avatar} />
                              <AvatarFallback className="bg-gradient-to-br from-orange-600 to-red-600 text-white text-lg">
                                {partner.displayName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            {partner.isOnline && (
                              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
                            )}
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="text-white font-semibold">{partner.displayName}</h4>
                              <Badge className="bg-gradient-to-r from-orange-600 to-red-600 text-white border-none">{partner.rank}</Badge>
                            </div>
                            <p className="text-gray-400 text-sm mb-2">@{partner.username} • {partner.distance}</p>
                            
                            <div className="flex flex-wrap gap-1 mb-3">
                              {partner.martialArts.map((art, index) => (
                                <Badge key={index} variant="outline" className="border-orange-500 text-orange-400 text-xs bg-orange-500/10 rounded-full">
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
                            className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white rounded-xl"
                          >
                            ⚔️ Challenge
                          </Button>
                          <Button variant="outline" className="border-orange-500/50 text-orange-400 hover:bg-orange-500/10 rounded-xl">
                            👁️ View Profile
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="events" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-white text-lg font-semibold">Upcoming Events & Tournaments</h3>
                
                {gymEvents.map((event) => (
                  <Card key={event.id} className="bg-gray-900/30 border border-blue-500/20 rounded-2xl overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <h4 className="text-white font-bold text-lg">{event.title}</h4>
                            <Badge 
                              className={`border-none text-white ${
                                event.type === 'Sparring Event' ? 'bg-gradient-to-r from-orange-600 to-red-600' :
                                event.type === 'Amateur Event' ? 'bg-gradient-to-r from-blue-600 to-orange-600' :
                                'bg-gradient-to-r from-red-600 to-blue-600'
                              }`}
                            >
                              {event.type}
                            </Badge>
                          </div>
                          
                          <p className="text-orange-400 font-semibold mb-2">📍 {event.gym}</p>
                          
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <p className="text-gray-400 text-sm">📅 Date & Time</p>
                              <p className="text-white">{event.date}</p>
                              <p className="text-white">{event.time}</p>
                            </div>
                            <div>
                              <p className="text-gray-400 text-sm">📍 Location</p>
                              <p className="text-white">{event.location}</p>
                            </div>
                            <div>
                              <p className="text-gray-400 text-sm">💰 Entry Fee</p>
                              <p className="text-green-400 font-bold text-lg">{event.fee}</p>
                            </div>
                            <div>
                              <p className="text-gray-400 text-sm">🏆 Level</p>
                              <p className="text-white">{event.level}</p>
                            </div>
                          </div>

                          <p className="text-gray-300 text-sm mb-3">{event.description}</p>
                          
                          <p className="text-blue-400 text-sm font-semibold">✅ {event.spots}</p>
                        </div>

                        <div className="flex flex-col space-y-2 ml-6">
                          <Button
                            onClick={() => handleJoinEvent(event.id)}
                            className="bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700 text-white rounded-xl px-6"
                          >
                            🎟️ Buy Ticket
                          </Button>
                          <Button variant="outline" className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 rounded-xl">
                            ℹ️ Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default MatchUpAndEvents;
