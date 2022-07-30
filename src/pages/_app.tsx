import { AnimateSharedLayout } from 'framer-motion';
import { AppProps } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';

import { Layout } from '../components';

import '../styles/global.css';
import '../styles/nprogress.css';

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AnimateSharedLayout>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AnimateSharedLayout>
  );
}

export default MyApp;
