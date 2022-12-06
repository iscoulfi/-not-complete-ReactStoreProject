import { useContext, useState } from 'react';
import { AppContext } from '../App';
import styles from './Card.module.scss';

function Card({ favorite = false, added = false, ...props }) {
  const [isFavorite, setIsFavorite] = useState(favorite);
  const { isItemAdded } = useContext(AppContext);

  const favoriteItems = () => {
    isFavorite ? setIsFavorite(false) : setIsFavorite(true);
    props.addInFavorites(props.id, props.title);
  };

  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={favoriteItems}>
        <img
          src={`/img/heart-${isFavorite ? 'liked' : 'unliked'}.svg`}
          alt="Unliked"
        />
      </div>
      <img width={133} height={112} src={props.imageUrl} alt="Sneakers" />
      <h5>{props.title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{props.price} руб.</b>
        </div>
        <img
          className={styles.plus}
          onClick={() => {
            props.addInCart(props.id, props.title);
          }}
          src={
            isItemAdded(props.title)
              ? '/img/btn-checked.svg'
              : '/img/btn-plus.svg'
          }
          alt="Plus"
        />
      </div>
    </div>
  );
}

export default Card;
