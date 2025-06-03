
import { useEffect } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative"
      style={{ backgroundColor: '#101010' }}
    >
      <div className="text-center">
        <div className="relative">
          <h1 className="text-6xl font-bold text-white mb-4 tracking-widest">
            FIGHTCONNECT
          </h1>
          <div 
            className="absolute inset-0 animate-pulse opacity-30 rounded-full blur-lg"
            style={{ backgroundColor: '#E31837' }}
          ></div>
        </div>
        
        <p className="text-gray-400 text-lg mb-8">Connect. Spar. Improve.</p>
        
        <div className="flex justify-center">
          <div className="w-8 h-8 border-2 border-t-red-500 border-blue-500 rounded-full animate-spin"></div>
        </div>
        
        <p className="text-gray-500 text-sm mt-4">Loading...</p>
      </div>
    </div>
  );
};

export default SplashScreen;
