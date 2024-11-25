import React, { useState } from 'react';
import products from '../data/products';
import { useCart } from '../context/CartContext'; 

const Catalog = () => {
  const { dispatch } = useCart(); 
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(products.map(product => product.category)), 'Todos'];

  const addToCart = (product) => {
    
    const cartItem = { id: product.id, name: product.name, quantity: 1 };

    
    dispatch({ type: 'ADD_ITEM', payload: cartItem });
    alert(`${product.name} adicionado ao carrinho!`); 
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Catálogo de Produtos</h1>
      
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar produtos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 p-2"
        />
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 p-2 ml-2"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border p-4 rounded">
            <img src={product.image} alt={product.name} className="mb-2 w-64 h-64 object-cover rounded" />
            <h2 className="text-xl">{product.name}</h2>
            <p>{product.description}</p>
            <p>Preço: R$ {product.price.toFixed(2)}</p>
            <p>{product.stock > 0 ? `Em estoque: ${product.stock}` : 'Indisponível'}</p>
            <button 
              onClick={() => addToCart(product)} 
              className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              disabled={product.stock === 0} 
            >
              Comprar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;