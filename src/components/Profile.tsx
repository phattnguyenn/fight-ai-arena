
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ProfileProps {
  userRole: "fighter" | "coach" | "fan";
  onLogout: () => void;
}

const Profile = ({ userRole, onLogout }: ProfileProps) => {
  const [userData] = useState({
    fighter: {
      fullName: "Alex Nguyen",
      nickname: "The Hammer",
      avatarUrl: "/lovable-uploads/70f89bc1-fad9-4a7c-9373-6275256cd8b8.png",
      elo: 1340,
      tier: "Gold",
      weightClass: "145 lbs",
      discipline: "MMA",
      stats: { power: 68, defense: 54, accuracy: 72 },
      record: "18 W – 5 L",
      profileImages: [
        "/lovable-uploads/449a86e6-a6a3-4ead-aa65-72378005773c.png",
        "/lovable-uploads/f0ea7ce1-8701-4f54-be86-df087cb69b67.png",
        "/lovable-uploads/c96b90b9-9167-42be-965e-b40348944f1c.png"
      ]
    },
    coach: {
      fullName: "Maria Santos",
      gymName: "Dragon Fury MMA",
      address: "123 Fight St, Ho Chi Minh City",
      disciplines: ["MMA", "Muay Thai", "BJJ"],
      avatarUrl: "/lovable-uploads/ae9b405c-35e9-4c78-b66e-48359e3748d7.png",
      verified: true,
      activeFighters: 45,
      eventsHosted: 12
    },
    fan: {
      fullName: "Jordan Lee",
      avatarUrl: "/lovable-uploads/617d9ba0-8592-426a-b3e5-2958df7d67b0.png",
      interests: ["Boxing", "MMA"],
      followedFighters: 24,
      eventsAttended: 8
    }
  });

  const currentUser = userData[userRole];

  const [sparInvites] = useState([
    {
      inviteId: "invite_001",
      fromFighter: "Linh Tran",
      elo: 1580,
      tier: "Gold",
      message: "Hey Alex, want to spar tomorrow at 6 PM?",
      sentAt: "2 hrs ago",
      avatarUrl: "/lovable-uploads/7f2979c2-84d3-4f21-8f48-dbc366d81a02.png"
    }
  ]);

  if (userRole === "fighter") {
    const fighterUser = userData.fighter;
    return (
      <div className="p-4 space-y-6">
        {/* Profile Header */}
        <div className="relative">
          {/* Cover Image */}
          <div 
            className="h-32 rounded-t-lg bg-gradient-to-r"
            style={{ background: 'linear-gradient(135deg, #E31837, #1E90FF)' }}
          ></div>
          
          {/* Profile Info */}
          <div className="relative px-6 pb-6" style={{ backgroundColor: '#181818', marginTop: '-16px', borderRadius: '0 0 12px 12px' }}>
            <div className="flex items-end space-x-4">
              <Avatar className="w-24 h-24 border-4 border-white -mt-12">
                <AvatarImage src={fighterUser.avatarUrl} />
                <AvatarFallback style={{ backgroundColor: '#E31837' }}>
                  {fighterUser.fullName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 pt-4">
                <h1 className="text-2xl font-bold text-white">{fighterUser.fullName}</h1>
                <p className="text-gray-400">"{fighterUser.nickname}"</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge 
                    className="text-white"
                    style={{ backgroundColor: '#1E90FF' }}
                  >
                    {fighterUser.elo} | {fighterUser.tier}
                  </Badge>
                  <span className="text-gray-400 text-sm">{fighterUser.weightClass}</span>
                  <span className="text-gray-400 text-sm">• {fighterUser.discipline}</span>
                </div>
              </div>
              
              <div className="pt-4">
                <Button 
                  variant="outline"
                  size="sm"
                  className="text-white border-blue-500 hover:bg-blue-500"
                >
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <Card style={{ backgroundColor: '#181818', borderColor: '#333333' }}>
          <CardHeader>
            <CardTitle className="text-white">Performance Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-6 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: '#E31837' }}>{fighterUser.stats.power}</div>
                <div className="text-gray-400 text-sm">Power</div>
                <div className="text-green-400 text-xs">↑ +3</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: '#1E90FF' }}>{fighterUser.stats.defense}</div>
                <div className="text-gray-400 text-sm">Defense</div>
                <div className="text-gray-400 text-xs">± 0</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: '#E31837' }}>{fighterUser.stats.accuracy}%</div>
                <div className="text-gray-400 text-sm">Accuracy</div>
                <div className="text-green-400 text-xs">↑ +2%</div>
              </div>
            </div>
            
            <div className="text-center pt-4 border-t border-gray-700">
              <div className="text-white font-semibold">Fight Record</div>
              <div className="text-gray-400">{fighterUser.record}</div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Sessions */}
        <Card style={{ backgroundColor: '#181818', borderColor: '#333333' }}>
          <CardHeader>
            <CardTitle className="text-white">Recent Training</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              {fighterUser.profileImages.map((image, index) => (
                <div 
                  key={index}
                  className="aspect-square rounded-lg bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${image})` }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center">
                    <span className="text-white text-2xl">▶</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Spar Invitations */}
        {sparInvites.length > 0 && (
          <Card style={{ backgroundColor: '#181818', borderColor: '#E31837' }}>
            <CardHeader>
              <CardTitle className="text-white">Spar Invitations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {sparInvites.map((invite) => (
                <div key={invite.inviteId} className="flex items-center space-x-3 p-3 rounded" style={{ backgroundColor: '#101010' }}>
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={invite.avatarUrl} />
                    <AvatarFallback style={{ backgroundColor: '#1E90FF' }}>
                      {invite.fromFighter.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <p className="text-white font-semibold">{invite.fromFighter}</p>
                    <p className="text-gray-400 text-sm">{invite.message}</p>
                    <p className="text-gray-500 text-xs">{invite.sentAt}</p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      size="sm"
                      className="text-white"
                      style={{ backgroundColor: '#E31837' }}
                    >
                      Accept
                    </Button>
                    <Button 
                      size="sm"
                      variant="outline"
                      className="text-gray-300 border-gray-600"
                    >
                      Decline
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Settings */}
        <SettingsSection onLogout={onLogout} />
      </div>
    );
  }

  // Coach Profile
  if (userRole === "coach") {
    const coachUser = userData.coach;
    return (
      <div className="p-4 space-y-6">
        {/* Gym Header */}
        <Card style={{ backgroundColor: '#181818', borderColor: '#333333' }}>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={coachUser.avatarUrl} />
                <AvatarFallback style={{ backgroundColor: '#E31837' }}>
                  {coachUser.gymName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-bold text-white">{coachUser.gymName}</h1>
                  {coachUser.verified && (
                    <Badge 
                      className="text-white"
                      style={{ backgroundColor: '#1E90FF' }}
                    >
                      ✓ Verified
                    </Badge>
                  )}
                </div>
                <p className="text-gray-400">{coachUser.address}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {coachUser.disciplines.map((discipline) => (
                    <Badge key={discipline} variant="outline" className="border-gray-600 text-gray-300">
                      {discipline}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline"
                  size="sm"
                  className="text-white border-blue-500 hover:bg-blue-500"
                >
                  Edit Gym
                </Button>
                <Button 
                  size="sm"
                  className="text-white"
                  style={{ backgroundColor: '#E31837' }}
                >
                  Create Event
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gym Insights */}
        <Card style={{ backgroundColor: '#181818', borderColor: '#333333' }}>
          <CardHeader>
            <CardTitle className="text-white">Gym Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{coachUser.activeFighters}</div>
                <div className="text-gray-400 text-sm">Active Fighters</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{coachUser.eventsHosted}</div>
                <div className="text-gray-400 text-sm">Events Hosted</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: '#1E90FF' }}>+20</div>
                <div className="text-gray-400 text-sm">Avg ELO Gain/Month</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <SettingsSection onLogout={onLogout} />
      </div>
    );
  }

  // Fan Profile
  const fanUser = userData.fan;
  return (
    <div className="p-4 space-y-6">
      {/* Fan Header */}
      <Card style={{ backgroundColor: '#181818', borderColor: '#333333' }}>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={fanUser.avatarUrl} />
              <AvatarFallback style={{ backgroundColor: '#E31837' }}>
                {fanUser.fullName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white">{fanUser.fullName}</h1>
              <p className="text-gray-400">Fight Fan</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {fanUser.interests.map((interest) => (
                  <Badge key={interest} variant="outline" className="border-gray-600 text-gray-300">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fan Stats */}
      <Card style={{ backgroundColor: '#181818', borderColor: '#333333' }}>
        <CardHeader>
          <CardTitle className="text-white">Fan Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{fanUser.followedFighters}</div>
              <div className="text-gray-400 text-sm">Followed Fighters</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{fanUser.eventsAttended}</div>
              <div className="text-gray-400 text-sm">Events Attended</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <SettingsSection onLogout={onLogout} />
    </div>
  );
};

const SettingsSection = ({ onLogout }) => {
  return (
    <Card style={{ backgroundColor: '#181818', borderColor: '#333333' }}>
      <CardHeader>
        <CardTitle className="text-white">Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {[
          { label: "Account Settings", icon: "⚙️" },
          { label: "Payment Methods", icon: "💳" },
          { label: "Notifications", icon: "🔔" },
          { label: "Help & Support", icon: "❓" },
        ].map((item) => (
          <button
            key={item.label}
            className="w-full flex items-center space-x-3 p-3 rounded hover:bg-gray-700 transition-colors"
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-white">{item.label}</span>
            <span className="ml-auto text-gray-400">→</span>
          </button>
        ))}
        
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 p-3 rounded hover:bg-red-600 transition-colors"
        >
          <span className="text-xl">🚪</span>
          <span className="text-white">Logout</span>
        </button>
      </CardContent>
    </Card>
  );
};

export default Profile;
