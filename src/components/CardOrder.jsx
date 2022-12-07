import styles from './Card.module.scss';

function CardOrder({ ...props }) {
  return (
    <div className={styles.card}>
      <img width={133} height={112} src={props.imageUrl} alt="Sneakers" />
      <h5>{props.title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{props.price} руб.</b>
        </div>
      </div>
    </div>
  );
}

export default CardOrder;
