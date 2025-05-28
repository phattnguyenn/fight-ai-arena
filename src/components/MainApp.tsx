
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import HomeFeed from "@/components/HomeFeed";
import ProfileSetup from "@/components/ProfileSetup";
import CreatePost from "@/components/CreatePost";
import MatchUpAndEvents from "@/components/MatchUpAndEvents";

const MainApp = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [userProfile, setUserProfile] = useState({
    username: "",
    displayName: "",
    bio: "",
    martialArts: [],
    avatar: "",
    rank: "Bronze I",
    eloPoints: 1200,
    posts: 0,
    followers: 0,
    following: 0
  });

  const [hasCompletedSetup, setHasCompletedSetup] = useState(false);

  if (!hasCompletedSetup) {
    return (
      <ProfileSetup 
        onComplete={(profile) => {
          setUserProfile(profile);
          setHasCompletedSetup(true);
        }} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header */}
      <header className="bg-gradient-to-r from-black via-orange-900/20 to-red-900/20 backdrop-blur-sm border-b border-orange-500/20 px-4 py-3 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-blue-500 bg-clip-text text-transparent">
            FIGHT<span className="text-white">CONNECT</span>
          </h1>
          <div className="flex items-center space-x-3">
            <Avatar className="w-8 h-8 ring-2 ring-orange-500/50">
              <AvatarImage src={userProfile.avatar} />
              <AvatarFallback className="bg-gradient-to-br from-orange-600 to-red-600 text-white">
                {userProfile.displayName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="text-white font-medium">{userProfile.displayName}</span>
            <Badge className="bg-gradient-to-r from-orange-600 to-red-600 text-white border-none">{userProfile.rank}</Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 bg-black/50 backdrop-blur-sm border border-orange-500/20 mb-6 rounded-2xl p-1">
            <TabsTrigger 
              value="home" 
              className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white rounded-xl transition-all"
            >
              🏠
            </TabsTrigger>
            <TabsTrigger 
              value="create" 
              className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white rounded-xl transition-all"
            >
              ➕
            </TabsTrigger>
            <TabsTrigger 
              value="analyze" 
              className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white rounded-xl transition-all"
            >
              🎯
            </TabsTrigger>
            <TabsTrigger 
              value="matchup" 
              className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white rounded-xl transition-all"
            >
              ⚔️
            </TabsTrigger>
            <TabsTrigger 
              value="profile" 
              className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white rounded-xl transition-all"
            >
              👤
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home">
            <HomeFeed />
          </TabsContent>

          <TabsContent value="create">
            <CreatePost />
          </TabsContent>

          <TabsContent value="analyze">
            <AIAnalyze />
          </TabsContent>

          <TabsContent value="matchup">
            <MatchUpAndEvents />
          </TabsContent>

          <TabsContent value="profile">
            <UserProfile profile={userProfile} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const AIAnalyze = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);

  const handleVideoUpload = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysisResults({
        explosiveness: 78,
        guardQuality: 85,
        overallScore: 81
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <Card className="bg-black/50 backdrop-blur-sm border border-orange-500/20 rounded-3xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-orange-500/10 to-red-500/10">
        <CardTitle className="text-white flex items-center gap-2 text-xl">
          🎯 AI Performance Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <p className="text-gray-300">Upload a training or sparring video to get AI-powered insights on your performance.</p>
        
        {!isAnalyzing && !analysisResults && (
          <div className="border-2 border-dashed border-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-12 text-center bg-gradient-to-br from-orange-500/5 to-red-500/5">
            <div className="text-6xl mb-6 animate-bounce">🎥</div>
            <p className="text-gray-400 mb-6 text-lg">Drop your video here or click to browse</p>
            <Button 
              onClick={handleVideoUpload} 
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-3 rounded-2xl text-lg font-semibold shadow-lg"
            >
              Upload Video
            </Button>
          </div>
        )}

        {isAnalyzing && (
          <div className="text-center py-12">
            <div className="animate-spin text-6xl mb-6">⚙️</div>
            <p className="text-white text-xl mb-2">Analyzing your technique...</p>
            <p className="text-gray-400">This may take a few moments</p>
          </div>
        )}

        {analysisResults && (
          <div className="space-y-6">
            <h3 className="text-white font-semibold text-xl">Analysis Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 rounded-2xl p-6 text-center border border-orange-500/30">
                <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">{analysisResults.explosiveness}</div>
                <div className="text-white font-semibold mt-2">Explosiveness</div>
                <div className="text-gray-400 text-sm">Power & Speed</div>
              </div>
              <div className="bg-gradient-to-br from-blue-600/20 to-orange-600/20 rounded-2xl p-6 text-center border border-blue-500/30">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">{analysisResults.guardQuality}</div>
                <div className="text-white font-semibold mt-2">Guard Quality</div>
                <div className="text-gray-400 text-sm">Defense</div>
              </div>
              <div className="bg-gradient-to-br from-red-600/20 to-blue-600/20 rounded-2xl p-6 text-center border border-red-500/30">
                <div className="text-3xl font-bold bg-gradient-to-r from-red-400 to-blue-400 bg-clip-text text-transparent">{analysisResults.overallScore}</div>
                <div className="text-white font-semibold mt-2">Overall Score</div>
                <div className="text-gray-400 text-sm">Combined Rating</div>
              </div>
            </div>
            <Button 
              onClick={() => setAnalysisResults(null)} 
              className="w-full bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 rounded-2xl py-3"
            >
              Analyze Another Video
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const UserProfile = ({ profile }) => {
  return (
    <div className="space-y-6">
      <Card className="bg-black/50 backdrop-blur-sm border border-orange-500/20 rounded-3xl overflow-hidden">
        <CardContent className="p-8">
          <div className="flex items-center space-x-6 mb-8">
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
            <div className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">{profile.eloPoints}</div>
            <div className="text-gray-400 mt-2">Current Rank: {profile.rank}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MainApp;
