import { useContext } from 'react';
import CardList from '../../components/CardList/card-list';
import Sort from '../../components/Sort/sort';
import { CardContext } from '../../Context/cardContext';

export const CatalogPage = () => {
  const { cards } = useContext(CardContext);

  return (
    <div className="container container_inner">
      <Sort />
      <div className="contant__cards">
        <CardList cards={cards} />
      </div>
    </div>
  );
};
