import style from './index.module.scss'
import PropTypes from 'prop-types';

const Panel= ({children}) => {
	return (
		<div className={`${style.root}`}>
			{children}
		</div>
	)
}

Panel.propTypes = {
	children : PropTypes.node
}

export default Panel