import Div100vh from 'react-div-100vh';
import Link from 'next/link';

import { SEO } from '../components/SEO';
import { CODERPLEX_LOGO } from '../constants';

export default function Index() {
  return (
    <>
      <SEO />
      <Div100vh className="w-full md:max-w-sm md:mx-auto flex flex-col justify-center items-center">
        <header className="py-4 px-4">
          <div className="w-full items-center flex justify-center">
            <div className="w-40 h-40 mx-auto">
              <img src={CODERPLEX_LOGO} alt="coderplex logo" className="w-full rounded-full" />
            </div>
          </div>
        </header>
        <div className="p-4 pb-20 md:pb-0">
          <h1 className="text-gray-700 text-4xl mb-4 text-gray-900 font-bold">404</h1>
          <h3 className="font-semibold text-xl md:text-3xl mb-4 text-gray-800">Page Not Found</h3>
          <p className="mb-4 md:mb-6 text-sm md:text-base leading-relaxed">
            We couldn’t find the page you were looking for. You might not have the required permissions to access it.
          </p>
          <Link href="/">
            <a className="block text-blue-600 font-bold text-base mb-6 flex items-center">Go to about page?</a>
          </Link>
        </div>
      </Div100vh>
    </>
  );
}
