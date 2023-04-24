import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase/client";
import { useNavigate } from "react-router-dom";

const ModForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    subtitle: "",
    description: "",
    category: 1,
    image: "",
    documentation_link: "",
    downloaded_link: "",
  });

  const [tags, setTags] = useState([]);
  const [formTags, setFormTags] = useState([]);
  const [newModTagsArray, setNewModTagsArray] = useState([]);
  const [categories, setCategories] = useState([]);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  async function getCategories() {
    const response = await supabase.from("categories").select();
    return response;
  }

  async function createMod() {
    const response = await supabase.from("mods").insert([formData]);
    return response;
  }

  // Tags functions
  async function getTags() {
    const response = await supabase.from("tags").select();
    return response;
  }

  async function createTag(tag) {
    const response = await supabase.from("tags").insert(tag);
    return response;
  }

  function formTagsToArray() {
    if (formTags.length > 0) {
      const tagsArray = formTags.split(", ");
      tagsArray[tagsArray.length - 1].trim();
      if (tagsArray[tagsArray.length - 1].trim() === "") {
        tagsArray.pop();
      }
      return tagsArray;
    }
  }

  // Use this function to find the tags that are not in the database
  function findMissingTags(a, b) {
    if (a && b) {
      const bSet = new Set(b);
      const result = a.filter((element) => !bSet.has(element));
      let toInsert = result.map((tag) => {
        return { name: tag };
      });

      return toInsert;
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTagsChange = (e) => {
    setFormTags(e.target.value);
  };

  useEffect(() => {
    setNewModTagsArray(formTagsToArray());
  }, [formTags]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // creates a new mod
    createMod().then((result) => {
      if (result.status == 201) {
        navigate("/mod/list");
      } else if (result.error) {
        console.log(result.error);
      }
    });

    let newTags = findMissingTags(newModTagsArray, tags);
    createTag(newTags).then((result) => {
      if (result.status == 201) {
        getTags().then((result) => {
          if (result.data) {
            setTags(result.data);
          } else if (result.error) {
            console.log(result.error);
          }
        });
      } else if (result.error) {
        console.log(result.error);
      }
    });
  };

  const allFieldsFilled = Object.values(formData).every(
    (value) => value !== ""
  );

  // Retrieves the categories and tags from the database
  useEffect(() => {
    getCategories().then((result) => {
      if (result.data) {
        setCategories(result.data);
      } else if (result.error) {
        console.log(result.error);
      }
    });

    getTags().then((result) => {
      if (result.data) {
        setTags(result.data);
      } else if (result.error) {
        console.log(result.error);
      }
    });
  }, []);

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
            <select
              name="category"
              id="categoriesSelect"
              className="border py-2 px-3 text-gray-900"
              value={formData.category}
              onChange={handleChange}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
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
              htmlFor="formTags"
            >
              Tags
            </label>
            <input
              className="border py-2 px-3 text-gray-900"
              type="text"
              name="formTags"
              id="formTags"
              placeholder="Tags"
              value={formTags}
              onChange={handleTagsChange}
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
              name="documentation_link"
              id="documentation_link"
              placeholder="Documentation URL"
              value={formData.documentation_link}
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
              name="downloaded_link"
              id="downloaded_link"
              placeholder="Download URL"
              value={formData.downloaded_link}
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
      <div className="bg-gray-100 p-6 rounded-md text-ellipsis overflow-hidden">
        {formData.image && (
          <img
            src={formData.image}
            alt={formData.name}
            className="w-full h-auto mb-4"
          />
        )}
        <h2 className="text-2xl font-bold mb-4">{formData.name || "Name"}</h2>
        <h3 className="text-xl font-semibold mb-2">
          {formData.subtitle || "Subtitle"}
        </h3>
        <p className="mb-4">{formData.description || "Description"}</p>
        <p className="mb-4">Category: {formData.category || "Category"}</p>
        <p className="mb-4">Tags: {formData.tags || "Tags"}</p>
        <p className="mb-4">
          Documentation Link:{" "}
          {formData.documentation_link ? (
            <a
              href={formData.documentation_link}
              target="_blank"
              rel="noreferrer"
            >
              {formData.documentation_link}
            </a>
          ) : (
            "Documentation Link"
          )}
        </p>
        <p>
          Downloaded Link:{" "}
          {formData.downloaded_link ? (
            <a href={formData.downloaded_link} target="_blank" rel="noreferrer">
              {formData.downloaded_link}
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
