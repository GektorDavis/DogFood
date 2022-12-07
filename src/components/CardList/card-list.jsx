import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/userContext';
import Card from '../Card/card';
import { NotFound } from '../NotFound/NotFound';
import './style.css';

const CardList = ({ cards }) => {
  const navigate = useNavigate();
  const isLoading = useContext(UserContext);
  return (
    <>
      {!cards.length && !isLoading && (
        <NotFound
          buttonText="Назад"
          title="Избранных вкусняшек пока нет"
          buttonAction={() => navigate(-1)}
        />
      )}
      <div className="cards">
        {cards.map((item) => (
          <Card key={item._id} {...item} />
        ))}
      </div>
    </>
  );
};

export default CardList;
