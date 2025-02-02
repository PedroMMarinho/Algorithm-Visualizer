import style from './PageError.module.css';

function PageError() {
  return (
    <div className={style.container}>
      <h1>404: Page Not Found</h1>
    </div>
  );
}

export default PageError;