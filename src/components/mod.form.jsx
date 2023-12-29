import React, { useEffect, useState, useRef } from "react";
import { supabase } from "../../supabase/client";
import { useNavigate, useParams } from "react-router-dom";
import {
  queryGetCategories,
  queryCreateMod,
  queryUpdateMod,
  querygetTagsByMod,
  queryGetModByName,
  queryGetModById,
  queryGetTags,
  queryCreateTag,
  queryCreateModTagsRelation,
} from "../api/Mods.api";
import TextEditor from "./TextEditor";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

const ModForm = () => {
  const { modId } = useParams();
  const [databaseTagsArray, setDatabaseTagsArray] = useState([]);
  const [formTags, setFormTags] = useState([]);
  const [newModTagsArray, setNewModTagsArray] = useState([]);
  const [categories, setCategories] = useState([]);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    subtitle: "",
    description: "",
    category: 1,
    image: "",
    documentation_link: "",
    downloaded_link: "",
    documentation_videos: "",
    isDependency: false,
  });

  const navigate = useNavigate();

  // Quill Editor Configurations
  const editorRef = useRef(null);

  // Data handlers
  function formTagsToArray() {
    if (formTags.length > 0) {
      const tagsArray = formTags.split(", ");
      tagsArray[tagsArray.length - 1].trim();
      if (tagsArray[tagsArray.length - 1].trim() === "") {
        tagsArray.pop();
      }
      const tagsArrayObjects = tagsArray.map((tag) => {
        return { name: tag };
      });

      return tagsArrayObjects;
    }
  }

  // Use this function to find the tags that are not in the database
  function findMissingTags(formTags, dataBaseTags) {
    if (formTags && dataBaseTags) {
      const bSet = new Set(dataBaseTags);
      const result = formTags.filter((element) => {
        return !Array.from(bSet).some((b) => b.name == element.name);
      });

      return result;
    }
  }

  // todo: rework this function to be more efficient
  function findMatchingTags(formTags, dataBaseTags) {
    if (formTags && dataBaseTags) {
      const result = formTags.map((formTag) => {
        return dataBaseTags.find((tag) => tag.name === formTag.name);
      });

      return result;
    }
  }

  function prepareRelationModTagsObject(mod_id, tagsArray) {
    const relationsArray = tagsArray.map((tag) => {
      return { mod_id, tag_id: tag.id };
    });

    return relationsArray;
  }

  // Form handlers
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTagsChange = (e) => {
    setFormTags(e.target.value);
  };

  useEffect(() => {
    setNewModTagsArray(formTagsToArray());
  }, [formTags]);

  useEffect(() => {
    const missingTags = findMissingTags(newModTagsArray, databaseTagsArray);
  }, [newModTagsArray]);

  const allFieldsFilled = Object.values(formData).every(
    (value) => value !== ""
  );

  // insert new mod and tags
  /**
   * Steps
   * 1. Insert new mod
   * 2. Insert the new tags if there are any new tags
   * 3. Get the id of the new tags
   * 4. Insert the relations between the new mod and the new tags
   */
  const insertNewModProcess = async () => {
    const queryModResponse = await queryCreateMod(formData);
    if (queryModResponse.status === 201) {
      // Mod created successfully
      const createdMod = await queryGetModByName(formData.name);
      const mod_id = createdMod.data[0].id;
      const missingTags = findMissingTags(newModTagsArray, databaseTagsArray);
      if (missingTags) {
        // Insert the new tags if there are any new tags
        const queryCreateTagsResponse = await queryCreateTag(missingTags);
        if (queryCreateTagsResponse.status === 201) {
          // Tags created successfully
          const allTags = await queryGetTags();
          const matchingTagsArray = findMatchingTags(
            newModTagsArray,
            allTags.data
          );
          const relationsArray = prepareRelationModTagsObject(
            mod_id,
            matchingTagsArray
          );
          const relationResponse = await queryCreateModTagsRelation(
            relationsArray
          );
          if (relationResponse.status === 201) {
            // Relations created successfully
            setSaving(false);
            navigate("/admin/mod/list");
          } else {
            console.log("Error creating relations");
            console.log(relationResponse.error);
          }
        } else {
          console.log("Error creating new tags");
          console.log(queryCreateTagsResponse.error);
        }
      } else {
        // There are no new tags
        const matchingTagsArray = findMatchingTags(
          newModTagsArray,
          databaseTagsArray
        );
        const relationsArray = prepareRelationModTagsObject(
          mod_id,
          matchingTagsArray
        );
        const relationResponse = await queryCreateModTagsRelation(
          relationsArray
        );
        if (relationResponse.status === 201) {
          // Relations created successfully
          setSaving(false);
          navigate("/mod/list");
        }
      }
    }
  };

  const editModProcess = async () => {
    const queryModResponse = await queryUpdateMod(formData);
    if (queryModResponse.status === 204) {
      navigate("/admin/mod/list");
    } else {
      console.log("Error updating mod");
      console.log(queryModResponse);
    }
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
  };

  useEffect(() => {
    if (saving) {
      if (modId) {
        editModProcess();
      } else {
        insertNewModProcess();
      }
    }
  }, [saving]);

  // Retrieves the categories and tags from the database
  useEffect(() => {
    queryGetCategories().then((result) => {
      if (result.data) {
        setCategories(result.data);
      } else if (result.error) {
        console.log(result.error);
      }
    });

    queryGetTags().then((result) => {
      if (result.data) {
        setDatabaseTagsArray(result.data);
      } else if (result.error) {
        console.log(result.error);
      }
    });
  }, []);

  useEffect(() => {
    if (modId) {
      queryGetModById(modId).then((result) => {
        if (result.data) {
          setFormData(result.data[0]);
        } else if (result.error) {
          console.log(result.error);
        }
      });
    }
  }, []);

  return (
    <div className="grid grid-cols-3 gap-6 bg-white px-8 mx-12 rounded-md py-12">
      <form
        className="space-y-6 col-span-2"
        onSubmit={handleSubmit}
        key={formData.id}
      >
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
            />
          </div>
          {/* Documentation Videos */}
          <div className="flex flex-col mb-4">
            <label
              className="mb-2 uppercase font-bold text-lg text-gray-900"
              htmlFor="downloadedLink"
            >
              Documentation Videos
            </label>
            <input
              className="border py-2 px-3 text-gray-900"
              type="url"
              name="documentation_videos"
              id="documentation_videos"
              placeholder="Download URL"
              value={formData.documentation_videos}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* Is this a dependency mod? */}
        <div className="flex flex-col mb-4">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={formData.isDependency}
              onChange={(e) =>
                setFormData({ ...formData, isDependency: e.target.checked })
              }
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium">Es Dependencia</span>
          </label>
        </div>
        {/* Description Input */}
        <div className="flex flex-col mb-4">
          <label
            className="mb-2 uppercase font-bold text-lg text-gray-900"
            htmlFor="description"
          >
            Description
          </label>
        </div>
        <TextEditor
          name="description"
          ref={editorRef}
          value={formData.description}
          onChange={handleChange}
        />

        <input type="hidden" name="editorContent" id="hidden-input" />
        <button
          type="submit"
          className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
          disabled={false}
        >
          {modId ? "Edit Mod" : "Create Mod"}
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
        <ReactQuill
          value={formData.description || "No Description"}
          readOnly={true}
          theme={"bubble"}
          className="m-0 p-0"
        />
      </div>
    </div>
  );
};

export default ModForm;
