import { configureStore } from '@reduxjs/toolkit';
import api from '../utils/api';
import productsReducer from './products/products-slice';
import userReducer from './user/user-slice';
import singleProductReducer from './singleProduct/single-product-slice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    user: userReducer,
    singleProduct: singleProductReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export default store;
