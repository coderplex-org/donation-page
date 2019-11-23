import '../styles/index.css';

import React, { FunctionComponent } from 'react';
import { AppProps } from 'next/app';

const App: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default App;
