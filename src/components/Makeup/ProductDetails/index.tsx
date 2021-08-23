import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MakeupProductType } from '../../../types/MakeupProduct';
import ProductDetails from './ProductDetails';

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<MakeupProductType | null>(null);

  useEffect(() => {
    axios
      .get(`https://makeup-api.herokuapp.com/api/v1/products/${id}.json`)
      .then(function (res) {
        setProduct(res.data);
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    return () => {
      console.log('clean up');
    };
  }, [id]);

  return product ? (
    <div className="container mt-4 mb-4">
      <ProductDetails product={product} />
    </div>
  ) : (
    <div>Loading...</div>
  );

};

export default Details;
