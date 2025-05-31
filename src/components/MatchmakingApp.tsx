
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";

interface Fighter {
  id: number;
  name: string;
  username: string;
  avatar: string;
  elo: number;
  rank: string;
  location: string;
  distance: number;
  wins: number;
  losses: number;
  draws: number;
  winRate: number;
  weight: string;
  age: number;
  martialArts: string[];
  bio: string;
  lastActive: string;
  isOnline: boolean;
  hourlyRate: number;
}

interface Event {
  id: number;
  title: string;
  type: "amateur" | "pro";
  date: string;
  time: string;
  location: string;
  venue: string;
  description: string;
  ticketPrice: number;
  maxParticipants: number;
  currentParticipants: number;
  organizer: string;
  image: string;
  prizes?: string;
  requirements?: string;
}

interface MatchmakingAppProps {
  isAuthenticated?: boolean;
  onAuthRequired?: () => void;
}

const MatchmakingApp = ({ isAuthenticated = false, onAuthRequired }: MatchmakingAppProps) => {
  const [showMatches, setShowMatches] = useState(false);
  const [activeTab, setActiveTab] = useState("matches");
  const [selectedFighter, setSelectedFighter] = useState<Fighter | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showTicketPurchase, setShowTicketPurchase] = useState(false);
  const [filters, setFilters] = useState({
    maxDistance: "25",
    weightClass: "",
    skillLevel: "",
    martialArt: ""
  });

  const mockFighters: Fighter[] = [
    {
      id: 1,
      name: "Marcus Rodriguez",
      username: "boxing_beast",
      avatar: "",
      elo: 1450,
      rank: "Silver II",
      location: "Los Angeles, CA",
      distance: 3.2,
      wins: 12,
      losses: 2,
      draws: 1,
      winRate: 85,
      weight: "Welterweight",
      age: 26,
      martialArts: ["Boxing", "Kickboxing"],
      bio: "Professional boxer with 5 years experience. Looking for technical sparring partners.",
      lastActive: "2 hours ago",
      isOnline: true,
      hourlyRate: 75
    },
    {
      id: 2,
      name: "Sarah Chen",
      username: "muay_thai_queen",
      avatar: "",
      elo: 1520,
      rank: "Gold I",
      location: "San Diego, CA",
      distance: 8.7,
      wins: 18,
      losses: 3,
      draws: 0,
      winRate: 92,
      weight: "Lightweight",
      age: 24,
      martialArts: ["Muay Thai", "Boxing"],
      bio: "Muay Thai champion seeking challenging sparring sessions. Respectful and technical.",
      lastActive: "1 hour ago",
      isOnline: true,
      hourlyRate: 85
    },
    {
      id: 3,
      name: "Jake Thompson",
      username: "iron_fist",
      avatar: "",
      elo: 1380,
      rank: "Silver I",
      location: "Long Beach, CA",
      distance: 12.4,
      wins: 8,
      losses: 4,
      draws: 2,
      winRate: 71,
      weight: "Middleweight",
      age: 29,
      martialArts: ["Boxing", "MMA"],
      bio: "Former amateur boxer transitioning to MMA. Always looking to improve.",
      lastActive: "3 hours ago",
      isOnline: false,
      hourlyRate: 60
    },
    {
      id: 4,
      name: "Diana Silva",
      username: "bjj_warrior",
      avatar: "",
      elo: 1605,
      rank: "Gold II",
      location: "Santa Monica, CA",
      distance: 5.1,
      wins: 22,
      losses: 1,
      draws: 1,
      winRate: 96,
      weight: "Featherweight",
      age: 27,
      martialArts: ["BJJ", "Wrestling"],
      bio: "Brazilian Jiu-Jitsu black belt. Focused on ground game and submission techniques.",
      lastActive: "30 minutes ago",
      isOnline: true,
      hourlyRate: 95
    }
  ];

  const mockEvents: Event[] = [
    {
      id: 1,
      title: "Golden Gloves Amateur Championship",
      type: "amateur",
      date: "2024-06-15",
      time: "6:00 PM",
      location: "Los Angeles, CA",
      venue: "MGM Grand Arena",
      description: "Annual amateur boxing championship featuring the best upcoming talent in Southern California.",
      ticketPrice: 45,
      maxParticipants: 32,
      currentParticipants: 28,
      organizer: "LA Boxing Federation",
      image: "/lovable-uploads/60d42b2f-2916-449c-a7e9-cc5ce66ae476.png",
      prizes: "1st: $2,500, 2nd: $1,000, 3rd: $500",
      requirements: "Must have amateur boxing license"
    },
    {
      id: 2,
      title: "Friday Night Fights Pro Series",
      type: "pro",
      date: "2024-06-08",
      time: "8:00 PM",
      location: "Las Vegas, NV",
      venue: "Caesar's Palace",
      description: "Professional boxing event featuring rising stars and established champions.",
      ticketPrice: 125,
      maxParticipants: 16,
      currentParticipants: 14,
      organizer: "Nevada Boxing Commission",
      image: "/lovable-uploads/60d42b2f-2916-449c-a7e9-cc5ce66ae476.png",
      prizes: "Winner: $25,000, Runner-up: $10,000",
      requirements: "Professional boxing license required"
    },
    {
      id: 3,
      title: "Youth Boxing Showcase",
      type: "amateur",
      date: "2024-06-22",
      time: "4:00 PM",
      location: "San Diego, CA",
      venue: "Balboa Stadium",
      description: "Showcase event for young boxers aged 16-21 to demonstrate their skills.",
      ticketPrice: 25,
      maxParticipants: 24,
      currentParticipants: 18,
      organizer: "SoCal Youth Boxing",
      image: "/lovable-uploads/60d42b2f-2916-449c-a7e9-cc5ce66ae476.png",
      prizes: "Trophies and medals for all participants",
      requirements: "Age 16-21, amateur status"
    }
  ];

  const handleFindMatches = () => {
    setShowMatches(true);
  };

  const handleViewProfile = (fighter: Fighter) => {
    setSelectedFighter(fighter);
    setShowProfile(true);
  };

  const handleSendMatchRequest = (fighter: Fighter) => {
    if (!isAuthenticated) {
      toast({
        title: "Sign Up Required",
        description: "Please create an account to send match requests",
        action: (
          <Button 
            onClick={onAuthRequired}
            className="bg-orange-600 hover:bg-orange-700 text-white"
          >
            Sign Up Now
          </Button>
        ),
      });
      return;
    }
    setSelectedFighter(fighter);
    setShowProfile(false);
    setShowPayment(true);
  };

  const handleViewEvent = (event: Event) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  const handleJoinEvent = (event: Event) => {
    if (!isAuthenticated) {
      toast({
        title: "Sign Up Required",
        description: "Please create an account to join events",
        action: (
          <Button 
            onClick={onAuthRequired}
            className="bg-orange-600 hover:bg-orange-700 text-white"
          >
            Sign Up Now
          </Button>
        ),
      });
      return;
    }
    setSelectedEvent(event);
    setShowEventDetails(false);
    setShowTicketPurchase(true);
  };

  const handleConfirmPayment = () => {
    if (selectedFighter) {
      toast({
        title: "Match Request Sent!",
        description: `Match request sent to ${selectedFighter.name}! Payment of $${selectedFighter.hourlyRate} will be charged after the match is completed. 🥊`,
      });
      setShowPayment(false);
      setSelectedFighter(null);
    }
  };

  const handleConfirmTicketPurchase = () => {
    if (selectedEvent) {
      toast({
        title: "Ticket Purchased!",
        description: `You've successfully purchased a ticket for ${selectedEvent.title}! Check your email for confirmation. 🎫`,
      });
      setShowTicketPurchase(false);
      setSelectedEvent(null);
    }
  };

  const filteredFighters = mockFighters.filter(fighter => {
    if (filters.maxDistance && fighter.distance > parseInt(filters.maxDistance)) return false;
    if (filters.weightClass && fighter.weight !== filters.weightClass) return false;
    if (filters.martialArt && !fighter.martialArts.includes(filters.martialArt)) return false;
    return true;
  });

  if (!showMatches) {
    return (
      <div 
        className="min-h-[80vh] flex items-center justify-center relative"
        style={{
          backgroundImage: `url('/lovable-uploads/60d42b2f-2916-449c-a7e9-cc5ce66ae476.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="text-center space-y-6 max-w-2xl mx-auto p-8 relative z-10">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-white">
              Find Your Perfect <span className="text-orange-500">Sparring Partner</span>
            </h1>
            <p className="text-xl text-gray-300">
              Connect with fighters at your skill level for safe, competitive training sessions
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 my-8">
            <div className="bg-gray-900/30 p-4 rounded-xl border border-orange-500/20 backdrop-blur-sm">
              <div className="text-orange-500 text-2xl mb-2">⚡</div>
              <h3 className="text-white font-semibold">ELO Matching</h3>
              <p className="text-gray-400 text-sm">Paired by skill level</p>
            </div>
            <div className="bg-gray-900/30 p-4 rounded-xl border border-orange-500/20 backdrop-blur-sm">
              <div className="text-orange-500 text-2xl mb-2">📍</div>
              <h3 className="text-white font-semibold">Location Based</h3>
              <p className="text-gray-400 text-sm">Find partners nearby</p>
            </div>
            <div className="bg-gray-900/30 p-4 rounded-xl border border-orange-500/20 backdrop-blur-sm">
              <div className="text-orange-500 text-2xl mb-2">🛡️</div>
              <h3 className="text-white font-semibold">Safe Training</h3>
              <p className="text-gray-400 text-sm">Verified fighters only</p>
            </div>
          </div>

          <Button
            onClick={handleFindMatches}
            className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white text-lg px-8 py-4 rounded-xl"
          >
            Find Matches
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Match Up</h2>
          <p className="text-gray-400">Find sparring partners and join events</p>
        </div>
        <Button
          onClick={() => setShowMatches(false)}
          variant="outline"
          className="border-gray-600 text-gray-300 hover:bg-gray-700"
        >
          Back to Search
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 bg-gray-800">
          <TabsTrigger value="matches" className="text-white data-[state=active]:bg-orange-600">
            Sparring Partners
          </TabsTrigger>
          <TabsTrigger value="events" className="text-white data-[state=active]:bg-orange-600">
            Events
          </TabsTrigger>
        </TabsList>

        <TabsContent value="matches" className="space-y-6">
          {/* Filters */}
          <Card className="bg-gray-900/30 border border-orange-500/20">
            <CardHeader>
              <CardTitle className="text-white">Filter Matches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Max Distance</label>
                  <Select value={filters.maxDistance} onValueChange={(value) => setFilters({...filters, maxDistance: value})}>
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="10">10 miles</SelectItem>
                      <SelectItem value="25">25 miles</SelectItem>
                      <SelectItem value="50">50 miles</SelectItem>
                      <SelectItem value="100">100 miles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Weight Class</label>
                  <Select value={filters.weightClass} onValueChange={(value) => setFilters({...filters, weightClass: value})}>
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue placeholder="Any weight" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="Featherweight">Featherweight</SelectItem>
                      <SelectItem value="Lightweight">Lightweight</SelectItem>
                      <SelectItem value="Welterweight">Welterweight</SelectItem>
                      <SelectItem value="Middleweight">Middleweight</SelectItem>
                      <SelectItem value="Heavyweight">Heavyweight</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Martial Art</label>
                  <Select value={filters.martialArt} onValueChange={(value) => setFilters({...filters, martialArt: value})}>
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue placeholder="Any style" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="Boxing">Boxing</SelectItem>
                      <SelectItem value="Muay Thai">Muay Thai</SelectItem>
                      <SelectItem value="BJJ">BJJ</SelectItem>
                      <SelectItem value="MMA">MMA</SelectItem>
                      <SelectItem value="Kickboxing">Kickboxing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button
                    onClick={() => setFilters({maxDistance: "25", weightClass: "", skillLevel: "", martialArt: ""})}
                    variant="outline"
                    className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-gray-400 mb-4">{filteredFighters.length} matches found near you</div>

          {/* Fighter Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFighters.map((fighter) => (
              <Card key={fighter.id} className="bg-gray-900/30 border border-orange-500/20 hover:border-orange-500/40 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="relative">
                      <Avatar className="w-16 h-16 ring-2 ring-orange-500/50">
                        <AvatarImage src={fighter.avatar} />
                        <AvatarFallback className="bg-gradient-to-br from-orange-600 to-red-600 text-white">
                          {fighter.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {fighter.isOnline && (
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-white font-bold text-lg">{fighter.name}</h3>
                      <p className="text-gray-400 text-sm">@{fighter.username}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className="bg-gradient-to-r from-orange-600 to-red-600 text-white text-xs">
                          {fighter.rank}
                        </Badge>
                        <span className="text-orange-400 font-semibold">{fighter.elo} ELO</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Location:</span>
                      <span className="text-white">{fighter.distance} miles away</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Record:</span>
                      <span className="text-white">{fighter.wins}W-{fighter.losses}L-{fighter.draws}D</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Weight:</span>
                      <span className="text-white">{fighter.weight}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Rate:</span>
                      <span className="text-green-400 font-semibold">${fighter.hourlyRate}/session</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {fighter.martialArts.map((art, index) => (
                      <Badge key={index} variant="outline" className="border-orange-500/50 text-orange-400 text-xs">
                        {art}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleViewProfile(fighter)}
                      variant="outline"
                      className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700 text-sm"
                    >
                      View Profile
                    </Button>
                    <Button
                      onClick={() => handleSendMatchRequest(fighter)}
                      className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white text-sm"
                    >
                      Request Match
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <div className="text-gray-400 mb-4">{mockEvents.length} events available</div>
          
          {/* Events Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockEvents.map((event) => (
              <Card key={event.id} className="bg-gray-900/30 border border-orange-500/20 hover:border-orange-500/40 transition-colors overflow-hidden">
                <div 
                  className="h-48 bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${event.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <Badge 
                    className={`absolute top-4 right-4 ${
                      event.type === 'pro' 
                        ? 'bg-gradient-to-r from-yellow-600 to-yellow-500' 
                        : 'bg-gradient-to-r from-blue-600 to-blue-500'
                    }`}
                  >
                    {event.type.toUpperCase()}
                  </Badge>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-bold text-lg mb-1">{event.title}</h3>
                    <p className="text-sm text-gray-300">{event.date} • {event.time}</p>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Venue:</span>
                      <span className="text-white">{event.venue}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Location:</span>
                      <span className="text-white">{event.location}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Participants:</span>
                      <span className="text-white">{event.currentParticipants}/{event.maxParticipants}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Ticket Price:</span>
                      <span className="text-green-400 font-semibold">${event.ticketPrice}</span>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">{event.description}</p>

                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleViewEvent(event)}
                      variant="outline"
                      className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700 text-sm"
                    >
                      View Details
                    </Button>
                    <Button
                      onClick={() => handleJoinEvent(event)}
                      className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white text-sm"
                      disabled={event.currentParticipants >= event.maxParticipants}
                    >
                      {event.currentParticipants >= event.maxParticipants ? 'Full' : 'Buy Ticket'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Fighter Profile Modal */}
      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent className="max-w-2xl bg-gray-900 border-orange-500/30">
          {selectedFighter && (
            <div>
              <DialogHeader>
                <DialogTitle className="text-white text-2xl">Fighter Profile</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6 mt-6">
                <div className="flex items-start gap-6">
                  <Avatar className="w-24 h-24 ring-2 ring-orange-500/50">
                    <AvatarImage src={selectedFighter.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-orange-600 to-red-600 text-white text-2xl">
                      {selectedFighter.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-2xl">{selectedFighter.name}</h3>
                    <p className="text-gray-400">@{selectedFighter.username}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <Badge className="bg-gradient-to-r from-orange-600 to-red-600">
                        {selectedFighter.rank}
                      </Badge>
                      <span className="text-orange-400 font-bold">{selectedFighter.elo} ELO</span>
                      <span className={selectedFighter.isOnline ? "text-green-400" : "text-gray-400"}>
                        {selectedFighter.isOnline ? "● Online" : `⚫ ${selectedFighter.lastActive}`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gray-800 rounded-xl">
                    <div className="text-2xl font-bold text-green-400">{selectedFighter.wins}</div>
                    <div className="text-gray-400 text-sm">Wins</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800 rounded-xl">
                    <div className="text-2xl font-bold text-red-400">{selectedFighter.losses}</div>
                    <div className="text-gray-400 text-sm">Losses</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800 rounded-xl">
                    <div className="text-2xl font-bold text-blue-400">{selectedFighter.draws}</div>
                    <div className="text-gray-400 text-sm">Draws</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800 rounded-xl">
                    <div className="text-2xl font-bold text-orange-400">{selectedFighter.winRate}%</div>
                    <div className="text-gray-400 text-sm">Win Rate</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-white font-semibold mb-2">Fighting Styles</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedFighter.martialArts.map((art, index) => (
                        <Badge key={index} className="bg-orange-600/20 text-orange-400 border border-orange-500/50">
                          {art}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">About</h4>
                    <p className="text-gray-300">{selectedFighter.bio}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Age:</span>
                      <span className="text-white ml-2">{selectedFighter.age} years</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Weight Class:</span>
                      <span className="text-white ml-2">{selectedFighter.weight}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Location:</span>
                      <span className="text-white ml-2">{selectedFighter.location}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Session Rate:</span>
                      <span className="text-green-400 ml-2 font-semibold">${selectedFighter.hourlyRate}</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    onClick={() => setShowProfile(false)}
                    variant="outline"
                    className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => handleSendMatchRequest(selectedFighter)}
                    className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                  >
                    Request Match
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Event Details Modal */}
      <Dialog open={showEventDetails} onOpenChange={setShowEventDetails}>
        <DialogContent className="max-w-2xl bg-gray-900 border-orange-500/30">
          {selectedEvent && (
            <div>
              <DialogHeader>
                <DialogTitle className="text-white text-2xl">Event Details</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6 mt-6">
                <div 
                  className="h-64 bg-cover bg-center rounded-lg relative"
                  style={{ backgroundImage: `url(${selectedEvent.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-lg"></div>
                  <Badge 
                    className={`absolute top-4 right-4 ${
                      selectedEvent.type === 'pro' 
                        ? 'bg-gradient-to-r from-yellow-600 to-yellow-500' 
                        : 'bg-gradient-to-r from-blue-600 to-blue-500'
                    }`}
                  >
                    {selectedEvent.type.toUpperCase()}
                  </Badge>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-bold text-2xl mb-1">{selectedEvent.title}</h3>
                    <p className="text-lg text-gray-300">{selectedEvent.date} • {selectedEvent.time}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-400 text-sm">Venue:</span>
                      <p className="text-white font-semibold">{selectedEvent.venue}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Location:</span>
                      <p className="text-white">{selectedEvent.location}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Organizer:</span>
                      <p className="text-white">{selectedEvent.organizer}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-400 text-sm">Participants:</span>
                      <p className="text-white">{selectedEvent.currentParticipants}/{selectedEvent.maxParticipants}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Ticket Price:</span>
                      <p className="text-green-400 font-bold text-lg">${selectedEvent.ticketPrice}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Status:</span>
                      <p className={selectedEvent.currentParticipants >= selectedEvent.maxParticipants ? "text-red-400" : "text-green-400"}>
                        {selectedEvent.currentParticipants >= selectedEvent.maxParticipants ? "Sold Out" : "Available"}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-2">Description</h4>
                  <p className="text-gray-300">{selectedEvent.description}</p>
                </div>

                {selectedEvent.prizes && (
                  <div>
                    <h4 className="text-white font-semibold mb-2">Prizes</h4>
                    <p className="text-gray-300">{selectedEvent.prizes}</p>
                  </div>
                )}

                {selectedEvent.requirements && (
                  <div>
                    <h4 className="text-white font-semibold mb-2">Requirements</h4>
                    <p className="text-gray-300">{selectedEvent.requirements}</p>
                  </div>
                )}

                <div className="flex space-x-3 pt-4">
                  <Button
                    onClick={() => setShowEventDetails(false)}
                    variant="outline"
                    className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => handleJoinEvent(selectedEvent)}
                    className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                    disabled={selectedEvent.currentParticipants >= selectedEvent.maxParticipants}
                  >
                    {selectedEvent.currentParticipants >= selectedEvent.maxParticipants ? 'Sold Out' : 'Buy Ticket'}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Payment Confirmation Modal */}
      <Dialog open={showPayment} onOpenChange={setShowPayment}>
        <DialogContent className="max-w-md bg-gray-900 border-orange-500/30">
          {selectedFighter && (
            <div>
              <DialogHeader>
                <DialogTitle className="text-white text-xl">Confirm Match Request</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4 mt-6">
                <div className="text-center p-4 bg-gray-800 rounded-xl">
                  <h3 className="text-white font-semibold mb-2">Match with {selectedFighter.name}</h3>
                  <p className="text-gray-400 text-sm mb-3">Payment will be charged after match completion</p>
                  <div className="text-2xl font-bold text-green-400">${selectedFighter.hourlyRate}</div>
                  <div className="text-gray-400 text-sm">Session Fee</div>
                </div>

                <div className="text-center text-gray-300 text-sm">
                  <p>• ELO adjustment will be applied after the match</p>
                  <p>• Payment is secured and processed automatically</p>
                  <p>• You can cancel up to 24 hours before the match</p>
                </div>

                <div className="flex space-x-3">
                  <Button
                    onClick={() => setShowPayment(false)}
                    variant="outline"
                    className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleConfirmPayment}
                    className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                  >
                    Send Request
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Ticket Purchase Modal */}
      <Dialog open={showTicketPurchase} onOpenChange={setShowTicketPurchase}>
        <DialogContent className="max-w-md bg-gray-900 border-orange-500/30">
          {selectedEvent && (
            <div>
              <DialogHeader>
                <DialogTitle className="text-white text-xl">Purchase Ticket</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4 mt-6">
                <div className="text-center p-4 bg-gray-800 rounded-xl">
                  <h3 className="text-white font-semibold mb-2">{selectedEvent.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">{selectedEvent.date} • {selectedEvent.time}</p>
                  <div className="text-2xl font-bold text-green-400">${selectedEvent.ticketPrice}</div>
                  <div className="text-gray-400 text-sm">Ticket Price</div>
                </div>

                <div className="text-center text-gray-300 text-sm">
                  <p>• Confirmation email will be sent immediately</p>
                  <p>• Bring ID and confirmation to the event</p>
                  <p>• Refunds available up to 48 hours before event</p>
                </div>

                <div className="flex space-x-3">
                  <Button
                    onClick={() => setShowTicketPurchase(false)}
                    variant="outline"
                    className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleConfirmTicketPurchase}
                    className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                  >
                    Purchase Ticket
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MatchmakingApp;
