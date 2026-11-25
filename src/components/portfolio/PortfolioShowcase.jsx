import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { portfolioSeries } from '../../content';
import useInView from '../../hooks/useInView';

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

export default function PortfolioShowcase({ variant = 'home' }) {
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
