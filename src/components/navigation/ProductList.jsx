import { useState } from 'react';
import Card from '../Card';

const ProductList = ({ addInFavorites, addInCart, arr, favoritesItems }) => {
  const [value, setValue] = useState('');

  const renderItems = () => {
    return arr.map(
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
            favorite={favoritesItems.some((el) => el.title === obj.title)}
          />
        )
    );
  };
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Все кроссовки</h1>
        <div className="search-block d-flex">
          <img src="img/search.svg" alt="Search" />
          <input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Поиск..."
          />
        </div>
      </div>

      <div className="d-flex flex-wrap">{renderItems()}</div>
    </div>
  );
};

export default ProductList;
