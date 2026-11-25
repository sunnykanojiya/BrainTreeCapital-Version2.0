export function PrimaryButton({ children, href = '#', className = '', size = 'default', target, rel }) {
  const styles = size === 'hero'
    ? 'h-[52px] rounded-xl bg-blue px-7 text-[16px] font-semibold text-white shadow-none'
    : size === 'showcase'
      ? 'h-[54px] rounded-xl bg-blue px-7 text-[16px] font-semibold text-white shadow-none'
    : size === 'steps'
      ? 'h-[58px] rounded-xl bg-blue px-[30px] text-[16px] font-semibold text-white shadow-none'
    : size === 'cta'
      ? 'h-[62px] rounded-[14px] bg-white px-[34px] text-[16px] font-semibold !text-navy shadow-none'
    : 'rounded-xl bg-blue px-7 py-4 text-[18px] font-semibold text-white shadow-lg shadow-blue/20';
  return (
    <a href={href} target={target} rel={rel} className={`primary-button inline-flex items-center justify-center ${styles} ${className}`}>
      {children}
    </a>
  );
}

export function SecondaryButton({ children, href = '#', className = '', size = 'default', target, rel }) {
  const styles = size === 'hero'
    ? 'h-[52px] rounded-xl border border-[#dce5f1] bg-white px-7 text-[16px] font-semibold text-navy hover:bg-white'
    : size === 'resources'
      ? 'h-[52px] rounded-xl border border-[#C9DAF4] bg-white px-7 text-[16px] font-semibold text-navy hover:bg-white'
    : 'rounded-xl border border-[#dfe8f4] bg-transparent px-7 py-4 text-[18px] font-semibold text-navy hover:bg-white';
  return (
    <a href={href} target={target} rel={rel} className={`secondary-button inline-flex items-center justify-center ${styles} ${className}`}>
      {children}
    </a>
  );
}
