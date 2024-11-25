import React, { useState } from 'react';
import ordersData from '../data/orders'; 
import productsData from '../data/products'; 

const AdminDashboard = () => {
  const [orders, setOrders] = useState(ordersData);
  const [products, setProducts] = useState(productsData);

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const updateStock = (productId, newStock) => {
    setProducts(products.map(product => 
      product.id === productId ? { ...product, stock: newStock } : product
    ));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100 font-hanuman text-black"> 
      <h1 className="text-2xl mb-4 text-center text-gray-900">Dashboard do Administrador</h1>

      
      <h2 className="text-xl mb-2 text-center text-gray-800">Pedidos Realizados</h2>
      <div className="overflow-x-auto w-full max-w-4xl"> 
        <table className="min-w-full border-collapse border border-gray-300 mb-4 text-center"> 
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="border border-gray-300 p-2">ID do Pedido</th>
              <th className="border border-gray-300 p-2">Cliente</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="hover:bg-gray-200">
                <td className="border border-gray-300 p-2">{order.id}</td>
                <td className="border border-gray-300 p-2">{order.customer}</td>
                <td className="border border-gray-300 p-2">{order.status}</td>
                <td className="border border-gray-300 p-2">
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    className="border border-gray-300 p-1 text-black rounded"
                  >
                    <option value="Pendente">Pendente</option>
                    <option value="Enviado">Enviado</option>
                    <option value="Entregue">Entregue</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
      <h2 className="text-xl mb-2 text-center text-gray-800">Gerenciamento de Estoque</h2>
      <div className="overflow-x-auto w-full max-w-4xl"> 
        <table className="min-w-full border-collapse border border-gray-300 mb-4 text-center"> 
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="border border-gray-300 p-2">Produto</th>
              <th className="border border-gray-300 p-2">Estoque</th>
              <th className="border border-gray-300 p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="hover:bg-gray-200">
                <td className="border border-gray-300 p-2">{product.name}</td>
                <td className="border border-gray-300 p-2">{product.stock}</td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    value={product.stock}
                    onChange={(e) => updateStock(product.id, e.target.value)}
                    className="border border-gray-300 p-1 text-black rounded"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;