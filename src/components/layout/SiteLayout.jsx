import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AnnouncementBar from './AnnouncementBar';
import Navbar from './Navbar';

export default function SiteLayout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let observer;
    let frame;
    const revealVisibleElements = () => {
      if (document.visibilityState !== 'visible') return;
      root.classList.add('reveal-enabled');
      observer?.disconnect();
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      const elements = [...document.querySelectorAll('[data-reveal], [data-reveal-card]')];
      elements.forEach((element) => observer.observe(element));
      frame = requestAnimationFrame(() => {
        elements.forEach((element) => {
          const bounds = element.getBoundingClientRect();
          if (bounds.top < window.innerHeight && bounds.bottom > 0) {
            element.classList.add('is-visible');
            observer.unobserve(element);
          }
        });
      });
    };
    revealVisibleElements();
    document.addEventListener('visibilitychange', revealVisibleElements);
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      document.removeEventListener('visibilitychange', revealVisibleElements);
      root.classList.remove('reveal-enabled');
    };
  }, [pathname]);

  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);

  return (
    <div className="text-navy">
      {pathname === '/' && <AnnouncementBar />}
      <Navbar key={pathname} />
      <Outlet />
    </div>
  );
}
