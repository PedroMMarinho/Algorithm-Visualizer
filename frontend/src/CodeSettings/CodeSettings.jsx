import { useState } from "react";
import style from "./CodeSettings.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWrench,
  faPlay,
  faGaugeHigh,
} from "@fortawesome/free-solid-svg-icons";

function CodeSettings() {

  const [speed, setSpeed] = useState(1);

  return (
    <div className={style.container}>
      <div className={style.element}>
        <button className={style.compile} onClick={() => console.log("Compile")}>
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
        
        <div className={style.sliderContainer}>
        <FontAwesomeIcon icon={faGaugeHigh} className={style.icon} />
          <label htmlFor="speedSlider" className={style.sliderLabel}>
          Speed ({`${speed.toFixed(1)}x`})
          </label>
          <input
            type="range"
            id="speedSlider"
            min="0.1"
            max="2.0"
            step="0.1"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className={style.slider}
          />
        </div>
      </div>
    </div>
  );
}

export default CodeSettings;
