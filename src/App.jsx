import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import {
  FileText,
  PenLine,
  PlayCircle,
  Search,
} from 'lucide-react';
import SiteLayout from './components/layout/SiteLayout';
import AllWeatherPage from './pages/AllWeather';
import ContactPage from './pages/Contact';
import Home from './pages/Home';

const pageMetadata = {
  '/': {
    title: 'BrainTree Capital | Global ETF Portfolios',
    description: 'BrainTree Capital offers managed global ETF portfolios for Indian residents, NRIs and GCC residents.',
  },
  '/contact': {
    title: 'Contact BrainTree Capital',
    description: 'Contact BrainTree Capital directly by email or schedule a 30-minute call.',
  },
  '/portfolios/all-weather': {
    title: 'All Weather Portfolio | BrainTree Capital',
    description: "Learn about BrainTree Capital's All Weather portfolio.",
  },
};

const _learnCards = [
  { type: 'Article', title: 'LRS for global investing', href: '#', coverColor: '#EEF4FA' },
  { type: 'Article', title: 'TCS explained', href: '#', coverColor: '#FFF4D6' },
  { type: 'Article', title: 'Diversifying your RSUs', href: '#', coverColor: '#E1EAFC' },
];

const _learnTypeIcons = { Article: FileText, Video: PlayCircle, Blog: PenLine };

function RouteMetadata() {
  const { pathname } = useLocation();

  useEffect(() => {
    const normalizedPath = pathname.replace(/\/+$/, '') || '/';
    const page = pageMetadata[normalizedPath] ?? pageMetadata['/'];
    const canonicalUrl = `https://www.braintreecap.com${normalizedPath === '/' ? '/' : normalizedPath}`;
    const values = [
      ['meta[name="description"]', 'content', page.description],
      ['link[rel="canonical"]', 'href', canonicalUrl],
      ['meta[property="og:title"]', 'content', page.title],
      ['meta[property="og:description"]', 'content', page.description],
      ['meta[property="og:url"]', 'content', canonicalUrl],
      ['meta[name="twitter:title"]', 'content', page.title],
      ['meta[name="twitter:description"]', 'content', page.description],
    ];

    document.title = page.title;
    values.forEach(([selector, attribute, value]) => {
      document.querySelector(selector)?.setAttribute(attribute, value);
    });
  }, [pathname]);

  return null;
}



// return (
//     <section data-reveal className="bg-white px-4 pt-[84px] pb-[80px] sm:px-6">
//       <div className="mx-auto max-w-[1188px]">
//         <header className="text-center">
//           <span className="inline-flex h-8 items-center rounded-full bg-gold-tint px-[14px] text-[13px] font-semibold text-gold-text">How we invest</span>
//           <h2 className="brand-serif mt-4 text-[36px] leading-[1.15] !tracking-normal text-navy md:text-[48px]">The Layered Pyramid Approach.</h2>
//           <p className="mx-auto mt-4 max-w-[680px] text-[18px] leading-[1.5] text-[#475775]">Four layers of ETFs, from the safest at the base to the boldest at the top. </p>
//         </header>
//         <PyramidLayersView />
//         <div className="mx-auto mt-9 max-w-[860px] rounded-3xl bg-gold-tint p-5 text-left sm:p-7 md:mt-14 md:p-9">
//           <h3 className="brand-serif text-[28px] leading-[1.25] !tracking-normal text-navy">The barbell approach</h3>
//           <p className="mt-3 text-[16px] leading-6 text-[#475775]">A capital-preservation core compounded with a bounded high-conviction growth sleeve — sized so that even a complete drawdown of the growth side cannot materially impair the core.</p>
//           <div role="group" aria-label="Barbell allocation: 70 to 80 percent Preservation Core and 20 to 30 percent Growth Sleeve" className="relative mt-8 grid grid-cols-[minmax(0,1fr)_minmax(64px,0.6fr)_minmax(0,1fr)] items-center sm:grid-cols-[minmax(0,1fr)_minmax(96px,0.6fr)_minmax(0,1fr)] md:mt-10">
//             <div className="relative z-10 flex min-h-[108px] flex-col items-center justify-center rounded-[8px] border border-[#B8C6D8] bg-[#FFF9E9] p-2 text-center sm:min-h-[122px] sm:p-5 md:min-h-[132px] md:p-6">
//               <div className="brand-serif text-[20px] font-bold leading-tight text-navy sm:text-[32px] md:text-[40px]">70–80%</div>
//               <div className="mt-2 text-[9px] font-semibold leading-[1.35] tracking-[0.02em] text-[#475775] sm:text-[11px] sm:tracking-[0.12em] md:text-[12px]">PRESERVATION<br />CORE</div>
//             </div>
//             <div className="relative z-20 flex h-10 items-center justify-center sm:h-12">
//               <span aria-hidden="true" className="absolute left-0 top-1/2 h-[6px] w-1/2 -translate-y-1/2 bg-[#AAB8C9] sm:h-[8px]" />
//               <span aria-hidden="true" className="absolute right-0 top-1/2 h-[6px] w-1/2 -translate-y-1/2 bg-[#AAB8C9] sm:h-[8px]" />
//               <span aria-hidden="true" className="relative flex h-9 w-9 items-center justify-center rounded-full border-[4px] border-[#9EABC3] bg-gold-tint sm:h-11 sm:w-11 sm:border-[5px] md:h-12 md:w-12">
//                 <span className="h-3 w-3 rounded-full bg-[#9EABC3] sm:h-4 sm:w-4" />
//               </span>
//             </div>
//             <div className="relative z-10 flex min-h-[108px] flex-col items-center justify-center rounded-[8px] border border-[#E1C77D] bg-[#FFF4D6] p-2 text-center sm:min-h-[122px] sm:p-5 md:min-h-[132px] md:p-6">
//               <div className="brand-serif text-[20px] font-bold leading-tight text-[#A87919] sm:text-[32px] md:text-[40px]">20–30%</div>
//               <div className="mt-2 text-[9px] font-semibold leading-[1.35] tracking-[0.02em] text-[#475775] sm:text-[11px] sm:tracking-[0.12em] md:text-[12px]">GROWTH<br />SLEEVE</div>
//             </div>
//           </div>
//         </div>
//         <div className="mt-10 flex flex-wrap justify-center gap-3">
//           {pyramidChips.map((chip) => (
//             <span key={chip.text} className="inline-flex items-center gap-2 rounded-full border border-[#C9DAF4] bg-[#F1F6FD] px-4 py-2.5 text-[13px] font-semibold leading-5 text-navy">
//               <chip.icon aria-hidden="true" size={16} strokeWidth={1.75} className="text-blue" />
//               {chip.text}
//             </span>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

export default function App() {
  return (
    <BrowserRouter>
      <RouteMetadata />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/portfolios/all-weather" element={<AllWeatherPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
