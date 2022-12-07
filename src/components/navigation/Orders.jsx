import axios from 'axios';
import { useEffect, useState } from 'react';
import CardOrder from '../CardOrder';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          'https://638b52d37220b45d228d4933.mockapi.io/orders'
        );
        setOrders(data.map((el) => el.items).flat());
      } catch (error) {
        console.log('Ошибка при обработке заказа');
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои заказы</h1>
      </div>

      <div className="d-flex flex-wrap">
        {orders.map((obj) => (
          <CardOrder
            id={obj.id}
            title={obj.title}
            price={obj.price}
            imageUrl={obj.imageUrl}
            key={obj.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Orders;
