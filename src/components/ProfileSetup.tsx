
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
  const [profile, setProfile] = useState({
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

  const martialArtOptions = [
    "Boxing", "MMA", "Brazilian Jiu-Jitsu", "Muay Thai", "Karate", 
    "Taekwondo", "Kickboxing", "Wrestling", "Judo", "Krav Maga"
  ];

  const handleMartialArtChange = (art: string, checked: boolean) => {
    if (checked) {
      setProfile(prev => ({
        ...prev,
        martialArts: [...prev.martialArts, art]
      }));
    } else {
      setProfile(prev => ({
        ...prev,
        martialArts: prev.martialArts.filter(a => a !== art)
      }));
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete(profile);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-center">
            Complete Your Fighter Profile
          </CardTitle>
          <div className="flex justify-center space-x-2 mt-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-8 h-2 rounded-full ${
                  i <= step ? 'bg-orange-600' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-white text-lg font-semibold">Basic Information</h3>
              
              <div>
                <Label htmlFor="username" className="text-white">Username</Label>
                <Input
                  id="username"
                  value={profile.username}
                  onChange={(e) => setProfile(prev => ({ ...prev, username: e.target.value }))}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="@username"
                />
              </div>

              <div>
                <Label htmlFor="displayName" className="text-white">Display Name</Label>
                <Input
                  id="displayName"
                  value={profile.displayName}
                  onChange={(e) => setProfile(prev => ({ ...prev, displayName: e.target.value }))}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="Your name"
                />
              </div>

              <div>
                <Label htmlFor="bio" className="text-white">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="Tell us about your martial arts journey..."
                  rows={3}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-white text-lg font-semibold">Your Martial Arts</h3>
              <p className="text-gray-400">Select all martial arts you practice:</p>
              
              <div className="grid grid-cols-2 gap-3">
                {martialArtOptions.map((art) => (
                  <div key={art} className="flex items-center space-x-2">
                    <Checkbox
                      id={art}
                      checked={profile.martialArts.includes(art)}
                      onCheckedChange={(checked) => handleMartialArtChange(art, checked)}
                      className="border-gray-600"
                    />
                    <Label htmlFor={art} className="text-white text-sm">{art}</Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-white text-lg font-semibold">Profile Picture</h3>
              
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl text-orange-500">
                    {profile.displayName.charAt(0) || "?"}
                  </span>
                </div>
                <Button className="bg-gray-700 hover:bg-gray-600 text-white">
                  Upload Photo
                </Button>
                <p className="text-gray-400 text-sm mt-2">You can skip this for now</p>
              </div>

              <div className="bg-gray-700 rounded-lg p-4 mt-6">
                <h4 className="text-white font-semibold mb-2">Starting Rank</h4>
                <div className="text-orange-500 text-xl font-bold">Bronze I</div>
                <div className="text-gray-400 text-sm">ELO: 1200 points</div>
                <p className="text-gray-300 text-sm mt-2">
                  Your rank will improve as you upload training videos and get AI analysis!
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            {step > 1 && (
              <Button
                onClick={() => setStep(step - 1)}
                variant="outline"
                className="border-gray-600 text-white hover:bg-gray-700"
              >
                Previous
              </Button>
            )}
            
            <Button
              onClick={handleNext}
              disabled={
                (step === 1 && (!profile.username || !profile.displayName)) ||
                (step === 2 && profile.martialArts.length === 0)
              }
              className="bg-orange-600 hover:bg-orange-700 text-white ml-auto"
            >
              {step === 3 ? "Complete Setup" : "Next"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSetup;
