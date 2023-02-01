import { useContext } from 'react';
import CardList from '../../components/CardList/card-list';
import { ContentHeader } from '../../components/ContentHeader/content-header';
import Sort from '../../components/Sort/sort';
import { CardContext } from '../../Context/cardContext';

export const FavoritePage = () => {
  const { favorites } = useContext(CardContext);
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
