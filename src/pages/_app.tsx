/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { UserProvider } from '@auth0/nextjs-auth0';

import '../styles/main.css';

function MyApp({ Component, pageProps }: any) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
