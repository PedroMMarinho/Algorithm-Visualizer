import style from "./ConsoleContainer.module.css";


function ConsoleContainer({ compilation ,runOutput }) {

    
  return (
    <div className={style.consoleContainer}>
        <div className={style.consoleHeader}>
            <h1 style={{fontSize:'25px'}}>Console Logs</h1>
        </div>
        <div className={style.consoleContent}>
            <pre>{runOutput}</pre>
        </div>
    </div>
  );
}

export default ConsoleContainer;