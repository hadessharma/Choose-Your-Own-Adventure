import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    Choose Your Adventure
                </Link>
                <div className="navbar-links">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/admin" className="nav-link">Submit Story</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
