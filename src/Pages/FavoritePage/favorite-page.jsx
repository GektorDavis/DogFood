import { useContext } from 'react';
import CardList from '../../components/CardList/card-list';
import { ContentHeader } from '../../components/ContentHeader/content-header';
import { CardContext } from '../../Context/cardContext';

export const FavoritePage = () => {
  const { favorites } = useContext(CardContext);
  return (
    <>
      <ContentHeader title="Избранное" />
      <div className="contant__cards">
        <CardList cards={favorites} />
      </div>
    </>
  );
};
