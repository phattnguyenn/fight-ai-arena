
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

interface ProfileSetupProps {
  onComplete: (profile: any) => void;
}

const ProfileSetup = ({ onComplete }: ProfileSetupProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    displayName: "",
    bio: "",
    martialArts: [],
    avatar: "",
    rank: "Bronze I",
    eloPoints: 1200,
    posts: 24,
    followers: 156,
    following: 89
  });

  const martialArtOptions = [
    "Boxing",
    "Muay Thai", 
    "Brazilian Jiu-Jitsu",
    "MMA",
    "Kickboxing",
    "Wrestling",
    "Karate",
    "Taekwondo"
  ];

  const handleMartialArtChange = (art: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        martialArts: [...prev.martialArts, art]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        martialArts: prev.martialArts.filter(ma => ma !== art)
      }));
    }
  };

  const handleSubmit = () => {
    onComplete(formData);
  };

  if (step === 1) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Background Image - Using the new uploaded image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/lovable-uploads/70f89bc1-fad9-4a7c-9373-6275256cd8b8.png')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80"></div>
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-black/80 backdrop-blur-sm border border-orange-500/30 rounded-3xl">
            <CardHeader>
              <CardTitle className="text-white text-center text-2xl">Complete Your Fighter Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div>
                <Label htmlFor="username" className="text-white">Username</Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                  className="bg-gray-800 border-orange-500/30 text-white rounded-xl"
                  placeholder="Enter your username"
                />
              </div>

              <div>
                <Label htmlFor="displayName" className="text-white">Display Name</Label>
                <Input
                  id="displayName"
                  value={formData.displayName}
                  onChange={(e) => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
                  className="bg-gray-800 border-orange-500/30 text-white rounded-xl"
                  placeholder="Enter your display name"
                />
              </div>

              <div>
                <Label htmlFor="bio" className="text-white">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  className="bg-gray-800 border-orange-500/30 text-white rounded-xl"
                  placeholder="Tell us about yourself..."
                  rows={3}
                />
              </div>

              <Button 
                onClick={() => setStep(2)}
                disabled={!formData.username || !formData.displayName}
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white rounded-xl py-3"
              >
                Next Step
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/lovable-uploads/70f89bc1-fad9-4a7c-9373-6275256cd8b8.png')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-black/80 backdrop-blur-sm border border-orange-500/30 rounded-3xl">
          <CardHeader>
            <CardTitle className="text-white text-center text-2xl">Select Your Martial Arts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="space-y-4">
              {martialArtOptions.map((art) => (
                <div key={art} className="flex items-center space-x-3">
                  <Checkbox
                    id={art}
                    checked={formData.martialArts.includes(art)}
                    onCheckedChange={(checked) => handleMartialArtChange(art, checked as boolean)}
                    className="border-orange-500 data-[state=checked]:bg-orange-600"
                  />
                  <Label htmlFor={art} className="text-white cursor-pointer">
                    {art}
                  </Label>
                </div>
              ))}
            </div>

            <div className="flex space-x-3">
              <Button 
                onClick={() => setStep(1)}
                variant="outline"
                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700 rounded-xl"
              >
                Back
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={formData.martialArts.length === 0}
                className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white rounded-xl"
              >
                Complete Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSetup;
