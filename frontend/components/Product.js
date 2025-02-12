import Link from 'next/link';
import PropTypes from 'prop-types';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import FormatMoney from '../lib/FormatMoney';
import DeleteProduct from './DeleteProduct';

const Product = ({ product }) => (
  <ItemStyles>
    <img src={product?.photo?.image?.publicUrlTransformed} alt={product.name} />
    <Title>
      <Link href={`/product/${product.id}`}>{product.name}</Link>
    </Title>
    <PriceTag>{FormatMoney(product.price)}</PriceTag>
    <p>{product.description}</p>
    <div className="buttonList">
      <Link
        href={{
          pathname: '/update',
          query: {
            id: product.id,
          },
        }}
      >
        Edit
      </Link>
      <DeleteProduct id={product.id}>Delete</DeleteProduct>
    </div>
  </ItemStyles>
);

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    photo: PropTypes.shape({
      image: PropTypes.shape({
        publicUrlTransformed: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    price: PropTypes.number,
  }).isRequired,
};

export default Product;
