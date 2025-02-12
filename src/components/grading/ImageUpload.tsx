import React, { useEffect, useRef, useState } from "react";
import { Upload, RefreshCw } from "lucide-react";

interface ImageUploadProps {
  previewImage: string | null;
  showCamera: boolean;
  isGrading: boolean;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onStartCamera: () => void;
  onStopCamera: () => void;
  onCapturePhoto: () => void;
  onResetImage: () => void;
  onStartGrading: () => void;
  videoRef: React.RefObject<HTMLVideoElement>;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  previewImage,
  showCamera,
  isGrading,
  onFileUpload,
  onStartCamera,
  onStopCamera,
  onCapturePhoto,
  onResetImage,
  onStartGrading,
  videoRef,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];

    if (file && file.type.startsWith("image/")) {
      const fileList = new DataTransfer();
      fileList.items.add(file);

      if (fileInputRef.current) {
        fileInputRef.current.files = fileList.files;

        const changeEvent = new Event("change", { bubbles: true });
        fileInputRef.current.dispatchEvent(changeEvent);
      }
    }
  };



  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Grade Your Tomatoes</h2>
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {showCamera ? (
          <div className="space-y-4">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full rounded-lg"
            />
            <div className="flex justify-center space-x-4">
              <button
                onClick={onCapturePhoto}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Take Photo
              </button>
              <button
                onClick={onStopCamera}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : previewImage ? (
          <div className="space-y-4">
            <img
              src={previewImage}
              alt="Preview"
              className="max-w-full h-auto rounded-lg"
            />
            <div className="flex justify-center space-x-4">
              <button
                onClick={onResetImage}
                className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Retake Photo</span>
              </button>
              {!isGrading && (
                <button
                  onClick={onStartGrading}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
                >
                  Start Grading
                </button>
              )}
            </div>
          </div>
        ) : (
          <div>
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Drag and drop your tomato images here, or choose an option below
            </p>
            <div className="mt-4 flex flex-col space-y-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Upload Image
              </button>
              <button
                onClick={onStartCamera}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Take Photo
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={onFileUpload}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
