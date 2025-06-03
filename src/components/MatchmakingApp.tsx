
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";

interface MatchmakingAppProps {
  isAuthenticated: boolean;
  onAuthRequired?: () => void;
}

const MatchmakingApp = ({ isAuthenticated, onAuthRequired }: MatchmakingAppProps) => {
  const [activeTab, setActiveTab] = useState("sparring");

  const fighters = [
    {
      id: 1,
      name: "MIKE JOHNSON",
      rank: "GOLD I",
      distance: "2.3 MI",
      style: "BOXING",
      avatar: "/lovable-uploads/ba675398-bfb1-409c-8318-bba2efd7bef8.png"
    },
    {
      id: 2,
      name: "ALEX CHEN",
      rank: "SILVER II",
      distance: "4.1 MI",
      style: "MMA",
      avatar: "/lovable-uploads/7f2979c2-84d3-4f21-8f48-dbc366d81a02.png"
    },
    {
      id: 3,
      name: "CARLOS LOPEZ",
      rank: "BRONZE III",
      distance: "6.8 MI",
      style: "KICKBOXING",
      avatar: "/lovable-uploads/f91a95e9-94db-4bbe-860a-982c5befc2cf.png"
    },
    {
      id: 4,
      name: "DAVID KIM",
      rank: "SILVER I",
      distance: "8.2 MI",
      style: "MUAY THAI",
      avatar: "/lovable-uploads/17fcef92-2d4e-4c81-bd3c-13fc6526e0b1.png"
    }
  ];

  const events = [
    {
      id: 1,
      title: "AMATEUR CHAMPIONSHIP",
      date: "2024-04-15",
      location: "MAIN ARENA",
      price: "$25",
      type: "AMATEUR",
      image: "/lovable-uploads/f1d989db-e807-4024-ad17-9b38fff5cbdc.png"
    },
    {
      id: 2,
      title: "PRO SERIES",
      date: "2024-04-22",
      location: "GRAND STADIUM",
      price: "$75",
      type: "PROFESSIONAL",
      image: "/lovable-uploads/b7171366-886f-4888-a153-d6c1b9cd4ccf.png"
    },
    {
      id: 3,
      title: "YOUTH BOXING SHOWCASE",
      date: "2024-04-29",
      location: "COMMUNITY CENTER",
      price: "$15",
      type: "YOUTH",
      image: "/lovable-uploads/41a31d3f-456c-4402-ade9-9e11144526d8.png"
    }
  ];

  const handleAction = (actionType: string) => {
    if (!isAuthenticated && onAuthRequired) {
      toast({
        title: "Sign Up Required",
        description: "Please create an account to access this feature",
        action: (
          <Button 
            onClick={onAuthRequired}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Sign Up
          </Button>
        ),
      });
      return;
    }
    toast({
      title: "Success",
      description: `${actionType} completed successfully`,
    });
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage: `url('/lovable-uploads/60d42b2f-2916-449c-a7e9-cc5ce66ae476.png')`,
        }}
      />

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-thin text-white mb-4 tracking-widest">MATCH UP</h1>
          <div className="w-16 h-0.5 bg-red-500 mx-auto"></div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 bg-black border border-blue-500 mb-8">
            <TabsTrigger 
              value="sparring" 
              className="text-white data-[state=active]:bg-red-500 data-[state=active]:text-white font-light"
            >
              SPARRING PARTNERS
            </TabsTrigger>
            <TabsTrigger 
              value="events" 
              className="text-white data-[state=active]:bg-blue-500 data-[state=active]:text-white font-light"
            >
              EVENTS
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sparring">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {fighters.map((fighter) => (
                <Card key={fighter.id} className="bg-black border border-blue-500 hover:border-red-500 transition-all">
                  <CardContent className="p-6 text-center">
                    <Avatar className="w-20 h-20 mx-auto mb-4 border border-blue-500">
                      <AvatarImage src={fighter.avatar} />
                      <AvatarFallback className="bg-black text-white">
                        {fighter.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <h3 className="text-white font-light mb-2">{fighter.name}</h3>
                    <Badge className="bg-red-500 text-white mb-2">{fighter.rank}</Badge>
                    <p className="text-white/70 text-sm mb-1">{fighter.distance}</p>
                    <p className="text-blue-500 text-sm mb-4">{fighter.style}</p>
                    
                    <Button
                      onClick={() => handleAction("Match request")}
                      className="w-full bg-red-500 hover:bg-red-600 text-white font-light"
                    >
                      REQUEST
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="events">
            <div className="grid md:grid-cols-3 gap-8">
              {events.map((event) => (
                <Card key={event.id} className="bg-black border border-blue-500 hover:border-red-500 transition-all overflow-hidden">
                  <div 
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${event.image})` }}
                  />
                  <CardContent className="p-6">
                    <Badge className="bg-blue-500 text-white mb-3">{event.type}</Badge>
                    <h3 className="text-white font-light text-lg mb-2">{event.title}</h3>
                    <p className="text-white/70 text-sm mb-1">{event.date}</p>
                    <p className="text-white/70 text-sm mb-4">{event.location}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-red-500 font-light text-lg">{event.price}</span>
                      <Button
                        onClick={() => handleAction("Ticket purchase")}
                        className="bg-red-500 hover:bg-red-600 text-white font-light"
                      >
                        BUY TICKET
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MatchmakingApp;
