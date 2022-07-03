import React from "react"
import ReactQuill, { Quill } from "react-quill"
import "react-quill/dist/quill.snow.css"
import "highlight.js/styles/night-owl.css"
import hljs from "highlight.js"
import ImageResize from "quill-image-resize-module-react"

interface Props {
  value: string
  setValue: (value: string) => void
}

Quill.register("modules/imageResize", ImageResize)

export const RichTextField: React.FunctionComponent<Props> = ({ value, setValue }) => {
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ], // remove formatting button
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: true,
    },
    imageResize: {
      parchment: Quill.import("parchment"),
      modules: ["Resize", "DisplaySize"],
    },
    syntax: { highlight: (text: string) => hljs.highlightAuto(text).value },
  }
  const formats = [
    "background",
    "bold",
    "color",
    "font",
    "code",
    "italic",
    "link",
    "size",
    "strike",
    "script",
    "underline",
    "blockquote",
    "header",
    "indent",
    "list",
    "align",
    "direction",
    "code-block",
    "image",
    "video",
  ]
  return (
    <>
      <label className="text-black bg-white dark:bg-black dark:text-white">Content</label>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
        formats={formats}
        bounds="#editor"
        placeholder="Write something..."
        className="text-black dark:text-white"
      />
    </>
  )
}

export default RichTextField
