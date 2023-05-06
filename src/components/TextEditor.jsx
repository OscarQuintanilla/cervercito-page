import React, { useCallback, useMemo, forwardRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextEditor = forwardRef(({ value, onChange }, ref) => {
  const imageHandler = useCallback(() => {
    const url = prompt("Enter the external image URL:");
    if (url) {
      insertToEditor(url);
    } else {
      console.warn("Invalid image URL provided.");
    }
  }, [ref]);

  function insertToEditor(url) {
    ref.current.getEditor().insertEmbed(null, "image", url);
  }

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline"],
          ["link", "blockquote", "image"],
          [{ list: "ordered" }, { list: "bullet" }],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    [imageHandler]
  );

  useEffect(() => {
    if (ref.current) {
      ref.current.getEditor().on("text-change", () => {
        const content = ref.current.getEditor().root.innerHTML;
        onChange({ target: { name: "description", value: content } });
      });
    }
  }, [ref, onChange]);

  return <ReactQuill modules={modules} value={value} ref={ref} />;
});

export default TextEditor;
