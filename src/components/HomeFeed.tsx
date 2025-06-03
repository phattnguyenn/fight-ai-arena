
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface HomeFeedProps {
  userRole: "fighter" | "coach" | "fan";
}

const HomeFeed = ({ userRole }: HomeFeedProps) => {
  const [feedData] = useState([
    {
      type: "video",
      id: 1,
      videoUrl: "/lovable-uploads/9ca2307a-074c-4c7e-97bd-1fad9667b086.png",
      fighterName: "Alex Nguyen",
      handle: "@HammerAlex",
      elo: 1325,
      tier: "Silver",
      stats: { power: 68, defense: 54, accuracy: 72 },
      description: "Alex's top combo from yesterday's spar.",
      likes: 248,
      comments: 16,
      isLive: false
    },
    {
      type: "event",
      id: 2,
      eventId: "event_001",
      title: "Saturday Night Boxing Showdown",
      date: "2025-07-12",
      time: "19:00",
      location: "Dragon Fury MMA Arena",
      price: 25.00,
      tiers: ["General Admission", "VIP Ringside"],
      bannerImageUrl: "/lovable-uploads/42b99462-dada-44a5-ae2e-43358e217175.png"
    },
    {
      type: "video",
      id: 3,
      videoUrl: "/lovable-uploads/65228cf8-7a4e-404d-b553-a86f91873a66.png",
      fighterName: "Maria Lopez",
      handle: "@DragonMaria",
      elo: 1580,
      tier: "Gold",
      stats: { power: 82, defense: 61, accuracy: 78 },
      description: "Maria's defensive masterclass.",
      likes: 512,
      comments: 42,
      isLive: true
    },
    {
      type: "announcement",
      id: 4,
      text: "Coach Luis hosting a free boxing pad-work workshop on 2025-07-07. RSVP now!",
      datePosted: "2025-06-30"
    }
  ]);

  const [likedPosts, setLikedPosts] = useState(new Set());

  const handleLike = (postId: number) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Feed Header */}
      <div className="p-4 text-center border-b" style={{ borderColor: '#333333' }}>
        <h2 className="text-xl font-bold text-white">TRAINING FEED</h2>
        <p className="text-gray-400 text-sm">Discover fighters in your network</p>
      </div>

      {/* Feed Content */}
      <div className="space-y-1">
        {feedData.map((item) => {
          if (item.type === "video") {
            return (
              <div key={item.id} className="relative h-screen max-h-96 overflow-hidden">
                {/* Video Background */}
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.videoUrl})` }}
                >
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                  
                  {/* Top Overlays */}
                  <div className="absolute top-4 left-4 flex items-center space-x-3">
                    <Avatar className="w-12 h-12 border-2 border-white">
                      <AvatarFallback style={{ backgroundColor: '#E31837' }}>
                        {item.fighterName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Badge 
                        className="text-white text-xs"
                        style={{ backgroundColor: '#1E90FF' }}
                      >
                        {item.elo} | {item.tier}
                      </Badge>
                    </div>
                  </div>

                  {item.isLive && (
                    <div className="absolute top-4 right-4">
                      <Badge 
                        className="text-white text-xs animate-pulse"
                        style={{ backgroundColor: '#E31837' }}
                      >
                        🔴 LIVE
                      </Badge>
                    </div>
                  )}

                  {/* Right Side Actions */}
                  <div className="absolute right-4 bottom-20 flex flex-col space-y-4">
                    <button
                      onClick={() => handleLike(item.id)}
                      className="flex flex-col items-center"
                    >
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl"
                        style={{ backgroundColor: likedPosts.has(item.id) ? '#E31837' : 'rgba(255,255,255,0.2)' }}
                      >
                        ❤️
                      </div>
                      <span className="text-white text-xs mt-1">
                        {item.likes + (likedPosts.has(item.id) ? 1 : 0)}
                      </span>
                    </button>

                    <button className="flex flex-col items-center">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl"
                        style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                      >
                        💬
                      </div>
                      <span className="text-white text-xs mt-1">{item.comments}</span>
                    </button>

                    <button className="flex flex-col items-center">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl"
                        style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                      >
                        📤
                      </div>
                    </button>
                  </div>

                  {/* Bottom Info */}
                  <div className="absolute bottom-4 left-4 right-16">
                    <div className="text-white">
                      <p className="font-bold">{item.handle}</p>
                      <p className="text-sm">{item.description}</p>
                      
                      {/* AI Stats */}
                      <div className="flex space-x-4 mt-2">
                        <div className="text-xs">
                          <span style={{ color: '#1E90FF' }}>Power: {item.stats.power}</span>
                        </div>
                        <div className="text-xs">
                          <span style={{ color: '#1E90FF' }}>Defense: {item.stats.defense}</span>
                        </div>
                        <div className="text-xs">
                          <span style={{ color: '#1E90FF' }}>Accuracy: {item.stats.accuracy}</span>
                        </div>
                      </div>
                    </div>

                    {/* Request Spar Button */}
                    <Button 
                      className="mt-3 text-white font-bold"
                      style={{ backgroundColor: 'rgba(227, 24, 55, 0.8)' }}
                      size="sm"
                    >
                      REQUEST SPAR
                    </Button>
                  </div>
                </div>
              </div>
            );
          }

          if (item.type === "event") {
            return (
              <Card key={item.id} className="m-4" style={{ backgroundColor: '#181818', borderColor: '#333333' }}>
                <CardContent className="p-0">
                  {/* Event Banner */}
                  <div 
                    className="h-48 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${item.bannerImageUrl})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <Badge 
                        className="text-white"
                        style={{ backgroundColor: '#E31837' }}
                      >
                        ${item.price}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-lg font-bold">{item.title}</h3>
                      <p className="text-sm">{item.date} • {item.time}</p>
                      <p className="text-sm">{item.location}</p>
                    </div>
                  </div>
                  
                  {/* Event Actions */}
                  <div className="p-4">
                    <Button 
                      className="w-full text-white font-bold"
                      style={{ backgroundColor: '#1E90FF' }}
                    >
                      BUY TICKETS →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          }

          if (item.type === "announcement") {
            return (
              <Card key={item.id} className="m-4" style={{ backgroundColor: '#181818', borderColor: '#E31837' }}>
                <CardContent className="p-4">
                  <div className="flex">
                    <div 
                      className="w-1 mr-4 rounded"
                      style={{ backgroundColor: '#E31837' }}
                    ></div>
                    <div>
                      <p className="text-white">{item.text}</p>
                      <p className="text-gray-400 text-sm mt-2">{item.datePosted}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          }

          return null;
        })}
      </div>

      {/* End of Feed */}
      <div className="p-8 text-center">
        <p className="text-gray-400">You're all caught up! 🥊</p>
        <p className="text-gray-500 text-sm">Follow more fighters to see more content</p>
      </div>
    </div>
  );
};

export default HomeFeed;
