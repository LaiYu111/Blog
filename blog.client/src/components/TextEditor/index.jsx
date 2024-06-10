import ReactQuill, {Quill} from "react-quill";
import {useMemo, useRef} from "react";
import 'highlight.js/styles/github.css';
import 'react-quill/dist/quill.snow.css';
import QuillMarkdown from 'quilljs-markdown'
import PropTypes from "prop-types";
import hljs from "@/hightlight.js";
import './customStyle.css'
import usePost from "@/hooks/usePost.js";
import {BACKEND_URL} from "@/config.js";
import ImageResize from 'quill-image-resize-module-react';

Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/QuillMarkdown', QuillMarkdown, true)


function TextEditor({content, setContent}){
  const reactQuillRef = useRef(null);
  const { postData } = usePost()
  const toolbarOptions = [
    [{ 'header': [1, 2, 3, 4, false] }],
    // [{ 'font': [] }],

    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image'],

    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction


    [{ 'color': [] }],          // dropdown with defaults from theme

    [{ 'align': [] }],

    ['clean']                                         // remove formatting button
  ];

  const uploadImage = async (files) => {
    const formData = new FormData()
    for (const file of files){ formData.append('images', file)}
    try{
      const result = await postData(`${BACKEND_URL}/api/common/files/image`, formData,null, 'images')
      return result.files
    }catch (e){
      console.error(e)
      return null
    }
  }

  const imageHandler = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.setAttribute('multiple', 'multiple');
    input.click();
    input.onchange = async () => {
      const files = input.files;
      const result = await uploadImage(files);
      for (const file of Array.from(result)) {
        const url =   `${BACKEND_URL}/api/common/files/image/${file.lowQualityFilename}`
        if (file) {
          const editor = reactQuillRef.current.getEditor(); // 获取Quill实例
          const range = editor.getSelection();
          if (range) {
            editor.insertEmbed(range.index, 'image', url);
          }
        }
        else {
          console.error("Cannot find: "+url)
        }
      }
    };
  }

  const modules = useMemo(() => ({
    toolbar: {
      container: toolbarOptions,
      handlers: {
        image: imageHandler
      }
    },
    imageResize: {
      displaySize: true,
      parchment: Quill.import('parchment'),
    },
    QuillMarkdown: {},
    syntax: {
      highlight: text => hljs.highlightAuto(text).value
    }
  }), []);

  return  <ReactQuill
    ref={reactQuillRef}
    theme="snow"
    value={content}
    onChange={setContent}
    modules={modules}
  />
}


TextEditor.propTypes = {
  content: PropTypes.string,
  setContent: PropTypes.func
}

export default TextEditor