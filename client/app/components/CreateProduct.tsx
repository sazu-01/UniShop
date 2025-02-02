

"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import { api } from '../utili/axiosConfig';

import "@/css/AdminProductDashbaord.css"

interface productFormData {
    title: string;
    description: string;
    category: string;
    quantity: string;
    brand: string;
    price: string;
    status: 'add-to-cart' | 'not-available' | 'in-stock';
    summary: string;
}

interface Category {
    _id : string,
    name : string,
}

export default function CreateProduct() {

    const [formData, setFormData] = useState<productFormData>({
        title: "",
        description: "",
        category: "", // This will store the category ObjectId
        quantity: "",
        brand: "",
        price: "",
        status: "add-to-cart",
        summary: ""
    });

    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Fetch categories when component mounts
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('/categories/all-category');
                setCategories(response.data.payload.categories || []);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setError('Failed to load categories');
            }
        };

        fetchCategories();
    }, []);


    const handleChange = (e : ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name] : value
        }))
    }

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            // Update image files
            setImageFiles(prevFiles => [...prevFiles, ...files]);
            
            // Create preview URLs for the new images
            const newImageUrls = files.map(file => URL.createObjectURL(file));
            setSelectedImages(prevImages => [...prevImages, ...newImageUrls]);
        }
    };

   // Add function to remove images
   const removeImage = (index: number) => {
    setSelectedImages(prevImages => prevImages.filter((_, i) => i !== index));
    setImageFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
};

    const handleSubmit = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Create FormData object to handle file upload
            const productFormData = new FormData();

            // Append all form fields to FormData
            (Object.keys(formData) as Array<keyof productFormData>).forEach(key => {
                productFormData.append(key, formData[key]);
            });

              // Append multiple images
              imageFiles.forEach((file) => {
                productFormData.append('images', file);
            });

            const response = await api.post('/products/create-product', productFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                alert("Product created successfully!");
                // Reset form
                setFormData({
                    title: "",
                    description: "",
                    category: "",
                    quantity: "",
                    brand: "",
                    price: "",
                    status: "add-to-cart",
                    summary: ""
                });
                setSelectedImages([]);
                setImageFiles([]);
            } else {
                setError(response.data.message || "Failed to create product");
            }
        } catch (error : any) {
            console.error(error);
            setError(error.response?.data?.message || "Error creating product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="create-product-form" onSubmit={handleSubmit}>
            <h2 className="form-title">Create New Product</h2>
            
            {error && <div className="error-message">{error}</div>}

            <div className="form-row">
                <label className="form-label">Product Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter product title"
                    required
                />
            </div>

            <div className="form-row">
                <label className="form-label">Product Images</label>
                <div className="image-upload-container">
                    {/* Display existing images */}
                    <div className="image-preview-grid">
                        {selectedImages.map((image, index) => (
                            <div key={index} className="image-preview-item">
                                <div className="image-preview-wrapper">
                                    <Image
                                        src={image}
                                        alt={`Preview ${index + 1}`}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="remove-image-button"
                                    >
                                        ×
                                    </button>
                                </div>
                            </div>
                        ))}
                        
                        {/* Upload button */}
                        <div className="image-upload-box">
                            <div className="image-upload-text">
                                <span>+ Add Images</span>
                            </div>
                            <input
                                type="file"
                                onChange={handleImageChange}
                                accept="image/*"
                                multiple
                                style={{ opacity: 0, position: "absolute", inset: 0 }}
                                required={imageFiles.length === 0}
                            />
                        </div>
                    </div>
                </div>
            </div>




            <div className="form-row">
                <label className="form-label">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="form-input form-textarea"
                    placeholder="Enter product description"
                    required
                ></textarea>
            </div>

            <div className="form-row">
                <label className="form-label">Category</label>
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="form-select"
                    required
                >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                        <option 
                            key={category?._id} 
                            value={category?._id} 
                        >
                            {category?.name}
                        </option>
                    ))}
                </select>
            </div>


            <div className="form-row">
                <label className="form-label">Brand</label>
                <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter product brand"
                    required
                />
            </div>

            <div className="form-row">
                <label className="form-label">Quantity</label>
                <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter product quantity"
                    min="0"
                    required
                />
            </div>

            <div className="form-row">
                <label className="form-label">Price</label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter product price"
                    min="0"
                    step="0.01"
                    required
                />
            </div>

            <div className="form-row">
                <label className="form-label">Status</label>
                <select 
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="form-select"
                    required
                >
                    <option value="add-to-cart">Add To Cart</option>
                    <option value="not-available">Not Available</option>
                    <option value="in-stock">In Stock</option>
                </select>
            </div>

            <div className="form-row">
                <label className="form-label">Summary</label>
                <textarea
                    name="summary"
                    value={formData.summary}
                    onChange={handleChange}
                    className="form-input form-textarea"
                    placeholder="Enter product summary"
                    required
                ></textarea>
            </div>

            <button 
                type="submit" 
                className="submit-button" 
                disabled={loading}
            >
                {loading ? "Creating..." : "Create Product"}
            </button>
        </form>
    );
}