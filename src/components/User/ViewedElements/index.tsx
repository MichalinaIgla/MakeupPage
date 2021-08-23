import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import {useSelector } from 'react-redux';
import { RootState } from '../../../app/rootReducer';
import { MakeupProductType } from '../../../types/MakeupProduct';
type ViewedProductType = {
  details: MakeupProductType,
  date: Date
}
const ViewedProfile: React.FC = () => {
  const [viewedProducts, setViewedProducts] = useState<ViewedProductType[]>([]);
  const LastViewedProducts = useSelector(
    (state: RootState) => state.viewedProductHistory
  );
  const LastSearchedTerm = useSelector(
    (state: RootState) => state.searchedTermHistory
  );

  const getProductsDetails = (id: string, date: Date) => {
    axios
      .get(`https://makeup-api.herokuapp.com/api/v1/products/${id}.json`)
      .then(function (res) {
          setViewedProducts(prevItems => [...prevItems, {
            details: res.data,
            date: date
          }])
          console.log(date)
      })
      .catch(function (error) {
        console.log(error);
      });

    return;
  };

  useEffect(() => {
    LastViewedProducts.map((product) => {
      return getProductsDetails(product.productId, new Date(product.date));
    });
  }, [LastViewedProducts]);

  return (
    <Container className="mt-5">
      <div className="row mb-2 mt-2">
        <h3 className="pb-3 mb-4 font-italic border-bottom">
          Last Viewed Products
        </h3>
        {viewedProducts.length ? (
          <>
            {viewedProducts.map((product) => (
              <div className="col-md-6" key={product.details.id}>
                <div className="card flex-md-row mb-4 box-shadow h-md-250">
                  <img
                    src={product.details.image_link}
                    alt=".."
                    className="rounded"
                    style={{ height: '100%', maxHeight: '340px' }}
                  />
                  <div className="card-body d-flex flex-column align-items-start">
                    <strong className="d-inline-block mb-2">
                      {product.details.brand} 
                    </strong>
                    <h3 className="mb-0">
                      <a className="text-dark" href="\">
                        {product.details.name}
                      </a>
                    </h3>
                    <div className="mb-1 text-muted">
                      Last Viewed: {product.date.getFullYear()}/  {product.date.getMonth()+1}/{product.date.getDate()} 
                      </div>
                    <p className="card-text mb-auto">
                      {product.details.price} {product.details.price_sign}{' '}
                    </p>
                    <div className="row  w-100 ">
                    <div className="mb-1 text-muted col-md-6">
                      {product.details.category} 
                    </div>
                    <a className=" col-md-6 btn btn-outline-dark" href={`${product.details.product_link}`}>Buy now</a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="d-flex justify-content-around">
            No Viewed Products
          </div>
        )}
      </div>

      <div className="row mb-5 mt-2">
        <h3 className="pb-3 mb-4 font-italic border-bottom">Last Searched</h3>
        {LastSearchedTerm.length ? (
          <>
            {LastSearchedTerm.map((term) => (
              <div key={term.id}>
                <p className="">{term.searchTerm}</p>
              </div>
            ))}
          </>
        ) : (
          <div className="d-flex justify-content-around mb-5">
            No Searched Products
          </div>
        )}
      </div>
    </Container>
  );
};

export default ViewedProfile;
