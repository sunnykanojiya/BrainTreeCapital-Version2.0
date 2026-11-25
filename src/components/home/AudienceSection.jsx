import { Building2, ChartNoAxesCombined, Laptop, UsersRound } from 'lucide-react';
import AudienceCards from '../common/AudienceCards';
import SectionHeader from '../common/SectionHeader';

const audienceCards = [
  { title: 'NRIs', text: 'Keep your wealth working in global markets, wherever you live.', icon: UsersRound },
  { title: 'CXOs holding RSUs', text: 'Executives in Indian tech companies who want to spread risk beyond one company\'s shares.', icon: Laptop },
  { title: 'Business owners', text: 'Put surplus capital to work outside India, under the RBI\'s rules.', icon: Building2 },
  { title: 'Investors in India', text: 'AIF/PMS seeking global returns.', icon: ChartNoAxesCombined },
];

export default function AudienceSection() {
  return (
    <section data-reveal className="bg-mist px-4 py-[62px] sm:px-6 xl:py-[82px]">
      <div className="mx-auto max-w-[1840px]">
        <SectionHeader label="Who it is for" title="Who is BrainTree for?" />
        <AudienceCards cards={audienceCards} />
        {/* <p className="mt-8 text-center text-[15px] leading-6 text-[#475775] xl:mt-10">Also open to Indian residents and GCC residents.</p> */}
      </div>
    </section>
  );
}
