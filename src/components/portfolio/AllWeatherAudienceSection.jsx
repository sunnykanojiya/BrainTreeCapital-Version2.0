import { BadgeDollarSign, GraduationCap, LineChart } from 'lucide-react';
import AudienceCards from '../common/AudienceCards';
import SectionHeader from '../common/SectionHeader';

const allWeatherAudience = [
  { label: 'ETF', title: 'Investors who want less guesswork', text: 'One disciplined portfolio instead of tips and single picks.', icon: LineChart },
  { label: 'EDU', title: 'Families planning ahead', text: "Dollar assets for goals like a child's education abroad.", icon: GraduationCap },
  { label: 'RSU', title: 'RSU holders and business owners', text: 'Spread your risk beyond one company or one country.', icon: BadgeDollarSign },
];

export default function AllWeatherAudienceSection() {
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
