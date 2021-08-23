import ProductListItem from './ProductListItem';
import { MakeupProductType } from '../../../types/MakeupProduct';
import { Container } from 'react-bootstrap';

interface ProductListProps {
  products: MakeupProductType[] | null;
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <Container className="mt-4">
      <h2 className="pb-3 mb-4 font-italic border-bottom text-center">Products</h2>
      <div className="row">
        {products ? (
          products.map((product: MakeupProductType) => (
            <div className="card col-md-3 border-0" key={product.id}>
              <ProductListItem
                id={product.id}
                name={product.name}
                description={product.description}
                brand={product.brand}
                category={product.category}
                product_type={product.product_type}
                price={product.price}
                price_sign={product.price_sign}
                currency={product.currency}
                image_link={product.image_link}
              />
            </div>
          ))
        ) : (
          <div className="spinner-border align-items-center" role="status">
            <span className="sr-only"></span> 
          </div>
        )}
      </div>
    </Container>
  );
};

export default ProductList;
