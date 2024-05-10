import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src="/w3g-logo.png" alt="WEB3 GENES" style={{ width: '70px', marginLeft: '70px'}} /> {/* Use the logo image from public folder */}
      <div className="links">
        <Link to="/user-onboarding" style={{ color: 'white' }}>User Onboarding</Link>
        <Link to="/users-List" style={{ color: 'white' }}>Users List</Link>
      </div>
      <div className="searchbox">
        <input
          type="text"
          placeholder=" Search "
          style={{ width: '200px' }}
        />
      </div>
    </nav>
  );
}

export default Navbar;