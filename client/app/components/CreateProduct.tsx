

"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';

import "@/css/AdminProductDashbaord.css"

interface productFormData {
    title: string;
    category: string;
    suplr: string;
    retailPrice: string;
    salePrice: string;
    discount: string,
    pId: string,
    pType: string,
    status: 'add-to-cart' | 'not-available' | 'in-stock';
    size: string[],
    ytLink: string,
    description: string
}

interface Category {
    _id: string,
    name: string,
}

export default function CreateProduct() {

    const [formData, setFormData] = useState<productFormData>({
        title: "",
        category: "", // This will store the category ObjectId
        suplr: "", //short form supplier
        retailPrice: "",
        salePrice: "",
        discount: "",
        status: "add-to-cart",
        pId: "",
        pType: "",
        size: [],
        ytLink: "",
        description: "",
    });

    const [categories, setCategories] = useState<Category[]>([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [newSize, setNewSize] = useState("");
    const [specification, setSpecification] = useState<{ key: string, value: string }[]>([]);
    const [newSpec, setNewSpec] = useState({ key: "", value: "" });
    const commonSizes = ["XS", "S", "M", "L", "XL", "XXL"];
    const [colorImages, setColorImages] = useState<{ color: string; files: File[] }[]>([]);
    const [currentColor, setCurrentColor] = useState("");
    const [simpleImages, setSimpleImages] = useState<File[]>([]);
    const [imageUploadMode, setImageUploadMode] = useState<'simple' | 'color'>('simple');


    // Simple image upload handlers
    const handleSimpleImageUpload = (files: FileList | null) => {
        if (!files) return;
        const newFiles = Array.from(files);
        const fileNames = new Set(simpleImages.map(f => f.name));
        const uniqueFiles = newFiles.filter(f => !fileNames.has(f.name));
        setSimpleImages(prev => [...prev, ...uniqueFiles]);
    };

    const removeSimpleImage = (index: number) => {
        setSimpleImages(prev => prev.filter((_, i) => i !== index));
    };

    // Add a new color group
    const addColorGroup = () => {
        if (!currentColor.trim()) return;
        setColorImages(prev => [...prev, { color: currentColor.trim(), files: [] }]);
        setCurrentColor("");
    };

    // Add images to a color group
    const handleColorImageUpload = (index: number, files: FileList | null) => {
        if (!files) return;
        setColorImages(prev => {
            const updated = [...prev];
            const newFiles = Array.from(files);
            const fileNames = new Set(updated[index].files.map(f => f.name));
            const uniqueFiles = newFiles.filter(f => !fileNames.has(f.name));
            updated[index].files.push(...uniqueFiles);
            return updated;
        });
    };


    // Remove a color group
    const removeColorGroup = (index: number) => {
        setColorImages(prev => prev.filter((_, i) => i !== index));
    };


    const removeImageFromColorGroup = (groupIndex: number, imageIndex: number) => {
        setColorImages(prev => {
            const updated = [...prev];
            updated[groupIndex].files = updated[groupIndex].files.filter((_, i) => i !== imageIndex);
            return updated;
        });
    };


    // Switch between upload modes
    const switchImageMode = (mode: 'simple' | 'color') => {
        setImageUploadMode(mode);
        // Clear the other mode's data when switching
        if (mode === 'simple') {
            setColorImages([]);
            setCurrentColor("");
        } else {
            setSimpleImages([]);
        }
    };


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

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formDataObj = new FormData();

        if (imageUploadMode === 'color') {
            // Handle color-grouped images (existing logic)
            const colorImagesMeta = colorImages.map(ci => ({
                color: ci.color,
                files: ci.files.map(f => f.name)
            }));
            formDataObj.append("colorImages", JSON.stringify(colorImagesMeta));

            colorImages.forEach(ci => {
                ci.files.forEach(file => {
                    formDataObj.append("images", file);
                });
            });
        } else {
            // Handle simple images (no color grouping)
            const simpleImagesMeta = [{
                color: "", // Empty color for simple images
                files: simpleImages.map(f => f.name)
            }];
            formDataObj.append("colorImages", JSON.stringify(simpleImagesMeta));

            simpleImages.forEach(file => {
                formDataObj.append("images", file);
            });
        }

        // Append other form fields
        (Object.keys(formData) as Array<keyof typeof formData>).forEach(key => {
            const value = formData[key];
            if (Array.isArray(value)) {
                value.forEach(item => formDataObj.append(key, item));
            } else {
                formDataObj.append(key, value as string);
            }
        });
        formDataObj.append("specification", JSON.stringify(specification));

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products/create-product`, {
                method: "POST",
                credentials: "include",
                body: formDataObj
            });
            const data = await res.json();

            if (data.success) {
                alert("Product created successfully!");
                setFormData({
                    title: "",
                    category: "",
                    suplr: "",
                    retailPrice: "",
                    salePrice: "",
                    discount: "",
                    pId: "",
                    pType: "",
                    status: "add-to-cart",
                    size: [],
                    ytLink: "",
                    description: "",
                });
                setColorImages([]);
                setSimpleImages([]);
                setSpecification([]);
            } else {
                setError(data.message || "Failed to create product");
            }
        } catch (error) {
            setError("Network error occurred");
            console.log(error)
        }
        setLoading(false);
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

                {/* Image Upload Mode Selector */}
                <div className="image-mode-selector">
                    <button
                        type="button"
                        className={`mode-button ${imageUploadMode === 'simple' ? 'active' : ''}`}
                        onClick={() => switchImageMode('simple')}
                    >
                        Simple Images
                    </button>
                    <button
                        type="button"
                        className={`mode-button ${imageUploadMode === 'color' ? 'active' : ''}`}
                        onClick={() => switchImageMode('color')}
                    >
                        Color Grouped Images
                    </button>
                </div>

                {/* Simple Image Upload */}
                {imageUploadMode === 'simple' && (
                    <div className="simple-image-upload">
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => handleSimpleImageUpload(e.target.files)}
                            className="form-input"
                        />
                        {simpleImages.length > 0 && (
                            <div className="uploaded-images">
                                <h4>Uploaded Images:</h4>
                                <div className="image-list">
                                    {simpleImages.map((file, index) => (
                                        <div key={index} className="image-item">
                                            <span className="image-name">{file.name}</span>
                                            <button
                                                type="button"
                                                onClick={() => removeSimpleImage(index)}
                                                className="remove-button"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Color Grouped Image Upload */}
                {imageUploadMode === 'color' && (
                    <div className="color-image-upload">
                        <div className="add-color-section">
                            <input
                                type="text"
                                value={currentColor}
                                onChange={(e) => setCurrentColor(e.target.value)}
                                placeholder="Enter color name"
                                className="form-input"
                            />
                            <button type="button" onClick={addColorGroup} className="add-button">
                                Add Color
                            </button>
                        </div>

                        {colorImages.map((ci, index) => (
                            <div key={index} className="color-group">
                                <div className="color-header">
                                    <h4>Color: {ci.color}</h4>
                                    <button type="button" onClick={() => removeColorGroup(index)} className="remove-button">
                                        Remove Color
                                    </button>
                                </div>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={(e) => handleColorImageUpload(index, e.target.files)}
                                    className="form-input"
                                />
                                {ci.files.length > 0 && (
                                    <div className="color-images">
                                        {ci.files.map((file, idx) => (
                                            <div key={idx} className="image-item">
                                                <span className="image-name">{file.name}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeImageFromColorGroup(index, idx)}
                                                    className="remove-button"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>


            {/* size selection */}
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
                <label className="form-label">Retail Price</label>
                <input
                    type="number"
                    name="retailPrice"
                    value={formData.retailPrice}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter product price"
                    min="0"
                    step="0.01"
                    required
                />
            </div>


            <div className="form-row">
                <label className="form-label">Sale Price</label>
                <input
                    type="number"
                    name="salePrice"
                    value={formData.salePrice}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter product price"
                    min="0"
                    step="0.01"
                    required
                />
            </div>


            <div className="form-row">
                <label className="form-label">Discount</label>
                <input
                    type="number"
                    name="discount"
                    value={formData.discount}
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
                <label className="form-label">Youtube Video Demo</label>
                <input
                    type="text"
                    name="ytLink"
                    value={formData.ytLink}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter product video demo link"
                />
            </div>

            <div className="form-row">
                <label className="form-label">Description</label>
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter product description"
                />
            </div>

            <div className="form-row">
                <label className="form-label">Product Type</label>
                <input
                    type="text"
                    name="pType"
                    value={formData.pType}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter product product type"
                />
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