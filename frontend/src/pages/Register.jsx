import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3000/api/users/register', {
        username,
        email,
        password,
      });
      setMessage('Usuário registrado com sucesso!'); 
      console.log('Resposta do servidor:', response.data); 
    } catch (error) {
      if (error.response) {
        
        setMessage(error.response.data.error || 'Erro ao registrar');
        console.error('Erro na resposta do servidor:', error.response.data); 
      } else {
        
        setMessage('Erro ao conectar ao servidor');
        console.error('Erro de conexão:', error.message); 
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl mb-4">Cadastro de Usuário</h1>
      <form onSubmit={handleRegister} className="flex flex-col w-80">
        <input
          type="text"
          placeholder="Nome de Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 mb-2"
          required
        />
        <input
          type="email" 
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mb-2"
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-2"
          required
        />
        <button 
          type="submit" 
          className="bg-black text-white text-lg font-bold py-3 px-6 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 mt-2 w-auto"
        >
          Registrar
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default Register;