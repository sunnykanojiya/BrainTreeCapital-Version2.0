import SectionHeader from '../common/SectionHeader';
import PyramidLayersView from './PyramidLayersView';
import { pyramidChips } from './pyramidData';

export default function AllWeatherBuildSection() {
  return (
    <section data-reveal className="bg-white px-4 py-[60px] sm:px-6 xl:py-[84px]">
      <div className="mx-auto max-w-[1180px]">
        <SectionHeader label="How it is built" title="Four layers, one discipline." />
        <p className="mt-4 text-center text-[17px] leading-[1.6] text-[#475775]">Layer sizes are set by our investment committee and reviewed every quarter.</p>
        <PyramidLayersView />
        <div className="mx-auto mt-14 max-w-[860px] rounded-[24px] bg-[#FFF4D6] p-8 text-left md:p-9">
          <h3 className="brand-serif text-[28px] leading-[1.25] !tracking-normal text-navy">Why UCITS?</h3>
          <p className="mt-3 text-[16px] leading-6 text-[#475775]">Our portfolios largely hold UCITS to enable our high networth clients to get twin benefits of no risk of estate tax applicability - and a more tax efficient structure (through lower withholding tax on dividends and Accumulation feature in our UCITS portfolio).</p>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {pyramidChips.map((chip) => (
            <span key={chip.text} className="inline-flex items-center gap-2 rounded-full border border-[#C9DAF4] bg-[#F1F6FD] px-4 py-2.5 text-[13px] font-semibold leading-5 text-navy">
              <chip.icon aria-hidden="true" size={16} strokeWidth={1.75} className="text-blue" />
              {chip.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
