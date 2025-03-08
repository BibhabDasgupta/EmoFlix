
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header, Footer, MovieCard } from "@/components";
import { EMOTIONS } from "@/lib/constants";
import { MOCK_MOVIES } from "@/lib/mockData";
import { Movie } from "@/lib/types";
import { ArrowLeft, RefreshCcw, ThumbsUp, Bookmark } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const MovieRecommendations = () => {
  const navigate = useNavigate();
  const { emotionId } = useParams<{ emotionId: string }>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const emotion = emotionId ? EMOTIONS[emotionId] : null;


  useEffect(() => {
    // Check for OAuth redirect params in URL hash
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = urlParams.get("access_token");

    if (accessToken) {
      // Store token from OAuth redirect
      localStorage.setItem("token", accessToken);
      sessionStorage.setItem("oauthSession", "true");
      // Clean up URL
      window.history.replaceState({}, document.title, "/recommendations");
    }

    // Check if authenticated through any method
    const token = localStorage.getItem("token");
    const oauthSession = sessionStorage.getItem("oauthSession");

    // Redirect if no authentication exists
    if (!token && !oauthSession) {
      navigate("/");
    }
  }, [navigate]);

  
  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    
    setTimeout(() => {
      if (emotionId && emotionId in MOCK_MOVIES) {
        setMovies(MOCK_MOVIES[emotionId]);
      }
      setIsLoading(false);
    }, 1500);
  }, [emotionId]);
  
  const handleRefresh = () => {
    setIsLoading(true);
    
    // Simulate refreshing recommendations
    setTimeout(() => {
      const availableEmotions = Object.keys(MOCK_MOVIES);
      const randomEmotion = availableEmotions[Math.floor(Math.random() * availableEmotions.length)];
      setMovies(MOCK_MOVIES[randomEmotion]);
      setIsLoading(false);
      
      toast({
        title: "Recommendations refreshed",
        description: "Here are some new movie suggestions for you.",
      });
    }, 1500);
  };
  
  const handleSaveToHistory = () => {
    toast({
      title: "Saved to history",
      description: "These recommendations have been saved to your history.",
    });
  };

  if (!emotion) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Emotion not found</h1>
            <Link to="/emotions">
              <Button>Return to emotion selection</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12 animate-slide-down">
            <div>
              <Link 
                to="/emotions" 
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to emotions
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold">
                Movies for when you're feeling <span className={`bg-gradient-to-r ${emotion.color} bg-clip-text text-transparent`}>{emotion.label}</span>
              </h1>
              <p className="text-muted-foreground mt-2">
                Here are some movies that match your current mood.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={handleRefresh}
                disabled={isLoading}
              >
                <RefreshCcw className="h-4 w-4" />
                Refresh
              </Button>
              <Button
                className="gap-2"
                onClick={handleSaveToHistory}
              >
                <Bookmark className="h-4 w-4" />
                Save to history
              </Button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-muted rounded-lg aspect-[2/3]"></div>
              ))}
            </div>
          ) : movies.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No movies found for this emotion.</p>
              <Button onClick={handleRefresh} className="mt-4">
                Try again
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
          
          {!isLoading && movies.length > 0 && (
            <div className="mt-12 text-center animate-fade-in">
              <p className="text-muted-foreground mb-4">
                How do you feel about these recommendations?
              </p>
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => {
                  toast({
                    title: "Feedback received",
                    description: "Thank you for your feedback!",
                  });
                }}
              >
                <ThumbsUp className="h-4 w-4" />
                I like these recommendations
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MovieRecommendations;




