import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MakeupProductType } from '../../../types/MakeupProduct';
import ProductList from './ProductList';

interface ProductsProps {
  searchTerm?: string;
}

const Products: React.FC<ProductsProps> = () => {
  const [products, setProducts] = useState<MakeupProductType[] | null>(null);
  let searchedProducts;
  let url = 'https://makeup-api.herokuapp.com/api/v1/products.json';
  useEffect(() => {
    axios
      .get(url)
      .then(function (res) {
        setProducts(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    return () => {
      console.log('clean up');
    };
  }, [url]);

  const { searchTerm } = useParams<{ searchTerm: string }>();
  if (searchTerm) {
    searchedProducts = products?.filter((product) => {
      return (
        (product.name && product.name.includes(searchTerm)) ||
        (product.brand && product.brand.includes(searchTerm)) ||
        (product.category && product.category.includes(searchTerm)) ||
        (product.product_type && product.product_type.includes(searchTerm))
      );
    });
  }

  return (
    <div>
      <ProductList products={searchedProducts ? searchedProducts :  products} />
    </div>
  );
};

export default Products;
