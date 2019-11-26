import '../styles/index.css';

import React, { FunctionComponent, MouseEvent } from 'react';
import { AppProps } from 'next/app';
import Div100vh from 'react-div-100vh';
import NProgress from 'nprogress';
import usePortal from 'react-useportal';
import Router from 'next/router';
import Head from 'next/head';

import { MobileMenu } from '../components/common/MobileMenu';
import { FallbackShare } from '../components/FallbackShare';
import { ShareContext } from '../services/share';

Router.events.on('routeChangeStart', url => {
  console.log(`Loading: ${url}`);
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const App: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  const { openPortal, closePortal, isOpen, Portal } = usePortal();
  function openShareDialog(e: MouseEvent<HTMLButtonElement>) {
    // try to open native share dialog
    if (window.navigator.share) {
      const title = document.title;
      const url = window.location.href;
      const descriptionEl = document.querySelector("meta[name='description']");
      const text = descriptionEl ? descriptionEl.getAttribute('content') : '';
      return window.navigator.share({ title, text: `${text} ${url}` });
    }
    // fallback to custom native share dialog
    return openPortal(e);
  }
  function closeShareDialog(e: MouseEvent<HTMLButtonElement>) {
    closePortal(e);
  }
  return (
    <>
      <Head>
        {/* Import CSS for nprogress */}
        <link rel="stylesheet" type="text/css" href="/nprogress.css" />
      </Head>
      <ShareContext.Provider value={{ openShareDialog, closeShareDialog, isOpen: isOpen }}>
        <Div100vh>
          <Component {...pageProps} />
          <MobileMenu />
        </Div100vh>
        <Portal>
          <FallbackShare />
        </Portal>
      </ShareContext.Provider>
    </>
  );
};

export default App;
