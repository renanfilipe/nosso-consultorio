import './styles.css'

import { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'

import { ReactComponent as NxLogo } from '../public/nx-logo-white.svg'

const CustomApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Welcome to front!</title>
      </Head>
      <div className="app">
        <header className="flex">
          <NxLogo width="75" height="50" />
          <h1>Welcome to front!</h1>
        </header>
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
};

export default CustomApp;
