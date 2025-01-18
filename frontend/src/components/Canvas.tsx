import { useRef, useEffect, useState, useCallback } from "react";
import { Annotation, ToolType, SUCCESS_TYPE } from "@/lib/types";

interface CanvasProps {
  imageUrl: string;
  annotations: Annotation[];
  activeTool: ToolType;
  activeLabel: string;
  onAnnotationCreate: (annotation: Omit<Annotation, "id">) => void;
  onAnnotationUpdate: (annotation: Annotation) => void;
  onAnnotationDelete: (id: string) => void;
}

export const Canvas = ({
  imageUrl,
  annotations,
  activeTool,
  activeLabel,
  onAnnotationCreate,
  onAnnotationUpdate,
  onAnnotationDelete,
}: CanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentBox, setCurrentBox] = useState<{ x: number; y: number; width: number; height: number } | null>(null);

  const getMousePos = useCallback((e: React.MouseEvent) => {
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return { x: 0, y: 0 };

    const containerRect = container.getBoundingClientRect();
    const imageRect = image.getBoundingClientRect();

    // Get mouse position relative to the container
    const x = e.clientX - containerRect.left;
    const y = e.clientY - containerRect.top;

    // Constrain to image bounds
    return {
      x: Math.max(0, Math.min(x, imageRect.width)),
      y: Math.max(0, Math.min(y, imageRect.height)),
    };
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (activeTool !== "bbox") return;
    const pos = getMousePos(e);
    setStartPos(pos);
    setDrawing(true);
  }, [activeTool, getMousePos]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!drawing) return;
    const pos = getMousePos(e);
    requestAnimationFrame(() => {
      setCurrentBox({
        x: Math.min(startPos.x, pos.x),
        y: Math.min(startPos.y, pos.y),
        width: Math.abs(pos.x - startPos.x),
        height: Math.abs(pos.y - startPos.y),
      });
    });
  }, [drawing, getMousePos, startPos]);

  const handleMouseUp = useCallback(() => {
    if (!drawing || !currentBox) return;
    setDrawing(false);
    
    if (currentBox.width > 5 && currentBox.height > 5) {
      onAnnotationCreate({
        type: "bbox",
        label: activeLabel,
        coordinates: currentBox,
      });
    }
    
    setCurrentBox(null);
  }, [drawing, currentBox, activeLabel, onAnnotationCreate]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-900 flex items-center justify-center p-4">
      <div 
        ref={containerRef}
        className="relative border-2 border-gray-600 rounded-lg overflow-hidden bg-gray-800 shadow-lg select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <img 
          ref={imageRef}
          src={imageUrl} 
          alt="3D print"
          className="max-w-full max-h-[calc(100vh-8rem)] object-contain select-none"
          draggable={false}
        />
        
        {annotations.map((annotation) => (
          <div
            key={annotation.id}
            className={`absolute border-2 ${
              annotation.label === SUCCESS_TYPE 
                ? "border-green-500 bg-green-500/20" 
                : "border-blue-500 bg-blue-500/20"
            }`}
            style={{
              left: annotation.coordinates.x,
              top: annotation.coordinates.y,
              width: annotation.coordinates.width,
              height: annotation.coordinates.height,
            }}
          >
            <span className={`absolute -top-6 left-0 px-2 py-0.5 text-sm rounded text-white ${
              annotation.label === SUCCESS_TYPE ? "bg-green-500" : "bg-blue-500"
            }`}>
              {annotation.label}
            </span>
          </div>
        ))}

        {currentBox && (
          <div
            className="absolute border-2 border-yellow-500 bg-yellow-500/20"
            style={{
              left: currentBox.x,
              top: currentBox.y,
              width: currentBox.width,
              height: currentBox.height,
            }}
          />
        )}
      </div>
    </div>
  );
};