import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useImages } from "@/context/ImageContext";
import mascot from "@/assets/mascot.png";

export const Landing = () => {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const { addImages } = useImages();

  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    addImages(files);
    toast.success(`${files.length} images uploaded successfully`);
    navigate("/annotate");
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white p-4 animate-gradient-shift bg-[length:400%_400%]">
      <div className="text-center mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent blur-3xl -z-10" />
        <img 
          src={mascot} 
          alt="Annomate Mascot" 
          className="w-48 h-48 mx-auto mb-6 animate-float drop-shadow-[0_0_15px_rgba(34,197,94,0.2)]" 
        />
        <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent animate-pulse">
          Welcome to Annomate
        </h1>
        <p className="text-lg text-gray-300 animate-fade-in-up">
          Upload your images to start annotating
        </p>
      </div>

      <div
        className={`w-full max-w-2xl p-8 rounded-xl backdrop-blur-md transition-all duration-300 animate-scale-up ${
          isDragging
            ? "bg-emerald-500/20 border-2 border-emerald-400 shadow-[0_0_30px_rgba(34,197,94,0.2)]"
            : "bg-gray-800/50 border border-gray-700 hover:bg-gray-800/80 hover:border-emerald-900"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="text-center">
            <p className="text-xl mb-2 font-medium">
              Drag and drop your images here
            </p>
            <p className="text-sm text-gray-400">
              Supported formats: PNG, JPG, JPEG
            </p>
          </div>

          <label htmlFor="file-upload">
            <Button
              variant="secondary"
              className="cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-emerald-900/50"
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              Select Files
            </Button>
          </label>

          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept="image/png,image/jpeg,image/jpg"
            multiple
            onChange={(e) => handleFileUpload(e.target.files)}
          />
        </div>
      </div>
    </div>
  );
}; 