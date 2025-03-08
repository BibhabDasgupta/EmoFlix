
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Movie } from "@/lib/types";
import { Star, MoreHorizontal, Calendar } from "lucide-react";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-[2/3] overflow-hidden bg-muted">
        <div 
          className={`absolute inset-0 bg-muted ${imageLoaded ? 'opacity-0' : 'opacity-100'} 
            animate-pulse transition-opacity duration-500`} 
        />
        <img
          src={movie.poster}
          alt={movie.title}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="flex items-center gap-1 font-medium">
            <Star className="h-3 w-3 text-yellow-500" />
            {movie.rating.toFixed(1)}
          </Badge>
        </div>
      </div>
      
      <CardContent className="flex-grow p-4">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-bold text-lg line-clamp-1">{movie.title}</h3>
          <div className="flex items-center text-muted-foreground text-sm">
            <Calendar className="h-3 w-3 mr-1" />
            {movie.year}
          </div>
        </div>
        
        <div className="mt-2 flex flex-wrap gap-1">
          {movie.genres.slice(0, 3).map((genre) => (
            <Badge key={genre} variant="outline" className="text-xs">
              {genre}
            </Badge>
          ))}
        </div>
        
        <p className={`mt-3 text-sm text-muted-foreground ${
          isExpanded ? '' : 'line-clamp-2'
        }`}>
          {movie.plot}
        </p>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs flex items-center text-muted-foreground hover:text-primary transition-colors"
        >
          <MoreHorizontal className="h-3 w-3 mr-1" />
          {isExpanded ? "Show less" : "Show more"}
        </button>
      </CardFooter>
    </Card>
  );
};

export default MovieCard;
