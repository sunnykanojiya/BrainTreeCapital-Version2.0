import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import BrandLogo from '../common/BrandLogo';
import { APP_INSTALL_URL } from '../../constants/siteLinks';

const navItems = [
  { label: 'Portfolios', href: '#global-portfolios' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'About', href: '#about' },
  { label: 'Contact Us', href: '/contact' },
];

const AUTH_URL = APP_INSTALL_URL;

export default function Navbar() {
  const { pathname, hash } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 8);
    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    const closeOnWideScreen = () => {
      if (window.innerWidth >= 1280) setMenuOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('resize', closeOnWideScreen);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('resize', closeOnWideScreen);
    };
  }, [menuOpen]);

  const linkFor = (item) => item.href.startsWith('#')
    ? pathname === '/' ? item.href : `/${item.href}`
    : item.href;
  const linkClass = (active) => `relative whitespace-nowrap py-2 text-[14px] transition-colors hover:text-navy 2xl:text-[15px] ${active ? 'font-semibold text-navy after:absolute after:inset-x-0 after:-bottom-2 after:h-0.5 after:bg-blue' : 'font-medium text-[#475775]'}`;
  const isActive = (item) => {
    if (item.label === 'Portfolios') return pathname === '/' && hash === '#global-portfolios';
    if (item.label === 'Why Us') return pathname === '/' && hash === '#why-us';
    if (item.label === 'Contact Us') return pathname === '/contact';
    return false;
  };

  return (
    <header className={`sticky top-0 z-50 border-b border-transparent bg-white/90 backdrop-blur-[12px] transition-[border-color,box-shadow] duration-200 ${scrolled ? 'border-[#DCE5F1] shadow-[0_4px_20px_rgba(10,27,61,0.06)]' : ''}`}>
      <nav className="mx-auto flex h-[79px] w-[calc(100%-32px)] max-w-[1280px] items-center justify-between gap-2 sm:w-[calc(100%-48px)] xl:gap-6">
        <BrandLogo className="justify-self-start" />
        <div className="hidden min-w-0 items-center justify-center gap-5 whitespace-nowrap xl:mx-auto xl:flex 2xl:gap-8">
          {navItems.map((item) => {
            const active = isActive(item);
            const href = linkFor(item);
            return <Link key={item.label} to={href} className={linkClass(active)}>{item.label}</Link>;
          })}
        </div>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3 xl:gap-2">
          <a href={AUTH_URL} target="_blank" rel="noopener noreferrer" className="hidden h-10 items-center justify-center rounded-xl border border-[#D6E1F0] px-3 text-[13px] font-semibold text-navy transition-colors hover:border-[#AFC2E3] hover:bg-[#F7F9FD] xl:inline-flex 2xl:px-4 2xl:text-[14px]">Log in</a>
          <a href={AUTH_URL} target="_blank" rel="noopener noreferrer" className="hidden h-10 items-center justify-center rounded-xl bg-blue px-3 text-[13px] font-semibold text-white shadow-[0_3px_8px_rgba(33,80,232,0.18)] transition-colors hover:bg-[#1B44C8] xl:inline-flex 2xl:px-4 2xl:text-[14px]">Sign up</a>
          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue xl:hidden"
          >
            {menuOpen ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
          </button>
        </div>
      </nav>
      {menuOpen && (
        <div className="absolute inset-x-0 top-full min-h-[calc(100dvh-79px)] overflow-y-auto overscroll-contain border-b border-[#DCE5F1] bg-white px-6 pb-5 pt-2 shadow-[0_12px_24px_rgba(10,27,61,0.08)] xl:hidden">
          <div className="mx-auto flex max-w-[1280px] flex-col">
            {navItems.map((item) => {
              const active = isActive(item);
              const href = linkFor(item);
              return <Link key={item.label} to={href} onClick={() => setMenuOpen(false)} className={`${linkClass(active)} border-b border-[#EEF2F8] py-3`}>{item.label}</Link>;
            })}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <a href={AUTH_URL} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} className="inline-flex h-11 items-center justify-center rounded-xl border border-[#D6E1F0] px-4 text-[14px] font-semibold text-navy transition-colors hover:border-[#AFC2E3] hover:bg-[#F7F9FD]">Log in</a>
              <a href={AUTH_URL} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} className="primary-button inline-flex h-11 items-center justify-center rounded-xl bg-blue px-4 text-[14px] font-semibold text-white shadow-[0_3px_8px_rgba(33,80,232,0.18)] hover:bg-[#1B44C8]">Sign up</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
