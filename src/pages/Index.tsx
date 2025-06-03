
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SplashScreen from "@/components/SplashScreen";
import MainApp from "@/components/MainApp";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState("splash");
  const [userRole, setUserRole] = useState<"fighter" | "coach" | "fan" | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuth = (email: string, password: string, role?: string) => {
    console.log("Authenticating user:", email, "Role:", role);
    setIsAuthenticated(true);
    if (role) {
      setUserRole(role as "fighter" | "coach" | "fan");
    }
    setCurrentScreen("main");
  };

  const handleSignUpWithRole = (role: "fighter" | "coach" | "fan") => {
    setUserRole(role);
    setCurrentScreen("onboarding");
  };

  if (currentScreen === "splash") {
    return <SplashScreen onComplete={() => setCurrentScreen("auth")} />;
  }

  if (currentScreen === "main" && isAuthenticated) {
    return <MainApp userRole={userRole || "fighter"} onLogout={() => {
      setIsAuthenticated(false);
      setCurrentScreen("auth");
      setUserRole(null);
    }} />;
  }

  if (currentScreen === "onboarding") {
    return (
      <OnboardingFlow 
        role={userRole!} 
        onComplete={() => {
          setIsAuthenticated(true);
          setCurrentScreen("main");
        }} 
      />
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#101010' }}>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage: `url('/lovable-uploads/60d42b2f-2916-449c-a7e9-cc5ce66ae476.png')`,
        }}
      />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <Card className="w-full max-w-md" style={{ backgroundColor: '#181818', borderColor: '#E31837' }}>
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-2 tracking-wider">FIGHTCONNECT</h1>
              <p className="text-gray-400 text-sm">Connect. Spar. Improve.</p>
              <div className="w-16 h-0.5 mx-auto mt-4" style={{ backgroundColor: '#E31837' }}></div>
            </div>

            {currentScreen === "auth" && (
              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-2" style={{ backgroundColor: '#101010', borderColor: '#1E90FF' }}>
                  <TabsTrigger 
                    value="signin" 
                    className="text-white data-[state=active]:text-white"
                    style={{ 'data-[state=active]:backgroundColor': '#E31837' }}
                  >
                    SIGN IN
                  </TabsTrigger>
                  <TabsTrigger 
                    value="signup" 
                    className="text-white data-[state=active]:text-white"
                    style={{ 'data-[state=active]:backgroundColor': '#1E90FF' }}
                  >
                    SIGN UP
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="signin" className="space-y-6 mt-6">
                  <AuthForm mode="signin" onSubmit={handleAuth} />
                </TabsContent>

                <TabsContent value="signup" className="space-y-6 mt-6">
                  <RoleSelector onRoleSelect={handleSignUpWithRole} />
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const AuthForm = ({ mode, onSubmit }: { mode: "signin" | "signup"; onSubmit: (email: string, password: string) => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
          className="mt-2 text-white focus:border-blue-500"
          style={{ backgroundColor: '#101010', borderColor: '#1E90FF' }}
          placeholder="you@example.com"
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
          className="mt-2 text-white focus:border-red-500"
          style={{ backgroundColor: '#101010', borderColor: '#1E90FF' }}
          placeholder="••••••••"
          required
        />
      </div>

      <Button 
        type="submit" 
        className="w-full text-white font-light"
        style={{ backgroundColor: '#E31837' }}
      >
        {mode === "signin" ? "SIGN IN" : "CREATE ACCOUNT"}
      </Button>

      <div className="text-center">
        <p className="text-gray-400 text-sm mb-4">Or continue with</p>
        <div className="flex space-x-4">
          <Button 
            type="button" 
            variant="outline" 
            className="flex-1 text-white border-blue-500 hover:bg-blue-500"
          >
            Google
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            className="flex-1 text-white border-blue-500 hover:bg-blue-500"
          >
            Facebook
          </Button>
        </div>
      </div>
    </form>
  );
};

const RoleSelector = ({ onRoleSelect }: { onRoleSelect: (role: "fighter" | "coach" | "fan") => void }) => {
  return (
    <div className="space-y-6">
      <div>
        <Label className="text-white font-light mb-4 block">CHOOSE YOUR ROLE</Label>
        <div className="space-y-3">
          <Button
            onClick={() => onRoleSelect("fighter")}
            variant="outline"
            className="w-full text-white border-red-500 hover:bg-red-500 p-6"
          >
            <div className="text-center">
              <div className="text-2xl mb-2">🥊</div>
              <div className="font-bold">FIGHTER</div>
              <div className="text-sm text-gray-400">Find sparring partners and track progress</div>
            </div>
          </Button>
          
          <Button
            onClick={() => onRoleSelect("coach")}
            variant="outline"
            className="w-full text-white border-blue-500 hover:bg-blue-500 p-6"
          >
            <div className="text-center">
              <div className="text-2xl mb-2">🏋️</div>
              <div className="font-bold">COACH/GYM</div>
              <div className="text-sm text-gray-400">Manage events and train fighters</div>
            </div>
          </Button>
          
          <Button
            onClick={() => onRoleSelect("fan")}
            variant="outline"
            className="w-full text-white border-blue-500 hover:bg-blue-500 p-6"
          >
            <div className="text-center">
              <div className="text-2xl mb-2">🎫</div>
              <div className="font-bold">FAN</div>
              <div className="text-sm text-gray-400">Follow fighters and buy event tickets</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

const OnboardingFlow = ({ role, onComplete }: { role: "fighter" | "coach" | "fan"; onComplete: () => void }) => {
  const [step, setStep] = useState(1);

  if (role === "fighter") {
    return (
      <div className="min-h-screen p-6" style={{ backgroundColor: '#101010' }}>
        <Card className="max-w-md mx-auto" style={{ backgroundColor: '#181818', borderColor: '#E31837' }}>
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">FIGHTER SETUP</h2>
              <p className="text-gray-400">Step {step} of 2</p>
            </div>

            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-gray-700 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl">📷</span>
                  </div>
                  <p className="text-gray-400 text-sm">Tap to upload profile photo</p>
                </div>
                
                <div>
                  <Label className="text-white">NICKNAME</Label>
                  <Input 
                    placeholder="The Hammer" 
                    className="mt-2 text-white"
                    style={{ backgroundColor: '#101010', borderColor: '#1E90FF' }}
                  />
                </div>
                
                <div>
                  <Label className="text-white">WEIGHT CLASS</Label>
                  <select 
                    className="w-full mt-2 p-3 rounded text-white"
                    style={{ backgroundColor: '#101010', borderColor: '#1E90FF', border: '1px solid' }}
                  >
                    <option value="125">125 lbs</option>
                    <option value="135">135 lbs</option>
                    <option value="145">145 lbs</option>
                    <option value="155">155 lbs</option>
                  </select>
                </div>
                
                <div>
                  <Label className="text-white">PRIMARY DISCIPLINE</Label>
                  <div className="mt-2 space-y-2">
                    {["Boxing", "MMA", "Muay Thai", "Kickboxing", "BJJ"].map((discipline) => (
                      <label key={discipline} className="flex items-center text-white">
                        <input type="radio" name="discipline" value={discipline} className="mr-2" />
                        {discipline}
                      </label>
                    ))}
                  </div>
                </div>
                
                <Button 
                  onClick={() => setStep(2)}
                  className="w-full text-white"
                  style={{ backgroundColor: '#E31837' }}
                >
                  NEXT
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-4">AI BASELINE ANALYSIS</h3>
                  <div 
                    className="border-2 border-dashed rounded-lg p-8 text-center"
                    style={{ borderColor: '#E31837' }}
                  >
                    <div className="text-4xl mb-4">🎥</div>
                    <p className="text-gray-400 mb-4">Upload a 30-second spar sample</p>
                    <Button 
                      variant="outline" 
                      className="text-white border-red-500 hover:bg-red-500"
                    >
                      Tap to Upload Video
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mt-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold" style={{ color: '#1E90FF' }}>68</div>
                    <div className="text-gray-400 text-sm">Power</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold" style={{ color: '#1E90FF' }}>54</div>
                    <div className="text-gray-400 text-sm">Defense</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold" style={{ color: '#1E90FF' }}>72</div>
                    <div className="text-gray-400 text-sm">Accuracy</div>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-white">ELO: 1325 (Silver Tier)</p>
                </div>
                
                <Button 
                  onClick={onComplete}
                  className="w-full text-white"
                  style={{ backgroundColor: '#E31837' }}
                >
                  FINISH SETUP
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // For coach and fan roles, simplified onboarding
  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#101010' }}>
      <Card className="max-w-md mx-auto" style={{ backgroundColor: '#181818', borderColor: '#E31837' }}>
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              {role === "coach" ? "GYM SETUP" : "PREFERENCES"}
            </h2>
          </div>

          <div className="space-y-6">
            {role === "coach" ? (
              <>
                <div>
                  <Label className="text-white">GYM NAME</Label>
                  <Input 
                    placeholder="Dragon Fury MMA" 
                    className="mt-2 text-white"
                    style={{ backgroundColor: '#101010', borderColor: '#1E90FF' }}
                  />
                </div>
                <div>
                  <Label className="text-white">ADDRESS</Label>
                  <Input 
                    placeholder="123 Fight St, Ho Chi Minh City" 
                    className="mt-2 text-white"
                    style={{ backgroundColor: '#101010', borderColor: '#1E90FF' }}
                  />
                </div>
              </>
            ) : (
              <div>
                <Label className="text-white">INTERESTS</Label>
                <div className="mt-2 space-y-2">
                  {["Boxing", "MMA", "Muay Thai", "Kickboxing", "BJJ"].map((interest) => (
                    <label key={interest} className="flex items-center text-white">
                      <input type="checkbox" className="mr-2" />
                      {interest}
                    </label>
                  ))}
                </div>
              </div>
            )}
            
            <Button 
              onClick={onComplete}
              className="w-full text-white"
              style={{ backgroundColor: '#E31837' }}
            >
              {role === "coach" ? "CREATE GYM PROFILE" : "SHOW ME EVENTS"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
