import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import FavoritesList from './components/navigation/FaforitesList';
import ProductList from './components/navigation/ProductList';
import Personal from './components/navigation/Personal';

export const AppContext = React.createContext({});

function App() {
  const [cartOpened, setCartOpened] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [favoritesItems, setFavoritesItems] = useState([]);
  const [arr, setArr] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const cartResponse = await axios.get(
        'https://638b52d37220b45d228d4933.mockapi.io/cart'
      );

      const favoritesResponse = await axios.get(
        'https://638b52d37220b45d228d4933.mockapi.io/favorites'
      );

      const arrResponse = await axios.get(
        'https://638b52d37220b45d228d4933.mockapi.io/items'
      );

      setCartItems(cartResponse.data);
      setFavoritesItems(favoritesResponse.data);
      setArr(arrResponse.data);
    }
    fetchData();
  }, []);

  const addInCart = async (id, title) => {
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
    <BrowserRouter>
      <AppContext.Provider
        value={{ cartItems, favoritesItems, arr, isItemAdded }}
      >
        <div className="wrapper clear">
          {cartOpened && (
            <Drawer
              setCartOpened={setCartOpened}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
          )}
          <Header setCartOpened={setCartOpened} />
          <Routes>
            <Route
              path="/"
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
            <Route path="/personal" element={<Personal />} />
          </Routes>
        </div>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
