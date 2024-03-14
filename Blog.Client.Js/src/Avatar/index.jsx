import style from './index.module.scss'
import PropTypes from "prop-types";

const Avatar = ( {image} ) =>{
	return (
		<>
			<img className={style.root} src={image}/>
		</>
	)
}

Avatar.propTypes = {
	image: PropTypes.string.isRequired
}

export default Avatar