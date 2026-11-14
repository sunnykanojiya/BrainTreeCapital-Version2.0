import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Link, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import {
  ArrowLeftRight,
  ArrowRight,
  BadgeDollarSign,
  Building2,
  Cpu,
  FileText,
  Globe,
  Globe2,
  GraduationCap,
  Info,
  KeyRound,
  Layers,
  LineChart,
  Menu,
  Minus,
  PenLine,
  PlayCircle,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Unlock,
  Users,
  X,
} from 'lucide-react';
import GlobeHero from './components/globe/GlobeHero';
import { portfolioSeries } from './content';

const navItems = [
  { label: 'Portfolios', href: '/portfolios/all-weather' },
  { label: 'Why U.S.', href: '#why-us' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Resources', href: '#resources' },
  { label: 'About', href: '#about' },
];

const reasons = [
  { key: 'FX', icon: ArrowLeftRight, title: 'Diversify across currencies and geographies', text: 'Spread your money beyond one country and one currency.' },
  { key: 'TOP', icon: Globe, title: 'Own global leaders', text: 'Hold a share of the largest businesses in the world.' },
  { key: 'NEXT', icon: Cpu, title: 'Own the technologies of tomorrow', text: 'Be invested where the next big ideas are built.' },
];

const whyUsStats = [
  { value: 'About 45%', desc: 'of world market value is listed in the US', tone: 'blue' },
  { value: 'About 4%', desc: "is India's share of world market value", tone: 'blue' },
  { value: '34 vs 79 lakh', desc: 'what 10 lakh became from 2015 to 2025: Nifty 50 against the S&P 500', tone: 'gold' },
];

const investorCards = [
  { title: 'Buy a stock you already use', body: 'Pick a company whose product you know, such as Apple.', icon: ShoppingBag },
  { title: 'Buy an ETF', body: 'Choose a fund because it looks popular or someone recommended it.', icon: Layers },
  { title: 'Buy an index ETF', body: 'Hold a broad index and hope the market does the work.', icon: LineChart },
];

const pyramidLayers = [
  { name: 'Conviction', desc: 'High growth themes, the technologies of the future', accent: 'blue' },
  { name: 'Smart Beta', desc: 'Momentum based ETFs', accent: 'blue' },
  { name: 'Core Equity', desc: 'Owns the broad US market through index ETFs', accent: 'light' },
  { name: 'Defensive and Income', desc: 'Protects in falls and generates steady returns', accent: 'light' },
];

const allWeatherAudience = [
  { label: 'ETF', title: 'Investors who want less guesswork', text: 'One disciplined portfolio instead of tips and single picks.', icon: LineChart },
  { label: 'EDU', title: 'Families planning ahead', text: "Dollar assets for goals like a child's education abroad.", icon: GraduationCap },
  { label: 'RSU', title: 'RSU holders and business owners', text: 'Spread your risk beyond one company or one country.', icon: BadgeDollarSign },
];

const pyramidChips = [
  { text: 'Rebalanced every quarter', icon: RefreshCw },
  { text: 'Layer sizes set by our investment committee', icon: Users },
  { text: 'Illustrative. Examples shown in portfolio detail.', icon: Info },
];

const safetyCards = [
  { title: 'Regulated custody', desc: 'SIPC member custody and an SEC registered broker-dealer, through DriveWealth.', icon: ShieldCheck },
  { title: 'Fully digital KYC', desc: 'Verify online in about a day. No branch visits.', icon: Smartphone },
  { title: 'You own what you hold', desc: 'Securities sit in your name, and you control them.', icon: KeyRound },
  { title: 'No lock-in, no exit fee', desc: 'Withdraw whenever you choose.', icon: Unlock },
];

const audienceCards = [
  { label: 'NRI', title: 'NRIs', text: 'Keep your wealth working in global markets, wherever you live.', icon: Globe2 },
  { label: 'RSU', title: 'CXOs holding RSUs', text: 'Executives in Indian tech companies who want to spread risk beyond one company\'s shares.', icon: BadgeDollarSign },
  { label: 'BIZ', title: 'Business owners', text: 'Put surplus capital to work outside India, under the RBI\'s rules.', icon: Building2 },
];

const steps = [
  { number: '1', title: 'Open an account', text: 'Sign up online in a few minutes.' },
  { number: '2', title: 'Complete KYC', text: 'Verify your identity digitally in about a day. No branch visits and no paperwork.' },
  { number: '3', title: 'Invest through LRS', text: 'Send money abroad under the RBI\'s LRS, up to US $250,000 per person each year, then invest in the portfolio. Remittance takes 2 to 5 days.' },
];

const teamMembers = [
  { name: 'Anurag Bhatnagar', title: 'Title to be confirmed' },
  { name: 'Varun Verma', title: 'Title to be confirmed' },
  { name: 'Shashikant Burnwal', title: 'Title to be confirmed' },
  { name: 'Ian Jason Creado', title: 'Title to be confirmed' },
];

const learnCards = [
  { type: 'Article', title: 'LRS for global investing', href: '#', coverColor: '#EEF4FA' },
  { type: 'Article', title: 'TCS explained', href: '#', coverColor: '#FFF4D6' },
  { type: 'Article', title: 'Diversifying your RSUs', href: '#', coverColor: '#E1EAFC' },
];

const learnTypeIcons = { Article: FileText, Video: PlayCircle, Blog: PenLine };

const faqs = [
  { q: 'How is BrainTree different?', a: '' },
  { q: 'Is sending money abroad legal?', a: 'Yes. The RBI specifically allows it under its Liberalised Remittance Scheme.' },
  { q: 'How will my US gains be taxed?', a: '' },
  { q: 'Can I withdraw any time?', a: '' },
  { q: 'Can NRIs use BrainTree?', a: '' },
  { q: 'I hold RSUs. Should I diversify?', a: '' },
  { q: 'Who holds my securities?', a: '' },
  { q: 'What are the minimum and top-up amounts?', a: '' },
];

function SectionHeader({ label, title, centered = true, className = '', pillClassName = '', titleClassName = '' }) {
  return (
    <div className={`${centered ? 'mx-auto max-w-[980px] text-center' : ''} ${className}`}>
      {label && <div className={`brand-pill ${pillClassName}`}>{label}</div>}
      <h2 className={`brand-serif mt-4 text-[36px] leading-[1.15] !tracking-normal text-navy md:text-[48px] ${titleClassName}`}>{title}</h2>
    </div>
  );
}

function BrandLogo({ className = '' }) {
  return <Link to="/" className={`whitespace-nowrap text-[20px] font-semibold tracking-normal text-navy ${className}`}>BrainTree Capital</Link>;
}

function PrimaryButton({ children, href = '#', className = '', size = 'default' }) {
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
    <a href={href} className={`primary-button inline-flex items-center justify-center ${styles} ${className}`}>
      {children}
    </a>
  );
}

