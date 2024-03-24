import style from './index.module.scss'
import avatar from '../../assets/avatar.jpeg'
import backgroundImg from '../../assets/background.jpg'
import Avatar from "../Avatar/index.jsx";
import {useDispatch} from "react-redux";
import GitHubIcon from '@mui/icons-material/GitHub';
import {useEffect} from "react";
import useGet from "../../hooks/useGet.js";
import {ADMIN_ID, BACKEND_URL} from "../../config.js";
import {setAuthor} from "../../redux/actions/requestActions/authorAction.js";
import PropTypes from "prop-types";
import {Skeleton} from "@mui/material";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import useNav from "../../hooks/useNav.js";
import {useIntl} from "react-intl";
function Links({authorInfo}){
	const {pageRouter} =useNav()

	const handlePageRoute = (url) => {
		pageRouter(url)
	}

	return (
		<div  >
			<div className={style.linkLayout}>
				<div>
					<GitHubIcon/>
				</div>
				<div className={style.link}  onClick={() => handlePageRoute(authorInfo.userDetail.gitHub)}>
					{authorInfo.userDetail.gitHub}
				</div>
			</div>
			<div className={style.linkLayout}>
				<div>
					<LinkedInIcon/>
				</div>
				<div className={style.link} onClick={() => handlePageRoute(authorInfo.userDetail.linkedIn)}>
					{authorInfo.userDetail.linkedIn}
				</div>
			</div>
		</div>
	)
}

Links.propTypes = {
	authorInfo : PropTypes.object
}

function Others(){
	const intl = useIntl()
	return (
		<div className={style.others}>
			<div>
				<div>
					{intl.formatMessage({id: 'profile.likes'})}
				</div>
				<div>
					xxx
				</div>
			</div>
			<div>
				<div>
					{intl.formatMessage({id: 'profile.views'})}
				</div>
				<div>
					xxx
				</div>
			</div>
			<div>
				<div>
					{intl.formatMessage({id: 'profile.comments'})}
				</div>
				<div>
					xxx
				</div>
			</div>
		</div>
	)
}

function Description({data}) {
	const intl = useIntl()
	return (
		<>
			{/* Links */}
			<div>
				{data ? <Links authorInfo={data} />: <Skeleton />}
			</div>

			{/* Introduction */}
			<div>
				{intl.formatMessage({id: 'profile.introduction'})}
			</div>

			{/* About me */}
			<div>
				{data ? <>{data.userDetail.description}</>: <Skeleton />}
			</div>
		</>
	)
}

Description.propTypes = {
	data: PropTypes.object
}

const Profile = () => {
	const dispatch = useDispatch()
	const {getData, data} = useGet()


	useEffect(() => {
		getData(`${BACKEND_URL}/api/User/GetUserInfo/${ADMIN_ID}`)
	}, []);

	useEffect(() => {
		if (data){
			dispatch(setAuthor(data))
		}
	}, [data]);

	return (
		<div>
			<div className={style.background}>
				<img src={backgroundImg}/>
			</div>
			<div className={style.rootProfile}>
				<div className={style.avatar}>
					<Avatar image={avatar}/>
				</div>

				<div className={style.authorName}>
					{data ? <>{data.userName}</>: <Skeleton />}
				</div>

				<div className={`${style.caption} ${style.description}`}>
					<Description data={data} />
				</div>

			<Others />

			</div>
		</div>
)
}

export default Profile