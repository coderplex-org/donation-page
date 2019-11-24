import '../styles/index.css';

import React, { FunctionComponent } from 'react';
import { AppProps } from 'next/app';
import Div100vh from 'react-div-100vh';
import NProgress from 'nprogress';
import Router from 'next/router';
import Head from 'next/head';

import { MobileMenu } from '../components/common/MobileMenu';

Router.events.on('routeChangeStart', url => {
  console.log(`Loading: ${url}`);
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const App: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        {/* Import CSS for nprogress */}
        <link rel="stylesheet" type="text/css" href="/nprogress.css" />
      </Head>
      <Div100vh>
        <Component {...pageProps} />
        <MobileMenu />
      </Div100vh>
    </>
  );
};

export default App;
