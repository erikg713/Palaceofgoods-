// src/components/Layout/Header.tsx
import React from 'react';  

const Header: React.FC = () => {  
  return (  
    <header>  
      <h1>Palace of Goods</h1>  
      <nav>  
        <a href="/">Home</a>  
        <a href="/about">About</a>  
        <a href="/products">Products</a>  
      </nav>  
    </header>  
  );  
};  

export default Header;import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../state/store';

export const Header: React.FC = () => {
  const { user } = useStore();

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">Palace of Goods</Link>
        <div className="flex items-center gap-4">
          <Link to="/marketplace" className="hover:text-blue-600">Marketplace</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>
              <Link to="/profile" className="flex items-center gap-2">
                <img 
                  src={user.avatar || '/default-avatar.png'} 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full"
                />
                <span>{user.username}</span>
              </Link>
            </>
          ) : (
            <Link to="/login" className="btn-primary">Connect Wallet</Link>
          )}
        </div>
      </nav>
    </header>
  );
};
