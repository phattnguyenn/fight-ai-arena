
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const UserProfile = ({ profile, onLogout }) => {
  const [activeContentTab, setActiveContentTab] = useState("posts");

  const mockPosts = [
    {
      id: 1,
      type: "image",
      content: profile.profileImages?.[0] || "",
      caption: "Another day of intense training! 💪 Working on my combinations and footwork.",
      likes: 245,
      comments: 18,
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      type: "image", 
      content: profile.profileImages?.[1] || "",
      caption: "Sparring session was fire today! 🔥 Great work with my training partner.",
      likes: 189,
      comments: 12,
      timestamp: "1 day ago"
    },
    {
      id: 3,
      type: "image",
      content: profile.profileImages?.[2] || "",
      caption: "MMA training never stops! Always pushing the limits 🥊",
      likes: 312,
      comments: 24,
      timestamp: "3 days ago"
    }
  ];

  const mockSparringVideos = [
    {
      id: 1,
      title: "Advanced Boxing Techniques",
      thumbnail: profile.profileImages?.[3] || "",
      duration: "12:45",
      views: 1250,
      isExclusive: true,
      timestamp: "1 week ago"
    },
    {
      id: 2,
      title: "MMA Cage Training Session",
      thumbnail: profile.profileImages?.[4] || "",
      duration: "18:30",
      views: 890,
      isExclusive: true,
      timestamp: "2 weeks ago"
    },
    {
      id: 3,
      title: "Strength & Conditioning Workout",
      thumbnail: profile.profileImages?.[5] || "",
      duration: "25:15",
      views: 2100,
      isExclusive: true,
      timestamp: "3 weeks ago"
    }
  ];

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
                <div className="flex items-center space-x-3 mt-3">
                  <Badge className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-1 text-sm">{profile.rank}</Badge>
                  {profile.isCreator && (
                    <Badge className="bg-gradient-to-r from-blue-600 to-orange-600 text-white px-4 py-1 text-sm">⭐ Creator</Badge>
                  )}
                </div>
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

          <div className="grid grid-cols-4 gap-6 mb-8">
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
            {profile.isCreator && (
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{profile.subscribers}</div>
                <div className="text-gray-400">Subscribers</div>
              </div>
            )}
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

          <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 rounded-2xl p-6 border border-orange-500/30 mb-8">
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

          {/* Content Tabs for Creator */}
          {profile.isCreator && (
            <div>
              <h3 className="text-white font-semibold mb-4 text-xl">Content</h3>
              <Tabs value={activeContentTab} onValueChange={setActiveContentTab}>
                <TabsList className="grid w-full grid-cols-2 bg-gray-900/50 rounded-2xl p-1 mb-6">
                  <TabsTrigger 
                    value="posts" 
                    className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white rounded-xl"
                  >
                    Posts
                  </TabsTrigger>
                  <TabsTrigger 
                    value="sparring" 
                    className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-orange-500 data-[state=active]:text-white rounded-xl"
                  >
                    Sparring Videos
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="posts" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mockPosts.map((post) => (
                      <Card key={post.id} className="bg-gray-900/30 border border-orange-500/20 rounded-2xl overflow-hidden">
                        <div className="aspect-square">
                          <img
                            src={post.content}
                            alt="Post content"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <p className="text-gray-300 text-sm mb-2">{post.caption}</p>
                          <div className="flex items-center justify-between text-xs text-gray-400">
                            <span>❤️ {post.likes}</span>
                            <span>💬 {post.comments}</span>
                            <span>{post.timestamp}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="sparring" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mockSparringVideos.map((video) => (
                      <Card key={video.id} className="bg-gray-900/30 border border-blue-500/20 rounded-2xl overflow-hidden">
                        <div className="relative aspect-video">
                          <img
                            src={video.thumbnail}
                            alt="Video thumbnail"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <div className="text-white text-4xl">▶️</div>
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                            {video.duration}
                          </div>
                          {video.isExclusive && (
                            <Badge className="absolute top-2 left-2 bg-gradient-to-r from-blue-600 to-orange-600 text-white text-xs border-none">
                              🔒 Members Only
                            </Badge>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <h4 className="text-white font-medium mb-2">{video.title}</h4>
                          <div className="flex items-center justify-between text-xs text-gray-400">
                            <span>👀 {video.views} views</span>
                            <span>{video.timestamp}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
