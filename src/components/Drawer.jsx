import axios from 'axios';
import { useContext, useState } from 'react';
import { AppContext } from '../App';
import Info from './navigation/Info';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ setCartOpened, cartItems, removeFromCart }) {
  const { setCartItems } = useContext(AppContext);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState(false);

  const onCkickOrder = async () => {
    try {
      const { data } = await axios.post(
        'https://638b52d37220b45d228d4933.mockapi.io/orders',
        { items: cartItems }
      );
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(
          'https://638b52d37220b45d228d4933.mockapi.io/cart/' + item.id
        );
        await delay(0);
      }
    } catch (error) {
      console.log('Не удалось добавить заказ.');
    }
  };

  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="d-flex justify-between mb-30">
          Корзина
          <img
            className="cu-p"
            src="/img/btn-remove.svg"
            alt="Remove"
            onClick={() => setCartOpened(false)}
          />
        </h2>

        {cartItems.length > 0 ? (
          <>
            <div className="items">
              {cartItems.map((item, ind) => (
                <div className="cartItem d-flex align-center mb-20" key={ind}>
                  <div
                    style={{ backgroundImage: `url(${item.imageUrl})` }}
                    className="cartItemImg"
                  ></div>

                  <div className="mr-20 flex">
                    <p className="mb-5">{item.title}</p>
                    <b>{item.price} руб.</b>
                  </div>
                  <img
                    className="removeBtn"
                    src="/img/btn-remove.svg"
                    alt="Remove"
                    onClick={() => removeFromCart(item.id)}
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>21 498 руб. </b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>1074 руб. </b>
                </li>
              </ul>
              <button className="greenButton" onClick={onCkickOrder}>
                Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </>
        ) : (
          <Info
            title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'}
            description={
              isOrderComplete
                ? `Ваш заказ №${orderId} скоро будет передан курьерской доставке.`
                : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
            }
            image={
              isOrderComplete
                ? '/img/complete-order.jpg'
                : '/img/empty-cart.jpg'
            }
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
