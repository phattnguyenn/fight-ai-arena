
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <Card className="bg-black/50 backdrop-blur-sm border border-orange-500/20 rounded-3xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-orange-500/10 to-red-500/10">
        <CardTitle className="text-white flex items-center gap-2 text-xl">
          📊 AI Performance Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <p className="text-gray-300">Upload a training or sparring video to get AI-powered insights on your performance.</p>
        
        {!isAnalyzing && !analysisResults && (
          <div className="border-2 border-dashed border-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-12 text-center bg-gradient-to-br from-orange-500/5 to-red-500/5">
            <div className="text-6xl mb-6 animate-bounce">🎥</div>
            <p className="text-gray-400 mb-6 text-lg">Drop your video here or click to browse</p>
            <Button 
              onClick={handleVideoUpload} 
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-3 rounded-2xl text-lg font-semibold shadow-lg"
            >
              Upload Video
            </Button>
          </div>
        )}

        {isAnalyzing && (
          <div className="text-center py-12">
            <div className="animate-spin text-6xl mb-6">⚙️</div>
            <p className="text-white text-xl mb-2">Analyzing your technique...</p>
            <p className="text-gray-400">This may take a few moments</p>
          </div>
        )}

        {analysisResults && (
          <div className="space-y-6">
            <h3 className="text-white font-semibold text-xl">Analysis Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 rounded-2xl p-6 text-center border border-orange-500/30">
                <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">{analysisResults.explosiveness}</div>
                <div className="text-white font-semibold mt-2">Explosiveness</div>
                <div className="text-gray-400 text-sm">Power & Speed</div>
              </div>
              <div className="bg-gradient-to-br from-blue-600/20 to-orange-600/20 rounded-2xl p-6 text-center border border-blue-500/30">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">{analysisResults.guardQuality}</div>
                <div className="text-white font-semibold mt-2">Guard Quality</div>
                <div className="text-gray-400 text-sm">Defense</div>
              </div>
              <div className="bg-gradient-to-br from-red-600/20 to-blue-600/20 rounded-2xl p-6 text-center border border-red-500/30">
                <div className="text-3xl font-bold bg-gradient-to-r from-red-400 to-blue-400 bg-clip-text text-transparent">{analysisResults.overallScore}</div>
                <div className="text-white font-semibold mt-2">Overall Score</div>
                <div className="text-gray-400 text-sm">Combined Rating</div>
              </div>
            </div>
            <Button 
              onClick={() => setAnalysisResults(null)} 
              className="w-full bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 rounded-2xl py-3"
            >
              Analyze Another Video
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIAnalyze;
