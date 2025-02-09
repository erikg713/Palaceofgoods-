import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../state/store'; // Make sure the path is correct

const Header: React.FC = () => {
  const { user } = useStore();

  return (
    <header className="bg-white shadow-md"> {/* Tailwind classes */}
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-gray-800">Palace of Goods</Link> {/* Added text color */}
        <div className="flex items-center gap-4">
          <Link to="/marketplace" className="hover:text-blue-600">Marketplace</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>
              <Link to="/profile" className="flex items-center gap-2 hover:text-blue-600"> {/* Added hover effect */}
                <img
                  src={user.avatar || '/default-avatar.png'}
                  alt={user.username ? `${user.username}'s profile` : "Profile"} // Improved alt text
                  className="w-8 h-8 rounded-full"
                />
                <span>{user.username}</span>
              </Link>
            </>
          ) : (
            <Link to="/login" className="btn-primary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> {/* Improved button styling */}
              Connect Wallet
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};
