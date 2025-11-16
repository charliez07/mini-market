import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import './Header.css';

function Header() {
  const { currentUser, setCurrentUser, users } = useUser();
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <h1>Mini Marketplace</h1>
        </Link>
        
        <nav className="nav">
          <Link 
            to="/" 
            className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}
          >
            Home
          </Link>
          <Link 
            to="/create" 
            className={location.pathname === '/create' ? 'nav-link active' : 'nav-link'}
          >
            Create Listing
          </Link>
          <Link 
            to="/my-selling" 
            className={location.pathname === '/my-selling' ? 'nav-link active' : 'nav-link'}
          >
            My Selling
          </Link>
          <Link 
            to="/my-buying" 
            className={location.pathname === '/my-buying' ? 'nav-link active' : 'nav-link'}
          >
            My Buying
          </Link>
        </nav>

        <div className="user-selector">
          <label htmlFor="user-dropdown">User: </label>
          <select
            id="user-dropdown"
            value={currentUser}
            onChange={(e) => setCurrentUser(e.target.value)}
            className="user-dropdown"
          >
            {users.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
}

export default Header;

