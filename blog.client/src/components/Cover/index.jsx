import image from '@/assets/noImg.png'
import s from './index.module.scss'
import Tag from "@/components/Tag/index.jsx";

function Cover(){
 return (
   <div className={s.cover}>
     <img src={image}/>

     <div>
       <Tag />
     </div>

     <h2>Project title</h2>

     <div className={s.caption}>sdasdasdasdas如果需要图片始终居中并裁剪多余部分，可以使用以下样式：bvnbnvbnvbnvbnvbnvbvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
       css
       d</div>
   </div>
 )
}


export default Cover