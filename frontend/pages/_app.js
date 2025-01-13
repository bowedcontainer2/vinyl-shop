import PropTypes from 'prop-types';
import Page from '../components/Page';

const MyApp = ({ Component, pageProps }) => (
  <Page>
    <Component {...pageProps} />
  </Page>
);

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.any,
};

export default MyApp;
