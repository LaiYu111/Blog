import ReactQuill, {Quill} from "react-quill";
import {useMemo} from "react";
import 'highlight.js/styles/github.css';
import 'react-quill/dist/quill.snow.css';
import QuillMarkdown from 'quilljs-markdown'
import PropTypes from "prop-types";
import hljs from "@/hightlight.js";
import './customStyle.css'

Quill.register('modules/QuillMarkdown', QuillMarkdown, true)


function TextEditor({content, setContent}){

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

  const modules = useMemo(() => ({
    toolbar: {
      container: toolbarOptions,
    },
    QuillMarkdown: {},
    syntax: {
      highlight: text => hljs.highlightAuto(text).value
    }
  }), []);

  return <ReactQuill
    theme="snow"
    value={content}
    onChange={setContent}
    modules={modules}
  />;
}


TextEditor.propTypes = {
  content: PropTypes.string,
  setContent: PropTypes.func
}

export default TextEditor