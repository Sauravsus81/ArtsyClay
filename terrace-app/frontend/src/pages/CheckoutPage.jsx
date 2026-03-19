import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { placeOrder } from '../utils/api';
import { getProductSVG } from '../utils/svgHelpers';

const PAYMENT_METHODS = ['UPI', 'Card', 'COD'];

export default function CheckoutPage() {
  const { items, totalPrice, dispatch } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', pincode: '',
  });

  const shipping = totalPrice >= 1500 ? 0 : 99;
  const total = totalPrice + shipping;

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (items.length === 0) return;
    setLoading(true);
    try {
      const orderData = {
        ...form,
        cart: items.map(i => ({ id: i.id, name: i.name, price: i.price, qty: i.qty })),
        paymentMethod,
        total,
      };
      const res = await placeOrder(orderData);
      dispatch({ type: 'CLEAR_CART' });
      showToast(`Order ${res.orderId} confirmed! 🎉`, 'check');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      showToast(err.message || 'Something went wrong.', 'heart');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div style={{ padding: '10rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: '1rem' }}>Your cart is empty</h2>
        <Link to="/shop" className="btn btn-primary">Shop Now</Link>
      </div>
    );
  }

  return (
    <section className="checkout-page">
      <div className="container">
        <div className="breadcrumb" style={{ marginBottom: '2.5rem' }}>
          <Link to="/">Home</Link><span>›</span>
          <Link to="/shop">Shop</Link><span>›</span>
          <span>Checkout</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', marginBottom: '2rem' }}>Checkout</h1>

        <div className="checkout-inner">
          {/* FORM */}
          <div className="checkout-form-section">
            <h2>Delivery Information</h2>
            <form id="checkoutForm" onSubmit={handleSubmit}>
              <div className="form-row">
                <Field label="First Name" name="firstName" placeholder="Priya" value={form.firstName} onChange={handleChange} required/>
                <Field label="Last Name" name="lastName" placeholder="Sharma" value={form.lastName} onChange={handleChange} required/>
              </div>
              <Field label="Email" name="email" type="email" placeholder="priya@example.com" value={form.email} onChange={handleChange} required/>
              <Field label="Phone" name="phone" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} required/>

              <p className="form-section-title">Shipping Address</p>
              <Field label="Address" name="address" placeholder="Building, Street, Area" value={form.address} onChange={handleChange} required/>
              <div className="form-row">
                <Field label="City" name="city" placeholder="Jaipur" value={form.city} onChange={handleChange} required/>
                <Field label="State" name="state" placeholder="Rajasthan" value={form.state} onChange={handleChange} required/>
              </div>
              <div className="form-row">
                <Field label="PIN Code" name="pincode" placeholder="302001" value={form.pincode} onChange={handleChange} required/>
                <div className="form-group">
                  <label>Country</label>
                  <input className="form-input" value="India" readOnly style={{ opacity: 0.7 }}/>
                </div>
              </div>

              <p className="form-section-title">Payment Method</p>
              <div className="payment-methods">
                {PAYMENT_METHODS.map(m => (
                  <button
                    key={m}
                    type="button"
                    className={`pay-method${paymentMethod === m ? ' active' : ''}`}
                    onClick={() => setPaymentMethod(m)}
                  >
                    {m}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-full"
                disabled={loading}
                style={{ marginTop: '1rem', opacity: loading ? 0.7 : 1 }}
              >
                {loading ? 'Placing Order…' : `Place Order · ₹${total.toLocaleString()}`}
              </button>
            </form>
          </div>

          {/* ORDER SUMMARY */}
          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="order-items">
              {items.map(item => (
                <div className="order-item" key={item.id}>
                  <div className="order-item-thumb">{getProductSVG(item)}</div>
                  <div style={{ flex: 1 }}>
                    <p className="order-item-name">{item.name}</p>
                    <p className="order-item-sub">{item.clay}</p>
                    <p className="order-item-sub">Qty: {item.qty}</p>
                  </div>
                  <span className="order-item-price">₹{(item.price * item.qty).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="order-line"><span>Subtotal</span><span>₹{totalPrice.toLocaleString()}</span></div>
            <div className="order-line">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
            </div>
            <div className="order-total-line">
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
            <p style={{ fontSize: '0.72rem', color: 'var(--warm-gray)', marginTop: '1rem', lineHeight: 1.6 }}>
              Your order will be carefully packed and dispatched within 3–5 business days. Each piece is wrapped with care to ensure it arrives safely.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = 'text', placeholder, value, onChange, required }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        className="form-input"
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}
