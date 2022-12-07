import { useContext } from 'react';
import { AppContext } from '../App';

const useCart = () => {
  const { cartItems, setCartItems } = useContext(AppContext);
  const amount = cartItems.reduce((acc, el) => acc + el.price, 0);
  return { cartItems, setCartItems, amount };
};

export default useCart;
