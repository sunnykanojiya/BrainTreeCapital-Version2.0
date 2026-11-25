import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqCategories = [
  {
    id: 'why-invest-globally',
    label: 'WHY INVEST GLOBALLY',
    questions: [
      {
        question: 'Why should I invest in portfolios of global businesses listed in the USA?',
        answer: {
          blocks: [
            { type: 'paragraph', text: 'There are a number of reasons, but here are the top five:' },
            {
              type: 'numbered',
              items: [
                { title: 'Largest & Most Innovative Market:', text: "The U.S. stock market is 6x bigger than India's, home to the most innovative businesses in the world — offering unmatched growth potential." },
                { title: 'Invest in Brands You Already Trust:', text: 'Tech businesses that dominate globally — Google, Microsoft, Meta, AWS, Apple and many more — are all listed and accessible.' },
                { title: 'Innovation-Driven Returns:', text: "Most good US businesses represent tomorrow's economy. The returns from innovation are structurally superior to returns on today's businesses." },
                { title: 'Make the US Dollar Work for You:', text: 'A rising US dollar adds a structural currency tailwind to your returns. The rupee has depreciated against the dollar over every significant time horizon.' },
                { title: 'Insurance:', text: 'Your money and securities are insured up to US $500,000 (approx. ₹4.30 crore) under SIPC.' },
              ],
            },
          ],
        },
      },
      {
        question: "What are the specific benefits of investing in BrainTree Capital's global portfolios?",
        answer: {
          blocks: [
            { type: 'paragraph', text: 'By choosing to invest in either or both our portfolios, you gain 7 distinct benefits:' },
            {
              type: 'numbered',
              items: [
                { title: 'Full Control:', text: 'At all times, you retain direct control over your money and securities.' },
                { title: 'Zero Lock-in:', text: 'Withdraw anytime with full liquidity — no exit fee, no lock-in period.' },
                { title: 'Easy to Operate:', text: 'Single-click investing and withdrawal through the Stockal dashboard.' },
                { title: 'Currency Advantage:', text: 'Make the US Dollar work for you as a structural hedge.' },
                { title: 'No-Hassle Rebalancing:', text: 'Quarterly rebalancing happens automatically — you are notified, nothing is required from you.' },
                { title: 'Fully Compliant:', text: 'With regulations of both India (RBI/LRS) and the USA (SEC/FINRA).' },
                { title: 'Insured:', text: 'Your money and securities are protected under SIPC up to US $500,000.' },
              ],
            },
          ],
        },
      },
    ],
  },
  {
    id: 'compliance-safety',
    label: 'COMPLIANCE & SAFETY',
    questions: [
      {
        question: 'Are these portfolios regulated and compliant with Indian and US laws?',
        answer: {
          blocks: [
            { type: 'paragraph', text: 'Yes. The offering is compliant with both Indian and US regulations:' },
            {
              type: 'numbered',
              items: [
                { title: 'India — RBI Liberalised Remittance Scheme (LRS):', text: 'The RBI explicitly allows resident Indian citizens to invest in listed securities on global exchanges. Current annual limit: up to US $250,000 (approx. ₹2.15 crore) per person per year.' },
                { title: 'USA — SEC & FINRA Registered:', text: 'All holdings in both portfolios are listed on the New York Stock Exchange. Our broker and custodian is DriveWealth, registered with the Securities Exchange Commission (SEC) and governed by FINRA.' },
              ],
            },
          ],
          highlight: 'Your money account is held with JP Morgan Chase Bank — governed by the US Federal Reserve.',
        },
      },
      {
        question: 'How safe is the platform?',
        answer: {
          blocks: [
            { type: 'paragraph', text: 'The platform is secured with 256-bit encryption — a higher standard than most banking platforms. The platform is owned by Paasa (Borderless Softech Pvt Ltd), and ShiftAltCap has partnered with Stockal to execute transactions through DriveWealth, a broker registered with the SEC in the USA.' },
            { type: 'paragraph', text: 'Think of Stockal as a regulated digital bridge that enables citizens of one country to access and invest in markets of another in a fully compliant manner.' },
          ],
          highlight: '256-bit encryption · DriveWealth (SEC-registered) · SIPC insured up to US $500,000 · JP Morgan Chase custodian',
        },
      },
    ],
  },
  {
    id: 'investment-process',
    label: 'INVESTMENT & PROCESS',
    questions: [
      {
        question: 'What is the minimum and maximum investment size?',
        answer: {
          blocks: [
            { type: 'paragraph', text: 'The minimum investment is US $10,000 per portfolio strategy. This ensures your allocation is large enough to be meaningfully diversified across the positions that make up each portfolio.' },
            { type: 'paragraph', text: "The maximum investment is US $250,000 (approx. ₹2.15 crore) per person per year — this is the RBI's Liberalised Remittance Scheme (LRS) annual limit for resident Indian investors. GCC investors may have different limits based on their local regulations." },
          ],
          highlight: 'Minimum: US $10,000 per strategy · Maximum: US $250,000 per year (RBI LRS limit)',
        },
      },
      {
        question: 'After opening my account, how do I transfer money to my US account?',
        answer: {
          blocks: [
            { type: 'paragraph', text: 'The RBI mandates that all international transfers from India be made via Form A2 — a standard form that all banks follow.' },
            {
              type: 'bullets',
              items: [
                'HDFC Bank',
                'ICICI Bank',
                'Kotak Mahindra Bank',
                'IndusInd Bank',
                'IDFC First Bank',
                'Yes Bank',
              ],
            },
            { type: 'paragraph', text: 'If you bank elsewhere, you will need to visit your branch and complete the Form A2 process on paper. In either case, funds are credited to your US-based JP Morgan Chase account within 1–2 working days.' },
          ],
        },
      },
    ],
  },
  {
    id: 'tax-reporting',
    label: 'TAX & REPORTING',
    questions: [
      {
        question: 'How will I be taxed on my US portfolio investments?',
        answer: {
          blocks: [
            { type: 'paragraph', text: 'We recommend consulting your tax advisor for your specific situation, but here is a general overview:' },
            {
              type: 'numbered',
              items: [
                { title: 'Residential Status Matters:', text: 'Taxation differs for Resident Indians and Non-Resident Indians (NRIs).' },
                { title: 'DTAA Protection:', text: 'India and the USA have signed a Double Tax Avoidance Agreement (DTAA) — ensuring you are taxed in only one country, not both.' },
                {
                  title: 'Two Sources of Taxable Income:',
                  children: [
                    { title: 'Capital Gains (when you sell):', text: 'Not taxed in the USA. Taxed in India as per Indian capital gains laws.' },
                    { title: 'Dividends / Interest:', text: 'Subject to 10–25% tax deducted at source (TDS) in the USA. This can be claimed as an offset against your regular tax liability in India when you file your ITR.' },
                  ],
                },
              ],
            },
          ],
          highlight: 'Capital gains: taxed in India only. Dividends: TDS in USA, claimable as credit in India via DTAA.',
        },
      },
      {
        question: 'How do I claim the tax deduction benefit? What documents will I receive?',
        answer: {
          blocks: [
            { type: 'paragraph', text: 'When you open your account, you pay a one-time fee of US $5 to obtain a W-8BEN form. This is a form mandated by the IRS (Internal Revenue Service) of the USA to identify non-US investors — it establishes your foreign status and entitles you to the reduced withholding rates under the India–USA DTAA.' },
            { type: 'paragraph', text: 'When filing your Indian tax return, you (or your CA) will need this W-8BEN along with the annual account statement from DriveWealth showing dividends received and tax withheld in the USA. You can claim the US tax withheld as a foreign tax credit offset in your Indian ITR.' },
          ],
          highlight: 'One-time: US $5 for W-8BEN · Annual: DriveWealth account statement · Claim TDS offset via Form 67 in your Indian ITR',
        },
      },
    ],
  },
];

