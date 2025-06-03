
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface EventsProps {
  userRole: "fighter" | "coach" | "fan";
}

const Events = ({ userRole }: EventsProps) => {
  const [events] = useState([
    {
      eventId: "event_002",
      title: "Wednesday Night Spar Drop-In",
      date: "2025-07-02",
      time: "18:00",
      location: "Dragon Fury MMA Gym",
      price: 0.00,
      isFree: true,
      spotsAvailable: 8,
      bannerImageUrl: "/lovable-uploads/f1d989db-e807-4024-ad17-9b38fff5cbdc.png"
    },
    {
      eventId: "event_003",
      title: "Pro MMA Fight Card: Titans Clash",
      date: "2025-07-10",
      time: "20:00",
      location: "HCMC Sports Arena",
      price: 35.00,
      isFree: false,
      tiers: [
        { name: "General Admission", price: 35.00 },
        { name: "VIP Ringside", price: 80.00 }
      ],
      bannerImageUrl: "/lovable-uploads/b7171366-886f-4888-a153-d6c1b9cd4ccf.png"
    },
    {
      eventId: "event_004",
      title: "Amateur Boxing Tournament—Qualifier",
      date: "2025-07-15",
      time: "17:00",
      location: "Saigon Sports Center",
      price: 10.00,
      isFree: false,
      tiers: [{ name: "General Admission", price: 10.00 }],
      bannerImageUrl: "/lovable-uploads/41a31d3f-456c-4402-ade9-9e11144526d8.png"
    }
  ]);

  const [showTicketModal, setShowTicketModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedTier, setSelectedTier] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleBuyTicket = (event) => {
    setSelectedEvent(event);
    setSelectedTier(event.tiers?.[0]?.name || "");
    setShowTicketModal(true);
  };

  const confirmPurchase = () => {
    setShowTicketModal(false);
    alert("Ticket purchased successfully! 🎫");
    setSelectedEvent(null);
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">FIGHT EVENTS</h2>
        <p className="text-gray-400">Discover and join fighting events near you</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="grid w-full grid-cols-2" style={{ backgroundColor: '#101010', borderColor: '#1E90FF' }}>
          <TabsTrigger 
            value="all" 
            className="text-white data-[state=active]:text-white"
            style={{ 'data-[state=active]:backgroundColor': '#E31837' }}
          >
            ALL EVENTS
          </TabsTrigger>
          <TabsTrigger 
            value="my" 
            className="text-white data-[state=active]:text-white"
            style={{ 'data-[state=active]:backgroundColor': '#1E90FF' }}
          >
            MY EVENTS
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <EventsList 
            events={events} 
            onBuyTicket={handleBuyTicket}
            userRole={userRole}
          />
        </TabsContent>

        <TabsContent value="my">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-white text-lg font-semibold mb-2">No Events Yet</h3>
            <p className="text-gray-400 mb-4">
              {userRole === "coach" ? "Create your first event" : "Join events to see them here"}
            </p>
            {userRole === "coach" && (
              <Button 
                className="text-white"
                style={{ backgroundColor: '#E31837' }}
              >
                CREATE EVENT
              </Button>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Ticket Purchase Modal */}
      {showTicketModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md" style={{ backgroundColor: '#181818', borderColor: '#E31837' }}>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-4">PURCHASE TICKETS</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-semibold">{selectedEvent.title}</h4>
                  <p className="text-gray-400 text-sm">{selectedEvent.date} • {selectedEvent.time}</p>
                  <p className="text-gray-400 text-sm">{selectedEvent.location}</p>
                </div>

                {selectedEvent.tiers && (
                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">Ticket Tier</label>
                    <select 
                      value={selectedTier}
                      onChange={(e) => setSelectedTier(e.target.value)}
                      className="w-full p-2 rounded text-white"
                      style={{ backgroundColor: '#101010', borderColor: '#1E90FF', border: '1px solid' }}
                    >
                      {selectedEvent.tiers.map((tier) => (
                        <option key={tier.name} value={tier.name}>
                          {tier.name} - ${tier.price}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Quantity</label>
                  <div className="flex items-center space-x-3">
                    <Button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      variant="outline"
                      size="sm"
                      className="w-8 h-8 p-0 text-white border-gray-600"
                    >
                      -
                    </Button>
                    <span className="text-white font-bold">{quantity}</span>
                    <Button
                      onClick={() => setQuantity(Math.min(4, quantity + 1))}
                      variant="outline"
                      size="sm"
                      className="w-8 h-8 p-0 text-white border-gray-600"
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div 
                  className="p-3 rounded"
                  style={{ backgroundColor: '#101010' }}
                >
                  <div className="flex justify-between text-white">
                    <span>Total:</span>
                    <span className="font-bold">
                      ${(selectedEvent.tiers?.find(t => t.name === selectedTier)?.price || selectedEvent.price) * quantity}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button
                    onClick={() => setShowTicketModal(false)}
                    variant="outline"
                    className="flex-1 text-gray-300 border-gray-600 hover:bg-gray-700"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={confirmPurchase}
                    className="flex-1 text-white"
                    style={{ backgroundColor: '#E31837' }}
                  >
                    Confirm & Pay
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

const EventsList = ({ events, onBuyTicket, userRole }) => {
  return (
    <div className="space-y-4">
      {events.map((event) => (
        <Card key={event.eventId} style={{ backgroundColor: '#181818', borderColor: '#333333' }}>
          <CardContent className="p-0">
            {/* Event Banner */}
            <div 
              className="h-48 bg-cover bg-center relative"
              style={{ backgroundImage: `url(${event.bannerImageUrl})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              
              {/* Price Badge */}
              <div className="absolute top-4 left-4">
                <Badge 
                  className="text-white"
                  style={{ backgroundColor: event.isFree ? '#1E90FF' : '#E31837' }}
                >
                  {event.isFree ? "FREE" : `$${event.price}`}
                </Badge>
              </div>

              {/* Event Info Overlay */}
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-bold mb-1">{event.title}</h3>
                <p className="text-sm opacity-90">{event.date} • {event.time}</p>
                <p className="text-sm opacity-75">{event.location}</p>
                {event.spotsAvailable && (
                  <p className="text-xs mt-1 opacity-75">{event.spotsAvailable} spots available</p>
                )}
              </div>
            </div>
            
            {/* Event Actions */}
            <div className="p-4">
              <div className="flex space-x-3">
                {event.isFree ? (
                  <Button 
                    className="flex-1 text-white"
                    style={{ backgroundColor: '#1E90FF' }}
                  >
                    JOIN EVENT
                  </Button>
                ) : (
                  <Button 
                    onClick={() => onBuyTicket(event)}
                    className="flex-1 text-white"
                    style={{ backgroundColor: '#E31837' }}
                  >
                    BUY TICKETS
                  </Button>
                )}
                
                <Button 
                  variant="outline"
                  size="sm"
                  className="text-white border-gray-600 hover:bg-gray-700"
                >
                  📤
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Events;
