import s from './index.module.scss'
import Cover from "@/components/Cover/index.jsx";

function HomePage() {
  return (
    <div className={s.homeLayout}>
      <h1>Articles</h1>
      <div className={s.caption}>This CSS style will create a subheading with a brief description of you, your work, and what you’re all about, similar to the style shown in the image. Adjust the font-size and padding as needed to fit your design preferences.</div>
      <div className={s.covers}>
        <Cover />
        <Cover />
        <Cover />
        <Cover />
      </div>
    </div>
  )
}

export default HomePage