
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const HomeFeed = () => {
  const [posts] = useState([
    {
      id: 1,
      user: {
        username: "boxingpro23",
        displayName: "Mike Chen",
        avatar: "",
        rank: "Gold II",
        isCreator: true,
        subscriptionPrice: 9.99
      },
      content: {
        type: "video",
        caption: "Working on my jab-cross combination. The AI analysis helped me improve my guard recovery time by 15%! 🥊",
        timestamp: "2 hours ago",
        likes: 24,
        isExclusive: true,
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
        rank: "Silver III",
        isCreator: false
      },
      content: {
        type: "photo",
        caption: "Training session complete! 💪 Heavy bag work focusing on technique over power today.",
        timestamp: "4 hours ago",
        likes: 31,
        isExclusive: false
      }
    },
    {
      id: 3,
      user: {
        username: "bjj_master",
        displayName: "Alex Thompson",
        avatar: "",
        rank: "Platinum I",
        isCreator: true,
        subscriptionPrice: 9.99
      },
      content: {
        type: "video",
        caption: "Drilling some guard passes. Looking for sparring partners in LA area for BJJ! 🔥",
        timestamp: "6 hours ago",
        likes: 45,
        isExclusive: false,
        aiScores: {
          explosiveness: 71,
          guardQuality: 89
        }
      }
    }
  ]);

  const [likedPosts, setLikedPosts] = useState(new Set());
  const [subscribedUsers, setSubscribedUsers] = useState(new Set());
  const [showTipModal, setShowTipModal] = useState(false);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [tipAmount, setTipAmount] = useState("");

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

  const handleSubscribe = (username: string) => {
    setSubscribedUsers(prev => new Set([...prev, username]));
    setShowSubscribeModal(false);
    alert("Subscription successful! 🎉 You can now view exclusive content from this creator.");
  };

  const handleTip = () => {
    if (tipAmount && selectedUser) {
      alert(`Tip of $${tipAmount} sent to ${selectedUser.displayName}! 💰`);
      setShowTipModal(false);
      setTipAmount("");
      setSelectedUser(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Training Feed</h2>
        <p className="text-gray-400">See what fighters in your network are up to</p>
      </div>

      {posts.map((post) => (
        <Card key={post.id} className="bg-black/50 backdrop-blur-sm border border-orange-500/20 rounded-3xl overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="w-12 h-12 ring-2 ring-orange-500/50">
                  <AvatarImage src={post.user.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-orange-600 to-red-600 text-white">
                    {post.user.displayName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-semibold">{post.user.displayName}</span>
                    <Badge className="bg-gradient-to-r from-orange-600 to-red-600 text-white text-xs border-none">{post.user.rank}</Badge>
                    {post.user.isCreator && (
                      <Badge className="bg-gradient-to-r from-blue-600 to-orange-600 text-white text-xs border-none">◆ Creator</Badge>
                    )}
                  </div>
                  <span className="text-gray-400 text-sm">@{post.user.username}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-400 text-sm">{post.content.timestamp}</span>
                {post.user.isCreator && (
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => {
                        setSelectedUser(post.user);
                        setShowSubscribeModal(true);
                      }}
                      className="bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700 text-white rounded-xl text-xs px-3"
                      disabled={subscribedUsers.has(post.user.username)}
                    >
                      {subscribedUsers.has(post.user.username) ? "◇ Subscribed" : "◆ Subscribe"}
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        setSelectedUser(post.user);
                        setShowTipModal(true);
                      }}
                      className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-xl text-xs px-3"
                    >
                      ◈ Tip
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            {/* Content area with exclusive content check */}
            <div className="mb-4">
              {post.content.isExclusive && !subscribedUsers.has(post.user.username) ? (
                <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 rounded-2xl h-64 flex items-center justify-center mb-3 border border-orange-500/30">
                  <div className="text-center text-orange-400">
                    <div className="text-4xl mb-2">🔒</div>
                    <div className="font-semibold">Exclusive Content</div>
                    <div className="text-sm text-gray-300 mt-2">Subscribe to {post.user.displayName} to view this content</div>
                    <Button
                      onClick={() => {
                        setSelectedUser(post.user);
                        setShowSubscribeModal(true);
                      }}
                      className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white rounded-xl mt-3 text-sm"
                    >
                      Subscribe for ${post.user.subscriptionPrice}/month
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  {post.content.type === "video" ? (
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl h-64 flex items-center justify-center mb-3 border border-orange-500/20">
                      <div className="text-center text-gray-400">
                        <div className="text-4xl mb-2">▶</div>
                        <div>Training Video</div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl h-64 flex items-center justify-center mb-3 border border-orange-500/20">
                      <div className="text-center text-gray-400">
                        <div className="text-4xl mb-2">◦</div>
                        <div>Training Photo</div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            <p className="text-gray-300 mb-4">{post.content.caption}</p>

            {/* AI Scores */}
            {post.content.aiScores && (
              <div className="bg-gradient-to-br from-orange-600/10 to-red-600/10 rounded-2xl p-4 mb-4 border border-orange-500/20">
                <div className="text-white text-sm font-semibold mb-3 flex items-center">
                  <span className="mr-2">●</span> AI Analysis
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-orange-400 font-bold text-lg">{post.content.aiScores.explosiveness}</div>
                    <div className="text-gray-400 text-xs">Explosiveness</div>
                  </div>
                  <div className="text-center">
                    <div className="text-orange-400 font-bold text-lg">{post.content.aiScores.guardQuality}</div>
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
                  {likedPosts.has(post.id) ? '♥' : '♡'} {post.content.likes + (likedPosts.has(post.id) ? 1 : 0)}
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  ◐ Comment
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  ◑ Share
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Subscription Modal */}
      {showSubscribeModal && selectedUser && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <Card className="bg-gray-900 border border-orange-500/30 rounded-3xl p-6 max-w-md w-full mx-4">
            <CardContent className="p-0">
              <div className="text-center mb-6">
                <h3 className="text-white text-xl font-bold mb-2">Subscribe to {selectedUser.displayName}</h3>
                <p className="text-gray-400 text-sm">Get access to exclusive training content and insights</p>
              </div>
              
              <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 rounded-2xl p-4 mb-6 border border-orange-500/30">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">${selectedUser.subscriptionPrice}</div>
                  <div className="text-gray-300 text-sm">per month</div>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  onClick={() => setShowSubscribeModal(false)}
                  variant="outline"
                  className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700 rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handleSubscribe(selectedUser.username)}
                  className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white rounded-xl"
                >
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tip Modal */}
      {showTipModal && selectedUser && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <Card className="bg-gray-900 border border-green-500/30 rounded-3xl p-6 max-w-md w-full mx-4">
            <CardContent className="p-0">
              <div className="text-center mb-6">
                <h3 className="text-white text-xl font-bold mb-2">Send Tip to {selectedUser.displayName}</h3>
                <p className="text-gray-400 text-sm">Show your appreciation for their content</p>
              </div>
              
              <div className="mb-6">
                <label className="text-white text-sm font-medium mb-2 block">Tip Amount ($1 - $500)</label>
                <Input
                  type="number"
                  min="1"
                  max="500"
                  value={tipAmount}
                  onChange={(e) => setTipAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="bg-gray-800 border-green-500/30 text-white rounded-xl"
                />
              </div>

              <div className="flex space-x-3">
                <Button
                  onClick={() => {
                    setShowTipModal(false);
                    setTipAmount("");
                  }}
                  variant="outline"
                  className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700 rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleTip}
                  disabled={!tipAmount || Number(tipAmount) < 1 || Number(tipAmount) > 500}
                  className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-xl"
                >
                  Send Tip
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="text-center py-8">
        <p className="text-gray-400">You're all caught up! 🥊</p>
        <p className="text-gray-500 text-sm">Follow more fighters to see more content</p>
      </div>
    </div>
  );
};

export default HomeFeed;
