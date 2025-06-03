
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WelcomeScreen from "@/components/WelcomeScreen";
import MainApp from "@/components/MainApp";
import MatchmakingApp from "@/components/MatchmakingApp";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showMatchmaking, setShowMatchmaking] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("signup");

  const handleAuth = (email: string, password: string) => {
    // Simulate authentication
    console.log("Authenticating user:", email);
    setIsAuthenticated(true);
    setShowAuth(false);
    setShowMatchmaking(false);
  };

  const handleShowAuth = () => {
    setShowAuth(true);
    setShowMatchmaking(false);
  };

  const handleShowMatchmaking = () => {
    setShowMatchmaking(true);
    setShowAuth(false);
  };

  if (isAuthenticated) {
    return <MainApp onShowAuth={handleShowAuth} />;
  }

  if (showMatchmaking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="p-4">
          <div className="mb-4">
            <Button
              onClick={() => setShowMatchmaking(false)}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              ← Back to Welcome
            </Button>
          </div>
          <MatchmakingApp isAuthenticated={false} onAuthRequired={handleShowAuth} />
        </div>
      </div>
    );
  }

  if (!showAuth) {
    return <WelcomeScreen onGetStarted={() => setShowAuth(true)} onShowMatchmaking={handleShowMatchmaking} />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/lovable-uploads/60d42b2f-2916-449c-a7e9-cc5ce66ae476.png')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-black/80 backdrop-blur-sm border border-orange-500/30">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-white mb-2">Join the Fight</h1>
              <p className="text-gray-400">Connect with fighters worldwide</p>
            </div>

            <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as "login" | "signup")}>
              <TabsList className="grid w-full grid-cols-2 bg-gray-700">
                <TabsTrigger 
                  value="signup" 
                  className="text-white data-[state=active]:bg-orange-600"
                >
                  Sign Up
                </TabsTrigger>
                <TabsTrigger 
                  value="login" 
                  className="text-white data-[state=active]:bg-orange-600"
                >
                  Login
                </TabsTrigger>
              </TabsList>

              <TabsContent value="signup" className="space-y-4 mt-4">
                <AuthForm mode="signup" onSubmit={handleAuth} />
              </TabsContent>

              <TabsContent value="login" className="space-y-4 mt-4">
                <AuthForm mode="login" onSubmit={handleAuth} />
              </TabsContent>
            </Tabs>

            <div className="text-center mt-4">
              <Button
                variant="ghost"
                onClick={() => setShowAuth(false)}
                className="text-gray-400 hover:text-white"
              >
                ← Back to Welcome
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const AuthForm = ({ mode, onSubmit }: { mode: "login" | "signup"; onSubmit: (email: string, password: string) => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "signup" && password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="email" className="text-white">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-700 border-gray-600 text-white"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="password" className="text-white">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-gray-700 border-gray-600 text-white"
          required
        />
      </div>

      {mode === "signup" && (
        <div>
          <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-gray-700 border-gray-600 text-white"
            required
          />
        </div>
      )}

      <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white">
        {mode === "signup" ? "Create Account" : "Sign In"}
      </Button>
    </form>
  );
};

export default Index;
