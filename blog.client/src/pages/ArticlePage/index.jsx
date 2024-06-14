import s from './index.module.scss'
import Cover from "@/components/Cover/index.jsx";
import {useNavigate} from "react-router-dom";
import {FormattedMessage} from "react-intl";
import useGet from "@/hooks/useGet.js";
import {useEffect} from "react";
import {BACKEND_URL} from "@/config.js";
import {CircularProgress} from "@mui/material";

function HomePage() {
  const navigator = useNavigate()
  const {data, getData} = useGet()

  const handleRouting = (path) => {
    navigator(path)
  }

  useEffect(() => {
    getData(`${BACKEND_URL}/api/articles/published`)
  }, []);


  return (
   <>
     <div className={s.homeLayout}>
       <h1><FormattedMessage id={'article.title'} /></h1>
       {/*<div className={s.caption}></div>*/}
       <div className={s.covers}>
         {data ? (
           <>
             {data.data.map((article) => (
               <div key={article._id}>
                 <Cover
                   description={article.description}
                   title={article.title}
                   imageURL={article.imagePath}
                   id={article._id}
                   tags={article.tags}
                   onClick={() => handleRouting(`/article/${article._id}`)}
                 />
               </div>
             ))}
           </>
         ) : (
           <>
             <CircularProgress />
           </>
         )}

       </div>
     </div>
   </>
  )
}

export default HomePage