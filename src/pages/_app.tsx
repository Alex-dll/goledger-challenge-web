import { QueryClientProvider } from '@tanstack/react-query';
import { LayoutGroup } from 'framer-motion';
import { AppProps } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';

import { Layout } from '../components';
import { query } from '../services';

import '../styles/global.css';
import '../styles/nprogress.css';

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={query}>
      <LayoutGroup>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </LayoutGroup>
    </QueryClientProvider>
  );
}

export default MyApp;