function FaqAnswer({ answer }) {
  return (
    <div className="max-w-[780px] space-y-3 text-[13px] leading-[1.6] text-[#475775] sm:text-[14px]">
      {answer.blocks.map((block, blockIndex) => {
        if (block.type === 'paragraph') {
          return <p key={`paragraph-${blockIndex}`}>{block.text}</p>;
        }

        if (block.type === 'bullets') {
          return (
            <ul key={`bullets-${blockIndex}`} className="list-disc space-y-1 pl-6 marker:text-[#B88721]">
              {block.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          );
        }

        return (
          <ol key={`numbered-${blockIndex}`} className="list-decimal space-y-3 pl-6 marker:font-semibold marker:text-[#B88721]">
            {block.items.map((item) => (
              <li key={item.title}>
                <strong className="font-semibold text-navy">{item.title}</strong>
                {item.text && <> {item.text}</>}
                {item.children && (
                  <ul className="mt-2 list-disc space-y-2 pl-5 marker:text-[#B88721]">
                    {item.children.map((child) => (
                      <li key={child.title}>
                        <strong className="font-semibold text-navy">{child.title}</strong> {child.text}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        );
      })}
      {answer.highlight && (
        <p className="border-l-[3px] border-[#D9AD4B] py-1 pl-4 text-[13px] leading-[1.6] tracking-[0.01em] text-navy sm:text-[14px]">
          {answer.highlight}
        </p>
      )}
    </div>
  );
}

export default function FAQSection() {
  const [activeQuestion, setActiveQuestion] = useState(null);

  return (
    <section data-reveal className="bg-[#FFF9E9] px-4 py-12 sm:px-6 sm:py-14 xl:py-16">
      <div className="mx-auto max-w-[900px]">
        <header className="max-w-[800px]">
          <p className="text-[13px] font-semibold uppercase leading-5 tracking-[0.12em] text-[#A87919]">Frequently Asked Questions</p>
          <h2 className="brand-serif mt-3 text-[30px] font-bold leading-[1.2] !tracking-normal text-navy sm:text-[38px] md:text-[44px]">
            Questions we hear. Answered plainly.
          </h2>
          <p className="mt-4 text-[14px] leading-[1.7] text-[#475775] sm:text-[15px]">
            We believe informed investors make better investors. Below are the questions asked most often, covering compliance, process, safety, transfers, and tax. If yours isn't here, speak with the team directly.
          </p>
        </header>
        <div className="mt-8 space-y-6 sm:mt-9">
          {faqCategories.map((category) => (
            <section key={category.id} aria-labelledby={`faq-category-${category.id}`} className="space-y-2">
              <h3 id={`faq-category-${category.id}`} className="text-[13px] font-semibold uppercase leading-5 tracking-[0.11em] text-[#A87919]">
                {category.label}
              </h3>
              <div className="space-y-2">
                {category.questions.map((faq, idx) => {
                  const questionKey = `${category.id}-${idx}`;
                  const isOpen = activeQuestion === questionKey;
                  const questionId = `faq-question-${questionKey}`;
                  const answerId = `faq-answer-${questionKey}`;
                  return (
                    <article key={questionKey} className="overflow-hidden rounded-[14px] border border-[#DCE5F1] bg-white">
                      <button
                        id={questionId}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={answerId}
                        onClick={() => setActiveQuestion(isOpen ? null : questionKey)}
                        className="grid min-h-[58px] w-full grid-cols-[42px_minmax(0,1fr)_24px] items-center gap-2 px-4 py-3 text-left sm:min-h-[62px] sm:grid-cols-[48px_minmax(0,1fr)_24px] sm:px-5"
                      >
                        <span className="text-[12px] font-semibold tracking-[0.04em] text-[#A87919]">{String(idx + 1).padStart(2, '0')} ·</span>
                        <span className="min-w-0 text-[13px] font-semibold leading-[1.5] text-navy sm:text-[13px]">{faq.question}</span>
                        <ChevronDown
                          aria-hidden="true"
                          size={17}
                          strokeWidth={1.8}
                          className={`justify-self-end text-navy transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                      <div
                        id={answerId}
                        role="region"
                        aria-labelledby={questionId}
                        aria-hidden={!isOpen}
                        className="grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none"
                        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                      >
                        <div className="min-h-0 overflow-hidden">
                          <div className="px-4 pb-4 pl-[58px] sm:px-5 sm:pb-5 sm:pl-[73px]">
                            <FaqAnswer answer={faq.answer} />
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
