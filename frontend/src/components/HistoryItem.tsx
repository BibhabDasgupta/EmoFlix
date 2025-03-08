
import { useState } from "react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { MovieCard } from "@/components";
import { RecommendationHistory } from "@/lib/types";
import { EMOTIONS } from "@/lib/constants";
import { Calendar, Clock } from "lucide-react";

interface HistoryItemProps {
  history: RecommendationHistory;
}

const HistoryItem = ({ history }: HistoryItemProps) => {
  const date = new Date(history.timestamp);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  
  const emotion = EMOTIONS[history.emotion];

  return (
    <Accordion type="single" collapsible className="w-full rounded-lg glass-panel">
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger className="py-5 px-6 hover:no-underline">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 text-left">
            <Badge 
              className={`bg-gradient-to-r ${emotion.color} hover:${emotion.color}`}
            >
              {emotion.label}
            </Badge>
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-6">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-3 w-3 mr-1.5" />
                {formattedDate}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-3 w-3 mr-1.5" />
                {formattedTime}
              </div>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-6 px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
            {history.movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default HistoryItem;
