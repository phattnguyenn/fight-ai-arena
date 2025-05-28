
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const Notifications = () => {
  const [notifications] = useState([
    {
      id: 1,
      type: "follow",
      user: "king_ryan",
      displayName: "Ryan Garcia",
      avatar: "",
      message: "started following you",
      timestamp: "2 hours ago",
      isRead: false
    },
    {
      id: 2,
      type: "like",
      user: "tank_davis",
      displayName: "Gervonta Davis",
      avatar: "",
      message: "liked your training post",
      timestamp: "4 hours ago",
      isRead: false
    },
    {
      id: 3,
      type: "comment",
      user: "ufc_champion",
      displayName: "Alex Volkanovski",
      avatar: "",
      message: "commented on your sparring video",
      timestamp: "6 hours ago",
      isRead: true
    },
    {
      id: 4,
      type: "match_suggestion",
      user: "system",
      displayName: "FightClub AI",
      avatar: "",
      message: "Great sparring session! Upload your match video to AI Analyze and earn ELO points to level up your ranking!",
      timestamp: "1 day ago",
      isRead: false,
      isSystem: true
    },
    {
      id: 5,
      type: "challenge",
      user: "boxingbeast",
      displayName: "Jordan Smith",
      avatar: "",
      message: "accepted your sparring challenge for June 15th at Champions Gym",
      timestamp: "2 days ago",
      isRead: true
    },
    {
      id: 6,
      type: "subscribe",
      user: "mma_fan_01",
      displayName: "Alex Johnson",
      avatar: "",
      message: "subscribed to your content",
      timestamp: "3 days ago",
      isRead: true
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "follow":
        return "👤";
      case "like":
        return "❤️";
      case "comment":
        return "💬";
      case "match_suggestion":
        return "🎯";
      case "challenge":
        return "⚔️";
      case "subscribe":
        return "⭐";
      default:
        return "🔔";
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "follow":
        return "from-blue-600/20 to-orange-600/20 border-blue-500/30";
      case "like":
        return "from-red-600/20 to-orange-600/20 border-red-500/30";
      case "comment":
        return "from-green-600/20 to-blue-600/20 border-green-500/30";
      case "match_suggestion":
        return "from-orange-600/20 to-red-600/20 border-orange-500/30";
      case "challenge":
        return "from-red-600/20 to-blue-600/20 border-red-500/30";
      case "subscribe":
        return "from-blue-600/20 to-orange-600/20 border-blue-500/30";
      default:
        return "from-gray-600/20 to-gray-500/20 border-gray-500/30";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-black/50 backdrop-blur-sm border border-orange-500/20 rounded-3xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-orange-500/10 to-red-500/10">
          <CardTitle className="text-white text-2xl">Notifications</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`bg-gradient-to-r ${getNotificationColor(notification.type)} rounded-2xl p-4 border transition-all hover:scale-[1.02]`}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {notification.isSystem ? (
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-red-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl">{getNotificationIcon(notification.type)}</span>
                    </div>
                  ) : (
                    <Avatar className="w-12 h-12 ring-2 ring-orange-500/50">
                      <AvatarImage src={notification.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-orange-600 to-red-600 text-white">
                        {notification.displayName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-white font-semibold">{notification.displayName}</span>
                    <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                    {!notification.isRead && (
                      <Badge className="bg-red-500 text-white text-xs border-none">New</Badge>
                    )}
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{notification.message}</p>
                  <p className="text-gray-400 text-xs">{notification.timestamp}</p>
                </div>

                {notification.type === "match_suggestion" && (
                  <Button 
                    className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white rounded-xl text-sm px-4"
                  >
                    Upload Video
                  </Button>
                )}

                {notification.type === "challenge" && (
                  <Button 
                    className="bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700 text-white rounded-xl text-sm px-4"
                  >
                    View Details
                  </Button>
                )}
              </div>
            </div>
          ))}

          {notifications.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔔</div>
              <h3 className="text-white text-lg font-semibold mb-2">No notifications yet</h3>
              <p className="text-gray-400">When you get new notifications, they'll appear here</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;
