import AudienceSection from '../components/home/AudienceSection';
import AboutSection from '../components/home/AboutSection';
import FAQSection from '../components/home/FAQSection';
import Hero from '../components/home/Hero';
import HowItWorksJourney from '../components/home/HowItWorksJourney';
import FinalCTA from '../components/home/FinalCTA';
import WhyInvestGloballySection from '../components/home/WhyInvestGloballySection';
import WhatGoesWrongSection from '../components/home/WhatGoesWrongSection';
import GlobalPortfoliosSection from '../components/home/GlobalPortfoliosSection';
import PyramidSection from '../components/home/PyramidSection';
import SafetySection from '../components/home/SafetySection';
import PortfolioShowcase from '../components/portfolio/PortfolioShowcase';
import SiteFooter from '../components/layout/SiteFooter';

export default function Home() {
  return (
    <>
      <main className="bg-mist text-navy">
        <Hero />

        <WhyInvestGloballySection />

        <WhatGoesWrongSection />

        <PortfolioShowcase />

        <GlobalPortfoliosSection />

        <PyramidSection />

        <SafetySection />

        <AudienceSection />

        <HowItWorksJourney />

        <AboutSection />

        <FAQSection />

        <FinalCTA />
      </main>
      <SiteFooter />
    </>
  );
}
