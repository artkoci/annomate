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
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white p-4 overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-50">
          <div className="absolute top-1/2 left-0 h-[40rem] w-[40rem] -translate-y-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-500/50 to-purple-500/50 blur-3xl animate-pulse" />
          <div className="absolute top-1/2 right-0 h-[40rem] w-[40rem] translate-y-1/2 translate-x-1/2 rounded-full bg-gradient-to-l from-emerald-500/50 to-green-500/50 blur-3xl animate-pulse delay-700" />
        </div>
      </div>

      <div className="relative text-center mb-8">
        <div className="relative">
          <img src={mascot} alt="Annomate Mascot" className="w-48 h-48 mx-auto mb-6 animate-bounce" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent pointer-events-none" />
        </div>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-violet-400 text-transparent bg-clip-text animate-in slide-in-from-bottom duration-1000">
          Welcome to Annomate
        </h1>
        <p className="text-gray-300 text-lg animate-in slide-in-from-bottom duration-1000 delay-200">
          Upload your images to start annotating
        </p>
      </div>

      <div
        className={`relative w-full max-w-2xl p-8 border-2 border-dashed rounded-lg transition-all duration-300 backdrop-blur-sm ${
          isDragging
            ? "border-emerald-400 bg-emerald-500/10 scale-102 shadow-2xl shadow-emerald-500/20"
            : "border-violet-400/50 hover:border-violet-400 bg-gray-900/50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="text-center">
            <p className="text-xl mb-3 font-medium">
              Drag and drop your images here, or click to select files
            </p>
            <p className="text-gray-300">
              Supported formats: PNG, JPG, JPEG
            </p>
          </div>

          <label htmlFor="file-upload">
            <Button
              variant="default"
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 cursor-pointer shadow-lg shadow-emerald-500/20 animate-in zoom-in duration-500 delay-500"
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