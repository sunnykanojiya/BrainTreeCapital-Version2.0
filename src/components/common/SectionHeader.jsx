export default function SectionHeader({ label, title, centered = true, className = '', pillClassName = '', titleClassName = '' }) {
  return (
    <div className={`${centered ? 'mx-auto max-w-[980px] text-center' : ''} ${className}`}>
      {label && <div className={`brand-pill ${pillClassName}`}>{label}</div>}
      <h2 className={`brand-serif mt-4 text-[36px] leading-[1.15] !tracking-normal text-navy md:text-[48px] ${titleClassName}`}>{title}</h2>
    </div>
  );
}
