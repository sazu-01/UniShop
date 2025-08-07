

"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';

import "@/css/AdminProductDashbaord.css"

interface productFormData {
    title: string;
    category: string;
    suplr: string;
    price: string;
    pId: string,
    status: 'add-to-cart' | 'not-available' | 'in-stock';
    size: string[],
}

interface Category {
    _id: string,
    name: string,
}

export default function CreateProduct() {

    const [formData, setFormData] = useState<productFormData>({
        title: "",
        category: "", // This will store the category ObjectId
        suplr: "", //full form supplier
        price: "",
        status: "add-to-cart",
        pId: "",
        size: []
    });

    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [newSize, setNewSize] = useState("");
    const [specification, setSpecification] = useState<{ key: string, value: string }[]>([]);
    const [newSpec, setNewSpec] = useState({ key: "", value: "" });

    const commonSizes = ["XS", "S", "M", "L", "XL", "XXL"];

    // Add function to add common size
    const addCommonSize = (size: string) => {
        if (!formData.size.includes(size)) {
            setFormData(prev => ({
                ...prev,
                size: [...prev.size, size]
            }));
        }
    };

    // Add function to add custom size
    const addCustomSize = () => {
        if (newSize && !formData.size.includes(newSize)) {
            setFormData(prev => ({
                ...prev,
                size: [...prev.size, newSize]
            }));
            setNewSize(""); // Clear input after adding
        }
    };

    // Remove size function
    const removeSize = (sizeToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            size: prev.size.filter(size => size !== sizeToRemove)
        }));
    };

    // Fetch categories when component mounts
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories/all-category`, {
                    method: "GET",
                    credentials: "include",
                });

                const data = await res.json();
                setCategories(data.payload.categories || []);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setError('Failed to load categories');
            }
        };

        fetchCategories();
    }, []);


    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
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

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Create FormData object to handle file upload
            const productFormData = new FormData();

            // Append all form fields to FormData
            (Object.keys(formData) as Array<keyof productFormData>).forEach(key => {
                if (key === 'size') {
                    // Handle size array specially
                    formData.size.forEach(size => {
                        productFormData.append('size', size);
                    });
                } else {
                    productFormData.append(key, formData[key]);
                }
            });

            productFormData.append("specification", JSON.stringify(specification));

            // Append multiple images
            imageFiles.forEach((file) => {
                productFormData.append('images', file);
            });

            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products/create-product`, {
                method: "POST",
                credentials: "include",
                body: productFormData
            });

            const data = await res.json()

            if (data.success) {
                alert("Product created successfully!");
                // Reset form
                setFormData({
                    title: "",
                    category: "",
                    suplr: "",
                    price: "",
                    pId: "",
                    status: "add-to-cart",
                    size: [],
                });
                setSelectedImages([]);
                setImageFiles([]);
            } else {
                setError(data.message || "Failed to create product");
            }
        } catch (error: any) {
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
                <label className="form-label">Sizes</label>
                <div className="size-selection">
                    <div className="common-sizes">
                        {commonSizes.map(size => (
                            <button
                                key={size}
                                type="button"
                                className={`size-button ${formData.size.includes(size) ? 'selected' : ''}`}
                                onClick={() => addCommonSize(size)}
                            >
                                {size}
                            </button>
                        ))}
                    </div>

                    <div className="custom-size-input">
                        <input
                            type="text"
                            value={newSize}
                            onChange={(e) => setNewSize(e.target.value)}
                            className="form-input"
                            placeholder="Add custom size"
                        />
                        <button
                            type="button"
                            onClick={addCustomSize}
                            className="add-size-button"
                            disabled={!newSize}
                        >
                            Add
                        </button>
                    </div>

                    {formData.size.length > 0 && (
                        <div className="selected-sizes">
                            <label>Selected Sizes:</label>
                            <div className="size-tags">
                                {formData.size.map(size => (
                                    <div key={size} className="size-tag">
                                        {size}
                                        <button
                                            type="button"
                                            onClick={() => removeSize(size)}
                                            className="remove-size-button"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
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
                <label className="form-label">Supplier</label>
                <input
                    type="text"
                    name="suplr"
                    value={formData.suplr}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter product supplier"
                />
            </div>


            <div className="form-row">
                <label className="form-label">Product Id</label>
                <input
                    type="text"
                    name="pId"
                    value={formData.pId}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter product Id"
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
                <label className="form-label">Specifications</label>
                <div className="specification-input">
                    <input
                        type="text"
                        value={newSpec.key}
                        onChange={(e) => setNewSpec((prev) => ({ ...prev, key: e.target.value }))}
                        className="form-input mb-4"
                        placeholder="Key (e.g., Material)"
                    />
                    <input
                        type="text"
                        value={newSpec.value}
                        onChange={(e) => setNewSpec((prev) => ({ ...prev, value: e.target.value }))}
                        className="form-input mb-4"
                        placeholder="Value (e.g., Cotton)"
                    />
                    <button
                        type="button"
                        className="add-size-button"
                        onClick={() => {
                            if (newSpec.key && newSpec.value) {
                                setSpecification((prev) => [...prev, newSpec]);
                                setNewSpec({ key: "", value: "" });
                            }
                        }}
                    >
                        Add Spec
                    </button>
                </div>

                {specification.length > 0 && (
                    <ul className="spec-list">
                        {specification.map((spec, index) => (
                            <li key={index}>
                                {spec.key}: {spec.value}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setSpecification((prev) => prev.filter((_, i) => i !== index))
                                    }
                                    className="remove-size-button"
                                >
                                    ×
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
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