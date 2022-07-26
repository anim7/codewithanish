import React, { useEffect } from "react"
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
  const [timeoutId, setTimeoutId] = React.useState<NodeJS.Timeout>()
  useEffect(() => {
    clearTimeout(timeoutId)
    setTimeoutId(
      setTimeout(() => {
        setValue(document.querySelector(".ql-editor")!.innerHTML)
        console.log(value)
      }, 2000)
    )
    //eslint-disable-next-line
  }, [value])
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],

      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],

      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: true,
    },
    imageResize: {
      parchment: Quill.import("parchment"),
      modules: ["Resize", "DisplaySize"],
    },
    syntax: {
      highlight: (text: string) => hljs.highlightAuto(text).value,
    },
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
        // value={value}
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
