import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';

// const arr = [
//   {
//     title: 'Мужские Кроссовки Nike Blazer Mid Suede',
//     price: 12999,
//     imageUrl: '/img/sneakers/1.jpg',
//   },
//   {
//     title: 'Мужские Кроссовки Nike Air Max 270',
//     price: 15600,
//     imageUrl: '/img/sneakers/2.jpg',
//   },
//   {
//     title: 'Мужские Кроссовки Nike Blazer Mid Suede',
//     price: 8499,
//     imageUrl: '/img/sneakers/3.jpg',
//   },
//   {
//     title: 'Кроссовки Puma X Aka Boku Future Rider',
//     price: 8999,
//     imageUrl: '/img/sneakers/4.jpg',
//   },
//   {
//     title: 'Мужские Кроссовки Under Armour Curry 8',
//     price: 15199,
//     imageUrl: '/img/sneakers/5.jpg',
//   },
//   {
//     title: 'Мужские Кроссовки Nike Kyrie 7',
//     price: 11299,
//     imageUrl: '/img/sneakers/6.jpg',
//   },
//   {
//     title: 'Мужские Кроссовки Jordan Air Jordan 11',
//     price: 10799,
//     imageUrl: '/img/sneakers/7.jpg',
//   },
//   {
//     title: 'Мужские Кроссовки Nike LeBron XVIII',
//     price: 16499,
//     imageUrl: '/img/sneakers/8.jpg',
//   },
//   {
//     title: 'Мужские Кроссовки Nike Lebron XVIII Low',
//     price: 13999,
//     imageUrl: '/img/sneakers/9.jpg',
//   },
//   {
//     title: 'Мужские Кроссовки Nike Kyrie Flytrap IV',
//     price: 11299,
//     imageUrl: '/img/sneakers/10.jpg',
//   },
// ];

function App() {
  const [cartOpened, setCartOpened] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [arr, setArr] = useState([]);

  useEffect(() => {
    axios
      .get('https://638b52d37220b45d228d4933.mockapi.io/items')
      .then((res) => setArr(res.data))
      .catch((err) => console.log(err.message));
  }, []);

  const addInCart = (id) => {
    cartItems.includes(arr[id - 1])
      ? setCartItems((prev) => prev.filter((el) => el.id !== id))
      : setCartItems((prev) => [...prev, arr[id - 1]]);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer setCartOpened={setCartOpened} cartItems={cartItems} />
      )}
      <Header setCartOpened={setCartOpened} />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Поиск..." />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {arr.map((obj) => (
            <Card
              id={obj.id}
              title={obj.title}
              price={obj.price}
              imageUrl={obj.imageUrl}
              onFavoriteClick={() => console.log('add to favorite')}
              addInCart={addInCart}
              key={obj.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
