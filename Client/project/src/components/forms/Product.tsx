"use client";
import React, { useState } from "react";

function ProductForm() {
  // State to manage form data
  const [formData, setFormData] = useState({
    productName: "",
    productCategory: "electronics",
    productSubcategory: "",
    productDescription: "",
    productPrice: "",
    quantityAvailable: "",
    productImages: [],
    tags: "",
    inStock: false,
    stockNumber: "",
    productColor: "#000000",
    releaseDate: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    // Update form state based on input type
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : type === "file" ? files : value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic here to handle the form submission
    console.log("Form Data:", formData);
    // Reset the form after submission if needed
    setFormData({
      productName: "",
      productCategory: "electronics",
      productSubcategory: "",
      productDescription: "",
      productPrice: "",
      quantityAvailable: "",
      productImages: [],
      tags: "",
      inStock: false,
      stockNumber: "",
      productColor: "#000000",
      releaseDate: "",
    });
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add a New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <label
            htmlFor="productName"
            className="block text-gray-600 text-sm font-medium mb-2"
          >
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 form-group">
          <div>
            <label
              htmlFor="productCategory"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Product Category
            </label>
            <select
              id="productCategory"
              name="productCategory"
              value={formData.productCategory}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="books">Books</option>
              {/* Add more categories as needed */}
            </select>
          </div>
          <div>
            <label
              htmlFor="productSubcategory"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Product Subcategory
            </label>
            <input
              type="text"
              id="productSubcategory"
              name="productSubcategory"
              value={formData.productSubcategory}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="form-group mb-4">
          <label
            htmlFor="productDescription"
            className="block text-gray-600 text-sm font-medium mb-2"
          >
            Product Description
          </label>
          <textarea
            id="productDescription"
            name="productDescription"
            value={formData.productDescription}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            rows="4"
          ></textarea>
        </div>

        {/* ... (other input fields) */}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Submit Product
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
