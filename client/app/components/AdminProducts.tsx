
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
    inStock: 0,
    brand: "",
    price: 0,
    images: [] as (File | string)[],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle opening the update modal
  const openUpdateModal = (product: ProductType) => {
    setSelectedProduct(product);
    setUpdateFormData({
      title: product.title,
      category: product.category._id,
      inStock: product.inStock,
      brand: product.brand,
      price: product.price,
      images: [],
    });
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
      formData.append("inStock", updateFormData.inStock.toString());
      formData.append("brand", updateFormData.brand);
      formData.append("price", updateFormData.price.toString());

      // Append multiple images (optional)
      updateFormData.images.forEach((image) => {
        formData.append("images", image); // 
      });

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
              {typeof product.images[0] === "string" && product.images[0] !== "" ? (
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  layout="fill"
                  className="product-image"
                />
              ) : (
                <div className="no-image-placeholder">No image</div> // fallback UI
              )}

            </div>
            <div className="product-details">
              <h3 className="product-title">{product.title}</h3>
              <div className="product-actions">
                <span className="product-price">TK. {product.price}</span>
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

              <div className="form-row">
                <label className="form-label">Images</label>

                {/* Show current images */}
                {selectedProduct?.images && selectedProduct.images.length > 0 && (
                  <div className="current-images">
                    <p>Current images:</p>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                      {selectedProduct.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt={`Current ${idx}`}
                          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  name="images"
                  onChange={(e) =>
                    setUpdateFormData((prev) => ({
                      ...prev,
                      images: e.target.files ? Array.from(e.target.files) : [],
                    }))
                  }
                  className="form-input"
                />
                <small>Leave empty to keep current images, or select new images to replace all current images.</small>
              </div>



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
                <label className="form-label">Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={updateFormData.brand}
                  onChange={handleUpdateChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-row">
                <label className="form-label">In Stock</label>
                <input
                  type="number"
                  name="inStock"
                  value={updateFormData.inStock}
                  onChange={handleUpdateChange}
                  className="form-input"
                  min="0"
                  required
                />
              </div>

              <div className="form-row">
                <label className="form-label">Price</label>
                <input
                  type="number"
                  name="price"
                  value={updateFormData.price}
                  onChange={handleUpdateChange}
                  className="form-input"
                  min="0"
                  step="0.01"
                  required
                />
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
