import React, {useEffect, useRef, useState} from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {BACKEND_URL, IMAGE_URL} from "../../config.js";
import ImageResize from 'quill-image-resize-module-react';
import usePost from "../../hooks/usePost.js";

Quill.register('modules/imageResize', ImageResize);

function MyEditor () {
  const [value, setValue] = useState('');
  const reactQuillRef = useRef(null);
  const { postData} = usePost()

  useEffect(() => {
    console.log(value)
  }, [value]);

  const uploadImage = async (files) => {
    const formData = new FormData()
    for (const file of files){ formData.append('images', file)}
    try{
      return  await postData(`${BACKEND_URL}/api/Article/Image`, formData, 'images')
    }catch (e){
      console.log("Error", e)
      return null
    }
  }

  const imageHandler = async ()=> {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.setAttribute('multiple', 'multiple');
    input.click();
    input.onchange = async () => {
      const files = input.files;
      const imgIds = await uploadImage(files);

      for (const id of Array.from(imgIds)) {
        const url = IMAGE_URL + `/${id}`
        if (id) {
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

  const toolbarOptions = [
    [{ 'header': [1, 2, 3, 4, false] }],
    // [{ 'font': [] }],

    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image', 'formula'],

    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction


    [{ 'color': [] }],          // dropdown with defaults from theme

    [{ 'align': [] }],

    ['clean']                                         // remove formatting button
  ];



  const modules = React.useMemo(() => ({
    imageResize: {
      displaySize: true,
      parchment: Quill.import('parchment'),
      // handleStyles: {
      //   backgroundColor: 'white',
      //   border: 'none',
      //   color: 'white'
      // },
      // modules: ['Resize', 'DisplaySize', 'Toolbar']
    },
    toolbar: {
      container: toolbarOptions,
      handlers:{
        image: imageHandler
      },
    },
  }), []);


  return (
    <div  className="text-editor">
      <ReactQuill
        ref={reactQuillRef}
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
      />
    </div>
  )

}

export default MyEditor
