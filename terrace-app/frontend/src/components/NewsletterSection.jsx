import { useState } from 'react';
import { subscribeNewsletter } from '../utils/api';
import { useToast } from '../context/ToastContext';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
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
    <section className="newsletter-section">
      <div className="container">
        <span className="eyebrow">Stay Connected</span>
        <h2>Join the <em style={{ fontStyle: 'italic' }}>Kiln Circle</em></h2>
        <p>Be first to know about new collections, studio open days, and the stories behind each piece.</p>
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            className="newsletter-input"
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button className="newsletter-btn" type="submit">Subscribe</button>
        </form>
      </div>
    </section>
  );
}
