import style from './index.module.scss'
import  image from '../../assets/aaa.jpg'
import Avatar from "../Avatar/index.jsx";



const Profile= () => {
	return (
		<>
		<div className={style.background}>
			<img src={image} />
		</div>
		<div className={style.rootProfile}>
			<div className={style.avatar}>
				<Avatar image={image} />
			</div>

			<div className={style.authorName}>
				Name
			</div>
			<div className={style.description}>
				iv 元素（class 为 gap），通过设置其宽度来创建间隔。 你可以根据需要调整间隔的宽度和样式。这种方法可以在 flex 布局中很方便地添加间
			</div>


			<div className={style.others}>
				<div>
					<div>
						阅读量
					</div>
					<div>
						xxx
					</div>
				</div>
				<div>
					<div>
						阅读量
					</div>
					<div>
						xxx
					</div>
				</div>
				<div>
					<div>
						阅读量
					</div>
					<div>
						xxx
					</div>
				</div>
			</div>
		</div>
		</>
)
}

export default Profile