import { MakeupProductType } from '../../../types/MakeupProduct';
import ProductColors from './ProductColors';
import { useDispatch } from 'react-redux';
import { addProductToShoppingCart } from '../../../features/shoppingCart/shoppingCartProductsSlice';

interface ProductDetailsProps {
  product: MakeupProductType;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const dispatch = useDispatch();
  const handleAddToShoppingCart = () => {
    dispatch(addProductToShoppingCart(product.id, product.name, 1, null));
  };

  return (
    <div className="row">
      <div className="project-info-box mt-0 col-md-5">
        <img
          src={product.image_link}
          alt=".."
          className="rounded"
          style={{ height: '100%', maxHeight: '340px' }}
        />
        <div className="project-info-box mt-4">
          <h5>Tags:</h5>
          {product.tag_list?.map((tag) => (
            <div key={tag}>{tag}</div>
          ))}
        </div>
      </div>
      <div className="col-md-7">
        <h1>{product.name}</h1>
        <p className="mb-0 mt-3">{product.description}</p>
        <div className="project-info-box mt-4">
          <p>
            <b>Brand:</b> {product.brand}
          </p>
          <p>
            <b>Category:</b> {product.product_type}
          </p>
          <p>
            <b>Colors:</b>
          </p>
          <div className="row mb-3">
            {product.product_colors?.slice(0, 5).map((color: any) => (
              <div key={color.colour_name} className="d-flex">
                <ProductColors color={color} />
              </div>
            ))}
          </div>
          <p className="mb-0">
            <b>Cost:</b> {product.price} {product.price_sign}
          </p>
          <div className="row">
            <p className="mt-4 col-md-4">
              <a
                className="btn btn-outline-dark"
                href={product.product_link}
                role="button"
              >
                Purchase now
              </a>
            </p>

            <p className="mt-4 col-md-6">
              <button
                className="btn btn-outline-dark"
                onClick={handleAddToShoppingCart}
              >
                Add to Shopping Cart
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
