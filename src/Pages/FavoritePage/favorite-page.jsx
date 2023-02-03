import { useSelector } from 'react-redux';
import CardList from '../../components/CardList/card-list';
import { ContentHeader } from '../../components/ContentHeader/content-header';
import Sort from '../../components/Sort/sort';

export const FavoritePage = () => {
  const favorites = useSelector((state) => state.products.favoriteProducts);
  return (
    <div className="container container_inner">
      <ContentHeader title="Избранное" />
      <Sort />
      <div className="contant__cards">
        <CardList cards={favorites} />
      </div>
    </div>
  );
};
