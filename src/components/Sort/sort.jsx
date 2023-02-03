import './style.css';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { sortedProducts } from '../../storage/products/products-slice';

const tabs = [
  {
    id: 'cheap',
    title: 'Сначала дешёвые',
  },
  {
    id: 'low',
    title: 'Сначала дорогие',
  },
  {
    id: 'sale',
    title: 'По скидке',
  },
];

const Sort = () => {
  const dispatch = useDispatch();
  const { currentSort } = useSelector((state) => state.products);

  const handleClick = (e, tab) => {
    e.preventDefault();
    dispatch(sortedProducts(tab.id));
  };
  return (
    <div className="sort content__sort">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          id={tab.id}
          className={cn('sort__link', {
            sort__link_selected: currentSort === tab.id,
          })}
        >
          <a onClick={(e) => handleClick(e, tab)}>{tab.title}</a>
        </div>
      ))}
    </div>
  );
};

export default Sort;
