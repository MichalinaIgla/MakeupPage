import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { AppThunk, AppDispatch } from '../../app/store';
import { ShoppingCartProduct } from '../../types/ShoppingCartPorduct';
import { loadState } from '../../localStorage';
export const shoppingCartAdapter = createEntityAdapter();
let initialState: ShoppingCartProduct[] = [];
if (loadState() && loadState().shoppingCartProducts) {
  initialState = loadState().shoppingCartProducts;
}
// console.log('loadState()', loadState().shoppingCartProducts)
const shoppingCartProductsSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    addProductToShoppingCart(
      state,
      action: PayloadAction<ShoppingCartProduct>
    ) {
      let shoppingCart = state.find(
        (product) => product.productId === action.payload.productId
      );
      if (shoppingCart) {
        shoppingCart.amount += 1;
      } else {
        state.push(action.payload);
      }
    },
    removeProductFromShoppingCart(state, action: PayloadAction<string>) {
      console.log(action.payload);
      // const newState = Object.assign(state ,state.filter(product => product.productId !== action.payload));
      return state.filter((product) => product.productId !== action.payload);
      // return updateObject(state, state.filter(product => product.productId !== action.payload));
    },
  },
});

export const { removeProductFromShoppingCart } =
  shoppingCartProductsSlice.actions;

export const addProductToShoppingCart =
  (
    productId: string,
    name: string,
    amount: number,
    color: string | null
  ): AppThunk =>
  async (dispatch: AppDispatch) => {
    const newProductInCart: ShoppingCartProduct = {
      productId,
      name,
      amount,
      color,
    };

    dispatch(
      shoppingCartProductsSlice.actions.addProductToShoppingCart(
        newProductInCart
      )
    );
  };

export default shoppingCartProductsSlice.reducer;
