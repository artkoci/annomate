import { Button } from "@/components/ui/button";
import { useImages } from "@/context/ImageContext";
import mascot from "@/assets/mascot.png";
import confetti from "canvas-confetti";
import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Annotation } from "@/lib/types";
import JSZip from 'jszip';
import { toast } from "sonner";

interface ImageAnnotations {
  imageIndex: number;
  annotations: Annotation[];
}

export const Download = () => {
  const { images } = useImages();
  const navigate = useNavigate();

  // Get annotations from localStorage
  const getAnnotations = (): ImageAnnotations[] => {
    const saved = localStorage.getItem('annotations');
    if (!saved) return [];
    
    const annotationsMap = JSON.parse(saved) as Record<string, Annotation[]>;
    return Object.entries(annotationsMap).map(([imageIndex, annotations]) => ({
      imageIndex: parseInt(imageIndex),
      annotations
    }));
  };

  const handleDownload = useCallback(async () => {
    const imageAnnotations = getAnnotations();
    
    // Create CSV header
    const csvRows = ['image_name,label,x,y,width,height'];
    
    // Create a new zip file
    const zip = new JSZip();
    const imagesFolder = zip.folder("images");
    
    // Add each annotation as a row and save corresponding images
    for (const { imageIndex, annotations } of imageAnnotations) {
      if (annotations.length === 0) continue;

      try {
        // Fetch the image and get its blob
        const response = await fetch(images[imageIndex]);
        const imageBlob = await response.blob();
        
        // Generate a meaningful filename (using index to ensure uniqueness)
        const imageName = `image_${imageIndex}.${imageBlob.type.split('/')[1]}`;
        
        // Add image to zip
        imagesFolder?.file(imageName, imageBlob);
        
        // Add annotations to CSV
        annotations.forEach((annotation) => {
          const row = [
            imageName,
            annotation.label,
            annotation.coordinates.x,
            annotation.coordinates.y,
            annotation.coordinates.width,
            annotation.coordinates.height
          ].join(',');
          csvRows.push(row);
        });
      } catch (error) {
        console.error(`Failed to process image ${imageIndex}:`, error);
        toast.error(`Failed to process image ${imageIndex}`);
      }
    }

    // Add CSV to zip
    const csvContent = csvRows.join('\n');
    zip.file("annotations.csv", csvContent);

    try {
      // Generate zip file
      const content = await zip.generateAsync({ type: "blob" });
      
      // Create download link
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.setAttribute('download', 'annotations.zip');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Add a smooth confetti burst on download
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#22c55e", "#16a34a", "#15803d"],
        ticks: 200,
        gravity: 0.8,
        decay: 0.92,
        scalar: 1.2
      });
    } catch (error) {
      console.error('Failed to create zip file:', error);
      toast.error('Failed to create download file');
    }
  }, [images]);

  useEffect(() => {
    // Fire a smooth initial confetti burst
    const duration = 2000;
    const animationEnd = Date.now() + duration;

    const colors = ["#22c55e", "#16a34a", "#15803d"];

    (function frame() {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 70,
        origin: { x: 0 },
        colors: colors,
        ticks: 300,
        gravity: 0.8,
        scalar: 1.2,
        drift: 0
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 70,
        origin: { x: 1 },
        colors: colors,
        ticks: 300,
        gravity: 0.8,
        scalar: 1.2,
        drift: 0
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    }());

    // Add gentle random confetti pops
    const randomConfetti = setInterval(() => {
      confetti({
        particleCount: 15,
        angle: 90,
        spread: 45,
        origin: { y: 0.7, x: Math.random() },
        colors: colors,
        startVelocity: 25,
        gravity: 0.8,
        ticks: 200,
        decay: 0.92,
        scalar: 1
      });
    }, 2500);

    return () => clearInterval(randomConfetti);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white p-4">
      <div className="text-center mb-8">
        <img 
          src={mascot} 
          alt="Annomate Mascot" 
          className="w-32 h-32 mx-auto mb-6 animate-[bounce_2s_ease-in-out_infinite]" 
        />
        <h1 
          className="text-4xl font-bold mb-4 opacity-0 animate-[fade-in-up_0.5s_ease-out_0.3s_forwards]"
        >
          Annotation Complete!
        </h1>
        <p 
          className="text-gray-400 mb-8 opacity-0 animate-[fade-in-up_0.5s_ease-out_0.5s_forwards]"
        >
          Your annotations have been saved successfully.
        </p>
        <div className="flex flex-col gap-4 items-center">
          <Button 
            variant="default"
            size="lg"
            className="bg-emerald-500 hover:bg-emerald-600 min-w-64 font-semibold opacity-0 animate-[fade-in-up_0.5s_ease-out_0.7s_forwards] transition-colors duration-200"
            onClick={handleDownload}
          >
            Download Annotations & Images
          </Button>
          <Button 
            variant="outline"
            size="lg"
            className="min-w-64 border-violet-400 border-2 text-violet-400 hover:bg-violet-500 hover:text-white font-semibold opacity-0 animate-[fade-in-up_0.5s_ease-out_0.9s_forwards] transition-colors duration-200"
            onClick={() => navigate("/")}
          >
            Start New Session
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Download; 