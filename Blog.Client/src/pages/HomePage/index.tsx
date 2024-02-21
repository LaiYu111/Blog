import style from './index.module.scss'
import Panel from "../../components/Panel";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../redux/interfaces.ts";
import {Device} from "../../util.ts";
import Card from "../../components/Card";
import image from '../../assets/aaa.jpg'
import Cover from "../../components/Cover";
import Profile from "../../components/Profile";
import {setPopup} from "../../redux/actions/popupAction.ts";

function HomePage () {
	const device = useSelector((state: AppState) => state.systemReducers.media.device )
	const dispatch = useDispatch()

	const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
		const key = e.key;

		switch (key) {
			case 'Escape':
				dispatch(setPopup(false))
				break;
			default:
				break;
		}
	}

	return (
		<div
			className={`${style.root} ${device===Device.tablet && style.rootTablet} ${device===Device.mobile &&style.rootMobile}`}
			onKeyDown={handleKeyDown}
			tabIndex={0}
		>
			<div className={`${style.articleNev}`}>
				<Panel>
					ss
				</Panel>
			</div>
			<div className={style.content}>
				<div style={{ display: "grid", width: "100%", gridTemplateColumns:"70% 29% "}}>
					<div>
						<Card img={image } title={'1'} caption={'1'} />
					</div>
					<div style={{ display: "grid", width: "100%", gridGap:"10px", gridTemplateRows:"48% 48%", alignItems:"center"}}>
						<Card img={image} title={'1'} caption={'1'}/>
						<Card img={image} title={'1'} caption={'1'}/>
					</div>
				</div>

				<Panel>
					{ [1,2,3].map( (key :number, value:number) => (
						<div key={value}>
							{ key ===1 ? (
								<>
									xx
								</>
								) : (
								<Cover title={"1"} content={"1"} author={"1"} like={1} articleID={key} image={image} />
							)}
							<hr />
						</div>
					))}
				</Panel>

			</div>
			<div className={`${style.profile}`}>
				<Panel>
					<Profile />
				</Panel>

			</div>
		</div>
	)
}

export default HomePage