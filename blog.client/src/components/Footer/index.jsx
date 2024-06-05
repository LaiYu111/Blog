import s from './index.module.scss'
function Footer(){
  return (
    <div className={s.layout}>
      <p><small><b>Source Code: </b>https://github.com/LaiYu111/Blog</small></p>
      <p><small><b>Technical stacks: </b> react, material UI (Icon), react-redux, react-intl, react-router-dom, react-typewriter-hook, scss</small></p>
    </div>
  )
}

export default Footer