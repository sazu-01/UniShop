
"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import { api } from "@/app/utili/axiosConfig";
import "@/css/AdminMediaLayout.css";


interface MediaItem {
  carouselImages: string[];
}

export default function AdminMediaLayout() {

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [media, setAllMedia] = useState<MediaItem[]>([]);
  

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return null;

    // Convert FileList to an array
    const files = Array.from(event.target.files);

    setSelectedFiles(files);

    // Generate preview URLs for selected files by URL.createObjectURL
    const previewUrls = files.map((file) => URL.createObjectURL(file));

    // Update state with preview URLs
    setPreviews(previewUrls);
  };


  
  const handleCreateCarousel = async (e: FormEvent) => {
    e.preventDefault(); // Prevents the page from reloading when the form is submitted.
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      // Create a new FormData object to send files
      const formData = new FormData();

      // Append each selected file to the FormData object under the key "carouselImages"
      selectedFiles.forEach((file) => {
        formData.append("carouselImages", file);
      });

      const { data } = await api.post("/media/create-carousel", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Get the new images from the response, ensure the backend returns the uploaded images
      const newImages = data.payload.media.carouselImages;

      // Update the UI immediately by appending new images
      setAllMedia((prevMedia) => {
        return prevMedia.map((item) => ({
          ...item,
          carouselImages: Array.from(
            new Set([...item.carouselImages, ...newImages])
          ), // Append new images
        }));
      });

      setSuccess("Images uploaded successfully!");
      setSelectedFiles([]);
      setPreviews([]);
    } catch (error: any) {
      setError(error.response?.data?.message || "Error uploading images");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };




  //handle get carousel
  const handleGetAllCarousel = async () => {
    try {
      const { data } = await api.get("/media/all-media");

      setAllMedia(data.payload.allMedia);
    } catch (error) {
      console.log(`error in get carousel`, error);
    }
  };



  // Handle delete image
  const handleDeleteCarousel = async (image: string) => {
    try {
      await api.delete("/media/delete-carousel", {
        data: { imageUrl: image }, // Send image URL in request body
      });
      // Update media state to remove the deleted image
      setAllMedia((prevMedia) =>
        prevMedia.map((item) => ({
          ...item,
          carouselImages: item.carouselImages.filter((img) => img !== image),
        }))
      );

      //remove carousel from redux store
      // dispatch(removeFromCarousel(image));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };


  useEffect(() => {
    handleGetAllCarousel();
  }, []);


  // Cleanup preview URLs when component unmounts
  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);


  return (
    <div id="admin-media-layout" className="admin-media-layout">
      <div className="media-content">
        <form onSubmit={handleCreateCarousel} className="upload-form">
          <div className="file-input-container">
            <input
              type="file"
              multiple={true}
              onChange={handleFileSelect}
              accept="image/*"
              className="file-input"
            />
          </div>

          {/* Preview Section */}
          {media.length > 0 && (
            <div className="preview-grid">
              {previews.map((preview, index) => (
                <div key={index} className="preview-item">
                  <Image 
                    width={500}
                    height={500}
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="preview-image"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Error Message */}
          {error && <div className="error-message">{error}</div>}

          {/* Success Message */}
          {success && <div className="success-message">{success}</div>}

          <button
            type="submit"
            disabled={isLoading || selectedFiles.length === 0}
            className={`upload-button ${
              isLoading || selectedFiles.length === 0 ? "disabled" : "active"
            }`}
          >
            {isLoading ? "Uploading..." : "Upload Images"}
          </button>
        </form>

        {/*all media render */}
        <div className="image-gallery">
          {media.map((item) =>
            item.carouselImages.map((image, index) => (
              <div key={index} className="image-card">
                <Image src={image} alt="" className="image" />
                <div className="image-actions">
                  <button
                    onClick={() => handleDeleteCarousel(image)}
                    className="action-button delete-button"
                  >
                    Delete Image
                  </button>
                  
                
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
