import { useState } from 'react';
import styles from './Card.module.scss';

function Card(props) {
  const [add, setAdd] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const addProduct = () => {
    add ? setAdd(false) : setAdd(true);
  };

  const favorIteItems = () => {
    isFavorite ? setIsFavorite(false) : setIsFavorite(true);
    props.addInFavorites(props.id);
  };

  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={favorIteItems}>
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
            addProduct();
            props.addInCart(props.id, add);
          }}
          src={add ? '/img/btn-checked.svg' : '/img/btn-plus.svg'}
          alt="Plus"
        />
      </div>
    </div>
  );
}

export default Card;
