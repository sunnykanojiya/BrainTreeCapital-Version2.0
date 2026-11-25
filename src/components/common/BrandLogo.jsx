import { Link } from 'react-router-dom';

export default function BrandLogo({ className = '', imageClassName = '' }) {
  return (
    <Link to="/" aria-label="BrainTree Capital home" className={`inline-flex shrink-0 ${className}`}>
      <img
        src="/braintree-capital-wordmark.png"
        alt=""
        className={`h-[70px] w-[127px] object-contain ${imageClassName}`}
      />
    </Link>
  );
}
