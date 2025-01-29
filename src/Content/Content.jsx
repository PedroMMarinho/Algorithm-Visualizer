import style from './Content.module.css';
import ParticlesBackground from './ParticlesBackground';

function Content({children}) {

    return (
        <div className={style.content}>
            <ParticlesBackground />
            {children}
        </div>
    );
}

export default Content;