import { useCart } from '../context/CartContext';
import { getProductSVG } from '../utils/svgHelpers';
import { Link } from 'react-router-dom';

export default function CartSidebar() {
  const { items, isOpen, totalPrice, dispatch } = useCart();

  const close = () => dispatch({ type: 'CLOSE_CART' });
  const remove = (id) => dispatch({ type: 'REMOVE_ITEM', id });
  const updateQty = (id, delta) => dispatch({ type: 'UPDATE_QTY', id, delta });

  const shipping = totalPrice >= 1500 ? 0 : 99;
  const finalTotal = totalPrice + shipping;

  return (
    <>
      <div className={`cart-overlay${isOpen ? ' open' : ''}`} onClick={close}/>
      <aside className={`cart-sidebar${isOpen ? ' open' : ''}`}>
        {/* Header */}
        <div className="cart-header">
          <h3>Your Cart</h3>
          <button className="cart-close-btn" onClick={close}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="cart-items">
          {items.length === 0 ? (
            <div className="cart-empty">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <p>Your cart is empty</p>
              <Link to="/shop" className="btn btn-ghost" style={{ fontSize: '0.78rem' }} onClick={close}>
                Browse Products
              </Link>
            </div>
          ) : (
            items.map(item => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-thumb">
                  {getProductSVG(item)}
                </div>
                <div className="cart-item-info">
                  <p className="cart-item-name">{item.name}</p>
                  <p className="cart-item-meta">{item.clay}</p>
                  <p className="cart-item-price">₹{(item.price * item.qty).toLocaleString()}</p>
                  <div className="cart-item-qty">
                    <button className="qty-btn" onClick={() => updateQty(item.id, -1)}>−</button>
                    <span className="qty-val">{item.qty}</span>
                    <button className="qty-btn" onClick={() => updateQty(item.id, 1)}>+</button>
                  </div>
                </div>
                <button className="cart-item-remove" onClick={() => remove(item.id)}>Remove</button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-line">
              <span>Subtotal</span>
              <span>₹{totalPrice.toLocaleString()}</span>
            </div>
            <div className="cart-line">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
            </div>
            {shipping > 0 && (
              <div className="cart-line" style={{ color: 'var(--clay)', fontSize: '0.75rem' }}>
                <span>Add ₹{(1500 - totalPrice).toLocaleString()} more for free shipping</span>
              </div>
            )}
            <div className="cart-total-line">
              <span>Total</span>
              <span>₹{finalTotal.toLocaleString()}</span>
            </div>
            <Link
              to="/checkout"
              className="btn btn-primary btn-full"
              onClick={close}
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
