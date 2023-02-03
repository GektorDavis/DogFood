import { useSelector } from 'react-redux';
import './style.css';

const SearchInfo = ({ searchText }) => {
  const products = useSelector((state) => state.products.data);
  const searchCount = products.length;
  return (
    searchText && (
      <section className="search-title">
        По запросу <span>{searchText}</span> найдено {searchCount} товаров
      </section>
    )
  );
};

export default SearchInfo;
