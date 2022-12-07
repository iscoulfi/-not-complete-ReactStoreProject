import { HashRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import FavoritesList from './components/navigation/FavoritesList';
import ProductList from './components/navigation/ProductList';
import Orders from './components/navigation/Orders';

export const AppContext = React.createContext({});

function App() {
  const [cartOpened, setCartOpened] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [favoritesItems, setFavoritesItems] = useState([]);
  const [arr, setArr] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favoritesResponse, arrResponse] =
          await Promise.all([
            axios.get('https://638b52d37220b45d228d4933.mockapi.io/cart'),
            axios.get('https://638b52d37220b45d228d4933.mockapi.io/favorites'),
            axios.get('https://638b52d37220b45d228d4933.mockapi.io/items'),
          ]);

        setCartItems(cartResponse.data);
        setFavoritesItems(favoritesResponse.data);
        setArr(arrResponse.data);
      } catch (error) {
        console.log('Ошибка при запросе данных');
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const addInCart = async (id, title) => {
    console.log(typeof price);
    try {
      if (cartItems.find((item) => item.title === title)) {
        removeFromCart(cartItems.find((item) => item.title === title).id);
      } else {
        const { data } = await axios.post(
          'https://638b52d37220b45d228d4933.mockapi.io/cart',
          arr[id - 1]
        );
        setCartItems((prev) => [...prev, data]);
      }
    } catch (error) {
      console.log('Не удалось добавить в фавориты');
    }
  };

  const removeFromCart = (id) => {
    axios.delete(`https://638b52d37220b45d228d4933.mockapi.io/cart/${id}`);

    setCartItems((prev) => prev.filter((el) => +el.id !== +id));
  };

  const addInFavorites = async (id, title) => {
    try {
      if (favoritesItems.find((item) => item.title === title)) {
        removeFromFavorites(
          favoritesItems.find((item) => item.title === title).id
        );
      } else {
        const { data } = await axios.post(
          'https://638b52d37220b45d228d4933.mockapi.io/favorites',
          arr[id - 1]
        );
        setFavoritesItems((prev) => [...prev, data]);
      }
    } catch (error) {
      console.log('Не удалось добавить в фавориты');
      console.error(error);
    }
  };

  const removeFromFavorites = (id) => {
    axios.delete(`https://638b52d37220b45d228d4933.mockapi.io/favorites/${id}`);

    setFavoritesItems((prev) => prev.filter((el) => +el.id !== +id));
  };

  const isItemAdded = (title) => {
    return cartItems.some((el) => el.title === title);
  };

  return (
    <HashRouter>
      <AppContext.Provider
        value={{
          cartItems,
          favoritesItems,
          isItemAdded,
          setCartOpened,
          setCartItems,
        }}
      >
        <div className="wrapper clear">
          <Drawer
            setCartOpened={setCartOpened}
            removeFromCart={removeFromCart}
            cartOpened={cartOpened}
          />

          <Header setCartOpened={setCartOpened} />
          <Routes>
            <Route
              path=""
              element={
                <ProductList
                  favoritesItems={favoritesItems}
                  addInFavorites={addInFavorites}
                  addInCart={addInCart}
                  arr={arr}
                />
              }
            />
            <Route
              path="/favorites"
              element={<FavoritesList addInFavorites={addInFavorites} />}
            />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
      </AppContext.Provider>
    </HashRouter>
  );
}

export default App;
