import React from "react";
import { Controller } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ErrorMessage from "../../UI/ErrorMessage";

const MyEditor = ({ control, name, value, error }) => {

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"], // Remove formatting button
    ],
  };

  const formats = [
    "font",
    "header",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "script",
    "indent",
    "direction",
    "color",
    "background",
    "align",
    "link",
    "image",
    "video",
  ];

  return (
    <div style={{ direction: "ltr", position: "relative" }}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        name={name}
        render={({ field: { onChange, onBlur } }) => (
          <ReactQuill
            onBlur={onBlur}
            value={value}
            onChange={(e) => onChange(e)}
            modules={modules}
            formats={formats}
            theme="snow"
          />
        )}
      />
      <ErrorMessage msg={error} />
    </div>
  );
};

export default MyEditor;

