import Div100vh from 'react-div-100vh';

import { SEO } from '../components/SEO';
import { CODERPLEX_LOGO } from '../constants';
import { HomeContent } from '../components/Home';
import { CrowdFundList } from '../components/CrowdFund';
import { HelpInfo } from '../components/Help';

export default function Index() {
  return (
    <>
      <SEO />
      <Div100vh className="w-full md:max-w-sm md:flex md:flex-col md:justify-center md:bg-gray-100 md:fixed md:left-0 md:top-0">
        <header className="py-4 px-4">
          <div className="w-full items-center flex justify-center">
            <div className="w-40 h-40 mx-auto">
              <img src={CODERPLEX_LOGO} alt="coderplex logo" className="w-full rounded-full" />
            </div>
          </div>
        </header>
        <HomeContent />
      </Div100vh>
      <div className="hidden md:block mx-auto px-4" style={{ marginLeft: '24rem' }}>
        <CrowdFundList hideHeader />
        <HelpInfo />
      </div>
    </>
  );
}
