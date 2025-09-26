import React from 'react';
import { Link } from 'react-router';
import '/src/css/header.css';
import headerBg from '/src/assets/images/dogs-header-image.jpeg';

const Header = () => {
    return (
        <header className="header" style={{ backgroundImage: `url(${headerBg})` }}>
          <div className="header-container">
            <div className ="nav-links">
            <Link to="/home">Hem</Link>
            
            <Link to="/dogs">Hundar</Link>

             <Link to="/about">Om oss</Link>


            </div>
          </div>
        </header>
    );
}
export default Header;