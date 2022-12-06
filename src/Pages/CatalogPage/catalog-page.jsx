import CardList from '../../components/CardList/card-list';
import Spinner from '../../components/Spinner/spinner';

export const CatalogPage = ({ isLoading }) => {
  return (
    <>
      {/* <Sort /> */}
      <div className="contant__cards">
        {isLoading ? <Spinner /> : <CardList />}
      </div>
    </>
  );
};
