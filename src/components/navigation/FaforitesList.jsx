import Card from '../Card';

const FaforitesList = ({ favoritesItems, addInFavorites }) => {
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои закладки</h1>
      </div>

      <div className="d-flex flex-wrap">
        {favoritesItems.map((obj) => (
          <Card
            id={obj.id}
            title={obj.title}
            price={obj.price}
            imageUrl={obj.imageUrl}
            key={obj.id}
            favorite={true}
            addInFavorites={addInFavorites}
          />
        ))}
      </div>
    </div>
  );
};

export default FaforitesList;
