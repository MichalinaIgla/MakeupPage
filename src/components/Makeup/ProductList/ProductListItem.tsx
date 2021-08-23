import { MakeupProductType } from '../../../types/MakeupProduct';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addViewedProduct } from '../../../features/searchHistory/viewedProductHistorySlice';
import { useState } from 'react';

const imageStyle = {
  maxHeight: '272px',
  height: '100%',
  width: 'max-content',
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'flex',
};

const ProductListItem: React.FC<MakeupProductType> = ({
  id,
  name,
  brand,
  product_type,
  image_link,
}) => {
  const [ifiImageError, setIfImageError] = useState(false);
  const imageError = 'https://comnplayscience.eu/app/images/notfound.png';
  const dispatch = useDispatch();
  const handleOpenProductDetails = () => {
    dispatch(addViewedProduct(id));
  };
  const handleImageError = (e: any) => {
    setIfImageError(true);
  };

  return (
    <>
      <Link
        to={`/p/${id}`}
        onClick={handleOpenProductDetails}
        className="overflow-hidden"
      >
        {
          <img
            src={ifiImageError ? imageError : image_link}
            className="card-img-top"
            alt="..."
            style={imageStyle}
            onError={handleImageError}
          />
        }
      </Link>
      <div className="card-body">
        <Link
          to={`/p/${id}`}
          onClick={handleOpenProductDetails}
          className="text-decoration-none text-reset"
        >
          <h5 className="card-title">{name}</h5>
        </Link>
        <h6 className="card-subtitle mb-2 text-muted">{brand}</h6>
        <p className="card-text">
          <small className="text-muted">{product_type}</small>
        </p>
      </div>
    </>
  );
};

export default ProductListItem;
