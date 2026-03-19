import { useState } from 'react';
import { submitContact } from '../utils/api';
import { useToast } from '../context/ToastContext';

export default function ContactPage() {
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitContact(form);
      showToast("Thanks! We'll get back to you within 24 hours.", 'check');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      showToast('Something went wrong. Try again.', 'heart');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* HERO */}
      <section className="contact-hero">
        <div className="container">
          <span className="eyebrow">We'd love to hear from you</span>
          <h1>Get in <em className="text-clay text-italic">Touch</em></h1>
          <p>Questions about an order, custom commissions, or just want to say hello? We're here.</p>
        </div>
      </section>

      {/* CONTENT */}
      <section>
        <div className="container">
          <div className="contact-inner">
            {/* Info */}
            <div className="contact-info">
              <h2>Reach out to our studio</h2>
              <p>We're a small team of passionate potters based in Greater Noida. Whether you have questions about a product, need help with an order, or want to commission a custom piece — we'd love to talk.</p>

              {[
                {
                  label: 'Visit Our Studio',
                  detail: 'Shop no. 123, Greater Noida West, Uttar Pradesh — 201306',
                  icon: <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>,
                },
                {
                  label: 'Email Us',
                  detail: 'hello@artsyclay.in\norders@artsyclay.in',
                  icon: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
                },
                {
                  label: 'Call Us',
                  detail: '+91 97111 12345\nMon–Sat, 10am–6pm IST',
                  icon: <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.72A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>,
                },
              ].map(item => (
                <div className="contact-item" key={item.label}>
                  <div className="contact-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      {item.icon}
                    </svg>
                  </div>
                  <div className="contact-item-text">
                    <h4>{item.label}</h4>
                    {item.detail.split('\n').map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}

              <div style={{ marginTop: '2rem', background: 'var(--cream)', borderRadius: 'var(--radius)', height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '0.5rem' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--clay)" strokeWidth="1.5" style={{ width: 32, height: 32 }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <p style={{ fontSize: '0.82rem', color: 'var(--warm-gray)' }}>Sanganer Pottery District, Jaipur</p>
              </div>
            </div>

            {/* Form */}
            <div className="contact-form-wrap">
              <h3>Send us a message</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Name</label>
                    <input className="form-input" name="name" placeholder="Your name" value={form.name} onChange={handleChange} required/>
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input className="form-input" type="email" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required/>
                  </div>
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <input className="form-input" name="subject" placeholder="What's this about?" value={form.subject} onChange={handleChange}/>
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea className="form-textarea" name="message" placeholder="Tell us everything…" value={form.message} onChange={handleChange} required rows={5}/>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-full"
                  disabled={loading}
                  style={{ opacity: loading ? 0.7 : 1 }}
                >
                  {loading ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
