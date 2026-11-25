import { ArrowUpRight, Layers3, Wallet } from 'lucide-react';
import { CALENDLY_URL } from '../../constants/siteLinks';

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

export default function GlobalPortfoliosSection() {
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
