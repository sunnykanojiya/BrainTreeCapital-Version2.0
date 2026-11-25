import FinalCTA from '../components/home/FinalCTA';
import AllWeatherAudienceSection from '../components/portfolio/AllWeatherAudienceSection';
import AllWeatherBuildSection from '../components/portfolio/AllWeatherBuildSection';
import PortfolioShowcase from '../components/portfolio/PortfolioShowcase';
import SiteFooter from '../components/layout/SiteFooter';

export default function AllWeatherPage() {
  return (
    <>
      <main className="bg-white text-navy">
        <PortfolioShowcase variant="allweather" />
        <AllWeatherBuildSection />
        <AllWeatherAudienceSection />
        <FinalCTA />
      </main>
      <SiteFooter />
    </>
  );
}
