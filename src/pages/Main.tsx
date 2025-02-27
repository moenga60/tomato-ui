import React, { useState, useRef, useEffect } from "react";
import { Navigation } from "../components/layout/Navigation";
import { Features } from "../components/layout/Features";
import { ImageUpload } from "../components/grading/ImageUpload";
import { GradingResults } from "../components/grading/GradingResults";
import { ProductFilters } from "../components/marketplace/ProductFilters";
import { ProductCard } from "../components/marketplace/ProductCard";
import { AlertCircle } from "lucide-react";

import { vendors, products } from "../data/sampleData";
import axios from "axios";

function Main() {
  const [activeTab, setActiveTab] = useState("grade");
  const [selectedGrade, setSelectedGrade] = useState<string>("all");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isGrading, setIsGrading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const filteredProducts =
    selectedGrade === "all"
      ? products
      : products.filter((product) => product.grade === selectedGrade);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setShowCamera(false);
      setIsGrading(false);
      setCameraError(null);
    }
  };

  const startCamera = async () => {
    try {
      setCameraError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      });

      console.log("taking feed", mediaStream);
      setShowCamera(true);
      setStream(mediaStream);

      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play().catch((error) => {
            console.error("Error playing video:", error);
          });

          console.log("VideoRef assigned:", videoRef.current);
        } else {
          console.warn("videoRef is still null after timeout");
        }
      }, 500);

      setPreviewImage(null);
      setIsGrading(false);
    } catch (error) {
      console.error("Error accessing camera:", error);
      setCameraError(
        "Unable to access camera. Please ensure you have granted camera permissions."
      );
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setShowCamera(false);
    setCameraError(null);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageUrl = canvas.toDataURL("image/jpeg", 0.8);
        setPreviewImage(imageUrl);
        stopCamera();
      }
      videoRef.current.srcObject = null;
    }
  };

  const resetImage = () => {
    setPreviewImage(null);
    setCameraError(null);
  };

  const startGrading = () => {
    console.log("This is the captured image", previewImage);
    setIsLoading(true);
    setTimeout(() => {
      setIsGrading(true);
      setIsLoading(false);
    }, 3000);
  };

  const handleContactClick = (vendor: (typeof vendors)[0]) => {
    const message = encodeURIComponent(
      `Hello ${vendor.name}, I'm interested in your tomatoes listed on TomatoGrade AI. Could you provide more information?`
    );
    window.open(`https://wa.me/${vendor.phone}?text=${message}`, "_blank");
  };

  const Testing = async() => {
    try {
      const response = await axios.get("http://localhost:8000/api/users/");
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    Testing();
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab("grade")}
            className={`px-4 py-2 rounded-lg ${
              activeTab === "grade"
                ? "bg-red-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            Quality Grading
          </button>
          <button
            onClick={() => setActiveTab("marketplace")}
            className={`px-4 py-2 rounded-lg ${
              activeTab === "marketplace"
                ? "bg-red-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            Marketplace
          </button>
        </div>

        {activeTab === "grade" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ImageUpload
              previewImage={previewImage}
              showCamera={showCamera}
              isGrading={isGrading}
              onFileUpload={handleFileUpload}
              onStartCamera={startCamera}
              onStopCamera={stopCamera}
              onCapturePhoto={capturePhoto}
              onResetImage={resetImage}
              onStartGrading={startGrading}
              videoRef={videoRef}
            />
            <GradingResults isGrading={isGrading} isLoading={isLoading}/>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <ProductFilters
              selectedGrade={selectedGrade}
              onGradeChange={setSelectedGrade}
            />
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onContact={handleContactClick}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <Features />

      {cameraError && (
        <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            {cameraError}
          </p>
        </div>
      )}
    </div>
  );
}

export default Main;
