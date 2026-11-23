import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { BrowserRouter, Link, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import {
  ArrowLeftRight,
  ArrowRight,
  ArrowUpRight,
  BadgeDollarSign,
  BriefcaseBusiness,
  Building2,
  ChartNoAxesCombined,
  Cpu,
  FileCheck,
  FileText,
  Globe,
  Globe2,
  GraduationCap,
  KeyRound,
  Landmark,
  Laptop,
  Layers,
  Layers3,
  LineChart,
  Menu,
  ChevronDown,
  PenLine,
  PlayCircle,
  RefreshCw,
  Search,
  ShieldCheck,
  Smartphone,
  TrendingUp,
  Unlock,
  UserRoundPlus,
  UsersRound,
  Wallet,
  X,
} from 'lucide-react';
import GlobeHero from './components/globe/GlobeHero';
import { portfolioSeries } from './content';

const navItems = [
  { label: 'Portfolios', href: '#global-portfolios' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'About', href: '#about' },
];

const APP_INSTALL_URL = 'https://paasa.com/install-app?utm_source=BrainTreeCapital&utm_medium=Distribution&utm_campaign=referral-by-braintree-capital&utm_content=BRAINWM&utm_term=braintreecapital';
const AUTH_URL = APP_INSTALL_URL;
const CALENDLY_URL = 'https://calendly.com/braintree-capital/30min';

const reasons = [
  { key: 'FX', icon: ArrowLeftRight, title: 'Build a $ corpus for your $ needs', text: 'Child’s education, Travel, Settling abroad, Medical Treatment.' },
  { key: 'TOP', icon: Globe, title: 'Reduce risk by Diversifying beyond India.', text: 'Put eggs in different baskets.' },
  { key: 'NEXT', icon: Cpu, title: 'Own the technologies of tomorrow', text: 'Be invested where the next big ideas are built.' },
];

const whatGoesWrong = [
  'The pick rests on a tip or one small piece of information',
  'Nothing tells you when to buy - or to sell.',
  'You accumulate stocks instead of a methodical portfolio.',
  'Returns end up below what you expected',
];

const pyramidLayers = [
  {
    key: 'conviction',
    name: 'Conviction',
    desc: 'High growth themes',
    bullets: ['Technologies of future', 'Return of innovation', 'Multibaggers'],
    icon: TrendingUp,
    desktopWidth: '56%',
    desktopCopyWidth: '50%',
    mobileWidth: '80%',
    mobileCopyWidth: '50%',
    colors: { frontStart: '#1743B8', frontEnd: '#2F5FE5', top: '#6788EA', left: '#153990', right: '#102F7E' },
  },
  {
    key: 'smart-beta',
    name: 'Smart Beta',
    desc: 'Momentum based ETFs Stocks',
    icon: Layers,
    desktopWidth: '72%',
    desktopInset: 11.1,
    desktopCopyWidth: '86%',
    mobileWidth: '86%',
    mobileInset: 3.5,
    mobileCopyWidth: '91%',
    colors: { frontStart: '#526EC9', frontEnd: '#7C96E8', top: '#A5B7ED', left: '#4961AE', right: '#3D559D' },
  },
  {
    key: 'core-equity',
    name: 'Core Equity',
    desc: 'Owns the broad global markets through index ETFs',
    icon: Globe2,
    desktopWidth: '88%',
    desktopInset: 9.1,
    desktopCopyWidth: '90%',
    mobileWidth: '93%',
    mobileInset: 3.8,
    mobileCopyWidth: '93%',
    colors: { frontStart: '#AFC3ED', frontEnd: '#D0DCF5', top: '#EFF4FD', left: '#94A9D2', right: '#839AC4' },
  },
  {
    key: 'defensive-income',
    name: 'Defensive and Income',
    desc: 'Preserves your capital and generates steady returns',
    icon: ShieldCheck,
    desktopWidth: '100%',
    desktopInset: 6,
    desktopCopyWidth: '88%',
    mobileWidth: '100%',
    mobileInset: 3.5,
    mobileCopyWidth: '92%',
    colors: { frontStart: '#DDE6F4', frontEnd: '#F8FAFE', top: '#FFFFFF', left: '#C7D2E4', right: '#B6C5DA' },
  },
];

const allWeatherAudience = [
  { label: 'ETF', title: 'Investors who want less guesswork', text: 'One disciplined portfolio instead of tips and single picks.', icon: LineChart },
  { label: 'EDU', title: 'Families planning ahead', text: "Dollar assets for goals like a child's education abroad.", icon: GraduationCap },
  { label: 'RSU', title: 'RSU holders and business owners', text: 'Spread your risk beyond one company or one country.', icon: BadgeDollarSign },
];

const pyramidChips = [
  { text: 'Created Mathematically with Low Correlation', icon: LineChart },
  { text: 'Rebalanced once a quarter', icon: RefreshCw },
  { text: 'Aims for Better Risk Adjusted Returns', icon: ShieldCheck },
];

const safetyCards = [
  { title: 'Compliant with US and Indian regulations.', desc: 'SIPC member custody and an SEC registered broker-dealer, through DriveWealth.', icon: ShieldCheck },
  { title: 'Fully digital KYC', desc: 'Verify online in about a day. No branch visits.', icon: Smartphone },
  { title: 'You own what you hold', desc: 'Securities sit in your name, and you control them.', icon: KeyRound },
  { title: 'No lock-in, no exit fee', desc: 'You can Top Up & Withdraw fully or partly anytime.', icon: Unlock },
];

const audienceCards = [
  { title: 'NRIs', text: 'Keep your wealth working in global markets, wherever you live.', icon: UsersRound },
  { title: 'CXOs holding RSUs', text: 'Executives in Indian tech companies who want to spread risk beyond one company\'s shares.', icon: Laptop },
  { title: 'Business owners', text: 'Put surplus capital to work outside India, under the RBI\'s rules.', icon: Building2 },
  { title: 'Investors in India', text: 'AIF/PMS seeking global returns.', icon: ChartNoAxesCombined },
];

const investorRouteCards = [
  { title: 'NRIs', text: 'Invest directly from the country where you live.', icon: Globe },
  { title: 'RSU holders', text: 'Sell RSUs in a planned manner and invest directly.', icon: BriefcaseBusiness },
];

const teamMembers = [
  {
    name: 'Anurag Bhatnagar',
    role: 'CO-FOUNDER & PORTFOLIO DIRECTOR',
    credentials: 'CA · 30+ Years Leadership',
    biography: "Chartered Accountant with over 30 years of CXO-level leadership across banking, investments and insurance. Was part of HDFC Mutual Fund's founding team, led Wealth Management at Citigroup, and managed public portfolios for ULIPs at New York Life. His institutional experience across full market cycles shapes BrainTree Capital's risk-first portfolio architecture. Personally invested in the same strategies he builds for clients.",
    tags: ['CITIGROUP', 'HDFC AMC', 'NEW YORK LIFE', 'IL&FS A.F. FERGUSON'],
    image: '/team/anurag.png',
  },
  {
    name: 'Varun Verma',
    role: 'CO-FOUNDER & TRADER',
    credentials: 'Co-founder · Trader',
    biography: 'He built Temporal, a venture-backed research firm developing market mechanisms for interest rate derivatives and perpetual futures. He also leads Erdos, a proprietary trading firm operating in niche liquid markets, generating edge from product design inefficiencies and the structural constraints of market participants.',
    tags: ['TEMPORAL', 'ERDOS', 'MARKET STRUCTURE'],
    image: '/team/varun-verma.png',
  },
  {
    name: 'Shashikant Burnwal',
    role: 'MANAGING PARTNER',
    credentials: 'IIT Kharagpur · ISB MBA · SEBI-Certified Portfolio Manager',
    biography: "Leads deep-sector research and portfolio management at BrainTree Capital. Combines fundamental analysis with macro insights to identify high-quality businesses with long-term compounding potential. Builds diversified portfolios with a strong emphasis on quantitative risk management. His SEBI certification and ISB finance background ground the firm's systematic, rules-based investment process.",
    tags: ['IIT KHARAGPUR', 'ISB MBA FINANCE', 'SEBI CERTIFIED'],
    image: '/team/shashikant-burnwal.png',
  },
  {
    name: 'Ian Jason Creado',
    role: 'PARTNER · INVESTOR RELATIONS',
    credentials: '14+ Years Experience',
    biography: 'A seasoned client relationship professional with over 14 years of experience spanning B2B sales, business development, and operations. As Partner, Investor Relations at BrainTree Capital, Ian serves as the primary point of contact for investors, ensuring a seamless onboarding experience and a consistently high-touch engagement through every stage of the investment journey.',
    tags: ['HubCredo', 'CLIENT RELATIONS'],
    image: '/team/ian-jason-creado.png',
  },
];

const teamAdvisor = {
  name: 'Himanshu Verma',
  role: 'BOARD ADVISOR',
  credentials: 'Board Advisor and founder of ShiftAltCap',
  biography: "Chartered Accountant and former Senior Vice President at Cognizant, where he led the Digital business unit serving clients including Alphabet, Microsoft, Meta, Apple and Stripe. Now serves on the boards of several companies while building ShiftAlt Capital. A keen investor himself, he brings a technology operator's lens to wealth building — and is passionate about helping fellow HNIs navigate the path to US market exposure.",
  tags: [],
  image: '/team/himanshu-verma.png',
};

const _learnCards = [
  { type: 'Article', title: 'LRS for global investing', href: '#', coverColor: '#EEF4FA' },
  { type: 'Article', title: 'TCS explained', href: '#', coverColor: '#FFF4D6' },
  { type: 'Article', title: 'Diversifying your RSUs', href: '#', coverColor: '#E1EAFC' },
];

const _learnTypeIcons = { Article: FileText, Video: PlayCircle, Blog: PenLine };

const faqCategories = [
  {
    id: 'why-invest-globally',
    label: 'WHY INVEST GLOBALLY',
    questions: [
      {
        question: 'Why should I invest in portfolios of global businesses listed in the USA?',
        answer: {
          blocks: [
            { type: 'paragraph', text: 'There are a number of reasons, but here are the top five:' },
            {
              type: 'numbered',
              items: [
                { title: 'Largest & Most Innovative Market:', text: "The U.S. stock market is 6x bigger than India's, home to the most innovative businesses in the world — offering unmatched growth potential." },
                { title: 'Invest in Brands You Already Trust:', text: 'Tech businesses that dominate globally — Google, Microsoft, Meta, AWS, Apple and many more — are all listed and accessible.' },
                { title: 'Innovation-Driven Returns:', text: "Most good US businesses represent tomorrow's economy. The returns from innovation are structurally superior to returns on today's businesses." },
                { title: 'Make the US Dollar Work for You:', text: 'A rising US dollar adds a structural currency tailwind to your returns. The rupee has depreciated against the dollar over every significant time horizon.' },
                { title: 'Insurance:', text: 'Your money and securities are insured up to US $500,000 (approx. ₹4.30 crore) under SIPC.' },
              ],
            },
          ],
        },
      },
      {
        question: "What are the specific benefits of investing in ShiftAltCap's global portfolios?",
        answer: {
          blocks: [
            { type: 'paragraph', text: 'By choosing to invest in either or both our portfolios, you gain 7 distinct benefits:' },
            {
              type: 'numbered',
              items: [
                { title: 'Full Control:', text: 'At all times, you retain direct control over your money and securities.' },
                { title: 'Zero Lock-in:', text: 'Withdraw anytime with full liquidity — no exit fee, no lock-in period.' },
                { title: 'Easy to Operate:', text: 'Single-click investing and withdrawal through the Stockal dashboard.' },
                { title: 'Currency Advantage:', text: 'Make the US Dollar work for you as a structural hedge.' },
                { title: 'No-Hassle Rebalancing:', text: 'Quarterly rebalancing happens automatically — you are notified, nothing is required from you.' },
                { title: 'Fully Compliant:', text: 'With regulations of both India (RBI/LRS) and the USA (SEC/FINRA).' },
                { title: 'Insured:', text: 'Your money and securities are protected under SIPC up to US $500,000.' },
              ],
            },
          ],
        },
      },
    ],
  },
  {
    id: 'compliance-safety',
    label: 'COMPLIANCE & SAFETY',
    questions: [
      {
        question: 'Are these portfolios regulated and compliant with Indian and US laws?',
        answer: {
          blocks: [
            { type: 'paragraph', text: 'Yes. The offering is compliant with both Indian and US regulations:' },
            {
              type: 'numbered',
              items: [
                { title: 'India — RBI Liberalised Remittance Scheme (LRS):', text: 'The RBI explicitly allows resident Indian citizens to invest in listed securities on global exchanges. Current annual limit: up to US $250,000 (approx. ₹2.15 crore) per person per year.' },
                { title: 'USA — SEC & FINRA Registered:', text: 'All holdings in both portfolios are listed on the New York Stock Exchange. Our broker and custodian is DriveWealth, registered with the Securities Exchange Commission (SEC) and governed by FINRA.' },
              ],
            },
          ],
          highlight: 'Your money account is held with JP Morgan Chase Bank — governed by the US Federal Reserve.',
        },
      },
      {
        question: 'How safe is the platform?',
        answer: {
          blocks: [
            { type: 'paragraph', text: 'The platform is secured with 256-bit encryption — a higher standard than most banking platforms. The platform is owned by Stockal (Borderless Softech Pvt Ltd), and ShiftAltCap has partnered with Stockal to execute transactions through DriveWealth, a broker registered with the SEC in the USA.' },
            { type: 'paragraph', text: 'Think of Stockal as a regulated digital bridge that enables citizens of one country to access and invest in markets of another in a fully compliant manner.' },
          ],
          highlight: '256-bit encryption · DriveWealth (SEC-registered) · SIPC insured up to US $500,000 · JP Morgan Chase custodian',
        },
      },
    ],
  },
  {
    id: 'investment-process',
    label: 'INVESTMENT & PROCESS',
    questions: [
      {
        question: 'What is the minimum and maximum investment size?',
        answer: {
          blocks: [
            { type: 'paragraph', text: 'The minimum investment is US $10,000 per portfolio strategy. This ensures your allocation is large enough to be meaningfully diversified across the positions that make up each portfolio.' },
            { type: 'paragraph', text: "The maximum investment is US $250,000 (approx. ₹2.15 crore) per person per year — this is the RBI's Liberalised Remittance Scheme (LRS) annual limit for resident Indian investors. GCC investors may have different limits based on their local regulations." },
          ],
          highlight: 'Minimum: US $10,000 per strategy · Maximum: US $250,000 per year (RBI LRS limit)',
        },
      },
      {
        question: 'After opening my account, how do I transfer money to my US account?',
        answer: {
          blocks: [
            { type: 'paragraph', text: 'The RBI mandates that all international transfers from India be made via Form A2 — a standard form that all banks follow.' },
            {
              type: 'bullets',
              items: [
                'HDFC Bank',
                'ICICI Bank',
                'Kotak Mahindra Bank',
                'IndusInd Bank',
                'IDFC First Bank',
                'Yes Bank',
              ],
            },
            { type: 'paragraph', text: 'If you bank elsewhere, you will need to visit your branch and complete the Form A2 process on paper. In either case, funds are credited to your US-based JP Morgan Chase account within 1–2 working days.' },
          ],
        },
      },
    ],
  },
  {
    id: 'tax-reporting',
    label: 'TAX & REPORTING',
    questions: [
      {
        question: 'How will I be taxed on my US portfolio investments?',
        answer: {
          blocks: [
            { type: 'paragraph', text: 'We recommend consulting your tax advisor for your specific situation, but here is a general overview:' },
            {
              type: 'numbered',
              items: [
                { title: 'Residential Status Matters:', text: 'Taxation differs for Resident Indians and Non-Resident Indians (NRIs).' },
                { title: 'DTAA Protection:', text: 'India and the USA have signed a Double Tax Avoidance Agreement (DTAA) — ensuring you are taxed in only one country, not both.' },
                {
                  title: 'Two Sources of Taxable Income:',
                  children: [
                    { title: 'Capital Gains (when you sell):', text: 'Not taxed in the USA. Taxed in India as per Indian capital gains laws.' },
                    { title: 'Dividends / Interest:', text: 'Subject to 10–25% tax deducted at source (TDS) in the USA. This can be claimed as an offset against your regular tax liability in India when you file your ITR.' },
                  ],
                },
              ],
            },
          ],
          highlight: 'Capital gains: taxed in India only. Dividends: TDS in USA, claimable as credit in India via DTAA.',
        },
      },
      {
        question: 'How do I claim the tax deduction benefit? What documents will I receive?',
        answer: {
          blocks: [
            { type: 'paragraph', text: 'When you open your account, you pay a one-time fee of US $5 to obtain a W-8BEN form. This is a form mandated by the IRS (Internal Revenue Service) of the USA to identify non-US investors — it establishes your foreign status and entitles you to the reduced withholding rates under the India–USA DTAA.' },
            { type: 'paragraph', text: 'When filing your Indian tax return, you (or your CA) will need this W-8BEN along with the annual account statement from DriveWealth showing dividends received and tax withheld in the USA. You can claim the US tax withheld as a foreign tax credit offset in your Indian ITR.' },
          ],
          highlight: 'One-time: US $5 for W-8BEN · Annual: DriveWealth account statement · Claim TDS offset via Form 67 in your Indian ITR',
        },
      },
    ],
  },
];

function SectionHeader({ label, title, centered = true, className = '', pillClassName = '', titleClassName = '' }) {
  return (
    <div className={`${centered ? 'mx-auto max-w-[980px] text-center' : ''} ${className}`}>
      {label && <div className={`brand-pill ${pillClassName}`}>{label}</div>}
      <h2 className={`brand-serif mt-4 text-[36px] leading-[1.15] !tracking-normal text-navy md:text-[48px] ${titleClassName}`}>{title}</h2>
    </div>
  );
}

function TeamMemberCard({ member, index, horizontal = false }) {
  const initials = member.name.split(' ').map((word) => word[0]).slice(0, 2).join('');
  const avatar = member.image ? (
    <img src={member.image} alt={member.name} className="h-16 w-16 shrink-0 rounded-[12px] object-cover sm:h-[72px] sm:w-[72px]" />
  ) : (
    <div aria-hidden="true" className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-[12px] bg-[#E4EDFC] text-[20px] font-semibold text-navy sm:h-[72px] sm:w-[72px] ${horizontal ? 'sm:h-[70px] sm:w-[70px]' : ''}`}>
      {initials}
    </div>
  );

  if (horizontal) {
    return (
      <article data-reveal-card style={{ '--reveal-delay': `${index * 80}ms` }} className="grid gap-5 rounded-[18px] border border-[#d7e3f4] bg-white p-4 sm:grid-cols-[minmax(0,0.78fr)_1fr] sm:items-center sm:gap-6 sm:p-5">
        <div className="flex items-center gap-4 sm:border-r sm:border-[#d7e3f4] sm:pr-6">
          {avatar}
          <div className="min-w-0">
            <p className="text-[10px] font-bold leading-4 tracking-[0.08em] text-[#B2760A] sm:text-[11px]">{member.role}</p>
            <h3 className="brand-serif mt-1 text-[18px] leading-[1.3] !tracking-normal text-navy sm:text-[20px]">{member.name}</h3>
            <p className="mt-1 text-[12px] leading-[1.5] text-[#475775]">{member.credentials}</p>
          </div>
        </div>
        <p className="text-[13px] leading-[1.55] text-[#263858] sm:text-[14px]">{member.biography}</p>
      </article>
    );
  }

  return (
    <article data-reveal-card style={{ '--reveal-delay': `${index * 80}ms` }} className="flex h-full flex-col rounded-[18px] border border-[#d7e3f4] bg-white p-4 sm:p-5">
      <div className="flex items-center gap-3">
        {avatar}
        <div className="min-w-0">
          <p className="text-[10px] font-bold leading-4 tracking-[0.07em] text-[#B2760A] sm:text-[11px]">{member.role}</p>
          <h3 className="brand-serif mt-1 text-[17px] leading-[1.3] !tracking-normal text-navy sm:text-[19px]">{member.name}</h3>
          <p className="mt-1 text-[11px] leading-[1.4] text-[#475775] sm:text-[12px]">{member.credentials}</p>
        </div>
      </div>
      <p className="mt-3 text-[12px] leading-[1.55] text-[#263858] sm:text-[13px]">{member.biography}</p>
      <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
        {member.tags.map((tag) => (
          <span key={tag} className="inline-flex rounded-full border border-[#E6C47B] px-2 py-[3px] text-[9px] font-semibold leading-3 text-[#9A6508] sm:text-[10px]">{tag}</span>
        ))}
      </div>
    </article>
  );
}

function BrandLogo({ className = '', imageClassName = '' }) {
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

function PrimaryButton({ children, href = '#', className = '', size = 'default', target, rel }) {
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

function SecondaryButton({ children, href = '#', className = '', size = 'default', target, rel }) {
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

function useScrollTriggeredInView() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(() => (
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ));

  useEffect(() => {
    const element = ref.current;
    if (!element || visible) return undefined;

    let observer;
    const handleScroll = () => {
      if (!('IntersectionObserver' in window)) {
        const bounds = element.getBoundingClientRect();
        const visibleHeight = Math.max(0, Math.min(bounds.bottom, window.innerHeight) - Math.max(bounds.top, 0));
        if (visibleHeight / bounds.height >= 0.25) {
          setVisible(true);
          window.removeEventListener('scroll', handleScroll);
        }
        return;
      }

      window.removeEventListener('scroll', handleScroll);
      observer = new IntersectionObserver(([entry]) => {
        if (entry.intersectionRatio >= 0.25) {
          setVisible(true);
          observer.disconnect();
        }
      }, { threshold: 0.25 });
      observer.observe(element);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer?.disconnect();
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
          <span>Your portfolio</span>
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
            <h2 className="brand-serif mt-4 text-[36px] leading-[1.2] !tracking-normal text-navy md:text-[48px] xl:w-max">
              <span className="block whitespace-nowrap">Explore Our</span>
              <span className="block min-[380px]:whitespace-nowrap">Curated Portfolios.</span>
            </h2>
          )}
          <p className="mt-5 max-w-[460px] text-[18px] leading-[1.6] text-[#475775]">
            {isSubpage
              ? 'A global ETF portfolio built on the Layered Pyramid, balanced to hold up in every market season. ETFs only, rebalanced every quarter, from US $10,000.'
              : 'Watch your portfolio grow, see how each of the four layers is doing, and know when we rebalance.'}
          </p>
          {/* <PrimaryButton size="showcase" href="/portfolios/all-weather" className="mt-7">
            {isSubpage ? 'Start investing' : 'See portfolios'}
          </PrimaryButton> */}
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

function GlobalPortfoliosSection() {
  const portfolios = [
    {
      title: 'BrainTree WealthBuilder',
      description: 'A global UCITS portfolio built on the Layered Pyramid approach.',
      icon: Layers3,
      iconClass: 'bg-[#EAF0FF] text-blue',
    },
    {
      title: 'BrainTree IncomeBuilder',
      description: 'With Systematic Withdrawal Plan.',
      icon: Wallet,
      iconClass: 'bg-[#FFF5DE] text-[#A97912]',
    },
  ];

  return (
    <section id="global-portfolios" data-reveal className="bg-mist px-4 pb-[64px] pt-[60px] sm:px-6 lg:pt-[92px] xl:pb-[84px]">
      <div className="mx-auto max-w-[1056px]">
        <div className="mx-auto flex flex-col items-center text-center">
          <span className="brand-pill !h-[44px] !px-6 !text-[18px] !font-medium !text-navy">Our portfolios</span>
          <h2 className="brand-serif mt-4 text-[44px] leading-[1.15] !tracking-normal text-navy md:text-[64px]">Our portfolios</h2>
          <span aria-hidden="true" className="mt-5 h-1 w-[72px] rounded-full bg-[#F2C65B]" />
        </div>
        <div className="mt-9 grid auto-rows-fr items-stretch gap-5 md:grid-cols-2">
          {portfolios.map(({ title, description, icon: Icon, iconClass }) => (
            <article key={title} className="min-h-[286px] rounded-[26px] border border-[#D8E3F5] bg-white p-5 shadow-[0_8px_24px_rgba(16,32,68,0.06)] sm:p-6 lg:p-7">
              <div className="grid h-full grid-cols-[minmax(0,1fr)_1px_18px_1px_84px] items-center gap-x-1 sm:grid-cols-[minmax(0,1fr)_1px_20px_1px_80px] sm:gap-x-1.5 md:grid-cols-[minmax(0,1fr)_1px_22px_1px_84px] lg:grid-cols-[minmax(0,1fr)_1px_28px_1px_92px] lg:gap-x-2.5">
                <div className="relative z-10 flex h-full min-w-0 flex-col">
                  <span aria-hidden="true" className={`inline-flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full ${iconClass}`}>
                    <Icon size={22} strokeWidth={1.9} />
                  </span>
                  <h3 className="brand-serif mt-4 text-[24px] leading-[1.3] !tracking-normal text-navy">{title}</h3>
                  <p className="mt-2 text-[14px] leading-[1.55] text-[#475775] sm:text-[15px] md:text-[16px]">{description}</p>
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex w-fit items-center gap-1.5 pt-5 text-[15px] font-semibold text-blue transition-colors hover:text-[#1B44C8] sm:text-[16px]"
                  >
                    Book a consultation <ArrowUpRight aria-hidden="true" size={16} strokeWidth={2} />
                  </a>
                </div>
                <span aria-hidden="true" className="h-[108px] w-px self-center bg-[#E4ECF6] sm:h-[124px] lg:h-[128px]" />
                <span className="text-center text-[20px] font-bold leading-none text-navy [writing-mode:vertical-rl] rotate-180 sm:text-[22px] md:text-[24px] lg:text-[26px]">Multi</span>
                <span aria-hidden="true" className="h-[108px] w-px self-center bg-[#E4ECF6] sm:h-[124px] lg:h-[128px]" />
                <div className="self-center text-[13px] leading-[25px] text-[#475775] sm:text-[14px] sm:leading-[27px] lg:text-[15px]">
                  <span className="block">Asset.</span>
                  <span className="block">Geographic.</span>
                  <span className="block">Currency.</span>
                  <span className="block">Industry.</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function tierWidths(config, width) {
  const total = config.heights.reduce((sum, height) => sum + height, 0) + config.gap * (config.heights.length - 1);
  const widthAt = (y) => width * (config.topFrac + (1 - config.topFrac) * (y / total));
  let y = 0;
  return config.heights.map((height) => {
    const topWidth = widthAt(y);
    const bottomWidth = widthAt(y + height);
    y += height + config.gap;
    return { topWidth, bottomWidth };
  });
}

function roundedTierPath(points, radius) {
  let path = '';
  for (let index = 0; index < points.length; index += 1) {
    const previous = points[(index + points.length - 1) % points.length];
    const point = points[index];
    const next = points[(index + 1) % points.length];
    const incoming = [previous[0] - point[0], previous[1] - point[1]];
    const outgoing = [next[0] - point[0], next[1] - point[1]];
    const incomingLength = Math.hypot(...incoming);
    const outgoingLength = Math.hypot(...outgoing);
    const cornerRadius = Math.min(radius, incomingLength / 2, outgoingLength / 2);
    const start = [
      point[0] + (incoming[0] / incomingLength) * cornerRadius,
      point[1] + (incoming[1] / incomingLength) * cornerRadius,
    ];
    const end = [
      point[0] + (outgoing[0] / outgoingLength) * cornerRadius,
      point[1] + (outgoing[1] / outgoingLength) * cornerRadius,
    ];
    path += `${index === 0 ? 'M' : 'L'}${start[0].toFixed(2)},${start[1].toFixed(2)} Q${point[0]},${point[1]} ${end[0].toFixed(2)},${end[1].toFixed(2)} `;
  }
  return `${path}Z`;
}

function usePyramidWidth() {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    const updateWidth = () => setWidth(element.getBoundingClientRect().width);
    updateWidth();
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(updateWidth);
    observer?.observe(element);
    return () => observer?.disconnect();
  }, []);

  return [ref, width];
}

function PyramidDirectionArrow({ label, direction, visible }) {
  const isUpward = direction === 'up';
  const description = isUpward
    ? `${label} increases towards Conviction`
    : 'Portfolio allocation increases towards Defensive and Income';
  const path = isUpward
    ? 'M5 398V12 M1.5 18L5 12L8.5 18'
    : 'M5 12V398 M1.5 392L5 398L8.5 392';

  return (
    <div className={`pyramid-direction-arrow flex min-w-0 items-stretch justify-center gap-0.5 ${visible ? 'is-visible' : ''}`}>
      <span aria-hidden="true" className="self-center text-[10px] font-semibold tracking-[0.12em] text-[#526FAE] [writing-mode:vertical-rl] rotate-180">
        {label}
      </span>
      <svg
        role="img"
        aria-label={description}
        className="h-full w-[8px] shrink-0 overflow-visible text-[#6F8DF0]"
        viewBox="0 0 10 410"
        preserveAspectRatio="none"
        fill="none"
      >
        <path d={path} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

function PyramidLayersView() {
  const [layersRef, layersVisible] = useScrollTriggeredInView();
  const [pyramidRef, pyramidWidth] = usePyramidWidth();
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const desktop = typeof window !== 'undefined' && window.innerWidth >= 768;
  const config = desktop
    ? { heights: [250, 104, 104, 104], gap: 8, topFrac: 0.05, radius: 22 }
    : { heights: [280, 82, 84, 84], gap: 5, topFrac: 0.1, radius: 16 };
  const widths = pyramidWidth ? tierWidths(config, pyramidWidth) : [];
  const pyramidHeight = config.heights.reduce((sum, height) => sum + height, 0) + config.gap * (config.heights.length - 1);

  return (
    <div ref={layersRef} className="pyramid-display mx-auto mt-10 grid w-full max-w-[1080px] grid-cols-[28px_minmax(0,1fr)_28px] items-stretch gap-1 sm:grid-cols-[48px_minmax(0,1fr)_48px] sm:gap-2 xl:mt-14 xl:grid-cols-[68px_minmax(0,1fr)_68px] xl:gap-4">
      <div role="group" aria-label="Potential return increases towards the top" className="grid grid-cols-1 items-stretch">
        <PyramidDirectionArrow label="RETURN" direction="up" visible={layersVisible} />
      </div>
      <div ref={pyramidRef} className={`pyramid-assembly mx-auto ${layersVisible ? 'is-visible' : ''}`} style={{ height: pyramidHeight }}>
        {pyramidWidth > 0 && (
          <ol aria-label="The four layers of the pyramid, from boldest to safest" className="flex h-full flex-col" style={{ gap: config.gap }}>
            {pyramidLayers.map((layer, index) => {
              const Icon = layer.icon;
              const height = config.heights[index];
              const { topWidth, bottomWidth } = widths[index];
              const center = pyramidWidth / 2;
              const points = [
                [center - topWidth / 2, 0],
                [center + topWidth / 2, 0],
                [center + bottomWidth / 2, height],
                [center - bottomWidth / 2, height],
              ];
              const path = roundedTierPath(points, config.radius);
              const gradientId = `${uid}-${layer.key}`;
              const highlightId = `${uid}-${layer.key}-highlight`;
              const ink = layer.key === 'conviction' || layer.key === 'smart-beta' ? '#FFFFFF' : '#0F1B45';
              const delay = `${(pyramidLayers.length - index - 1) * 110}ms`;
              const usableWidth = topWidth + (bottomWidth - topWidth) * 0.45;
              const sideInset = layer.key === 'conviction'
                ? 0
                : Math.max((pyramidWidth - usableWidth) / 2 + (desktop ? 18 : 10), desktop ? 12 : 8);

              return (
                <li
                  key={layer.key}
                  className={`pyramid-segment pyramid-segment--${layer.key} ${layersVisible ? 'is-visible' : ''}`}
                  style={{
                    height,
                    '--layer-delay': delay,
                    '--tier-top-width': `${topWidth}px`,
                    '--tier-bottom-width': `${bottomWidth}px`,
                  }}
                >
                  <svg aria-hidden="true" width={pyramidWidth} height={height} viewBox={`0 0 ${pyramidWidth} ${height}`} className="absolute left-0 top-0 overflow-visible" style={{ filter: 'drop-shadow(0 8px 16px rgba(33,80,232,0.14))' }}>
                    <defs>
                      <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={layer.colors.frontStart} />
                        <stop offset="100%" stopColor={layer.colors.frontEnd} />
                      </linearGradient>
                      <linearGradient id={highlightId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FFFFFF" stopOpacity={layer.key === 'conviction' || layer.key === 'smart-beta' ? 0.26 : 0.55} />
                        <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d={path} fill={`url(#${gradientId})`} />
                    <path d={path} fill={`url(#${highlightId})`} />
                    <path d={path} fill="none" stroke={layer.key === 'conviction' || layer.key === 'smart-beta' ? '#FFFFFF' : '#B5C3EE'} strokeOpacity={layer.key === 'conviction' || layer.key === 'smart-beta' ? 0.22 : 0.7} strokeWidth="1" />
                  </svg>

                  <div
                    className={`pyramid-segment-copy ${layer.key === 'conviction' ? 'pyramid-segment-copy--conviction' : 'pyramid-segment-copy--regular'}`}
                    style={{
                      color: ink,
                      paddingLeft: sideInset,
                      paddingRight: sideInset,
                      paddingBottom: layer.key === 'conviction' ? (desktop ? 20 : 14) : 0,
                    }}
                  >
                    {layer.key === 'conviction' ? (
                      <div className="pyramid-conviction-content">
                        <div className="pyramid-segment-heading">
                            <Icon aria-hidden="true" className="pyramid-conviction-icon" strokeWidth={1.9} />
                          <h3>
                            {layer.name}
                          </h3>
                        </div>
                        <ul>
                          {layer.bullets.map((bullet) => (
                            <li key={bullet}><span aria-hidden="true" />{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div className="pyramid-segment-content">
                        <div className="pyramid-segment-heading">
                          <Icon aria-hidden="true" className="pyramid-segment-icon" strokeWidth={1.9} />
                          <h3>{layer.name}</h3>
                        </div>
                        <p>{layer.desc}</p>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        )}
      </div>
      <div className="flex items-stretch justify-center">
        <PyramidDirectionArrow label="ALLOCATION %" direction="down" visible={layersVisible} />
      </div>
    </div>
  );
}

function AudienceCards({ cards }) {
  return (
    <div className="mx-auto mt-10 grid auto-rows-fr max-w-[1840px] items-stretch gap-6 md:grid-cols-2 xl:mt-14 xl:grid-cols-4">
      {cards.map((card, index) => (
        <article
          key={card.title}
          data-reveal-card
          style={{ '--reveal-delay': `${index * 80}ms` }}
          className="flex min-h-[300px] flex-col rounded-[28px] border border-[#D6E4F6] bg-white p-7 shadow-[0_8px_24px_rgba(16,32,68,0.04)] sm:p-8"
        >
          <div role="img" aria-label={card.title} className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-tint text-gold-text">
            <card.icon aria-hidden="true" size={24} strokeWidth={1.75} />
          </div>
          <h3 className="brand-serif mt-5 min-h-[68px] text-[24px] leading-[1.3] !tracking-normal text-navy xl:text-[26px]">{card.title}</h3>
          <p className="mt-3 text-[16px] leading-[26px] text-[#475775]">{card.text}</p>
        </article>
      ))}
    </div>
  );
}

function JourneyConnector({ className, delay, active, reducedMotion }) {
  const renderConnector = (direction) => {
    const horizontal = direction === 'horizontal';
    const line = horizontal ? 'M3 10H37' : 'M10 3V37';
    const arrow = horizontal ? 'M30 4L37 10L30 16' : 'M4 30L10 37L16 30';
    const motionPath = horizontal ? 'M3 10H37' : 'M10 3V37';
    return (
      <svg
        key={direction}
        aria-hidden="true"
        className={`journey-link-svg journey-link-${direction}`}
        viewBox={horizontal ? '0 0 40 20' : '0 0 20 40'}
        preserveAspectRatio="none"
      >
        <path className="journey-link-track" d={line} />
        <path className="journey-link-progress" d={line} pathLength="1" />
        <path className="journey-link-arrow" d={arrow} />
        <circle className="journey-link-particle" cx="0" cy="0" r="3">
          {active && !reducedMotion && (
            <animateMotion
              begin={`${delay}ms`}
              dur="520ms"
              path={motionPath}
              fill="freeze"
            />
          )}
        </circle>
      </svg>
    );
  };

  return (
    <div
      aria-hidden="true"
      className={`journey-link ${className}${active ? ' is-active' : ''}`}
      style={{ '--journey-delay': `${delay}ms` }}
    >
      {renderConnector('horizontal')}
      {renderConnector('vertical')}
    </div>
  );
}

function JourneyRouteBranch({ active, reducedMotion }) {
  const delay = 1780;
  return (
    <>
      <svg
        aria-hidden="true"
        className={`journey-route-branch journey-route-branch-desktop${active ? ' is-active' : ''}`}
        viewBox="0 0 1000 64"
        preserveAspectRatio="none"
        style={{ '--journey-delay': `${delay}ms` }}
      >
        <path className="journey-branch-track" d="M0 48H305V60" />
        <path className="journey-branch-track journey-branch-track-gold" d="M305 48H820V60" />
        <path className="journey-branch-progress" d="M0 48H305V60" pathLength="1" />
        <path className="journey-branch-progress journey-branch-progress-gold" d="M305 48H820V60" pathLength="1" />
        <path className="journey-branch-arrow" d="M299 53L305 60L311 53" />
        <path className="journey-branch-arrow journey-branch-arrow-gold" d="M814 53L820 60L826 53" />
        {active && !reducedMotion && (
          <>
            <circle className="journey-branch-particle" cx="0" cy="0" r="3">
              <animateMotion begin={`${delay}ms`} dur="620ms" path="M0 48H305V60" fill="freeze" />
            </circle>
            <circle className="journey-branch-particle journey-branch-particle-gold" cx="0" cy="0" r="3">
              <animateMotion begin={`${delay + 240}ms`} dur="780ms" path="M305 48H820V60" fill="freeze" />
            </circle>
          </>
        )}
      </svg>
      <svg
        aria-hidden="true"
        className={`journey-route-branch journey-route-branch-tablet${active ? ' is-active' : ''}`}
        viewBox="0 0 1000 64"
        preserveAspectRatio="none"
        style={{ '--journey-delay': `${delay}ms` }}
      >
        <path className="journey-branch-track" d="M500 0V25H305V60" />
        <path className="journey-branch-track journey-branch-track-gold" d="M500 25H820V60" />
        <path className="journey-branch-progress" d="M500 0V25H305V60" pathLength="1" />
        <path className="journey-branch-progress journey-branch-progress-gold" d="M500 25H820V60" pathLength="1" />
        <path className="journey-branch-arrow" d="M299 53L305 60L311 53" />
        <path className="journey-branch-arrow journey-branch-arrow-gold" d="M814 53L820 60L826 53" />
        {active && !reducedMotion && (
          <>
            <circle className="journey-branch-particle" cx="0" cy="0" r="3">
              <animateMotion begin={`${delay}ms`} dur="690ms" path="M500 0V25H305V60" fill="freeze" />
            </circle>
            <circle className="journey-branch-particle journey-branch-particle-gold" cx="0" cy="0" r="3">
              <animateMotion begin={`${delay + 240}ms`} dur="780ms" path="M500 0V25H820V60" fill="freeze" />
            </circle>
          </>
        )}
      </svg>
      <div
        aria-hidden="true"
        className={`journey-route-branch-mobile${active ? ' is-active' : ''}`}
        style={{ '--journey-delay': `${delay}ms` }}
      />
    </>
  );
}

function JourneyInvestorBranch({ active, reducedMotion }) {
  const delay = 1950;
  return (
    <svg
      aria-hidden="true"
      className={`journey-investor-branch${active ? ' is-active' : ''}`}
      viewBox="0 0 100 34"
      preserveAspectRatio="none"
      style={{ '--journey-delay': `${delay}ms` }}
    >
      <path className="journey-branch-track" d="M50 0V10H25V32" />
      <path className="journey-branch-track" d="M50 10H75V32" />
      <path className="journey-branch-progress" d="M50 0V10H25V32" pathLength="1" />
      <path className="journey-branch-progress" d="M50 10H75V32" pathLength="1" />
      <path className="journey-branch-arrow" d="M21 27L25 33L29 27" />
      <path className="journey-branch-arrow" d="M71 27L75 33L79 27" />
      {active && !reducedMotion && (
        <>
          <circle className="journey-branch-particle" cx="0" cy="0" r="2.5">
            <animateMotion begin={`${delay}ms`} dur="470ms" path="M50 0V10H25V32" fill="freeze" />
          </circle>
          <circle className="journey-branch-particle" cx="0" cy="0" r="2.5">
            <animateMotion begin={`${delay + 120}ms`} dur="500ms" path="M50 0V10H75V32" fill="freeze" />
          </circle>
        </>
      )}
    </svg>
  );
}

function JourneyStepCard({ number, title, text, icon: Icon, delay, resident = false }) {
  return (
    <article
      className={`journey-card journey-stage-card${resident ? ' journey-card-resident' : ''}`}
      style={{ '--journey-delay': `${delay}ms` }}
    >
      <div className="journey-sequence journey-stage-content">
        <div className="flex items-center justify-between">
          <span className={`journey-number${resident ? ' journey-number-gold' : ''}`} aria-label={`Step ${number}`}>
            {number}
          </span>
          <span className={`journey-icon${resident ? ' journey-icon-gold' : ''}`} aria-hidden="true">
            <Icon size={22} strokeWidth={1.8} />
          </span>
        </div>
        <h3 className="brand-serif mt-5 text-[21px] leading-[1.25] !tracking-normal text-navy sm:text-[23px]">{title}</h3>
        <p className="mt-3 text-[15px] leading-[24px] text-[#475775]">{text}</p>
      </div>
    </article>
  );
}

function HowItWorksJourney() {
  const sectionRef = useRef(null);
  const [reducedMotion] = useState(() => (
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ));
  const [journeyActive, setJourneyActive] = useState(reducedMotion);

  useEffect(() => {
    if (journeyActive || !sectionRef.current) return undefined;
    if (!('IntersectionObserver' in window)) {
      setJourneyActive(true);
      return undefined;
    }

    const section = sectionRef.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.intersectionRatio >= 0.28) {
        setJourneyActive(true);
        observer.disconnect();
      }
    }, { threshold: 0.28 });
    const activateIfVisible = () => {
      if (document.visibilityState !== 'visible') return;
      const bounds = section.getBoundingClientRect();
      const visibleWidth = Math.max(0, Math.min(bounds.right, window.innerWidth) - Math.max(bounds.left, 0));
      const visibleHeight = Math.max(0, Math.min(bounds.bottom, window.innerHeight) - Math.max(bounds.top, 0));
      const visibleRatio = bounds.width * bounds.height > 0
        ? (visibleWidth * visibleHeight) / (bounds.width * bounds.height)
        : 0;
      if (visibleRatio >= 0.28) {
        setJourneyActive(true);
        observer.disconnect();
      }
    };
    observer.observe(section);
    document.addEventListener('visibilitychange', activateIfVisible);
    activateIfVisible();
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', activateIfVisible);
    };
  }, [journeyActive]);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className={`journey-section bg-white px-4 py-[62px] sm:px-6 xl:py-[82px]${journeyActive ? ' journey-active' : ''}`}
    >
      <div className="mx-auto max-w-[1196px]">
        <div className="journey-sequence" style={{ '--journey-delay': '0ms' }}>
          <SectionHeader label="How it works" title="Get started in 4 simple steps." />
        </div>
        <p
          className="journey-sequence mx-auto mt-4 max-w-[680px] text-center text-[17px] leading-[1.6] text-[#475775]"
          style={{ '--journey-delay': '100ms' }}
        >
          Open an account, complete KYC and choose your route to invest.
        </p>

        <div className="journey-flow mx-auto mt-10 max-w-[1196px] xl:mt-14">
          <div className="journey-stage-one">
            <JourneyStepCard
              number="1"
              title="Open an account"
              text="Sign up online in a few minutes."
              icon={UserRoundPlus}
              delay={350}
            />
          </div>

          <JourneyConnector className="journey-link-one" delay={740} active={journeyActive} reducedMotion={reducedMotion} />

          <div className="journey-stage-two">
            <JourneyStepCard
              number="2"
              title="Complete KYC"
              text="Verify your identity digitally in about a day. No branch visits and no paperwork."
              icon={FileCheck}
              delay={930}
            />
          </div>

          <JourneyConnector className="journey-link-routes" delay={1320} active={journeyActive} reducedMotion={reducedMotion} />

          <div className="journey-routes">
            <JourneyRouteBranch active={journeyActive} reducedMotion={reducedMotion} />
            <div className="journey-route-options">
              <article
                className="journey-card journey-choice-card journey-route-option journey-route-option-investors"
                style={{ '--journey-delay': '1520ms' }}
              >
                <div className="journey-sequence journey-choice-content">
                  <div className="flex items-center gap-3">
                    <span className="journey-number" aria-label="Step 3">3</span>
                    <h3 className="brand-serif text-[18px] leading-[1.2] !tracking-normal text-navy sm:text-[20px]">Choose your investor type</h3>
                  </div>
                  <JourneyInvestorBranch active={journeyActive} reducedMotion={reducedMotion} />
                  <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                    {investorRouteCards.map((route, index) => {
                      const Icon = route.icon;
                      return (
                        <div
                          key={route.title}
                          className="journey-card journey-investor-card"
                          style={{ '--journey-delay': `${2100 + index * 130}ms` }}
                        >
                          <div className="journey-sequence journey-investor-content">
                            <span className="journey-icon journey-icon-small" aria-hidden="true">
                              <Icon size={18} strokeWidth={1.8} />
                            </span>
                            <h4 className="brand-serif mt-3 text-[16px] leading-[1.2] !tracking-normal text-navy sm:text-[17px]">{route.title}</h4>
                            <p className="mt-2 text-[13px] leading-[20px] text-[#475775] sm:text-[14px]">{route.text}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </article>

              <div className="journey-route-option journey-route-option-resident">
                <JourneyStepCard
                  number="4"
                  title="Resident Indians"
                  text="Invest through the RBI's LRS scheme."
                  icon={Landmark}
                  delay={2360}
                  resident
                />
              </div>
            </div>
          </div>
        </div>

        <p
          className="journey-sequence mt-8 text-center text-[14px] leading-5 text-[#475775] xl:mt-10"
          style={{ '--journey-delay': '2680ms' }}
        >
          Minimum US $10,000, top-up from US $1,000. Partial / Full withdrawal anytime.
        </p>
        <div className="journey-sequence mt-8 text-center xl:mt-10" style={{ '--journey-delay': '2860ms' }}>
          <PrimaryButton size="steps" href="https://paasa.com/install-app?utm_source=BrainTreeCapital&utm_medium=Distribution&utm_campaign=referral-by-braintree-capital&utm_content=BRAINWM&utm_term=braintreecapital" target='blank'>Open account</PrimaryButton>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section data-reveal className="bg-white px-4 py-8 sm:px-6 xl:py-[90px]">
      <div className="mx-auto flex min-h-[358px] max-w-[920px] flex-col items-center justify-center rounded-[40px] bg-[linear-gradient(135deg,#2150E8_0%,#0A1B3D_62%)] px-6 py-[70px] text-center text-white sm:px-10">
        <h2 className="brand-serif text-[36px] leading-[1.2] !tracking-normal text-white md:text-[48px]">Start with one account.</h2>
        <p className="mt-4 text-[16px] leading-6 text-[#C9D6F5]">Start from India. Invest in the world.</p>
        <div className="mt-8 flex w-full flex-col items-center gap-3 md:w-auto md:flex-row md:gap-4">
          <PrimaryButton
            size="cta"
            href={APP_INSTALL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="!h-[54px] w-full max-w-[320px] md:!h-[62px] md:w-auto md:max-w-none"
          >
            Start investing
          </PrimaryButton>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-[54px] w-full max-w-[320px] items-center justify-center gap-2 rounded-[14px] border border-white/35 bg-white/5 px-6 text-[16px] font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/10 md:h-[62px] md:w-auto md:max-w-none"
          >
            Speak with the team <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
          </a>
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
            <BrandLogo imageClassName="h-[98px] w-[178px] rounded-lg bg-white p-2" />
            <p className="mt-4 text-[15px] leading-[23px] text-[#C5D0E8]">Professionally managed global investment portfolios for Indian residents, NRIs and foreign investors.</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-[94px_116px_82px] lg:justify-end lg:gap-x-[70px]">
            <div>
              <h3 className="text-[14px] font-semibold leading-5 text-[#F7CD62]">Explore</h3>
              <ul className="mt-[14px] space-y-[10px] text-[15px] leading-5 text-[#C5D0E8]">
                <li><Link to="/#portfolios" className="hover:text-white">Portfolios</Link></li>
                <li><Link to="/#why-us" className="hover:text-white">Why Uss</Link></li>
                <li><Link to="/#how-it-works" className="hover:text-white">How it works</Link></li>
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
          <span className="min-w-0 text-[10px] leading-[13px] sm:text-[14px] sm:leading-5">All Weather Portfolio is now open. Global UCITS portfolio built on the Layered Pyramid approach to portfolio management.
</span>
          <span className="shrink-0 text-[16px] text-blue">→</span>
        </div>
      </div>
    </div>
  );
}

function Navbar() {
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
          <p className="mx-auto mt-4 max-w-[680px] text-[18px] leading-[1.5] text-[#475775]">Four layers of ETFs, from the safest at the base to the boldest at the top.</p>
        </header>
        <PyramidLayersView />
        <div className="mx-auto mt-9 w-full max-w-[860px] rounded-[28px] bg-[#FBF1D0] px-5 py-7 text-left sm:px-7 md:mt-14 md:px-9 md:py-9">
          <h3 className="brand-serif text-[24px] leading-tight !tracking-normal text-navy md:text-[30px]">The barbell approach</h3>
          <p className="mt-3 text-[14.5px] leading-[1.65] text-[#475775] md:text-[15.5px]">
            A capital-preservation core compounded with a bounded high-conviction growth sleeve, sized so that even a complete drawdown of the growth side cannot materially impair the core.
          </p>

          <div className="mt-7 grid grid-cols-[minmax(0,1fr)_30px_minmax(0,1fr)] items-stretch md:mt-9 md:grid-cols-[minmax(0,1fr)_90px_minmax(0,1fr)]">
            <div className="flex flex-col items-center justify-center rounded-[14px] border border-[#C9D4EE] bg-[#FFF9E6] px-3 py-5 text-center md:py-7">
              <div className="brand-serif text-[28px] leading-none !tracking-normal text-navy md:text-[52px]">70–80%</div>
              <div className="mt-3 text-[10px] font-semibold uppercase leading-[1.35] tracking-[0.18em] text-[#475775] md:text-[11.5px]">
                Preservation core
              </div>
            </div>

            <div aria-hidden="true" className="relative flex items-center justify-center">
              <div className="h-[6px] w-full bg-[#A9B6CF]" />
              <div className="absolute flex h-[26px] w-[26px] items-center justify-center rounded-full border-[4px] border-[#A9B6CF] bg-[#FBF1D0] md:h-[44px] md:w-[44px] md:border-[5px]">
                <span className="h-[8px] w-[8px] rounded-full bg-[#7C8BA6] md:h-[14px] md:w-[14px]" />
              </div>
            </div>

            <div className="flex flex-col items-center justify-center rounded-[14px] border border-[#E6D08C] bg-[#FBF1D0] px-3 py-5 text-center md:py-7">
              <div className="brand-serif text-[28px] leading-none !tracking-normal text-[#9A6B12] md:text-[52px]">20–30%</div>
              <div className="mt-3 text-[10px] font-semibold uppercase leading-[1.35] tracking-[0.18em] text-[#475775] md:text-[11.5px]">
                Growth sleeve
              </div>
            </div>
          </div>
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

function AllWeatherBuildSection() {
  return (
    <section data-reveal className="bg-white px-4 py-[60px] sm:px-6 xl:py-[84px]">
      <div className="mx-auto max-w-[1180px]">
        <SectionHeader label="How it is built" title="Four layers, one discipline." />
        <p className="mt-4 text-center text-[17px] leading-[1.6] text-[#475775]">Layer sizes are set by our investment committee and reviewed every quarter.</p>
        <PyramidLayersView />
        <div className="mx-auto mt-14 max-w-[860px] rounded-[24px] bg-[#FFF4D6] p-8 text-left md:p-9">
          <h3 className="brand-serif text-[28px] leading-[1.25] !tracking-normal text-navy">Why UCITS?</h3>
          <p className="mt-3 text-[16px] leading-6 text-[#475775]">Our portfolios largely hold UCITS to enable our high networth clients to get twin benefits of no risk of estate tax applicability - and a more tax efficient structure (through lower withholding tax on dividends and Accumulation feature in our UCITS portfolio).</p>
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

function HeroPhrases() {
  const [revealRef, isVisible] = useInView();
  const phraseClass = `hero-phrase${isVisible ? ' is-visible' : ''}`;

  return (
    <div ref={revealRef} className="mt-7 flex flex-wrap items-center gap-2 text-[18px] md:font-semibold md:font-bold leading-5 text-[#000] xl:mt-8">
      <span className={phraseClass} style={{ '--reveal-delay': '0ms' }}>Multi Assets</span>
      <span className="text-[#475775]">|</span>
      <span className={phraseClass} style={{ '--reveal-delay': '350ms' }}>Multi Industry</span>
      <span className="text-[#475775]">|</span>
      <span className={phraseClass} style={{ '--reveal-delay': '700ms' }}>Multi Geography</span>
      <span className="text-[#475775]">|</span>
      <span className={phraseClass} style={{ '--reveal-delay': '1050ms' }}>Multi Currency</span>
    </div>
  );
}

function FaqAnswer({ answer }) {
  return (
    <div className="max-w-[780px] space-y-3 text-[13px] leading-[1.6] text-[#475775] sm:text-[14px]">
      {answer.blocks.map((block, blockIndex) => {
        if (block.type === 'paragraph') {
          return <p key={`paragraph-${blockIndex}`}>{block.text}</p>;
        }

        if (block.type === 'bullets') {
          return (
            <ul key={`bullets-${blockIndex}`} className="list-disc space-y-1 pl-6 marker:text-[#B88721]">
              {block.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          );
        }

        return (
          <ol key={`numbered-${blockIndex}`} className="list-decimal space-y-3 pl-6 marker:font-semibold marker:text-[#B88721]">
            {block.items.map((item) => (
              <li key={item.title}>
                <strong className="font-semibold text-navy">{item.title}</strong>
                {item.text && <> {item.text}</>}
                {item.children && (
                  <ul className="mt-2 list-disc space-y-2 pl-5 marker:text-[#B88721]">
                    {item.children.map((child) => (
                      <li key={child.title}>
                        <strong className="font-semibold text-navy">{child.title}</strong> {child.text}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        );
      })}
      {answer.highlight && (
        <p className="border-l-[3px] border-[#D9AD4B] py-1 pl-4 text-[13px] leading-[1.6] tracking-[0.01em] text-navy sm:text-[14px]">
          {answer.highlight}
        </p>
      )}
    </div>
  );
}

function HomePage() {
  const [activeQuestion, setActiveQuestion] = useState(null);
  const heroRef = useRef(null);

  return (
    <>
      <main className="bg-mist text-navy">
        <section ref={heroRef} className="relative h-[120vh] md:h-[125vh]">
          <div className="sticky top-[80px] flex min-h-[calc(100vh-80px)] items-start xl:min-h-0">
            <div className="mx-auto w-[calc(100%-32px)] max-w-[1280px] pb-2 pt-6 md:pt-8 xl:pb-0 xl:pt-12">
              <div className="grid items-start gap-2 xl:grid-cols-[minmax(0,640px)_minmax(0,560px)] xl:gap-10">
                <div>
                  {/* <div className="inline-flex rounded-full bg-[#fff4d6] px-[14px] py-[6px] text-[13px] font-medium leading-[18px] text-[#7a5410]">Managed ETF portfolios</div> */}
                  <h1 className="hero-title brand-serif mt-1 max-w-[640px] text-[40px] leading-[1.05] tracking-normal text-navy xl:mt-5 xl:text-[58px] xl:leading-[1.15]">Your Wealth<br/>Without Borders</h1>

                  <HeroPhrases />

                  <p className="mt-6 max-w-[520px] text-[16px] leading-[1.55] text-[#475775] xl:mt-8 xl:text-[18px]">Simplicity of a single portfolio for all your major life stage needs - Built for the global Indian.</p>

                  <div className="mt-2 flex w-full max-w-[320px] flex-col items-center gap-3 md:max-w-none md:flex-row md:gap-4 xl:mt-8">
                    <PrimaryButton
                      size="hero"
                      href={APP_INSTALL_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full md:w-auto"
                    >
                      Start investing
                    </PrimaryButton>
                    <SecondaryButton
                      size="hero"
                      href={CALENDLY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full border-[#dce5f1] bg-white md:w-auto"
                    >
                      Speak with us
                    </SecondaryButton>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-2 xl:flex-nowrap">
                    <span className="rounded-full border border-[#D6E1F0] bg-white/80 px-3 py-1.5 text-[13px] font-medium leading-5 text-[#30446B]">No Lock in.</span>
                    <span className="rounded-full border border-[#D6E1F0] bg-white/80 px-3 py-1.5 text-[13px] font-medium leading-5 text-[#30446B]">No Exit Fee.</span>
                    <span className="rounded-full border border-[#D6E1F0] bg-white/80 px-3 py-1.5 text-[13px] font-medium leading-5 text-[#30446B]">Insured up to $0.5 Mn.</span>
                  </div>
                  <div className="mt-3 flex flex-col gap-1 text-[13px] leading-5 text-[#475775]">
                    <span>Compliant with Indian, American and Irish laws.</span>
                    <span>Convenient - Paperless, Seamless, Fully Digital.</span>
                  </div>
                </div>

                <div className="flex justify-center xl:justify-end xl:self-center">
                  <GlobeHero scrollTarget={heroRef} className="mx-auto max-w-[320px] md:max-w-[400px] xl:max-w-[560px]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="why-us" data-reveal className="bg-mist px-4 pb-[78px] pt-[32px] sm:px-6 xl:pb-[88px] xl:pt-[36px]">
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

        <section data-reveal className="bg-mist px-4 py-[78px] sm:px-6 xl:py-[88px]">
          <div className="mx-auto max-w-[1188px]">
            <header className="text-center">
              <span className="mx-auto flex w-fit max-w-full items-center justify-center whitespace-normal rounded-full bg-gold-tint px-[14px] py-2 text-center text-[13px] font-semibold leading-4 text-gold-text">
                How most Indians invest in Global markets today
              </span>
              <h2 className="brand-serif mx-auto mt-4 max-w-[760px] text-[36px] leading-[1.15] !tracking-normal text-navy md:text-[48px]">
                Most picks start with a tip, not<br className="hidden md:block" /> research.
              </h2>
              <p className="mt-4 text-[18px] leading-[1.5] text-[#475775]">Three common ways in, and why they often fall short.</p>
            </header>
            <div data-reveal className="what-goes-wrong-panel mx-auto mt-8 w-full max-w-[1172px] rounded-[28px] bg-navy px-5 py-7 text-white sm:px-7 md:p-10 xl:mt-12">
              <h3 className="brand-serif text-[28px] leading-[1.2] !tracking-normal text-white">What goes wrong</h3>
              <div className="mt-5 grid gap-x-8 gap-y-5 text-[16px] leading-6 md:grid-cols-2">
                {whatGoesWrong.map((statement, index) => (
                  <div key={statement} style={{ '--reveal-delay': `${index * 90}ms` }} className="what-goes-wrong-item flex items-start gap-3 sm:gap-4">
                    <span aria-hidden="true" className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2A3F73] text-gold-light">
                      <X size={15} strokeWidth={2.2} />
                    </span>
                    <span>{statement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <PortfolioShowcase />

        <GlobalPortfoliosSection />
        
        <PyramidSection />

        <section className="bg-[#0A1B3D] px-4 py-[62px] sm:px-6 xl:py-[82px]">
          <div className="mx-auto max-w-[1256px]">
            <SectionHeader label="Safety" pillClassName="!border-0 !bg-[#1B2B5E] !text-[#F7CD62]" titleClassName="!mt-3 text-white" title="Portfolio that you own and control" />
            <p className="mx-auto mt-3 max-w-[700px] text-center text-[18px] leading-[1.6] text-[#B7C3DB]">All investments are in listed securities, held in your name. You own and control what is in your portfolio.</p>
            <div className="mt-8 grid auto-rows-fr items-stretch gap-[22px] md:grid-cols-2 xl:mt-10 xl:grid-cols-4">
              {safetyCards.map((card) => (
                <article key={card.title} className="flex min-h-[272px] flex-col rounded-[20px] border border-[#24407F] bg-[#12285C] p-7 text-white">
                  <div aria-label={card.title} className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F7CD62] text-[#0A1B3D]">
                    <card.icon aria-hidden="true" size={22} strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-4 text-[20px] font-semibold leading-[1.3] text-white">{card.title}</h3>
                  <p className="mt-3 text-[15px] leading-6 text-[#B7C3DB]">{card.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section data-reveal className="bg-mist px-4 py-[62px] sm:px-6 xl:py-[82px]">
          <div className="mx-auto max-w-[1840px]">
            <SectionHeader label="Who it is for" title="Who is BrainTree for?" />
            <AudienceCards cards={audienceCards} />
            {/* <p className="mt-8 text-center text-[15px] leading-6 text-[#475775] xl:mt-10">Also open to Indian residents and GCC residents.</p> */}
          </div>
        </section>

        <HowItWorksJourney />

        <section id="about" data-reveal className="bg-mist px-4 py-12 sm:px-6 sm:py-14 xl:py-16">
          <div className="mx-auto max-w-[1160px]">
            <header className="max-w-[740px]">
              <p className="text-[11px] font-bold leading-4 tracking-[0.1em] text-[#B2760A] sm:text-[12px]">THE PEOPLE BEHIND BRAINTREE CAPITAL</p>
              <h2 className="brand-serif mt-2 text-[30px] leading-[1.16] !tracking-normal text-navy sm:text-[38px] md:text-[42px]">
                <span className="block">Decades of institutional experience.</span>
                <span className="block">Aligned with your interests.</span>
              </h2>
              <p className="mt-3 max-w-[700px] text-[14px] leading-[1.6] text-[#475775] sm:text-[15px]">
                Our team combines CXO-level leadership across banking, asset management, and technology with deep quantitative portfolio management expertise. Everyone is personally invested in the same strategies we manage for clients.
              </p>
            </header>
            <div className="mt-6 grid items-stretch gap-4 md:grid-cols-2 sm:mt-7">
              {teamMembers.map((member, index) => (
                <TeamMemberCard key={member.name} member={member} index={index} />
              ))}
            </div>
            <div className="mt-4">
              <TeamMemberCard member={teamAdvisor} index={teamMembers.length} horizontal />
            </div>
          </div>
        </section>

        <section data-reveal className="bg-[#FFF9E9] px-4 py-12 sm:px-6 sm:py-14 xl:py-16">
          <div className="mx-auto max-w-[900px]">
            <header className="max-w-[800px]">
              <p className="text-[13px] font-semibold uppercase leading-5 tracking-[0.12em] text-[#A87919]">Frequently Asked Questions</p>
              <h2 className="brand-serif mt-3 text-[30px] font-bold leading-[1.2] !tracking-normal text-navy sm:text-[38px] md:text-[44px]">
                Questions we hear. Answered plainly.
              </h2>
              <p className="mt-4 text-[14px] leading-[1.7] text-[#475775] sm:text-[15px]">
                We believe informed investors make better investors. Below are the questions asked most often, covering compliance, process, safety, transfers, and tax. If yours isn't here, speak with the team directly.
              </p>
            </header>
            <div className="mt-8 space-y-6 sm:mt-9">
              {faqCategories.map((category) => (
                <section key={category.id} aria-labelledby={`faq-category-${category.id}`} className="space-y-2">
                  <h3 id={`faq-category-${category.id}`} className="text-[13px] font-semibold uppercase leading-5 tracking-[0.11em] text-[#A87919]">
                    {category.label}
                  </h3>
                  <div className="space-y-2">
                    {category.questions.map((faq, idx) => {
                      const questionKey = `${category.id}-${idx}`;
                      const isOpen = activeQuestion === questionKey;
                      const questionId = `faq-question-${questionKey}`;
                      const answerId = `faq-answer-${questionKey}`;
                      return (
                        <article key={questionKey} className="overflow-hidden rounded-[14px] border border-[#DCE5F1] bg-white">
                          <button
                            id={questionId}
                            type="button"
                            aria-expanded={isOpen}
                            aria-controls={answerId}
                            onClick={() => setActiveQuestion(isOpen ? null : questionKey)}
                            className="grid min-h-[58px] w-full grid-cols-[42px_minmax(0,1fr)_24px] items-center gap-2 px-4 py-3 text-left sm:min-h-[62px] sm:grid-cols-[48px_minmax(0,1fr)_24px] sm:px-5"
                          >
                            <span className="text-[12px] font-semibold tracking-[0.04em] text-[#A87919]">{String(idx + 1).padStart(2, '0')} ·</span>
                            <span className="min-w-0 text-[13px] font-semibold leading-[1.5] text-navy sm:text-[13px]">{faq.question}</span>
                            <ChevronDown
                              aria-hidden="true"
                              size={17}
                              strokeWidth={1.8}
                              className={`justify-self-end text-navy transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                            />
                          </button>
                          <div
                            id={answerId}
                            role="region"
                            aria-labelledby={questionId}
                            aria-hidden={!isOpen}
                            className="grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none"
                            style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                          >
                            <div className="min-h-0 overflow-hidden">
                              <div className="px-4 pb-4 pl-[58px] sm:px-5 sm:pb-5 sm:pl-[73px]">
                                <FaqAnswer answer={faq.answer} />
                              </div>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              ))}
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
