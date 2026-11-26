const teamMembers = [
  {
    name: 'Anurag Bhatnagar',
    role: 'CO-FOUNDER & PORTFOLIO DIRECTOR',
    credentials: 'CA · 30+ Years Leadership',
    biography: "Chartered Accountant with over 30 years of CXO-level leadership across banking, investments and insurance. Was part of HDFC Mutual Fund's founding team, led Wealth Management at Citigroup, and managed public portfolios for ULIPs at New York Life. His institutional experience across full market cycles shapes BrainTree Capital's risk-first portfolio architecture. Personally invested in the same strategies he builds for clients.",
    tags: ['CITIGROUP', 'HDFC AMC', 'NEW YORK LIFE', 'IL&FS A.F. FERGUSON'],
    image: '/team/anurag.png',
  },
  {
    name: 'Varun Verma',
    role: 'CO-FOUNDER & TRADER',
    credentials: 'Co-founder · Trader',
    biography: 'He built Temporal, a venture-backed research firm developing market mechanisms for interest rate derivatives and perpetual futures. He also leads Erdos, a proprietary trading firm operating in niche liquid markets, generating edge from product design inefficiencies and the structural constraints of market participants.',
    tags: ['TEMPORAL', 'ERDOS', 'MARKET STRUCTURE'],
    image: '/team/varun-verma.png',
  },
  {
    name: 'Shashikant Burnwal',
    role: 'MANAGING PARTNER',
    credentials: 'IIT Kharagpur · ISB MBA · SEBI-Certified Portfolio Manager',
    biography: "Leads deep-sector research and portfolio management at BrainTree Capital. Combines fundamental analysis with macro insights to identify high-quality businesses with long-term compounding potential. Builds diversified portfolios with a strong emphasis on quantitative risk management. His SEBI certification and ISB finance background ground the firm's systematic, rules-based investment process.",
    tags: ['IIT KHARAGPUR', 'ISB MBA FINANCE', 'SEBI CERTIFIED'],
    image: '/team/shashikant-burnwal.png',
  },
  {
    name: 'Ian Jason Creado',
    role: 'PARTNER · INVESTOR RELATIONS',
    credentials: '14+ Years Experience',
    biography: 'A seasoned client relationship professional with over 14 years of experience spanning B2B sales, business development, and operations. As Partner, Investor Relations at BrainTree Capital, Ian serves as the primary point of contact for investors, ensuring a seamless onboarding experience and a consistently high-touch engagement through every stage of the investment journey.',
    tags: ['HubCredo', 'CLIENT RELATIONS'],
    image: '/team/ian-jason-creado.png',
  },
];

const teamAdvisor = {
  name: 'Himanshu Verma',
  role: 'BOARD ADVISOR',
  credentials: 'Board Advisor and founder of ShiftAltCap',
  biography: "Chartered Accountant and former Senior Vice President at Cognizant, where he led the Digital business unit serving clients including Alphabet, Microsoft, Meta, Apple and Stripe. Now serves on the boards of several companies while building ShiftAlt Capital. A keen investor himself, he brings a technology operator's lens to wealth building - and is passionate about helping fellow HNIs navigate the path to US market exposure.",
  tags: [],
  image: '/team/himanshu-verma.png',
};

function TeamMemberCard({ member, index, horizontal = false }) {
  const initials = member.name.split(' ').map((word) => word[0]).slice(0, 2).join('');
  const avatar = member.image ? (
    <img src={member.image} alt={member.name} className="h-16 w-16 shrink-0 rounded-[12px] object-cover sm:h-[72px] sm:w-[72px]" />
  ) : (
    <div aria-hidden="true" className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-[12px] bg-[#E4EDFC] text-[20px] font-semibold text-navy sm:h-[72px] sm:w-[72px] ${horizontal ? 'sm:h-[70px] sm:w-[70px]' : ''}`}>
      {initials}
    </div>
  );

  if (horizontal) {
    return (
      <article data-reveal-card style={{ '--reveal-delay': `${index * 80}ms` }} className="grid gap-5 rounded-[18px] border border-[#d7e3f4] bg-white p-4 sm:grid-cols-[minmax(0,0.78fr)_1fr] sm:items-center sm:gap-6 sm:p-5">
        <div className="flex items-center gap-4 sm:border-r sm:border-[#d7e3f4] sm:pr-6">
          {avatar}
          <div className="min-w-0">
            <p className="text-[10px] font-bold leading-4 tracking-[0.08em] text-[#B2760A] sm:text-[11px]">{member.role}</p>
            <h3 className="brand-serif mt-1 text-[18px] leading-[1.3] !tracking-normal text-navy sm:text-[20px]">{member.name}</h3>
            <p className="mt-1 text-[12px] leading-[1.5] text-[#475775]">{member.credentials}</p>
          </div>
        </div>
        <p className="text-[13px] leading-[1.55] text-[#263858] sm:text-[14px]">{member.biography}</p>
      </article>
    );
  }

  return (
    <article data-reveal-card style={{ '--reveal-delay': `${index * 80}ms` }} className="flex h-full flex-col rounded-[18px] border border-[#d7e3f4] bg-white p-4 sm:p-5">
      <div className="flex items-center gap-3">
        {avatar}
        <div className="min-w-0">
          <p className="text-[10px] font-bold leading-4 tracking-[0.07em] text-[#B2760A] sm:text-[11px]">{member.role}</p>
          <h3 className="brand-serif mt-1 text-[17px] leading-[1.3] !tracking-normal text-navy sm:text-[19px]">{member.name}</h3>
          <p className="mt-1 text-[11px] leading-[1.4] text-[#475775] sm:text-[12px]">{member.credentials}</p>
        </div>
      </div>
      <p className="mt-3 text-[12px] leading-[1.55] text-[#263858] sm:text-[13px]">{member.biography}</p>
      <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
        {member.tags.map((tag) => (
          <span key={tag} className="inline-flex rounded-full border border-[#E6C47B] px-2 py-[3px] text-[9px] font-semibold leading-3 text-[#9A6508] sm:text-[10px]">{tag}</span>
        ))}
      </div>
    </article>
  );
}

export default function AboutSection() {
  return (
    <section id="about" data-reveal className="bg-mist px-4 py-12 sm:px-6 sm:py-14 xl:py-16">
      <div className="mx-auto max-w-[1160px]">
        <header className="max-w-[740px]">
          <p className="text-[11px] font-bold leading-4 tracking-[0.1em] text-[#B2760A] sm:text-[12px]">THE PEOPLE BEHIND BRAINTREE CAPITAL</p>
          <h2 className="brand-serif mt-2 text-[30px] leading-[1.16] !tracking-normal text-navy sm:text-[38px] md:text-[42px]">
            <span className="block">Decades of institutional experience.</span>
            <span className="block">Aligned with your interests.</span>
          </h2>
          <p className="mt-3 max-w-[700px] text-[14px] leading-[1.6] text-[#475775] sm:text-[15px]">
            Our team combines CXO-level leadership across banking, asset management, and technology with deep quantitative portfolio management expertise. Everyone is personally invested in the same strategies we manage for clients.
          </p>
        </header>
        <div className="mt-6 grid items-stretch gap-4 md:grid-cols-2 sm:mt-7">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={member.name} member={member} index={index} />
          ))}
        </div>
        <div className="mt-4">
          <TeamMemberCard member={teamAdvisor} index={teamMembers.length} horizontal />
        </div>
      </div>
    </section>
  );
}
