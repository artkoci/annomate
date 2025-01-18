import { useState } from "react";
import { Annotation } from "@/lib/types";
import { toast } from "sonner";

interface AnnotationManagerProps {
  currentImageIndex: number;
  children: (props: {
    annotations: Annotation[];
    handleAnnotationCreate: (annotation: Omit<Annotation, "id">) => void;
    handleAnnotationUpdate: (annotation: Annotation) => void;
    handleAnnotationDelete: (id: string) => void;
    handleUndo: () => void;
    handleClearAll: () => void;
  }) => React.ReactNode;
}

export const AnnotationManager = ({ currentImageIndex, children }: AnnotationManagerProps) => {
  // Store annotations as a map of image index to annotations array
  const [annotationsMap, setAnnotationsMap] = useState<Record<number, Annotation[]>>({});

  // Get annotations for current image
  const currentAnnotations = annotationsMap[currentImageIndex] || [];

  const handleAnnotationCreate = (annotation: Omit<Annotation, "id">) => {
    const newAnnotation = {
      ...annotation,
      id: crypto.randomUUID(),
    };
    setAnnotationsMap(prev => ({
      ...prev,
      [currentImageIndex]: [...(prev[currentImageIndex] || []), newAnnotation]
    }));
    toast.success("Annotation added");
  };

  const handleAnnotationUpdate = (annotation: Annotation) => {
    setAnnotationsMap(prev => ({
      ...prev,
      [currentImageIndex]: (prev[currentImageIndex] || []).map((a) => 
        a.id === annotation.id ? annotation : a
      )
    }));
    toast.success("Annotation updated");
  };

  const handleAnnotationDelete = (id: string) => {
    setAnnotationsMap(prev => ({
      ...prev,
      [currentImageIndex]: (prev[currentImageIndex] || []).filter((a) => a.id !== id)
    }));
    toast.success("Annotation deleted");
  };

  const handleUndo = () => {
    if (currentAnnotations.length > 0) {
      setAnnotationsMap(prev => {
        const newAnnotations = [...(prev[currentImageIndex] || [])];
        newAnnotations.pop();
        return {
          ...prev,
          [currentImageIndex]: newAnnotations
        };
      });
      toast.success("Last annotation undone");
    } else {
      toast.error("Nothing to undo");
    }
  };

  const handleClearAll = () => {
    if (currentAnnotations.length > 0) {
      setAnnotationsMap(prev => ({
        ...prev,
        [currentImageIndex]: []
      }));
      toast.success("All annotations cleared");
    } else {
      toast.error("No annotations to clear");
    }
  };

  return children({
    annotations: currentAnnotations,
    handleAnnotationCreate,
    handleAnnotationUpdate,
    handleAnnotationDelete,
    handleUndo,
    handleClearAll,
  });
}; 