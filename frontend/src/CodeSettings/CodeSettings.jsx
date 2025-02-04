import { useState } from "react";
import style from "./CodeSettings.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWrench,
  faPlay,
  faGaugeHigh,
} from "@fortawesome/free-solid-svg-icons";

function CodeSettings({ onCompile,
  onRun,
  compilationResult,
  runOutput,
  // New props for visualization controls
  isPlaying,
  onPlayPause,
  currentStep,
  totalSteps,
  onStepChange,
  executionSpeed,
  onSpeedChange }) {

    const handleRunClick = () => {
      onRun();
      onPlayPause(false); // Reset play state when new run starts
    };

  const [speed, setSpeed] = useState(1);
  return (
    <div className={style.container}>
      {/* Compile Button */}
      <div className={style.element}>
        <button className={style.compile} onClick={onCompile}>
          <FontAwesomeIcon icon={faWrench} className={style.icon} />
          Compile
        </button>

      </div>

      {/* Run/Play/Pause Controls */}
      <div className={style.element}>
        <button className={style.run}>
          <FontAwesomeIcon icon={faPlay} className={style.icon} onClick={handleRunClick} />
          Run
        </button>

        {totalSteps > 0 && (
          <button 
            className={style.playPause} 
            onClick={() => onPlayPause(!isPlaying)}
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>
        )}

      </div>

      {/* Speed Slider */}
      <div className={style.element}>
        
        <div className={style.sliderContainer}>
        <FontAwesomeIcon icon={faGaugeHigh} className={style.icon} />
          <label htmlFor="speedSlider" className={style.sliderLabel}>
          Speed ({`${executionSpeed.toFixed(1)}x`})
          </label>
          <input
            type="range"
            id="speedSlider"
            min="0.1"
            max="2.0"
            step="0.1"
            value={executionSpeed}
            onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
            className={style.slider}
          />
        </div>
      </div>
        {/* Step Navigation */}
      {totalSteps > 0 && (
        <div className={style.element}>
          <div className={style.stepNavigation}>
            <button
              onClick={() => onStepChange(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
            >
              ◀️
            </button>
            <span>
              Step {currentStep + 1} of {totalSteps}
            </span>
            <button
              onClick={() => onStepChange(Math.min(totalSteps - 1, currentStep + 1))}
              disabled={currentStep === totalSteps - 1}
            >
              ▶️
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default CodeSettings;
