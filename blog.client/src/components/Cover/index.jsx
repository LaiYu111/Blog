import image from '@/assets/noImg.png'
import s from './index.module.scss'
import Tag from "@/components/Tag/index.jsx";
import PropTypes from "prop-types";

function Cover({
  id,
  title,
  description,
  imageURL,
  tags,

  onClick
               }){

 return (
   <div className={s.cover}>
     <img src={`${imageURL? imageURL: image}`} onClick={onClick} alt={'image'}/>
     <div className={s.tags}>
       {tags.map((tag) => (
         <div key={tag._id}>
           <Tag name={tag.name} bgColor={tag.bgColor} />
         </div>
       ))}
     </div>
     <div className={s.text} onClick={onClick}>
       <h2>
         {title}
       </h2>
       <div className={s.caption}>
         {description}
       </div>
     </div>
   </div>
 )
}

Cover.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  title: PropTypes.string,
  description: PropTypes.string,
  imageURL: PropTypes.string,

  tags: PropTypes.array,

  onClick: PropTypes.func
}

export default Cover