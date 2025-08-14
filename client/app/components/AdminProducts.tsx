
"use client";
import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import Image from "next/image";
import { useAppSelector } from "@/app/lib/hook";
import { FaTrash, FaPen } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import { ProductType } from "../types/SliceTypes";
import { Category } from "../types/SliceTypes";
import "@/css/AdminProductDashbaord.css";


export default function AdminProducts() {

  const { products } = useAppSelector((state) => state.products);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null
  );
  const [categories, setCategories] = useState<Category[]>([]);

  const [updateFormData, setUpdateFormData] = useState({
    title: "",
    category: "",
    suplr: "",
    retailPrice: 0,
    salePrice: 0,
    discount: 0,
    pId: "",
    pType: "",
    size: [""],
    ytLink: "",
    featured: false,
    description: "",
    images: [] as (File | string)[],
    specification: [{ key: "", value: "" }],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Image upload states
  const [imageUploadMode, setImageUploadMode] = useState<'simple' | 'color'>('simple');
  const [colorImages, setColorImages] = useState<{ color: string; files: File[] }[]>([]);
  const [simpleImages, setSimpleImages] = useState<File[]>([]);
  const [currentColor, setCurrentColor] = useState("");


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


  // Color image handlers
  const addColorGroup = () => {
    if (!currentColor.trim()) return;
    setColorImages(prev => [...prev, { color: currentColor.trim(), files: [] }]);
    setCurrentColor("");
  };


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
    if (mode === 'simple') {
      setColorImages([]);
      setCurrentColor("");
    } else {
      setSimpleImages([]);
    }
  };

  // Handle opening the update modal
  const openUpdateModal = (product: ProductType) => {
    setSelectedProduct(product);
    setUpdateFormData({
      title: product.title,
      category: product.category._id,
      suplr: product.suplr,
      retailPrice: product.retailPrice,
      salePrice: product.salePrice,
      discount: product.discount,
      images: [],
      pId: product.pId || "",
      pType: product.pType || "",
      size: product.size || [""],
      ytLink: product.ytLink || "",
      description: product.description || "",
      specification: product.specification || [{ key: "", value: "" }],
      featured: product.featured || false,
    });

    
    // Reset image states
    setImageUploadMode('simple');
    setColorImages([]);
    setSimpleImages([]);
    setCurrentColor("");
    setIsUpdateModalOpen(true);
  };

  

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories/all-category`, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        setCategories(data.payload.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Handle update form changes
  const handleUpdateChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUpdateFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle deleting a product
  const handleDeleteProduct = async (slug: string | undefined) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products/delete-product/${slug}`, {
        method: "DELETE",
        credentials: "include"
      });
      const data = await res.json();
      if (data.success) {
        alert("Product deleted successfully");
      } else {
        alert(data.message || "Failed to delete product");
      }
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || "Error deleting product");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedProduct?.slug) return;

    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("title", updateFormData.title);
      formData.append("category", updateFormData.category);
      formData.append("suplr", updateFormData.suplr);
      formData.append("pId", updateFormData.pId);
      formData.append("pType", updateFormData.pType);
      formData.append("ytLink", updateFormData.ytLink);
      formData.append("description", updateFormData.description);
      formData.append("retailPrice", updateFormData.retailPrice.toString());
      formData.append("salePrice", updateFormData.salePrice.toString());
      formData.append("discount", updateFormData.discount.toString());      
      formData.append("size", JSON.stringify(updateFormData.size));
      formData.append("specification", JSON.stringify(updateFormData.specification));
      formData.append("featured", updateFormData.featured ? "true" : "false");

       // Handle images based on upload mode
      if (imageUploadMode === 'color' && colorImages.length > 0) {

        // Handle color-grouped images
        const colorImagesMeta = colorImages.map(ci => ({
          color: ci.color,
          files: ci.files.map(f => f.name)
        }));

        formData.append("colorImages", JSON.stringify(colorImagesMeta));

        
        colorImages.forEach(ci => {
          ci.files.forEach(file => {
            formData.append("images", file);
          });
        });

      } else if (imageUploadMode === 'simple' && simpleImages.length > 0) {

        // Handle simple images
        const simpleImagesMeta = [{
          color: "", // Empty color for simple images
          files: simpleImages.map(f => f.name)
        }];

        formData.append("colorImages", JSON.stringify(simpleImagesMeta));

        simpleImages.forEach(file => {
          formData.append("images", file);

        });

      }


      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/products/update-product/${selectedProduct.slug}`,
        {
          method: "PUT",
          credentials: "include",
          body: formData, // no headers needed for FormData
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Product updated successfully");
        setIsUpdateModalOpen(false);
         // Reset states

        setColorImages([]);

        setSimpleImages([]);
        // Optional: refresh products list here
      } else {
        setError(data.message || "Failed to update product");
      }
    } catch (error: any) {
      console.error(error);
      setError(error.response?.data?.message || "Error updating product");
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <div className="products-grid">
        {products?.map((product, index) => (
          <div key={index} className="product-card">
            <div className="product-image-container">

  {product.images?.[0]?.url?.[0] ? (
                <Image
                  src={product.images[0].url[0]}
                  alt={product.title}
                  layout="fill"
                  className="product-image"
                />
              ) : (
                <div className="no-image-placeholder">No image</div>
              )}

            </div>
            <div className="product-details">
              <h3 className="product-title">{product.title}</h3>
              <div className="product-actions">
                <span className="product-price">TK. {product.retailPrice}</span>
                <div>
                  <button
                    className="action-button edit-button"
                    onClick={() => openUpdateModal(product)}
                    disabled={loading}
                  >
                    <FaPen />
                  </button>
                  <button
                    className="action-button delete-button"
                    onClick={() => handleDeleteProduct(product.slug)}
                    disabled={loading}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Update Product Modal */}
      {isUpdateModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Update Product</h2>
              <button
                className="close-button"
                onClick={() => setIsUpdateModalOpen(false)}
              >
                <AiOutlineClose />
              </button>
            </div>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleUpdateProduct} className="update-form">
              <div className="form-row">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  name="title"
                  value={updateFormData.title}
                  onChange={handleUpdateChange}
                  className="form-input"
                  required
                />
              </div>

             {/*image upload section*/}

                 {/* Image Upload Section */}

              <div className="form-row">
                <label className="form-label">Update Product Images (Optional)</label>
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
                        <h4>New Images:</h4>
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


              {/*category section */}
              <div className="form-row">
                <label className="form-label">Category</label>
                <select
                  name="category"
                  value={updateFormData.category}
                  onChange={handleUpdateChange}
                  className="form-input"
                  required
                >
                  <option value="">Select Category</option>
                  {categories?.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <label className="form-label">Sizes</label>
                {updateFormData.size.map((sz, index) => (
                  <div key={index} style={{ display: "flex", gap: "10px", marginBottom: "8px" }}>
                    <input
                      type="text"
                      placeholder="Size"
                      value={sz}
                      onChange={(e) => {
                        const updated = [...updateFormData.size];
                        updated[index] = e.target.value;
                        setUpdateFormData(prev => ({ ...prev, size: updated }));
                      }}
                      className="form-input"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = updateFormData.size.filter((_, i) => i !== index);
                        setUpdateFormData(prev => ({ ...prev, size: updated }));
                      }}
                      className="remove-size-button"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setUpdateFormData(prev => ({
                      ...prev,
                      size: [...prev.size, ""]
                    }))
                  }
                  className="add-size-button"
                >
                  + Add Size
                </button>
              </div>


              <div className="form-row">
                <label className="form-label">supllier</label>
                <input
                  type="text"
                  name="suplr"
                  value={updateFormData.suplr}
                  onChange={handleUpdateChange}
                  className="form-input"
                />
              </div>

              <div className="form-row">
                <label className="form-label">Product Id</label>
                <input
                  type="text"
                  name="pId"
                  value={updateFormData.pId}
                  onChange={handleUpdateChange}
                  className="form-input"
                  required
                />
              </div>


              <div className="form-row">
                <label className="form-label">update retail price</label>
                <input
                  type="number"
                  name="retailPrice"
                  value={updateFormData.retailPrice}
                  onChange={handleUpdateChange}
                  className="form-input"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="form-row">
                <label className="form-label">update Sale price</label>
                <input
                  type="number"
                  name="salePrice"
                  value={updateFormData.salePrice}
                  onChange={handleUpdateChange}
                  className="form-input"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

                            <div className="form-row">
                <label className="form-label">update discount</label>
                <input
                  type="number"
                  name="discount"
                  value={updateFormData.discount}
                  onChange={handleUpdateChange}
                  className="form-input"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="form-row">
                <label className="form-label">update product type</label>
                <input
                  type="text"
                  name="pType"
                  value={updateFormData.pType}
                  onChange={handleUpdateChange}
                  className="form-input"
                />
              </div>

              <div className="form-row">
                <label className="form-label">youtube Video Demo</label>
                <input
                  type="text"
                  name="ytLink"
                  value={updateFormData.ytLink}
                  onChange={handleUpdateChange}
                  className="form-input"
                />
              </div>

              <div className="form-row">
                <label className="form-label">Featured Product</label>
                <select
                  name="featured"
                  value={updateFormData.featured ? "true" : "false"}
                  onChange={(e) =>
                    setUpdateFormData((prev) => ({
                      ...prev,
                      featured: e.target.value === "true",
                    }))
                  }
                  className="form-select"
                >
                  <option value="false">No (Default)</option>
                  <option value="true">Yes</option>
                </select>
              </div>



              <div className="form-row">
                <label className="form-label">description</label>
                <input
                  type="text"
                  name="description"
                  value={updateFormData.description}
                  onChange={handleUpdateChange}
                  className="form-input"
                />
              </div>

              <div className="form-row">
                <label className="form-label">Specification</label>
                {updateFormData.specification.map((spec, index) => (
                  <div key={index} style={{ display: "flex", gap: "10px", marginBottom: "8px" }}>
                    <input
                      type="text"
                      placeholder="Key"
                      value={spec.key}
                      onChange={(e) => {
                        const updated = [...updateFormData.specification];
                        updated[index].key = e.target.value;
                        setUpdateFormData(prev => ({ ...prev, specification: updated }));
                      }}
                      className="form-input"
                    />
                    <input
                      type="text"
                      placeholder="Value"
                      value={spec.value}
                      onChange={(e) => {
                        const updated = [...updateFormData.specification];
                        updated[index].value = e.target.value;
                        setUpdateFormData(prev => ({ ...prev, specification: updated }));
                      }}
                      className="form-input"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = updateFormData.specification.filter((_, i) => i !== index);
                        setUpdateFormData(prev => ({ ...prev, specification: updated }));
                      }}
                      className="remove-size-button"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setUpdateFormData(prev => ({
                      ...prev,
                      specification: [...prev.specification, { key: "", value: "" }]
                    }))
                  }
                  className="add-size-button"
                >
                  + Add Spec
                </button>
              </div>


              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setIsUpdateModalOpen(false)}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="submit-button"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}