import s from './index.module.scss'

function Settings(){
  return (
    <div className={s.setting}>
      <div className={s.layout}>
        <div className={s.element}>ZH</div>
        <div className={s.element}>XX</div>
      </div>
    </div>
  )
}

export default Settings