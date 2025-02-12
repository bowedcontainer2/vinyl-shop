import PropTypes from 'prop-types';
import SingleProduct from '../../components/SingleProduct';

const SingleProductPage = ({ query }) => <SingleProduct id={query.id} />;

SingleProductPage.propTypes = {
  query: PropTypes.object.isRequired,
};

export default SingleProductPage;
