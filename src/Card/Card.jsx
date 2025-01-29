import style from './Card.module.css';

import PropTypes from 'prop-types';

function Card(props) {
    return (
        <a href="" className={style.cardLink}>
            <div className={style.card}>
                <img src={props.image} alt={props.title} />
                <h2>{props.title}</h2>
                <p>{props.description}</p>
            </div>
        </a>
    );
}

Card.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
}



export default Card;