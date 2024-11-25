import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">
      <h1 className="text-2xl mb-4 font-bold text-green-900 ">Bem-vindo ao E-Commerce R&S</h1>
      
      <div className="home-page-catalog flex flex-col items-center">
        <span className="text-2xl mb-4 text-black">Clique aqui para visualizar os produtos disponíveis.</span>
        
        <Link to="/catalog">
          <button className="bg-black text-white text-lg font-bold py-3 px-6 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 mt-2 w-auto">
            Ver Catálogo
          </button>
        </Link>
        
      </div>
    </div>
  );
};

export default Home;