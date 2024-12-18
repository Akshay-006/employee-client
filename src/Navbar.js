import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbarContainer">
        <div className="navbarBrand">
          Employee Management
        </div>
        <ul className="navbarLinks">
          <li>
            <Link 
              to="/" 
              className={`navbarLink ${location.pathname === '/' ? 'active' : ''}`}
            >
              Add Employee
            </Link>
          </li>
          <li>
            <Link 
              to="/view" 
              className={`navbarLink ${location.pathname === '/view' ? 'active' : ''}`}
            >
              View Employees
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;