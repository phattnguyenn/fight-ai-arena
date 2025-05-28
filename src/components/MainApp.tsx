
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import HomeFeed from "@/components/HomeFeed";
import ProfileSetup from "@/components/ProfileSetup";
import CreatePost from "@/components/CreatePost";
import FindSparringPartners from "@/components/FindSparringPartners";

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
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">
            FIGHT<span className="text-orange-500">CONNECT</span>
          </h1>
          <div className="flex items-center space-x-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={userProfile.avatar} />
              <AvatarFallback className="bg-orange-600 text-white">
                {userProfile.displayName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="text-white font-medium">{userProfile.displayName}</span>
            <Badge className="bg-orange-600 text-white">{userProfile.rank}</Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 bg-gray-800 mb-6">
            <TabsTrigger value="home" className="text-white data-[state=active]:bg-orange-600">
              🏠 Home
            </TabsTrigger>
            <TabsTrigger value="create" className="text-white data-[state=active]:bg-orange-600">
              ➕ Post
            </TabsTrigger>
            <TabsTrigger value="analyze" className="text-white data-[state=active]:bg-orange-600">
              🤖 AI Analyze
            </TabsTrigger>
            <TabsTrigger value="sparring" className="text-white data-[state=active]:bg-orange-600">
              ⚔️ Sparring
            </TabsTrigger>
            <TabsTrigger value="profile" className="text-white data-[state=active]:bg-orange-600">
              👤 Profile
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

          <TabsContent value="sparring">
            <FindSparringPartners />
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
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          🤖 AI Performance Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-300">Upload a training or sparring video to get AI-powered insights on your performance.</p>
        
        {!isAnalyzing && !analysisResults && (
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
            <div className="text-gray-400 mb-4">📹</div>
            <p className="text-gray-400 mb-4">Drop your video here or click to browse</p>
            <Button onClick={handleVideoUpload} className="bg-orange-600 hover:bg-orange-700">
              Upload Video
            </Button>
          </div>
        )}

        {isAnalyzing && (
          <div className="text-center py-8">
            <div className="animate-spin text-4xl mb-4">⚙️</div>
            <p className="text-white">Analyzing your technique...</p>
            <p className="text-gray-400 text-sm">This may take a few moments</p>
          </div>
        )}

        {analysisResults && (
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Analysis Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-700 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-orange-500">{analysisResults.explosiveness}</div>
                <div className="text-white">Explosiveness</div>
                <div className="text-gray-400 text-sm">Power & Speed</div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-orange-500">{analysisResults.guardQuality}</div>
                <div className="text-white">Guard Quality</div>
                <div className="text-gray-400 text-sm">Defense</div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-orange-500">{analysisResults.overallScore}</div>
                <div className="text-white">Overall Score</div>
                <div className="text-gray-400 text-sm">Combined Rating</div>
              </div>
            </div>
            <Button 
              onClick={() => setAnalysisResults(null)} 
              className="w-full bg-gray-700 hover:bg-gray-600"
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
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <Avatar className="w-20 h-20">
              <AvatarImage src={profile.avatar} />
              <AvatarFallback className="bg-orange-600 text-white text-2xl">
                {profile.displayName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white">{profile.displayName}</h2>
              <p className="text-gray-400">@{profile.username}</p>
              <Badge className="bg-orange-600 text-white mt-2">{profile.rank}</Badge>
            </div>
          </div>

          <p className="text-gray-300 mb-6">{profile.bio}</p>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{profile.posts}</div>
              <div className="text-gray-400">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{profile.followers}</div>
              <div className="text-gray-400">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{profile.following}</div>
              <div className="text-gray-400">Following</div>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-white font-semibold mb-2">Martial Arts</h3>
            <div className="flex flex-wrap gap-2">
              {profile.martialArts.map((art, index) => (
                <Badge key={index} variant="outline" className="border-orange-500 text-orange-500">
                  {art}
                </Badge>
              ))}
            </div>
          </div>

          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">ELO Rating</h3>
            <div className="text-3xl font-bold text-orange-500">{profile.eloPoints}</div>
            <div className="text-gray-400">Current Rank: {profile.rank}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MainApp;
