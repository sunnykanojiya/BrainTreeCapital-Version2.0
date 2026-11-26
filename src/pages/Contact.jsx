import { ArrowRight, Mail } from 'lucide-react';
import SiteFooter from '../components/layout/SiteFooter';
import { CALENDLY_URL } from '../constants/siteLinks';

export default function ContactPage() {
  return (
    <>
      <main className="relative isolate overflow-hidden bg-[#081634] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
        <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-12 h-80 w-80 rounded-full bg-[#D9A020]/10 blur-3xl" />

        <section className="relative mx-auto flex min-h-[calc(100vh-79px)] w-[calc(100%-32px)] max-w-[1120px] flex-col justify-center py-16 sm:w-[calc(100%-48px)] sm:py-20 lg:py-24">
          <header className="max-w-[720px]">
            <p className="text-[12px] font-semibold tracking-[0.2em] text-[#F2C65B]">CONTACT</p>
            <h1 className="brand-serif mt-5 text-[44px] leading-[1.12] text-white sm:text-[56px] md:text-[68px]">
              Reach us
              <br />
              Directly.
            </h1>
          </header>

          <div className="mt-10 grid gap-5 md:mt-14 md:grid-cols-2 md:gap-6">
            <article className="flex min-h-[200px] flex-col justify-center rounded-[24px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-sm sm:p-8">
              <p className="text-[12px] font-semibold tracking-[0.16em] text-[#F2C65B]">DIRECT CONTACT</p>
              <a
                href="mailto:anurag@braintreecap.com"
                className="mt-6 inline-flex w-fit max-w-full items-center gap-3 break-all text-[19px] font-medium text-white transition-colors hover:text-[#F7CD62] sm:text-[22px]"
              >
                <Mail aria-hidden="true" className="shrink-0 text-[#F2C65B]" size={21} strokeWidth={1.7} />
                anurag@braintreecap.com
              </a>
            </article>

            <article className="flex min-h-[240px] flex-col rounded-[24px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-sm sm:p-8">
              <p className="text-[12px] font-semibold tracking-[0.16em] text-[#F2C65B]">SCHEDULE A CALL</p>
              <p className="mt-5 max-w-[420px] text-[16px] leading-7 text-[#D2DBEA]">
                Prefer a scheduled conversation? Book a 30-minute slot directly on our calendar.
              </p>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-[52px] w-fit items-center justify-center gap-3 rounded-xl bg-[#F2C65B] px-6 text-[14px] font-bold tracking-[0.06em] text-[#081634] transition-colors hover:bg-[#F7D77F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2C65B]"
              >
                BOOK A CALL
                <ArrowRight aria-hidden="true" size={17} strokeWidth={2} />
              </a>
              <p className="mt-auto pt-6 text-[12px] font-medium tracking-[0.12em] text-[#AEBBD1]">30 MIN <span className="px-1 text-[#D9A020]">·</span> Zoom Meet</p>
            </article>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
