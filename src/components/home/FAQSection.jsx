import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "What are the specific benefits of investing in BrainTree Capital's global portfolios?",
    answer: {
      blocks: [
        { type: 'paragraph', text: 'By choosing to invest in either or both of our portfolios, you gain 7 distinct benefits:' },
        {
          type: 'numbered',
          items: [
            { title: 'Full Control:', text: 'At all times, you retain direct control over your money and securities.' },
            { title: 'Zero Lock-in:', text: 'Withdraw anytime with full liquidity - no exit fee and no lock-in period.' },
            { title: 'Easy to Operate:', text: 'Invest and withdraw with a single click through the Paasa dashboard.' },
            { title: 'Currency Advantage:', text: 'Make the US Dollar work for you as a structural hedge.' },
            { title: 'No-Hassle Rebalancing:', text: 'Portfolio rebalancing is generally carried out by our team every quarter. You will receive an email notification to review and approve the proposed changes.' },
            { title: 'Fully Compliant:', text: 'Our investment process follows the applicable regulations in India (RBI/LRS) and the USA (SEC/FINRA).' },
            { title: 'Insured:', text: 'Eligible money and securities are protected under SIPC coverage, subject to its terms and conditions, up to US $500,000.' },
          ],
        },
      ],
    },
  },
  {
    question: 'Are these portfolios regulated and compliant with Indian and US laws?',
    answer: {
      blocks: [
        { type: 'paragraph', text: 'Yes. Our investment offering is designed to comply with applicable regulations in both India and the USA.' },
        {
          type: 'numbered',
          items: [
            { title: 'India - RBI Liberalised Remittance Scheme (LRS):', text: "The RBI's Liberalised Remittance Scheme allows resident Indian individuals to remit funds abroad for permitted investments. The current annual limit is up to US $250,000 per person, subject to applicable RBI rules." },
            { title: 'USA - SEC & FINRA Registered:', text: 'The portfolio holdings are listed on the New York Stock Exchange or other recognised stock exchanges. Our broker and custodian is Interactive Brokers (IBKR), which is registered with the Securities and Exchange Commission (SEC) and subject to applicable FINRA regulations.' },
          ],
        },
      ],
      highlight: 'Your money account (wallet) is held with Citi Bank.',
    },
  },
  {
    question: 'How safe is the platform?',
    answer: {
      blocks: [
        { type: 'paragraph', text: 'Paasa uses security measures designed to protect your personal and financial information.' },
        {
          type: 'numbered',
          items: [
            { title: 'Encryption:', text: 'Client data is protected using 256-bit encryption.' },
            { title: 'Security testing:', text: 'Paasa conducts regular Vulnerability Assessment and Penetration Testing (VAPT) to identify and address potential security vulnerabilities.' },
            { title: 'ISO 27001:', text: 'Paasa has completed the required checks for ISO 27001 certification.' },
            { title: 'Separation of funds:', text: "Client funds are held separately from Paasa's operational funds." },
            { title: 'Withdrawal controls:', text: "Withdrawals can only be made to a bank account held in the client's own name." },
          ],
        },
        { type: 'paragraph', text: 'These measures are designed to reduce security and fraud risks. However, no system can guarantee complete protection against every security threat.' },
      ],
    },
  },
  {
    question: 'What is the fee for investing through BrainTree Capital?',
    answer: {
      blocks: [
        { type: 'paragraph', text: 'The total annual fee is 2% of your Assets Under Management (AUM).' },
        { type: 'paragraph', text: 'This includes both portfolio management fees and platform fees.' },
      ],
    },
  },
  {
    question: 'What is the minimum investment size?',
    answer: {
      blocks: [
        { type: 'paragraph', text: 'The minimum investment depends on the portfolio you choose.' },
        {
          type: 'bullets',
          items: [
            'BrainTree Wealth Builder: The minimum investment starts at US $10,000.',
            'BrainTree Income Builder: The minimum investment starts at US $300,000.',
          ],
        },
      ],
    },
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
        </header>
        <div className="mt-8 space-y-2 sm:mt-9">
          {faqs.map((faq, idx) => {
            const questionKey = `faq-${idx + 1}`;
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
      </div>
    </section>
  );
}
