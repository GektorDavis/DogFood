import { useContext } from 'react';
import { CardContext } from '../../Context/cardContext';
import Card from '../Card/card';
import './style.css';

const CardList = () => {
  const { cards } = useContext(CardContext);
  return (
    <div className="cards">
      {cards.map((item) => (
        <Card key={item._id} {...item} />
      ))}
    </div>
  );
};

export default CardList;
