import React from 'react';
import { useCart } from '../context/CartContext';
import { useOrder } from '../context/OrderContext';

const Checkout = () => {
  const { state: cartState } = useCart();
  const { dispatch: orderDispatch } = useOrder();

  const calculateTotal = () => {
    return cartState.items.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const handleCheckout = () => {
    const newOrder = {
      id: Date.now(), 
      items: cartState.items,
      total: calculateTotal(),
      status: 'Aguardando Pagamento',
    };
    
    orderDispatch({ type: 'ADD_ORDER', payload: newOrder });
    
    alert('Compra finalizada com sucesso!');
    
  };

  return (
    <div>
      <h1>Checkout</h1>
      {cartState.items.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <div>
          <h2>Itens no Carrinho:</h2>
          <ul>
            {cartState.items.map((item) => (
              <li key={item.id}>
                {item.name} - R$ {item.price.toFixed(2)}
              </li>
            ))}
          </ul>
          <h2>Valor Total: R$ {calculateTotal()}</h2>
          <button onClick={handleCheckout}>Finalizar Compra</button>
        </div>
      )}
    </div>
  );
};

export default Checkout;