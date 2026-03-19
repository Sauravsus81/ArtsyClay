import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchProducts } from '../utils/api';
import ProductCard from '../components/ProductCard';
import NewsletterSection from '../components/NewsletterSection';

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'mugs', label: 'Mugs & Cups' },
  { value: 'plates', label: 'Plates' },
  { value: 'bowls', label: 'Bowls' },
  { value: 'vases', label: 'Vases' },
  { value: 'sets', label: 'Sets' },
];

const SORTS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const category = searchParams.get('category') || 'all';
  const sort = searchParams.get('sort') || 'featured';

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (category !== 'all') params.category = category;
    if (sort !== 'featured') params.sort = sort;

    fetchProducts(params)
      .then(d => setProducts(d.data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [category, sort]);

  const setFilter = (val) => {
    const p = new URLSearchParams(searchParams);
    if (val === 'all') p.delete('category'); else p.set('category', val);
    setSearchParams(p);
  };

  const setSort = (val) => {
    const p = new URLSearchParams(searchParams);
    if (val === 'featured') p.delete('sort'); else p.set('sort', val);
    setSearchParams(p);
  };

  return (
    <>
      {/* HERO */}
      <section className="shop-hero">
        <div className="container">
          <span className="eyebrow">Handmade with care</span>
          <h1>Our <em className="text-clay text-italic">Collection</em></h1>
          <p>Every piece is hand-thrown, wood-fired, and entirely unique. Explore our full range of ceramic goods.</p>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="section">
        <div className="container">
          <div className="shop-toolbar">
            <div className="shop-filters">
              {FILTERS.map(f => (
                <button
                  key={f.value}
                  className={`filter-btn${category === f.value ? ' active' : ''}`}
                  onClick={() => setFilter(f.value)}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="shop-sort">
              <span>Sort by</span>
              <select
                className="sort-select"
                value={sort}
                onChange={e => setSort(e.target.value)}
              >
                {SORTS.map(s => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
              <span style={{ color: 'var(--warm-gray)', fontSize: '0.75rem', marginLeft: '0.5rem' }}>
                {products.length} products
              </span>
            </div>
          </div>

          {loading ? (
            <div className="loading-spinner"><div className="spinner"/>Loading products…</div>
          ) : products.length === 0 ? (
            <p style={{ color: 'var(--warm-gray)', textAlign: 'center', padding: '4rem', gridColumn: '1/-1' }}>
              No products found.
            </p>
          ) : (
            <div className="shop-grid">
              {products.map(p => <ProductCard key={p.id} product={p}/>)}
            </div>
          )}
        </div>
      </section>

      <NewsletterSection />
    </>
  );
}
