
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface WelcomeScreenProps {
  onGetStarted: () => void;
  onShowMatchmaking?: () => void;
}

const WelcomeScreen = ({ onGetStarted, onShowMatchmaking }: WelcomeScreenProps) => {
  const handleFeatureClick = () => {
    toast({
      title: "Sign Up Required",
      description: "Please create an account to access this feature",
      action: (
        <Button 
          onClick={onGetStarted}
          className="bg-red-500 hover:bg-red-600 text-white"
        >
          Sign Up
        </Button>
      ),
    });
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url('/lovable-uploads/42b99462-dada-44a5-ae2e-43358e217175.png')`,
        }}
      />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        <div className="text-center z-10 max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="mb-12">
            <h1 className="text-6xl md:text-8xl font-thin text-white mb-6 tracking-widest">
              FIGHT
              <span className="text-red-500 block">CLUB</span>
            </h1>
            <div className="w-24 h-0.5 bg-blue-500 mx-auto mb-8"></div>
            <p className="text-xl text-white font-light max-w-2xl mx-auto leading-relaxed">
              The ultimate platform for martial artists
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
            <div 
              onClick={handleFeatureClick}
              className="bg-black border border-blue-500 p-8 hover:border-red-500 transition-all cursor-pointer group"
            >
              <div className="text-blue-500 text-4xl mb-4 group-hover:text-red-500 transition-colors">■</div>
              <h3 className="text-lg font-light text-white mb-3">AI ANALYSIS</h3>
              <p className="text-white/70 text-sm font-light">Technique insights</p>
            </div>
            
            <div 
              onClick={onShowMatchmaking}
              className="relative bg-black border-2 border-red-500 p-12 hover:bg-red-500/10 transition-all cursor-pointer shadow-2xl"
            >
              <div className="text-red-500 text-6xl mb-6">■</div>
              <h3 className="text-2xl font-light text-white mb-4">FIND SPARRING</h3>
              <p className="text-white/80 text-base font-light mb-6">Connect with fighters</p>
              <div className="text-blue-500 font-light text-lg">BEST FEATURE</div>
            </div>
            
            <div 
              onClick={handleFeatureClick}
              className="bg-black border border-blue-500 p-8 hover:border-red-500 transition-all cursor-pointer group"
            >
              <div className="text-blue-500 text-4xl mb-4 group-hover:text-red-500 transition-colors">■</div>
              <h3 className="text-lg font-light text-white mb-3">ELO RANKING</h3>
              <p className="text-white/70 text-sm font-light">Skill tracking</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="space-y-6">
            <Button 
              onClick={onGetStarted}
              className="bg-red-500 hover:bg-red-600 text-white font-light px-12 py-4 text-lg"
            >
              START
            </Button>
            <div className="w-12 h-0.5 bg-blue-500 mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
