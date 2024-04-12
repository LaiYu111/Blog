import style from './index.module.scss'
import PropTypes from 'prop-types';

const Panel= ({children, className}) => {
	return (
		<div className={`${style.root} ${className}`}>
			{children}
		</div>
	)
}

Panel.propTypes = {
	children : PropTypes.node
}

export default Panel