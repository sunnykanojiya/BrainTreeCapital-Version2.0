import { ArrowRight } from 'lucide-react';
import { PrimaryButton } from '../common/Buttons';
import { APP_INSTALL_URL, CALENDLY_URL } from '../../constants/siteLinks';

export default function FinalCTA() {
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
