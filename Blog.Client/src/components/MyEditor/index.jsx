import React, {useEffect, useRef, useState} from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {IMAGE_URL} from "../../config.js";
import ImageResize from 'quill-image-resize-module-react';

Quill.register('modules/imageResize', ImageResize);

function MyEditor () {
  const [value, setValue] = useState('');
  const reactQuillRef = useRef(null);

  useEffect(() => {
    console.log(value)
  }, [value]);

  const uploadImage = async () => {
    const formData = new FormData()
    try{
      return IMAGE_URL+"/5.png"
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
      for (const file of Array.from(files)) {
        const imgUrl = await uploadImage(file); // 假设uploadImage正确实现了上传逻辑并返回图片URL

        if (imgUrl) {
          const editor = reactQuillRef.current.getEditor(); // 获取Quill实例
          const range = editor.getSelection();
          if (range) {
            editor.insertEmbed(range.index, 'image', imgUrl);
          }
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

// class  MyEditor extends React.Component{
//   constructor(props) {
//     super(props);
//     this.state = {
//       text: "",
//       uploadBoxVisible:false
//     }
//     this.handleChange = this.handleChange.bind(this)
//   }
//
//   handleChange(value){
//     this.setState({text: value})
//   }
//
//   showUploadBox(){
//     this.setState({
//       uploadBoxVisible:true
//     });
//   }
//
//   modules = {
//     toolbar: {
//       container: [
//         [{ 'header': [1, 2,3,4, false] }],
//         ['bold', 'italic', 'underline','strike', 'blockquote'],
//         [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
//         ['link', 'image'],
//         ['clean']
//       ],
//       handlers: {
//         'image':this.showUploadBox.bind(this)
//       }
//     },
//     imageDrop: true
//   }
//
//   render() {
//     return (
//       <div className="text-editor">
//         <ReactQuill theme="snow"
//                     modules={this.modules}
//         >
//         </ReactQuill>
//       </div>
//     );
//   }
// }
//
// export default MyEditor