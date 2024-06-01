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
   <div className={s.cover} onClick={onClick}>
     <img src={image}/>
     <div className={s.tags}>
       {tags.map((tag) => (
         <div key={tag.id}>
           <Tag name={tag.name} bgColor={tag.bgColor} />
         </div>
       ))}
     </div>
     <h2>
       {title}
     </h2>
     <div className={s.caption}>
       {description}
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