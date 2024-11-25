import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/users/login', {
        username,
        password,
      });
      localStorage.setItem('token', response.data.token);
      setMessage('Login bem-sucedido!'); 
      console.log('Resposta do servidor:', response.data); 
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.error || 'Erro ao fazer login');
        console.error('Erro na resposta do servidor:', error.response.data); 
      } else {
        setMessage('Erro ao conectar ao servidor');
        console.error('Erro de conexão:', error.message); 
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl mb-4">Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col w-1/3">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nome de usuário"
          className="border border-gray-300 p-2 mb-4"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          className="border border-gray-300 p-2 mb-4"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 mb-4">
          Login
        </button>
      </form>
      {message && <p className="text-red-500 mt-2">{message}</p>}
      <p className="mt-4">
        Não possui uma conta?{' '}
        <Link to="/register" className="text-blue-500 hover:underline">
          Registre-se
        </Link>
      </p>
    </div>
  );
};

export default Login;