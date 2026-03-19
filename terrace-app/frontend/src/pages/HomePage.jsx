import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchFeatured } from '../utils/api';
import ProductCard from '../components/ProductCard';
import NewsletterSection from '../components/NewsletterSection';

const CATEGORIES = [
  { key: 'mugs',   label: 'Mugs & Cups',          count: '24 pieces',   cls: 'cat-mugs' },
  { key: 'plates', label: 'Plates & Dishes',       count: '18 pieces',   cls: 'cat-plates' },
  { key: 'vases',  label: 'Vases & Décor',         count: '12 pieces',   cls: 'cat-vases' },
  { key: 'bowls',  label: 'Bowls',                 count: '16 pieces',   cls: 'cat-bowls' },
  { key: 'sets',   label: 'Gift Sets & Collections', count: '8 curated sets', cls: 'cat-sets', tall: true },
];

const CatSVGs = {
  mugs: (
    <svg className="cat-icon" viewBox="0 0 200 200" fill="white">
      <path d="M55 140 Q52 115 58 95 Q75 62 100 58 Q125 62 142 95 Q148 115 145 140 Q130 160 100 162 Q70 160 55 140Z" opacity="0.7"/>
      <path d="M144 100 Q165 96 165 108 Q165 122 144 118" stroke="white" strokeWidth="6" fill="none" strokeLinecap="round"/>
      <ellipse cx="100" cy="59" rx="38" ry="8" opacity="0.8"/>
    </svg>
  ),
  plates: (
    <svg className="cat-icon" viewBox="0 0 200 200" fill="white">
      <ellipse cx="100" cy="130" rx="75" ry="16" opacity="0.7"/>
      <ellipse cx="100" cy="120" rx="75" ry="16" opacity="0.5"/>
      <ellipse cx="100" cy="118" rx="55" ry="11" opacity="0.4"/>
      <ellipse cx="100" cy="117" rx="30" ry="6" opacity="0.3"/>
    </svg>
  ),
  vases: (
    <svg className="cat-icon" viewBox="0 0 200 250" fill="white">
      <path d="M65 195 Q60 155 68 120 Q85 75 100 68 Q115 75 132 120 Q140 155 135 195 Q120 215 100 218 Q80 215 65 195Z" opacity="0.7"/>
      <path d="M82 68 Q100 58 118 68 Q108 58 100 56 Q92 58 82 68Z" opacity="0.5"/>
    </svg>
  ),
  bowls: (
    <svg className="cat-icon" viewBox="0 0 200 170" fill="white">
      <path d="M22 110 Q20 88 30 68 Q50 30 100 26 Q150 30 170 68 Q180 88 178 110 Q160 148 100 152 Q40 148 22 110Z" opacity="0.6"/>
      <ellipse cx="100" cy="27" rx="78" ry="14" opacity="0.7"/>
    </svg>
  ),
  sets: (
    <svg className="cat-icon" viewBox="0 0 200 220" fill="white">
      <path d="M55 128 Q52 104 60 84 Q76 54 95 50 Q114 54 130 84 Q138 104 135 128 Q120 152 95 155 Q70 152 55 128Z" opacity="0.6"/>
      <path d="M130 99 Q152 95 152 107 Q152 120 130 117" stroke="white" strokeWidth="6" fill="none"/>
      <ellipse cx="95" cy="51" rx="36" ry="8" opacity="0.7"/>
      <rect x="130" y="175" width="40" height="28" rx="2" opacity="0.5"/>
      <ellipse cx="150" cy="175" rx="22" ry="5" opacity="0.4"/>
    </svg>
  ),
};

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeatured()
      .then(d => setFeatured(d.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-text">
          <span className="eyebrow hero-eyebrow">Handmade with Earth &amp; Fire</span>
          <h1 className="hero-title">
            Every piece<br/>tells a <em className="text-clay text-italic">story.</em>
          </h1>
          <p className="hero-desc">
            Hand-thrown ceramics crafted by artisans who believe in slow, intentional making. Each cup, plate, and bowl carries the warmth of human hands and the character of the earth it came from.
          </p>
          <div className="hero-actions">
            <Link to="/shop" className="btn btn-primary btn-lg">Shop Now</Link>
            <a href="#about" className="btn btn-outline btn-lg">Our Process</a>
          </div>
          <div className="hero-trust">
            {[
              ['Free shipping over ₹1500', <polyline key="1" points="20 6 9 17 4 12"/>],
              ['100% Handmade', <path key="2" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>],
              ['Easy returns', <><polyline key="3a" points="1 4 1 10 7 10"/><path key="3b" d="M3.51 15a9 9 0 102.13-9.36L1 10"/></>],
            ].map(([label, icon], i) => (
              <div className="trust-item" key={i}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16, stroke: 'var(--clay)' }}>
                  {icon}
                </svg>
                {label}
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-visual-bg"/>
          <div className="hero-visual-center">
            <svg className="hero-ceramic" viewBox="0 0 300 360" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="150" cy="340" rx="75" ry="12" fill="#8B5E52" opacity="0.3"/>
              <path d="M92 275 Q77 195 88 148 Q100 76 150 56 Q200 76 212 148 Q223 195 208 275 Q183 308 150 312 Q117 308 92 275Z" fill="#c4845a"/>
              <path d="M92 275 Q77 195 88 148 Q100 76 150 56 Q200 76 212 148 Q223 195 208 275 Q183 308 150 312 Q117 308 92 275Z" fill="url(#heroGrad)" opacity="0.4"/>
              <path d="M116 57 Q150 43 184 57 Q172 48 150 46 Q128 48 116 57Z" fill="#8B5E52" opacity="0.5"/>
              <path d="M96 162 Q150 155 204 162" stroke="white" strokeWidth="1" opacity="0.35"/>
              <path d="M94 186 Q150 178 206 186" stroke="white" strokeWidth="1" opacity="0.3"/>
              <ellipse cx="86" cy="316" rx="30" ry="8" fill="#7a8c6e" opacity="0.4"/>
              <path d="M58 291 Q56 274 62 262 Q78 256 110 262 Q116 274 114 291 Q100 302 86 303 Q72 302 58 291Z" fill="#7a8c6e"/>
              <path d="M113 270 Q126 267 126 278 Q126 290 113 287" stroke="#5a6c4e" strokeWidth="4" fill="none" strokeLinecap="round"/>
              <ellipse cx="86" cy="262" rx="28" ry="6" fill="#8a9c7e"/>
              <ellipse cx="214" cy="325" rx="54" ry="12" fill="#8a7060" opacity="0.4"/>
              <ellipse cx="214" cy="317" rx="54" ry="10" fill="#a0806a"/>
              <ellipse cx="214" cy="317" rx="40" ry="7" fill="#b09078" opacity="0.5"/>
              <defs>
                <linearGradient id="heroGrad" x1="92" y1="56" x2="212" y2="312" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="white" stopOpacity="0.45"/>
                  <stop offset="100%" stopColor="#8B5E52" stopOpacity="0.1"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="hero-decor-dots">
            {Array.from({ length: 18 }).map((_, i) => <span key={i}/>)}
          </div>
          <div className="hero-badge">
            <strong>500+</strong>
            <span>Pieces crafted</span>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-bar">
        <div className="marquee-track">
          {['Handcrafted','Wheel-Thrown','Food Safe Glazes','Microwave & Dishwasher Safe','Free Shipping Over ₹1500','Gift Wrapping Available','Made in India'].flatMap((item, i) => [
            <span className="marquee-item" key={`a${i}`}>{item}</span>,
            <span className="marquee-sep" key={`sa${i}`}>✦</span>,
          ])}
          {['Handcrafted','Wheel-Thrown','Food Safe Glazes','Microwave & Dishwasher Safe','Free Shipping Over ₹1500','Gift Wrapping Available','Made in India'].flatMap((item, i) => [
            <span className="marquee-item" key={`b${i}`}>{item}</span>,
            <span className="marquee-sep" key={`sb${i}`}>✦</span>,
          ])}
        </div>
      </div>

      {/* FEATURED PRODUCTS */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="eyebrow">Just Arrived</span>
              <h2 className="section-title">New <em className="text-clay text-italic">Arrivals</em></h2>
            </div>
            <Link to="/shop" className="section-link">View All Products →</Link>
          </div>
          {loading ? (
            <div className="loading-spinner"><div className="spinner"/>Loading products…</div>
          ) : (
            <div className="products-grid">
              {featured.map(p => <ProductCard key={p.id} product={p}/>)}
            </div>
          )}
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={{ background: 'var(--dark)', padding: '6rem 0' }}>
        <div className="container">
          <div className="section-header">
            <div>
              <span className="eyebrow" style={{ color: 'var(--clay)' }}>Browse</span>
              <h2 className="section-title" style={{ color: 'var(--cream)' }}>Shop by <em className="text-clay text-italic">Category</em></h2>
            </div>
            <Link to="/shop" className="section-link">All Collections →</Link>
          </div>
          <div className="categories-grid">
            {CATEGORIES.map(cat => (
              <Link
                key={cat.key}
                to={`/shop?category=${cat.key}`}
                className={`category-card${cat.tall ? ' cat-tall' : ''}`}
              >
                <div className={`category-bg ${cat.cls}`} style={cat.tall ? { minHeight: '420px' } : {}}>
                  {CatSVGs[cat.key]}
                </div>
                <div className="category-label">
                  <h3>{cat.label}</h3>
                  <p>{cat.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about-section" id="about">
        <div className="container">
          <div className="about-inner">
            <div className="about-text">
              <span className="eyebrow">Our Philosophy</span>
              <h2 className="section-title">Rooted in the <em className="text-clay text-italic">ancient craft</em> of pottery</h2>
              <p>Every piece in our collection is thrown on a potter's wheel, shaped by hand, and fired in a wood kiln outside Jaipur. We source our clay from local riverbeds and use only natural mineral glazes — no chemicals, no shortcuts.</p>
              <p>Our artisans train for years to master the balance between strength and delicacy that defines truly great ceramics. The result is tableware that improves with age and tells its own quiet story through every meal shared.</p>
              <Link to="/shop" className="btn btn-outline" style={{ marginTop: '1rem' }}>Explore the Collection</Link>
              <div className="about-stats">
                {[['12+','Artisans'],['500+','Pieces made'],['100%','Handmade'],['8 yrs','Of craft']].map(([num, label]) => (
                  <div className="stat-item" key={label}>
                    <span className="stat-num">{num}</span>
                    <span className="stat-label">{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="about-visual-wrap">
              <div className="about-img-main">
                <svg viewBox="0 0 300 320" width="260" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="150" cy="305" rx="80" ry="14" fill="#8B5E52" opacity="0.25"/>
                  <path d="M78 240 Q62 178 72 132 Q88 72 150 52 Q212 72 228 132 Q238 178 222 240 Q198 278 150 283 Q102 278 78 240Z" fill="#c4845a" opacity="0.9"/>
                  <path d="M78 240 Q62 178 72 132 Q88 72 150 52 Q212 72 228 132 Q238 178 222 240 Q198 278 150 283 Q102 278 78 240Z" fill="url(#aboutG)" opacity="0.5"/>
                  <path d="M82 148 Q150 140 218 148" stroke="white" strokeWidth="1.2" opacity="0.35"/>
                  <path d="M80 170 Q150 160 220 170" stroke="white" strokeWidth="1" opacity="0.28"/>
                  <defs>
                    <linearGradient id="aboutG" x1="78" y1="52" x2="228" y2="283" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="white" stopOpacity="0.5"/>
                      <stop offset="100%" stopColor="#8B5E52" stopOpacity="0.1"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="about-img-badge">
                <strong>Wood-fired</strong>
                <p>All our ceramics are fired in a traditional wood kiln at 1280°C</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            {[
              { title: 'Made in India', desc: 'Hand-thrown in our Jaipur studio by trained potters using centuries-old techniques.', icon: <><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></> },
              { title: 'Food Safe Glazes', desc: 'All glazes are tested and certified food-safe, lead-free, and microwave-safe.', icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/> },
              { title: 'Free Shipping', desc: 'Complimentary shipping on all orders above ₹1500. Delivered carefully, always.', icon: <><rect x="1" y="3" width="15" height="13" rx="1"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></> },
              { title: 'Easy Returns', desc: 'Not happy? Return within 15 days for a full refund or exchange, no questions asked.', icon: <><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></> },
            ].map(f => (
              <div className="feature-item" key={f.title}>
                <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">{f.icon}</svg>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section section">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="eyebrow">What People Say</span>
              <h2 className="section-title">Made with <em className="text-clay text-italic">love,</em> felt in every cup</h2>
            </div>
          </div>
          <div className="testimonials-grid">
            {[
              { initial: 'P', name: 'Priya Sharma', loc: 'Mumbai', color: 'var(--clay)', rating: 5, text: '"Each morning I wrap my hands around my Terracè mug and feel the warmth — not just of the tea, but of the hands that shaped it. Truly special."' },
              { initial: 'A', name: 'Arjun Mehta', loc: 'Bangalore', color: 'var(--sage)', rating: 5, text: '"The sage bowl is absolutely stunning. The glaze has this beautiful depth and the weight in the hand is just perfect. I gift these to everyone."' },
              { initial: 'K', name: 'Kavya Reddy', loc: 'Hyderabad', color: 'var(--lavender)', rating: 4.5, text: '"Ordered the wabi-sabi tea set as a wedding gift. The packaging was gorgeous and the set itself is a true heirloom. Will be ordering for myself next!"' },
            ].map(t => (
              <div className="testimonial-card" key={t.name}>
                <div className="t-stars">
                  {Array.from({ length: 5 }, (_, i) => (
                    <svg key={i} className="star" viewBox="0 0 20 20">
                      <polygon points="10,2 12.4,7.6 18.5,8.2 14,12.2 15.6,18.1 10,15 4.4,18.1 6,12.2 1.5,8.2 7.6,7.6" fill={i < Math.floor(t.rating) ? 'var(--clay)' : '#e0d0c0'}/>
                    </svg>
                  ))}
                </div>
                <p className="t-body">{t.text}</p>
                <div className="t-author">
                  <div className="t-avatar" style={{ background: t.color }}>{t.initial}</div>
                  <div>
                    <p className="t-name">{t.name}</p>
                    <p className="t-loc">{t.loc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <NewsletterSection />
    </>
  );
}
