import React, { useState } from "react";

const ModForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    subtitle: "",
    description: "",
    category: "",
    image: "",
    tags: "",
    documentationLink: "",
    downloadedLink: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  const allFieldsFilled = Object.values(formData).every(
    (value) => value.trim() !== ""
  );

  return (
    <div className="grid grid-cols-3 gap-6 bg-white px-8 mx-12 rounded-md py-12">
      <form className="space-y-6 col-span-2" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-6">
          {/* Name Input */}
          <div className="flex flex-col mb-4">
            <label
              className="mb-2 uppercase font-bold text-lg text-gray-900"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="border py-2 px-3 text-gray-900"
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          {/* Subtitle Input */}
          <div className="flex flex-col mb-4">
            <label
              className="mb-2 uppercase font-bold text-lg text-gray-900"
              htmlFor="subtitle"
            >
              Subtitle
            </label>
            <input
              className="border py-2 px-3 text-gray-900"
              type="text"
              name="subtitle"
              id="subtitle"
              placeholder="Subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              required
            />
          </div>
          {/* Description Input */}
          <div className="flex flex-col mb-4">
            <label
              className="mb-2 uppercase font-bold text-lg text-gray-900"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="border py-2 px-3 text-gray-900"
              name="description"
              id="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          {/* Category Input */}
          <div className="flex flex-col mb-4">
            <label
              className="mb-2 uppercase font-bold text-lg text-gray-900"
              htmlFor="category"
            >
              Category
            </label>
            <input
              className="border py-2 px-3 text-gray-900"
              type="text"
              name="category"
              id="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
          {/* Image Input */}
          <div className="flex flex-col mb-4">
            <label
              className="mb-2 uppercase font-bold text-lg text-gray-900"
              htmlFor="image"
            >
              Image
            </label>
            <input
              className="border py-2 px-3 text-gray-900"
              type="url"
              name="image"
              id="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </div>
          {/* Tags Input */}
          <div className="flex flex-col mb-4">
            <label
              className="mb-2 uppercase font-bold text-lg text-gray-900"
              htmlFor="tags"
            >
              Tags
            </label>
            <input
              className="border py-2 px-3 text-gray-900"
              type="text"
              name="tags"
              id="tags"
              placeholder="Tags"
              value={formData.tags}
              onChange={handleChange}
              required
            />
          </div>
          {/* Documentation Link Input */}
          <div className="flex flex-col mb-4">
            <label
              className="mb-2 uppercase font-bold text-lg text-gray-900"
              htmlFor="documentationLink"
            >
              Documentation Link
            </label>
            <input
              className="border py-2 px-3 text-gray-900"
              type="url"
              name="documentationLink"
              id="documentationLink"
              placeholder="Documentation URL"
              value={formData.documentationLink}
              onChange={handleChange}
              required
            />
          </div>
          {/* Downloaded Link Input */}
          <div className="flex flex-col mb-4">
            <label
              className="mb-2 uppercase font-bold text-lg text-gray-900"
              htmlFor="downloadedLink"
            >
              Downloaded Link
            </label>
            <input
              className="border py-2 px-3 text-gray-900"
              type="url"
              name="downloadedLink"
              id="downloadedLink"
              placeholder="Download URL"
              value={formData.downloadedLink}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            !allFieldsFilled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!allFieldsFilled}
        >
          Register Mod
        </button>
      </form>
      <div className="bg-gray-100 p-6 rounded-md">
        <h2 className="text-2xl font-bold mb-4">{formData.name || "Name"}</h2>
        <h3 className="text-xl font-semibold mb-2">
          {formData.subtitle || "Subtitle"}
        </h3>
        <p className="mb-4">{formData.description || "Description"}</p>
        <p className="mb-4">Category: {formData.category || "Category"}</p>
        {formData.image && (
          <img
            src={formData.image}
            alt={formData.name}
            className="w-full h-auto mb-4"
          />
        )}
        <p className="mb-4">Tags: {formData.tags || "Tags"}</p>
        <p className="mb-4">
          Documentation Link:{" "}
          {formData.documentationLink ? (
            <a
              href={formData.documentationLink}
              target="_blank"
              rel="noreferrer"
            >
              {formData.documentationLink}
            </a>
          ) : (
            "Documentation Link"
          )}
        </p>
        <p>
          Downloaded Link:{" "}
          {formData.downloadedLink ? (
            <a href={formData.downloadedLink} target="_blank" rel="noreferrer">
              {formData.downloadedLink}
            </a>
          ) : (
            "Downloaded Link"
          )}
        </p>
      </div>
    </div>
  );
};

export default ModForm;
