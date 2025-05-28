
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isPosting, setIsPosting] = useState(false);

  const handleMediaSelect = (type: string) => {
    setSelectedMedia(type);
    console.log(`Selected ${type}`);
  };

  const handlePost = () => {
    setIsPosting(true);
    console.log("Posting:", { caption, media: selectedMedia });
    
    // Simulate posting
    setTimeout(() => {
      setIsPosting(false);
      setCaption("");
      setSelectedMedia(null);
      alert("Post shared successfully! 🔥");
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            ➕ Share Your Training
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Media Selection */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant={selectedMedia === "photo" ? "default" : "outline"}
              onClick={() => handleMediaSelect("photo")}
              className={`h-24 flex flex-col items-center justify-center space-y-2 ${
                selectedMedia === "photo" 
                  ? "bg-orange-600 hover:bg-orange-700" 
                  : "border-gray-600 text-gray-300 hover:bg-gray-700"
              }`}
            >
              <div className="text-2xl">📸</div>
              <span>Photo</span>
            </Button>
            
            <Button
              variant={selectedMedia === "video" ? "default" : "outline"}
              onClick={() => handleMediaSelect("video")}
              className={`h-24 flex flex-col items-center justify-center space-y-2 ${
                selectedMedia === "video" 
                  ? "bg-orange-600 hover:bg-orange-700" 
                  : "border-gray-600 text-gray-300 hover:bg-gray-700"
              }`}
            >
              <div className="text-2xl">📹</div>
              <span>Video</span>
            </Button>
          </div>

          {/* Preview Area */}
          {selectedMedia && (
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
              <div className="text-gray-400 mb-4">
                {selectedMedia === "photo" ? "📸" : "📹"}
              </div>
              <p className="text-gray-400 mb-4">
                {selectedMedia === "photo" ? "Click to upload photo" : "Click to upload video"}
              </p>
              <Button className="bg-gray-700 hover:bg-gray-600 text-white">
                Browse Files
              </Button>
            </div>
          )}

          {/* Caption */}
          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Caption
            </label>
            <Textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Share your training insights, technique tips, or ask for feedback..."
              className="bg-gray-700 border-gray-600 text-white min-h-[100px]"
            />
          </div>

          {/* Suggested Tags */}
          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Suggested Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {["#training", "#sparring", "#technique", "#boxing", "#muaythai", "#bjj", "#mma"].map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="border-orange-500 text-orange-500 cursor-pointer hover:bg-orange-500 hover:text-white"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* AI Analysis Option */}
          {selectedMedia === "video" && (
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-semibold">🤖 Request AI Analysis</h4>
                  <p className="text-gray-400 text-sm">Get performance insights for this video</p>
                </div>
                <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                  Enable
                </Button>
              </div>
            </div>
          )}

          {/* Post Button */}
          <Button
            onClick={handlePost}
            disabled={!selectedMedia || !caption.trim() || isPosting}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white"
          >
            {isPosting ? "Posting..." : "Share Post"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePost;
