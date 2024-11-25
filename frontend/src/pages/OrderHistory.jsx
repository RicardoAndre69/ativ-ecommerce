import React from 'react';
import { useOrder } from '../context/OrderContext';

const OrderHistory = () => {
  const { state } = useOrder();

  return (
    <div>
      <h1>Histórico de Pedidos</h1>
      {state.orders.length === 0 ? (
        <p>Você ainda não fez nenhum pedido.</p>
      ) : (
        <ul>
          {state.orders.map((order) => (
            <li key={order.id}>
              <h2>Pedido ID: {order.id}</h2>
              <p>Status: {order.status}</p>
              <h3>Itens:</h3>
              <ul>
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.name} - R$ {item.price.toFixed(2)}
                  </li>
                ))}
              </ul>
              <p>Total: R$ {order.total}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;