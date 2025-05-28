
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const HomeFeed = () => {
  const [posts] = useState([
    {
      id: 1,
      user: {
        username: "boxingpro23",
        displayName: "Mike Chen",
        avatar: "",
        rank: "Gold II"
      },
      content: {
        type: "video",
        caption: "Working on my jab-cross combination. The AI analysis helped me improve my guard recovery time by 15%! 🥊",
        timestamp: "2 hours ago",
        likes: 24,
        aiScores: {
          explosiveness: 82,
          guardQuality: 78
        }
      }
    },
    {
      id: 2,
      user: {
        username: "muaythai_sarah",
        displayName: "Sarah Rodriguez",
        avatar: "",
        rank: "Silver III"
      },
      content: {
        type: "photo",
        caption: "Training session complete! 💪 Heavy bag work focusing on technique over power today.",
        timestamp: "4 hours ago",
        likes: 31
      }
    },
    {
      id: 3,
      user: {
        username: "bjj_master",
        displayName: "Alex Thompson",
        avatar: "",
        rank: "Platinum I"
      },
      content: {
        type: "video",
        caption: "Drilling some guard passes. Looking for sparring partners in LA area for BJJ! 🔥",
        timestamp: "6 hours ago",
        likes: 45,
        aiScores: {
          explosiveness: 71,
          guardQuality: 89
        }
      }
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
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Training Feed</h2>
        <p className="text-gray-400">See what fighters in your network are up to</p>
      </div>

      {posts.map((post) => (
        <Card key={post.id} className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={post.user.avatar} />
                  <AvatarFallback className="bg-orange-600 text-white">
                    {post.user.displayName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-semibold">{post.user.displayName}</span>
                    <Badge className="bg-orange-600 text-white text-xs">{post.user.rank}</Badge>
                  </div>
                  <span className="text-gray-400 text-sm">@{post.user.username}</span>
                </div>
              </div>
              <span className="text-gray-400 text-sm">{post.content.timestamp}</span>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            {/* Mock content area */}
            <div className="mb-4">
              {post.content.type === "video" ? (
                <div className="bg-gray-700 rounded-lg h-64 flex items-center justify-center mb-3">
                  <div className="text-center text-gray-400">
                    <div className="text-4xl mb-2">📹</div>
                    <div>Training Video</div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-700 rounded-lg h-64 flex items-center justify-center mb-3">
                  <div className="text-center text-gray-400">
                    <div className="text-4xl mb-2">📸</div>
                    <div>Training Photo</div>
                  </div>
                </div>
              )}
            </div>

            <p className="text-gray-300 mb-4">{post.content.caption}</p>

            {/* AI Scores */}
            {post.content.aiScores && (
              <div className="bg-gray-700 rounded-lg p-3 mb-4">
                <div className="text-white text-sm font-semibold mb-2">🤖 AI Analysis</div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center">
                    <div className="text-orange-500 font-bold">{post.content.aiScores.explosiveness}</div>
                    <div className="text-gray-400 text-xs">Explosiveness</div>
                  </div>
                  <div className="text-center">
                    <div className="text-orange-500 font-bold">{post.content.aiScores.guardQuality}</div>
                    <div className="text-gray-400 text-xs">Guard Quality</div>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLike(post.id)}
                  className={`text-gray-400 hover:text-white ${
                    likedPosts.has(post.id) ? 'text-red-500' : ''
                  }`}
                >
                  {likedPosts.has(post.id) ? '❤️' : '🤍'} {post.content.likes + (likedPosts.has(post.id) ? 1 : 0)}
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  💬 Comment
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  🔄 Share
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="text-center py-8">
        <p className="text-gray-400">You're all caught up! 🥊</p>
        <p className="text-gray-500 text-sm">Follow more fighters to see more content</p>
      </div>
    </div>
  );
};

export default HomeFeed;
