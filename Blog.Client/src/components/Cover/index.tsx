import {FC} from "react";
import style from './index.module.scss'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ChromeReaderModeOutlinedIcon from '@mui/icons-material/ChromeReaderModeOutlined';
import img from '../../assets/aaa.jpg'
import useNav from "../../hooks/useNav.ts";



interface Props{
	title: string,
	image?: string,
	content: string,
	author: string,
	like: number,
	articleID: number | string
}

const Cover:FC<Props> = ({image, articleID}) => {
	const navigate = useNav()

	const handleNav = () => {
		navigate('/article/xxx')
	}

	return (
	<>
		<div
			className={style.root}
		>
			{/* text */}
			<div className={style.text}>
				<div
					className={style.title}
					onClick={handleNav}
				>
					{articleID} 你好示例中，我们创建了一个 container 容器，里面包含asdfsdf我们希望有间隔的ner 容器，里面包含了两个项目（
				</div>
				<div
					className={style.article}
					onClick={handleNav}
				>
					哈哈dfgsdfg在这个示例中，我们创建了一个 container 容器，里面包含了两个项目（item），它们是我们希望有间隔的两个
					div。我们添加了一个额外的 div 元素（class 为 gap），通过设置其宽度来创建间隔。

					你可以根据需要调整间隔的宽度和样式。这种方法可以在 flex 布局中很方便地添加间隔。哈哈dfgsdfg在这个示例中，我们创建了一个
					container 容器，里面包含了两个项目（item），它们是我们希望有间隔的两个 div。我们添加了一个额外的 div 元素（class 为
					gap），通过设置其宽度来创建间隔。

					你可以根据需要调整间隔的宽度和样式。这种方法可以在 flex 布局中很方便地添加间隔。
				</div>

				<div className={style.others}>
					<ThumbUpOffAltIcon fontSize={"small"}  />
					<ChatBubbleOutlineIcon fontSize={'small'}/>
					<ChromeReaderModeOutlinedIcon fontSize={'small'}/>
				</div>
			</div>


			<div className={style.gap}></div>
			{/* image */}
			{image && (
				<div className={style.image}>
					<img src={img}/>
				</div>
			)}
		</div>
	</>
	)
}

export default Cover