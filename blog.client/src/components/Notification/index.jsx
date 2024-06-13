import PropTypes from "prop-types";
import s from './index.module.scss'
import {NOTIFICATION} from "@/config.js";
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import InfoIcon from '@mui/icons-material/Info';
import {formatDate} from "@/utils.js";
function Notification({notifications, onClose}){
  return (
    <div className={s.notificationContainer}>

      {notifications.map(({ message, type, id }) => (
        <div
          key={id}
          className={`
            ${s.notification} 
            ${type===NOTIFICATION.INFORMATION && s.information}
            ${type===NOTIFICATION.WARNING && s.warning}
          `}
        >
          <section>
            {type === NOTIFICATION.WARNING && <ReportGmailerrorredIcon />}
            {type === NOTIFICATION.INFORMATION && <InfoIcon />}
            <span>[{formatDate(Date.now())}]{message}</span>
            <button onClick={() => onClose(id)}>x</button>
          </section>

        </div>
      ))}
    </div>
  )
}

Notification.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired,
};


export default Notification