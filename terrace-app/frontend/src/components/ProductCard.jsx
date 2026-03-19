import { Link } from 'react-router-dom';
import { getProductSVG, StarsHTML } from '../utils/svgHelpers';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export default function ProductCard({ product }) {
  const { dispatch } = useCart();
  const { showToast } = useToast();

  const addToCart = (e) => {
    e.preventDefault();
    dispatch({ type: 'ADD_ITEM', product });
    showToast('Added to cart', 'check');
  };

  return (
    <div className="product-card">
      <div className="product-thumb">
        {product.badge && (
          <span className={`product-badge badge-${product.badge}`}>{product.badgeText}</span>
        )}
        {getProductSVG(product)}
        <div className="product-thumb-overlay">
          <Link to={`/product/${product.id}`} className="btn btn-primary btn-sm">
            Quick View
          </Link>
        </div>
      </div>
      <StarsHTML rating={product.rating} />
      <p className="product-name">
        <Link to={`/product/${product.id}`} style={{ color: 'inherit' }}>{product.name}</Link>
      </p>
      <p className="product-meta">{product.clay}</p>
      <div className="product-footer">
        <span className="product-price">
          ₹{product.price.toLocaleString()}
          {product.oldPrice && (
            <span className="product-price-old">₹{product.oldPrice.toLocaleString()}</span>
          )}
        </span>
        <button className="btn-cart" onClick={addToCart}>+ Add</button>
      </div>
    </div>
  );
}
