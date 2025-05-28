import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

const WelcomeScreen = ({ onGetStarted }: WelcomeScreenProps) => {
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  const handleFeatureClick = () => {
    toast({
      title: "Sign Up Required",
      description: "Please create an account to access this feature",
      action: (
        <Button 
          onClick={onGetStarted}
          className="bg-orange-600 hover:bg-orange-700 text-white"
        >
          Sign Up Now
        </Button>
      ),
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/lovable-uploads/42b99462-dada-44a5-ae2e-43358e217175.png')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 border-2 border-orange-500 rounded-full"></div>
          <div className="absolute bottom-32 right-20 w-24 h-24 border-2 border-red-500 rounded-full"></div>
          <div className="absolute top-1/3 right-1/4 w-16 h-16 border-2 border-orange-400 rotate-45"></div>
        </div>

        <div className="text-center z-10 max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
              FIGHT
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                CLUB
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
              The ultimate social platform for martial artists. Train smarter, connect deeper, fight stronger.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div 
              onClick={handleFeatureClick}
              className="bg-black/60 backdrop-blur-sm border border-orange-500/30 rounded-lg p-6 hover:bg-black/70 transition-all cursor-pointer transform hover:scale-105"
            >
              <div className="text-orange-500 text-4xl mb-4">🥊</div>
              <h3 className="text-xl font-semibold text-white mb-2">AI Analysis</h3>
              <p className="text-gray-400">Get AI-powered insights on your technique, power, and defense</p>
            </div>
            
            <div 
              onClick={handleFeatureClick}
              className="bg-black/60 backdrop-blur-sm border border-red-500/30 rounded-lg p-6 hover:bg-black/70 transition-all cursor-pointer transform hover:scale-105"
            >
              <div className="text-red-500 text-4xl mb-4">⚔️</div>
              <h3 className="text-xl font-semibold text-white mb-2">Find Sparring Partners</h3>
              <p className="text-gray-400">Connect with fighters nearby for training and sparring sessions</p>
            </div>
            
            <div 
              onClick={handleFeatureClick}
              className="bg-black/60 backdrop-blur-sm border border-blue-500/30 rounded-lg p-6 hover:bg-black/70 transition-all cursor-pointer transform hover:scale-105"
            >
              <div className="text-blue-500 text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold text-white mb-2">ELO Ranking</h3>
              <p className="text-gray-400">Track your progress with our skill-based ranking system</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="space-y-4">
            <Button 
              onClick={onGetStarted}
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-8 py-3 text-lg rounded-full transition-all transform hover:scale-105"
            >
              Start Your Journey
            </Button>
            <p className="text-gray-400 text-sm">Join thousands of martial artists worldwide</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;