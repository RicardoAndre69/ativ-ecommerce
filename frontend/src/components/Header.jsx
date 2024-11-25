import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; 

const Header = () => {
  const { state } = useCart(); 
  const { items: cartItems } = state; 
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-gray-400">E-Commerce R&S</Link>
        </div>
        <nav className="flex space-x-4">
          <Link to="/" className="hover:text-gray-400">Home</Link>
          <Link to="/catalog" className="hover:text-gray-400">Produtos</Link>
          <Link to="/login" className="hover:text-gray-400">Login</Link>
        </nav>
        <div className="relative">
          <button onClick={toggleCart} className="hover:text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l1 9h12l1-9h2M3 3l1 9h12l1-9M3 3l1 9m0 0a2 2 0 002 2h12a2 2 0 002-2m-2 0a2 2 0 11-2-2m-2 0a2 2 0 11-2-2" />
            </svg>
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                {cartItems.length}
              </span>
            )}
          </button>

          
          {isCartOpen && (
            <div className="absolute right-0 top-10 bg-white border border-gray-300 shadow-lg p-4 rounded">
              <h2 className="text-lg font-bold">Itens no Carrinho</h2>
              {cartItems.length > 0 ? (
                <ul>
                  {cartItems.map((item, index) => (
                    <li key={index} className="flex justify-between">
                      <span>
                        {item.name} - R$ {item.price !== undefined ? item.price.toFixed(2) : 'Preço não disponível'}
                      </span>
                      <span>{item.quantity}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Seu carrinho está vazio.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;