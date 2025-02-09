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

export default Header;
Pros: Simple, straightforward, uses semantic HTML.
Cons: Uses plain <a> tags, which will cause full page reloads when navigating. Lacks styling and dynamic content (like user information).
Version 2 (React Router and Dynamic Content):

JavaScript

import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../state/store'; // Assuming you have a state management solution

export const Header: React.FC = () => {
  const { user } = useStore();

  return (
    <header className="bg-white shadow-md"> {/* Tailwind CSS classes */}
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
Pros: Uses react-router-dom's Link component for client-side navigation (no full page reloads). Includes dynamic content based on user authentication. Uses styling (likely Tailwind CSS).
Cons: Relies on external state management (useStore). The "Connect Wallet" button suggests a specific integration (Web3/crypto), which might not be relevant to all applications.
Improved and Combined Version:

JavaScript

import React from 'react';
import { Link } from 'react-router-dom';
// import { useStore } from '../../state/store';  // If you need user data

interface User {
  avatar?: string;
  username?: string;
}

interface HeaderProps {
    user: User | null;
}


const Header: React.FC<HeaderProps> = ({user}) => {

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">Palace of Goods</Link>
        <div className="flex items-center gap-4">
          <Link to="/marketplace" className="hover:text-blue-600">Marketplace</Link>
          <Link to="/about" className="hover:text-blue-600">About</Link>
          <Link to="/products" className="hover:text-blue-600">Products</Link>

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
            <Link to="/login" className="btn-primary">Login</Link> // More generic
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
