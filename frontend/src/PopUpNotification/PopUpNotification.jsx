import { useState, useEffect } from "react";
import style from "./PopUpNotification.module.css";

function PopUpNotification({ message }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 2000); 

      return () => clearTimeout(timer); 
    }
  }, [message]);

  if (!message) {
    return null;
  }

  return (
    <div className={`${style.popUpNotification} ${message.success ? style.success : style.error} ${
        visible ? style.show : style.hide}`}>
      {message.success ? "Successfully Compiled" : "Compilation Error"}
      {message.errors && message.errors.map((error, index) => (
        <div key={index}>{error}</div>
      ))}
    </div>
  );
}

export default PopUpNotification;
