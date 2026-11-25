import { useEffect, useRef, useState } from 'react';
import { BriefcaseBusiness, FileCheck, Globe, Landmark, UserRoundPlus } from 'lucide-react';
import { PrimaryButton } from '../common/Buttons';
import SectionHeader from '../common/SectionHeader';

const investorRouteCards = [
  { title: 'NRIs', text: 'Invest directly from the country where you live.', icon: Globe },
  { title: 'RSU holders', text: 'Sell RSUs in a planned manner and invest directly.', icon: BriefcaseBusiness },
];

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

export default function HowItWorksJourney() {
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
