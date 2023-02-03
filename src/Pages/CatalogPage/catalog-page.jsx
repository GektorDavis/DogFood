import { useSelector } from 'react-redux';
import CardList from '../../components/CardList/card-list';
import Sort from '../../components/Sort/sort';

export const CatalogPage = () => {
  const products = useSelector((state) => state.products.data);

  return (
    <div className="container container_inner">
      <Sort />
      <div className="contant__cards">
        <CardList cards={products} />
      </div>
    </div>
  );
};
