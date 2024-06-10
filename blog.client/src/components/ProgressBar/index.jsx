import PropTypes from "prop-types";
import s from './index.module.scss'
import {useEffect, useRef} from "react";

function ProgressBar({progress}){
  const progressBarRef = useRef(null);

  useEffect(() => {
    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${progress}%`;
    }
  }, [progress]);

  if (progress === 0) {
    return null; // 如果进度为 0，则不渲染进度条组件
  }

  return (
    <div className={s.progressBarContainer}>
      <div ref={progressBarRef} className={s.progressBar}>
        <small>
          { progress!== 0 &&`${progress}%`}
        </small>
      </div>
    </div>
  );
}

ProgressBar.propTypes = {
  progress: PropTypes.number
}

export default ProgressBar