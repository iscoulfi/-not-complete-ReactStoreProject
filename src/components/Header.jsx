import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';

function Header({ setCartOpened }) {
  const { amount } = useCart();
  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="">
        <div className="d-flex align-center">
          <img width={40} height={40} src="img/logo.png" alt="logo" />
          <div>
            <h3 className="text-uppercase cu-p">React Store</h3>{' '}
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>

      <ul className="d-flex">
        <li className="mr-30 cu-p" onClick={() => setCartOpened(true)}>
          <img width={18} height={18} src="img/cart.svg" alt="cart" />
          <span>{amount} руб.</span>
        </li>
        <li className="mr-20 cu-p">
          <Link to="/favorites">
            <img
              width={18}
              height={18}
              src="img/favorite.svg"
              alt="favorites"
            />
          </Link>
        </li>
        <li>
          <Link to="/orders">
            <img width={18} height={18} src="img/user.svg" alt="user" />
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
