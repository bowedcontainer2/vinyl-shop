import PropTypes from 'prop-types';

const Page = ({ children }) => (
  <div>
    <h2>I am a page component</h2>
    {children}
  </div>
);

Page.propTypes = {
  children: PropTypes.any,
};

export default Page;
