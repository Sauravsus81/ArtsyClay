import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProduct } from '../utils/api';
import { getProductSVG, getBowlSVG, StarsHTML } from '../utils/svgHelpers';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import ProductCard from '../components/ProductCard';
import NewsletterSection from '../components/NewsletterSection';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [activeThumb, setActiveThumb] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const { dispatch } = useCart();
  const { showToast } = useToast();

  useEffect(() => {
    setLoading(true);
    setQty(1);
    setActiveThumb(0);
    setSelectedColor(0);
    fetchProduct(id)
      .then(d => { setProduct(d.data); setRelated(d.related); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="loading-spinner" style={{ paddingTop: '10rem' }}><div className="spinner"/>Loading…</div>;
  if (!product) return <div style={{ padding: '10rem 2rem', textAlign: 'center' }}>Product not found.</div>;

  const thumbs = [
    getProductSVG(product),
    getProductSVG({ ...product, svgColor: product.svgColor2, svgColor2: product.svgColor }),
    getBowlSVG(product.svgColor, product.svgColor2),
  ];

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) dispatch({ type: 'ADD_ITEM', product });
    dispatch({ type: 'OPEN_CART' });
    showToast('Added to cart', 'check');
  };

  return (
    <>
      <section className="product-detail-page">
        <div className="container">
          {/* Breadcrumb */}
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span>›</span>
            <Link to="/shop">Shop</Link>
            <span>›</span>
            <span style={{ color: 'var(--clay)' }}>{product.name}</span>
          </div>

          <div className="product-detail-grid">
            {/* Images */}
            <div className="product-images">
              <div className="product-main-img">
                {thumbs[activeThumb]}
              </div>
              <div className="product-thumbs">
                {thumbs.map((svg, i) => (
                  <div
                    key={i}
                    className={`thumb-item${activeThumb === i ? ' active' : ''}`}
                    onClick={() => setActiveThumb(i)}
                  >
                    {svg}
                  </div>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="product-info">
              <p className="product-info-clay">{product.clay}</p>
              <h1 className="product-info-name">{product.name}</h1>

              <div className="product-info-rating">
                <StarsHTML rating={product.rating} />
                <span className="rating-val">{product.rating}</span>
                <span className="rating-reviews">({product.reviews} reviews)</span>
              </div>

              <div className="product-info-price">
                ₹{product.price.toLocaleString()}
                {product.oldPrice && (
                  <span className="product-price-old" style={{ fontSize: '1.1rem', marginLeft: '0.6rem' }}>
                    ₹{product.oldPrice.toLocaleString()}
                  </span>
                )}
              </div>

              <p className="product-info-desc">{product.desc}</p>

              {/* Colors */}
              <div>
                <p className="color-label">Glaze Variation</p>
                <div className="color-swatches">
                  {product.colors.map((c, i) => (
                    <div
                      key={i}
                      className={`color-swatch${selectedColor === i ? ' active' : ''}`}
                      style={{ background: c }}
                      onClick={() => setSelectedColor(i)}
                    />
                  ))}
                </div>
              </div>

              {/* Qty */}
              <div className="qty-row">
                <span style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500 }}>Quantity</span>
                <div className="qty-control">
                  <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                  <span className="qty-val">{qty}</span>
                  <button className="qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
                </div>
              </div>

              {/* Actions */}
              <div className="product-actions">
                <button className="btn btn-primary" onClick={handleAddToCart}>
                  Add to Cart
                </button>
                <Link to="/checkout" className="btn btn-dark" onClick={() => {
                  for (let i = 0; i < qty; i++) dispatch({ type: 'ADD_ITEM', product });
                }}>
                  Buy Now
                </Link>
              </div>

              {/* Trust */}
              <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--cream)', borderRadius: 'var(--radius)' }}>
                {[
                  '✓ Free shipping on orders over ₹1500',
                  '✓ Food-safe, lead-free glaze certified',
                  '✓ Microwave & dishwasher safe',
                  '✓ 15-day hassle-free returns',
                ].map(t => (
                  <p key={t} style={{ fontSize: '0.8rem', color: 'var(--warm-gray)', marginBottom: '0.4rem' }}>{t}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div style={{ marginTop: '6rem' }}>
              <div className="section-header">
                <div>
                  <span className="eyebrow">You may also like</span>
                  <h2 className="section-title">Related <em className="text-clay text-italic">Pieces</em></h2>
                </div>
              </div>
              <div className="products-grid">
                {related.map(p => <ProductCard key={p.id} product={p}/>)}
              </div>
            </div>
          )}
        </div>
      </section>

      <NewsletterSection />
    </>
  );
}
