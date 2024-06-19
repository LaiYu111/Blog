import image from '@/assets/noImg.png'
import cover01 from '@/assets/article_cover01.png'
import cover02 from '@/assets/article_cover02.png'
import cover03 from '@/assets/article_cover03.png'
import cover04 from '@/assets/article_cover04.png'
import cover05 from '@/assets/article_cover05.png'
import s from './index.module.scss'
import Tag from "@/components/Tag/index.jsx";
import PropTypes from "prop-types";

const covers = [cover01, cover02, cover03, cover04, cover05];

function Cover({
  title,
  description,
  imageURL,
  tags,
  onClick
               }){

  // 如果没上传封面,则随机挑选一个静态封面
  const getRandomCover = () => covers[Math.floor(Math.random() * covers.length)];

 return (
   <div className={s.cover}>
     <img src={`${imageURL? imageURL: getRandomCover()}`} onClick={onClick} alt={'image'}/>
     <div className={s.tags}>
       {tags.map((tag) => (
         <div key={tag._id}>
           <Tag name={tag.name} bgColor={tag.bgColor} textColor={tag.textColor}/>
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