import { useState } from "react";
import { Navigate } from "react-router-dom";
import { AnnotationManager } from "@/components/AnnotationManager";
import { ImageNavigationManager } from "@/components/ImageNavigationManager";
import { MainLayout } from "@/components/MainLayout";
import { SUCCESS_TYPE, LabelType } from "@/lib/types";
import { useImages } from "@/context/ImageContext";

const Annotate = () => {
  const [activeLabel, setActiveLabel] = useState<LabelType>(SUCCESS_TYPE);
  const { images, currentImageIndex, setCurrentImageIndex } = useImages();

  // Redirect to home if no images are uploaded
  if (images.length === 0) {
    return <Navigate to="/" />;
  }

  return (
    <ImageNavigationManager>
      {({ handleNavigate, handleLabelSelect }) => (
        <AnnotationManager currentImageIndex={currentImageIndex}>
          {({ 
            annotations,
            handleAnnotationCreate,
            handleAnnotationUpdate,
            handleAnnotationDelete,
            handleUndo,
            handleClearAll,
          }) => (
            <MainLayout
              imageUrl={images[currentImageIndex]}
              currentImageIndex={currentImageIndex}
              totalImages={images.length}
              activeLabel={activeLabel}
              annotations={annotations}
              onLabelSelect={(label) => {
                setActiveLabel(label);
                handleLabelSelect(label);
              }}
              onNavigate={(direction) => {
                if (direction === "next" && currentImageIndex < images.length - 1) {
                  setCurrentImageIndex(currentImageIndex + 1);
                } else if (direction === "prev" && currentImageIndex > 0) {
                  setCurrentImageIndex(currentImageIndex - 1);
                }
              }}
              onAnnotationCreate={handleAnnotationCreate}
              onAnnotationUpdate={handleAnnotationUpdate}
              onAnnotationDelete={handleAnnotationDelete}
              onUndo={handleUndo}
              onClearAll={handleClearAll}
            />
          )}
        </AnnotationManager>
      )}
    </ImageNavigationManager>
  );
};

export default Annotate;