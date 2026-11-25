import { ArrowLeftRight, Cpu, Globe } from 'lucide-react';

const reasons = [
  { key: 'FX', icon: ArrowLeftRight, title: 'Build a $ corpus for your $ needs', text: 'Child’s education, Travel, Settling abroad, Medical Treatment.' },
  { key: 'TOP', icon: Globe, title: 'Reduce risk by Diversifying beyond India.', text: 'Put eggs in different baskets.' },
  { key: 'NEXT', icon: Cpu, title: 'Own the technologies of tomorrow', text: 'Be invested where the next big ideas are built.' },
];

export default function WhyInvestGloballySection() {
  return (
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
  );
}
