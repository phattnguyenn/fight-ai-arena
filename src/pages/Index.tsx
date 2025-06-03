
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
      <div className="min-h-screen bg-black">
        <div className="p-6">
          <div className="mb-6">
            <Button
              onClick={() => setShowMatchmaking(false)}
              variant="outline"
              className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
            >
              ← Back
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
    <div className="min-h-screen bg-black">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: `url('/lovable-uploads/60d42b2f-2916-449c-a7e9-cc5ce66ae476.png')`,
        }}
      />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <Card className="w-full max-w-md bg-black border border-red-500">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-light text-white mb-2">LOGIN</h1>
              <div className="w-12 h-0.5 bg-red-500 mx-auto"></div>
            </div>

            <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as "login" | "signup")}>
              <TabsList className="grid w-full grid-cols-2 bg-black border border-blue-500">
                <TabsTrigger value="signup" className="text-white data-[state=active]:bg-red-500 data-[state=active]:text-white">
                  SIGN UP
                </TabsTrigger>
                <TabsTrigger value="login" className="text-white data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                  LOGIN
                </TabsTrigger>
              </TabsList>

              <TabsContent value="signup" className="space-y-6 mt-6">
                <AuthForm mode="signup" onSubmit={handleAuth} />
              </TabsContent>

              <TabsContent value="login" className="space-y-6 mt-6">
                <AuthForm mode="login" onSubmit={handleAuth} />
              </TabsContent>
            </Tabs>

            <div className="text-center mt-6">
              <Button
                variant="ghost"
                onClick={() => setShowAuth(false)}
                className="text-blue-500 hover:text-white hover:bg-blue-500"
              >
                ← BACK
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="email" className="text-white font-light">EMAIL</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-black border-blue-500 text-white mt-2 focus:border-red-500"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="password" className="text-white font-light">PASSWORD</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-black border-blue-500 text-white mt-2 focus:border-red-500"
          required
        />
      </div>

      {mode === "signup" && (
        <div>
          <Label htmlFor="confirmPassword" className="text-white font-light">CONFIRM PASSWORD</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-black border-blue-500 text-white mt-2 focus:border-red-500"
            required
          />
        </div>
      )}

      <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white font-light">
        {mode === "signup" ? "CREATE ACCOUNT" : "SIGN IN"}
      </Button>
    </form>
  );
};

export default Index;
