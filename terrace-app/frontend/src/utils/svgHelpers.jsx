// svgHelpers.jsx — React SVG components for ceramic product illustrations

export function getMugSVG(c1, c2) {
  return (
    <svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="220" fill="none"/>
      <ellipse cx="100" cy="200" rx="50" ry="10" fill={c2} opacity="0.3"/>
      <path d="M55 140 Q52 112 58 90 Q74 58 100 53 Q126 58 142 90 Q148 112 145 140 Q130 165 100 168 Q70 165 55 140Z" fill={c1}/>
      <path d="M55 140 Q52 112 58 90 Q74 58 100 53 Q126 58 142 90 Q148 112 145 140 Q130 165 100 168 Q70 165 55 140Z" fill="url(#mg)" opacity="0.35"/>
      <ellipse cx="100" cy="54" rx="44" ry="9" fill={c2}/>
      <path d="M142 100 Q160 97 160 110 Q160 126 142 122" stroke={c2} strokeWidth="5" fill="none" strokeLinecap="round"/>
      <path d="M70 97 Q100 90 130 97" stroke="white" strokeWidth="1" opacity="0.35"/>
      <path d="M68 115 Q100 108 132 115" stroke="white" strokeWidth="0.8" opacity="0.3"/>
      <defs>
        <linearGradient id="mg" x1="55" y1="53" x2="145" y2="168" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="white" stopOpacity="0.5"/>
          <stop offset="100%" stopColor={c2} stopOpacity="0.1"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

export function getBowlSVG(c1, c2) {
  return (
    <svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="160" rx="68" ry="14" fill={c2} opacity="0.3"/>
      <path d="M32 110 Q30 86 40 68 Q58 38 100 34 Q142 38 160 68 Q170 86 168 110 Q155 145 100 149 Q45 145 32 110Z" fill={c1}/>
      <path d="M32 110 Q30 86 40 68 Q58 38 100 34 Q142 38 160 68 Q170 86 168 110 Q155 145 100 149 Q45 145 32 110Z" fill="url(#bw)" opacity="0.4"/>
      <ellipse cx="100" cy="35" rx="68" ry="13" fill={c2}/>
      <ellipse cx="100" cy="33" rx="48" ry="8" fill="white" opacity="0.2"/>
      <defs>
        <linearGradient id="bw" x1="32" y1="34" x2="168" y2="149" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="white" stopOpacity="0.5"/>
          <stop offset="100%" stopColor={c2} stopOpacity="0.1"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

export function getPlateSVG(c1, c2) {
  return (
    <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="130" rx="80" ry="18" fill={c2} opacity="0.3"/>
      <ellipse cx="100" cy="116" rx="80" ry="16" fill={c2} opacity="0.5"/>
      <ellipse cx="100" cy="108" rx="80" ry="16" fill={c1}/>
      <ellipse cx="100" cy="108" rx="62" ry="12" fill={c2} opacity="0.4"/>
      <ellipse cx="100" cy="107" rx="38" ry="7" fill="white" opacity="0.12"/>
      <ellipse cx="100" cy="108" rx="76" ry="15" fill="none" stroke="white" strokeWidth="0.8" opacity="0.3"/>
      <path d="M20 108 Q20 124 34 130 Q62 140 100 140 Q138 140 166 130 Q180 124 180 108" fill={c2} opacity="0.4"/>
    </svg>
  );
}

export function getTeaSVG(c1, c2) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="95" cy="185" rx="52" ry="10" fill={c2} opacity="0.25"/>
      <path d="M55 128 Q52 104 60 84 Q76 54 95 50 Q114 54 130 84 Q138 104 135 128 Q120 152 95 155 Q70 152 55 128Z" fill={c1}/>
      <path d="M55 128 Q52 104 60 84 Q76 54 95 50 Q114 54 130 84 Q138 104 135 128 Q120 152 95 155 Q70 152 55 128Z" fill="url(#ts)" opacity="0.4"/>
      <path d="M130 99 Q152 95 152 107 Q152 120 130 117" stroke={c2} strokeWidth="5" fill="none" strokeLinecap="round"/>
      <path d="M55 98 Q36 95 36 108 Q36 122 55 119" stroke={c2} strokeWidth="4" fill="none" strokeLinecap="round"/>
      <ellipse cx="95" cy="51" rx="36" ry="8" fill={c2}/>
      <ellipse cx="95" cy="47" rx="13" ry="5" fill={c1} opacity="0.8"/>
      <rect x="142" y="158" width="36" height="28" rx="2" fill={c1} opacity="0.6"/>
      <ellipse cx="160" cy="158" rx="20" ry="5" fill={c2} opacity="0.5"/>
      <defs>
        <linearGradient id="ts" x1="55" y1="50" x2="135" y2="155" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="white" stopOpacity="0.5"/>
          <stop offset="100%" stopColor={c2} stopOpacity="0.1"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

export function getVaseSVG(c1, c2) {
  return (
    <svg viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="265" rx="52" ry="11" fill={c2} opacity="0.3"/>
      <path d="M64 210 Q52 160 60 120 Q72 68 100 58 Q128 68 140 120 Q148 160 136 210 Q120 235 100 238 Q80 235 64 210Z" fill={c1}/>
      <path d="M64 210 Q52 160 60 120 Q72 68 100 58 Q128 68 140 120 Q148 160 136 210 Q120 235 100 238 Q80 235 64 210Z" fill="url(#vs)" opacity="0.4"/>
      <path d="M78 60 Q100 48 122 60 Q114 52 100 50 Q86 52 78 60Z" fill={c2} opacity="0.5"/>
      <path d="M66 138 Q100 132 134 138" stroke="white" strokeWidth="0.8" opacity="0.3"/>
      <path d="M64 158 Q100 150 136 158" stroke="white" strokeWidth="0.8" opacity="0.3"/>
      <defs>
        <linearGradient id="vs" x1="64" y1="58" x2="136" y2="238" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="white" stopOpacity="0.5"/>
          <stop offset="100%" stopColor={c2} stopOpacity="0.1"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

export function getProductSVG(product) {
  const c1 = product.svgColor;
  const c2 = product.svgColor2;
  switch (product.category) {
    case 'mugs':   return getMugSVG(c1, c2);
    case 'bowls':  return getBowlSVG(c1, c2);
    case 'plates': return getPlateSVG(c1, c2);
    case 'sets':   return getTeaSVG(c1, c2);
    case 'vases':  return getVaseSVG(c1, c2);
    default:       return getMugSVG(c1, c2);
  }
}

export function StarsHTML({ rating }) {
  return (
    <div className="product-stars">
      {Array.from({ length: 5 }, (_, i) => {
        const fill = i < Math.floor(rating) ? 'var(--clay)' : (i < rating ? 'var(--clay-light)' : '#e0d0c0');
        return (
          <svg key={i} className="star" viewBox="0 0 20 20">
            <polygon points="10,2 12.4,7.6 18.5,8.2 14,12.2 15.6,18.1 10,15 4.4,18.1 6,12.2 1.5,8.2 7.6,7.6" fill={fill}/>
          </svg>
        );
      })}
    </div>
  );
}
