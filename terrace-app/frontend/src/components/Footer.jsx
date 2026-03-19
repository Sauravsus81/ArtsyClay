import { Link } from 'react-router-dom';
import { useState } from 'react';
import { subscribeNewsletter } from '../utils/api';
import { useToast } from '../context/ToastContext';

export default function Footer() {
  const [email, setEmail] = useState('');
  const { showToast } = useToast();

  const handleNewsletter = async (e) => {
    e.preventDefault();
    try {
      await subscribeNewsletter(email);
      showToast("You're subscribed! Welcome to the Kiln Circle.", 'check');
      setEmail('');
    } catch {
      showToast('Something went wrong. Try again.', 'heart');
    }
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="nav-logo">Artsy Clay<span style={{ color: 'var(--clay)', fontStyle: 'italic' }}></span></div>
            <p style={{ marginTop: '1rem' }}>
              Hand-thrown ceramics crafted by artisans in Jaipur. Every piece tells a story of earth, fire, and human care.
            </p>
            <form onSubmit={handleNewsletter} style={{ display: 'flex', marginTop: '1.5rem', gap: 0 }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="newsletter-input"
                style={{ borderRadius: 'var(--radius) 0 0 var(--radius)', fontSize: '0.82rem', padding: '0.6rem 1rem' }}
              />
              <button type="submit" className="newsletter-btn" style={{ borderRadius: '0 var(--radius) var(--radius) 0', padding: '0.6rem 1rem', fontSize: '0.7rem' }}>
                Subscribe
              </button>
            </form>
          </div>

          <div className="footer-col">
            <h4>Shop</h4>
            <ul>
              <li><Link to="/shop">All Products</Link></li>
              <li><Link to="/shop?category=mugs">Mugs &amp; Cups</Link></li>
              <li><Link to="/shop?category=plates">Plates &amp; Dishes</Link></li>
              <li><Link to="/shop?category=bowls">Bowls</Link></li>
              <li><Link to="/shop?category=vases">Vases &amp; Décor</Link></li>
              <li><Link to="/shop?category=sets">Gift Sets</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Help</h4>
            <ul>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><a href="#">Shipping Policy</a></li>
              <li><a href="#">Returns &amp; Exchanges</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Track Your Order</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Studio</h4>
            <ul>
              <li><a href="#">Our Story</a></li>
              <li><a href="#">The Artisans</a></li>
              <li><a href="#">How It's Made</a></li>
              <li><a href="#">Care Guide</a></li>
              <li><a href="#">Custom Orders</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Artsy Clay Ceramics. All rights reserved. Made with love in Jaipur.</p>
          <p style={{ fontSize: '0.72rem', opacity: 0.5 }}>Handcrafted · Wood-fired · Food-safe · Made in India</p>
        </div>
      </div>
    </footer>
  );
}
