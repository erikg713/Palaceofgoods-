// src/components/Layout.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../state/store';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, setUser } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex-shrink-0 flex items-center">
                Palace of Goods
              </Link>
            </div>
            <div className="flex items-center">
              {user ? (
                <>
                  <Link to="/sell" className="mr-4">Sell Item</Link>
                  <button onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};
