import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartSidebar from './CartSidebar';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalQty, dispatch } = useCart();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  }, [location]);

  const toggleMenu = () => {
    setMenuOpen(o => {
      document.body.style.overflow = !o ? 'hidden' : '';
      return !o;
    });
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className={`site-nav${scrolled ? ' scrolled' : ''}`}>
        {/* Logo */}
        <Link to="/" className="nav-logo">
          Artsy Clay<span></span>
        </Link>

        {/* Desktop links */}
        <ul className="nav-links">
          {[['/', 'Home'], ['/shop', 'Shop'], ['/contact', 'Contact']].map(([path, label]) => (
            <li key={path}>
              <Link to={path} className={isActive(path) ? 'active' : ''}>{label}</Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="nav-actions">
          <button
            className="nav-icon-btn"
            onClick={() => dispatch({ type: 'OPEN_CART' })}
            aria-label="Open cart"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            <span className="cart-badge">{totalQty}</span>
          </button>
        </div>

        {/* Hamburger */}
        <button
          className={`nav-hamburger${menuOpen ? ' open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span/><span/><span/>
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/contact">Contact</Link>
        <button
          className="btn btn-outline"
          onClick={() => { setMenuOpen(false); document.body.style.overflow = ''; dispatch({ type: 'OPEN_CART' }); }}
        >
          Cart ({totalQty})
        </button>
      </div>

      <CartSidebar />
    </>
  );
}
