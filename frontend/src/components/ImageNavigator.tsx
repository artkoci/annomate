import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageNavigatorProps {
  currentIndex: number;
  totalImages: number;
  onNavigate: (direction: "prev" | "next") => void;
}

export const ImageNavigator = ({
  currentIndex,
  totalImages,
  onNavigate,
}: ImageNavigatorProps) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg">
      <Button
        variant="secondary"
        size="icon"
        onClick={() => onNavigate("prev")}
        disabled={currentIndex === 0}
        className="w-8 h-8 bg-gray-700 hover:bg-gray-600"
      >
        <ChevronLeft className="w-4 h-4 text-white" />
      </Button>
      
      <span className="text-sm text-white">
        Image {currentIndex + 1} of {totalImages}
      </span>
      
      <Button
        variant="secondary"
        size="icon"
        onClick={() => onNavigate("next")}
        disabled={currentIndex === totalImages - 1}
        className="w-8 h-8 bg-gray-700 hover:bg-gray-600"
      >
        <ChevronRight className="w-4 h-4 text-white" />
      </Button>
    </div>
  );
};