function SecondaryButton({ children, href = '#', className = '', size = 'default' }) {
  const styles = size === 'hero'
    ? 'h-[52px] rounded-xl border border-[#dce5f1] bg-white px-7 text-[16px] font-semibold text-navy hover:bg-white'
    : size === 'resources'
      ? 'h-[52px] rounded-xl border border-[#C9DAF4] bg-white px-7 text-[16px] font-semibold text-navy hover:bg-white'
    : 'rounded-xl border border-[#dfe8f4] bg-transparent px-7 py-4 text-[18px] font-semibold text-navy hover:bg-white';
  return (
    <a href={href} className={`secondary-button inline-flex items-center justify-center ${styles} ${className}`}>
      {children}
    </a>
  );
}

function useInView(immediate = false) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(() => (
    immediate || (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  ));

  useEffect(() => {
    const element = ref.current;
    if (!element || visible) return undefined;
    const frame = requestAnimationFrame(() => {
      const bounds = element.getBoundingClientRect();
      if (bounds.top < window.innerHeight && bounds.bottom > 0) setVisible(true);
    });
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(element);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [visible]);

  return [ref, visible];
}

function stepChartPath(values) {
  const points = values.map((y, index) => [index * 240 / (values.length - 1), y]);
  const line = points.reduce((path, [x, y], index) => (
    index === 0 ? `M${x} ${y}` : `${path} H${x} V${y}`
  ), '');
  return { line, fill: `${line} V90 H0 Z` };
}

function PortfolioPhone({ animateImmediately = false }) {
  const [activeRange, setActiveRange] = useState('ALL');
  const [viewRef, inView] = useInView(animateImmediately);
  const reduceMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [value, setValue] = useState(() => reduceMotion ? 24860.5 : 0);
  const chart = stepChartPath(portfolioSeries[activeRange]);

  useEffect(() => {
    if (!inView || reduceMotion) return undefined;
    let frame = 0;
    const started = performance.now();
    const animate = (now) => {
      const progress = Math.min((now - started) / 800, 1);
      setValue(24860.5 * (1 - (1 - progress) ** 3));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduceMotion]);

  return (
    <div ref={viewRef} className={`showcase-phone relative z-10 border border-[#1A2340] bg-white shadow-[0_22px_42px_rgba(10,27,61,0.2)] ${inView ? 'is-visible' : ''}`}>
      <div className="phone-screen relative h-full rounded-[12%] bg-white px-[7.333cqw] pb-[6cqw] pt-[5.333cqw]">
        <div aria-hidden="true" className="absolute left-1/2 top-[4cqw] h-[8cqw] w-[28.667cqw] -translate-x-1/2 rounded-full bg-[#0A1B3D]" />
        <div className="flex h-[6cqw] items-center justify-between text-[4cqw] font-semibold leading-none text-navy">
          <span>11:37</span><span>5G</span>
        </div>
        <div className="mt-[4.667cqw] flex items-center gap-[2.667cqw] text-left text-[5.333cqw] font-semibold leading-5 text-navy">
          <span className="h-[6.667cqw] w-[6.667cqw] shrink-0 rounded-full bg-blue" />
          <span>All Weather portfolio</span>
        </div>
        <div className="mt-[4cqw] text-[12cqw] font-bold leading-[1.1] tracking-normal text-navy">
          ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <div className="mt-[1.333cqw] text-[4.667cqw] leading-5 text-green">+$1,240.30 (5.25%) All time</div>
        <div className="mt-[4cqw] flex h-[11.333cqw] items-center rounded-[4cqw] bg-gold-tint px-[4cqw] text-[4.333cqw] font-semibold text-gold-text">Quarterly rebalance ready</div>
        <svg className="mt-[4cqw] h-[30cqw] w-full overflow-visible" viewBox="0 0 240 90" role="img" aria-label="Hypothetical portfolio value chart">
          <defs>
            <linearGradient id="portfolio-chart-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#2150E8" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#2150E8" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={chart.fill} fill="url(#portfolio-chart-fill)" />
          <path d={chart.line} fill="none" stroke="#2150E8" strokeWidth="2" strokeLinejoin="round" className="portfolio-chart-line" />
        </svg>
        <div className="mt-[1.333cqw] flex items-center justify-between text-[4cqw] leading-4 text-[#475775]">
          {Object.keys(portfolioSeries).map((range) => (
            <button
              key={range}
              type="button"
              aria-pressed={activeRange === range}
              onClick={() => setActiveRange(range)}
              className={`rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue ${activeRange === range ? 'font-bold text-blue' : 'text-[#475775]'}`}
            >
              {range}
            </button>
          ))}
        </div>
        <div className="mt-[2.667cqw] space-y-[1cqw] text-[4cqw] leading-[6cqw] text-[#475775]">
          {[
            ['Defensive & Income', 105, '#8DA4F0'],
            ['Core Equity', 83, '#4F74EA'],
            ['Smart Beta', 57, '#2150E8'],
            ['Conviction', 30, '#0A1B3D'],
          ].map(([label, width, color], index) => (
            <div key={label} className="flex h-[7cqw] items-center justify-between">
              <span>{label}</span>
              <span
                className="h-[2.667cqw] rounded-full"
                style={{
                  width: `${width / 3}cqw`,
                  backgroundColor: color,
                  transform: inView ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: reduceMotion ? 'none' : `transform 600ms ease ${index * 80}ms`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PortfolioShowcase({ variant = 'home' }) {
  const isSubpage = variant === 'allweather';
  return (
    <section
      id={isSubpage ? undefined : 'portfolios'}
      data-reveal={isSubpage ? undefined : ''}
      className={`${isSubpage ? 'flex min-h-[calc(100vh-80px)] items-center' : 'py-[60px] xl:py-[84px]'} bg-mist px-4 sm:px-6`}
    >
      <div className="mx-auto grid w-full max-w-[1200px] items-center gap-8 xl:grid-cols-[460px_minmax(0,1fr)] xl:gap-[clamp(24px,6.94vw,100px)]">
        <div className="xl:max-w-[460px]">
          {isSubpage ? (
            <div className="flex items-center gap-2 text-[14px] font-medium text-blue">
              <Link to="/#portfolios" className="hover:text-navy">Portfolios</Link>
              <span aria-hidden="true">/</span>
              <span>All Weather Portfolio</span>
            </div>
          ) : (
            <div className="text-[14px] font-medium text-blue">Your portfolio</div>
          )}
          {isSubpage ? (
            <h1 className="brand-serif mt-4 text-[36px] leading-[1.25] tracking-normal text-navy sm:text-[48px]">All Weather<br />Portfolio</h1>
          ) : (
            <h2 className="brand-serif mt-4 text-[36px] leading-[1.2] !tracking-normal text-navy md:text-[48px]">See every layer at<br className="hidden md:block" /> work.</h2>
          )}
          <p className="mt-5 max-w-[460px] text-[18px] leading-[1.6] text-[#475775]">
            {isSubpage
              ? 'A global ETF portfolio built on the Layered Pyramid, balanced to hold up in every market season. ETFs only, rebalanced every quarter, from US $10,000.'
              : 'Watch your portfolio grow, see how each of the four layers is doing, and know when we rebalance.'}
          </p>
          <PrimaryButton size="showcase" href="/portfolios/all-weather" className="mt-7">
            {isSubpage ? 'Start investing' : 'See portfolios'}
          </PrimaryButton>
        </div>
        <div className="flex justify-center xl:justify-end">
          <div
            className="showcase-panel relative flex w-full max-w-[640px] items-center justify-center overflow-hidden rounded-[40px] bg-gradient-to-br from-white to-[#DBE6F8]"
            style={{ width: 'min(100%, 640px, calc((100vh - 160px) * 0.941176))' }}
          >
            <div aria-hidden="true" className="showcase-ring showcase-ring-inner absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-[#B9C9F2]" />
            <div aria-hidden="true" className="showcase-ring showcase-ring-outer absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#F2D58A]" />
            <PortfolioPhone animateImmediately={isSubpage} />
            <p className="absolute bottom-[1.75%] z-10 text-center text-[13px] leading-5 text-[#8A9AB8]">Hypothetical figures for illustrative purposes only</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PyramidLayersView() {
  const widths = ['max-w-[420px]', 'max-w-[500px]', 'max-w-[680px]', 'max-w-[860px]'];
  const colors = ['bg-blue text-white', 'bg-[#6F8DF0] text-white', 'bg-[#B5C7F6] text-navy', 'bg-[#E1EAFC] text-navy'];
  return (
    <div className="pyramid-layers mx-auto mt-10 w-full max-w-[860px] space-y-2.5 xl:mt-14">
      {pyramidLayers.map((layer, idx) => (
        <div
          key={layer.name}
          tabIndex={0}
          className={`pyramid-layer mx-auto flex h-[95px] w-full items-center justify-center rounded-2xl text-center ${widths[idx]} ${colors[idx]}`}
        >
          <div>
            <div className="text-[20px] font-semibold leading-6">{layer.name}</div>
            <div className={`mt-1 text-[14px] leading-5 ${idx < 2 ? 'text-white' : 'text-[#0A1B3D]'}`}>{layer.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function AudienceCards({ cards, minHeight = 'min-h-[280px]' }) {
  return (
    <div className="mx-auto mt-10 grid max-w-[1188px] gap-6 md:grid-cols-2 xl:mt-14 xl:grid-cols-3">
      {cards.map((card, index) => (
        <article
          key={card.label}
          data-reveal-card
          style={{ '--reveal-delay': `${index * 80}ms` }}
          className={`${minHeight} rounded-[28px] bg-white p-8`}
        >
          <div role="img" aria-label={card.label} className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-tint text-gold-text">
            <card.icon aria-hidden="true" size={24} strokeWidth={1.75} />
          </div>
          <h3 className="brand-serif mt-5 text-[24px] leading-[1.3] !tracking-normal text-navy xl:text-[26px]">{card.title}</h3>
          <p className="mt-3 text-[16px] leading-[26px] text-[#475775]">{card.text}</p>
        </article>
      ))}
    </div>
  );
}

function FinalCTA() {
  return (
    <section data-reveal className="bg-white px-4 py-8 sm:px-6 xl:py-[90px]">
      <div className="mx-auto flex min-h-[358px] max-w-[920px] flex-col items-center justify-center rounded-[40px] bg-[linear-gradient(135deg,#2150E8_0%,#0A1B3D_62%)] px-6 py-[70px] text-center text-white sm:px-10">
        <h2 className="brand-serif text-[36px] leading-[1.2] !tracking-normal text-white md:text-[48px]">Start with one account.</h2>
        <p className="mt-4 text-[16px] leading-6 text-[#C9D6F5]">Start from India. Invest in the world.</p>
        <div className="mt-8 flex justify-center">
          <PrimaryButton size="cta" href="/portfolios/all-weather">Start investing</PrimaryButton>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="bg-[#0A1B3D] text-[#C5D0E8] xl:min-h-[418px]">
      <div className="mx-auto w-[calc(100%-32px)] max-w-[1280px] pb-[60px] pt-12 sm:w-[calc(100%-48px)] xl:w-full xl:pt-16">
        <div className="grid gap-10 lg:grid-cols-[410px_1fr] lg:gap-0">
          <div className="max-w-[410px]">
            <BrandLogo className="text-[22px] font-semibold tracking-normal text-white" />
            <p className="mt-4 text-[15px] leading-[23px] text-[#C5D0E8]">Professionally managed global investment portfolios for Indian residents, NRIs and foreign investors.</p>
            <p className="mt-3 text-[13px] leading-5 text-[#8FA0C4]">Execution and custody: Stockal (Borderless Softtech Pvt Ltd) and DriveWealth.</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-[94px_116px_82px] lg:justify-end lg:gap-x-[70px]">
            <div>
              <h3 className="text-[14px] font-semibold leading-5 text-[#F7CD62]">Explore</h3>
              <ul className="mt-[14px] space-y-[10px] text-[15px] leading-5 text-[#C5D0E8]">
                <li><Link to="/portfolios/all-weather" className="hover:text-white">Portfolios</Link></li>
                <li><Link to="/#why-us" className="hover:text-white">Why U.S.</Link></li>
                <li><Link to="/#how-it-works" className="hover:text-white">How it works</Link></li>
                <li><Link to="/#resources" className="hover:text-white">Resources</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-[14px] font-semibold leading-5 text-[#F7CD62]">Company</h3>
              <ul className="mt-[14px] space-y-[10px] text-[15px] leading-5 text-[#C5D0E8]">
                <li><Link to="/#about" className="hover:text-white">About and team</Link></li>
                <li><a href="#contact" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-[14px] font-semibold leading-5 text-[#F7CD62]">Legal</h3>
              <ul className="mt-[14px] space-y-[10px] text-[15px] leading-5 text-[#C5D0E8]">
                <li><a href="#privacy" className="hover:text-white">Privacy</a></li>
                <li><a href="#terms" className="hover:text-white">Terms</a></li>
                <li><a href="#disclosures" className="hover:text-white">Disclosures</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 h-px bg-[#24407F]" />
        <p className="mt-6 text-[12.5px] leading-5 text-[#8FA0C4]">All investments involve risk and returns will fluctuate. Past performance does not guarantee future results. Tax treatment depends on your residency and circumstances. Any portfolio figures shown are hypothetical. Wording to be confirmed with compliance.</p>
      </div>
    </footer>
  );
}

function AnnouncementBar() {
  return (
    <div className="flex h-11 items-center border-b border-[#dce5f1] bg-[#f4f7fb]">
      <div className="mx-auto w-[calc(100%-32px)] max-w-[1280px] text-center text-[14px] text-navy">
        <div className="flex flex-nowrap items-center justify-center gap-2 font-medium sm:gap-3">
          <span className="inline-flex shrink-0 rounded-full bg-[#fff4d6] px-3 py-1 text-[12px] font-medium text-[#7a5410]">New</span>
          <span className="min-w-0 text-[10px] leading-[13px] sm:text-[14px] sm:leading-5">All Weather Portfolio is now open. Global ETF portfolio built on the Layered Pyramid.</span>
          <span className="shrink-0 text-[16px] text-blue">→</span>
        </div>
      </div>
    </div>
  );
}

function Navbar() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isPortfolio = pathname.startsWith('/portfolios/');

  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 8);
    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  const linkFor = (item) => item.href.startsWith('#')
    ? pathname === '/' ? item.href : `/${item.href}`
    : item.href;
  const linkClass = (active) => `relative py-2 text-[15px] transition-colors hover:text-navy ${active ? 'font-semibold text-navy after:absolute after:inset-x-0 after:-bottom-2 after:h-0.5 after:bg-blue' : 'font-medium text-[#475775]'}`;

  return (
    <header className={`sticky top-0 z-50 border-b border-transparent bg-white/90 backdrop-blur-[12px] transition-[border-color,box-shadow] duration-200 ${scrolled ? 'border-[#DCE5F1] shadow-[0_4px_20px_rgba(10,27,61,0.06)]' : ''}`}>
      <nav className="mx-auto grid h-[79px] w-[calc(100%-32px)] max-w-[1280px] grid-cols-[1fr_auto_1fr] items-center gap-4 sm:w-[calc(100%-48px)]">
        <BrandLogo className="justify-self-start" />
        <div className="hidden items-center gap-8 whitespace-nowrap lg:flex">
          {navItems.map((item) => {
            const active = item.label === 'Portfolios' && isPortfolio;
            const href = linkFor(item);
            return item.href.startsWith('#') ? (
              <a key={item.label} href={href} className={linkClass(active)}>{item.label}</a>
            ) : (
              <Link key={item.label} to={href} className={linkClass(active)}>{item.label}</Link>
            );
          })}
        </div>
        <div className="flex items-center justify-self-end gap-5">
          <button type="button" aria-label="Search" className="hidden h-5 w-5 items-center justify-center text-navy lg:inline-flex">
            <Search aria-hidden="true" size={20} strokeWidth={1.75} />
          </button>
          <button type="button" className="hidden text-[15px] font-medium text-navy lg:inline-flex">Log in</button>
          <Link to="/portfolios/all-weather" className="primary-button hidden h-11 items-center rounded-xl bg-blue px-5 text-[15px] font-semibold text-white lg:inline-flex">Get started</Link>
          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue lg:hidden"
          >
            {menuOpen ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
          </button>
        </div>
      </nav>
      {menuOpen && (
        <div className="absolute inset-x-0 top-full border-b border-[#DCE5F1] bg-white px-6 pb-5 pt-2 shadow-[0_12px_24px_rgba(10,27,61,0.08)] lg:hidden">
          <div className="mx-auto flex max-w-[1280px] flex-col">
            {navItems.map((item) => {
              const active = item.label === 'Portfolios' && isPortfolio;
              const href = linkFor(item);
              return item.href.startsWith('#') ? (
                <a key={item.label} href={href} onClick={() => setMenuOpen(false)} className={`${linkClass(active)} border-b border-[#EEF2F8] py-3`}>{item.label}</a>
              ) : (
                <Link key={item.label} to={href} onClick={() => setMenuOpen(false)} className={`${linkClass(active)} border-b border-[#EEF2F8] py-3`}>{item.label}</Link>
              );
            })}
            <button type="button" aria-label="Search" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 border-b border-[#EEF2F8] py-3 text-left text-[15px] font-medium text-[#475775]">
              <Search aria-hidden="true" size={20} strokeWidth={1.75} /> Search
            </button>
            <button type="button" onClick={() => setMenuOpen(false)} className="border-b border-[#EEF2F8] py-3 text-left text-[15px] font-medium text-[#475775]">Log in</button>
            <Link to="/portfolios/all-weather" onClick={() => setMenuOpen(false)} className="primary-button mt-4 inline-flex h-11 items-center justify-center rounded-xl bg-blue px-5 text-[15px] font-semibold text-white">Get started</Link>
          </div>
        </div>
      )}
    </header>
  );
}

function SiteLayout() {
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

function PyramidSection() {
  return (
    <section data-reveal className="bg-white px-4 pt-[84px] pb-[80px] sm:px-6">
      <div className="mx-auto max-w-[1188px]">
        <header className="text-center">
          <span className="inline-flex h-8 items-center rounded-full bg-gold-tint px-[14px] text-[13px] font-semibold text-gold-text">How we invest</span>
          <h2 className="brand-serif mt-4 text-[36px] leading-[1.15] !tracking-normal text-navy md:text-[48px]">The Layered Pyramid Approach.</h2>
          <p className="mx-auto mt-4 max-w-[680px] text-[18px] leading-[1.5] text-[#475775]">Four layers of ETFs, from the safest at the base to the boldest at the top. Smaller layers at the top get less money.</p>
        </header>
        <PyramidLayersView />
        <div className="mx-auto mt-9 max-w-[860px] rounded-3xl bg-gold-tint p-7 text-left md:mt-14 md:p-9">
          <h3 className="brand-serif text-[28px] leading-[1.25] !tracking-normal text-navy">Why ETFs, and why Irish wrappers</h3>
          <p className="mt-3 text-[16px] leading-6 text-[#475775]">Our portfolios hold ETFs only, never direct US stocks. Direct US stocks can expose non US investors to US inheritance tax. ETFs domiciled in Ireland help reduce that exposure, under the US and Ireland estate treaty.</p>
          <p className="mt-3 text-[13px] leading-5 text-gold-text">Wording to be confirmed with compliance and tax counsel.</p>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {pyramidChips.map((chip) => (
            <span key={chip.text} className="inline-flex items-center gap-2 rounded-full border border-[#C9DAF4] bg-[#F1F6FD] px-4 py-2.5 text-[13px] font-semibold leading-5 text-navy">
              <chip.icon aria-hidden="true" size={16} strokeWidth={1.75} className="text-blue" />
              {chip.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function AllWeatherBuildSection() {
  return (
    <section data-reveal className="bg-white px-4 py-[60px] sm:px-6 xl:py-[84px]">
      <div className="mx-auto max-w-[1180px]">
        <SectionHeader label="How it is built" title="Four layers, one discipline." />
        <p className="mt-4 text-center text-[17px] leading-[1.6] text-[#475775]">Layer sizes are set by our investment committee and reviewed every quarter.</p>
        <PyramidLayersView />
        <div className="mx-auto mt-14 max-w-[860px] rounded-[24px] bg-[#FFF4D6] p-8 text-left md:p-9">
          <h3 className="brand-serif text-[28px] leading-[1.25] !tracking-normal text-navy">Why ETFs, and why Irish wrappers</h3>
          <p className="mt-3 text-[16px] leading-6 text-[#475775]">Our portfolios hold ETFs only, never direct US stocks. Direct US stocks can expose non US investors to US inheritance tax. ETFs domiciled in Ireland help reduce that exposure, under the US and Ireland estate treaty.</p>
          <p className="mt-3 text-[13px] leading-5 text-gold-text">Wording to be confirmed with compliance and tax counsel.</p>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {pyramidChips.map((chip) => (
            <span key={chip.text} className="inline-flex items-center gap-2 rounded-full border border-[#C9DAF4] bg-[#F1F6FD] px-4 py-2.5 text-[13px] font-semibold leading-5 text-navy">
              <chip.icon aria-hidden="true" size={16} strokeWidth={1.75} className="text-blue" />
              {chip.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function AllWeatherAudienceSection() {
  return (
    <section data-reveal className="bg-mist px-4 py-[60px] sm:px-6 xl:py-[84px]">
      <div className="mx-auto max-w-[1188px]">
        <SectionHeader label="Who it suits" title="Built for long term wealth." />
        <AudienceCards cards={allWeatherAudience} />
        <p className="mx-auto mt-12 max-w-[884px] text-center text-[14px] leading-5 text-[#475775]">
          Performance can lag the stock market in the short term and has been stronger over longer periods (to be confirmed with compliance). Past performance does not guarantee future results.
        </p>
      </div>
    </section>
  );
}

function AllWeatherPage() {
  return (
    <>
      <main className="bg-white text-navy">
        <PortfolioShowcase variant="allweather" />
        <AllWeatherBuildSection />
        <AllWeatherAudienceSection />
        <FinalCTA />
      </main>
      <SiteFooter />
    </>
  );
}

function HomePage() {
  const [openFaq, setOpenFaq] = useState(1);
  const heroRef = useRef(null);

  return (
    <>
      <main className="bg-mist text-navy">
        <section ref={heroRef} className="relative h-[220vh] md:h-[300vh]">
          <div className="sticky top-[80px] flex min-h-[calc(100vh-80px)] items-center">
            <div className="mx-auto w-[calc(100%-32px)] max-w-[1280px] py-2 xl:pb-12 xl:pt-16">
              <div className="grid items-start gap-2 xl:grid-cols-[minmax(0,640px)_minmax(0,560px)] xl:gap-10">
                <div>
                  {/* <div className="inline-flex rounded-full bg-[#fff4d6] px-[14px] py-[6px] text-[13px] font-medium leading-[18px] text-[#7a5410]">Managed ETF portfolios</div> */}
                  <h1 className="hero-title brand-serif mt-1 max-w-[640px] text-[30px] leading-[1.05] tracking-normal text-navy xl:mt-5 xl:text-[58px] xl:leading-[1.15]">Your wealth<br className="hidden xl:block" />Without Borders</h1>

                  <div className="mt-7 flex flex-wrap items-center gap-2 text-[14px] font-medium leading-5 text-[#475775] xl:mt-8">
                    <span>Multi Assets</span>
                    <span className="text-[#C9DAF4]">|</span>
                    <span>Multi Industry</span>
                    <span className="text-[#C9DAF4]">|</span>
                    <span>Multi Geography</span>
                    <span className="text-[#C9DAF4]">|</span>
                    <span>Multi Currency</span>
                  </div>

                  <p className="mt-6 max-w-[520px] text-[16px] leading-[1.55] text-[#475775] xl:mt-8 xl:text-[18px]">Managed portfolios of global businesses, built for the global Indian.</p>

                  <div className="mt-2 flex flex-wrap items-center gap-4 xl:mt-8">
                    <PrimaryButton size="hero" href="/portfolios/all-weather">Start investing</PrimaryButton>
                    <SecondaryButton size="hero" href="#how-it-works" className="border-[#dce5f1] bg-white">See how it works</SecondaryButton>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-1 text-[14px] leading-[18px] text-[#475775] xl:mt-12 xl:gap-y-2 xl:leading-5">
                    <span>SIPC member custody</span>
                    <span className="hidden md:inline">·</span>
                    <span>SEC registered broker-dealer</span>
                    <span className="hidden md:inline">·</span>
                    <span>Fully digital onboarding</span>
                  </div>
                </div>

                <div className="flex justify-center xl:justify-end xl:self-center">
                  <GlobeHero scrollTarget={heroRef} className="mx-auto max-w-[320px] md:max-w-[400px] xl:max-w-[560px]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section data-reveal className="bg-mist px-4 py-[78px] sm:px-6 xl:py-[88px]">
          <div className="mx-auto max-w-[1188px]">
            <header className="text-center">
              <span className="inline-flex h-8 items-center rounded-full bg-gold-tint px-[14px] text-[13px] font-semibold text-gold-text">Why invest globally</span>
              <h2 className="brand-serif mt-4 text-[36px] leading-[1.15] !tracking-normal text-navy md:text-[48px]">Three reasons people invest globally.</h2>
            </header>
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:mt-[60px] xl:grid-cols-3">
              {reasons.map((item, index) => (
                <article key={item.key} data-reveal-card style={{ '--reveal-delay': `${index * 80}ms` }} className="min-h-[314px] rounded-[28px] bg-white p-8 shadow-[0_8px_18px_rgba(10,27,61,0.035)]">
                  <div aria-label={item.key} className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-tint text-gold-text">
                    <item.icon aria-hidden="true" size={24} strokeWidth={1.75} />
                  </div>
                  <h3 className="brand-serif mt-5 text-[24px] leading-[1.3] !tracking-normal text-navy xl:text-[26px]">{item.title}</h3>
                  <p className="mt-3 text-[16px] leading-[26px] text-[#475775]">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="why-us" data-reveal className="bg-white px-4 py-[78px] sm:px-6 xl:py-[88px]">
          <div className="mx-auto max-w-[1200px]">
            <header className="text-center">
              <span className="inline-flex h-8 items-center rounded-full bg-gold-tint px-[14px] text-[13px] font-semibold text-gold-text">Why US markets</span>
              <h2 className="brand-serif mt-4 text-[36px] leading-[1.15] !tracking-normal text-navy md:text-[48px]">Built for a global portfolio.</h2>
              <p className="mx-auto mt-4 max-w-[900px] text-[18px] leading-[1.5] text-[#475775]">The US is nearly half of the world's market value, against about 4% for India.</p>
            </header>
            <div className="mt-10 grid gap-6 md:grid-cols-3 xl:mt-[62px]">
              {whyUsStats.map((stat, idx) => (
                <article key={idx} className={`min-h-[188px] rounded-3xl p-7 xl:p-9 ${stat.tone === 'gold' ? 'bg-gold-tint' : 'bg-mist'}`}>
                  <div className="brand-serif text-[48px] leading-[1.1] !tracking-normal text-navy">{stat.value}</div>
                  <p className="mt-3 text-[16px] leading-6 text-[#475775]">{stat.desc}</p>
                </article>
              ))}
            </div>
            <p className="mt-10 text-center text-[13px] leading-5 text-[#7C8BA6] xl:mt-[52px]">Figures to be confirmed before launch. Past performance does not guarantee future results.</p>
          </div>
        </section>

        <section data-reveal className="bg-mist px-4 py-[78px] sm:px-6 xl:py-[88px]">
          <div className="mx-auto max-w-[1188px]">
            <header className="text-center">
              <span className="inline-flex h-8 items-center rounded-full bg-gold-tint px-[14px] text-[13px] font-semibold text-gold-text">How most Indians invest in the US today</span>
              <h2 className="brand-serif mx-auto mt-4 max-w-[760px] text-[36px] leading-[1.15] !tracking-normal text-navy md:text-[48px]">
                Most picks start with a tip, not<br className="hidden md:block" /> research.
              </h2>
              <p className="mt-4 text-[18px] leading-[1.5] text-[#475775]">Three common ways in, and why they often fall short.</p>
            </header>
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:mt-[56px] xl:grid-cols-3">
              {investorCards.map((card, idx) => (
                <article key={idx} className="min-h-[252px] rounded-[28px] bg-white p-8 shadow-[0_8px_18px_rgba(10,27,61,0.035)]">
                  <div aria-label={card.title} className={`inline-flex h-11 w-11 items-center justify-center rounded-full text-white ${idx === 0 ? 'bg-blue' : idx === 1 ? 'bg-gold' : 'bg-green'}`}>
                    <card.icon aria-hidden="true" size={22} strokeWidth={1.75} />
                  </div>
                  <h3 className="brand-serif mt-4 text-[24px] leading-[1.3] !tracking-normal text-navy">{card.title}</h3>
                  <p className="mt-3 text-[16px] leading-[26px] text-[#475775]">{card.body}</p>
                </article>
              ))}
            </div>
            <div className="mx-auto mt-12 min-h-[226px] max-w-[1172px] rounded-[28px] bg-navy p-8 text-white md:p-12 xl:mt-14">
              <h3 className="brand-serif text-[28px] leading-[1.2] !tracking-normal text-white">What goes wrong</h3>
              <div className="mt-4 grid gap-x-8 gap-y-4 text-[16px] leading-6 md:grid-cols-2">
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2A3F73] text-[14px] font-semibold text-gold-light">x</span>
                  <span>The pick rests on a tip or one small piece of information</span>
                </div>
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2A3F73] text-[14px] font-semibold text-gold-light">x</span>
                  <span>Nothing tells you when to buy</span>
                </div>
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2A3F73] text-[14px] font-semibold text-gold-light">x</span>
                  <span>Nothing tells you when to sell</span>
                </div>
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2A3F73] text-[14px] font-semibold text-gold-light">x</span>
                  <span>Returns end up below what you expected</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <PyramidSection />

        <PortfolioShowcase />

        <section className="bg-[#0A1B3D] px-4 py-[62px] sm:px-6 xl:py-[82px]">
          <div className="mx-auto max-w-[1256px]">
            <SectionHeader label="Safety" pillClassName="!border-0 !bg-[#1B2B5E] !text-[#F7CD62]" titleClassName="text-white" title="Safety is our cornerstone." />
            <p className="mx-auto mt-4 max-w-[700px] text-center text-[18px] leading-[1.6] text-[#B7C3DB]">All investments are in listed securities, held in your name. You own and control what is in your portfolio.</p>
            <div className="mt-10 grid items-start gap-[22px] md:grid-cols-2 xl:mt-14 xl:grid-cols-4">
              {safetyCards.map((card) => (
                <article key={card.title} className="min-h-[204px] rounded-[20px] border border-[#24407F] bg-[#12285C] p-7 text-white">
                  <div aria-label={card.title} className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F7CD62] text-[#0A1B3D]">
                    <card.icon aria-hidden="true" size={22} strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-4 text-[20px] font-semibold leading-[1.3] text-white">{card.title}</h3>
                  <p className="mt-2 text-[15px] leading-6 text-[#B7C3DB]">{card.desc}</p>
                </article>
              ))}
            </div>
            <p className="mt-10 text-center text-[13px] leading-5 text-[#8FA0C4] xl:mt-12">Custody and broker-dealer wording to be reviewed by compliance.</p>
          </div>
        </section>

        <section data-reveal className="bg-mist px-4 py-[62px] sm:px-6 xl:py-[82px]">
          <div className="mx-auto max-w-[1188px]">
            <SectionHeader label="Who it is for" title="Who is BrainTree for?" />
            <AudienceCards cards={audienceCards} minHeight="min-h-[272px]" />
            <p className="mt-8 text-center text-[15px] leading-6 text-[#475775] xl:mt-10">Also open to Indian residents and GCC residents.</p>
          </div>
        </section>

        <section id="how-it-works" className="bg-white px-4 py-[62px] sm:px-6 xl:py-[82px]">
          <div className="mx-auto max-w-[1196px]">
            <SectionHeader label="How it works" title="Get started in 3 simple steps." />
            <p className="mx-auto mt-4 max-w-[680px] text-center text-[17px] leading-[1.6] text-[#475775]">Open an account, complete KYC and invest through LRS. Then invest in the whole portfolio with one click.</p>
            <div className="mx-auto mt-10 grid max-w-[1188px] gap-6 md:grid-cols-2 xl:mt-14 xl:grid-cols-3">
              {steps.map((step) => (
                <article key={step.number} className="min-h-[280px] rounded-3xl border border-[#DCE5F1] bg-[#F5F8FD] p-8">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue text-[18px] font-semibold text-white">{step.number}</div>
                  <h3 className="brand-serif mt-4 text-[24px] leading-[1.3] !tracking-normal text-navy">{step.title}</h3>
                  <p className="mt-3 text-[16px] leading-[26px] text-[#475775]">{step.text}</p>
                </article>
              ))}
            </div>
            <p className="mt-8 text-center text-[14px] leading-5 text-[#475775] xl:mt-10">Minimum US $10,000, top-up from US $2,000 (to be confirmed). No lock-in.</p>
            <div className="mt-8 text-center xl:mt-10">
              <PrimaryButton size="steps" href="/portfolios/all-weather">Open account</PrimaryButton>
            </div>
          </div>
        </section>

        <section id="about" data-reveal className="bg-mist px-4 py-[62px] sm:px-6 xl:py-[78px]">
          <div className="mx-auto max-w-[1200px]">
            <SectionHeader label="Team" title="Our team has worked at" />
            <div className="mt-8 overflow-x-auto">
              <div className="mx-auto flex w-max flex-nowrap justify-center gap-4">
                {['Citigroup', 'HDFC AMC', 'New York Life', 'IL&FS', 'Temporal', 'Erdos'].map((company) => (
                  <span key={company} className="inline-flex whitespace-nowrap rounded-full border border-[#dfe8f4] bg-white px-[18px] py-2.5 text-[14px] font-medium leading-5 text-navy">{company}</span>
                ))}
              </div>
            </div>
            <div className="mx-auto mt-10 grid max-w-[1128px] gap-6 md:grid-cols-2 xl:mt-12 xl:grid-cols-4">
              {teamMembers.map((member, index) => (
                <article key={member.name} data-reveal-card style={{ '--reveal-delay': `${index * 80}ms` }} className="min-h-[294px] rounded-[28px] border border-[#dfe8f4] bg-white p-6">
                  <div className="mx-auto mb-5 flex h-[120px] w-[120px] items-center justify-center rounded-full bg-gradient-to-br from-[#f7f1e9] to-[#dfe6ff] text-[24px] font-medium text-navy">{member.name.split(' ').map((word) => word[0]).slice(0,2).join('')}</div>
                  <h3 className="text-center text-[22px] leading-[1.25] tracking-normal text-navy">{member.name}</h3>
                  <p className="mt-3 text-center text-[14px] leading-5 text-[#475775]">{member.title}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="resources" data-reveal className="bg-white px-4 py-[62px] sm:px-6 xl:py-[82px]">
          <div className="mx-auto max-w-[1232px]">
            <SectionHeader label="Learn" title="Learn before you invest." />
            <p className="mt-4 text-center text-[16px] leading-6 text-[#475775]">Articles, videos and guides, in plain words.</p>
            <div className="mt-10 grid min-h-[146px] gap-8 rounded-[24px] bg-[#FFF4D6] p-8 md:grid-cols-2 md:gap-[60px] md:p-9">
              <div className="text-left">
                <div className="text-[12px] font-semibold uppercase leading-4 tracking-[0.04em] text-[#7A5410]">Indian tax residents</div>
                <p className="brand-serif mt-1.5 text-[22px] leading-[1.4] !tracking-normal text-navy">Global income is taxed in India.</p>
              </div>
              <div className="text-left">
                <div className="text-[12px] font-semibold uppercase leading-4 tracking-[0.04em] text-[#7A5410]">Non resident Indians</div>
                <p className="brand-serif mt-1.5 text-[22px] leading-[1.4] !tracking-normal text-navy">Only Indian income is taxed in India. The rest is taxed in the country where it was earned.</p>
              </div>
            </div>
            <p className="mt-8 text-center text-[13px] leading-5 text-[#7C8BA6] xl:mt-10">A thumb rule, not tax advice. Wording to be confirmed.</p>
            <div className="mx-auto mt-8 grid max-w-[1184px] gap-6 md:grid-cols-3 xl:mt-10">
              {learnCards.map((card, index) => {
                const CoverIcon = learnTypeIcons[card.type];
                return (
                <article key={card.title} data-reveal-card style={{ '--reveal-delay': `${index * 80}ms` }} className="h-[314px] overflow-hidden rounded-[20px] border border-[#DCE5F1] bg-white">
                  {card.cover ? (
                    <img src={card.cover} alt="" className="h-[180px] w-full object-cover" />
                  ) : (
                    <div className="flex h-[180px] flex-col items-center justify-center gap-2" style={{ backgroundColor: card.coverColor }}>
                      <CoverIcon aria-hidden="true" size={28} strokeWidth={1.75} className="text-navy/70" />
                      <span className="text-[15px] font-semibold leading-5 text-navy">{card.type}</span>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="text-[12px] font-semibold uppercase leading-4 tracking-[0.04em] text-[#7A5410]">{card.type}</div>
                    <h3 className="brand-serif mt-2 whitespace-nowrap text-[20px] leading-[1.3] !tracking-normal text-navy sm:text-[24px]">{card.title}</h3>
                    <a href={card.href} className="mt-3 inline-flex items-center gap-2 text-[14px] font-semibold leading-5 text-blue hover:underline">
                      Read more <ArrowRight aria-hidden="true" size={16} strokeWidth={1.75} />
                    </a>
                  </div>
                </article>
                );
              })}
            </div>
            <div className="mt-8 text-center xl:mt-10">
              <SecondaryButton size="resources" href="#resources">Visit Resources</SecondaryButton>
            </div>
          </div>
        </section>

        <section data-reveal className="bg-mist px-4 py-[62px] sm:px-6 xl:py-[82px]">
          <div className="mx-auto max-w-[980px]">
            <SectionHeader label="FAQs" title="What are you still unsure about?" />
            <div className="mx-auto mt-10 max-w-[820px] space-y-[14px] xl:mt-12">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                const answerId = `faq-answer-${idx}`;
                return (
                  <article key={faq.q} className="overflow-hidden rounded-[20px] border border-[#DCE5F1] bg-white">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                      className="flex min-h-[74px] w-full items-center justify-between px-6 text-left sm:px-8"
                    >
                      <span className="text-[17px] font-semibold leading-6 text-navy">{faq.q}</span>
                      {isOpen
                        ? <Minus aria-hidden="true" size={20} strokeWidth={1.75} className="shrink-0 text-blue" />
                        : <Plus aria-hidden="true" size={20} strokeWidth={1.75} className="shrink-0 text-blue" />}
                    </button>
                    <div
                      id={answerId}
                      aria-hidden={!isOpen || !faq.a}
                      className="grid transition-[grid-template-rows] duration-[250ms] ease-out"
                      style={{ gridTemplateRows: isOpen && faq.a ? '1fr' : '0fr' }}
                    >
                      <div className="overflow-hidden px-6 pb-6 pt-2 text-[15px] leading-6 text-[#475775] sm:px-8">{faq.a}</div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>
      <SiteFooter />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolios/all-weather" element={<AllWeatherPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
