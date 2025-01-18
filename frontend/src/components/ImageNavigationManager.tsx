import { useState } from "react";
import { toast } from "sonner";
import { LabelType, SUCCESS_TYPE } from "@/lib/types";

interface ImageNavigationManagerProps {
  children: (props: {
    currentImageIndex: number;
    handleNavigate: (direction: "prev" | "next") => void;
    handleLabelSelect: (label: LabelType) => void;
  }) => React.ReactNode;
}

export const ImageNavigationManager = ({ children }: ImageNavigationManagerProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNavigate = (direction: "prev" | "next") => {
    setCurrentImageIndex((current) => {
      if (direction === "prev" && current > 0) {
        return current - 1;
      }
      if (direction === "next" && current < 0) { // Update this when you have real images
        return current + 1;
      }
      return current;
    });
  };

  const handleLabelSelect = (label: LabelType) => {
    if (label === SUCCESS_TYPE) {
      handleNavigate("next");
      toast.success("Marked as successful print - moving to next image");
    }
  };

  return children({
    currentImageIndex,
    handleNavigate,
    handleLabelSelect,
  });
}; 