
import { Button } from "@/components/ui/button";

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

const WelcomeScreen = ({ onGetStarted }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900/20 to-orange-900/20 flex flex-col items-center justify-center p-4 relative overflow-hidden">
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
              CONNECT
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
            The ultimate social platform for martial artists. Train smarter, connect deeper, fight stronger.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:bg-gray-800/70 transition-all">
            <div className="text-orange-500 text-4xl mb-4">🥊</div>
            <h3 className="text-xl font-semibold text-white mb-2">AI Analysis</h3>
            <p className="text-gray-400">Get AI-powered insights on your technique, power, and defense</p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:bg-gray-800/70 transition-all">
            <div className="text-red-500 text-4xl mb-4">⚔️</div>
            <h3 className="text-xl font-semibold text-white mb-2">Find Sparring Partners</h3>
            <p className="text-gray-400">Connect with fighters nearby for training and sparring sessions</p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:bg-gray-800/70 transition-all">
            <div className="text-orange-500 text-4xl mb-4">🏆</div>
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

      {/* Floating Elements */}
      <div className="absolute bottom-10 left-10 opacity-20">
        <div className="text-orange-500 text-6xl animate-bounce">🔥</div>
      </div>
      <div className="absolute top-20 right-10 opacity-20">
        <div className="text-red-500 text-4xl animate-pulse">💪</div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
