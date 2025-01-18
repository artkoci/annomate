import { createContext, useContext, useState, ReactNode } from "react";

interface ImageContextType {
  images: string[];
  addImages: (files: FileList) => void;
  currentImageIndex: number;
  setCurrentImageIndex: (index: number) => void;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export function ImageProvider({ children }: { children: ReactNode }) {
  const [images, setImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const addImages = (files: FileList) => {
    const urls = Array.from(files).map(file => URL.createObjectURL(file));
    setImages(urls);
  };

  return (
    <ImageContext.Provider 
      value={{ 
        images, 
        addImages, 
        currentImageIndex, 
        setCurrentImageIndex 
      }}
    >
      {children}
    </ImageContext.Provider>
  );
}

export function useImages() {
  const context = useContext(ImageContext);
  if (context === undefined) {
    throw new Error("useImages must be used within an ImageProvider");
  }
  return context;
} 