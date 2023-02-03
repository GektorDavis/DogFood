import { useEffect } from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { NotFound } from '../../components/NotFound/NotFound';
import { Product } from '../../components/Product/product';
import Spinner from '../../components/Spinner/spinner';
import { fetchChangeLikeProduct } from '../../storage/products/products-slice';
import {
  fetchSingleProduct,
  setProductState,
} from '../../storage/singleProduct/single-product-slice';

export const ProductPage = () => {
  const { productId } = useParams();

  const dispatch = useDispatch();
  const {
    data: product,
    loading,
    error: errorState,
  } = useSelector((state) => state.singleProduct);

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
  }, [dispatch, productId]);

  const handleProductLike = useCallback(() => {
    dispatch(fetchChangeLikeProduct(product)).then((updateProduct) => {
      dispatch(setProductState(updateProduct.payload.product));
    });
  }, [product, dispatch]);

  return (
    <div className="container container_inner">
      <div className="contant__cards">
        {loading ? (
          <Spinner />
        ) : (
          !errorState && (
            <Product {...product} onProductLike={handleProductLike} />
          )
        )}
        {!loading && errorState && <NotFound />}
      </div>
    </div>
  );
};
