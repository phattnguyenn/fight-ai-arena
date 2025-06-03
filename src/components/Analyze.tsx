
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Analyze = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentSession, setCurrentSession] = useState(null);
  const [sessions] = useState([
    {
      sessionId: "session_001",
      date: "2025-06-18",
      videoUrl: "/lovable-uploads/9ca2307a-074c-4c7e-97bd-1fad9667b086.png",
      metrics: { power: 65, defense: 50, accuracy: 70 },
      eloAfter: 1325
    },
    {
      sessionId: "session_002",
      date: "2025-06-25",
      videoUrl: "/lovable-uploads/65228cf8-7a4e-404d-b553-a86f91873a66.png",
      metrics: { power: 68, defense: 54, accuracy: 72 },
      eloAfter: 1340
    }
  ]);

  const handleUploadVideo = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const eloGain = Math.floor(Math.random() * 50) + 25;
      const newSession = {
        sessionId: `session_${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        metrics: {
          power: Math.floor(Math.random() * 30) + 70,
          defense: Math.floor(Math.random() * 30) + 60,
          accuracy: Math.floor(Math.random() * 20) + 70
        },
        eloGain: eloGain,
        eloAfter: 1340 + eloGain
      };
      setCurrentSession(newSession);
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">AI PERFORMANCE ANALYSIS</h2>
        <p className="text-gray-400">Upload training videos to get AI-powered insights</p>
      </div>

      {/* Upload Section */}
      {!isAnalyzing && !currentSession && (
        <Card style={{ backgroundColor: '#181818', borderColor: '#333333' }}>
          <CardContent className="p-8">
            <div 
              className="border-2 border-dashed rounded-2xl p-12 text-center"
              style={{ borderColor: '#E31837' }}
            >
              <div className="text-6xl mb-6 animate-bounce">🎥</div>
              <p className="text-gray-400 mb-6 text-lg">Drop your video here or click to browse</p>
              <p className="text-gray-500 text-sm mb-6">Supported formats: MP4, MOV (Max 3 min)</p>
              <Button 
                onClick={handleUploadVideo}
                className="text-white px-8 py-3 text-lg font-semibold"
                style={{ backgroundColor: '#E31837' }}
              >
                Upload Training Video
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analyzing State */}
      {isAnalyzing && (
        <Card style={{ backgroundColor: '#181818', borderColor: '#E31837' }}>
          <CardContent className="p-12 text-center">
            <div className="animate-spin text-6xl mb-6">⚙️</div>
            <h3 className="text-white text-xl mb-2">Analyzing your technique...</h3>
            <p className="text-gray-400">AI is processing your video for insights</p>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-6">
              <div 
                className="h-2 rounded-full animate-pulse"
                style={{ backgroundColor: '#E31837', width: '60%' }}
              ></div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analysis Results */}
      {currentSession && (
        <div className="space-y-6">
          {/* ELO Gain */}
          <Card style={{ backgroundColor: '#181818', borderColor: '#1E90FF' }}>
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-2">🏆</div>
              <div className="text-2xl font-bold text-green-400">+{currentSession.eloGain} ELO Points!</div>
              <div className="text-white font-semibold mt-2">Excellent performance!</div>
              <div className="text-gray-400 text-sm">New ELO: {currentSession.eloAfter} points</div>
            </CardContent>
          </Card>

          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricCard
              title="Power"
              value={currentSession.metrics.power}
              color="#E31837"
              description="Striking Power"
            />
            <MetricCard
              title="Defense"
              value={currentSession.metrics.defense}
              color="#1E90FF"
              description="Defensive Skills"
            />
            <MetricCard
              title="Accuracy"
              value={currentSession.metrics.accuracy}
              color="#E31837"
              description="Strike Accuracy"
            />
          </div>

          {/* Detailed Analysis */}
          <Card style={{ backgroundColor: '#181818', borderColor: '#333333' }}>
            <CardHeader>
              <CardTitle className="text-white">Detailed Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Power Graph */}
                <div>
                  <h4 className="text-white text-sm font-semibold mb-3">Power Over Time</h4>
                  <div 
                    className="h-32 rounded flex items-end justify-around p-4"
                    style={{ backgroundColor: '#101010' }}
                  >
                    {[65, 68, currentSession.metrics.power].map((value, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div 
                          className="w-8 rounded-t"
                          style={{ 
                            height: `${(value / 100) * 80}px`,
                            backgroundColor: '#1E90FF'
                          }}
                        ></div>
                        <span className="text-gray-400 text-xs mt-1">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Accuracy Graph */}
                <div>
                  <h4 className="text-white text-sm font-semibold mb-3">Accuracy Improvement</h4>
                  <div 
                    className="h-32 rounded flex items-center justify-center"
                    style={{ backgroundColor: '#101010' }}
                  >
                    <div className="relative w-24 h-24">
                      <svg className="w-24 h-24 transform -rotate-90">
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          fill="none"
                          stroke="#333"
                          strokeWidth="8"
                        />
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          fill="none"
                          stroke="#E31837"
                          strokeWidth="8"
                          strokeDasharray={`${(currentSession.metrics.accuracy / 100) * 251.2} 251.2`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white text-lg font-bold">{currentSession.metrics.accuracy}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => setCurrentSession(null)}
                className="w-full text-white"
                style={{ backgroundColor: '#333333' }}
              >
                Analyze Another Video
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Historical Sessions */}
      <Card style={{ backgroundColor: '#181818', borderColor: '#333333' }}>
        <CardHeader>
          <CardTitle className="text-white">Historical Sessions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {sessions.map((session) => (
            <div 
              key={session.sessionId}
              className="flex items-center space-x-4 p-3 rounded"
              style={{ backgroundColor: '#101010' }}
            >
              <div 
                className="w-16 h-16 rounded bg-cover bg-center"
                style={{ backgroundImage: `url(${session.videoUrl})` }}
              >
                <div className="w-full h-full flex items-center justify-center bg-black bg-opacity-50 rounded">
                  <span className="text-white text-lg">▶</span>
                </div>
              </div>
              
              <div className="flex-1">
                <p className="text-white font-semibold">{session.date}</p>
                <div className="flex space-x-4 text-sm text-gray-400">
                  <span>P:{session.metrics.power}</span>
                  <span>D:{session.metrics.defense}</span>
                  <span>A:{session.metrics.accuracy}</span>
                </div>
                <p className="text-blue-400 text-sm">ELO: {session.eloAfter}</p>
              </div>
              
              <Button 
                variant="ghost"
                size="sm"
                className="text-blue-500 hover:text-white hover:bg-blue-600"
              >
                View
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

const MetricCard = ({ title, value, color, description }) => {
  return (
    <Card style={{ backgroundColor: '#181818', borderColor: color }}>
      <CardContent className="p-6 text-center">
        <div className="relative w-20 h-20 mx-auto mb-4">
          <svg className="w-20 h-20 transform -rotate-90">
            <circle
              cx="40"
              cy="40"
              r="32"
              fill="none"
              stroke="#333"
              strokeWidth="6"
            />
            <circle
              cx="40"
              cy="40"
              r="32"
              fill="none"
              stroke={color}
              strokeWidth="6"
              strokeDasharray={`${(value / 100) * 201} 201`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-xl font-bold">{value}</span>
          </div>
        </div>
        <h3 className="text-white font-semibold">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </CardContent>
    </Card>
  );
};

export default Analyze;
