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
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white p-4">
      <div className="text-center mb-8">
        <img src={mascot} alt="Annomate Mascot" className="w-48 h-48 mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-2">Welcome to Annomate</h1>
        <p className="text-gray-400">Upload your images to start annotating</p>
      </div>

      <div
        className={`w-full max-w-2xl p-8 border-2 border-dashed rounded-lg transition-colors ${
          isDragging
            ? "border-blue-500 bg-blue-500/10"
            : "border-gray-600 hover:border-gray-500"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="text-center">
            <p className="text-lg mb-2">
              Drag and drop your images here, or click to select files
            </p>
            <p className="text-sm text-gray-400">
              Supported formats: PNG, JPG, JPEG
            </p>
          </div>

          <label htmlFor="file-upload">
            <Button
              variant="secondary"
              className="cursor-pointer"
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