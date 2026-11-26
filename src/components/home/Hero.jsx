import { useRef } from 'react';
import GlobeHero from '../globe/GlobeHero';
import { PrimaryButton, SecondaryButton } from '../common/Buttons';
import { APP_INSTALL_URL, CALENDLY_URL } from '../../constants/siteLinks';
import useInView from '../../hooks/useInView';

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

export default function Hero() {
  const heroRef = useRef(null);

  return (
    <section ref={heroRef} className="relative min-h-[120vh] md:min-h-[125vh]">
      <div className="sticky top-[80px] flex min-h-[calc(100vh-80px)] items-start xl:min-h-0">
        <div className="mx-auto w-[calc(100%-32px)] max-w-[1280px] pb-2 pt-6 md:pt-8 xl:pb-0 xl:pt-12">
          <div className="grid items-start gap-2 xl:grid-cols-[minmax(0,640px)_minmax(0,560px)] xl:gap-10">
            <div>
              {/* <div className="inline-flex rounded-full bg-[#fff4d6] px-[14px] py-[6px] text-[13px] font-medium leading-[18px] text-[#7a5410]">Managed ETF portfolios</div> */}
              <h1 className="hero-title brand-serif mt-1 max-w-[640px] text-[40px] leading-[1.05] tracking-normal text-navy xl:mt-5 xl:text-[58px] xl:leading-[1.15]">Your Wealth<br />Without Borders</h1>

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
  );
}
