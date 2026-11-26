import { Link } from 'react-router-dom';
import BrandLogo from '../common/BrandLogo';
import { CONTACT_PAGE_URL } from '../../constants/siteLinks';

export default function SiteFooter() {
  return (
    <footer className="bg-[#0A1B3D] text-[#C5D0E8] xl:min-h-[418px]">
      <div className="mx-auto w-[calc(100%-32px)] max-w-[1280px] pb-[60px] pt-12 sm:w-[calc(100%-48px)] xl:w-full xl:pt-16">
        <div className="grid gap-10 lg:grid-cols-[410px_1fr] lg:gap-0">
          <div className="max-w-[410px]">
            <BrandLogo imageClassName="h-[98px] w-[178px] rounded-lg bg-white p-2" />
            <p className="mt-4 text-[15px] leading-[23px] text-[#C5D0E8]">Professionally managed global investment portfolios for Indian residents, NRIs and foreign investors.</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-[94px_116px_82px] lg:justify-end lg:gap-x-[70px]">
            <div>
              <h3 className="text-[14px] font-semibold leading-5 text-[#F7CD62]">Explore</h3>
              <ul className="mt-[14px] space-y-[10px] text-[15px] leading-5 text-[#C5D0E8]">
                <li><Link to="/#portfolios" className="hover:text-white">Portfolios</Link></li>
                <li><Link to="/#why-us" className="hover:text-white">Why Uss</Link></li>
                <li><Link to="/#how-it-works" className="hover:text-white">How it works</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-[14px] font-semibold leading-5 text-[#F7CD62]">Company</h3>
              <ul className="mt-[14px] space-y-[10px] text-[15px] leading-5 text-[#C5D0E8]">
                <li><Link to="/#about" className="hover:text-white">About and team</Link></li>
                <li><a href={CONTACT_PAGE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white">Contact Us →</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-[14px] font-semibold leading-5 text-[#F7CD62]">Legal</h3>
              <ul className="mt-[14px] space-y-[10px] text-[15px] leading-5 text-[#C5D0E8]">
                <li><a href="#privacy" className="hover:text-white">Privacy</a></li>
                <li><a href="#terms" className="hover:text-white">Terms</a></li>
                <li><a href="#disclosures" className="hover:text-white">Disclosures</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 h-px bg-[#24407F]" />
        <p className="mt-6 text-[12.5px] leading-5 text-[#8FA0C4]">All investments involve risk and returns will fluctuate. Past performance does not guarantee future results. Tax treatment depends on your residency and circumstances. Any portfolio figures shown are hypothetical.</p>
      </div>
    </footer>
  );
}
