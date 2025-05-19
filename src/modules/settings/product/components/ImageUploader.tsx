
import React, { useState } from "react";
import { Upload, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploaderProps {
  initialImage?: string;
  onImageChange: (imageUrl: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ initialImage, onImageChange }) => {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(initialImage);
  const [isHovering, setIsHovering] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Create a file URL
    const fileUrl = URL.createObjectURL(file);
    setPreviewUrl(fileUrl);
    onImageChange(fileUrl);
    
    // In a real app, you would upload to server here and get back a URL
    // For this demo, we're just using the local object URL
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <label 
        className="relative block w-32 h-32 cursor-pointer rounded-md overflow-hidden border-2 border-dashed border-gray-300 hover:border-green-500 bg-gray-50"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {previewUrl ? (
          <div className="w-full h-full relative">
            <img 
              src={previewUrl} 
              alt="Product" 
              className="w-full h-full object-cover" 
              onError={() => setPreviewUrl(undefined)}
            />
            {isHovering && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <Pencil className="text-white w-6 h-6" />
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-4">
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-xs text-center text-gray-500">Upload Image</span>
          </div>
        )}
        <input 
          type="file" 
          accept="image/*" 
          className="hidden" 
          onChange={handleFileChange} 
        />
      </label>
      <p className="text-xs text-gray-500">
        {previewUrl ? "Click to change image" : "Upload product image"}
      </p>
    </div>
  );
};

export default ImageUploader;
