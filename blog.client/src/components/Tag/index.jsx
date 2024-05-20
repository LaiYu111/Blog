import s from './index.module.scss'
function Tag({name}){
  return(
    <div className={s.tag}>
      {name}
    </div>
  )
}

export default Tag