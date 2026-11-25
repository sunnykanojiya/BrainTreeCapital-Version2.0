import { X } from 'lucide-react';

const whatGoesWrong = [
  'The pick rests on a tip or one small piece of information',
  'Nothing tells you when to buy - or to sell.',
  'You accumulate stocks instead of a methodical portfolio.',
  'Returns end up below what you expected',
];

export default function WhatGoesWrongSection() {
  return (
    <section data-reveal className="bg-mist px-4 py-[78px] sm:px-6 xl:py-[88px]">
      <div className="mx-auto max-w-[1188px]">
        <header className="text-center">
          <span className="mx-auto flex w-fit max-w-full items-center justify-center whitespace-normal rounded-full bg-gold-tint px-[14px] py-2 text-center text-[13px] font-semibold leading-4 text-gold-text">
            How most Indians invest in Global markets today
          </span>
          <h2 className="brand-serif mx-auto mt-4 max-w-[760px] text-[36px] leading-[1.15] !tracking-normal text-navy md:text-[48px]">
            Most picks start with a tip, not<br className="hidden md:block" /> research.
          </h2>
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
  );
}
