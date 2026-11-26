import { KeyRound, ShieldCheck, Smartphone, Unlock } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';

const safetyCards = [
  { title: 'Compliant with US and Indian regulations.', desc: 'SIPC member custody and an SEC registered broker-dealer, through IBKR.', icon: ShieldCheck },
  { title: 'Fully digital KYC', desc: 'Verify online in about a day. No branch visits.', icon: Smartphone },
  { title: 'You own what you hold', desc: 'Securities sit in your name, and you control them.', icon: KeyRound },
  { title: 'No lock-in, no exit fee', desc: 'You can Top Up & Withdraw fully or partly anytime.', icon: Unlock },
];

export default function SafetySection() {
  return (
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
  );
}
