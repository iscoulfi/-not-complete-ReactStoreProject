import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';

function App() {
  const [cartOpened, setCartOpened] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [favoritesItems, setFavoritesItems] = useState([]);
  const [arr, setArr] = useState([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    axios
      .get('https://638b52d37220b45d228d4933.mockapi.io/items')
      .then((res) => setArr(res.data))
      .catch((err) => console.log(err.message));

    axios
      .get('https://638b52d37220b45d228d4933.mockapi.io/cart')
      .then((res) => setCartItems(res.data))
      .catch((err) => console.log(err.message));
  }, []);

  const addInCart = (id) => {
    if (cartItems.includes(arr[id - 1])) {
      removeFromCart(id);
    } else {
      setCartItems((prev) => [...prev, arr[id - 1]]);
      axios.post(
        'https://638b52d37220b45d228d4933.mockapi.io/cart',
        arr[id - 1]
      );
    }
  };

  const removeFromCart = (id) => {
    axios.delete(`https://638b52d37220b45d228d4933.mockapi.io/cart/${id}`);

    setCartItems((prev) => prev.filter((el) => el.id !== id));
  };

  const addInFavorites = (id) => {
    if (favoritesItems.includes(arr[id - 1])) {
      removeFromFavorites(id);
    } else {
      setFavoritesItems((prev) => [...prev, arr[id - 1]]);
      axios.post(
        'https://638b52d37220b45d228d4933.mockapi.io/favorites',
        arr[id - 1]
      );
    }
  };

  const removeFromFavorites = (id) => {
    axios.delete(`https://638b52d37220b45d228d4933.mockapi.io/favorites/${id}`);

    setFavoritesItems((prev) => prev.filter((el) => el.id !== id));
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer
          setCartOpened={setCartOpened}
          cartItems={cartItems}
          removeFromCart={removeFromCart}
        />
      )}
      <Header setCartOpened={setCartOpened} />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder="Поиск..."
            />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {arr.map(
            (obj) =>
              obj.title.toLowerCase().includes(value.toLowerCase()) && (
                <Card
                  id={obj.id}
                  title={obj.title}
                  price={obj.price}
                  imageUrl={obj.imageUrl}
                  addInCart={addInCart}
                  addInFavorites={addInFavorites}
                  key={obj.id}
                />
              )
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
