
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header, Footer, EmotionCard } from "@/components";
import { EMOTIONS } from "@/lib/constants";
import { Camera, ChevronRight } from "lucide-react";

const EmotionDetection = () => {
  const navigate = useNavigate();
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [isUsingCamera, setIsUsingCamera] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Check for OAuth redirect params in URL hash
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = urlParams.get("access_token");

    if (accessToken) {
      // Store token from OAuth redirect
      localStorage.setItem("token", accessToken);
      sessionStorage.setItem("oauthSession", "true");
      // Clean up URL
      window.history.replaceState({}, document.title, "/emotions");
    }

    // Check if authenticated through any method
    const token = localStorage.getItem("token");
    const oauthSession = sessionStorage.getItem("oauthSession");

    // Redirect if no authentication exists
    if (!token && !oauthSession) {
      navigate("/");
    }
  }, [navigate]);



  const handleEmotionSelect = (emotionId: string) => {
    setSelectedEmotion(emotionId);
  };
  
  const handleAutoDetect = () => {
    setIsUsingCamera(true);
    setIsLoading(true);
    
    // Simulate emotion detection
    setTimeout(() => {
      const emotions = Object.keys(EMOTIONS);
      const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
      setSelectedEmotion(randomEmotion);
      setIsLoading(false);
    }, 2000);
  };
  
  const handleContinue = () => {
    if (selectedEmotion) {
      navigate(`/recommendations/${selectedEmotion}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 animate-slide-down">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">How are you feeling today?</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Select your current emotion or let us detect it for you, and we'll recommend movies that match your mood.
            </p>
            
            {!isUsingCamera && (
              <Button 
                onClick={handleAutoDetect} 
                variant="outline" 
                className="mt-6 gap-2"
              >
                <Camera className="h-4 w-4" />
                Auto-detect my mood
              </Button>
            )}
            
            {isUsingCamera && isLoading && (
              <div className="mt-6 animate-pulse">
                <p className="text-muted-foreground mb-2">Detecting your emotion...</p>
                <div className="w-64 h-64 bg-muted rounded-lg mx-auto"></div>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-slide-up">
            {Object.values(EMOTIONS).map((emotion) => (
              <EmotionCard
                key={emotion.id}
                emotion={emotion}
                onSelect={handleEmotionSelect}
                isSelected={selectedEmotion === emotion.id}
              />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button 
              onClick={handleContinue}
              disabled={!selectedEmotion}
              size="lg"
              className="animate-pulse-slow group"
            >
              Continue
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EmotionDetection;
