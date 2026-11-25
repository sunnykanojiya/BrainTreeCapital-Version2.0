export default function AudienceCards({ cards }) {
  return (
    <div className="mx-auto mt-10 grid auto-rows-fr max-w-[1840px] items-stretch gap-6 md:grid-cols-2 xl:mt-14 xl:grid-cols-4">
      {cards.map((card, index) => (
        <article
          key={card.title}
          data-reveal-card
          style={{ '--reveal-delay': `${index * 80}ms` }}
          className="flex min-h-[300px] flex-col rounded-[28px] border border-[#D6E4F6] bg-white p-7 shadow-[0_8px_24px_rgba(16,32,68,0.04)] sm:p-8"
        >
          <div role="img" aria-label={card.title} className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-tint text-gold-text">
            <card.icon aria-hidden="true" size={24} strokeWidth={1.75} />
          </div>
          <h3 className="brand-serif mt-5 min-h-[68px] text-[24px] leading-[1.3] !tracking-normal text-navy xl:text-[26px]">{card.title}</h3>
          <p className="mt-3 text-[16px] leading-[26px] text-[#475775]">{card.text}</p>
        </article>
      ))}
    </div>
  );
}
