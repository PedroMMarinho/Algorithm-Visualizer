import style from "./CodeSettings.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWrench,
  faPlay,
  faGaugeHigh,
} from "@fortawesome/free-solid-svg-icons";

function CodeSettings() {
  return (
    <div className={style.container}>
      <div className={style.element}>
        <button className={style.compile}>
          <FontAwesomeIcon icon={faWrench} className={style.icon} />
          Compile
        </button>
      </div>
      <div className={style.element}>
        <button className={style.run}>
          <FontAwesomeIcon icon={faPlay} className={style.icon} />
          Run
        </button>
      </div>
      <div className={style.element}>
        <FontAwesomeIcon icon={faGaugeHigh} className={style.icon} />
        Speed (Slider)
      </div>
    </div>
  );
}

export default CodeSettings;
