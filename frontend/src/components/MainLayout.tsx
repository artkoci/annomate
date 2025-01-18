import { LabelPanel } from "@/components/LabelPanel";
import { ImageNavigator } from "@/components/ImageNavigator";
import { Toolbar } from "@/components/Toolbar";
import { Canvas } from "@/components/Canvas";
import { Annotation, LabelType } from "@/lib/types";
import mascot from "@/assets/mascot.png";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface MainLayoutProps {
  imageUrl: string;
  currentImageIndex: number;
  totalImages: number;
  activeLabel: LabelType;
  annotations: Annotation[];
  onLabelSelect: (label: LabelType) => void;
  onNavigate: (direction: "prev" | "next") => void;
  onAnnotationCreate: (annotation: Omit<Annotation, "id">) => void;
  onAnnotationUpdate: (annotation: Annotation) => void;
  onAnnotationDelete: (id: string) => void;
  onUndo: () => void;
  onClearAll: () => void;
}

export const MainLayout = ({
  imageUrl,
  currentImageIndex,
  totalImages,
  activeLabel,
  annotations,
  onLabelSelect,
  onNavigate,
  onAnnotationCreate,
  onAnnotationUpdate,
  onAnnotationDelete,
  onUndo,
  onClearAll,
}: MainLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Left sidebar */}
      <div className="w-64 p-4 border-r border-gray-700 flex flex-col gap-4">
        <img src={mascot} alt="Annomate Mascot" className="w-24 h-24 mx-auto mb-2" />
        <LabelPanel
          activeLabel={activeLabel}
          onLabelSelect={onLabelSelect}
        />
        <div className="mt-auto flex flex-col gap-4">
          <ImageNavigator
            currentIndex={currentImageIndex}
            totalImages={totalImages}
            onNavigate={onNavigate}
          />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="default" 
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Complete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-gray-800 border-gray-700">
              <AlertDialogHeader>
                <div className="flex items-center gap-2 mb-2">
                  <img src={mascot} alt="Annomate Mascot" className="w-8 h-8" />
                  <AlertDialogTitle className="text-white">Complete Session</AlertDialogTitle>
                </div>
                <AlertDialogDescription className="text-gray-300">
                  Are you sure you want to complete the annotation session?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction 
                  className="bg-green-600 text-white hover:bg-green-700"
                  onClick={() => navigate("/download")}
                >
                  Complete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex">
        <div className="p-4">
          <Toolbar
            onUndo={onUndo}
            onClearAll={onClearAll}
            canUndo={annotations.length > 0}
            canClearAll={annotations.length > 0}
          />
        </div>
        <div className="flex-1 p-4">
          <Canvas
            imageUrl={imageUrl}
            annotations={annotations}
            activeTool="bbox"
            activeLabel={activeLabel}
            onAnnotationCreate={onAnnotationCreate}
            onAnnotationUpdate={onAnnotationUpdate}
            onAnnotationDelete={onAnnotationDelete}
          />
        </div>
      </div>
    </div>
  );
}; 