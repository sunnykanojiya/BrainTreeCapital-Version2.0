export default function AnnouncementBar() {
  return (
    <div className="flex h-11 items-center border-b border-[#dce5f1] bg-[#f4f7fb]">
      <div className="mx-auto w-[calc(100%-32px)] max-w-[1280px] text-center text-[14px] text-navy">
        <div className="flex flex-nowrap items-center justify-center gap-2 font-medium sm:gap-3">
          <span className="inline-flex shrink-0 rounded-full bg-[#fff4d6] px-3 py-1 text-[12px] font-medium text-[#7a5410]">New</span>
          <span className="min-w-0 text-[10px] leading-[13px] sm:text-[14px] sm:leading-5">BrainTree Wealth Builder portfolio is now open. Global UCITS portfolio built on the Layered Pyramid approach to portfolio management.
</span>
          <span className="shrink-0 text-[16px] text-blue">→</span>
        </div>
      </div>
    </div>
  );
}
