import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { GrBasket } from 'react-icons/gr';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { MakeupProductType } from '../../types/MakeupProduct';
import { AiOutlineClose } from 'react-icons/ai';
import { removeProductFromShoppingCart } from '../../../src/features/shoppingCart/shoppingCartProductsSlice';
import { useDispatch } from 'react-redux';

const ShoppingCartDropdown: React.FC = () => {
  const [products, setProducts] = useState<MakeupProductType[]>([]);
  const [productAmount, setProductAmount] = useState(0);
  const shoppingCart = useSelector(
    (state: RootState) => state.shoppingCartProducts
  );
  const dispatch = useDispatch();
  const handleRemoveProductFromCart = (productId: string) => {
    dispatch(removeProductFromShoppingCart(productId));
    console.log(shoppingCart);
  };
  // const getProductsDetails = (id: string) => {
  //   axios
  //     .get(`https://makeup-api.herokuapp.com/api/v1/products/${id}.json`)
  //     .then(function (res) {
  //       setProducts((prevItems) => [...prevItems, res.data]);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });

  //   return;
  // };

  useEffect(() => {
    // shoppingCart.map((p) => {
    //   return getProductsDetails(p.productId);
    // });
    if (shoppingCart.length) {
      setProductAmount(
        shoppingCart
          .map(({ amount }) => amount)
          .reduce((previousValue: number, currentValue: number) => {
            return previousValue + currentValue;
          })
      );
    } else {
      setProductAmount(0)
    }
    console.log(shoppingCart);

  }, [shoppingCart]);

  return (
    <div>
      {productAmount > 0 ? (
        <span
          className="dot mr-3"
          style={{
            height: '15px',
            width: '15px',
            backgroundColor: 'red',
            borderRadius: '50%',
            position: 'absolute',
            marginRight: '10px',
            marginBottom: '3px',
            textAlign: 'center',
            color: 'white',
            fontSize: '10px',
          }}
        >
          <span>{productAmount}</span>
        </span>
      ) : null}
      <NavDropdown
        align="end"
        id="nav-dropdown-dark-example"
        title={<GrBasket />}
        menuVariant="dark"
        style={{ minWidth: 'auto' }}
      >
        {shoppingCart.length ? (
          <>
            {shoppingCart.map((product) => (
              <>
                <NavDropdown.Item
                  href={`/p/${product.productId}`}
                  key={product.productId}
                  className="position-relative"
                >
                  <span>
                    {product.name} x{product.amount}
                  </span>
                  <AiOutlineClose
                    style={{ top: '9px', right: '8px' }}
                    onClick={(ev) => {
                      ev.preventDefault();
                      handleRemoveProductFromCart(product.productId);
                    }}
                    className="position-absolute btn-outline-light"
                  />
                </NavDropdown.Item>
              </>
            ))}
            <NavDropdown.Divider />
            <NavDropdown.Item href="/">Go to Basket</NavDropdown.Item>
          </>
        ) : (
          <NavDropdown.Item>No Items</NavDropdown.Item>
        )}
      </NavDropdown>
    </div>
  );
};

export default ShoppingCartDropdown;
