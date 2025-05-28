
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const UserProfile = ({ profile, onLogout }) => {
  return (
    <div className="space-y-6">
      <Card className="bg-black/50 backdrop-blur-sm border border-orange-500/20 rounded-3xl overflow-hidden">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-6">
              <Avatar className="w-24 h-24 ring-4 ring-gradient-to-r from-orange-500 to-red-500">
                <AvatarImage src={profile.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-orange-600 to-red-600 text-white text-3xl">
                  {profile.displayName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-white mb-1">{profile.displayName}</h2>
                <p className="text-gray-400 text-lg">@{profile.username}</p>
                <Badge className="bg-gradient-to-r from-orange-600 to-red-600 text-white mt-3 px-4 py-1 text-sm">{profile.rank}</Badge>
              </div>
            </div>
            <Button 
              onClick={onLogout}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl px-6"
            >
              Logout
            </Button>
          </div>

          <p className="text-gray-300 mb-8 text-lg">{profile.bio}</p>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{profile.posts}</div>
              <div className="text-gray-400">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{profile.followers}</div>
              <div className="text-gray-400">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{profile.following}</div>
              <div className="text-gray-400">Following</div>
            </div>
          </div>

          {/* Fighting Stats */}
          <div className="mb-8">
            <h3 className="text-white font-semibold mb-4 text-xl">Fighting Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-green-600/20 to-blue-600/20 rounded-2xl p-4 text-center border border-green-500/30">
                <div className="text-2xl font-bold text-green-400">{profile.wins}</div>
                <div className="text-gray-300 text-sm">Wins</div>
              </div>
              <div className="bg-gradient-to-br from-red-600/20 to-orange-600/20 rounded-2xl p-4 text-center border border-red-500/30">
                <div className="text-2xl font-bold text-red-400">{profile.losses}</div>
                <div className="text-gray-300 text-sm">Losses</div>
              </div>
              <div className="bg-gradient-to-br from-gray-600/20 to-gray-500/20 rounded-2xl p-4 text-center border border-gray-500/30">
                <div className="text-2xl font-bold text-gray-400">{profile.draws}</div>
                <div className="text-gray-300 text-sm">Draws</div>
              </div>
              <div className="bg-gradient-to-br from-blue-600/20 to-orange-600/20 rounded-2xl p-4 text-center border border-blue-500/30">
                <div className="text-2xl font-bold text-blue-400">{profile.winRate}%</div>
                <div className="text-gray-300 text-sm">Win Rate</div>
              </div>
            </div>
          </div>

          {/* Match History */}
          <div className="mb-8">
            <h3 className="text-white font-semibold mb-4 text-xl">Match History</h3>
            <div className="space-y-4">
              {profile.matchHistory?.map((match) => (
                <div key={match.id} className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-2xl p-4 border border-gray-700/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${
                        match.result === 'Win' ? 'bg-green-500' : 
                        match.result === 'Loss' ? 'bg-red-500' : 'bg-gray-500'
                      }`}></div>
                      <div>
                        <p className="text-white font-medium">vs {match.opponent}</p>
                        <p className="text-gray-400 text-sm">{match.event}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${
                        match.result === 'Win' ? 'text-green-400' : 
                        match.result === 'Loss' ? 'text-red-400' : 'text-gray-400'
                      }`}>
                        {match.result}
                      </p>
                      <p className="text-gray-400 text-sm">{match.method} R{match.round}</p>
                      <p className="text-gray-500 text-xs">{match.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-white font-semibold mb-4 text-xl">Martial Arts</h3>
            <div className="flex flex-wrap gap-3">
              {profile.martialArts.map((art, index) => (
                <Badge key={index} variant="outline" className="border-orange-500 text-orange-400 bg-orange-500/10 px-4 py-2 rounded-full">
                  {art}
                </Badge>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 rounded-2xl p-6 border border-orange-500/30">
            <h3 className="text-white font-semibold mb-3 text-xl">ELO Rating</h3>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">{profile.eloPoints}</div>
                <div className="text-gray-400 mt-2">Current Rank: {profile.rank}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{profile.avgPerformance}</div>
                <div className="text-gray-400 text-sm">Avg Performance</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
